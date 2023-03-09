import Head from 'next/head';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Contact List - SleekFlow</title>
          <meta name="description" content="View our list of contacts with their related information." />
        </Head>
        <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
  )
}