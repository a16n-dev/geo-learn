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
import { Image, TextCursor, LayoutGrid, ArrowLeft, Lock } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import Container from '../../components/layout/Container/Container.tsx';
import { RouterLink } from '../../components/layout/RouterLink/RouterLink.tsx';
import { QuizAnswer, QuizQuestion } from '../../data/types/Quiz.ts';
import WithOutlet from '../../hoc/WithOutlet/WithOutlet.tsx';
import useAuthSession from '../../hooks/useAuthSession.tsx';
import useGameStore from '../../hooks/useGameStore.tsx';
import supabase from '../../supabase/supabase.ts';
import joinQuiz from '../../utils/joinQuiz.ts';

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

  const { data: quiz } = useQuery(
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

  const quizId = quiz?.id;

  const session = useAuthSession();
  const navigate = useNavigate();

  const startGame = useGameStore((state) => state.startGame);

  const { data: userQuiz } = useQuery(
    ['userGameStats', quizId],
    async () =>
      (
        await supabase
          .from('user_quiz_stats')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('quiz_id', quizId!)
          .maybeSingle()
      ).data,
    { enabled: !!quizId },
  );

  if (!slug) {
    return <Navigate to={'/'} replace={true} />;
  }

  if (!quiz) return <LinearProgress />;

  const handleUnlockQuiz = async () => {
    await joinQuiz(quiz.id, session.user.id);
  };

  const handleStartGame = async () => {
    if (!userQuiz) return;
    await startGame({
      numQuestions: (quiz.questions[0] as any).count,
      userQuizId: userQuiz.id,
      totalQuestions: parseInt(questionCount),
    });

    navigate('practice');
  };

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
        <Typography level={'h1'}>{quiz.name}</Typography>
        <Typography>{quiz.description}</Typography>
        <Sheet sx={{ p: 2 }}>
          <Stack
            direction={'row'}
            divider={<Divider orientation={'vertical'} />}
            spacing={2}
          >
            <Stack spacing={1}>
              <Typography level={'body-sm'}>{'Questions'}</Typography>
              <Typography>{(quiz.questions[0] as any).count}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography level={'body-sm'}>{'Question Type'}</Typography>
              <Stack direction={'row'}>
                {quiz.question_formats.map(renderQuestionFormatChip)}
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography level={'body-sm'}>{'Answer Type'}</Typography>
              <Stack direction={'row'}>
                {quiz.answer_formats.map(renderAnswerFormatChip)}
              </Stack>
            </Stack>
          </Stack>
        </Sheet>
        {userQuiz ? (
          <>
            {' '}
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
            <Button onClick={handleStartGame}>{'Start Quiz'}</Button>
          </>
        ) : (
          <>
            <Sheet variant={'soft'} sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography>
                  {"You haven't started learning this quiz yet"}
                </Typography>
                <Button startDecorator={<Lock />} onClick={handleUnlockQuiz}>
                  {'Unlock Quiz'}
                </Button>
              </Stack>
            </Sheet>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default WithOutlet(QuizOverview);
