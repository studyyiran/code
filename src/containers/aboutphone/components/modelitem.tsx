import * as React from 'react';
import classnames from 'classnames';
import './modelitem.less';
import { IProductModel } from '../interface/index.interface';
export default (props: IProductModel) => (
  <div className={classnames('comp-model-item-container', { active: props.activeProductId === props.id })}>
    <p className="title">{props.name}</p>
    <div className="property-wrapper">
      <div className="left-wrapper">
        {
          props.skuPricePropertyValues.map((sku, index) => (<span className={classnames('memory-item', { active: props.activeModelId === sku.id })} key={index}>{sku.name}</span>))
        }
      </div>
      <img width="80" height="80" src={props.image} />
    </div>
  </div>
)