import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Image from "next/image";
import type { ReactElement, ReactNode } from "react";
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import "styles/global.css";
import { SEO } from "components/SEO";
import Layout from "components/Layout";

const ResponsiveImage = (props: any) => (
  <Image alt={props.alt} layout="responsive" {...props} />
);

const components = {
  img: ResponsiveImage
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const yuWonDevBlog = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <ThemeProvider attribute="class">
      <DefaultSeo {...SEO} />
        <MDXProvider components={components}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
    </ThemeProvider>
  );
};

export default yuWonDevBlog;
