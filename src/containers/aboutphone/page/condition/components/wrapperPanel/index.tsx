import React from "react";
import { Collapse, Button } from 'antd';
const {Panel} = Collapse
import {IAction} from '@/interface/index.interface'
import {IQuestion, IUserQuestionAnswer} from "@/containers/aboutphone/page/condition/index.interface";
import {Select} from "../subQuestion";

function SaveButton(props: any) {
  return <Button onClick={props.onClick}>Save</Button>;
}
console.log(SaveButton)

// 如何为函数定义
// const IDispatchFunc =;

interface IWrapperPanel {
  dispatch:  (action: IAction) => void,
  questionInfo: IQuestion,
  answerInfo?: IUserQuestionAnswer,
}

export function WrapperPanel(props: IWrapperPanel) {
  const { dispatch, questionInfo } = props;
  const { id: questionId, title, subQuestionArr } = questionInfo;
  return (
    <Panel
      {...props}
      showArrow={false}
      header={
        <div>
          {/*<img src={require("")} />*/}
          <span>{title}</span>
        </div>
      }
      key={questionId}
      extra={<span>Step 4 of 7</span>}
    >
      
      {subQuestionArr.map((subQuestion) => {
        let userAnswer : any[] = []
        if (props.answerInfo) {
          const subAnswer = props.answerInfo.subAnswerArr.find(answer => answer.id === subQuestionId)
          userAnswer = subAnswer ? subAnswer.answer : [];
        }
        const sureHandler = (answer: string) => {
          dispatch({type: 'setAnswerArr', value: {
              questionId,
              answerId: subQuestionId,
              answer: [answer]
            }})
        }
        const {id: subQuestionId, content, type} = subQuestion
        
        
        return <div key={subQuestionId}>
          <p>content: {content}</p>
          <p>type: {type}</p>
          <Select onChange={sureHandler} defaultValue={userAnswer[0]} />
          {/*<p>answerId: {answerId}</p>*/}
          {/*<SaveButton onClick={sureHandler} />*/}
        </div>
      })}
    </Panel>)
}
  