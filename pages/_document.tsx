import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html lang="ko">
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/favicon/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/favicon/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/favicon/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/favicon/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/favicon/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/favicon/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/favicon/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/favicon/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-icon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/favicon/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicon/manifest.json" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta
					name="msapplication-TileImage"
					content="/favicon/ms-icon-144x144.png"
				/>
				<meta name="theme-color" content="#ffffff" />
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
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4424905834492518"
					crossOrigin="anonymous"
				></script>
			</Head>
			<body className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
