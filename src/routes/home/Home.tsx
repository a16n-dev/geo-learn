import { Button, Typography } from '@mui/joy';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';

const Home = () => {
  return (
    <Container>
      <Typography level={'h1'}>{'Geowhiz'}</Typography>
      <Button component={RouterLink} to={'/quiz/flags-of-the-world'}>
        {'Flags of the World'}
      </Button>
    </Container>
  );
};

export default Home;
