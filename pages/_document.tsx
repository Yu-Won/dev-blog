import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
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
