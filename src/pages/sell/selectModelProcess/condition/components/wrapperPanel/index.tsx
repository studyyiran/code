import React from "react";
import "./index.less";
import { Collapse, Icon } from "antd";
import { RenderByType } from "../renderByType";
import {
  IQuestion,
  IUserQuestionAnswer,
  ISubQuestion
} from "../../index.interface";
import { canShowMoreQuestion, findAnswerById, isCanMove } from "../../util";
import TipsIcon from "@/pages/sell/selectModelProcess/components/tipsIcon";
const { Panel } = Collapse;
function SaveButton(props: any) {
  const { children, canPost } = props;
  // check

  return (
    <button
      className="common-button button-centered"
      disabled={!canPost}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}

// 如何为函数定义
// const IDispatchFunc =;

export interface IWrapperPanel {
  questionInfo: IQuestion;
  answerInfo?: IUserQuestionAnswer;
  index: number;
  total: number;
  onClickPanel: (onChangeKey: string, isSave?: boolean) => void;
  onUserInputHandler: (action: any) => void;
  continueNextStep: () => void;
  status: string;
  isContinue?: boolean;
  onSetShowKey?: (value: any) => void;
}

export function WrapperPanel(props: IWrapperPanel) {
  const {
    questionInfo,
    answerInfo,
    index,
    total,
    onClickPanel,
    status,
    isContinue,
    continueNextStep,
    onUserInputHandler,
    onSetShowKey
  } = props;
  const { id: questionId, title, subQuestionArr } = questionInfo;
  function renderTag() {
    switch (status) {
      case "edit":

      case "doing":
        return (
          <span className="tag">
            Step {index} of {total}
          </span>
        );
      case "done":
        return (
          <span className="tag canclick" data-type={"done"}>
            Edit
          </span>
        );
      default:
        return null;
    }
  }
  return (
    <Panel
      className="wrapper-panel"
      {...props}
      showArrow={false}
      header={
        <div
          className="wrapper-panel__header"
          onClick={() => {
            onClickPanel(questionId);
          }}
        >
          <div className="wrapper-panel__header__title">
            <RenderTagByStatus index={index} status={status} />
            <h1>{title} </h1>
          </div>
          {renderTag()}
        </div>
      }
      key={questionId}
    >
      <RenderQuestions
        answerInfo={answerInfo}
        subQuestionArr={subQuestionArr}
        onUserInputHandler={onUserInputHandler}
        questionId={questionId}
        onSetShowKey={onSetShowKey}
      />
      {status === "edit" ? (
        <SaveButton
          canPost={isCanMove(questionInfo, answerInfo && [answerInfo])}
          onClick={() => onClickPanel(questionId, true)}
        >
          Save
        </SaveButton>
      ) : null}
      {isContinue && status === "doing" ? (
        <SaveButton
          canPost={isCanMove(questionInfo, answerInfo && [answerInfo])}
          onClick={() => {
            continueNextStep();
          }}
        >
          Continue
        </SaveButton>
      ) : null}
    </Panel>
  );
}

interface IRenderQuestions {
  subQuestionArr: ISubQuestion[];
  answerInfo?: IUserQuestionAnswer;
  questionId: string;
  onUserInputHandler: (action: any) => void;
  onSetShowKey?: (value: any) => void;
}

function RenderQuestions(props: IRenderQuestions) {
  const {
    subQuestionArr,
    answerInfo,
    questionId,
    onUserInputHandler,
    onSetShowKey
  } = props;
  let canRenderNext = true;
  const dom: any[] = [];
  if (subQuestionArr && subQuestionArr.length) {
    subQuestionArr.forEach(subQuestion => {
      const {
        id: subQuestionId,
        content,
        type,
        isMoreCondition,
        questionDesc,
        isShowTips,
        tipsContent
      } = subQuestion;
      let userSubAnswer: any;
      if (answerInfo) {
        userSubAnswer = findAnswerById([answerInfo], subQuestionId) || {
          answer: []
        };
      } else {
        userSubAnswer = { answer: [] };
      }
      if (canRenderNext) {
        if (
          !canShowMoreQuestion(
            isMoreCondition,
            userSubAnswer && userSubAnswer.answer
          )
        ) {
          canRenderNext = false;
        }
        dom.push(
          <div className="wrapper-panel__question" key={subQuestionId}>
            <div className="content-container">
              <h2>
                {content}
                {tipsContent ? (
                  <TipsIcon isInfo={true}>{tipsContent}</TipsIcon>
                ) : null}
              </h2>
            </div>

            <RenderByType
              isShowTips={isShowTips}
              questionDesc={questionDesc}
              type={type}
              subQuestionId={subQuestionId}
              userSubAnswer={userSubAnswer}
              questionId={questionId}
              onUserInputHandler={onUserInputHandler}
              onSetShowKey={onSetShowKey}
            />
          </div>
        );
      }
    });
  }
  return <>{dom}</>;
}

function RenderTagByStatus(props: any) {
  const { status, index } = props;
  switch (status) {
    case "done":
      return (
        <span data-type={status}>
          <Icon type="check-circle" />
        </span>
      );
    case "doing":
    case "edit":
      return <span data-type={status}>{index}</span>;
    case "close":
      return <span data-type={status}>{index}</span>;
  }
  return null;
}
