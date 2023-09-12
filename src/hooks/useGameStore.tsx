import { sample } from 'lodash';
import { create } from 'zustand';

import { countries, CountryData } from '../data/countries.ts';
import { isCorrectQuizAnswer } from '../data/types/helperFns.tsx';
import { QuizEntry } from '../data/types/Quiz.ts';

interface EntryAttempt {
  entry: QuizEntry;
  answer: string;
  timeToAnswerInMs: number;
  correct: boolean;
}

export interface GameStore {
  entry: QuizEntry;
  userAnswer?: string;
  nextQuestion: () => void;
  answerQuestion: (answer: string) => void;
  gameHistory: EntryAttempt[];
  totalQuestions: number;
  questionStartTimeInMs: number;
}

const dataset = countries.filter((d) => d.unMember);

const getEntry = (): QuizEntry => {
  const data = sample(dataset) as CountryData;

  return {
    id: `${data.cca3}`,
    question: {
      type: 'image',
      data: {
        url: `/content/${data.cca3.toLowerCase()}.svg`,
        caption: '',
      },
    },
    answer: {
      type: 'textInput',
      data: {
        acceptedAnswers: [data.name.common, data.name.official],
      },
    },
  };
};

const useGameStore = create<GameStore>()((set, get) => ({
  entry: getEntry(),
  totalQuestions: 10,
  gameHistory: [],
  questionStartTimeInMs: Date.now(),
  nextQuestion: () =>
    set((state) => {
      return {
        ...state,
        entry: getEntry(),
      };
    }),
  answerQuestion: (answer) => {
    set((state) => ({ ...state, userAnswer: answer }));

    const isCorrect = isCorrectQuizAnswer(get().entry.answer, answer);

    const answerTime = Date.now() - get().questionStartTimeInMs;

    const attempt: EntryAttempt = {
      entry: get().entry,
      answer,
      correct: isCorrect,
      timeToAnswerInMs: answerTime,
    };

    console.log(attempt);

    // set delay to move to next question in 2s
    setTimeout(
      () => {
        set((state) => {
          const entry = getEntry();
          return {
            ...state,
            entry,
            gameHistory: [...get().gameHistory, attempt],
            questionStartTimeInMs: Date.now(),
            userAnswer: undefined,
          };
        });
      },
      isCorrect ? 1000 : 2000,
    );
  },
}));

export default useGameStore;
