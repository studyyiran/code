import React, { useContext, useState } from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import { Row, Col, Collapse, Form, Checkbox } from "antd";
import { IPaymentProps, EShipmentType, EPayType } from "../../index.interface";
import { shipmentPageValidate } from "../pageValidate";
import config from "config/index";
import moment from "moment";
import { ChoiceQuestion } from "../../condition/components/renderByType/components/choiceQuestion/index";
import "./index.less";
import { ISelectModelContext, SelectModelContext } from "../../context";
import { addDate } from "utils";
import ButtonGroup from "pages/sell/selectModelProcess/components/buttonGroup";
import PriceTitle from "pages/sell/selectModelProcess/components/priceTitle";
import TipsIcon from "pages/sell/selectModelProcess/components/tipsIcon";
import { currencyTrans, safeEqual } from "utils/util";
import "../../../common.less";

const Panel = Collapse.Panel;

function ShippingContainer(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextDispatch
  } = selectModelContext as ISelectModelContext;
  function handler(value: any) {
    selectModelContextDispatch({
      type: "setExpressOption",
      value
    });
  }

  return (
    <Shipping
      {...props}
      selectModelContext={selectModelContext}
      onPushSelectOption={handler}
    />
  );
}

@inject("yourphone", "user", "common")
@observer
class Shipping extends React.Component<any, any> {
  // 这个state我本来想放到context中。因为一劳永逸。但是对于封闭性不好。所以我先私有化。等以后需要的时候，再做处理
  public readonly state: any = {
    expressFeeList: [],
    currentSelect: 0
  };

  public componentDidMount() {
    const { getExpressFee, selectModelContextValue } = this.props
      .selectModelContext as ISelectModelContext;
    const { expressOption } = selectModelContextValue;
    getExpressFee().then((res: any) => {
      if (res) {
        this.setState({
          expressFeeList: res,
          currentSelect: this.getCurrentIndex(res, expressOption)
            ? this.getCurrentIndex(res, expressOption)
            : this.state.currentSelect
        });
      }
    });
    if (typeof this.props.onRef === "function") {
      this.props.onRef!(this); // 让done page里获取到这个组件实例，调用其validateData方法
    }
    this.props.yourphone.getNearExpressStores();
    // TODO 呵呵呵
    if (!this.props.yourphone.expressCarrier) {
      this.props.yourphone.expressCarrier = EShipmentType.USPS;
    }
  }

  public colLayout(span: number = 11) {
    const isMobile = this.props.common.isMobile;
    return !isMobile ? { span } : {};
  }

