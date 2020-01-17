import React from "react";
import "./index.less";
import "../../common.less";
import { JobsLayout } from "../../components/layout/layout";
import RouterLink from "../../../../../common-modules/components/routerLink";

export const JobsPage: React.FC = props => {
  return (
    <JobsLayout className="job-page" >
      <ul>
        <li><RouterLink to={'/jobs/headofoperations'}>Heads of Operations</RouterLink></li>
        <li><RouterLink to={'/jobs/operationintern'}>Operation Intern</RouterLink></li>
      </ul>
    </JobsLayout>
  );
};
