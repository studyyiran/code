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
    bpvDispalyName,
    buyPrice,
    bpvDisplayName,
    buyLevel,
    needProtection,
    setNeedProtection,
    buyProductBQV,
    subOrderInfo
  } = props;
  function calc() {
    if (
      bpvDispalyName &&
      bpvDispalyName.split(",") &&
      bpvDispalyName.split(",").length > 2
    ) {
      return [
        {
          bpName: "Storage",
          bpSort: "1",
          bpvName: bpvDispalyName.split(",")[0],
          tag: ""
        },
        {
          bpName: "Carrier",
          bpSort: "2",
          bpvName: bpvDispalyName.split(",")[1],
          tag: "QUICKFILTERBUY"
        },
        {
          bpName: "Color",
          bpSort: "3",
          bpvName: bpvDispalyName.split(",").slice(2).join(" "),
          tag: "ISCOLOR"
        }
      ];
    } else {
      return productDisplayName;
    }
  }
  const [lineOne, lineTwo] = getDescArr(calc(), productDisplayName);
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
        {setNeedProtection ? (
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
        ) : null}
      </ul>
    </div>
  );
}
