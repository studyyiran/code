import React from "react";
import "./index.less";
import "../../common.less";
import { JobsLayout } from "../../components/layout";

export const JobsPage: React.FC = props => {
  return (
    <JobsLayout className="job-page">
      <ul>
        <li>He1ads of Operations</li>
        <li>Operation Intern</li>
      </ul>
      <div className="footer">Jan 17, 2019</div>
    </JobsLayout>
  );
};
