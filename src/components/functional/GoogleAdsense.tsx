import Script from 'next/script';

export const GoogleAdsense: React.FC<{ clientId: string }> = ({ clientId }) => {
  return (
    <Script
      async
      src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + clientId}
      crossOrigin="anonymous"
    />
  );
};

export const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
