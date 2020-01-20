import React from "react";
import Modal from "../../../../components/modal";
import "./index.less";
import { locationHref } from "../../../../common/utils/routerHistory";
import {
  getLocationUrl,
  getProductListPath
} from "../../../../common/utils/util";
import { viewAllClickHandler } from "../../util";

export function soldOutTips(detailInfo: any) {
  (Modal as any).confirm({
    width: "90%",
    className: "sold-out-tips-modal",
    closable: false,
    title: null,
    footer: null,
    maskClosable: false,
    onCancel: () => {
      locationHref(getLocationUrl("home"));
    },
    children: (
      <div className="sold-out-tips">
        <h2>The product is sold out.</h2>
        <div className="button-container">
          <button
            className="common-button"
            onClick={() => {
              viewAllClickHandler(detailInfo);
            }}
          >
            Find similar phones
          </button>
          <span className="or">OR</span>
          <a
            onClick={() => {
              window.location.href = getProductListPath();
            }}
          >
            Back to category page
          </a>
        </div>
      </div>
    )
  });
}
