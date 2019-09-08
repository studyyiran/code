import React, { useState } from "react";
import "./index.less";

interface ISingleButton {
  children: any;
  index: string;
  currentSelect: string;
  onClick: (value: string) => void;
}

function SingleButton(props: ISingleButton) {
  const { children, index, currentSelect, onClick } = props;
  function handler() {
    onClick(index);
  }
  const isSelect = currentSelect === index;
  return (
    <button
      className="sub-question-button"
      data-select={isSelect ? "true" : "false"}
      onClick={handler}
    >
      {children}
    </button>
  );
}

interface ISelect {
  defaultValue?: any;
  options: any[];
  onChange: (s: any) => void;
}

export function SingleSelect(props: ISelect) {
  const [currentSelect, setCurrentSelect] = useState(
    props.defaultValue ? props.defaultValue.optiondId : ""
  );
  const handler = (selectIndex: string) => {
    setCurrentSelect(selectIndex);
    props.onChange({
      optionId: selectIndex
    });
  };
  return (
    <div className="comp-select">
      <SingleButton
        index={props.options[0].optionId}
        currentSelect={currentSelect}
        onClick={handler}
      >
        {props.options[0].optionContent}
      </SingleButton>
      <SingleButton
        index={props.options[1].optionId}
        currentSelect={currentSelect}
        onClick={handler}
      >
        {props.options[1].optionContent}
      </SingleButton>
    </div>
  );
}
