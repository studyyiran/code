import * as React from 'react';
import classnames from 'classnames';
import './modelitem.less';
import { IProductModel, ISubSkuPricePropertyValues } from '../interface/index.interface';
export default (props: IProductModel) => (
  <div className={classnames('comp-model-item-container', { active: props.activeProductId === props.id })}>
    <p className="title">{props.name}</p>
    <div className="property-wrapper">
      <div className="left-wrapper">
        {
          props.skuPricePropertyNames.map((sku, index) => {
            // 取每个skuPricePropertyNames下的pricePropertyValues数组中的第一个项
            if (sku.pricePropertyValues === null) { // 测试环境的肮脏数据
              return null;
            }
            if (!sku.pricePropertyValues.length) {
              return null;
            }
            const firstPPV: ISubSkuPricePropertyValues = sku.pricePropertyValues[0];
            return (
              <span
                onClick={props.onModelItemClick.bind(null, props.id, firstPPV.id)}
                className={classnames('memory-item', { active: props.id === props.activeProductId && props.activeModelId === firstPPV.id })}
                key={index}
              >
                {firstPPV.value}
              </span>
            )
          })
        }
      </div>
      <img width="80" height="80" src={props.imageUrl} />
    </div>
  </div>
)