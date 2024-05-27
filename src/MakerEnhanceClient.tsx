"use client";

import React, { useState, useEffect } from "react";

interface MakerEnhanceClientProps {
  user: string;
  id: string;
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
  id,
  scriptSrc
}: MakerEnhanceClientProps): JSX.Element {
  const getUrl = () => {
    return isBrowser() ? window.location.href : undefined;
  };
  const [url, setUrl] = useState(getUrl());

  useEffect(() => {
    if (isBrowser() && user && !window.MakerEmbeds) {
      const script = document.createElement("script");
      script.id = "maker-enhance-script";
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const changeUrl = (newUrl: string | undefined) => {
    setUrl(newUrl);

    const embed = document.querySelector(`[data-orig-id="${id}"]`);
    if (embed && embed.parentElement) {
      embed.parentElement.removeChild(embed);
    }

    const placeholder = document.querySelector(`#${id}`);
    if (placeholder) {
      placeholder.removeAttribute("data-maker-loaded");
    }

    run();
  };

  useEffect(
    () => {
      const interval = setInterval(() => {
        const newUrl = getUrl();
        if (newUrl !== url) {
          changeUrl(newUrl);
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    },
    [url, id]
  );

  useEffect(
    () => {
      run();
    },
    [id]
  );

  return <></>;
}
