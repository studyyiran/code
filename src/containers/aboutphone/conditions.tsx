import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from '@/containers/aboutphone/layout';
import ConditionItem from '@/containers/aboutphone/components/conditionitem';
import './conditions.less';
import { IConditionsProps } from './interface/index.interface';

import { message } from 'antd';
import { IProductInfo } from '@/store/interface/user.interface';
@inject('yourphone', 'user')
@observer
export default class Conditions extends React.Component<IConditionsProps> {

  public componentDidMount() {
    this.props.yourphone.getProductPPVN();
    // done页面，允许父组件调用里面的方法
    if (typeof this.props.onRef === 'function') {
      this.props.onRef!(this);
    }
  }

  public validateData = (): Promise<boolean> => {
    return new Promise(async (resolve) => {
      const yourphone = this.props.yourphone

      if (!yourphone.isAllConditionSelected) {
        message.info('Please make sure you have chosen all of items.');
        resolve(false);
      }

      const isInquiryKeyCreated = await this.props.yourphone.createInquiry();
      resolve(isInquiryKeyCreated);
    });
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
            ? <Layout nextCb={this.handleNext} >{conditionList}</Layout>
            : (conditionList)
        }
      </div>
    )
  }

  private onConditionItemClick = (conditionId: number, ppvnValueId: number) => {
    this.props.yourphone.activeConditions = { ...this.props.yourphone.activeConditions, [conditionId]: ppvnValueId };
  }

  private handleNext = async () => {
    const isInquiryKeyCreated = await this.validateData();

    if (isInquiryKeyCreated) {
      try {
        const productInfo: Partial<IProductInfo> = {
          ...this.props.user.preOrder.productInfo,
          priceUnits: [...Object.values(this.props.yourphone.activeConditions), this.props.yourphone.activeModelId],
        }
        this.props.user.preOrder = {
          ...this.props.user.preOrder,
          inquiryKey: this.props.yourphone.inquiryKey,
          productInfo
        };
      } catch (error) { console.warn(error, 'in conditions page preOrder') }

      this.props.history.push('/sell/yourphone/shipping');
    }
  }
}