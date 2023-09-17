import { QuizAnswer, QuizQuestion } from '../data/types/Quiz.ts';
import supabase from '../supabase/supabase.ts';

type createQuizQuestion<
  Q extends QuizQuestion['type'],
  A extends QuizAnswer['type'],
> = {
  id: string;
  questionType: Q;
  answerType: A;
  question: Extract<QuizQuestion, { type: Q }>['data'];
  answer: Extract<QuizAnswer, { type: A }>['data'];
  keys: string[];
  includeAdditionalIncorrectAnswers: number;
};

type createQuizMetadata = {
  name: string;
  slug: string;
  description: string;
  questionFormats: Array<QuizQuestion['type']>;
  answerFormats: Array<QuizAnswer['type']>;
};

export const createQuiz = async <
  Q extends QuizQuestion['type'],
  A extends QuizAnswer['type'],
>(
  data: createQuizMetadata,
  questions: createQuizQuestion<Q, A>[],
) => {
  // check if the quiz entry exists
  const existingQuiz = await supabase
    .from('quizes')
    .select('id')
    .eq('slug', data.slug)
    .limit(1)
    .maybeSingle();

  let existingQuizId = existingQuiz.data?.id;

  if (!existingQuizId) {
    // create the quiz
    const newQuiz = await supabase
      .from('quizes')
      .insert({
        name: data.name,
        question_formats: data.questionFormats,
        answer_formats: data.answerFormats,
        slug: data.slug,
        description: data.description,
      })
      .select()
      .single();

    if (newQuiz.error) {
      throw new Error(newQuiz.error.message);
    }

    existingQuizId = newQuiz.data.id;
  }
  // create all of the questions

  const questionEntries = questions.map((q) => ({
    id: q.id,
    quiz_id: existingQuizId as number,
    question_type: q.questionType,
    answer_type: q.answerType,
    question: q.question,
    answer: q.answer,
    keys: q.keys,
    needs_additional_incorrect_count: q.includeAdditionalIncorrectAnswers,
  }));

  await supabase
    .from('questions')
    .upsert(questionEntries, { onConflict: 'id' });
};
