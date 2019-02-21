import * as React from 'react';
import { inject, observer } from 'mobx-react';
import LayOut from '@/containers/aboutphone/layout';
import ModelItem from '@/containers/aboutphone/components/modelitem';
import './models.less';
import { IModelsProps } from './interface/index.interface';
import { modalPageValidate } from '@/containers/aboutphone/pageValidate';
@inject('yourphone', 'user')
@observer
export default class Models extends React.Component<IModelsProps> {

  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    if (!modalPageValidate()) {
      this.props.history.push('/sell/account');
      return;
    }

    this.props.yourphone.getProductsList();
  }

  public render() {
    const { products } = this.props.yourphone;
    return (
      <div className="page-models-container">
        <LayOut>
          {
            products.length > 0
              ? products.map((phone, index) => (
                <ModelItem
                  key={index}
                  {...phone}
                  onModelItemClick={this.onModelItemClick}
                  activeProductId={this.props.yourphone.activeProductId}
                  activeModelId={this.props.yourphone.activeModelId}
                />
              ))
              : null
          }
        </LayOut>
      </div>
    );
  }

  private onModelItemClick = (productId: number, skuId: number) => {
    try {
      const productInfo = { ...this.props.user.preOrder.productInfo, productId: productId, modelId: skuId }
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        productInfo
      };
    } catch (error) { console.warn(error, 'in models page preOrder') }

    this.props.yourphone.activeProductId = productId;
    this.props.yourphone.activeModelId = skuId;
    this.props.history.push('/sell/yourphone/condition');
  }
}