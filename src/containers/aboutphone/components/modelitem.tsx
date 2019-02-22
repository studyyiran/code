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
          props.skuPricePropertyNames && props.skuPricePropertyNames.length > 0 &&
          props.skuPricePropertyNames[0]['pricePropertyValues'] !== null && // 测试环境的肮脏数据
          props.skuPricePropertyNames[0]['pricePropertyValues'].map((sku, index) => {
            // 取第一个skuPricePropertyNames下的pricePropertyValues数组所有项
            return (
              <span
                onClick={props.onModelItemClick.bind(null, props.id, props.name, sku.id, sku.value)}
                className={classnames('memory-item', { active: props.id === props.activeProductId && props.activeModelId === sku.id })}
                key={index}
              >
                {sku.value}
              </span>
            )
          })
        }
      </div>
      <img width="80" height="80" src={props.imageUrl} />
    </div>
  </div>
)