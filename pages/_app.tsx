// import LocalizationProvider from '@mui/lab/LocalizationProvider';
//@ts-nocheck
import { SidebarProvider } from '@/contexts/sidebar.context';
import { UserTypes } from '@/models/types/user_type';
import { wrapper } from '@/store';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ReactElement, ReactNode, useState } from 'react';
import createEmotionCache from 'src/createEmotionCache';
import ThemeProvider from 'src/theme/ThemeProvider';
import { LoginContext } from '../src/contexts/login.context';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface CarrotAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const App = (props: CarrotAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  nProgress.configure({ showSpinner: false });

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);
  const [username, setUsername] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [role, setRole] = useState<UserTypes>(null);

  // useEffect(() => {
  //   throw new Error('Sentry Traced SUCCESS')
  // }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Carrot NextJS Typescript Admin Dashboard</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <LoginContext.Provider
        value={{ username, setUsername, role, setRole, setShowProfile }}
      >
        <SidebarProvider>
          <ThemeProvider>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
            {/* </LocalizationProvider> */}
          </ThemeProvider>
        </SidebarProvider>
      </LoginContext.Provider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(App);
