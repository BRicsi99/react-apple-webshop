import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Apple Webshop</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
