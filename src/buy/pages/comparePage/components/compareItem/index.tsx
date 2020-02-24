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
  
  const renderTopPart = () => {
    return <div>
      <div>swiper part</div>
      <button>Buy Now</button>
      <div>remove</div>
    </div>
  }
  
  // 渲染
  return (
    <li className="compare-item">
      {isTitleLine ? <div></div> : renderTopPart()}
      {isTitleLine ? <RenderTitleList config={configArr} /> : <RenderListItem config={configArr} />}
    </li>
  );
}

const RenderTitleList = (props: { config: any[] }) => {
  const { config } = props;
  return (
    <div>
      {config.map(({ title }: any) => {
        return <div>1{title}</div>;
      })}
    </div>
  );
};

const RenderListItem = (props: { config: any[] }) => {
  const { config } = props;
  return (
    <div>
      {config.map(({ title }: any) => {
        return <div>2{title}</div>;
      })}
    </div>
  );
};
