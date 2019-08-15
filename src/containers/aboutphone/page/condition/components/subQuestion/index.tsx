import React, {useState} from 'react';
import {Button} from 'antd'

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
  return <Button onClick={handler}>
    {isSelect}
    {children}
  </Button>
}

interface ISelect {
  defaultValue: any,
}

export function Select(props: ISelect) {
  const [currentSelect, setCurrentSelect] = useState(props.defaultValue)
  const handler = (selectIndex: string) => {
    setCurrentSelect(selectIndex)
  }
  return <div>
    <SingleButton index={"true"} currentSelect={currentSelect} onClick={handler}>true</SingleButton>
    <SingleButton index={"false"} currentSelect={currentSelect} onClick={handler}>false</SingleButton>
  </div>
}

export function Multiple() {
  return <div>123</div>
}