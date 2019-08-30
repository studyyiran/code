import React, { useState } from "react";

export default function ModelCard(props: any) {
  const {
    id,
    imageUrl,
    name: modelName,
    selectProductHandler,
    isSelect,
    skuPricePropertyNames
  } = props;

  function renderByIsSelect() {
    console.log(isSelect);
    if (isSelect) {
      // skuPricePropertyNames.map(({ name, pricePropertyValues }: any) => {
      //   <ul key={name}>
      //     <h2>{name}</h2>
      //     {pricePropertyValues.map(({ value, id: propertyId }: any) => {
      //       return (
      //         <li
      //           data-selected={currentPropertyId === propertyId}
      //           onClick={() => {
      //             selectProductHandler(propertyId);
      //           }}
      //         >
      //           {value}
      //         </li>
      //       );
      //     })}
      //   </ul>;
      // });
      return <div>selected</div>;
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
        selectProductHandler(id);
      }}
    >
      {renderByIsSelect()}
    </div>
  );
}
