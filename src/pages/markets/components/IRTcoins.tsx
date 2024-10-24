import Coin from './Coin';
import usePagination from 'utils/usePagination';
import StyledPagination from './StyledPagination';
import { useIRTCoins } from 'config/store';

function IRTcoins() {
  const coins = useIRTCoins();
  const { data, pageCount, page, changePage } = usePagination({ data: coins, countPerPage: 10 });

  const onChange = (_: unknown, newPage: number) => {
    changePage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {data.map((coin) => (
        <Coin
          key={coin.id}
          title={coin.title}
          img={coin.currency1.image}
          altImg={coin.currency2.image}
        />
      ))}

      <StyledPagination
        count={pageCount}
        page={page}
        onChange={onChange}
        color="primary"
        variant="outlined"
        shape="circular"
      />
    </>
  );
}

export default IRTcoins;
