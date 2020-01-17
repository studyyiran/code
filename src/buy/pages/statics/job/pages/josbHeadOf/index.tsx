import React from "react";
import { JobsContent } from "../../components/content";

export const JobsHeadOf: React.FC = props => {
  const config = [
    {
      title: "Job Description",
      arr: [
        "Direct the inspection, testing, repair and refurbishment operation.",
        "Spearhead strategies to steer the marketing and operations teams in a positive direction.",
        "Drive the company’s operating capabilities to surpass customer satisfaction and retention and company goals.",
        "Oversee customer care operation to maintain high NPS score and customer satisfaction.",
        "Manage marketing initiatives and implement better business practices.",
        "Assess and direct improved processes and new technologies.",
        "Collaborate with management regarding the implementation of improvements."
      ]
    },
    {
      title: "Minimum Requirements",
      arr: [
        "Master’s degree in Business Administration, Management or related field plus 3 years of related experience. Will accept a Bachelor’s degree followed by 5 years progressive related experience in lieu of Master’s +3.",
        " Requires 3 years of experience in: Establishing Customer Care; Reverse Logistics of Consumer Electronics; Technical Support Management; Quality Management; and International Work Experience with customers and vendors."
      ]
    }
  ];
  return (
    <JobsContent config={config} title={"Head of Operations (Allen, TX)"} />
  );
};