  public render() {
    const { selectModelContextDispatch, selectModelContextValue } = this.props
      .selectModelContext as ISelectModelContext;
    const { priceInfo, needInsurance } = selectModelContextValue;
    const { shippingInsurance } = priceInfo;
    const leftContent = (
      <div className="left-wrapper">
        {this.props.yourphone.FedExNearStores && (
          <>
            <p className="description">The closest FedEx location is:</p>
            <p className="address">
              <p className="title">
                {this.props.yourphone.FedExNearStores.name}
              </p>
              <p className="title">
                {this.props.yourphone.FedExNearStores.vicinity}
              </p>
            </p>
          </>
        )}
        <a
          target="_blank"
          className="difference"
          href={config.DEFAULT.FedExUrl}
        >
          Check nearby locations
        </a>
      </div>
    );
    const rightContent = (
      <div className="right-wrapper">
        <p className="description">
          You can leave your package in your mailbox or find the closest
          location
        </p>
        {this.props.yourphone.USPSNearStores && (
          <>
            <p className="address">
              <p className="title">
                {this.props.yourphone.USPSNearStores.name}
              </p>
              <p className="title">
                {this.props.yourphone.USPSNearStores.vicinity}
              </p>
            </p>
          </>
        )}
        <a target="_blank" className="difference" href={config.DEFAULT.USPSUrl}>
          Check nearby locations
        </a>
      </div>
    );
    const isMobile = this.props.common.isMobile;
    return (
      <div className="page-shipping-container">
        <PriceTitle>The faster you ship, the more you get paid</PriceTitle>
        <RenderQuestion
          onChange={(value: string) => {
            this.setState({
              currentSelect: value
            });
          }}
          currentSelect={this.state.currentSelect}
          optionsList={this.state.expressFeeList}
        />
        <h3>Choose your carrier</h3>
        <div className="choose-container">
          <div
            className="container-border"
            data-selected={
              this.props.yourphone.expressCarrier === EShipmentType.USPS
            }
            onClick={this.handleCollapseExtend.bind(this, EShipmentType.USPS)}
          >
            <div className="USPS-bg" />
            {rightContent}
          </div>
          <div
            className="container-border"
            data-selected={
              this.props.yourphone.expressCarrier === EShipmentType.FEDEX
            }
            onClick={this.handleCollapseExtend.bind(this, EShipmentType.FEDEX)}
          >
            <div className="fedex-bg" />
            {leftContent}
          </div>
        </div>
        {/*<Row gutter={30} >*/}
        {/*  <Col {...this.colLayout(12)} className="paypal-col-wrapper">*/}
        {/*    */}
        {/*  </Col>*/}
        {/*  <Col {...this.colLayout(12)} className="echeck-col-wrapper">*/}
        {/*    */}
        {/*  </Col>*/}
        {/*</Row>*/}
        {shippingInsurance ? (
          <div className="check-box-container">
            <Checkbox
              checked={needInsurance}
              onChange={e => {
                selectModelContextDispatch({
                  type: "setNeedInsurance",
                  value: e.target.checked
                });
              }}
            >
              <span className="insurance-tips">
                Add shipping insurance for {currencyTrans(shippingInsurance)}
              </span>
            </Checkbox>
            <TipsIcon>
              <p>
                This amount will be deducted from your payout. <br />
                We recommend to add shipping insurance for phone <br />
                that values more than $100.
              </p>
            </TipsIcon>
          </div>
        ) : null}
        <ButtonGroup
          {...this.props}
          handleNext={this.handleNext}
          disabled={!this.props.yourphone.isDoneShipment}
        />
      </div>
    );
  }

  private getCurrentIndex(list: any, expressOption: any) {
    let target = 0;
    if (expressOption && expressOption.sendDateType) {
      target = list.findIndex((item: any) => {
        return safeEqual(item.sendDateType, expressOption.sendDateType);
      });
    }
    return target === -1 ? 0 : target;
  }

  // 选中并展开当前的。
  private handleCollapseExtend = (type: string) => {
    if (this.props.yourphone.expressCarrier === type) {
      this.props.yourphone.expressCarrier = "";
      return;
    }

    this.props.yourphone.expressCarrier = type;
  };

  private handleNext = async () => {
    try {
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        expressCarrier: this.props.yourphone.expressCarrier
      };
    } catch (error) {
      console.warn(error, "in payment page preOrder");
    }
    this.props.onPushSelectOption(
      this.state.expressFeeList[this.state.currentSelect]
    );
    // @ts-ignore
    this.props.goNextPage();
  };
}

function RenderQuestion(props: any) {
  const { currentSelect, onChange, optionsList } = props;
  // 直接拉接口
  const options = [
    {
      time: 3,
      content: "Use your own box and ship by "
    },
    {
      time: 7,
      content: "Use your own box and ship by "
    },
    {
      time: 14,
      content: "Send me a box; I will ship by "
    }
  ];
  let afterCalcList: any[] = [];
  if (optionsList && optionsList.length) {
    if (optionsList.length === 1) {
      afterCalcList = afterCalcList.concat([
        {
          ...options[1],
          ...optionsList[0]
        }
      ]);
    } else {
      afterCalcList = options.map((item, index) => ({
        ...item,
        ...optionsList[index]
      }));
    }
  }
  if (afterCalcList && afterCalcList.length) {
    return (
      <div className="question">
        <ChoiceQuestion
          value={
            afterCalcList[currentSelect]
              ? afterCalcList[currentSelect].sendDateType
              : ""
          }
          options={afterCalcList}
          onChange={(value: any) => {
            onChange(
              afterCalcList.findIndex((item: any) => {
                return safeEqual(item.sendDateType, value.sendDateType);
              })
            );
          }}
          render={(index: any) => {
            if (afterCalcList && afterCalcList.length === 3 && index < 3) {
              if (index === 0) {
                return (
                  <div className="recommended comp-top-tag">Recommended</div>
                );
              } else {
                return (
                  <div className="comp-top-tag">
                    -${afterCalcList[index].fee}
                  </div>
                );
              }
            } else {
              return null;
            }
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default Form.create()(ShippingContainer);
