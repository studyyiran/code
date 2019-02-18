import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from '@/containers/aboutphone/layout';
import ConditionItem from '@/containers/aboutphone/components/conditionitem';
import './conditions.less';
import { IConditionsProps } from './interface/index.interface';
@inject('yourphone')
@observer
export default class Conditions extends React.Component<IConditionsProps> {

  public componentDidMount() {
    this.props.yourphone.getProductPPVN();
  }

  public render() {

    const conditionList: React.ReactNode = (
      this.props.yourphone.productPPVNS.map((ppvn, index) => (
        <ConditionItem
          key={index}
          {...ppvn}
          activeConditions={this.props.yourphone.activeConditions}
          onConditionItemClick={this.onConditionItemClick}
        />
      ))
    );

    return (
      <div className="page-conditions-container">
        {
          !this.props.hideLayout
            ? <Layout nextPath={this.props.yourphone.isAllConditionSelected ? '/sell/yourphone/shipping' : ''}>{conditionList}</Layout>
            : (conditionList)
        }

      </div>
    )
  }

  private onConditionItemClick = (conditionId: number, ppvnValueId: number) => {
    console.log(conditionId, ppvnValueId);
    this.props.yourphone.activeConditions = { ...this.props.yourphone.activeConditions, [conditionId]: ppvnValueId };
  }
}