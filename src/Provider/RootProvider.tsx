import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';

type Props = PropsWithChildren & {};
const queryClient = new QueryClient();
const RootProvider = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default RootProvider;
