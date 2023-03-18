import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FC } from 'react';

export const Descriptions: FC<{ title: string; description: string }> = ({ title, description }) => {
  const { locale, pathname, query } = useRouter();

  const ogpUrl = typeof query.ogp === 'string' ? query.ogp : 'https://dicespec.vercel.app/ogp.png';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />

        {/* OGP */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://dicespec.vercel.app${!locale || locale === 'ja' ? '' : '/' + locale}${pathname}`}
        />
        <meta property="og:site_name" content={title} />
        <meta property="og:locale" content={locale ?? 'ja'} />
        <meta property="og:image" content={`/api/og?image=${encodeURIComponent(ogpUrl)}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@__cp20__" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`/api/og?image=${encodeURIComponent(ogpUrl)}`} />
      </Head>
    </>
  );
};
