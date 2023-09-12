import { Stack, Button } from '@mui/joy';
import { CheckCircle2, XCircle } from 'lucide-react';

import { QuizAnswerDisplayProps } from './types.ts';

const QuizTextMultiChoiceAnswerDisplay = ({
  answer,
  userAnswer,
  setUserAnswer,
}: QuizAnswerDisplayProps<'textMultiChoice'>) => {
  return (
    <Stack spacing={2}>
      {answer.data.answers.map(({ id, text }) => {
        if (!userAnswer) {
          return (
            <Button size={'lg'} key={id} onClick={() => setUserAnswer(id)}>
              {text}
            </Button>
          );
        }

        const isCorrect = id === answer.data.correctAnswerId;
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
