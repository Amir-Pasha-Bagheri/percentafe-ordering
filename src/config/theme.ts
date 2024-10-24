import { createTheme, Theme } from '@mui/material';

const themeProvider: { [key in 'dark' | 'light']: Theme } = {
  light: createTheme({}),
  dark: createTheme({
    palette: {
      mode: 'dark',
    },
  }),
};

const theme = (mode: 'dark' | 'light') => themeProvider[mode];

export default theme;
