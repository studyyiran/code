import React, { useContext, useEffect, useMemo, useState } from "react";
import "./index.less";
import { currencyTrans, getUrlAllParams } from "../../common/utils/util";
import { payProtectionServer } from "./server";
import { PayPaylButton } from "./components/paypalButton";
import { InnerDivImage } from "../detail/components/innerDivImage";
import { locationHref } from "../../common/utils/routerHistory";
import { Message } from "../../components/message";

interface IBuyOrderInfo {
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

export default function PayProtectionPage() {
  const [orderInfo, setOrderInfo] = useState({} as IBuyOrderInfo);
  // 获取url参数
  const urlParams = getUrlAllParams();
  console.log(urlParams);
  const { token, email, order } = urlParams || ({} as any);

  function finishPayHandler(id: any) {
    console.log(id);
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

  useEffect(() => {
    if (token) {
      payProtectionServer
        .tokenToUrl({ token })
        .then(res => {
          if (res) {
            setOrderInfo(res);
          }
        })
        .catch(e => {
          locationHref("/");
          // 如果没有 就应该跳出?
        });
    }
  }, [token, order, email]);

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

  const id = "paypal-button-protection";

  return (
    <div className="pay-protection-page">
      <RenderOrderInfo orderInfo={orderInfo as any} />
      <PayPaylButton
        id={id}
        finishPayCallBack={finishPayHandler}
        {...payInfo}
      />
    </div>
  );
}

function caclTotalProtection(subOrders: IBuyOrderInfo["subOrders"]) {
  let total = 0;
  subOrders.forEach(a => {
    if (a.protection) {
      total = total + Number(a.protection);
    }
  });
  return total;
}

function RenderOrderInfo(props: { orderInfo: IBuyOrderInfo }) {
  const { orderInfo } = props;
  console.log(orderInfo);

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
          <span>{currencyTrans(caclTotalProtection(orderInfo.subOrders))}</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
