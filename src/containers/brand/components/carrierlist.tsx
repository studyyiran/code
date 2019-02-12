import * as React from 'react';
import CarrierItem from './carrieritem';

import './carrierlist.less';
export default class BrandList extends React.Component {
  public render() {
    return (
      <>
        <CarrierItem />
        <CarrierItem />
        <CarrierItem />
        <CarrierItem />
      </>
    )
  }
}