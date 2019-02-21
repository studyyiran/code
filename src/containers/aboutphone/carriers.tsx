import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IBrandsProps, ICarrier } from './interface/index.interface';
import LayOut from '@/containers/aboutphone/layout';
import CarrierItem from '@/containers/aboutphone/components/carrieritem';
import './carriers.less';
import { userEmailValidate } from '@/containers/aboutphone/pageValidate';
import Breadcrumb from './components/breadcrumb';

@inject('yourphone', 'user')
@observer
export default class Brands extends React.Component<IBrandsProps> {

  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    // 检验是否获取到页面需要到必须数据
    if (!userEmailValidate()) {
      this.props.history.push('/sell/account');
      return;
    }

    this.props.yourphone.getCarrier();
  }

  public render() {
    const { carriers, activeCarrierName } = this.props.yourphone;
    return (
      <div className="page-carriers-container">
        <LayOut>
          <>
            <Breadcrumb
              style={{ marginLeft: '15px' }}
              brandName={this.props.yourphone.activeBrandsName}
            />
            {
              carriers.map((carrier, index) => <CarrierItem key={index} carrier={carrier} activeCarrierName={activeCarrierName} onCarrierClick={this.onCarrierItemClick} />)
            }
          </>
        </LayOut>
      </div>
    );
  }

  private onCarrierItemClick = (carrier: ICarrier) => {
    console.log(carrier, 'inin');
    try {
      // const productInfo = { ...this.props.user.preOrder.productInfo, carrier: carrier.name }
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        productInfo: {
          brandId: this.props.yourphone.activeBrandsId,
          brandName: this.props.yourphone.activeBrandsName,
          carrier: carrier.name
        }
      };
    } catch (error) { console.warn(error, 'in carriers page updatePreorder') }


    this.props.yourphone.activeCarrierName = carrier.name;
    this.props.history.push('/sell/yourphone/model');
  }
}