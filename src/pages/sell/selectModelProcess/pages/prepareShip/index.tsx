import React, { useState, useEffect, useContext } from "react";
import "./index.less";
import VideoComponent from "components/video";
import {
  ISelectModelContext,
  SelectModelContext
} from "pages/sell/selectModelProcess/context";
import * as moment from "moment-timezone";
import { Tabs } from "components/tabs";
const { TabPane } = Tabs as any;
// subOrders[0].shippingInfo.sendInfo[0].lableCode
import { getFromSession } from "utils/util";
import {LoginWrapper} from "../../../../../buy/common-modules/components/loginButton";
import RouterLink from "../../../../../buy/common-modules/components/routerLink";

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
  const [orderInfo, setOrderInfo] = useState();
  const [currentTab, setCurrentTab] = useState(videoConfig[0].key);
  useEffect(() => {
    // 从缓存中获取数据。为了持久显示
    const orderInfoCache: any = getFromSession("orderInfo");
    if (orderInfoCache) {
      setOrderInfo(orderInfoCache);
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
              target="_blank"
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
                  .format("LLLL")
                  .split(",")
                  .slice(0, 2)
                  .join(",")}
              </div>
            </div>
            <button className="common-button button-centered">
              <a
                target="_blank"
                href={`${
                  process.env.REACT_APP_SERVER_ENV === "PUB"
                    ? "https://api-gateway.uptradeit.com"
                    : process.env.REACT_APP_SERVER_ENV === "QA" ?
                    "http://qa-gateway-801477214.us-east-2.elb.amazonaws.com"
                    : "http://demo-gateway-1613913116.us-east-2.elb.amazonaws.com"
                }/api/shippo/downloadlabel?shippolablecode=${encodeURIComponent(
                  lableCode
                )}`}
              >
                Print Label
              </a>
            </button>
            <section className="video">
              <h3>How to Ship</h3>
              <img src="https://d3c745jesl5pj3.cloudfront.net/statics/email/howtoship.gif"/>
              {/*<VideoComponent />*/}
            </section>
          </div>
          <div className="check-order">
            <span>Your order #{groupOrderNo}</span>
            <RouterLink to="/order">{`Check Order >`}</RouterLink>
          </div>
        </section>
        <button className="common-button second">
          <a className="common-button second" href="/">
            Go back home
          </a>
        </button>
        <LoginWrapper
          renderNotLogin={({ url }: any) => (
            <div>
              <div className={"or"}>OR</div>
              <div className={"button-wrapper button-centered"}>
                <button className="common-button">
                  <RouterLink to={url}>Create an account</RouterLink>
                </button>
              </div>
            </div>
          )}
        />
      </div>
    );
  } else {
    return null;
  }
}
