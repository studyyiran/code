import * as React from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import { Row, Col, Collapse, Form } from "antd";
import {
  IPaymentProps,
  EShipmentType
} from "../../index.interface";
import { shipmentPageValidate } from "../pageValidate";
import config from "config";
import { ChoiceQuestion } from "../../condition/components/renderByType/components/choiceQuestion/index";
import "./index.less";
import { ISelectModelContext, SelectModelContext } from "../../context";

const Panel = Collapse.Panel;
const leftHeader = <div className="fedex-bg" />;
const rightHeader = <div className="USPS-bg" />;

@inject("yourphone", "user", "common")
@observer
class Shipping extends React.Component<IPaymentProps, any> {
  public static contextType = SelectModelContext;
  // 这个state我本来想放到context中。因为一劳永逸。但是对于封闭性不好。所以我先私有化。等以后需要的时候，再做处理
  public readonly state: any = {
    expressFeeList: []
  };

  public componentDidMount() {
    const { selectModelContextValue, getExpressFee } = this
      .context as ISelectModelContext;
    getExpressFee().then((res: any) => {
      if (res) {
        this.setState({
          expressFeeList: res
        });
      }
    });
    if (typeof this.props.onRef === "function") {
      this.props.onRef!(this); // 让done page里获取到这个组件实例，调用其validateData方法
    }
    this.props.yourphone.getNearExpressStores();
  }

  public colLayout(span: number = 11) {
    const isMobile = this.props.common.isMobile;
    return !isMobile ? { span } : {};
  }

  public render() {
    const { selectModelContextValue, getExpressFee } = this
      .context as ISelectModelContext;
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
          Find {this.props.yourphone.FedExNearStores ? "all" : "the closest"}{" "}
          FedEx location
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
          Find {this.props.yourphone.USPSNearStores ? "all" : "the closest"}{" "}
          USPS location
        </a>
      </div>
    );
    const isMobile = this.props.common.isMobile;
    const paymentHTML = (
      <div>
        <RenderQuestion optionsList={this.state.expressFeeList} />
        <Row gutter={30} style={!isMobile ? { paddingTop: "42px" } : {}}>
          <Col {...this.colLayout(12)} className="paypal-col-wrapper">
            <Collapse
              onChange={this.handleCollapseExtend.bind(
                this,
                EShipmentType.FEDEX
              )}
              activeKey={this.props.yourphone.expressCarrier}
              className={classnames({
                active:
                  this.props.yourphone.expressCarrier === EShipmentType.FEDEX
              })}
            >
              <Panel
                header={leftHeader}
                showArrow={false}
                key={EShipmentType.FEDEX}
              >
                {leftContent}
              </Panel>
            </Collapse>
          </Col>
          <Col {...this.colLayout(12)} className="echeck-col-wrapper">
            <Collapse
              onChange={this.handleCollapseExtend.bind(
                this,
                EShipmentType.USPS
              )}
              activeKey={this.props.yourphone.expressCarrier}
              className={classnames({
                active:
                  this.props.yourphone.expressCarrier === EShipmentType.USPS
              })}
            >
              <Panel
                header={rightHeader}
                showArrow={false}
                key={EShipmentType.USPS}
              >
                {rightContent}
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );

    return (
      <div className={"page-payment-container"}>
        {paymentHTML}
        <button
          className="common-button"
          onClick={this.handleNext}
          disabled={!this.props.yourphone.isDoneShipment}
        >
          click me
        </button>
      </div>
    );
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
    // @ts-ignore
    this.props.goNextPage();
  };
}

function RenderQuestion(props: any) {
  const { optionsList } = props;
  // 直接拉接口
  const options = [
    {
      id: "1",
      content: "Use your own box and ship by 8/3/19"
    },
    {
      id: "2",
      content: "Use your own box and ship by 8/8/19"
    },
    {
      id: "3",
      content: "Request a box and ship by 8/14/19"
    }
  ];
  if (optionsList && optionsList.length) {
    return (
      <div className="question">
        <p>Get More cash the faster you ship（Pick your option）</p>
        <ChoiceQuestion
          options={optionsList}
          onChange={(selectId: string) => {
            console.log(selectId);
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default Form.create()(Shipping);
