import {
  alpha,
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
import fetcher from 'utils/fetcher';
import splitNumber from 'utils/splitNumber';
import { format } from 'date-fns';

function TransactionList() {
  const { market_id } = useParams();

  const { data, error, isLoading } = useSWR(
    `https://api.bitpin.org/v1/mth/matches/${market_id}/`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  const top10: any[] = useMemo(() => data?.slice(0, 10) || [], [data]);

  if (isLoading) return <FetchServer />;

  if (error) return <ServerError />;

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Match Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {top10.slice(0, 10).map((order, index) => (
            <TableRow
              key={index}
              sx={(theme) => ({
                backgroundColor:
                  order.type === 'buy'
                    ? alpha(theme.palette.success.main, 0.3)
                    : alpha(theme.palette.error.main, 0.3),
              })}
            >
              <TableCell align="center">
                {format(order.time * 1000, 'yyyy MMM dd - HH:mm')}
              </TableCell>
              <TableCell align="center">{splitNumber(order.price)}</TableCell>
              <TableCell align="center">{splitNumber(order.match_amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionList;
