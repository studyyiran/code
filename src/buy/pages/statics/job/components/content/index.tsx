import { JobsLayout } from "../layout/layout";
import React from "react";

interface IProps {
  config: any[];
  title: string;
}

export const JobsContent = (props: IProps) => {
  const { config, title } = props;
  return (
    <JobsLayout className="job-page" isJobFooter={true}>
      <h3 className="title-font">{title}</h3>
      {config.map(({ title, arr }) => {
        return (
          <section className="job-content-section">
            <h4>{title}</h4>
            <ul>
              {arr.map((item: string) => {
                return <li>{item}</li>;
              })}
            </ul>
          </section>
        );
      })}
    </JobsLayout>
  );
};
