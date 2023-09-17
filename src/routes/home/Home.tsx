import { Button, Stack, Typography } from '@mui/joy';
import { useQuery } from 'react-query';

import Container from '../../components/layout/Container/Container.tsx';
import QuizSummaryCard from '../../components/lib/home/QuizSummaryCard/QuizSummaryCard.tsx';
import supabase from '../../supabase/supabase.ts';
import { createQuizes } from '../../utils/quizes.ts';

const Home = () => {
  const { data } = useQuery(
    'quizes',
    async () => (await supabase.from('quizes').select('*')).data,
  );

  return (
    <Container>
      <Typography level={'h1'}>{'Quizes'}</Typography>
      {data && (
        <Stack sx={{ py: 2 }} spacing={2}>
          {data.map((entry) => (
            <QuizSummaryCard key={entry.id} data={entry} />
          ))}
        </Stack>
      )}
      <Button onClick={() => createQuizes()}>{'Setup quizes'}</Button>
    </Container>
  );
};

export default Home;
