import React from "react";
import { JobsLayout } from "../../components/layout";
import RouterLink from "../../../../../common-modules/components/routerLink";

export const JosbHeadOf: React.FC = props => {
  return (
    <JobsLayout className="job-page" isJobFooter={true}>
      <h3 className="title-font">Head of Operations (Allen, TX)</h3>
      <section className="job-content-section">
        <h4>Job Description</h4>
        <ul>
          <li>
            Direct the inspection, testing, repair and refurbishment operation.
          </li>
          <li>
            Spearhead strategies to steer the marketing and operations teams in
            a positive direction.
          </li>
          <li>
            Drive the company’s operating capabilities to surpass customer
            satisfaction and retention and company goals.
          </li>
          <li>
            Oversee customer care operation to maintain high NPS score and
            customer satisfaction.
          </li>
          <li>
            Manage marketing initiatives and implement better business
            practices.
          </li>
          <li>Assess and direct improved processes and new technologies.</li>
          <li>
            Collaborate with management regarding the implementation of
            improvements.
          </li>
        </ul>
      </section>
    </JobsLayout>
  );
};
