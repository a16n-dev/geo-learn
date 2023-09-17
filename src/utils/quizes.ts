import { countries } from '../data/countries.ts';
import supabase from '../supabase/supabase.ts';
import { createQuiz } from './createQuiz.ts';

export const createQuizes = async () => {
  await createQuiz(
    {
      name: 'Flags of the World',
      slug: 'flags-of-the-world',
      description:
        'Learn the flags of all UN-recognised countries in a multichoice format',
      questionFormats: ['image'],
      answerFormats: ['textMultiChoice'],
    },
    countries
      .filter((c) => c.unMember)
      .map((c) => ({
        id: `flags-image-multichoice-${c.cca3.toLowerCase()}`,
        questionType: 'image',
        answerType: 'textMultiChoice',
        question: {
          url: supabase.storage
            .from('flags')
            .getPublicUrl(`${c.cca3.toLowerCase()}.svg`).data.publicUrl,
          caption: 'What country is this flag from?',
        },
        answer: {
          id: c.cca3.toLowerCase(),
          text: c.name.common,
        },
        key: `${c.cca3.toLowerCase()}-flag`,
        includeAdditionalIncorrectAnswers: 3,
      })),
  );

  await createQuiz(
    {
      name: 'Flags of the World (Written)',
      slug: 'flags-of-the-world-written',
      description:
        'Learn the flags of all UN-recognised countries where you need to write the answer',
      questionFormats: ['image'],
      answerFormats: ['textInput'],
    },
    countries
      .filter((c) => c.unMember)
      .map((c) => ({
        id: `flags-image-written-${c.cca3.toLowerCase()}`,
        questionType: 'image',
        answerType: 'textInput',
        question: {
          url: supabase.storage
            .from('flags')
            .getPublicUrl(`${c.cca3.toLowerCase()}.svg`).data.publicUrl,
          caption: 'What country is this flag from?',
        },
        answer: {
          acceptedAnswers: [c.name.common, c.name.official],
        },
        key: `${c.cca3.toLowerCase()}-flag-written`,
        includeAdditionalIncorrectAnswers: 0,
      })),
  );
};
