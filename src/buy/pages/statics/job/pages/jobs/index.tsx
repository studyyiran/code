import React from "react";
import "./index.less";
import "../../common.less";
import { JobsLayout } from "../../components/layout";
import RouterLink from "../../../../../common-modules/components/routerLink";

export const JobsPage: React.FC = props => {
  return (
    <JobsLayout className="job-page">
      <ul>
        <li><RouterLink to={'/'}>He1ads of Operations</RouterLink></li>
        <li><RouterLink to={'/'}>Operation Intern</RouterLink></li>
      </ul>
      <div className="footer">Jan 17, 2019</div>
    </JobsLayout>
  );
};
