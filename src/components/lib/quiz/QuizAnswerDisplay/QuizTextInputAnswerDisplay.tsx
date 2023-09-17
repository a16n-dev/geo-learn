import { Stack, Input, IconButton } from '@mui/joy';
import { ArrowRight, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

import { isCorrectQuizAnswer } from '../../../../data/types/helperFns.tsx';
import { QuizAnswerDisplayProps } from './types.ts';

const QuizTextInputAnswerDisplay = ({
  answer,
  userAnswer,
  setUserAnswer,
}: QuizAnswerDisplayProps<'textInput'>) => {
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue('');
  }, [answer]);

  const handleSubmit = useCallback(() => {
    // prevent focus being lost on the input

    inputRef.current?.focus();

    if (userAnswer !== undefined) return;
    setUserAnswer(value);
  }, [value]);

  useEffect(() => {
    // listen for enter key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);

  const wasCorrect = isCorrectQuizAnswer(answer, userAnswer);

  return (
    <Stack direction={'row'} spacing={1}>
      <Input
        slotProps={{
          input: {
            ref: inputRef,
            spellCheck: false,
          },
        }}
        autoComplete={'false'}
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
        onChange={(e) => {
          userAnswer === undefined && setValue(e.target.value);
        }}
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
        color={'neutral'}
        disabled={!!userAnswer}
        onClick={handleSubmit}
      >
        <ArrowRight />
      </IconButton>
    </Stack>
  );
};

export default QuizTextInputAnswerDisplay;
