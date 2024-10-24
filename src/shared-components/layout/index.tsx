import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StyledSwitch from './StyledSwitch';
import { useMode, useSetMode } from 'config/store';

function Layout() {
  const mode = useMode();
  const setMode = useSetMode();

  const onClickTitle = () => {
    window.open('https://bitpin.ir/');
  };

  const onChangeSwitch = (_: unknown, checked: boolean) => {
    const newMode = checked ? 'dark' : 'light';
    setMode(newMode);
    window.localStorage.setItem('mode', newMode);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography sx={{ cursor: 'pointer' }} onClick={onClickTitle}>
            Bitpin | Percentage Ordering
          </Typography>
          <div style={{ flexGrow: 1 }} />

          <Typography>App Mode :</Typography>
          <StyledSwitch checked={mode === 'dark'} onChange={onChangeSwitch} />
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
