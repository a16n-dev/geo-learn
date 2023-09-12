type QuizImageQuestion = {
  type: 'image';
  data: {
    url: string;
    caption: string;
  };
};

type QuizTextQuestion = {
  type: 'text';
  data: {
    text: string;
    caption?: string;
  };
};

export type QuizQuestion = QuizImageQuestion | QuizTextQuestion;

export type QuizTextInputAnswer = {
  type: 'textInput';
  data: {
    acceptedAnswers: string[];
  };
};

export type QuizTextMultiChoiceAnswer = {
  type: 'textMultiChoice';
  data: {
    answers: {
      id: string;
      text: string;
    }[];
    correctAnswerId: string;
  };
};

export type QuizAnswer = QuizTextInputAnswer | QuizTextMultiChoiceAnswer;

export type QuizEntry = {
  /**
   * The id of the quiz entry. This is used to store spaced repetition information
   */
  id: string;
  /**
   * The question for the entry, in any acceptable format
   */
  question: QuizQuestion;
  /**
   * The answer for the entry, in any acceptable format
   */
  answer: QuizAnswer;
};

export type EntryAttempt = {
  entry: QuizEntry;
  answer: string;
  timeToAnswerInMs: number;
  correct: boolean;
};
