import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

function Layout() {
  const onClickTitle = () => {
    window.open('https://bitpin.ir/');
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography sx={{ cursor: 'pointer' }} onClick={onClickTitle}>
            Bitpin | Percentage Ordering
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
