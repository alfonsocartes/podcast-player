import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="p-12">
        <div className="min-w-full">
          <h1 className="text-2xl font-bold text-cyan-600 divide-y-2">
            Podcaster
          </h1>
          <hr className="mt-2 border-1 border-slate-300" />
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
