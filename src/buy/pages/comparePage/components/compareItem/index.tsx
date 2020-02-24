import React, { useContext, useEffect } from "react";
import "./index.less";

interface IProps {
  isTitleLine?: boolean;
}

export function CompareItem(props: IProps) {
  const { isTitleLine } = props;
  const configArr = [
    {
      type: "",
      title: "Price"
    },
    {
      type: "",
      title: "Condition"
    }
  ];
  if (isTitleLine) {
    
  } else {
    
  }
  
 
  
  // 渲染
  return (
    <li className="compare-item">
    </li>
  );
}


