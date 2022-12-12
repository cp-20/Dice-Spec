import '@/styles/nprogress.css';
import '@/styles/tailwind.css';
import '@/styles/twitter-picker.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nprogress from 'nprogress';
import { useEffect } from 'react';

import type { GoogleTagManagerId } from '@/components/functional/GoogleTagManager';
import { GoogleTagManager, googleTagManagerId } from '@/components/functional/GoogleTagManager';
import { customTheme } from '@/features/theme/theme';

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (process.browser) {
    nprogress.start();
  }

  useEffect(() => {
    nprogress.done();
  });

  return (
    <>
      {googleTagManagerId && <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} />}
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps}></Component>
        <Analytics />
      </ChakraProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
