import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {ThemeProvider} from 'styled-components/native';

type Props = PropsWithChildren & {};
const queryClient = new QueryClient();
const RootProvider = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{}}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootProvider;
