"use client";

import React, { useState, useEffect } from "react";

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
      const handleRouteChange = () => {
        const newUrl = getUrl();
        if (newUrl !== url) {
          setUrl(newUrl);
        }
      };

      if (isBrowser() && "onnavigate" in window) {
        window.addEventListener("navigate", handleRouteChange);
        return () => {
          window.removeEventListener("navigate", handleRouteChange);
        };
      } else {
        const intervalId = setInterval(handleRouteChange, 100);
        return () => {
          clearInterval(intervalId);
        };
      }
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
