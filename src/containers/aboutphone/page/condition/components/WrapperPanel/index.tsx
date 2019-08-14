import { Collapse, Button } from 'antd';
const {Panel} = Collapse
import {IAction} from '@/interface/index.interface'
import React from "react";
import {IQuestion} from "@/containers/aboutphone/page/condition/index.interface";

function SaveButton(props: any) {
  return <Button onClick={props.onClick}>Save</Button>;
}

// 如何为函数定义
// const IDispatchFunc =;

interface IWrapperPanel {
  dispatch:  (action: IAction) => void,
  questionInfo: IQuestion,
  answerInfo: {
    id: string,
    answer: string
  },
}

export function WrapperPanel(props: IWrapperPanel) {
  const { dispatch, questionInfo, answerInfo } = props;
  const { id: questionId, title, subQuestionArr } = questionInfo;
  const { id: answerId, answer } = answerInfo;
  const sureHandler = (subQuestionId: string) => {
    dispatch({type: 'setAnswerArr', value: {
        questionId,
        answerId: subQuestionId,
        answer: "123123"
      }})
  }
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
        const {id: subQuestionId, content, type} = subQuestion
        return <div key={subQuestionId}>
          <p>content: {content}</p>
          <p>type: {type}</p>
          <p>answer: {answer}</p>
          <p>answerId: {answerId}</p>
          <SaveButton onClick={sureHandler.bind({}, subQuestionId)} />
        </div>
      })}
    </Panel>)
}
  