import { QuizQuestion } from '../../../../data/types/Quiz.ts';

export interface QuizQuestionDisplayProps<
  T extends QuizQuestion['type'] | undefined = undefined,
> {
  question: T extends undefined
    ? QuizQuestion
    : Extract<QuizQuestion, { type: T }>;
}
