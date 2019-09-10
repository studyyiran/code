import React, { useReducer, useEffect } from "react";
import "./index.less";
import { findArrByKey } from "@/pages/sell/selectModelProcess/model/util";
import { IReducerAction } from "@/interface/index.interface";

// const attrConfig = {
//   PRODUCT_ID: "productId",
//   STORAGE_ID: "storageID",
//   CARRIER_ID: "carrierID"
// };

function reducer(state: any, action: IReducerAction) {
  const { type, value } = action;
  const newState = { ...state };
  switch (type) {
    default:
      newState[type] = value;
  }
  return newState;
}

export default function ModelCard(props: any) {
  const {
    id: modelId,
    photo: imageUrl,
    displayName: modelName,
    isSelect,
    list: phoneInfoQuestion,
    phoneInfoHandler,
    phoneInfoAnswer
  } = props;

  // 暂时放在这里。 其实可以考虑提升。
  const initState: any = {};
  const [attrState, attrStateDispatch] = useReducer(reducer, initState);

  // canPost?
  useEffect(() => {
    const findEmpty = phoneInfoQuestion.find((item: any) => {
      const key = item.id;
      const result = attrState && attrState[key];
      return !result;
    });
    if (!findEmpty) {
      phoneInfoQuestion.forEach((item: any) => {
        const key = item.id;
        phoneInfoHandler({
          answerId: key,
          answer: [Number(attrState[key])]
        });
      });
    }
  }, [attrState]);

  // canNext?
  // TODO 这块放在子上面不好
  // TODo 这种判断会引起bug
  useEffect(() => {
    console.warn(phoneInfoQuestion);
    // const a = findArrByKey(phoneInfoAnswer, "storage");
    // const b = findArrByKey(phoneInfoAnswer, "carrier");
    if (
      Object.keys(attrState).length &&
      Object.keys(attrState).length === phoneInfoQuestion.length &&
      !Object.keys(attrState).find((key: string) => {
        const findTarget = phoneInfoAnswer.subAnswerArr.find(
          (item: any) => item.id === String(key)
        );
        return (
          !findTarget ||
          !findTarget.answer ||
          String(attrState[key]) !== String(findTarget.answer[0])
        );
      })
    ) {
      props.goNextPage();
    } else {
      console.warn('?')
    }
  }, [phoneInfoAnswer, attrState]);

  function renderAttrSelectList(
    title: string,
    attrKey: string,
    arr: [],
    currentId: string
  ) {
    return (
      <li className="container">
        <h2>{title}</h2>
        <ul key={title} className="one-attr-container">
          {arr.map(({ displayName: name, id: propertyId }: any) => {
            return (
              <li
                className="one-attr-option"
                key={propertyId}
                data-selected={
                  String(currentId) === String(propertyId) ? "true" : "false"
                }
                onClick={() => {
                  attrStateDispatch({
                    type: attrKey,
                    value: [propertyId]
                  });
                }}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
  function renderByIsSelect() {
    if (isSelect) {
      // const storageArr = findArrByKey(phoneInfoQuestion, "storage");
      // const carrierArr = findArrByKey(phoneInfoQuestion, "carrier");
      return (
        <ul className="attr-panel-container">
          {phoneInfoQuestion.map((item: any) => {
            const { displayName, id, propertyValue } = item;
            // const renderArr = findArrByKey(phoneInfoQuestion, id);
            return renderAttrSelectList(
              displayName,
              id,
              propertyValue,
              attrState[id]
            );
          })}
        </ul>
      );
    } else {
      return (
        <div className="img-container">
          <img src={imageUrl} />
        </div>
      );
    }
  }
  return (
    <div
      className="model-card"
      onClick={() => {
        // 修改当前选择的model
        phoneInfoHandler({ answerId: "model", answer: [modelId] });
      }}
    >
      <div className="model-content-container">{renderByIsSelect()}</div>
      <div data-selected={isSelect} className="model-name-container">
        <span>{modelName}</span>
      </div>
      <div data-selected={isSelect} className="extra mb-ele">
        <span>{modelName}</span>
        <button>Select</button>
      </div>
    </div>
  );
}
