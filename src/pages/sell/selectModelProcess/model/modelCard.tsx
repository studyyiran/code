import React from "react";
import { findArrByKey } from "@/pages/sell/selectModelProcess/model/util";

export default function ModelCard(props: any) {
  const {
    id,
    imageUrl,
    name: modelName,
    isSelect,
    phoneInfoAnswer,
    phoneInfoQuestion,
    phoneInfoHandler
  } = props;
  function renderAttrSelectList(
    title: string,
    answerId: string,
    arr: [],
    currentId: string
  ) {
    return (
      <ul key={title}>
        <h2>{title}</h2>
        {arr.map(({ name, id: propertyId }: any) => {
          return (
            <li
              key={propertyId}
              data-selected={currentId === propertyId}
              onClick={() => {
                phoneInfoHandler({
                  answerId: answerId,
                  answer: [propertyId]
                });
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
    );
  }
  function renderByIsSelect() {
    if (isSelect) {
      const storageArr = findArrByKey(phoneInfoQuestion, "storage");
      const carrierArr = findArrByKey(phoneInfoQuestion, "carrier");
      return (
        <div>
          {renderAttrSelectList(
            "storage",
            "storage",
            storageArr,
            findArrByKey(phoneInfoAnswer, "storage")
          )}
          {renderAttrSelectList(
            "carrier",
            "carrier",
            carrierArr,
            findArrByKey(phoneInfoAnswer, "carrier")
          )}
        </div>
      );
    } else {
      return (
        <div>
          <img src={imageUrl} />
          <span>{modelName}</span>
        </div>
      );
    }
  }
  return (
    <div
      className="model-card"
      onClick={() => {
        phoneInfoHandler({ answerId: "model", answer: [id] });
      }}
    >
      {renderByIsSelect()}
    </div>
  );
}
