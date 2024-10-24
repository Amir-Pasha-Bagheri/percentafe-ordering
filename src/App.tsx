import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AppFallback from 'shared-components/loading/AppFallback';

import router from 'config/router';
import theme from 'config/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<AppFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
