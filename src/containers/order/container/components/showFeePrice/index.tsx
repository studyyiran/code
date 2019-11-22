import React, { useContext } from "react";
import "./index.less";
import { ITotalOrderInfoContext, TotalOrderInfoContext } from "../../context";
import { currencyTrans } from "../../../../../utils/util";

export function ShowFeePrice(props: { containInsuranceFee?: boolean }) {
  const { containInsuranceFee } = props;
  // 监听
  const totalOrderInfoContext = useContext(TotalOrderInfoContext);
  // 获取
  const {
    totalOrderInfoContextValue
  } = totalOrderInfoContext as ITotalOrderInfoContext;
  // 获取
  const { totalOrderInfo } = totalOrderInfoContextValue;
  const { chargedInsurance, insuranceFee } = totalOrderInfo as any;
  // 没付款和付款的纠纷
  if (!chargedInsurance && insuranceFee) {
    return (
      <p className="fee-red-tips">
        *Your shipping insurance {currencyTrans(insuranceFee)} will be charged
        at your 1st payout
      </p>
    );
  } else if (chargedInsurance && containInsuranceFee) {
    return (
      <p className="fee-red-tips">
        *Shipping insurance {currencyTrans(insuranceFee)} is charged
      </p>
    );
  }
  return null;
}
