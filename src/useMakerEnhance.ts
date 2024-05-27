"use client";

import { useState, useEffect } from "react";

interface UseMakerEnhanceProps {
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

export default function useMakerEnhance({
  user,
  index,
  scriptSrc
}: UseMakerEnhanceProps) {
  const [url, setUrl] = useState(
    isBrowser() ? window.location.href : undefined
  );

  useEffect(() => {
    if (isBrowser() && user && !window.MakerEmbeds) {
      const script = document.createElement("script");
      script.id = "maker-enhance-script";
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (isBrowser() && window.location.href !== url) {
      setUrl(window.location.href);
    }
  });

  useEffect(
    () => {
      run();
    },
    [index, url]
  );
}
