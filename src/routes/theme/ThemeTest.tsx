import { Box, Stack, Typography } from '@mui/joy';
import Color from 'color';

const ThemeTest = () => {
  const MAIN = '#3A4C56';

  const palette = {
    50: Color(MAIN)
      .lighten(Math.pow(1.25, 5) - 1)
      .hex(),
    100: Color(MAIN)
      .lighten(Math.pow(1.25, 4) - 1)
      .hex(),
    200: Color(MAIN)
      .lighten(Math.pow(1.25, 3) - 1)
      .hex(),
    300: Color(MAIN)
      .lighten(Math.pow(1.25, 2) - 1)
      .hex(),
    400: Color(MAIN).lighten(0.25).hex(),
    500: MAIN,
    600: Color(MAIN)
      .darken(Math.pow(1.15, 1) - 0.9)
      .hex(),
    700: Color(MAIN)
      .darken(Math.pow(1.15, 2) - 0.9)
      .hex(),
    800: Color(MAIN)
      .darken(Math.pow(1.15, 3) - 0.9)
      .hex(),
    900: Color(MAIN)
      .darken(Math.pow(1.15, 4) - 0.9)
      .hex(),
  };

  return (
    <Stack
      sx={{ width: '100vw', height: '100dvh' }}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={2}
    >
      <Stack direction={'row'} spacing={2}>
        {[
          '#EDF5FD',
          '#E3EFFB',
          '#C7DFF7',
          '#97C3F0',
          '#4393E4',
          '#0B6BCB',
          '#185EA5',
          '#12467B',
          '#0A2744',
          '#051423',
        ].map((val, i) => (
          <Box sx={{ background: val, width: 100, height: 50 }} key={i} />
        ))}
      </Stack>
      <Stack direction={'row'} spacing={2}>
        {Object.values(palette).map((val, i) => (
          <Box sx={{ background: val, width: 100, height: 50 }} key={i} />
        ))}
      </Stack>

      <Typography>{JSON.stringify(palette)}</Typography>
    </Stack>
  );
};
export default ThemeTest;
