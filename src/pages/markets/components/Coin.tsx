import { Avatar, Box, Card, Divider, Grid2, styled, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import splitNumber from 'utils/splitNumber';

interface CoinProps {
  title: string;
  price: string;
  img: string;
  altImg: string;
  marketId: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  cursor: 'pointer',

  '.chevron': {
    transition: '0.3s',
  },
  ':hover .chevron': {
    marginRight: theme.spacing(3),
  },
}));

function Coin(props: CoinProps) {
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/markets/${props.marketId}`);
  };

  return (
    <StyledCard elevation={3} onClick={onClickCard}>
      <Grid2 container alignItems="center" flexWrap="nowrap">
        <Avatar src={props.img} alt={props.title} sx={{ width: 35, height: 35 }} />
        <Avatar
          src={props.altImg}
          alt={props.title}
          sx={{ width: 20, height: 20, marginLeft: 0.25, marginTop: 3 }}
        />

        <Divider orientation="vertical" flexItem sx={{ margin: '0 10px', borderWidth: 1 }} />

        <Box sx={{ flexGrow: 1 }}>
          <Typography>{props.title}</Typography>
          <Typography variant="subtitle2" color="primary">
            $ {splitNumber(props.price)}
          </Typography>
        </Box>

        <ChevronRight className="chevron" />
      </Grid2>
    </StyledCard>
  );
}

export default Coin;
