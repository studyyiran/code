import * as React from 'react';
import { observer } from 'mobx-react';
import './guaranteedprice--mobile.less';
import { IGuaranteedPriceProps } from '../interface/index.interface';
/** 
 * 移动版本，只有报价存在或TBD才会存在这个组件
 */
const GuaranteedPrice: React.SFC<IGuaranteedPriceProps> = observer((props) => {
  if (!props.isTBD && !props.user.isShowLeftPrice) {
    return null;
  }

  return (
    <div className="comp-selllayout-guaranteedprice-mobile-container">
      <div className="content-wrapper">
        <p className="main-title">Guaranteed Price</p>
        {
          props.isTBD
            ? <p className="TBD">TBD</p>
            : <p className="price">{props.price}</p>
        }
      </div>
    </div>
  )
});
export default GuaranteedPrice;