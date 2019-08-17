import React, { useState } from "react";
import "./index.less";
import { Checkbox, Input } from "antd";

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
      {isSelect}
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

interface IMultiSelect {
  defaultValue?: string[];
  onChange: (s: string[]) => void;
  options: string[];
}

export function MultiSelect(props: IMultiSelect) {
  const {options} = props
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue || []);
  console.log(currentSelect)
  const handler = (next: string[]) => {
    setCurrentSelect(next);
    props.onChange(next);
  };

  function RenderOption({option} : any) {
    let dom
    if (option === '__input__') {
      // 计算现有选项中
      const restAnswer = currentSelect.filter((currentAnswer) => {
        return !options.includes(currentAnswer)
      })
      const inputValue : string = restAnswer.length > 0 ? restAnswer[0] : ''
      dom = <Checkbox
        key={"finallove"}
        checked={Boolean(inputValue)}
        onChange={() => {
          // 清空的作用。
          if (inputValue) {
            const target = currentSelect.findIndex((currentAnswer) => currentAnswer === inputValue)
            const nextAnswer = [...currentSelect.slice(0, target), ...currentSelect.slice(target + 1)]
            handler(nextAnswer)
          }
        }}
      >
        <Input value={inputValue} onChange={(e) => {
          // 更新的时候，首先搜索到，然后替换掉
          const next = e.currentTarget.value
          if (inputValue) {
            const target = currentSelect.findIndex((currentAnswer) => currentAnswer === inputValue)
            const nextAnswer = [...currentSelect.slice(0, target), next, ...currentSelect.slice(target + 1)]
            handler(nextAnswer)
          } else {
            handler(currentSelect.concat([next]))
          }
          
        }}/>
      </Checkbox>
    } else {
      dom = <Checkbox
        checked={currentSelect.includes(option)}
        onChange={() => {
          const target = currentSelect.findIndex(item => {
            return item === option;
          });
          let result;
          if (target === -1) {
            result = currentSelect.concat([option]);
          } else {
            result = [
              ...currentSelect.slice(0, target),
              ...currentSelect.slice(target + 1)
            ];
          }
          handler(result);
        }}
      >
        {option}
      </Checkbox>
    }
    return <div className="comp-multi-select__item">
      {dom}
    </div>
  }
  
  return (
    <div className="comp-multi-select">
      {options.map(option => {
        return (
          <RenderOption key={option} option={option} />
        );
      })}
    </div>
  );
}


