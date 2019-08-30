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
  defaultValue?: string;
  onChange: (s: string) => void;
}

export function SingleSelect(props: ISelect) {
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue || "");
  const handler = (selectIndex: string) => {
    setCurrentSelect(selectIndex);
    props.onChange(selectIndex);
  };
  return (
    <div className="comp-select">
      <SingleButton
        index={"true"}
        currentSelect={currentSelect}
        onClick={handler}
      >
        true
      </SingleButton>
      <SingleButton
        index={"false"}
        currentSelect={currentSelect}
        onClick={handler}
      >
        false
      </SingleButton>
    </div>
  );
}
