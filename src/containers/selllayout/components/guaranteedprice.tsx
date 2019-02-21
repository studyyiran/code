import * as React from 'react';
import { observer } from 'mobx-react';
import './guaranteedprice.less';
import { IGuaranteedPriceProps } from '../interface/index.interface';
const GuaranteedPrice: React.SFC<IGuaranteedPriceProps> = observer((props) => {
  console.log(props)
  if (props.user.isShowLeftPrice) {
    return (
      <div className="comp-selllayout-guaranteedprice-container">
        <p className="main-title">Guaranteed Price</p>
        {
          props.isTBD
            ? <p className="TBD">TBD</p>
            : <p className="price">{typeof props.price === 'number' ? props.price : '- - -'}</p>
        }
      </div>
    )
  }

  return null;
});
export default GuaranteedPrice;