import React from "react";
import { JobsLayout } from "../../components/layout";

export const JobsPage: React.FC = props => {
  return (
    <JobsLayout>
      <ul>
        <li>Heads of Operations</li>
        <li>Operation Intern</li>
        <span>Jan 17, 2019</span>
      </ul>
    </JobsLayout>
  );
};
