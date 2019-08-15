import React from "react";
import { Collapse, Button } from 'antd';
const {Panel} = Collapse
import {IQuestion, IUserQuestionAnswer} from "@/containers/aboutphone/page/condition/index.interface";
import {Select} from "../subQuestion";

function SaveButton(props: any) {
  return <Button onClick={props.onClick}>Save</Button>;
}

// 如何为函数定义
// const IDispatchFunc =;

interface IWrapperPanel {
  questionInfo: IQuestion,
  answerInfo?: IUserQuestionAnswer,
  index: number,
  total: number,
  onClickPanel: (onChangeKey: string) => void,
  onUserInputHandler: (action: any) => void,
  onUserFinishInputHandler: (onChangeKey: string) => void,
  status: string,
  onSave: () => void,
  isContinue?: boolean,
}

export function WrapperPanel(props: IWrapperPanel) {
  const { questionInfo, index, total, onClickPanel, status, onSave, isContinue, onUserInputHandler, onUserFinishInputHandler } = props;
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
        if (props.answerInfo && props.answerInfo.subAnswerArr && props.answerInfo.subAnswerArr.length) {
          const subAnswer = props.answerInfo.subAnswerArr.find(answer => answer.id === subQuestionId)
          userAnswer = subAnswer ? subAnswer.answer : [];
        }
        function sureHandler (answer: string) {
          onUserInputHandler({
            questionId,
            answerId: subQuestionId,
            answer: [answer]
          })
          if (!isContinue) {
            onUserFinishInputHandler(questionId)
          }
        }
        const {id: subQuestionId, content, type} = subQuestion
        return <div key={subQuestionId}>
          <p>content: {content}</p>
          <p>type: {type}</p>
          <Select onChange={sureHandler} defaultValue={userAnswer[0]} />
          {/*<p>answerId: {answerId}</p>*/}
        </div>
      })}
      {status === 'edit' ? <SaveButton onClick={onSave} /> : null}
      {(isContinue && status === 'doing') ? <Button onClick={() => {onUserFinishInputHandler(questionId)}}>Continue</Button> : null}
    </Panel>)
}
  