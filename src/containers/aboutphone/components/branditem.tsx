import * as React from 'react';
import classnames from 'classnames';
import './branditem.less';
import { IBrandsItemProps } from '../interface/index.interface';

const BrandItem = (props: IBrandsItemProps) => (
  <div className="comp-brand-item-container">
    <div className={classnames('img-wrapper', { active: props.activeBrandsId === props.brand.id })} onClick={props.onBrandClick.bind(null, props.brand)}>
      <img src={props.brand.iconUrl} />
    </div>
    <p className="name">{props.brand.name}</p>
  </div>
);

export default BrandItem;