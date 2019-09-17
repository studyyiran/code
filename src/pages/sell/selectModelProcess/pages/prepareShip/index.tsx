import React, { useState, useEffect, useContext } from "react";
import "./index.less";
import VideoComponent from "@/components/video";
import RouterLink from "@/components/routerLink";
import {
  ISelectModelContext,
  SelectModelContext
} from "@/pages/sell/selectModelProcess/context";
import * as moment from "moment-timezone";
import { Tabs } from "@/components/tabs";
const { TabPane } = Tabs as any;
// subOrders[0].shippingInfo.sendInfo[0].lableCode

const videoConfig = [
  {
    key: "0",
    id: "Apple",
    url: "/how-to-factory-reset-iphone",
    resUrl:
      "https://ahs-uptrade.oss-cn-hangzhou.aliyuncs.com/test/iPhone%20Reset.gif"
  },
  {
    key: "1",
    id: "Android",
    url: "/how-to-factory-reset-android-phone",
    resUrl:
      "https://ahs-uptrade.oss-cn-hangzhou.aliyuncs.com/test/Android%20Reset.gif"
  }
];

export default function(props: any) {
  // const selectModelContext = useContext(SelectModelContext);
  // const { getDownloadLabel } = selectModelContext as ISelectModelContext;
  const [orderInfo, setOrderInfo] = useState();
  const [currentTab, setCurrentTab] = useState(videoConfig[1].key);
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
            <Tabs
              className="type-tabs"
              activeKey={currentTab}
              onChange={(key: any) => {
                console.log(key);
                setCurrentTab(key);
              }}
            >
              {videoConfig.map(({ id, key }) => {
                return <TabPane key={key} tab={id} />;
              })}
            </Tabs>
            <img
              className="video-container"
              src={videoConfig[currentTab].resUrl}
            />
          </section>
          <button className="common-button button-centered">
            <RouterLink
              to={videoConfig[currentTab].url}
            >{`Get Help`}</RouterLink>
          </button>
        </section>
        <section className="card step2">
          <h2>Step 2 - Print your label</h2>
          <div className="container">
            <div className="line-card">
              <div>
                {needBox
                  ? "Send me a box; I will ship by"
                  : "Use your own box and ship by"}
                <br />{" "}
                {moment
                  .tz(shipDeadLine, "America/Chicago")
                  .format("llll")
                  .split(",")
                  .slice(0, 2)
                  .join(",")}
              </div>
            </div>
            <button className="common-button button-centered">
              <a
                target="_blank"
                href={`${
                  process.env.REACT_APP_SERVER_ENV === "UAT"
                    ? "http://10.180.22.252:9001"
                    : "http://prod-gateway-outside-1337850983.us-east-2.elb.amazonaws.com"
                }/api/shippo/downloadlabel?shippolablecode=${encodeURIComponent(
                  lableCode
                )}`}
              >
                Print Label
              </a>
            </button>
            <section className="video">
              <h3>How to Ship</h3>
              <img src="https://ahs-uptrade.oss-cn-hangzhou.aliyuncs.com/test/How%20to%20Ship.gif"/>
              {/*<VideoComponent />*/}
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
