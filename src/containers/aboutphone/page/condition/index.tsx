const firstQuestionKey = "aboutYourPhone";
import React, { useReducer, useState, useEffect } from "react";
import "./index.less";
import { Collapse } from "antd";
import { IAction } from "@/interface/index.interface";
import { IQuestion, IUserAnswer, IUserQuestionAnswer } from "./index.interface";
import { WrapperPanel } from "./components/wrapperPanel";
import { isCanMove, isNoContinue } from "./util";
import {
  serverPhoneInfoQuestion,
  serverPhoneConditionQuestion,
  serverPhoneInfo
} from "./mock";

/*
default 和 active似乎 遵从active
 */

function reducer(state: any, action: IAction) {
  const { type, value } = action;
  function changeTargetById(arr: any[], changedId: string, answer: any) {
    // copy
    const changedArr = arr.slice(0);
    const findItemIndex = arr.findIndex((item: any) => {
      const { id } = item;
      return id === changedId;
    });
    if (findItemIndex === -1) {
      changedArr.push(answer);
    } else {
      // changedArr[findItemIndex] = answer;
    }
    return changedArr;
  }
  switch (type) {
    case "setAnswerArr": {
      const { questionId, answerId, answer } = value;
      // 1 获取当前的 或者 做一个新的
      // 2 将answer 补充上。
      // 3 返回掉
      // 新建一个新的外层  最坏打算。
      const newQuestionAnswer: IUserQuestionAnswer = {
        id: questionId,
        subAnswerArr: []
      };
      // 获取整合后的（有个全新的。ok的。没有变更老的。老的复制）（有 questionId，就应该用老的，不应该每次都重置。只有初始化应该重置）
      const questionArr: IUserQuestionAnswer[] = changeTargetById(
        state.phoneConditionAnswer,
        questionId,
        newQuestionAnswer
      );
      // 再取出来（从新生里面拿出来需要操作）
      const targetArr = questionArr.find(item => item.id === questionId);
      // 新建一个正确的、新answer（这个是内部的必然替代项）（那也就意味着，你需要对answer的完整性，负完全责）（其实这边也有初始化的需求。如果完成了初始化，就应该是。。赋值需求。应该准确赋值。）
      const newAnswer: IUserAnswer = { id: answerId, answer: [] };
      // 补充替换到target中（强行替换）
      // @ts-ignore
      targetArr.subAnswerArr = changeTargetById(
        (targetArr as IUserQuestionAnswer).subAnswerArr,
        answerId,
        newAnswer
      );
      // 初始化赋值结束后
      // @ts-ignore
      targetArr.subAnswerArr.find(item => item.id === answerId).answer = answer;
      // @ts-ignore
      questionArr[
        questionArr.findIndex(item => item.id === questionId)
      ] = targetArr;
      return { ...state, phoneConditionAnswer: questionArr };
    }
    case "setUserPhoneInfo": {
      const { questionId, answerId, answer } = value;
      // 1 获取当前的 或者 做一个新的
      // 2 将answer 补充上。
      // 3 返回掉
      // 新建一个新的外层  最坏打算。
      const newQuestionAnswer: IUserQuestionAnswer = {
        id: questionId,
        subAnswerArr: []
      };
      // 获取整合后的（有个全新的。ok的。没有变更老的。老的复制）（有 questionId，就应该用老的，不应该每次都重置。只有初始化应该重置）
      const questionArr: IUserQuestionAnswer[] = changeTargetById(
        state.phoneInfoAnswer,
        questionId,
        newQuestionAnswer
      );
      // 再取出来（从新生里面拿出来需要操作）
      const targetArr = questionArr.find(item => item.id === questionId);
      // 新建一个正确的、新answer（这个是内部的必然替代项）（那也就意味着，你需要对answer的完整性，负完全责）（其实这边也有初始化的需求。如果完成了初始化，就应该是。。赋值需求。应该准确赋值。）
      const newAnswer: IUserAnswer = { id: answerId, answer: [] };
      // 补充替换到target中（强行替换）
      // @ts-ignore
      targetArr.subAnswerArr = changeTargetById(
        (targetArr as IUserQuestionAnswer).subAnswerArr,
        answerId,
        newAnswer
      );
      // 初始化赋值结束后
      // @ts-ignore
      targetArr.subAnswerArr.find(item => item.id === answerId).answer = answer;
      // @ts-ignore
      questionArr[
        questionArr.findIndex(item => item.id === questionId)
      ] = targetArr;
      // 将target替换到原来的
      // const finalArr = changeTargetById(questionArr, questionId, targetArr)
      return { ...state, phoneInfoAnswer: questionArr };
    }
    case "setShowKey":
      // state 需要使用type吗？
      return { ...state, showKey: value };
    case "setEditKey":
      // state 需要使用type吗？
      return { ...state, editKey: value };
    case "setCurrentActive":
      return { ...state };
    case "set":
      return { ...state };
  }
}

