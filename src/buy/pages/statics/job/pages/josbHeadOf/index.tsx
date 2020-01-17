import React from "react";
import { JobsLayout } from "../../components/layout";
import RouterLink from "../../../../../common-modules/components/routerLink";

export const JosbHeadOf: React.FC = props => {
  return (
    <JobsLayout className="job-page">
      <h3>Head of Operations (Allen, TX)</h3>
      <div className="footer">Jan 17, 2019</div>
    </JobsLayout>
  );
};
