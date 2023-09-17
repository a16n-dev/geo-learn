import { Box, Stack, Typography } from '@mui/joy';

import { QuizQuestionDisplayProps } from './types.ts';

const QuizImageQuestionDisplay = ({
  question,
}: QuizQuestionDisplayProps<'image'>) => {
  return (
    <Stack alignItems={'center'} spacing={1}>
      <Typography textAlign={'center'} color={'neutral'}>
        {question.data.caption}
      </Typography>
      <Box
        component={'img'}
        sx={{
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'block',
          borderRadius: 3,
        }}
        alt={question.data.caption}
        src={question.data.url}
      />
    </Stack>
  );
};

export default QuizImageQuestionDisplay;
