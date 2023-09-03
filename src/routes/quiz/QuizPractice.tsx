import { Box, Button, IconButton, LinearProgress, Stack } from '@mui/joy';
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
      <Stack sx={{ height: '100dvh', py: 2 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <IconButton variant={'outlined'} color={'neutral'}>
            <ArrowLeft />
          </IconButton>
          <LinearProgress determinate value={25} />
          <IconButton variant={'outlined'} color={'neutral'}>
            <Menu />
          </IconButton>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flex: '1 1 0',
          }}
        >
          <Box
            component={'img'}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
            }}
            alt={question}
            src={`https://raw.githubusercontent.com/mledoze/countries/master/data/${question.toLowerCase()}.svg`}
          />
        </Box>
        <Stack spacing={2} sx={{ flex: '0 0 0' }}>
          {answers.map(({ id, display }) => {
            if (!userAnswer) {
              return (
                <Button size={'lg'} key={id} onClick={() => answerQuestion(id)}>
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
                  size={'lg'}
                >
                  {display}
                </Button>
              );
            } else if (isCorrect && !isSelected) {
              return (
                <Button key={id} size={'lg'} color={'success'} variant={'soft'}>
                  {display}
                </Button>
              );
            } else if (!isCorrect && isSelected) {
              return (
                <Button
                  size={'lg'}
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
                <Button size={'lg'} key={id} variant={'outlined'}>
                  {display}
                </Button>
              );
            }
          })}
        </Stack>
        <Button
          size={'lg'}
          sx={{ mt: 4 }}
          disabled={!userAnswer}
          onClick={() => nextQuestion()}
        >
          {'Next Question'}
        </Button>
      </Stack>
    </Container>
  );
};

export default QuizPractice;
