import * as React from 'react';
import DEFALUT from '@/config/defalut.config'
import classnames from 'classnames';
import './branditem.less';
import { IBrandsItemProps } from '../interface/index.interface';
import TBDBrandImg from '@/images/yourphone/TBD--brand.png';
const BrandItem = (props: IBrandsItemProps) => (
  <div className="comp-brand-item-container">
    <div className={classnames('img-wrapper', { active: props.activeBrandsId === props.brand.id })} onClick={props.onBrandClick.bind(null, props.brand)}>
      <img src={props.brand.id === DEFALUT.otherBrandsId ? TBDBrandImg : props.brand.iconUrl} />
    </div>
    <p className="name">{props.brand.name}</p>
  </div>
);

export default BrandItem;