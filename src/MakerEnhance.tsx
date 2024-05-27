import React from "react";
import MakerEnhanceClient from "./MakerEnhanceClient";

interface MakerEnhanceProps {
  user: string;
  instanceId?: string | number;
  loadingHeight?: number;
}

export default function MakerEnhance({
  user,
  instanceId,
  loadingHeight,
}: MakerEnhanceProps): JSX.Element {
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

  // https://github.com/facebook/react/issues/10923#issuecomment-338715787
  // "We won't try to manipulate the tree of a dangerouslySetInnerHTML node on the client. Even if it is wrong."
  //
  // Use dangerouslySetInnerHTML to avoid issues with hydration.
  return (
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
