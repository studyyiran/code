import * as React from 'react';
import './guaranteedprice.less';
import { IGuaranteedPriceProps } from '../interface/index.interface';
const GuaranteedPrice: React.SFC<IGuaranteedPriceProps> = (props) => (
  <div className="comp-selllayout-guaranteedprice-container">
    <p className="main-title">Guaranteed Price</p>
    {
      props.isTBD
      ? <p className="price TBD">TBD</p>
      : <p className="price">{typeof props.price === 'number' ? props.price : '- - -'}</p>
    }
  </div>
);

export default GuaranteedPrice;