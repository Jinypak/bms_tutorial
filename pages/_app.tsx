import React from "react";
import "../styles/global.css";
import { type AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <Component {...pageProps} />
    </div>
  );
}
