import * as React from 'react';
import { observer } from 'mobx-react';
import './guaranteedprice--mobile.less';
import { IGuaranteedPriceProps } from '../interface/index.interface';
/** 
 * 移动版本，只有报价存在才会存在这个组件
 */
const GuaranteedPrice: React.SFC<IGuaranteedPriceProps> = observer((props) => {
  if (props.user.isShowLeftPrice && props.price === 'number') {
    return (
      <div className="comp-selllayout-guaranteedprice-mobile-container">
        <p className="main-title">Guaranteed Price</p>
        {
          props.isTBD
            ? <p className="TBD">TBD</p>
            : <p className="price">{props.price}</p>
        }
      </div>
    )
  }

  return null;
});
export default GuaranteedPrice;