import React, { useState } from "react";
import { Checkbox, Input } from "antd";

interface ICheckBoxQuestion {
  value?: any[];
  onChange: (s: string[]) => void;
  options: any[];
}

export function CheckBoxQuestion(props: ICheckBoxQuestion) {
  const { options, value } = props;
  const handler = (next: any[]) => {
    props.onChange(next);
  };
  return (
    <div className="comp-multi-select">
      {options.map(option => {
        let dom;
        if (option.type === 1) {
          // 计算现有选项中
          const currentInput = (value || []).find(currentAnswer => {
            return currentAnswer.optionId === option.optionId;
          }) || {
            optionId: option.optionId,
            optionContent: ""
          };
          // const inputValue: string = currentInput ? currentInput.optionContent : "";
          dom = (
            <CheckBoxWithInput
              currentInput={currentInput}
              currentSelect={value}
              handler={handler}
            />
          );
        } else {
          dom = (
            <Checkbox
              checked={Boolean(
                (value || []).find((item: any) => {
                  return item.optionId === option.optionId;
                })
              )}
              onChange={() => {
                const target = (value || []).findIndex((item: any) => {
                  return item.optionId === option.optionId;
                });
                let result;
                if (target === -1) {
                  result = (value || []).concat([
                    { optionId: option.optionId }
                  ]);
                } else {
                  if (value) {
                    result = [
                      ...value.slice(0, target),
                      ...value.slice(target + 1)
                    ];
                  }
                }
                // @ts-ignore
                handler(result);
              }}
            >
              {option.optionContent}
            </Checkbox>
          );
        }
        return (
          <div className="comp-multi-select__item" key={option.optionId}>
            {dom}
          </div>
        );
      })}
    </div>
  );
}

function CheckBoxWithInput(props: any) {
  const { currentInput, currentSelect, handler } = props;
  const [isSelect, setIsSelect] = useState(
    Boolean(currentInput && currentInput.optionId && currentInput.optionContent)
  );
  return (
    <Checkbox
      className="comp-answer-input"
      checked={isSelect}
      onChange={() => {
        setIsSelect(value => {
          return !value;
        });
        // 清空的作用。
        if (isSelect) {
          const target = currentSelect.findIndex(
            (currentAnswer: any) =>
              currentAnswer.optionId === currentInput.optionId
          );
          const nextAnswer = [
            ...currentSelect.slice(0, target),
            ...currentSelect.slice(target + 1)
          ];
          handler(nextAnswer);
        }
      }}
    >
      <Input
        placeholder="Enter Text"
        disabled={!isSelect}
        value={currentInput.optionContent}
        onChange={e => {
          // 更新的时候，首先搜索到，然后替换掉
          const next = {
            optionId: currentInput.optionId,
            optionContent: e.currentTarget.value
          };
          if (isSelect) {
            const target = currentSelect.find(
              (currentAnswer: any) =>
                currentAnswer.optionId === currentInput.optionId
            );
            if (target) {
              target.optionContent = e.currentTarget.value;
              handler(currentSelect);
            } else {
              handler(currentSelect.concat([next]));
            }
            // const nextAnswer = [
            //   ...currentSelect.slice(0, target),
            //   next,
            //   ...currentSelect.slice(target + 1)
            // ];
          } else {
            // handler(currentSelect.concat([next]));
          }
        }}
      />
    </Checkbox>
  );
}
