import { Box, Divider, Sheet, Stack, Typography } from '@mui/joy';
import { CheckCircle2, XCircle } from 'lucide-react';

import { EntryAttempt } from '../../../../data/types/Quiz.ts';

interface QuizEntryAttemptDisplayProps {
  attempt: EntryAttempt;
}

const QuizEntryAttemptDisplay = ({ attempt }: QuizEntryAttemptDisplayProps) => {
  return (
    <Sheet sx={{ p: 2 }}>
      <Stack spacing={1}>
        {/* Question goes here */}
        <Divider />
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography
            color={attempt.correct ? 'success' : 'danger'}
            startDecorator={
              attempt.correct ? (
                <Box
                  color={'success.main'}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <CheckCircle2 />
                </Box>
              ) : (
                <Box
                  component={'span'}
                  sx={{ alignItems: 'center', display: 'inline-flex' }}
                >
                  <XCircle size={16} />
                </Box>
              )
            }
          >
            {attempt.answer}
          </Typography>
          <Typography component={'span'} level={'body-sm'}>
            {`${attempt.timeToAnswerInMs / 1000}s`}
          </Typography>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default QuizEntryAttemptDisplay;
