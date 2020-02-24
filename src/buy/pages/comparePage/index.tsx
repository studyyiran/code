import React, { useContext, useEffect } from "react";
import "./index.less";
import { locationHref } from "../../common/utils/routerHistory";
import { StoreShoppingCartContext } from "../shoppingCartPage/context";
import {CompareItem} from "./components/compareItem";

interface IProps {
  history?: any;
}

export const ComparePage: React.FC<IProps> = props => {
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    getCompareInfoList,
    storeShoppingCartContextValue
  } = storeShoppingCartContext;
  const { compareInfoList } = storeShoppingCartContextValue;
  useEffect(() => {
    getCompareInfoList();
  }, [getCompareInfoList]);
  function renderList() {
    return compareInfoList.map((item, index) => {
      if (true && index === 0) {
        return <>
          <CompareItem isTitleLine={true} key={"first"}/>
          <CompareItem key={index}/>
        </>
      } else {
        return <CompareItem key={index}/>
      }
      
    })
  }
  return (
    <div className="compare-page">
      <div className="title-container">
        <h1>Comparison Chart</h1>
      </div>
      <div className="content">
        <ul className="compare-item-list-container">
          {renderList()}
        </ul>
      </div>
      <div
        className="go-back-button"
        onClick={() => {
          locationHref("", "back");
        }}
      >
        <img src={require("./res/arrow_left.svg")} />
        <span>Back to shopping cart</span>
      </div>
    </div>
  );
};
