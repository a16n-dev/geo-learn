import {
  Typography,
  Stack,
  SvgIcon,
  Button,
  Sheet,
  Divider,
  Box,
} from '@mui/joy';
import { Trophy } from 'lucide-react';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';
import WithOutlet from '../../hoc/WithOutlet/WithOutlet.tsx';
import useGameStore from '../../hooks/useGameStore.tsx';

const QuizSummary = () => {
  const gameHistory = useGameStore((state) => state.state.gameHistory);

  return (
    <Container>
      <Stack spacing={4} sx={{ flexGrow: 1, py: 4 }}>
        <SvgIcon
          fontSize={'xl4'}
          color={'primary'}
          sx={{ alignSelf: 'center' }}
        >
          <Trophy />
        </SvgIcon>
        <Stack>
          <Typography color={'neutral'} textAlign={'center'}>
            {'Flags of the world'}
          </Typography>
          <Typography level={'h1'} textAlign={'center'}>
            {'Session Complete!'}
          </Typography>
        </Stack>
        <Stack
          spacing={3}
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ width: 200, alignSelf: 'center' }}
        >
          <Stack sx={{ flex: '1 0 0', width: 0 }}>
            <Typography textAlign={'center'} level={'h1'} color={'success'}>
              {gameHistory.filter((a) => a.correct).length}
            </Typography>
            <Typography textAlign={'center'} color={'neutral'}>
              {'Correct'}
            </Typography>
          </Stack>
          <Divider
            sx={{ transform: 'rotate(15deg)' }}
            orientation={'vertical'}
          />
          <Stack sx={{ flex: '1 0 0', width: 0 }}>
            <Typography textAlign={'center'} level={'h1'} color={'danger'}>
              {gameHistory.filter((a) => !a.correct).length}
            </Typography>
            <Typography textAlign={'center'} color={'neutral'}>
              {'Incorrect'}
            </Typography>
          </Stack>
        </Stack>
        <Sheet sx={{ p: 2 }}>
          <Typography>{'Level 21'}</Typography>
        </Sheet>
        <Box sx={{ flexGrow: 1 }} />
        <Stack spacing={2}>
          <Button component={RouterLink} to={'breakdown'} variant={'outlined'}>
            {'View breakdown'}
          </Button>
          <Button component={RouterLink} to={'..'}>
            {'Done'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default WithOutlet(QuizSummary);
