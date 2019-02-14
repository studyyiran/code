import * as React from 'react';
import './conditionitem.less';
export default () => (
  <div className="comp-condition-item-container">
    <div className="left-wrapper">
      <p className="condition">Is the battery dead?</p>
      <p className="detail">A dead battery means that the phone cannot power on the device.</p>
    </div>
    <div className="right-wrapper">
      <span className="option">Turns on</span>
      <span className="option">Turns on</span>
      <span className="option">Turns on</span>
      <span className="option">Turns on</span>
    </div>
  </div>
)