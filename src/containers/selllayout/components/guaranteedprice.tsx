import * as React from 'react';
import './guaranteedprice.less';
import { IGuaranteedPriceProps } from '../interface/index.interface';
const GuaranteedPrice: React.FunctionComponent<IGuaranteedPriceProps> = (props) => (
  <div className="comp-selllayout-guaranteedprice-container">
    <p className="main-title">Guaranteed Price</p>
    <p className="price">{typeof props.price === 'number' ? props.price : '- - -'}</p>
  </div>
);

export default GuaranteedPrice;