import * as React from 'react';
import './branditem.less';

const BrandItem = () => (
  <div className="comp-brand-item-container">
    <div className="img-wrapper">
      <img src={require('@/images/logo.png')} />
    </div>
    <p className="name">APPLE</p>
  </div>
);

export default BrandItem;