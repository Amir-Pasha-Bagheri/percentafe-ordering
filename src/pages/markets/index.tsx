import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Container, LinearProgress, styled, Tab, Typography } from '@mui/material';
import { lazy, Suspense, useCallback, useEffect, useState, useTransition } from 'react';
import { SwipeCallback, useSwipeable } from 'react-swipeable';
import TabsFallback from './components/TabsFallback';
import PendingProvider from './components/PendingProvider';
import { useIRTSetCoins, useUSDTSetCoins } from 'config/store';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const USDTcoins = lazy(() => import('./components/USDTcoins'));
const IRTcoins = lazy(() => import('./components/IRTcoins'));

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  padding: 0,
  marginTop: theme.spacing(2),
}));

function Markets() {
  const [tab, setTab] = useState<'IRT' | 'USDT'>('IRT');
  const [isPending, startTransition] = useTransition();

  const setIRTCoins = useIRTSetCoins();
  const setUSDTCoins = useUSDTSetCoins();

  const { data, error, isLoading } = useSWR('https://api.bitpin.ir/v1/mkt/markets/', fetcher, {
    revalidateOnFocus: false,
  });

  const handleChange = (_: unknown, newValue: 'IRT' | 'USDT') => {
    startTransition(() => {
      setTab(newValue);
    });
  };

  const swipeRight: SwipeCallback = useCallback(() => {
    if (tab === 'IRT') handleChange(undefined, 'USDT');
  }, [tab]);

  const swipeLeft: SwipeCallback = useCallback(() => {
    if (tab === 'USDT') handleChange(undefined, 'IRT');
  }, [tab]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: swipeLeft,
    onSwipedRight: swipeRight,
  });

  useEffect(() => {
    if (data) {
      setIRTCoins(data.results.filter((result: any) => result.currency2.code === 'IRT'));
      setUSDTCoins(data.results.filter((result: any) => result.currency2.code === 'USDT'));
    }
  }, [setIRTCoins, setUSDTCoins, data]);

  if (isLoading)
    return (
      <>
        <LinearProgress />
        <Typography sx={{ textAlign: 'center', marginTop: 2 }}>Fetching...</Typography>
      </>
    );

  if (error) return <Typography>Something went wrong with server !</Typography>;

  return (
    <Container maxWidth="md">
      <TabContext value={tab}>
        <div {...swipeHandlers}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} variant="fullWidth">
              <Tab
                label="USDT"
                value="USDT"
                iconPosition="end"
                icon={
                  <Avatar src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" />
                }
              />
              <Tab
                label="IRT"
                value="IRT"
                iconPosition="end"
                icon={
                  <Avatar src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" />
                }
              />
            </TabList>
          </Box>

          <Suspense fallback={<TabsFallback />}>
            <StyledTabPanel value="USDT">
              <PendingProvider isPending={isPending}>
                <USDTcoins />
              </PendingProvider>
            </StyledTabPanel>

            <StyledTabPanel value="IRT">
              <PendingProvider isPending={isPending}>
                <IRTcoins />
              </PendingProvider>
            </StyledTabPanel>
          </Suspense>
        </div>
      </TabContext>
    </Container>
  );
}

export default Markets;
