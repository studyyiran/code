import React, { useEffect, useMemo } from "react";
import "./index.less";
import LoadingMask from "../../../productList/components/loading";
import { isServer } from "../../../../common/utils/util";

export function DetailLoading() {
  const index = useMemo(() => {
    return Math.floor(3 * Math.random());
  }, []);
  useEffect(() => {
    if (!isServer()) {
      (document as any)
        .querySelector("body")
        .setAttribute("style", "overflow: hidden; height: 100vh");
      return () => {
        document.body.style.overflow = "auto";
      };
    }
    return () => {};
  }, []);
  const arr = [
    "All the photos you see on UpTrade are photos of the actual phone",
    "UpTrade conducts a 50+ point hand inspection to ensure all phones listed for sale are 100% fully functional",
    "UpTrade helps you sell your phone by listing it on multiple marketplaces to get you the maximum value"
  ];
  return (
    <div className="product-detail-page">
      <div className="loading-part loading-mask-min-height">
        <LoadingMask visible={true} needWhite={true} />
        <div className="loading-content">
          <h2>Did you know?</h2>
          <p>{arr[index]}</p>
        </div>
      </div>
    </div>
  );
}
