import { QuizAnswer } from '../../../../data/types/Quiz.ts';

export interface QuizAnswerDisplayProps<
  T extends QuizAnswer['type'] | undefined = undefined,
> {
  /**
   * Information about the correct answer to the question
   */
  answer: T extends undefined ? QuizAnswer : Extract<QuizAnswer, { type: T }>;
  /**
   * Information about the correct answer to the question
   */
  additionalIncorrectAnswers: T extends undefined
    ? QuizAnswer[]
    : Extract<QuizAnswer, { type: T }>[];
  /**
   * The users answer to the given question
   */
  userAnswer?: string;
  /**
   * Sets the users answer to the given question
   * @param userAnswer
   */
  setUserAnswer: (userAnswer: string) => void;
}
