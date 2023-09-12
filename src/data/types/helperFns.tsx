import { distance } from 'fastest-levenshtein';

import {
  QuizAnswer,
  QuizTextInputAnswer,
  QuizTextMultiChoiceAnswer,
} from './Quiz.ts';

const isCorrectTextAnswer = (
  answer: QuizTextInputAnswer,
  userAnswer: string,
) => {
  const userAnswerSanitized = userAnswer.trim().toLowerCase();

  return answer.data.acceptedAnswers.some((acceptedAnswer) => {
    const acceptedAnswerSanitized = acceptedAnswer.trim().toLowerCase();

    const dist = distance(userAnswerSanitized, acceptedAnswerSanitized);

    return dist < Math.floor(acceptedAnswerSanitized.length / 5);
  });
};

const isCorrectMultichoiceTextAnswer = (
  answer: QuizTextMultiChoiceAnswer,
  userAnswer: string,
) => {
  return userAnswer === answer.data.correctAnswerId;
};

/**
 * Determines if a given answer matches the correct answer for a question
 * @param answer
 * @param userAnswer
 */
export const isCorrectQuizAnswer = (
  answer: QuizAnswer,
  userAnswer?: string,
): boolean => {
  if (!userAnswer) {
    return false;
  }
  switch (answer.type) {
    case 'textInput':
      return isCorrectTextAnswer(answer, userAnswer);
    case 'textMultiChoice':
      return isCorrectMultichoiceTextAnswer(answer, userAnswer);
  }

  return false;
};
