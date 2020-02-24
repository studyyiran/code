import React, { useContext, useEffect } from "react";
import "./index.less";
import {locationHref} from "../../common/utils/routerHistory";
import {StoreShoppingCartContext} from "../shoppingCartPage/context";

interface IProps {
  history?: any
}

export const ComparePage: React.FC<IProps> = props => {
  
  return (
    <div className="shopping-cart-page">
      <div className="title-container">
        <h1>Comparison Chart</h1>
      </div>
      <div className="go-back-button" onClick={() => {locationHref('', 'back')}}>
        <img src={require("./res/arrow_left.svg")} />
        <span>Go Back</span>
      </div>
    </div>
  );
};
