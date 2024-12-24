"use client";

import Script from "next/script";

const ZenchefWidget = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://sdk.zenchef.com/v1/sdk.min.js"
        id="zenchef-sdk"
      />

      {/* Widget HTML */}
      <div
        className="zc-widget-config"
        data-restaurant="371318"
        data-open=""
        data-position="right"
        data-primary-color="6d0f13"
      ></div>
    </>
  );
};

export default ZenchefWidget;
