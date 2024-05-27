"use client";

import React, { useState, useEffect } from "react";
import history from "history/browser";

interface MakerEnhanceClientProps {
  user: string;
  index?: number;
  scriptSrc: string;
}

declare global {
  interface Window {
    MakerEmbeds: any;
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function run(): void {
  if (isBrowser() && typeof (window.MakerEmbeds || {}).run === "function") {
    window.MakerEmbeds.run();
  }
}

export default function MakerEnhanceClient({
  user,
  index,
  scriptSrc
}: MakerEnhanceClientProps): JSX.Element {
  function getUrl() {
    return `${location.pathname}${location.search}${location.hash}`;
  }

  const [url, setUrl] = useState(isBrowser() ? getUrl() : undefined);

  useEffect(() => {
    if (isBrowser() && user && !window.MakerEmbeds) {
      const script = document.createElement("script");
      script.id = "maker-enhance-script";
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(
    () => {
      const unlisten = history.listen(({ location }) => {
        const newUrl = getUrl();
        if (newUrl !== url) {
          setUrl(newUrl);
        }
      });

      return () => {
        unlisten();
      };
    },
    [url]
  );

  useEffect(
    () => {
      run();
    },
    [index, url]
  );

  return <></>;
}
