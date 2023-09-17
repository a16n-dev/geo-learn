import { random } from 'lodash';
import { create } from 'zustand';

import { isCorrectQuizAnswer } from '../data/types/helperFns.tsx';
import { QuizAnswer, QuizEntry } from '../data/types/Quiz.ts';
import supabase from '../supabase/supabase.ts';

interface EntryAttempt {
  entry: QuizEntry;
  answer: string;
  timeToAnswerInMs: number;
  correct: boolean;
}

interface GameMetadata {
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
  entry: QuizEntry | null;
  userAnswer?: string;
  // functions
  answerQuestion: (answer: string) => void;
  startGame: (metadata: GameMetadata) => Promise<void>;
}

const getRandomNumbers = (
  length: number,
  range: [min: number, max: number],
  blacklist: number[],
) => {
  const numbers: number[] = [];

  while (numbers.length < length) {
    const number = random(range[0], range[1], false);
    if (!blacklist.includes(number)) {
      numbers.push(number);
    }
  }

  return numbers;
};

const getEntry = async (metadata: GameMetadata): Promise<QuizEntry> => {
  // const data = sample(dataset) as CountryData;

  const entryNum = random(0, metadata.numQuestions, false);

  const { data: userQuestion } = await supabase
    .from('user_question_scores')
    .select('*, questions(*)')
    .eq('user_quiz_id', metadata.userQuizId)
    .range(entryNum, entryNum)
    .single();

  if (!userQuestion || !userQuestion.questions) {
    throw new Error('No question found');
  }

  let additionalIncorrect: QuizAnswer[] = [];

  if (userQuestion.questions.needs_additional_incorrect_count) {
    const newIds = getRandomNumbers(
      userQuestion.questions.needs_additional_incorrect_count,
      [0, metadata.numQuestions],
      [entryNum],
    );

    // fetch additional incorrect answers
    additionalIncorrect = await Promise.all(
      Array.from({
        length: userQuestion.questions.needs_additional_incorrect_count,
      }).map(async (_, i) => {
        // get random number, thats different from the current question number

        const { data: additionalQuestion } = await supabase
          .from('questions')
          .select('*')
          .eq('quiz_id', userQuestion.questions!.quiz_id)
          .range(newIds[i], newIds[i])
          .single();

        if (!additionalQuestion) {
          throw new Error('No additional question found');
        }

        return {
          type: additionalQuestion.answer_type as any,
          data: additionalQuestion.answer as any,
        };
      }),
    );
  }

  console.log(additionalIncorrect);

  return {
    id: userQuestion.questions.id,
    question: {
      type: userQuestion.questions.question_type as any,
      data: userQuestion.questions.question as any,
    },
    answer: {
      type: userQuestion.questions.answer_type as any,
      data: userQuestion.questions.answer as any,
    },
    additionalIncorrctAnswers: additionalIncorrect,
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
  entry: null,

  answerQuestion: async (answer) => {
    set((state) => ({ ...state, userAnswer: answer }));

    const entry = get().entry;

    if (!entry) return;

    const isCorrect = isCorrectQuizAnswer(entry.answer, answer);

    const answerTime = Date.now() - get().state.questionStartTimeInMs;

    const attempt: EntryAttempt = {
      entry,
      answer,
      correct: isCorrect,
      timeToAnswerInMs: answerTime,
    };

    // set delay to move to next question in 2s
    setTimeout(
      () => {
        void getEntry(get().metadata).then((entry) => {
          set((state) => {
            return {
              ...state,
              entry,
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
    set((state) => ({
      ...state,
      metadata,
      state: {
        gameHistory: [],
        questionStartTimeInMs: Date.now(),
        inProgress: true,
      },
      entry: firstEntry,
      userAnswer: undefined,
    }));
  },
}));

export default useGameStore;
