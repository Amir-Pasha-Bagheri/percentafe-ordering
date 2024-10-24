import { Pagination, styled } from '@mui/material';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: 'flex',
  placeContent: 'center',
  width: '100%',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

export default StyledPagination;
