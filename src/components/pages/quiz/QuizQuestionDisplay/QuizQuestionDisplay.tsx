import { Box } from '@mui/joy';

import QuizImageQuestionDisplay from './QuizImageQuestionDisplay.tsx';
import { QuizQuestionDisplayProps } from './types.ts';

const QuizQuestionDisplay = ({ question }: QuizQuestionDisplayProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flex: '1 1 0',
      }}
    >
      {(() => {
        switch (question.type) {
          case 'image':
            return <QuizImageQuestionDisplay question={question} />;
        }
      })()}
    </Box>
  );
};

export default QuizQuestionDisplay;
