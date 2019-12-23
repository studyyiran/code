import React, { useState } from "react";
import "./index.less";

interface ISingleButton {
  children: any;
  index: string;
  currentSelect: string;
  isEdit: boolean;
  onClick: (value: string) => void;
}

function SingleButton(props: ISingleButton) {
  const { children, index, currentSelect, onClick, isEdit } = props;
  function handler() {
    onClick(index);
  }
  const isSelect = currentSelect === index;
  return (
    <button
      disabled={!isEdit}
      className="sub-question-button canclick"
      data-select={isSelect ? "true" : "false"}
      onClick={handler}
    >
      {children}
    </button>
  );
}

interface ISelect {
  value?: any;
  isEdit: boolean;
  options: any[];
  onChange: (s: any) => void;
}

export function SingleSelect(props: ISelect) {
  const handler = (selectIndex: string) => {
    if (props.isEdit) {
      props.onChange({
        optionId: selectIndex
      });
    }
  };
  return (
    <div className="comp-select">
      <SingleButton
        isEdit={props.isEdit}
        index={props.options[0].optionId}
        currentSelect={props.value ? props.value.optionId : ""}
        onClick={handler}
      >
        {props.options[0].optionContent}
      </SingleButton>
      <SingleButton
        isEdit={props.isEdit}
        index={props.options[1].optionId}
        currentSelect={props.value ? props.value.optionId : ""}
        onClick={handler}
      >
        {props.options[1].optionContent}
      </SingleButton>
    </div>
  );
}
