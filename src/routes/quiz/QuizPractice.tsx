import { CircularProgress, IconButton, LinearProgress, Stack } from '@mui/joy';
import { ArrowLeft, Menu } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';
import QuizAnswerDisplay from '../../components/lib/quiz/QuizAnswerDisplay/QuizAnswerDisplay.tsx';
import QuizQuestionDisplay from '../../components/lib/quiz/QuizQuestionDisplay/QuizQuestionDisplay.tsx';
import useDisableOverscroll from '../../hooks/useDisableOverscroll.tsx';
import useGameStore from '../../hooks/useGameStore.tsx';

const QuizPractice = () => {
  const { slug } = useParams();
  useDisableOverscroll();

  const { answerQuestion, entry, userAnswer, state, metadata } = useGameStore(
    (state) => state,
  );

  if (!state.inProgress && state.gameHistory.length === 0) {
    return <Navigate to={`/quiz/${slug}`} />;
  }

  if (!state.inProgress) {
    return <Navigate to={`/quiz/${slug}/practice-summary`} />;
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
            value={(state.gameHistory.length / metadata.totalQuestions) * 100}
          />
          <IconButton variant={'outlined'} color={'neutral'}>
            <Menu />
          </IconButton>
        </Stack>
        {entry ? (
          <>
            <QuizQuestionDisplay question={entry.question} />
            <QuizAnswerDisplay
              answer={entry.answer}
              userAnswer={userAnswer}
              setUserAnswer={answerQuestion}
              additionalIncorrectAnswers={entry.additionalIncorrctAnswers}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </Container>
  );
};

export default QuizPractice;
