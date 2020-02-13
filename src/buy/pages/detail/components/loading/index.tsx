import React, { useEffect, useMemo } from "react";
import "./index.less";
import LoadingMask from "../../../productList/components/loading";
import { isServer } from "../../../../common/utils/util";

export function DetailLoading(props: {
  hide?: boolean
}) {
  const index = useMemo(() => {
    return Math.floor(3 * Math.random());
  }, []);
  useEffect(() => {
    
    // if (!isServer()) {
    //   (document as any)
    //     .querySelector("body")
    //     .setAttribute("style", "overflow: hidden; height: 100vh");
    //   return () => {
    //     document.body.style.overflow = "auto";
    //   };
    // }
    // return () => {};
  }, []);
  const arr = [
    "All the photos you see on UpTrade are photos of the actual phone",
    "UpTrade conducts a 50+ point hand inspection to ensure all phones listed for sale are 100% fully functional",
    "UpTrade helps you sell your phone by listing it on multiple marketplaces to get you the maximum value"
  ];
  if (props.hide) {
    return null
  } else {
    return (
      <div className="loading-part">
        <LoadingMask visible={true} needWhite={true} />
        <div className="loading-content">
          <h2>Did you know?</h2>
          <p>{arr[index]}</p>
        </div>
      </div>
    );
  }

}
