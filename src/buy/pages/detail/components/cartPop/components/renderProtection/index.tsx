import {ProductInfoCard} from "../../../phoneInfo";
import {protectionInfo, protectPrice} from "../../../../../../common/config/staticConst";
import RouterLink from "../../../../../../common-modules/components/routerLink";
import React from "react";
import {WithTitle} from "../withTitle";
import {AddToCart} from "../addToCart";

export function RenderProtection(props: {
  needProtection: boolean;
  setNeedProtection: any;
  setShowModal: any;
  needAddButton: boolean;
  needTitle: boolean;
}) {
  const {
    needProtection,
    setNeedProtection,
    setShowModal,
    needTitle,
    needAddButton
  } = props;
  if (needTitle) {
    return (
      <WithTitle title="Phone protection">
        {/*<div>{protectPrice}</div>*/}
        <ProductInfoCard
          productName={protectionInfo.title}
          productImage={require("./res/protection_img.png")}
          price={protectPrice}
        >
          {protectionInfo.content}
          <div className="last-line-flex-container">
            <RouterLink
              target={"_blank"}
              to={"/uptrade/protect"}
              onClick={() => {
                // 这块在跳转的时候 写死一个关闭行为 强行修改潜在的bug
                // setShowModal(false);
              }}
            >
              Learn more
            </RouterLink>
            {needAddButton ? (
              <AddToCart
                value={needProtection}
                cartChangeCallBack={value => {
                  setNeedProtection(value);
                }}
              />
            ) : null}
          </div>
        </ProductInfoCard>
      </WithTitle>
    );
  } else {
    return (
      <ProductInfoCard
        productName={protectionInfo.title}
        productImage={require("./res/protection_img.png")}
        price={protectPrice}
      >
        {protectionInfo.content}
        <div className="last-line-flex-container">
          <RouterLink
            target={"_blank"}
            to={"/uptrade/protect"}
            onClick={() => {
              // 这块在跳转的时候 写死一个关闭行为 强行修改潜在的bug
              // setShowModal(false);
            }}
          >
            Learn more
          </RouterLink>
          {needAddButton ? (
            <AddToCart
              value={needProtection}
              cartChangeCallBack={value => {
                setNeedProtection(value);
              }}
            />
          ) : null}
        </div>
      </ProductInfoCard>
    );
  }
}