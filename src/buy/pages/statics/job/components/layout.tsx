import React from "react";
import "./index.less";

interface IProps {
  children: any;
  className: string;
}

export const JobsLayout: React.FC<IProps> = (props: IProps) => {
  const { className } = props;
  return (
    <div className={`jobs-layout ${className}`}>
      <h3 className="title">Jobs at UpTrade</h3>
      <section className="main">{props.children}</section>
    </div>
  );
};
