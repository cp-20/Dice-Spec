import 'nprogress/nprogress.css';
import '@/styles/tailwind.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nprogress from 'nprogress';
import { useEffect } from 'react';

import type { GoogleTagManagerId } from '@/components/functional/GoogleTagManager';
import { GoogleTagManager, googleTagManagerId } from '@/components/functional/GoogleTagManager';

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
      <Component {...pageProps}></Component>
    </>
  );
};

export default appWithTranslation(MyApp);
