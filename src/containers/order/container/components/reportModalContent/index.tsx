import Tag from "@/components/tag";
import { getIdFromAllQuestion } from "@/pages/sell/selectModelProcess/condition/util";
import React from "react";
import "./index.less";
import Svg from "@/components/svg";

export default function ReportModalContent(props: any) {
  const { inquiryInfo, phoneConditionQuestion } = props;
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  function RenderItem(itemProps: any) {
    const { title, value, isSame } = itemProps;
    return (
      <li className="comp-item" data-correct={isSame ? "true" : "false"}>
        <span className="title">{title}</span>
        <div className="content">
          <span className="value" data-correct={isSame ? "true" : "false"}>
            {value}
          </span>
          <span className="circle" data-correct={isSame ? "true" : "false"}>
            <Svg icon={isSame ? "correct" : "wrong"} />
          </span>
        </div>
      </li>
    );
  }
  const { brandName, displayName, pricePns, productPns } = revised;
  function checkIsSame(attrKey: string) {
    return revised[revised] === brandName[revised];
  }
  function checkSameFromArr(targetId: string, attrKey: string) {
    let isSame = false;
    if (
      submitted &&
      submitted[attrKey] &&
      submitted[attrKey].find(
        ({ id: submitAttrValueId }: any) => submitAttrValueId === targetId
      )
    ) {
      isSame = true;
    }
    return isSame;
  }
  return (
    <div className="report-modal-content">
      <h2>Inspection Report</h2>
      <Tag status={"fail"}>{differentReason}</Tag>
      <ul className="list">
        <RenderItem
          title="Phone Manfacture"
          value={brandName}
          isSame={checkIsSame("brandId")}
        />
        <RenderItem
          title="Model"
          value={displayName}
          isSame={checkIsSame("productId")}
        />
        {productPns.map(({ name, ppnName, id }: any) => (
          <RenderItem
            title={ppnName}
            value={name}
            isSame={checkSameFromArr(id, "productPns")}
          />
        ))}
        {pricePns.map(({ id, type, name }: any, index: number) => {
          const { answerId } = getIdFromAllQuestion(phoneConditionQuestion, id);
          let currentQuestion: any;
          phoneConditionQuestion.find((parent: any) => {
            const { subQuestionArr } = parent;
            return subQuestionArr.find((subQuestion: any) => {
              const { id: subQuestionId, content } = subQuestion;
              if (subQuestionId === answerId) {
                currentQuestion = subQuestion;
                return true;
              } else {
                return false;
              }
              return;
            });
          });
          return (
            <RenderItem
              isSame={checkSameFromArr(id, "pricePns")}
              key={index}
              title={currentQuestion && currentQuestion.content}
              value={name}
            />
          );
        })}
      </ul>
    </div>
  );
}
