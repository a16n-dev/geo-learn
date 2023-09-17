import supabase from '../supabase/supabase.ts';

class QuizManager {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async updateUserSrpKeyScore(
    key: string,
    score: number,
  ): Promise<DBUserSrpKeyScore> {
    return await ({} as any).userSrpKey.update([this.userId, key], score);
  }

  async getUserSrpKeyScore(key: string) {
    const res = await supabase
      .from('user_key_scores')
      .select(`key, score`)
      .eq('user_id', this.userId)
      .eq('key', key)
      .limit(1);

    const item = (res.data || [])[0];

    if (!item) {
      throw new Error('not found');
    }

    return item;
  }

  async refreshUserQuestionScore(id: string) {
    // get the question
    // get the user's score for each srp key
    // average the scores
    // save the score

    return {};
  }
}
