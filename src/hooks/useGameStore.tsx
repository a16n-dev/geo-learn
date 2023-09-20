import { add } from 'date-fns';
import { random } from 'lodash';
import { create } from 'zustand';

import { isCorrectQuizAnswer } from '../data/types/helperFns.tsx';
import { QuizEntry } from '../data/types/Quiz.ts';
import supabase from '../supabase/supabase.ts';

interface EntryAttempt {
  entry: QuizEntry;
  answer: string;
  timeToAnswerInMs: number;
  correct: boolean;
}

interface GameMetadata {
  userId: string;
  userQuizId: number;
  totalQuestions: number;
  numQuestions: number;
}

export interface GameStore {
  metadata: GameMetadata;
  state: {
    gameHistory: EntryAttempt[];
    questionStartTimeInMs: number;
    inProgress: boolean;
  };

  // stores the next 3 preloaded questions -
  upcomingEntries: QuizEntry[];
  entry: QuizEntry | null;
  userAnswer?: string;

  // functions
  answerQuestion: (answer: string) => void;
  startGame: (metadata: GameMetadata) => Promise<void>;
}

const getRandomEntryNumbers = (length: number, chooseFrom: number) => {
  const numbers: number[] = [];

  while (numbers.length < length) {
    const number = random(0, chooseFrom, false);
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  return numbers;
};

const getEntry = async (metadata: GameMetadata): Promise<QuizEntry> => {
  const { data: userQuestion } = await supabase
    .from('user_question_scores')
    .select('*, questions(*), user_knowledge_keys(*)')
    .order('knowledge_key.next_review_date', { ascending: true })
    .eq('user_quiz_id', metadata.userQuizId)
    .single();

  if (!userQuestion || !userQuestion.questions) {
    throw new Error('No question found');
  }

  // get an additional random entry, so that if one collides with the correct answer, it can be omitted
  const newIds = getRandomEntryNumbers(
    userQuestion.questions.needs_additional_incorrect_count === 0
      ? userQuestion.questions.needs_additional_incorrect_count + 1
      : 0,
    metadata.numQuestions,
  );

  // fetch additional incorrect answers
  const additionalIncorrect = await Promise.all(
    newIds.map(async (id) => {
      // get random number, that's different from the current question number

      const { data: additionalQuestion } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', userQuestion.questions!.quiz_id)
        .range(id, id)
        .single();

      if (!additionalQuestion) {
        throw new Error('No additional question found');
      }

      return {
        id: additionalQuestion.id,
        type: additionalQuestion.answer_type as any,
        data: additionalQuestion.answer as any,
      };
    }),
  );

  const additionalIncorrectAnswers = additionalIncorrect
    .filter((q) => q.id !== userQuestion.question_id)
    .slice(0, 4);

  return {
    id: userQuestion.questions.id,
    knowledgeKey: userQuestion.questions.knowledge_key,
    question: {
      type: userQuestion.questions.question_type as any,
      data: userQuestion.questions.question as any,
    },
    answer: {
      type: userQuestion.questions.answer_type as any,
      data: userQuestion.questions.answer as any,
    },
    additionalIncorrectAnswers,
  };
};

const useGameStore = create<GameStore>()((set, get) => ({
  metadata: {
    userId: '',
    userQuizId: 0,
    totalQuestions: 10,
    numQuestions: 0,
  },
  state: {
    gameHistory: [],
    questionStartTimeInMs: Date.now(),
    inProgress: false,
  },
  upcomingEntries: [],
  entry: null,

  answerQuestion: async (answer) => {
    set((state) => ({ ...state, userAnswer: answer }));

    const entry = get().entry;

    if (!entry) return;

    const isCorrect = isCorrectQuizAnswer(entry.answer, answer);

    const answerTime = Date.now() - get().state.questionStartTimeInMs;

    // update the spaced repetition data
    const { data: knowledgeKey } = await supabase
      .from('user_knowledge_keys')
      .select()
      .eq('user_id', get().metadata.userId)
      .eq('key', entry.knowledgeKey)
      .single();

    if (!knowledgeKey) {
      throw new Error('Invalid knowledge key');
    }

    const newRepetitionNumber = knowledgeKey.repetition_number + 1;
    const newEaseFactor = knowledgeKey.ease_factor;
    const newInterval = knowledgeKey.interval;
    const reviewDate = new Date();

    // update knowledge key
    await supabase
      .from('user_knowledge_keys')
      .update({
        repetition_number: newRepetitionNumber,
        ease_factor: newEaseFactor,
        interval: newInterval,
        next_review_date: add(reviewDate, { days: newInterval }).toString(),
        last_review_date: reviewDate.toString(),
      })
      .eq('user_id', knowledgeKey.user_id)
      .eq('key', knowledgeKey.key);

    const attempt: EntryAttempt = {
      entry,
      answer,
      correct: isCorrect,
      timeToAnswerInMs: answerTime,
    };

    // set delay to move to next question in 2s if wrong/1s if right
    setTimeout(
      () => {
        void getEntry(get().metadata).then((entry) => {
          set((state) => {
            return {
              ...state,
              entry: get().upcomingEntries[0],
              upcomingEntries: [...get().upcomingEntries.slice(1), entry],
              state: {
                gameHistory: [...get().state.gameHistory, attempt],
                questionStartTimeInMs: Date.now(),
                inProgress:
                  get().metadata.totalQuestions >
                  get().state.gameHistory.length + 1,
              },
              userAnswer: undefined,
            };
          });
        });
      },
      isCorrect ? 1000 : 2000,
    );
  },
  startGame: async (metadata) => {
    const firstEntry = await getEntry(metadata);

    const upcomingEntries = await Promise.all(
      Array.from({ length: 3 }).map(async () => getEntry(metadata)),
    );

    set((state) => ({
      ...state,
      metadata,
      state: {
        gameHistory: [],
        questionStartTimeInMs: Date.now(),
        inProgress: true,
      },
      upcomingEntries: upcomingEntries,
      entry: firstEntry,
      userAnswer: undefined,
    }));
  },
}));

export default useGameStore;
