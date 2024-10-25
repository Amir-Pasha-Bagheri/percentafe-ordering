import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ServerError from 'shared-components/error/ServerError';
import FetchServer from 'shared-components/loading/FetchServer';
import useSWR from 'swr';
import averageArray from 'utils/averageArray';
import fetcher from 'utils/fetcher';
import splitNumber from 'utils/splitNumber';
import sumArray from 'utils/sumArray';
import PercentageInput from './PercentageInput';
import weightedAverageArray from 'utils/weightedAverageArray';

function BuyList() {
  const { market_id } = useParams();

  const { data, error, isLoading } = useSWR(
    `https://api.bitpin.org/v2/mth/actives/${market_id}/?type=sell`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  const top10: any[] = useMemo(() => data?.orders.slice(0, 10) || [], [data]);

  if (isLoading) return <FetchServer />;

  if (error) return <ServerError />;

  return (
    <>
      <PercentageInput
        totalRemain={sumArray(top10.map((order) => Number(order.remain)))}
        priceAverage={averageArray(top10.map((order) => Number(order.price)))}
      />

      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Remain</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {top10.slice(0, 10).map((order, index) => (
              <TableRow key={index}>
                <TableCell align="center">{splitNumber(order.price)}</TableCell>
                <TableCell align="center">{splitNumber(order.value)}</TableCell>
                <TableCell align="center">{splitNumber(order.remain)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ fontWeight: 700, fontSize: '30px !important' }}>
              <TableCell align="center">
                W AVG : {splitNumber(weightedAverageArray(top10))}
              </TableCell>
              <TableCell align="center">
                SUM : {splitNumber(sumArray(top10.map((order) => Number(order.value))))}
              </TableCell>
              <TableCell align="center">
                SUM : {splitNumber(sumArray(top10.map((order) => Number(order.remain))))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BuyList;
