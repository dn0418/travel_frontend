import { EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import ChatIcon from "../src/components/global-chat/chat";
import QueryProvider from "../src/rest-api/client/query-provider";
import "../src/styles/_app.scss";
import defaultTheme from "../src/themes/defaultTheme";
import { NextPageWithLayout } from "../src/types/page-props";
import createEmotionCache from "../src/utils/createEmotionCache";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Extend the default AppProps
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
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
        <CssBaseline />
        <ChatIcon />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </QueryProvider>
  );
}

export default MyApp;
