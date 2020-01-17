import React from "react";
import { JobsContent } from "../../components/content";

export const JobsIntern: React.FC = props => {
  const config = [
    {
      title: "Job Description",
      arr: [
        "Shadow Operation and Customer Care Team Members to gain insight into all aspects of the business;",
        "Support customers with special tasks as assigned;",
        "Bring and test new ideas to improve customer service or operational efficiency."
      ]
    },
    {
      title: "Minimum Requirements",
      arr: [
        "Must be enrolled in a Bachelor's degree program (specific degree is not required);",
        "Strong interest in working in the Internet/Technology industry;",
        "Ability to work under pressure and execute tasks before deadline;",
        "Eligible to work in the United States."
      ]
    }
  ];
  return <JobsContent config={config} title={"Operation Intern (Allen, TX)"} />;
};
