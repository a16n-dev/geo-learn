import { IconButton, LinearProgress, Stack } from '@mui/joy';
import { ArrowLeft, Menu } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';
import QuizAnswerDisplay from '../../components/pages/quiz/QuizAnswerDisplay/QuizAnswerDisplay.tsx';
import QuizQuestionDisplay from '../../components/pages/quiz/QuizQuestionDisplay/QuizQuestionDisplay.tsx';
import useDisableOverscroll from '../../hooks/useDisableOverscroll.tsx';
import useGameStore from '../../hooks/useGameStore.tsx';

const QuizPractice = () => {
  const { id } = useParams();
  useDisableOverscroll();

  const { answerQuestion, entry, userAnswer, gameHistory, totalQuestions } =
    useGameStore((state) => state);

  const gameOver = gameHistory.length === totalQuestions;

  if (gameOver) {
    return <Navigate to={`/quiz/${id}/practice-summary`} />;
  }

  return (
    <Container>
      <Stack sx={{ flexGrow: 1 }} spacing={2}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <IconButton
            variant={'outlined'}
            color={'neutral'}
            component={RouterLink}
            to={'..'}
          >
            <ArrowLeft />
          </IconButton>
          <LinearProgress
            determinate
            value={(gameHistory.length / totalQuestions) * 100}
          />
          <IconButton variant={'outlined'} color={'neutral'}>
            <Menu />
          </IconButton>
        </Stack>
        <QuizQuestionDisplay question={entry.question} />
        <QuizAnswerDisplay
          answer={entry.answer}
          userAnswer={userAnswer}
          setUserAnswer={answerQuestion}
        />
      </Stack>
    </Container>
  );
};

export default QuizPractice;
