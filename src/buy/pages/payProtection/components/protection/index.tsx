import React, { useCallback, useEffect, useMemo, useState } from "react";
import { currencyTrans, getUrlAllParams } from "../../../../common/utils/util";
import { payProtectionServer } from "../../server";
import { locationHref } from "../../../../common/utils/routerHistory";
import { Message } from "../../../../components/message";
import { PayPaylButton } from "../paypalButton";
import { InnerDivImage } from "../../../detail/components/innerDivImage";
import "./index.less";

export interface IBuyOrderInfo {
  autoConfirmDeadLine: string;
  groupOrderNo: string;
  orderCreateDate: string;
  userInfo: {
    apartment: string;
    city: string;
    country: string;
    firstName: string;
    fullUserName: string;
    lastName: string;
    state: string;
    street: string;
    userEmail: string;
    userPhone: string;
    zipCode: string;
  };
  subOrders: {
    productInfo: {
      bpvDispalyName: string;
      buyLevel: string;
      buyProductImgPc: string;
      productDisplayName: string;
    };
    protection: number;
  }[];
}
{
}

export function ProtectionPage(props: {
  render: (payInfo: any) => {};
  type: string;
}) {
  const [orderInfo, setOrderInfo] = useState({} as IBuyOrderInfo);
  // 获取url参数
  const urlParams = getUrlAllParams();
  const { token } = urlParams || ({} as any);

  const loop = useCallback(() => {
    if (token) {
      payProtectionServer
        .tokenToUrl({ token })
        .then(res => {
          if (res && !Object.keys(orderInfo).length) {
            setOrderInfo(res);
          }
        })
        .catch(e => {
          locationHref("/");
          // 如果没有 就应该跳出?
        });
    }
  }, [orderInfo, token]);

  // 在拉取数据,完成渲染 todo 你tmd调错接口了。你个智障，先tm给你隐藏了。fuck!!
  useEffect(() => {
    // const ref = window.setInterval(() => {
    //   loop();
    // }, 1000);
    // return () => {
    //   window.clearInterval(ref);
    // };
    loop();
  }, [loop]);

  const payInfo = useMemo(() => {
    if (orderInfo && orderInfo.groupOrderNo) {
      return {
        payInfo: orderInfo.userInfo,
        amount: caclTotalProtection((orderInfo as any).subOrders)
      };
    } else {
      return {
        payInfo: {},
        amount: 0
      };
    }
  }, [orderInfo]);

  // 支付成功回调
  function finishPayHandler(id: any) {
    payProtectionServer
      .orderPayProtection({
        paypalOrderId: id,
        token
      })
      .then(() => {
        Message.success("Succeed to pay for the monthly protection.");
        locationHref("/");
      });
  }

  const paypalDomId = "paypal-button-protection";
  return (
    <div className="pay-protection-page">
      <RenderOrderInfo orderInfo={orderInfo as any} type={props.type} />
      {props.render(payInfo)}
    </div>
  );
}

function RenderOrderInfo(props: { orderInfo: IBuyOrderInfo; type: string }) {
  const { orderInfo } = props;

  if (orderInfo && orderInfo.groupOrderNo) {
    return (
      <div className="order-detail">
        <h2>Order {orderInfo.groupOrderNo}</h2>
        <ul>
          {orderInfo.subOrders
            .filter((item: any, index: any) => {
              return index < 1;
            })
            .map((subOrderInfo, index) => {
              const { productInfo } = subOrderInfo;
              const {
                buyProductImgPc,
                bpvDispalyName,
                productDisplayName,
                buyLevel
              } = productInfo;
              const bpvArr = bpvDispalyName.split(",");
              return (
                <li key={index}>
                  <InnerDivImage imgUrl={buyProductImgPc} />
                  <div className="content-container">
                    <h3>
                      {productDisplayName} {bpvArr.slice(0, 2).join(" ")}
                    </h3>
                    <span className="color-line">
                      {bpvArr.slice(2).join(" ")}
                    </span>
                    <span className="condition">Condition {buyLevel}</span>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="protection-price">
          <span>Protection</span>
          {props.type ? (
            <span>$5 / mo</span>
          ) : (
            <span>
              {currencyTrans(caclTotalProtection(orderInfo.subOrders))}
            </span>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

// 计算总价
function caclTotalProtection(subOrders: IBuyOrderInfo["subOrders"]) {
  let total = 0;
  subOrders.forEach(a => {
    if (a.protection) {
      total = total + Number(a.protection);
    }
  });
  return total;
}
