import React, { useState } from "react";
import "./index.less";

interface IOption {
  children: any;
  index: string;
  currentSelect: string;
  onClick: (value: string) => void;
}

function Option(props: IOption) {
  const { children, index, currentSelect, onClick } = props;
  function handler() {
    onClick(index);
  }
  const isSelect = currentSelect === index;
  return (
    <div
      className="comp-choice-question__option"
      data-select={isSelect ? "true" : "false"}
      onClick={handler}
    >
      {children}
    </div>
  );
}

interface ISelect {
  defaultValue?: string;
  onChange: (s: string) => void;
}

export function ChoiceQuestion(props: ISelect) {
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue || "");
  const options = [
    {
      id: "0",
      content: "Ship by 8/8/19 with your box"
    },
    {
      id: "1",
      content: "Ship by 8/8/19 with your box"
    },
    {
      id: "2",
      content: "Ship by 8/8/19 with your box"
    }
  ];
  const handler = (selectIndex: string) => {
    setCurrentSelect(selectIndex);
    props.onChange(selectIndex);
  };
  return (
    <div className="comp-choice-question">
      {options.map(option => {
        const { id, content } = option;
        return (
          <Option
            key={id}
            index={id}
            currentSelect={currentSelect}
            onClick={handler}
          >
            {content}
          </Option>
        );
      })}
    </div>
  );
}
