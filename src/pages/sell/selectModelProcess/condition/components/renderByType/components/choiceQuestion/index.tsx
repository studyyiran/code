import React, { useState } from "react";
import "./index.less";
import * as moment from "moment-timezone";
import { addDate } from "utils";
import Svg from "@/components/svg";

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
      className="question__option--container"
      data-select={isSelect ? "true" : "false"}
    >
      <div
        className="comp-choice-question__option"
        data-select={isSelect ? "true" : "false"}
        onClick={handler}
      >
        <span data-select={isSelect ? "true" : "false"} className="icon">
          <Svg icon={"duigou"} />
        </span>
        <span>{children}</span>
      </div>
    </div>
  );
}

interface IOptionProps {
  sendDateType: string;
  content: string;
  fee: string;
  time: number;
}

interface ISelect {
  defaultValue?: string;
  onChange: (s: any) => void;
  options: any[];
  render?: any;
}

export function ChoiceQuestion(props: ISelect) {
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue || "");
  const options = props.options;
  const handler = (selectIndex: string) => {
    setCurrentSelect(selectIndex);
    const target = options.find(item => item.sendDateType === selectIndex);
    props.onChange({
      sendDateType: target.sendDateType,
      fee: target.fee
    });
  };
  return (
    <div className="comp-choice-question">
      {options.map((option, index) => {
        const { time, content, sendDateType } = option;
        return (
          <Option
            key={sendDateType}
            index={sendDateType}
            currentSelect={currentSelect}
            onClick={handler}
          >
            {content}
            {moment
              .tz(addDate(new Date(), time), "America/Chicago")
              .format("MMM DD")}
            {props.render ? props.render(index) : null}
          </Option>
        );
      })}
    </div>
  );
}
