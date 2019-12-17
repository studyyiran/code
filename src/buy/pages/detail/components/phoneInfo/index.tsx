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
这是显示商品价格信息的组件。
他可以显示三种 机子 配件 甚至还有保险的渲染
 */
export default function PhoneInfo(props: {
  productDisplayName: string,
  buyProductBQV: string,
  buyPrice: any,
  bpvDisplayName: string,
  buyLevel: string,
  isPeiJian: boolean,
  needProtection: boolean,
  setNeedProtection: any,
}) {
  const {
    productDisplayName,
    buyProductBQV,
    buyPrice,
    bpvDisplayName,
    buyLevel,
    isPeiJian,
    needProtection,
    setNeedProtection,
  } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
  const productImg = useGetProductImg(props);
  return (
    <div className="phone-info">
      <InnerDivImage imgUrl={productImg} lazyload={false} />
      <ul className="info-list">
        <li className="price-container">
          <h3>{lineOne}</h3>
          <span>{currencyTrans(buyPrice)}</span>
        </li>
        <li className="bpv-name">{lineTwo}</li>
        <li className="bpv-name">{bpvDisplayName}</li>
        <li className="level">Condition {buyLevel}</li>
        {/*{setNeedProtection ? (*/}
        {/*  <li className="checkbox-protection">*/}
        {/*    <div>*/}
        {/*      <div className="icon-container">*/}
        {/*        <Checkbox*/}
        {/*          checked={needProtection}*/}
        {/*          onChange={e => {*/}
        {/*            setNeedProtection(e.target.checked);*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          <span>Add UpTrade Protection</span>*/}
        {/*        </Checkbox>*/}
        {/*        <div>*/}
        {/*          <TipsIcon>{TipsProtection}</TipsIcon>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <span className="strong">*/}
        {/*        {currencyTrans(protectPrice)}*/}
        {/*        {staticContentConfig.perMonth}*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*  </li>*/}
        {/*) : null}*/}
      </ul>
    </div>
  );
}
