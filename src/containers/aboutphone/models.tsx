import * as React from 'react';
import { inject, observer } from 'mobx-react';
import LayOut from '@/containers/aboutphone/layout';
import ModelItem from '@/containers/aboutphone/components/modelitem';
import './models.less';
import { IModelsProps } from './interface/index.interface';
import { modalPageValidate } from '@/containers/aboutphone/pageValidate';
import Breadcrumb from '@/containers/aboutphone/components/breadcrumb';
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

          <>
            <Breadcrumb
              brandName={this.props.yourphone.activeBrandsName}
              carrierName={this.props.yourphone.activeCarrierName}
            />
            {
              <div>
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
              </div>
            }
          </>
        </LayOut>
      </div>
    );
  }

  private onModelItemClick = (productId: number, productName: string, skuId: number, skuName: string) => {
    try {
      const productInfo = {
        ...this.props.user.preOrder.productInfo,
        productId: productId,
        productName: productName,
        modelId: skuId,
        modelName: skuName
      };

      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        productInfo
      };
    } catch (error) { console.warn(error, 'in models page preOrder') }

    this.props.yourphone.activeProductId = productId;
    this.props.yourphone.activeProductName = productName;
    this.props.yourphone.activeModelId = skuId;
    this.props.yourphone.activeModelName = skuName;
    this.props.history.push('/sell/yourphone/condition');
  }
}