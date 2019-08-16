import React, {useState} from 'react';
import './index.less'
import {Checkbox} from 'antd'

interface ISingleButton {
  children: any,
  index: string,
  currentSelect: string,
  onClick: (value: string) => void
}

function SingleButton(props: ISingleButton) {
  const {children, index, currentSelect, onClick} = props
  function handler() {
    onClick(index)
  }
  const isSelect = currentSelect === index
  return <button className="sub-question-button" data-select={isSelect ? "true" : "false"} onClick={handler}>
    {isSelect}
    {children}
  </button>
}

interface ISelect {
  defaultValue?: string,
  onChange: (s: string) => void,
}

export function SingleSelect(props: ISelect) {
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue || "")
  const handler = (selectIndex: string) => {
    setCurrentSelect(selectIndex)
    props.onChange(selectIndex)
  }
  return <div className="comp-select">
    <SingleButton index={"true"} currentSelect={currentSelect} onClick={handler}>true</SingleButton>
    <SingleButton index={"false"} currentSelect={currentSelect} onClick={handler}>false</SingleButton>
  </div>
}

interface IMultiSelect {
  defaultValue?: string[],
  onChange: (s: string[]) => void,
  options: string[],
}

export function MultiSelect(props: IMultiSelect) {
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue || [])
  const handler = (current: string) => {
    const target = currentSelect.findIndex((item) => {
      return item === current
    })
    let result
    if (target === -1) {
      result = currentSelect.concat([current])
    } else {
      result = [...currentSelect.slice(0, target), ...currentSelect.slice(target + 1)]
    }
    setCurrentSelect(result)
    props.onChange(result)
  }
  return <div className="comp-multi-select">
    {props.options.map(name => {
      return <div className="comp-multi-select__item" key={name}>
        <Checkbox onChange={() => {handler(name)}}>{name}</Checkbox>
        {/*<Input value={} type="checkbox" />*/}
        {/*<label>{}</label>*/}
      </div>
    })}
  </div>
}