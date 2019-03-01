import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from '@/containers/aboutphone/layout';
import ConditionItem from '@/containers/aboutphone/components/conditionitem';
import './conditions.less';
import { IConditionsProps } from './interface/index.interface';
import { message } from 'antd';
import { IProductInfo } from '@/store/interface/user.interface';
import { conditionPageValidate } from '@/containers/aboutphone/pageValidate';
import Breadcrumb from '@/containers/aboutphone/components/breadcrumb';
import ProgressBar from '@/containers/aboutphone/components/progressbar--mobile';
@inject('yourphone', 'user', 'common')
@observer
export default class Conditions extends React.Component<IConditionsProps> {
  public state = {
    progress: 3,
    disabled: true
  }
  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    if (!conditionPageValidate()) {
      this.props.history.push('/sell/account');
      return;
    }

    this.props.yourphone.getProductPPVN();

    // 初次进入页面判断是否要高亮
    if (this.props.yourphone.isAllConditionSelected) {
      this.setState({
        progress: 4,
        disabled: false
      })
    }

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
            ? (
              <Layout nextCb={this.handleNext} progress={this.state.progress} disabled={this.state.disabled}>
                <>
                  {
                    this.props.common.isMobile && <ProgressBar />
                  }
                  <Breadcrumb
                    brandName={this.props.yourphone.activeBrandsName}
                    carrierName={this.props.yourphone.activeCarrierDescription}
                    modelName={`${this.props.yourphone.activeProductName} ${this.props.yourphone.activeModelName}`}
                  />
                  {conditionList}
                </>
              </Layout>
            )
            : (conditionList)
        }
      </div>
    )
  }

  private onConditionItemClick = (conditionId: number, ppvnValueId: number) => {
    this.props.yourphone.activeConditions = { ...this.props.yourphone.activeConditions, [conditionId]: ppvnValueId };
    if (this.props.yourphone.isAllConditionSelected) {
      this.setState({
        progress: 4,
        disabled: false
      })
    }
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