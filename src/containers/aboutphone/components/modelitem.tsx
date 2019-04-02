import * as React from 'react';
import classnames from 'classnames';
import './modelitem.less';
import { IModleItemProps } from '../interface/index.interface';
export default (props: IModleItemProps) => {
  const pricePropertyValues = props.skuPricePropertyNames && props.skuPricePropertyNames.length > 0 && props.skuPricePropertyNames[0]['pricePropertyValues'] !== null && props.skuPricePropertyNames[0]['pricePropertyValues'] ? props.skuPricePropertyNames[0]['pricePropertyValues'] : null;
  const onProductClick = () => {
    if (props.isTBD) {
      props.onGoToTBD();
      return;
    }
    if (!pricePropertyValues) {
      props.onModelItemClick(props.id, props.name, 0, '', props.imageUrl)
    }
  }

  return (
    <div className={classnames('comp-model-item-container', { active: props.activeProductId === props.id })} onClick={onProductClick}>
      {props.isTBD && <span className="tbd-img" />}
      <div className="content-wrapper">
        <p className="title">{props.name}</p>
        <div className="property-wrapper">
          <div className={classnames('left-wrapper', {
            double: pricePropertyValues && pricePropertyValues.length < 5
          })}>
            {
              pricePropertyValues && pricePropertyValues.map((sku, index) => {
                // 取第一个skuPricePropertyNames下的pricePropertyValues数组所有项
                return (
                  <span
                    onClick={props.onModelItemClick.bind(null, props.id, props.name, sku.id, sku.value, props.imageUrl, props)}
                    className={classnames('memory-item', { active: props.id === props.activeProductId && props.activeModelId === sku.id })}
                    key={index}
                  >
                    {sku.value}
                  </span>
                )
              })
            }
          </div>
          <img width="80" height="80" src={props.imageUrl + (props.isTBD ? '' : '?x-oss-process=image/resize,w_150')} />
        </div>
      </div>
    </div>
  )
}