import { Box, BoxProps } from '@mui/joy';

const Container = ({ children, sx, ...rest }: BoxProps) => (
  <Box
    sx={{
      maxWidth: 600,
      mx: 'auto',
      px: 2,
      pt: 'env(safe-area-inset-top)',
      pb: 'env(safe-area-inset-bottom)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh',
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
