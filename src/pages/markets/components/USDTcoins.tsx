import Coin from './Coin';
import usePagination from 'utils/usePagination';
import StyledPagination from './StyledPagination';
import { useUSDTCoins, useUSDTPage, useUSDTSetPage } from 'config/store';

function USDTcoins() {
  const coins = useUSDTCoins();
  const USDTpage = useUSDTPage();
  const USDTsetPage = useUSDTSetPage();

  const { data, pageCount } = usePagination({
    data: coins,
    countPerPage: 10,
    page: USDTpage,
  });

  const onChangePage = (_: unknown, newPage: number) => {
    USDTsetPage(newPage);
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
        page={USDTpage}
        onChange={onChangePage}
        color="primary"
        variant="outlined"
        shape="circular"
      />
    </>
  );
}

export default USDTcoins;
