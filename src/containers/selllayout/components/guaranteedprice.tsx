import * as React from 'react';
import { observer } from 'mobx-react';
import './guaranteedprice.less';
import { IGuaranteedPriceProps } from '../interface/index.interface';
/** 
 * 模块价格的显示，配置高于一切，来控制在shpping前的一切页面，都不显示价格
 * @param {boolean} isBeforeShipping
 */
const GuaranteedPrice: React.SFC<IGuaranteedPriceProps> = observer((props: IGuaranteedPriceProps) => {
  let priceHTML: React.ReactNode;
  const { isTBD, isBeforeShipping, price } = props;

  if (isBeforeShipping) {
    priceHTML = <p className="price">- - -</p>;
  } else {
    priceHTML = isTBD ? <p className="TBD">TBD</p> : <p className="price">{typeof price === 'number' ? price : '- - -'}</p>;
  }
  
  if (props.user.isShowLeftPrice) {
    return (
      <div className="comp-selllayout-guaranteedprice-container">
        <p className="main-title">Guaranteed Price</p>
        {priceHTML}
      </div>
    )
  }

  return null;
});
export default GuaranteedPrice;