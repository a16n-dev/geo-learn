import {
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  LinearProgress,
  Sheet,
  Stack,
  ToggleButtonGroup,
  Typography,
} from '@mui/joy';
import { Image, TextCursor, LayoutGrid, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';
import { QuizAnswer, QuizQuestion } from '../../data/types/Quiz.ts';
import WithOutlet from '../../hoc/WithOutlet/WithOutlet.tsx';
import supabase from '../../supabase/supabase.ts';

const renderQuestionFormatChip = (type: string) => {
  switch (type as QuizQuestion['type']) {
    case 'image':
      return (
        <Chip startDecorator={<Image />} key={type}>
          {'Image'}
        </Chip>
      );
    case 'text':
      return (
        <Chip startDecorator={<TextCursor />} key={type}>
          {'Text'}
        </Chip>
      );
    default:
      return null;
  }
};

const renderAnswerFormatChip = (type: string) => {
  switch (type as QuizAnswer['type']) {
    case 'textInput':
      return (
        <Chip startDecorator={<TextCursor />} key={type}>
          {'Text Input'}
        </Chip>
      );
    case 'textMultiChoice':
      return (
        <Chip startDecorator={<LayoutGrid />} key={type}>
          {'Multi-choice'}
        </Chip>
      );
    default:
      return null;
  }
};

const QuizOverview = () => {
  const { slug } = useParams();

  const [questionCount, setQuestionCount] = useState('10');

  const { data } = useQuery(
    ['quizes', slug],
    async () =>
      (
        await supabase
          .from('quizes')
          .select(`*, questions(count)`)
          .eq('slug', slug!)
          .single()
      ).data,
    { enabled: !!slug },
  );

  if (!slug) {
    return <Navigate to={'/'} replace={true} />;
  }

  if (!data) return <LinearProgress />;

  return (
    <Container>
      <Stack spacing={2}>
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
        <Typography level={'h1'}>{data.name}</Typography>
        <Typography>{data.description}</Typography>
        <Sheet sx={{ p: 1 }}>
          <Stack
            direction={'row'}
            divider={<Divider orientation={'vertical'} />}
            spacing={2}
          >
            <Stack spacing={1}>
              <Typography level={'body-sm'}>{'Questions'}</Typography>
              <Typography>{(data.questions[0] as any).count}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography level={'body-sm'}>{'Question Type'}</Typography>
              <Stack direction={'row'}>
                {data.question_formats.map(renderQuestionFormatChip)}
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography level={'body-sm'}>{'Answer Type'}</Typography>
              <Stack direction={'row'}>
                {data.answer_formats.map(renderAnswerFormatChip)}
              </Stack>
            </Stack>
          </Stack>
        </Sheet>
        <FormControl>
          <FormLabel>{'Question Count'}</FormLabel>
          <ToggleButtonGroup
            variant={'outlined'}
            value={questionCount}
            onChange={(_, newValue) => {
              setQuestionCount((v) => (newValue ? newValue : v));
            }}
          >
            <Button value={'10'}>{'10'}</Button>
            <Button value={'25'}>{'25'}</Button>
            <Button value={'50'}>{'50'}</Button>
          </ToggleButtonGroup>
        </FormControl>
        <Button component={RouterLink} to={'practice'}>
          {'Start Quiz'}
        </Button>
      </Stack>
    </Container>
  );
};

export default WithOutlet(QuizOverview);
