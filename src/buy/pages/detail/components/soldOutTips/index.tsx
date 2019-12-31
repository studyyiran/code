import React from "react";
import Modal from "../../../../components/modal";
import { locationHref } from "../../../../common/utils/routerHistory";
import { getLocationUrl } from "../../../../common/utils/util";
import { viewAllClickHandler } from "../../util";
import Button from "../../../../components/button";

export function soldOutTips(detailInfo: any) {
  console.log(soldOutTips);
  (Modal as any).confirm({
    width: "70%",
    closable: false,
    title: null,
    footer: "single",
    maskClosable: true,
    cancelText: "Got it",
    onCancel: () => {
      locationHref(getLocationUrl("home"));
    },
    children: (
      <div className="sold-out-tips">
        <Button
          onClick={() => {
            viewAllClickHandler(detailInfo);
          }}
        >123</Button>
      </div>
    )
  });
}
