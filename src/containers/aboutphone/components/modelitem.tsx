import * as React from 'react';
import './modelitem.less';
export default () => (
  <div className="comp-model-item-container">
    <p className="title">iPhone XS MAX</p>
    <div className="property-wrapper">
      <div className="left-wrapper">
        <span className="memory-item">16GB</span>
        <span className="memory-item">16GB</span>
        <span className="memory-item">16GB</span>
        <span className="memory-item">16GB</span>
      </div>
      <img width="80" height="80" src={require('@/images/noprice.png')} />
    </div>
  </div>
)