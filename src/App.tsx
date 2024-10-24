import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AppFallback from 'shared-components/loading/AppFallback';

import router from 'config/router';
import theme from 'config/theme';
import { useMode } from 'config/store';

function App() {
  const mode = useMode();

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <Suspense fallback={<AppFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
