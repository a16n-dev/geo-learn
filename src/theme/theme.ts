import { extendTheme } from '@mui/joy';

const theme = extendTheme({
  fontFamily: {
    display: '"Fira Sans", var(--joy-fontFamily-fallback)',
    body: '"Fira Sans", var(--joy-fontFamily-fallback)',
  },
});

export default theme;
