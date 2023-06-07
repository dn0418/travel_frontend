import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

interface QueryProviderProps {
  pageProps: AppProps["pageProps"];
}

export default function QueryProvider({
  pageProps,
  children,
}: React.PropsWithChildren<QueryProviderProps>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>{children}</Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
