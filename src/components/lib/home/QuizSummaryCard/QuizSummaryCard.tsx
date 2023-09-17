import { Button, Sheet, Typography, Stack } from '@mui/joy';

import { Database } from '../../../../supabase/database.types.ts';
import { RouterLink } from '../../../layout/RouterLink/RouterLink.tsx';

interface QuizSummaryProps {
  data: Database['public']['Tables']['quizes']['Row'];
}

const QuizSummaryCard = ({ data }: QuizSummaryProps) => {
  return (
    <Sheet variant={'soft'} sx={{ p: 2 }}>
      <Stack>
        <Typography level={'h4'} gutterBottom>
          {data.name}
        </Typography>
        <Button
          color={'neutral'}
          component={RouterLink}
          to={`/quiz/${data.slug}`}
        >
          {'Play Quiz'}
        </Button>
      </Stack>
    </Sheet>
  );
};

export default QuizSummaryCard;
