import Coin from './Coin';
import usePagination from 'utils/usePagination';
import StyledPagination from './StyledPagination';
import { useIRTCoins, useIRTPage, useIRTSetPage } from 'config/store';

function IRTcoins() {
  const coins = useIRTCoins();
  const IRTpage = useIRTPage();
  const IRTsetPage = useIRTSetPage();

  const { data, pageCount } = usePagination({
    data: coins,
    countPerPage: 10,
    page: IRTpage,
  });

  const onChangePage = (_: unknown, newPage: number) => {
    IRTsetPage(newPage);
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
        page={IRTpage}
        onChange={onChangePage}
        color="primary"
        variant="outlined"
        shape="circular"
      />
    </>
  );
}

export default IRTcoins;
