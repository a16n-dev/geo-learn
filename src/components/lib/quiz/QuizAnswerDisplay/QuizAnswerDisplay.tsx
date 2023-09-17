import { Box } from '@mui/joy';

import QuizTextInputAnswerDisplay from './QuizTextInputAnswerDisplay.tsx';
import QuizTextMultiChoiceAnswerDisplay from './QuizTextMultiChoiceAnswerDisplay.tsx';
import { QuizAnswerDisplayProps } from './types.ts';

/**
 * Allows the user to answer a question. Also responsible for giving the user feedback on their answer
 */
const QuizAnswerDisplay = ({
  answer,
  userAnswer,
  setUserAnswer,
}: QuizAnswerDisplayProps) => {
  return (
    <Box sx={{ flex: '0 0 0' }}>
      {(() => {
        switch (answer.type) {
          case 'textInput':
            return (
              <QuizTextInputAnswerDisplay
                answer={answer}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
              />
            );
          case 'textMultiChoice':
            return (
              <QuizTextMultiChoiceAnswerDisplay
                answer={answer}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
              />
            );
        }
      })()}
    </Box>
  );
};

export default QuizAnswerDisplay;
