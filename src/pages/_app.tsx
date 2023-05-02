import { EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import QueryProvider from "../rest/client/query-provider";
import "../styles/globals.css";
import defaultTheme from "../themes/defaultTheme";
import { NextPageWithLayout } from "../types";
import createEmotionCache from "../utils/createEmotionCache";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Extend the default AppProps
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  // If there's no emotionCache rendered by the server, use the clientSideEmotionCache
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryProvider pageProps={pageProps}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </QueryProvider>
  );
}
