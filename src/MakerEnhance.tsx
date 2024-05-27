import React, { useState, useEffect } from "react";

interface MakerEnhanceProps {
  user: string;
  index?: number;
  loadingHeight?: string;
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

export default function MakerEnhance({
  user,
  index,
  loadingHeight
}: MakerEnhanceProps): JSX.Element {
  const [url, setUrl] = useState(
    isBrowser() ? window.location.href : undefined
  );
  const scriptSrc = `https://app.maker.co/enhance/${user}.js`;

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

  const html = `
    <script src="${scriptSrc}" id="maker-enhance-script" async="true"></script>
    <div
      id="js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-${index ||
        0}"
      class="js-maker-enhance-static-mount"
      style="height:auto;width:100%"
      ${loadingHeight ? `data-loading-height="${loadingHeight}"` : ""}
    ></div>
  `;

  // https://github.com/facebook/react/issues/10923#issuecomment-338715787
  // "We won't try to manipulate the tree of a dangerouslySetInnerHTML node on the client. Even if it is wrong."
  //
  // Use dangerouslySetInnerHTML to avoid issues with hydration.
  return (
    <div
      className="js-maker-enhance-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning={true}
    />
  );
}
