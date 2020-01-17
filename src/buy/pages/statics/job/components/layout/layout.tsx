import React from "react";
import "./index.less";

interface IProps {
  children: any;
  className: string;
  isJobFooter?: boolean;
}

export const JobsLayout: React.FC<IProps> = (props: IProps) => {
  const { className, isJobFooter } = props;
  return (
    <div className={`jobs-layout ${className}`}>
      <h3 className="title">Jobs at UpTrade</h3>
      <section className="main">
        {props.children}
        <div className="footer" data-type={isJobFooter}>
          {isJobFooter
            ? "Apply to UP Trade Technologies Inc., 550 S Watters Road, Suite 276, Allen, TX 75013."
            : "Jan 17, 2019"}
        </div>
      </section>
    </div>
  );
};
