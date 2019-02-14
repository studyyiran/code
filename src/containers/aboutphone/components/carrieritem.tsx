import * as React from 'react';
import classnames from 'classnames';
import './carrieritem.less';
import { ICarrierItemProps } from '../interface/index.interface';

const CarrierItem = (props: ICarrierItemProps) => (
  <div className="comp-carrier-item-container">
    <div className={classnames('img-wrapper', { active: props.activeCarrierName === props.carrier.name })} onClick={props.onCarrierClick.bind(null, props.carrier)}>
      <img src={props.carrier.iconUrl} />
    </div>
    <p className="name">{props.carrier.name}</p>
  </div>
);

export default CarrierItem;