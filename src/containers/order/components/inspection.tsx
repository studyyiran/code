import React from "react";
import { IOrderProps } from "@/containers/order/interface/order.inerface";
import "./inspection.less";
import Tag from "@/components/tag";
import TipsIcon from "@/pages/sell/selectModelProcess/components/tipsIcon";
import CheckInspectDiff from "../container/components/checkInspectDiff";
import { Modal, Form, Input, Button, message } from "antd";
import ReportModalContent from "@/containers/order/container/components/reportModalContent";
import InspectPart from "@/containers/order/container/components/inspectPart";
import ResultPart from "@/containers/order/container/components/resultPart";
const { TextArea } = Input;

const priceUnit = "$";

export default function InspectionWrapper(props: any) {
  const {
    inquiryInfo,
    postEmailForm,
    subOrderNo,
    revisedPriceConfirm,
    revisedPriceReject,
    phoneConditionQuestion,
    subOrderStatus,
    paymentInfo
  } = props;
  function postEmailFormHandler(data: any) {
    postEmailForm({
      subOrderNo,
      ...data
    });
  }
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  // subOrderStatus 用于确认接受差异的状态
  return (
    <Inspection
      paymentInfo={paymentInfo}
      subOrderStatus={subOrderStatus}
      inquiryInfo={{
        isDifferent: isDifferent,
        differentReason,
        price: revised.amount,
        revised,
        submitted
      }}
      phoneConditionQuestion={phoneConditionQuestion}
      postEmailFormHandler={postEmailFormHandler}
      revisedPriceConfirm={() => {
        revisedPriceConfirm({
          subOrderNo
        });
      }}
      revisedPriceReject={() => {
        revisedPriceReject({
          subOrderNo
        });
      }}
    />
  );
}
class Inspection extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  public handleApprove = () => {
    this.props.order.approveRevisedPrice();
  };
  public handleReturnProduct = () => {
    this.props.order.returnProduct();
  };
  public render() {
    const {
      postEmailFormHandler,
      revisedPriceConfirm,
      revisedPriceReject,
      phoneConditionQuestion,
      inquiryInfo,
      subOrderStatus,
      paymentInfo
    } = this.props;
    const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
    const price = revised ? revised.amount : submitted.amount;
    const that = this;
    // 是否match
    function renderByType() {
      const Header: any = () => (
        <section className="line-with-title content-tag-container">
          <h3>Inspection Result</h3>
          <Tag status={isDifferent ? "fail" : "success"}>
            {differentReason || "Matched"}
          </Tag>
        </section>
      );
      if (!isDifferent) {
        return (
          <>
            <Header />
            <section>
              <ul className="information-list">
                <li className="price-view">
                  <span>Subtotal</span>
                  <span data-matched={isDifferent ? "false" : "true"}>
                    {priceUnit}
                    {price}
                  </span>
                </li>
                <li>
                  <span>Congratulations!</span>
                  <span>
                    The condition you selected matches our inspection result.
                  </span>
                </li>
              </ul>
            </section>
          </>
        );
      } else {
        if (subOrderStatus === "TO_BE_LISTED") {
          return (
            <InspectPart
              inquiryInfo={inquiryInfo}
              phoneConditionQuestion={phoneConditionQuestion}
            />
          );
        } else {
          return (
            <>
              <Header />
              <div className="content-container">
                <section className="revised-part">
                  <div className="revised-line">
                    <h3>Your revised offer is</h3>
                    <div>
                      <span>
                        {priceUnit}
                        {price}
                      </span>
                    </div>
                  </div>
                  {that.renderAcceptLine({
                    postEmailFormHandler,
                    revisedPriceConfirm,
                    revisedPriceReject
                  })}
                </section>
                <section className="video-part">
                  <p>
                    We had to revise your offer based on the following results
                    during our inspection process
                  </p>
                </section>
                <CheckInspectDiff
                  phoneConditionQuestion={phoneConditionQuestion}
                  inquiryInfo={inquiryInfo}
                />
                {/*视频不要删除*/}
                {/*<section className="video-part">*/}
                {/*  <p>*/}
                {/*    We had to revise your offer based on the following results*/}
                {/*    during our inspection process*/}
                {/*  </p>*/}
                {/*  <video className="comp-video" />*/}
                {/*  <CheckInspectDiff*/}
                {/*    phoneConditionQuestion={phoneConditionQuestion}*/}
                {/*    inquiryInfo={inquiryInfo}*/}
                {/*  />*/}
                {/*  <div className="mb-ele">*/}
                {/*    {this.renderAcceptLine({*/}
                {/*      postEmailFormHandler,*/}
                {/*      revisedPriceConfirm,*/}
                {/*      revisedPriceReject*/}
                {/*    })}*/}
                {/*  </div>*/}
                {/*</section>*/}
              </div>
            </>
          );
        }
      }
    }
    return (
      <div className="page-difference">
        <ResultPart {...inquiryInfo} {...paymentInfo} />
        {renderByType()}
      </div>
    );
  }
  private setModalHandler = (showModal: boolean) => {
    this.setState({
      showModal
    });
  };
  private renderAcceptLine = (props: any) => {
    const that = this;
    const {
      postEmailFormHandler,
      revisedPriceConfirm,
      revisedPriceReject
    } = props;
    function SubmitForm(formProps: any) {
      function handleSubmit(e: any) {
        e.preventDefault();
        formProps.form.validateFields((err: any, values: any) => {
          if (!err && values) {
            postEmailFormHandler(values);
            // 这里缺少一个状态的判断
            message.success("Succeed to send");
            that.setModalHandler(false);
          }
        });
      }
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Subject">
            {formProps.form.getFieldDecorator("subject", {
              rules: [{ required: true, message: "Please input your question" }]
            })(<Input placeholder="Please input your question" />)}
          </Form.Item>
          <Form.Item label="Message">
            {formProps.form.getFieldDecorator("content", {
              rules: [{ required: true, message: "Please input your question" }]
            })(<TextArea placeholder="Please input your question" />)}
          </Form.Item>
          <button className="common-button button-centered">Submit</button>
        </Form>
      );
    }
    const WrappedForm = Form.create({
      name: "horizontal_login"
    })(SubmitForm);
    return (
      <div className="accept-line">
        <button className="common-button" onClick={revisedPriceConfirm}>
          Accept
        </button>
        <div className="tips">
          <span
            className="canclick"
            onClick={this.setModalHandler.bind(this, true)}
          >{`< Return Device`}</span>
          <TipsIcon>
            When an offer is rejected, we will ship the phone back to you on our
            dime.
          </TipsIcon>
        </div>
        <Modal
          className="page-difference-modal"
          title="Have questions? Send us a message."
          visible={this.state.showModal}
          onCancel={this.setModalHandler.bind(this, false)}
          footer={null}
        >
          <WrappedForm />
          <span
            className="canclick button-centered"
            onClick={() => {
              this.setModalHandler(false);
              revisedPriceReject();
            }}
          >
            Initiate Device Return
          </span>
        </Modal>
      </div>
    );
  };
}

// export default Inspection;
