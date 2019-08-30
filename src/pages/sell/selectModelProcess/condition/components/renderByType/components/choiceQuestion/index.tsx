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
    <div className="question__option--container" data-select={isSelect ? "true" : "false"}>
      <div
        className="comp-choice-question__option"
        data-select={isSelect ? "true" : "false"}
        onClick={handler}
      >
        <svg
          className="icon"
          aria-hidden="true"
          data-select={isSelect ? "true" : "false"}
        >
          <use xlinkHref="#uptrade_duigou" />
        </svg>
        <span>{children}</span>
      </div>
    </div>
  );
}

interface IOptionProps {
  id: string,
  content: string,
}

interface ISelect {
  defaultValue?: string;
  onChange: (s: string) => void;
  options: IOptionProps[];
}

export function ChoiceQuestion(props: ISelect) {
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue || "");
  const options = props.options
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
