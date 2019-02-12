import * as React from 'react';
import ModelItem from './modelitem';

import './modellist.less';
export default class BrandList extends React.Component {
  public render() {
    return (
      <>
        <ModelItem />
        <ModelItem />
        <ModelItem />
        <ModelItem />
        <ModelItem />
      </>
    )
  }
}