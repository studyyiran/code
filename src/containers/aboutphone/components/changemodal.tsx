import * as React from 'react';
import {  IChangeModalProps, EChangeType } from '../interface/index.interface';
import './changemodal.less';
import { Button } from 'antd';

const ChangeModal: React.SFC<IChangeModalProps> = (props) => (
  <div className="comp-aboutyourphone-changemodal-container">
    {/*<h3>{titleCollect[props.type]['main']}</h3>*/}
    <div className="body-wrapper">
      {props.children}
    </div>
    <button className="common-button" onClick={props.onSave}>SAVE</button>
  </div>
);

export default ChangeModal;