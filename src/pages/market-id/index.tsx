import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, styled, Tab } from '@mui/material';
import { lazy, Suspense, useCallback, useState, useTransition } from 'react';
import PendingProvider from 'shared-components/pending-provider';
import TabsFallback from 'shared-components/loading/TabsFallback';
import { SwipeCallback, useSwipeable } from 'react-swipeable';

const TransactionList = lazy(() => import('./components/TransactionList'));
const BuyList = lazy(() => import('./components/BuyList'));
const SellList = lazy(() => import('./components/SellList'));

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  padding: 0,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

function MarketId() {
  const [tab, setTab] = useState<'buy' | 'sell' | 'transactions'>('transactions');
  const [isPending, startTransition] = useTransition();

  const handleChangeTab = (_: unknown, newValue: 'buy' | 'sell' | 'transactions') => {
    startTransition(() => {
      setTab(newValue);
    });
  };

  const swipeRight: SwipeCallback = useCallback(() => {
    if (tab === 'sell') handleChangeTab(undefined, 'buy');
    if (tab === 'buy') handleChangeTab(undefined, 'transactions');
  }, [tab]);

  const swipeLeft: SwipeCallback = useCallback(() => {
    if (tab === 'transactions') handleChangeTab(undefined, 'buy');
    if (tab === 'buy') handleChangeTab(undefined, 'sell');
  }, [tab]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: swipeLeft,
    onSwipedRight: swipeRight,
  });

  return (
    <TabContext value={tab}>
      <div {...swipeHandlers}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Transactions" value="transactions" />
            <Tab label="Buy" value="buy" />
            <Tab label="Sell" value="sell" />
          </TabList>
        </Box>

        <Suspense fallback={<TabsFallback />}>
          <StyledTabPanel value="transactions">
            <PendingProvider isPending={isPending}>
              <TransactionList />
            </PendingProvider>
          </StyledTabPanel>

          <StyledTabPanel value="buy">
            <PendingProvider isPending={isPending}>
              <BuyList />
            </PendingProvider>
          </StyledTabPanel>

          <StyledTabPanel value="sell">
            <PendingProvider isPending={isPending}>
              <SellList />
            </PendingProvider>
          </StyledTabPanel>
        </Suspense>
      </div>
    </TabContext>
  );
}

export default MarketId;
