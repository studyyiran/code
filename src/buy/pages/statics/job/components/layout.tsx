import React from "react";
import "./index.less";

interface IProps {}

export const JobsLayout: React.FC = (props) => {
  return <div className="jobs-layout">
    <h3>Jobs at UpTrade</h3>
    <section>
      {props.children}
    </section>
  </div>;
};
