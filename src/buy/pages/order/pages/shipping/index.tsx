import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes
} from "../../context";
import { Checkbox } from "antd";
import { currencyTrans } from "../../../../common/utils/util";
import { nameToContent } from "../../util";
export default function Shipping(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    orderInfoContextDispatch
  } = orderInfoContext as IOrderInfoContext;
  const { expressInfo, userExpress } = orderInfoContextValue;
  const [currentUserExpress, setCurrentUserExpress] = useState(
    userExpress || ""
  );

  useEffect(() => {
    if (!currentUserExpress && expressInfo && expressInfo.length) {
      setCurrentUserExpress(expressInfo[0].token);
    }
  }, [expressInfo]);

  const [formError, setError] = useState("");
  function handleNext() {
    checkForm();
    if (currentUserExpress) {
      orderInfoContextDispatch({
        type: orderInfoReducerTypes.setUserExpress,
        value: currentUserExpress
      });
      return true;
    } else {
      return false;
    }
  }

  function checkForm() {
    const errorContent = "error";
    if (currentUserExpress) {
      setError("");
    } else {
      setError(errorContent);
    }
  }
  return (
    <div className="shipping-select">
      <h2 className="order-common-less-title">Shipping method</h2>
      <div className="checkbox-container-group">
        {expressInfo.map((item: any) => {
          const { token, totalFee, name } = item;
          return (
            <div className="checkbox-container" key={token}>
              <Checkbox
                checked={String(currentUserExpress) === String(token)}
                onChange={() => {
                  checkForm();
                  setCurrentUserExpress(token);
                }}
              >
                <span>{nameToContent(token)}</span>
              </Checkbox>
              <span>{currencyTrans(totalFee, "Free")}</span>
            </div>
          );
        })}
      </div>
      {formError ? <span>{formError}</span> : null}
      {props.renderButton(handleNext)}
    </div>
  );
}
