import { Stack, Input, IconButton } from '@mui/joy';
import { ArrowRight, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { isCorrectQuizAnswer } from '../../../../data/types/helperFns.tsx';
import { QuizAnswerDisplayProps } from './types.ts';

const QuizTextInputAnswerDisplay = ({
  answer,
  userAnswer,
  setUserAnswer,
}: QuizAnswerDisplayProps<'textInput'>) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
  }, [answer]);

  const wasCorrect = isCorrectQuizAnswer(answer, userAnswer);

  return (
    <Stack
      direction={'row'}
      component={'form'}
      onSubmit={(e) => {
        e.preventDefault();
        if (userAnswer !== undefined) return;
        setUserAnswer(value);
      }}
      spacing={1}
    >
      <Input
        autoComplete={'false'}
        readOnly={userAnswer !== undefined}
        color={
          userAnswer !== undefined
            ? wasCorrect
              ? 'success'
              : 'danger'
            : 'neutral'
        }
        value={
          userAnswer !== undefined ? answer.data.acceptedAnswers[0] : value
        }
        onChange={(e) => setValue(e.target.value)}
        startDecorator={
          userAnswer !== undefined ? (
            wasCorrect ? (
              <CheckCircle2 color={'currentColor'} />
            ) : (
              <XCircle color={'currentColor'} />
            )
          ) : (
            <HelpCircle color={'currentColor'} />
          )
        }
        autoFocus
        sx={{ flexGrow: 1 }}
        placeholder={'Type your answer here...'}
      />
      <IconButton
        variant={'solid'}
        color={'primary'}
        type={'submit'}
        disabled={!!userAnswer}
      >
        <ArrowRight />
      </IconButton>
    </Stack>
  );
};

export default QuizTextInputAnswerDisplay;
