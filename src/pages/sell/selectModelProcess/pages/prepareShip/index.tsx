import React, { useState, useEffect, useContext } from "react";
import "./index.less";
import VideoComponent from "@/components/video";
import RouterLink from "@/components/routerLink";
import {
  ISelectModelContext,
  SelectModelContext
} from "@/pages/sell/selectModelProcess/context";
// subOrders[0].shippingInfo.sendInfo[0].lableCode
export default function(props: any) {
  // const selectModelContext = useContext(SelectModelContext);
  // const { getDownloadLabel } = selectModelContext as ISelectModelContext;
  const [orderInfo, setOrderInfo] = useState();
  useEffect(() => {
    const orderInfoCache: any = sessionStorage.getItem("orderInfo");
    try {
      const data = JSON.parse(orderInfoCache);
      setOrderInfo(data);
      // getDownloadLabel(data.lableCode).then((res: any) => {
      // });
    } catch (e) {
      console.error(e);
    }
  }, []);
  const {} = props;
  if (orderInfo) {
    const { needBox, shipDeadLine, groupOrderNo, lableCode } = orderInfo;
    return (
      <div className="page-prepare">
        <section className="card step1">
          <h2>Step 1 - Reset your phone</h2>
          <p>
            Thank you for placing your order here is what you need to next and
            link to an article showing what they need to do
          </p>
          <section className="video">
            <h3>Reset your device by following the video below</h3>
            <VideoComponent />
          </section>
          <RouterLink to={"/how-to-factory-reset-iphone"}>{`< Get Help`}</RouterLink>
        </section>
        <section className="card step2">
          <h2>Step 2 - Print your label</h2>
          <div className="container">
            <div className="line-card">
              <div>
                {needBox
                  ? "wait our send you a box and ship by"
                  : "Use your own box and ship by"}
                <br /> {shipDeadLine}
              </div>
            </div>
            <button className="common-button button-centered">
              <a
                target="_blank"
                href={`${
                  true ? "http://112.124.128.55" : "http://112.124.128.55"
                }/api/shippo/downloadlabel?shippolablecode=${encodeURIComponent(
                  lableCode
                )}`}
              >
                Print Label
              </a>
            </button>
            <section className="video">
              <h3>How to Ship</h3>
              <VideoComponent />
            </section>
          </div>
          <div className="check-order">
            <span>Your order #{groupOrderNo}</span>
            <RouterLink to="/neworder">{`Check Order >`}</RouterLink>
          </div>
        </section>
        <button className="common-button second">
          <RouterLink className="common-button second" to="/">
            Go back home
          </RouterLink>
        </button>
      </div>
    );
  } else {
    return null;
  }
}
