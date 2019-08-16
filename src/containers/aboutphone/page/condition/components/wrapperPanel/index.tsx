import React from "react";
import "./index.less";
import { Collapse, Icon } from 'antd';
const {Panel} = Collapse
import {IQuestion, IUserQuestionAnswer} from "@/containers/aboutphone/page/condition/index.interface";
import {Select, MultiSelect} from "../subQuestion";
import {canShowMoreQuestion, findAnswerById, isCanMove} from "../../util";

function SaveButton(props: any) {
  const {children, canPost} = props
  // check
  
  return <button className="common-button" disabled={!canPost} onClick={props.onClick}>{children}</button>;
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
        return <span className="tag">Step {index} of {total}</span>
      case 'done':
        return <span className="tag" data-type={"done"}>Edit</span>
      default:
        return null
    }
  }
  function isAllFinish() {
    if (answerInfo) {
      return isCanMove(questionInfo, [answerInfo])
    } else {
      return false
    }
    // 先简单进行输入判定。
    // if (answerInfo && answerInfo.subAnswerArr && questionInfo && questionInfo.subQuestionArr) {
    //   if (answerInfo.subAnswerArr.length === .subQuestionArr.length) {
    //     return true
    //   }
    // }
    // return false
  }
  function renderQuestions() {
    let canRenderNext = true
   
    return subQuestionArr.map((subQuestion) => {
      const {id: subQuestionId, content, type, isMoreCondition, questionDesc} = subQuestion
      let userSubAnswer: any
      if (answerInfo) {
        userSubAnswer = findAnswerById([answerInfo], subQuestionId) || {answer: []}
      } else {
        userSubAnswer = {answer: []}
      }
      if (canRenderNext) {
        if (isMoreCondition && !canShowMoreQuestion(isMoreCondition, userSubAnswer && userSubAnswer.answer)) {
          canRenderNext = false
        }
        return <div className="wrapper-panel__question" key={subQuestionId}>
          <h2>{content}</h2>
          <RenderByType questionDesc={questionDesc} type={type} subQuestionId={subQuestionId} userSubAnswer={userSubAnswer} onUserInputHandler={onUserInputHandler} questionId={questionId} />
        </div>
      } else {
        return null
      }
    })
  }
  return (
    <Panel
      className="wrapper-panel"
      {...props}
      showArrow={false}
      header={
        <div className="wrapper-panel__header" onClick={() => {onClickPanel(questionId)}}>
          <div className="wrapper-panel__header__title">
            <RenderTagByStatus index={index} status={status} />
            <h1>{title} </h1>
          </div>
          {renderTag()}
        </div>
      }
      key={questionId}
    >
      {renderQuestions()}
      {status === 'edit' ? <SaveButton canPost={isAllFinish()} onClick={() => onClickPanel(questionId, true)}>Save</SaveButton> : null}
      {(isContinue && status === 'doing') ? <SaveButton canPost={isAllFinish()} onClick={() => {continueNextStep()}}>Continue</SaveButton> : null}
    </Panel>)
}

function RenderTagByStatus(props: any) {
  const {status, index} = props
  switch (status) {
    case 'done':
      return <span data-type={props.status}>
        <Icon type="check-circle" style={{color: "white"}}/>
      </span>
    case 'doing':
    case 'edit':
      return <span data-type={status}>{index}</span>
    case 'close':
      return <span data-type={status}>{index}</span>
  }
  return null
}

function RenderByType(props: any) {
  const {type, subQuestionId, userSubAnswer, questionId, onUserInputHandler, questionDesc} = props
  switch (type) {
    case 'default':
      return <Select onChange={(answer) => {
        onUserInputHandler({
          questionId,
          answerId: subQuestionId,
          answer: [answer]
        })
      }} defaultValue={userSubAnswer.answer[0]} />
    case 'multiSelect':
      return <MultiSelect 
        options={questionDesc}
        onChange={(answer) => {
        onUserInputHandler({
          questionId,
          answerId: subQuestionId,
          answer: answer
        })
      }} 
        defaultValue={userSubAnswer.answer} />
    default:
      return <Select onChange={(answer) => {
        onUserInputHandler({
          questionId,
          answerId: subQuestionId,
          answer: [answer]
        })
      }} defaultValue={userSubAnswer.answer[0]} />
  }
}
  