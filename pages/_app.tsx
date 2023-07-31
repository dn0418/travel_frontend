import { EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LoadScript } from "@react-google-maps/api";
import type { AppProps } from "next/app";
import { Poppins, Rubik } from "next/font/google";
import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ChatIcon from "../src/components/call-back/chat";
import { GlobalContextProvider } from "../src/context/global-context";
import QueryProvider from "../src/rest-api/query-provider";
import "../src/styles/_app.scss";
import defaultTheme from "../src/themes/defaultTheme";
import { NextPageWithLayout } from "../src/types/page-props";
import createEmotionCache from "../src/utils/createEmotionCache";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const roboto = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const rubik = Rubik({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-rubik'
})

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
      <GlobalContextProvider>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY || ''}>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <ChatIcon />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LoadScript>
        <ToastContainer />
      </GlobalContextProvider>
    </QueryProvider>
  );
}

export default MyApp;
