import React from "react";
import { Collapse, Button } from 'antd';
const {Panel} = Collapse
import {IQuestion, IUserQuestionAnswer} from "@/containers/aboutphone/page/condition/index.interface";
import {Select} from "../subQuestion";

function SaveButton(props: any) {
  const {children, canPost} = props
  // check
  
  return <Button type={canPost ? "primary" : "dashed"} disabled={!canPost} onClick={props.onClick}>{children}</Button>;
}

// 如何为函数定义
// const IDispatchFunc =;

interface IWrapperPanel {
  questionInfo: IQuestion,
  answerInfo?: IUserQuestionAnswer,
  index: number,
  total: number,
  onClickPanel: (onChangeKey: string, isSave?: boolean) => void,
  onUserInputHandler: (action: any) => void,
  continueNextStep: () => void,
  status: string,
  isContinue?: boolean,
}

export function WrapperPanel(props: IWrapperPanel) {
  const { questionInfo, answerInfo, index, total, onClickPanel, status, isContinue, onUserInputHandler, continueNextStep } = props;
  const { id: questionId, title, subQuestionArr } = questionInfo;
  function renderTag() {
    switch (status) {
      case 'edit':
        
      case 'doing':
        return <span>Step {index} of {total}</span>
      case 'done':
        return <span>ok</span>
      default:
        return null
    }
  }
  function isAllFinish() {
    // 先简单进行输入判定。
    if (answerInfo && answerInfo.subAnswerArr && questionInfo && questionInfo.subQuestionArr) {
      if (answerInfo.subAnswerArr.length === questionInfo.subQuestionArr.length) {
        return true
      }
    }
    return false
  }
  return (
    <Panel
      {...props}
      showArrow={false}
      header={
        <div onClick={() => {onClickPanel(questionId)}}>
          {/*<img src={require("")} />*/}
          <span>{title} </span>
          <span> status: {status}</span>
        </div>
      }
      key={questionId}
      extra={renderTag()}
    >
      
      {subQuestionArr.map((subQuestion) => {
        let userAnswer : any[] = []
        if (answerInfo && answerInfo.subAnswerArr && answerInfo.subAnswerArr.length) {
          const subAnswer = answerInfo.subAnswerArr.find(answer => answer.id === subQuestionId)
          userAnswer = subAnswer ? subAnswer.answer : [];
        }
        function sureHandler (answer: string) {
          console.log('!')
          onUserInputHandler({
            questionId,
            answerId: subQuestionId,
            answer: [answer]
          })
        }
        const {id: subQuestionId, content, type} = subQuestion
        return <div key={subQuestionId}>
          <p>content: {content}</p>
          <p>type: {type}</p>
          <Select onChange={sureHandler} defaultValue={userAnswer[0]} />
          {/*<p>answerId: {answerId}</p>*/}
        </div>
      })}
      {status === 'edit' ? <SaveButton canPost={isAllFinish()} onClick={() => onClickPanel(questionId, true)}>Save</SaveButton> : null}
      {(isContinue && status === 'doing') ? <SaveButton canPost={isAllFinish()} onClick={() => {continueNextStep()}}>Continue</SaveButton> : null}
    </Panel>)
}
  