import React from "react";
import "./index.less";
import VideoComponent from "@/components/video";

export default function(props: any) {
  const {} = props;
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
        <a>{`< Get Help`}</a>
      </section>
      <section className="card step2">
        <h2>Step 2 - Print your label</h2>
        <div className="container">
          <div className="line-card">
            <div>Use your own box and ship by<br/> Tuesday, Aug. 13</div>
          </div>
          <button className="common-button">Print Label</button>
          <section className="video">
            <h3>How to Ship</h3>
            <VideoComponent />
          </section>
        </div>
        <div className="check-order">
          <span>Your order #121464654</span>
          <a>{`Check Order >`}</a>
        </div>
      </section>
      <button className="common-button second">Go back home</button>
    </div>
  );
}
