import { CheckBoxQuestion } from "./components/checkBoxQuestion";
import { SingleSelect } from "./components/singleSelect";
import { ChoiceQuestion } from "./components/choiceQuestion";
import { Select } from "antd";
import React from "react";
import "./index.less";
const { Option } = Select;

interface IRenderByType {
  type: string;
  subQuestionId: string;
  userSubAnswer: any;
  questionId: string;
  onUserInputHandler: (action: any) => void;
  questionDesc?: any[];
  isShowTips?: any;
  onSetShowKey?: (value: any) => void;
}

export function RenderByType(props: IRenderByType) {
  const {
    type,
    subQuestionId,
    userSubAnswer,
    questionId,
    onUserInputHandler,
    questionDesc,
    isShowTips,
    onSetShowKey
  } = props;
  const dom = [];
  switch (type) {
    case "default":
      dom.push(
        <SingleSelect
          key={subQuestionId}
          onChange={answer => {
            onUserInputHandler({
              questionId,
              answerId: subQuestionId,
              answer: [answer]
            });
            // 额外的
            if (isShowTips && onSetShowKey) {
              if (
                JSON.stringify([answer]) ===
                JSON.stringify(isShowTips.condition)
              ) {
                onSetShowKey([questionId]);
              } else {
                onSetShowKey([]);
              }
            }
          }}
          defaultValue={userSubAnswer.answer[0]}
        />
      );
      break;
    case "choiceQuestion":
      if (questionDesc && questionDesc.length) {
        dom.push(
          <ChoiceQuestion
            key={subQuestionId}
            options={questionDesc}
            onChange={answer => {
              console.log(answer)
              // onUserInputHandler({
              //   questionId,
              //   answerId: subQuestionId,
              //   answer: [answer]
              // });
            }}
            defaultValue={userSubAnswer.answer[0]}
          />
        );
      }
      break;
    case "multiSelect":
      if (questionDesc && questionDesc.length) {
        dom.push(
          <CheckBoxQuestion
            key={subQuestionId}
            options={questionDesc || []}
            onChange={answer => {
              onUserInputHandler({
                questionId,
                answerId: subQuestionId,
                answer: answer
              });
            }}
            defaultValue={userSubAnswer.answer}
          />
        );
      } else {
        return null;
      }
      break;
    case "select":
      if (questionDesc && questionDesc.length) {
        dom.push(
          <Select
            key={subQuestionId}
            style={{ width: "100%" }}
            defaultValue={questionDesc[0]}
          >
            {questionDesc.map((nameValue: string) => {
              return (
                <Option key={nameValue} value={nameValue}>
                  {nameValue}
                </Option>
              );
            })}
          </Select>
        );
      }
      break;
    default:
  }
  if (
    isShowTips &&
    JSON.stringify(userSubAnswer.answer) ===
      JSON.stringify(isShowTips.condition)
  ) {
    dom.push(
      <div
        key={subQuestionId + "__tips"}
        className="__tips"
        dangerouslySetInnerHTML={{ __html: isShowTips.tips }}
      />
    );
  }
  return <>{dom}</>;
}
