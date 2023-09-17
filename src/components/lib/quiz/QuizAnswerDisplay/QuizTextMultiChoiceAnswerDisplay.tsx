import { Stack, Button } from '@mui/joy';
import { shuffle } from 'lodash';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useMemo } from 'react';

import { QuizAnswerDisplayProps } from './types.ts';

const QuizTextMultiChoiceAnswerDisplay = ({
  answer,
  userAnswer,
  setUserAnswer,
  additionalIncorrectAnswers,
}: QuizAnswerDisplayProps<'textMultiChoice'>) => {
  const allAnswers = useMemo(
    () => shuffle([answer, ...additionalIncorrectAnswers]),
    [answer, additionalIncorrectAnswers],
  );

  return (
    <Stack spacing={2}>
      {allAnswers.map(({ data: { id, text } }) => {
        if (!userAnswer) {
          return (
            <Button size={'lg'} key={id} onClick={() => setUserAnswer(id)}>
              {text}
            </Button>
          );
        }

        const isCorrect = id === answer.data.id;
        const isSelected = id === userAnswer;

        if (isCorrect && isSelected) {
          return (
            <Button
              key={id}
              color={'success'}
              endDecorator={<CheckCircle2 />}
              size={'lg'}
            >
              {text}
            </Button>
          );
        } else if (isCorrect && !isSelected) {
          return (
            <Button key={id} size={'lg'} color={'success'}>
              {text}
            </Button>
          );
        } else if (!isCorrect && isSelected) {
          return (
            <Button
              size={'lg'}
              key={id}
              color={'danger'}
              endDecorator={<XCircle />}
            >
              {text}
            </Button>
          );
        } else {
          return (
            <Button size={'lg'} key={id} disabled>
              {text}
            </Button>
          );
        }
      })}
    </Stack>
  );
};

export default QuizTextMultiChoiceAnswerDisplay;
