import {MultiSelect, SingleSelect} from "@/containers/aboutphone/page/condition/components/subQuestion";
import {Select} from "antd";
const { Option } = Select;
import React from "react";

interface IRenderByType {
  type: string,
  subQuestionId: string,
  userSubAnswer: any,
  questionId: string,
  onUserInputHandler: (action: any) => void,
  questionDesc?: string[],
  isShowTips?: any,
  onSetShowKey?: (value: any) => void,
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
  const dom = []
  switch (type) {
    case "default":
      dom.push(
        <SingleSelect
          onChange={answer => {
            onUserInputHandler({
              questionId,
              answerId: subQuestionId,
              answer: [answer]
            });
            // 额外的
            if (isShowTips && onSetShowKey) {
              if (JSON.stringify([answer]) === JSON.stringify(isShowTips.condition)) {
                onSetShowKey([questionId])
              } else {
                onSetShowKey([])
              }
            }
          }}
          defaultValue={userSubAnswer.answer[0]}
        />
      );
      break
    case "multiSelect":
      if (questionDesc && questionDesc.length) {
        dom.push(
          <MultiSelect
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
        return null
      }
      break
    case "select":
      if (questionDesc && questionDesc.length) {
        dom.push(
          <Select style={{ width: "100%" }} defaultValue={questionDesc[0]}>
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
      break
    default:
      dom.push(
        
      );
  }
  if (isShowTips && JSON.stringify(userSubAnswer.answer) === JSON.stringify(isShowTips.condition)) {
    dom.push(isShowTips.tips)
  }
  return <>{dom}</>
}