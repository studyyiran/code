import * as React from 'react';
import {  IChangeModalProps, EChangeType } from '../interface/index.interface';
import './changemodal.less';
import { Button } from 'antd';
const titleCollect = {
  [EChangeType.SHIPPING]: {
    main: 'Change Your Information',
  },
  [EChangeType.PAYMENT]: {
    main: 'Change Your Payment',
  },
  [EChangeType.CONDITION]: {
    main: 'Change Condition of Your Phone',
    sub: 'Quotation might be revised if the conditions are changed'
  }
};

const ChangeModal: React.SFC<IChangeModalProps> = (props) => (
  <div className="comp-aboutyourphone-changemodal-container" style={{height: props.type === 'payment' ? '608px' : '800px'}}>
    <div className="header-wrapper">
      <p className="main-title">{titleCollect[props.type]['main']}</p>
      {
        titleCollect[props.type]['sub'] && <p className="sub-title">Quotation might be revised if the conditions are changed</p>
      }
    </div>
    <div className="body-wrapper">
      {props.children}
    </div>
    <div className="footer-wrapper">
      <Button className="save-btn" type="primary" onClick={props.onSave} size='large'>SAVE</Button>
    </div>
  </div>
);

export default ChangeModal;