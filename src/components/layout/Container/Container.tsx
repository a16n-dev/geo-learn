import { Box, BoxProps } from '@mui/joy';

const Container = ({ children, sx, ...rest }: BoxProps) => (
  <Box
    sx={{
      maxWidth: 600,
      mx: 'auto',
      px: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      overflow: 'auto',
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
