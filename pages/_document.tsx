import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
          `,
          }}
        />
      </Head>
      <body className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
