import type { AppProps } from "next/app";
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from "react";
import { MDXProvider } from '@mdx-js/react';
import "styles/global.css"

// import {Header} from '../components/Header.js'

const components = {
  // h1: Header
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
};

const uonDevBlogApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
};

export default uonDevBlogApp;
