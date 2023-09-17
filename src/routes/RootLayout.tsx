import { CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';

import theme from '../theme/theme.ts';

// Create a client
const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default RootLayout;
