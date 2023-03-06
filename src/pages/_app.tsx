import type { AppProps } from 'next/app';

import { useState } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Rick and Morty | CRM</title>
          <meta name="description" content="Rick and Morty" />
        </Head>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
  )
}