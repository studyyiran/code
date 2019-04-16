import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from '@/containers/aboutphone/layout';
import ConditionItem from '@/containers/aboutphone/components/conditionitem';
import './conditions.less';
import { IConditionsProps, ISubSkuPricePropertyValues } from './interface/index.interface';
import { message } from 'antd';
import { IProductInfo } from '@/store/interface/user.interface';
import { conditionPageValidate, noteUserModal } from '@/containers/aboutphone/pageValidate';
import Breadcrumb from '@/containers/aboutphone/components/breadcrumb';
import ProgressBar from '@/containers/aboutphone/components/progressbar--mobile';
import classnames from 'classnames';

const TBDPPNS = [
  { "id": 316, "name": "Can your phone power on to the Home screen?", "isSkuProperty": false, "pricePropertyValues": [{ "id": 2026, "propertyName": 316, "value": "Turns on", "isPreferred": true, "isSkuProperty": false }, { "id": 2027, "propertyName": 316, "value": "Doesn't turn on", "isPreferred": false, "isSkuProperty": false }], "illustrationContent": null },
  { "id": 345, "name": "Is your phone 100% functional?", "isSkuProperty": false, "pricePropertyValues": [{ "id": 2104, "propertyName": 345, "value": "Fully functional", "isPreferred": true, "isSkuProperty": false }, { "id": 2105, "propertyName": 345, "value": "Have functional problems", "isPreferred": false, "isSkuProperty": false }], "illustrationContent": null },
  { "id": 351, "name": "Is your display cracked?", "isSkuProperty": false, "pricePropertyValues": [{ "id": 2118, "propertyName": 351, "value": "No Cracks", "isPreferred": true, "isSkuProperty": false }, { "id": 2122, "propertyName": 351, "value": "Cracked", "isPreferred": false, "isSkuProperty": false }], "illustrationContent": null }
]

@inject('yourphone', 'user', 'common')
@observer
export default class Conditions extends React.Component<IConditionsProps> {
  public state = {
    progress: 3,
    disabled: true
  }
  public async componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    if (!conditionPageValidate()) {
      this.props.history.push('/sell/yourphone/brand');
      return;
    }
    // tbd 赛默认选项
    if (this.props.yourphone.isTBD) {
      this.props.yourphone.productPPVNS = TBDPPNS;
    } else {
      // 非 tbd 调用正常的询价项
      await this.props.yourphone.getProductPPVN();
    }

    // 初次进入页面判断是否要高亮
    if (this.props.yourphone.isAllConditionSelected) {
      this.setState({
        progress: 4,
        // disabled: false
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
      <div className={classnames('page-conditions-container', { 'notlayout': this.props.hideLayout })}>
        {
          !this.props.hideLayout
            ? (
              <Layout nextCb={this.handleNext} progress={this.state.progress} disabled={!this.props.yourphone.isAllConditionSelected}>
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
        // disabled: false
      })
    }
  }

  private handleNext = async () => {
    if (this.props.yourphone.isTBD) {
      this.props.yourphone.tbdInfo.properties = [];
      Object.keys(this.props.yourphone.activeConditions).forEach((key: string) => {
        const ppn = TBDPPNS.find(v => v.id.toString() === key);
        let ppv: ISubSkuPricePropertyValues | null = null;
        console.log(ppn)
        if (ppn) {
          ppv = ppn.pricePropertyValues.find(v => v.id === this.props.yourphone.activeConditions[key]) || null;
        }
        console.log(ppv)
        if (ppv) {
          this.props.yourphone.tbdInfo.properties.push(ppv.value);
        }
      })
      this.props.history.push('/sell/yourphone/shipping');
      return;
    }
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

      let path = '/sell/yourphone/shipping'
      if (this.props.user.preOrder.appendOrderDetail) {
        path = '/sell/yourphone/done'
      }
      // 询价成功，提示用户，有保证金的存在，只存在于PC，因为移动端价格面板在最上面啦
      if (!this.props.common.isMobile) {
        console.log(this.props.yourphone.inquiryDetail)
        noteUserModal({
          title: 'Your UpTrade Offer',
          content: (<>Your {this.props.yourphone.inquiryDetail!.product.name} Guaranteed Price is ${this.props.yourphone.inquiryDetail!.priceDollar} <br /> <br />This window will be closed after 15 seconds.</>),
          type: 'success',
          seconds: 15,
          update: (seconds) => (<>Your {this.props.yourphone.inquiryDetail!.product.name} Guaranteed Price is ${this.props.yourphone.inquiryDetail!.priceDollar} <br /> <br />This window will be closed after {seconds} seconds.</>),
          customerOk: () => this.props.history.push(path)
        });
      } else {
        this.props.history.push(path);
      }

    }
  }
}