import { Box, CircularProgress } from '@mui/material';

function AppFallback() {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default AppFallback;
