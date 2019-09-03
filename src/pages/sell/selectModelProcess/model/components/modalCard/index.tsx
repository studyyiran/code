import React, { useReducer, useEffect } from "react";
import "./index.less";
import { findArrByKey } from "@/pages/sell/selectModelProcess/model/util";
import { IReducerAction } from "@/interface/index.interface";

// const attrConfig = {
//   PRODUCT_ID: "productId",
//   STORAGE_ID: "storageID",
//   CARRIER_ID: "carrierID"
// };

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  const newState = { ...state };
  switch (type) {
    case "storageId": {
      newState.storageId = value;
      break;
    }
    case "carrierId": {
      newState.carrierId = value;
      break;
    }
    default:
  }
  return newState;
}

interface IContextState {
  storageId: string;
  carrierId: string;
}

export default function ModelCard(props: any) {
  const {
    id: modelId,
    imageUrl,
    name: modelName,
    isSelect,
    phoneInfoQuestion,
    phoneInfoHandler,
    phoneInfoAnswer
  } = props;

  // 暂时放在这里。 其实可以考虑提升。
  const initState: IContextState = {
    storageId: "",
    carrierId: ""
  };
  const [attrState, attrStateDispatch] = useReducer(reducer, initState);

  // canPost?
  useEffect(() => {
    if (attrState.storageId && attrState.carrierId) {
      phoneInfoHandler({
        answerId: "storage",
        answer: [Number(attrState.storageId)]
      });
      phoneInfoHandler({
        answerId: "carrier",
        answer: [Number(attrState.carrierId)]
      });
    }
  }, [attrState]);

  // canNext?
  useEffect(() => {
    const a = findArrByKey(phoneInfoAnswer, "storage");
    const b = findArrByKey(phoneInfoAnswer, "carrier");
    if (
      a &&
      b &&
      a.includes(Number(attrState.storageId)) &&
      b.includes(Number(attrState.carrierId))
    ) {
      props.goNextPage();
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
          {arr.map(({ name, id: propertyId }: any) => {
            return (
              <li
                className="one-attr-option"
                key={propertyId}
                data-selected={
                  String(currentId) === String(propertyId) ? "true" : "false"
                }
                onClick={() => {
                  attrStateDispatch({
                    type: `${attrKey}Id`,
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
      const storageArr = findArrByKey(phoneInfoQuestion, "storage");
      const carrierArr = findArrByKey(phoneInfoQuestion, "carrier");
      return (
        <ul className="attr-panel-container">
          {renderAttrSelectList(
            "Size",
            "storage",
            storageArr,
            attrState.storageId
          )}
          {renderAttrSelectList(
            "Carrier",
            "carrier",
            carrierArr,
            attrState.carrierId
          )}
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
