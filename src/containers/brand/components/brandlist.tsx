import * as React from 'react';
import BrandItem from './branditem';

import './brandlist.less';
export default class BrandList extends React.Component {
  public render() {
    return (
      <>
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
      </>
    )
  }
}