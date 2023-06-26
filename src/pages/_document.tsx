import Document, { Html } from "next/document";
import Head from "next/head";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8054978526190901"
            crossOrigin="anonymous"
          ></script>
        </Head>
      </Html>
    );
  }
}
