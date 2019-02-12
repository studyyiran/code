import * as React from 'react';
import ConditionItem from './conditionitem';

import './conditionlist.less';
export default class ConditionList extends React.Component {
  public render() {
    return (
      <>
        <ConditionItem />
        <ConditionItem />
        <ConditionItem />
        <ConditionItem />
        <ConditionItem />
        <ConditionItem />
      </>
    )
  }
}