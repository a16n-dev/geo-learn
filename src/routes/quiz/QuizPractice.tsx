import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Sheet,
  Stack,
} from '@mui/joy';
import { ArrowLeft, CheckCircle2, Menu, XCircle } from 'lucide-react';

import Container from '../../components/layout/Container/Container.tsx';
import useGameStore from '../../hooks/useGameStore.tsx';

const QuizPractice = () => {
  const {
    question,
    answers,
    answerQuestion,
    userAnswer,
    nextQuestion,
    correctAnswer,
  } = useGameStore((state) => state);

  return (
    <Container>
      <Stack spacing={1}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <IconButton variant={'outlined'} color={'neutral'}>
            <ArrowLeft />
          </IconButton>
          <LinearProgress determinate value={25} />
          <IconButton variant={'outlined'} color={'neutral'}>
            <Menu />
          </IconButton>
        </Stack>
        <Sheet sx={{ p: 2 }}>
          <Box
            component={'img'}
            sx={{ width: '100%' }}
            alt={question}
            src={`https://raw.githubusercontent.com/mledoze/countries/master/data/${question.toLowerCase()}.svg`}
          />
        </Sheet>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <Stack spacing={2}>
        {answers.map(({ id, display }) => {
          if (!userAnswer) {
            return (
              <Button key={id} onClick={() => answerQuestion(id)}>
                {display}
              </Button>
            );
          }

          const isCorrect = id === correctAnswer;
          const isSelected = id === userAnswer;

          if (isCorrect && isSelected) {
            return (
              <Button
                key={id}
                color={'success'}
                variant={'soft'}
                endDecorator={<CheckCircle2 />}
              >
                {display}
              </Button>
            );
          } else if (isCorrect && !isSelected) {
            return (
              <Button key={id} color={'success'} variant={'soft'}>
                {display}
              </Button>
            );
          } else if (!isCorrect && isSelected) {
            return (
              <Button
                key={id}
                color={'danger'}
                variant={'soft'}
                endDecorator={<XCircle />}
              >
                {display}
              </Button>
            );
          } else {
            return (
              <Button key={id} variant={'outlined'}>
                {display}
              </Button>
            );
          }
        })}
      </Stack>
      <Button
        sx={{ mt: 4 }}
        disabled={!userAnswer}
        onClick={() => nextQuestion()}
      >
        {'Next Question'}
      </Button>
    </Container>
  );
};

export default QuizPractice;
