import { LinearProgress, Typography } from '@mui/material';

function FetchServer() {
  return (
    <>
      <LinearProgress />
      <Typography sx={{ textAlign: 'center', marginTop: 2 }}>Fetching...</Typography>
    </>
  );
}

export default FetchServer;
