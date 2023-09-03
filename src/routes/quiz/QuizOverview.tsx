import { Button, Typography } from '@mui/joy';
import { Navigate, useParams } from 'react-router-dom';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';
import WithOutlet from '../../hoc/WithOutlet/WithOutlet.tsx';

const QuizOverview = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to={'/'} replace={true} />;
  }

  return (
    <Container>
      <Typography level={'h1'}>{'Whats up'}</Typography>
      <Button component={RouterLink} to={'practice'}>
        {'Start Quiz'}
      </Button>
    </Container>
  );
};

export default WithOutlet(QuizOverview);
