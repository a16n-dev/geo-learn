import { CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';
import { Outlet } from 'react-router-dom';

import theme from '../theme/theme.ts';

const RootLayout = () => {
  return (
    <CssVarsProvider theme={theme} defaultMode={'dark'}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '& .lucide': {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '1em',
            height: '1em',
          },
        }}
      />
      <Outlet />
    </CssVarsProvider>
  );
};

export default RootLayout;
