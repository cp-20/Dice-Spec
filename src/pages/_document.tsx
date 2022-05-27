import { randomBytes } from 'crypto';
import type { DocumentContext } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { googleTagManagerId } from '@/components/functional/GoogleTagManager';

type WithNonceProp = {
  nonce: string;
};

class Document extends NextDocument<WithNonceProp> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    const nonce = randomBytes(128).toString('base64');
    return {
      ...initialProps,
      nonce,
    };
  }
  render() {
    const nonce = this.props.nonce;
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`;

    return (
      <Html>
        <Head nonce={nonce}>
          {/* 基本設定 */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* nonce */}
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <noscript>
            <iframe
              className="invisible hidden"
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
            />
          </noscript>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default Document;
