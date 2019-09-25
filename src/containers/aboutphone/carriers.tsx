import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IBrandsProps, ICarrier } from './interface/index.interface';
import LayOut from '@/containers/aboutphone/layout';
import CarrierItem from '@/containers/aboutphone/components/carrieritem';
import './carriers.less';
import Breadcrumb from './components/breadcrumb';
import ProgressBar from '@/containers/aboutphone/components/progressbar--mobile';
import config from '@/config';

@inject('yourphone', 'user', 'common')
@observer
export default class Brands extends React.Component<IBrandsProps> {

  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;

    this.props.yourphone.getCarrier();
  }

  public render() {
    const { carriers, activeCarrierName } = this.props.yourphone;
    return (
      <div className="page-carriers-container">
        <LayOut>
          <>
            {
              this.props.common.isMobile && <ProgressBar />
            }
            <Breadcrumb
              brandName={this.props.yourphone.activeBrandsName}
            />
            <div className="carrier-list-wrapper">
              {
                carriers.map((carrier, index) => <CarrierItem key={index} carrier={carrier} activeCarrierName={activeCarrierName} onCarrierClick={this.onCarrierItemClick} />)
              }
            </div>
          </>
        </LayOut>
      </div>
    );
  }

  private onCarrierItemClick = (carrier: ICarrier) => {
    try {
      // const productInfo = { ...this.props.user.preOrder.productInfo, carrier: carrier.name }
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        productInfo: {
          brandId: this.props.yourphone.activeBrandsId,
          brandName: this.props.yourphone.activeBrandsName,
          carrier: carrier.name,
          carrierDescription: carrier.description
        }
      };
    } catch (error) { console.warn(error, 'in carriers page updatePreorder') }


    this.props.yourphone.activeCarrierName = carrier.name;
    this.props.yourphone.activeCarrierDescription = carrier.description;

    if (this.props.yourphone.activeBrandsId === config.DEFAULT.otherBrandsId) {
      // this.props.history.push('/sell/yourphone/other');
      return;
    }
    // this.props.history.push('/sell/yourphone/model');
  }
}