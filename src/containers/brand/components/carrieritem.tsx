import * as React from 'react';
import './carrieritem.less';

const CarrierItem = () => (
  <div className="comp-carrier-item-container">
    <div className="img-wrapper">
      <img src={require('@/images/logo.png')} />
    </div>
    <p className="name">APPLE</p>
  </div>
);

export default CarrierItem;