// for fix sell
export default function() {
  return (
    <Conditions
      phoneInfoQuestion={serverPhoneInfoQuestion}
      phoneConditionQuestion={serverPhoneConditionQuestion}
      phoneInfoAnswer={serverPhoneInfo}
      phoneConditionAnswer={[]}
    />
  );
}
// questionnaire
// 后端接口
interface IConditions {
  phoneInfoQuestion?: IQuestion[];
  phoneConditionQuestion?: IQuestion[];
  phoneConditionAnswer?: IUserQuestionAnswer[];
  phoneInfoAnswer?: IUserQuestionAnswer[];
}

interface IStateConditions {
  phoneInfoAnswer: IUserQuestionAnswer[];
  phoneConditionAnswer: IUserQuestionAnswer[];
  editKey: string[];
  showKey: string[];
}

export function Conditions(props: IConditions) {
  const {
    phoneInfoQuestion = [],
    phoneConditionQuestion = [],
    phoneConditionAnswer = [],
    phoneInfoAnswer = []
  } = props;
  const initState: IStateConditions = {
    phoneInfoAnswer: phoneInfoAnswer,
    phoneConditionAnswer: phoneConditionAnswer,
    editKey: [],
    showKey: []
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <ConditionForm
      state={state}
      dispatch={dispatch}
      phoneInfoQuestion={phoneInfoQuestion}
      phoneConditionQuestion={phoneConditionQuestion}
    />
  );
}

interface IConditionForm {
  state: IStateConditions;
  dispatch: (action: IAction) => void;
  phoneConditionQuestion: IQuestion[];
  phoneInfoQuestion: IQuestion[];
}

