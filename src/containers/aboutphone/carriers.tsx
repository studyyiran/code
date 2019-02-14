import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IBrandsProps, ICarrier } from './interface/index.interface';
import LayOut from '@/containers/aboutphone/layout';
import CarrierItem from '@/containers/aboutphone/components/carrieritem';
import './carriers.less';

@inject('yourphone')
@observer
export default class Brands extends React.Component<IBrandsProps> {

  public componentDidMount() {
    this.props.yourphone.getCarrier();
  }

  public render() {
    const { carriers, activeCarrierName } = this.props.yourphone;
    return (
      <div className="page-carriers-container">
        <LayOut>
          {
            carriers.map((carrier, index) => <CarrierItem key={index} carrier={carrier} activeCarrierName={activeCarrierName} onCarrierClick={this.onCarrierItemClick} />)
          }
        </LayOut>
      </div>
    );
  }

  private onCarrierItemClick = (carrier: ICarrier) => {
    this.props.history.push('/sell/yourphone/model');
  }
}