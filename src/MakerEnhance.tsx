import React from "react";
import MakerEnhanceClient from "./MakerEnhanceClient";

interface MakerEnhanceProps {
  user: string;
  instanceId?: string | number;
  loadingHeight?: number;
}

const isBrowser = typeof window !== "undefined";

export default function MakerEnhance({
  user,
  instanceId,
  loadingHeight,
}: MakerEnhanceProps): JSX.Element | null {
  const scriptSrc = `https://app.maker.co/enhance/${user}.js`;
  const id = `js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-${
    instanceId || "0"
  }`;

  const html = `
    <script src="${scriptSrc}" id="maker-enhance-script" async="true"></script>
    <div
      id="${id}"
      class="js-maker-enhance-static-mount"
      style="height:auto;width:100%"
      ${loadingHeight ? `data-loading-height="${loadingHeight}"` : ""}
    ></div>
  `;

  // If component was rendered on server, don't rerender on client
  return isBrowser && document.getElementById(id) ? null : (
    <>
      <MakerEnhanceClient user={user} id={id} scriptSrc={scriptSrc} />
      <div
        className="js-maker-enhance-wrapper"
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning={true}
      />
    </>
  );
}
