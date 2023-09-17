import supabase from '../supabase/supabase.ts';

const joinQuiz = async (quizId: number, userId: string) => {
  // upsert the userQuizStats entry for the user
  const { data: userQuiz } = await supabase
    .from('user_quiz_stats')
    .upsert({
      user_id: userId,
      quiz_id: quizId,
    })
    .select('*')
    .single();

  if (!userQuiz) {
    throw new Error(`User quiz stats for user ${userId} not found`);
  }

  // retrieve all questions in the quiz
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('quiz_id', quizId);

  if (!questions) {
    throw new Error(`Questions for quiz ${quizId} not found`);
  }

  // upsert on all knowledge keys for this question set
  const knowledgeKeys = questions.map((question) => question.knowledge_key);

  const { data: userKnowledgeKeys } = await supabase
    .from('user_knowledge_keys')
    .upsert(
      knowledgeKeys.map((k) => ({
        user_id: userId,
        key: k,
      })),
      {
        onConflict: 'key',
      },
    )
    .select('*');

  if (!userKnowledgeKeys) {
    throw new Error(`User knowledge keys for user ${userId} not found`);
  }

  await supabase.from('user_question_scores').upsert(
    questions.map((q) => ({
      user_id: userId,
      question_id: q.id,
      knowledge_key: q.knowledge_key,
      user_quiz_id: userQuiz.id,
    })),
    { onConflict: 'user_id, question_id' },
  );
};

export default joinQuiz;
