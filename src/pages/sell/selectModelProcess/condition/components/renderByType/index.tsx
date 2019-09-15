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
          options={questionDesc || []}
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
                JSON.stringify([answer.optionId]) ===
                JSON.stringify(isShowTips.condition)
              ) {
                onSetShowKey([questionId]);
              } else {
                onSetShowKey([]);
              }
            }
          }}
          value={userSubAnswer.answer[0]}
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
              // onUserInputHandler({
              //   questionId,
              //   answerId: subQuestionId,
              //   answer: [answer]
              // });
            }}
            value={userSubAnswer.answer[0]}
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
            value={userSubAnswer.answer}
          />
        );
      } else {
        return null;
      }
      break;
    case "select":
      // 传统的下拉选择框
      if (questionDesc && questionDesc.length) {
        dom.push(
          <Select
            key={subQuestionId}
            value={userSubAnswer.answer}
            onChange={answer => {
              onUserInputHandler({
                questionId,
                answerId: subQuestionId,
                answer: [answer]
              });
            }}
          >
            {questionDesc.map(({ id, displayName: name }: any) => {
              return (
                <Option key={id} value={id}>
                  {name}
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
    JSON.stringify(userSubAnswer.answer.map((item: any) => item.optionId)) ===
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
