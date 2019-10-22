import {
  currencyTrans,
  staticContentConfig
} from "../../../../common/utils/util";
import React from "react";
import { Checkbox } from "antd";
import TipsIcon from "../../../../components/tipsIcon";
import { protectPrice } from "../../../../common/config/staticConst";
import "./index.less";
import { getDescArr, useGetProductImg } from "../../util";
import { TipsProtection } from "../../context/staticData";
import { InnerDivImage } from "../innerDivImage";
/*
这是显示商品价格信息的组件。并且可以修改是否需要protect
 */
export default function PhoneInfo(props: any) {
  const {
    buyProductImgPc,
    productDisplayName,
    buyPrice,
    bpvDisplayName,
    buyLevel,
    needProtection,
    setNeedProtection,
    buyProductBQV,
    subOrderInfo
  } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
  const productImg = useGetProductImg(props);
  return (
    <div className="phone-info">
      <InnerDivImage imgUrl={productImg} />
      <ul className="info-list">
        <li className="price-container">
          <h3>{lineOne}</h3>
          <span>{currencyTrans(buyPrice)}</span>
        </li>
        <li className="bpv-name">{lineTwo}</li>
        <li className="bpv-name">{bpvDisplayName}</li>
        <li className="level">Condition {buyLevel}</li>
        <li className="checkbox-protection">
          <div>
            <div className="icon-container">
              <Checkbox
                checked={needProtection}
                onChange={e => {
                  setNeedProtection(e.target.checked);
                }}
              >
                <span>Add UpTrade Protection</span>
              </Checkbox>
              <div>
                <TipsIcon>{TipsProtection}</TipsIcon>
              </div>
            </div>
            <span className="strong">
              {currencyTrans(protectPrice)}
              {staticContentConfig.perMonth}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}