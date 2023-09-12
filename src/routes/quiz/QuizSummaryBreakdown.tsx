import { Typography, Stack, IconButton } from '@mui/joy';
import { ArrowLeft } from 'lucide-react';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';
import QuizEntryAttemptDisplay from '../../components/pages/quiz/QuizEntryAttemptDisplay/QuizEntryAttemptDisplay.tsx';
import useGameStore from '../../hooks/useGameStore.tsx';

const QuizSummaryBreakdown = () => {
  const { gameHistory } = useGameStore((state) => state);

  return (
    <Container>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <IconButton
          variant={'outlined'}
          color={'neutral'}
          component={RouterLink}
          to={'..'}
        >
          <ArrowLeft />
        </IconButton>
      </Stack>
      <Typography level={'h1'} textAlign={'center'}>
        {'Session Breakdown'}
      </Typography>
      <Stack spacing={2}>
        {gameHistory.map((entry, index) => (
          <QuizEntryAttemptDisplay attempt={entry} key={index} />
        ))}
      </Stack>
    </Container>
  );
};

export default QuizSummaryBreakdown;
