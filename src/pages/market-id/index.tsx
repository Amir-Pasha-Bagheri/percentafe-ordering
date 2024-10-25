import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, styled, Tab } from '@mui/material';
import { lazy, Suspense, useState, useTransition } from 'react';
import PendingProvider from 'shared-components/pending-provider';
import TabsFallback from 'shared-components/loading/TabsFallback';

const BuyList = lazy(() => import('./components/BuyList'));
const TransactionList = lazy(() => import('./components/TransactionList'));

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

  return (
    <TabContext value={tab}>
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

        <StyledTabPanel value="sell">Item Two</StyledTabPanel>
      </Suspense>
    </TabContext>
  );
}

export default MarketId;
