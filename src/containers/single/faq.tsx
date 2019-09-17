import React, { useEffect } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import "./faq.less";
import { staticSubjects } from "./faq/staticSubjects";
import { HeaderTitle } from "@/components/headerTitle";
import RouterLink from "@/components/routerLink";
import { getQueryString } from "utils";

interface ISubject {
  subjectTitle: string;
  questionAnswers: IQA[];
}

interface IQA {
  question: string;
  answer: string;
}

//
// const RenderQuestionAnswers : React.FC<IRenderQuestionAnswers> = (props) => {
//   return [<div>123</div>]
// const { questionAnswers } = props;
// return questionAnswers.map((questionAnswer) => {
//   const { question, answer } = questionAnswer;
//   return (
//     <Panel header={question} key={question + answer}>
//       {answer}
//     </Panel>
//   );
// })
// }

export default function Faq() {
  const subjects: ISubject[] = staticSubjects;
  useEffect(() => {
    if (getQueryString("index")) {
      setTimeout(() => {
        console.log(getQueryString("index"));
        // this.switchScrollAndOpen(parseInt(getQueryString("index") || "", 10));
      }, 500);
    }
  }, []);
  return (
    <div className="page-faq-container">
      <HeaderTitle title={"Frequently Asked Questions"} />
      <ul>
        {subjects.map(({ subjectTitle, questionAnswers }) => {
          return (
            <li className="page-faq-container__objects" key={subjectTitle}>
              <h2>{subjectTitle}</h2>
              <Collapse expandIconPosition="right">
                {renderQuestionAnswers(questionAnswers)}
              </Collapse>
            </li>
          );
        })}
      </ul>
      <button className="common-button">
        <RouterLink to="/newsell">Sell it now</RouterLink>
      </button>
    </div>
  );
}

function renderQuestionAnswers(questionAnswers: IQA[]) {
  return questionAnswers.map(questionAnswer => {
    const { question, answer } = questionAnswer;
    return (
      <Panel header={question} key={question + answer}>
        <p>{answer}</p>
      </Panel>
    );
  });
}
