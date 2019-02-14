import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from '@/containers/aboutphone/layout';
import ConditionItem from '@/containers/aboutphone/components/conditionitem';
import './conditions.less';
@inject('yourphone')
@observer
export default class Conditions extends React.Component {
  public render() {
    return (
      <div className="page-conditions-container">
        <Layout nextPath='/sell/yourphone/shipping'>
          <>
            <ConditionItem />
            <ConditionItem />
          </>
        </Layout>
      </div>
    )
  }
}