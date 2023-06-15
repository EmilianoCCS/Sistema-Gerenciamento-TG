import type { AppProps } from 'next/app'

import "@/libs/dayjs";

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
