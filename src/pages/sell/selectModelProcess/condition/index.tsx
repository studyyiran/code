const firstQuestionKey = "aboutYourPhone";
import React, { useReducer, useState, useEffect, useContext } from "react";
import "./index.less";
import { Collapse } from "antd";
import { IReducerAction } from "@/interface/index.interface";
import { IQuestion, IUserAnswer, IUserQuestionAnswer } from "./index.interface";
import { WrapperPanel } from "./components/wrapperPanel";
import { PhoneInfoWrapper } from "./components/phoneInfoWrapper";
import {
  isCanMove,
  isNoContinue,
  updateReducerValue,
  serverAnswerToRenderAnswer
} from "./util";
import { ISelectModelContext, SelectModelContext } from "../context";

/*
default 和 active似乎 遵从active
 */

export function reducer(state: any, action: IReducerAction) {
  const { type, value } = action;
  switch (type) {
    case "setAnswerArr": {
      const { questionId, answerId, answer } = value;
      const arr = updateReducerValue(
        state.phoneConditionAnswer,
        questionId,
        answerId,
        answer
      );
      return {
        ...state,
        phoneConditionAnswer: arr
      };
    }
    case "resetFromStore": {
      return {
        ...state,
        phoneConditionAnswer: value
      };
    }
    // case "setUserPhoneInfo": {
    //   const { questionId, answerId, answer } = value;
    //   return {
    //     ...state,
    //     phoneInfoAnswer: updateReducerValue(
    //       state.phoneInfoAnswer,
    //       questionId,
    //       answerId,
    //       answer
    //     )
    //   };
    // }
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
export default function Questionary(props: any) {
  return <Conditions {...props} />;
}
// questionnaire
// 后端接口

interface IStateConditions {
  phoneConditionAnswer: IUserQuestionAnswer[];
  editKey: string[];
  showKey: string[];
}

function Conditions(props: any) {
  const initState: IStateConditions = {
    phoneConditionAnswer: [],
    editKey: [],
    showKey: []
  };
  const [state, dispatch] = useReducer(reducer, initState);
  // test(phoneConditionQuestion, state.phoneConditionAnswer);
  // test2([], treemock);
  return <ConditionForm {...props} state={state} dispatch={dispatch} />;
}

interface IConditionForm {
  state: IStateConditions;
  dispatch: (action: IReducerAction) => void;
  history?: any;
  goNextPage?: any;
}

export function ConditionForm(props: IConditionForm) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    getInquiryByIds,
    selectModelContextValue,
    getNameInfo,
    selectModelContextDispatch
  } = selectModelContext as ISelectModelContext;

  const {
    qualityList: phoneConditionQuestion,
    phoneConditionServerAnswer
  } = selectModelContextValue;
  const [maxActiveKey, setMaxActiveKey] = useState("");
  const { state, dispatch } = props;

  // 初始化本地数据（props -》 state的过程不可避免 因为需要回滚用户操作）
  useEffect(() => {
    if (phoneConditionQuestion && phoneConditionServerAnswer) {
      const localStateAnswer = serverAnswerToRenderAnswer(
        phoneConditionQuestion,
        phoneConditionServerAnswer
      );
      dispatch({ type: "resetFromStore", value: localStateAnswer });
    }
  }, [phoneConditionQuestion, phoneConditionServerAnswer]);

  const { phoneConditionAnswer, editKey, showKey } = state;
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
  function renderLeftPic() {
    const { brand: brandId, modelInfo } = selectModelContextValue;
    const { modelId, othersAttr } = modelInfo;
    const nameConfig = getNameInfo({
      brandId,
      modelId,
      othersAttr
    });
    return <img className="product-bg" src={nameConfig.imgUrl} />;
  }
  return (
    <div className="page-condition">
      {renderLeftPic()}
      <div>
        <Collapse activeKey={[maxActiveKey].concat(editKey).concat(showKey)}>
          <PhoneInfoWrapper
            key={firstQuestionKey}
            renderComponent={({
              phoneInfoHandler,
              phoneInfoQuestion,
              phoneInfoAnswer,
              ...otherProps
            }: any) => {
              return (
                <WrapperPanel
                  {...otherProps}
                  onSetShowKey={setShowKey}
                  isContinue={true}
                  continueNextStep={nextStep}
                  onUserInputHandler={phoneInfoHandler}
                  status={getStatus(firstQuestionKey)}
                  onClickPanel={onClickPanelHandler}
                  index={extraQuestion}
                  total={phoneConditionQuestion.length + extraQuestion}
                  key={firstQuestionKey}
                  questionInfo={phoneInfoQuestion}
                  answerInfo={phoneInfoAnswer}
                />
              );
            }}
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
          <button
            onClick={() => {
              // canPost if enter here
              // post
              selectModelContextDispatch({
                type: "postConditionAnswerRenderVersion",
                value: state.phoneConditionAnswer
              });
              setTimeout(() => {
                // 获取最新的key
                getInquiryByIds().then((value: any) => {
                  // 其实应该一致。监听state然后跳转
                  props.goNextPage();
                });
              }, 2000);
            }}
            className="common-button finish-button"
          >
            Get Quote
          </button>
        ) : null}
      </div>
    </div>
  );
}
