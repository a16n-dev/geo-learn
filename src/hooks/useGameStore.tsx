import { sample } from 'lodash';
import { create } from 'zustand';

import { countries, CountryData } from '../data/countries.ts';

export interface GameStore {
  question: string;
  answers: { display: string; id: string }[];
  correctAnswer: string;
  userAnswer?: string;
  nextQuestion: () => void;
  answerQuestion: (answer: string) => void;
}

const dataset = countries; // .filter((d) => d.unMember);

const getQuestion = () => sample(dataset) as CountryData;

const getFakeAnswers = (correctAnswer: string, count: number) => {
  const answers: CountryData[] = [];
  while (answers.length < count) {
    const answer = sample(dataset);
    if (answer && answer.cca3 !== correctAnswer) {
      answers.push(answer);
    }
  }

  return answers.map((a) => ({
    display: a.name.common,
    id: a.cca3,
  }));
};

const defaultQuestion = getQuestion();

const useGameStore = create<GameStore>()((set) => ({
  question: defaultQuestion.cca3,
  answers: [
    ...getFakeAnswers(defaultQuestion.cca3, 3),
    {
      display: defaultQuestion.name.common,
      id: defaultQuestion.cca3,
    },
  ],
  correctAnswer: defaultQuestion.cca3,
  nextQuestion: () =>
    set((state) => {
      const question = getQuestion();
      return {
        ...state,
        question: question?.cca3,
        userAnswer: undefined,
        answers: [
          ...getFakeAnswers(question.cca3, 3),
          {
            display: question.name.common,
            id: question.cca3,
          },
        ],
        correctAnswer: question.cca3,
      };
    }),
  answerQuestion: (answer) =>
    set((state) => ({ ...state, userAnswer: answer })),
}));

export default useGameStore;
