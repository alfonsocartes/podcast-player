import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";

export function Header() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-w-full">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-cyan-600 divide-y-2">
            Podcaster
          </h1>
        </Link>
        {isLoading && (
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        )}
      </div>
      <hr className="mt-2 border-1 border-slate-300" />
    </div>
  );
}
