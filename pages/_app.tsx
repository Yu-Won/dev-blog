import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import { ReactElement, ReactNode, useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import "styles/global.css";
import { SEO } from "components/SEO";
import Layout from "components/Layout";
import { defaultImagePlaceHolder, SiteConfig } from "utils/config";
import { pageview } from "utils/gtag";

const ResponsiveImage = (props: any) => (
	<Image
		alt={props.alt}
		layout="responsive"
		className="w-full h-full"
		priority
		placeholder={defaultImagePlaceHolder}
		{...props}
	/>
);

const components = {
	img: ResponsiveImage,
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const YuWonDevBlog = ({ Component, pageProps }: AppPropsWithLayout) => {
	const { events } = useRouter();
	useEffect(() => {
		const handelRouteChange = (url: string) => {
			pageview(url);
		};

		events.on("routeChangeComplete", handelRouteChange);
		events.on("hashChangeComplete", handelRouteChange);

		return () => {
			events.off("routeChangeComplete", handelRouteChange);
			events.off("hashChangeComplete", handelRouteChange);
			console.log(`
       ,-.       _,---._ __  / \\
      /  )    .-'       \`./ /   \\
     (  (   ,'            \`/    /|
      \\  \`-"             \\'\\   / |
       \`.              ,  \\ \\ /  |
        /\`.          ,'-\`----Y   |
       (            ;  R̲e̲a̲c̲t̲ |   '
       |  ,-.    ,-'      T̲S̲ |  /
       |  | (   |            | /
       )  |  \\  \`.___________|/
       \`--'   \`--'`);
			console.log(
				"%cฅ^•ﻌ•^ฅ About me:",
				"color: #ffffff;",
				"https://www.yu-won.blog/about",
			);
		};
	}, [events]);

	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${SiteConfig.googleAnalyticsId}`}
			/>
			<Script
				id="gtag-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SiteConfig.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
			<ThemeProvider attribute="class">
				<DefaultSeo {...SEO} />
				<MDXProvider components={components}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</MDXProvider>
			</ThemeProvider>
		</>
	);
};

export default YuWonDevBlog;
