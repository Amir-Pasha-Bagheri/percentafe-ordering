import { ReactNode } from 'react';
import TabsFallback from './TabsFallback';

interface PendingProviderProps {
  isPending: boolean;
  children: ReactNode;
}

function PendingProvider(props: PendingProviderProps) {
  if (props.isPending) return <TabsFallback />;
  return props.children;
}

export default PendingProvider;
