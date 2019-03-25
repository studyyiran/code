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
import { DEFAULT } from 'config'
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

    if (this.props.yourphone.activeBrandsId === DEFAULT.otherBrandsId && this.props.yourphone.oldActiveBrandsId) {
      this.props.yourphone.activeBrandsId = this.props.yourphone.oldActiveBrandsId;
      this.props.yourphone.oldActiveBrandsId = 0;
    }

    await this.props.yourphone.getProductsList();
    // 掉完机型列表，强行塞一个other 进去
    this.props.yourphone.products.push({
      brandId: DEFAULT.otherBrandsId,
      categoryId: 0,
      id: 0,
      imageUrl: require('@/images/noprice.png'),
      name: 'Other',
      skuPricePropertyNames: [],
      activeModelId: 0,
      activeProductId: 0,
      isTBD: true
    })

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
                  products.length > 0
                    ? products.map((phone, index) => (
                      <ModelItem
                        key={index}
                        {...phone}
                        onModelItemClick={this.onModelItemClick}
                        onGoToTBD={this.onModelItemClickToTBD}
                        activeProductId={this.props.yourphone.activeProductId}
                        activeModelId={this.props.yourphone.activeModelId}
                      />
                    ))
                    : this.state.didMount && <div className="no-product">
                      <img src={require('@/images/yourphone/no-product.png')} alt="" />
                      <h3>Sorry, the model of your phone has not been found.</h3>
                      <Link to="/sell/yourphone/other"><img src={require('@/images/yourphone/circle-arrow.png')} alt="" />Please input your phone model</Link>
                    </div>
                }
              </div>
            }
          </>
        </LayOut>
      </div>
    );
  }

  private onModelItemClickToTBD = () => {
    this.props.user.preOrder.productInfo = {
      ...this.props.user.preOrder.productInfo,
      brandId: DEFAULT.otherBrandsId,
      brandName: 'Other'
    }
    this.props.yourphone.oldActiveBrandsId = this.props.yourphone.activeBrandsId;
    this.props.yourphone.activeBrandsId = DEFAULT.otherBrandsId;
    this.props.yourphone.activeBrandsName = DEFAULT.otherBrandsName;
    this.props.history.push('/sell/yourphone/other')
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
    // this.props.yourphone.activeBrandsId = props.brandId,
    this.props.yourphone.activeProductId = productId;
    this.props.yourphone.activeProductName = productName;
    this.props.yourphone.activeModelId = skuId;
    this.props.yourphone.activeModelName = skuName;
    this.props.history.push('/sell/yourphone/condition');
  }
}