export function ConditionForm(props: IConditionForm) {
  const [maxActiveKey, setMaxActiveKey] = useState("");
  const {
    state,
    dispatch,
    phoneConditionQuestion = [],
    phoneInfoQuestion = []
  } = props;
  const { phoneConditionAnswer, phoneInfoAnswer, editKey, showKey } = state;
  // format
  const questionProcess = [firstQuestionKey]
    .concat(phoneConditionQuestion.map(item => item.id))
    .concat(["allFinish"]);

  useEffect(() => {
    if (geMaxActiveKey()) {
      setMaxActiveKey(geMaxActiveKey());
    }
  }, []);

  // 每当用户输入变化的时候，重新跑一下。看是否触发next
  useEffect(() => {
    const findCurrent = phoneConditionQuestion.find(({ id }) => {
      return id === maxActiveKey;
    });
    if (findCurrent && isCanMove(findCurrent, phoneConditionAnswer)) {
      if (isNoContinue(findCurrent, phoneConditionAnswer)) {
        nextStep();
      }
    }
  }, [phoneConditionAnswer]);

  function getStatus(questionId: string): string {
    const targetPos = questionProcess.findIndex(item => item === questionId);
    const currentPos = questionProcess.findIndex(item => item === maxActiveKey);
    if (currentPos === targetPos) {
      return "doing";
    } else if (currentPos > targetPos) {
      if (editKey.includes(questionId)) {
        return "edit";
      } else {
        return "done";
      }
    } else {
      return "close";
    }
  }

  // 获取当前最max的。其实目前来说。要不first。要不last。但是需要考虑要求我缓存的需求。
  function geMaxActiveKey() {
    let current = firstQuestionKey;
    phoneConditionQuestion.forEach((question: IQuestion) => {
      const { id: questionId, subQuestionArr } = question;
      if (current === "") {
        current = questionId;
      }
      const findAnswer = phoneConditionAnswer.find(answer => {
        return answer.id === questionId;
      });
      if (
        findAnswer &&
        findAnswer.subAnswerArr &&
        subQuestionArr &&
        subQuestionArr.length
      ) {
        if (findAnswer.subAnswerArr.length === subQuestionArr.length) {
          current = "";
        }
      }
    });
    return current;
  }

  function onClickPanelHandler(questionId: string, isSave?: boolean): void {
    // 如果已经完成 并且当前没有打开的
    if (getStatus(questionId) === "done" && !(editKey && editKey.length)) {
      dispatch({ type: "setEditKey", value: questionId });
    } else if (getStatus(questionId) === "edit" && isSave) {
      dispatch({ type: "setEditKey", value: [] });
    }
  }

  // 将active游标移动。本来想动态化active。不可行。强行维护比较好。因为continue的存在。（这其实和当时遇到的那个进度的问题一样一样）。说明这个问题非常的典型。
  function nextStep() {
    const findCurrent = questionProcess.findIndex(
      (key: string) => key === maxActiveKey
    );
    if (findCurrent !== -1) {
      if (findCurrent < questionProcess.length - 1) {
        setMaxActiveKey(questionProcess[findCurrent + 1]);
      }
    }
  }
  function setShowKey(value: boolean) {
    dispatch({
      type: "setShowKey",
      value
    });
  }
  const extraQuestion: number = 1;
  return (
    <div className="page-condition">
      <p>Manufacture > Phone conditions</p>
      <h1>Phone conditions</h1>
      <Collapse activeKey={[maxActiveKey].concat(editKey).concat(showKey)}>
        <WrapperPanel
          onSetShowKey={setShowKey}
          isContinue={true}
          continueNextStep={nextStep}
          onUserInputHandler={(value: any) => {
            dispatch({ type: "setUserPhoneInfo", value: value });
          }}
          status={getStatus(firstQuestionKey)}
          onClickPanel={onClickPanelHandler}
          index={extraQuestion}
          total={phoneConditionQuestion.length + extraQuestion}
          key={firstQuestionKey}
          questionInfo={phoneInfoQuestion[0]}
          answerInfo={phoneInfoAnswer[0]}
        />
        {phoneConditionQuestion.map((question: IQuestion, index) => {
          const { id } = question;
          // 外面设置 还是里面设置 谁更合理？谁该负责？里面进行参数缺省更加合理。
          // 这两个WrapperPanel是否可以通用？
          const answerInfo = phoneConditionAnswer.find(
            userAnswer => userAnswer.id === id
          );
          return (
            <WrapperPanel
              onSetShowKey={setShowKey}
              isContinue={!isNoContinue(question, phoneConditionAnswer)}
              continueNextStep={nextStep}
              onUserInputHandler={(value: any) => {
                dispatch({ type: "setAnswerArr", value: value });
              }}
              status={getStatus(id)}
              onClickPanel={onClickPanelHandler}
              index={index + extraQuestion + 1}
              total={phoneConditionQuestion.length + extraQuestion}
              key={id}
              questionInfo={question}
              answerInfo={answerInfo}
            />
          );
        })}
      </Collapse>
      {maxActiveKey === "allFinish" ? (
        <button className="common-button finish-button">Get Quote</button>
      ) : null}
    </div>
  );
}
