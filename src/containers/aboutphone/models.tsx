import * as React from 'react';
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import LayOut from '@/containers/aboutphone/layout';
import ModelItem from '@/containers/aboutphone/components/modelitem';
import './models.less';
import { IModelsProps } from './interface/index.interface';
import { modalPageValidate } from '@/containers/aboutphone/pageValidate';
import Breadcrumb from '@/containers/aboutphone/components/breadcrumb';
import ProgressBar from '@/containers/aboutphone/components/progressbar--mobile';
@inject('yourphone', 'user', 'common')
@observer
export default class Models extends React.Component<IModelsProps> {
  public readonly state = {
    didMount: false
  }
  public async componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    if (!modalPageValidate()) {
      this.props.history.push('/sell/account');
      return;
    }

    await this.props.yourphone.getProductsList();
    this.setState({
      didMount: true
    })
  }

  public render() {
    const { products } = this.props.yourphone;
    return (
      <div className="page-models-container">
        <LayOut>
          <>
            {
              this.props.common.isMobile && <ProgressBar />
            }
            <Breadcrumb
              brandName={this.props.yourphone.activeBrandsName}
              carrierName={this.props.yourphone.activeCarrierDescription}
            />
            {
              <div className="model-list-wrapper">
                {
                  false && products.length > 0
                    ? products.map((phone, index) => (
                      <ModelItem
                        key={index}
                        {...phone}
                        onModelItemClick={this.onModelItemClick}
                        activeProductId={this.props.yourphone.activeProductId}
                        activeModelId={this.props.yourphone.activeModelId}
                      />
                    ))
                    : null // this.state.didMount && <div>12312312313</div>
                }
                <div className="no-product">
                  <img src={require('@/images/yourphone/no-product.png')} alt="" />
                  <h3>Sorry, the model of your phone has not been found.</h3>
                  <Link to="/"><img src={require('@/images/yourphone/circle-arrow.png')} alt="" />Please input your phone model</Link>
                </div>
              </div>
            }
          </>
        </LayOut>
      </div>
    );
  }

  private onModelItemClick = (productId: number, productName: string, skuId: number, skuName: string, imgUrl: string) => {
    try {
      const productInfo = {
        ...this.props.user.preOrder.productInfo,
        productId: productId,
        productName: productName,
        productImgUrl: imgUrl,
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