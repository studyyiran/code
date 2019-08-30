import React, { useState } from "react";

export default function ModelCard(props: any) {
  const { id, imageUrl, name, selectProductHandler, isSelect } = props;

  function renderByIsSelect() {
    console.log(isSelect)
    if (isSelect) {
      return <div>selected</div>;
    } else {
      return (
        <div>
          <img src={imageUrl} />
          <span>{name}</span>
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
