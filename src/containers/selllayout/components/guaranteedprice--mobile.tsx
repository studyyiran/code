import * as React from 'react';
import { observer } from 'mobx-react';
import './guaranteedprice--mobile.less';
import { IGuaranteedPriceProps } from '../interface/index.interface';
/** 
 * 移动版本，只有报价存在或TBD才会存在这个组件
 * 非shipping页面都不显示
 */
const GuaranteedPrice: React.SFC<IGuaranteedPriceProps> = observer((props: IGuaranteedPriceProps) => {
  if (!props.isBeforeShipping) {
    return null;
  }

  let priceHTML: React.ReactNode;
  priceHTML = props.isTBD ? <p className="TBD">TBD</p> : <p className="price">{props.price}</p>

  return (
    <div className="comp-selllayout-guaranteedprice-mobile-container">
      <div className="content-wrapper">
        <p className="main-title">Guaranteed Price</p>
        {priceHTML}
      </div>
    </div>
  )
});
export default GuaranteedPrice;