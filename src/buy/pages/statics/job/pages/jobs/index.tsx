import React from "react";
import "./index.less";
import "../../common.less";
import { JobsLayout } from "../../components/layout/layout";
import RouterLink from "../../../../../common-modules/components/routerLink";

export const JobsPage: React.FC = props => {
  return (
    <JobsLayout className="job-page" >
      <ul>
        <li className="sub-title"><RouterLink to={'/jobs/head-of-operations'}>Head of Operations</RouterLink></li>
        <li className="sub-title"><RouterLink to={'/jobs/operation-intern'}>Operation Intern</RouterLink></li>
      </ul>
    </JobsLayout>
  );
};
