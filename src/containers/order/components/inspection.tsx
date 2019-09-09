import React from "react";
import { IOrderProps } from "@/containers/order/interface/order.inerface";
import "./inspection.less";
import Tag from "@/components/tag";
import TipsIcon from "@/pages/sell/selectModelProcess/components/tipsIcon";
import CheckInspectDiff from "../container/components/checkInspectDiff";
import { Modal, Form, Input, Button } from "antd";
import { getIdFromAllQuestion } from "@/pages/sell/selectModelProcess/condition/util";
const { TextArea } = Input;

const priceUnit = "$";
function renderModel(props: any) {
  const { inquiryInfo, phoneConditionQuestion } = props;
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  function RenderItem(itemProps: any) {
    const { title, value, isSame } = itemProps;
    return (
      <li>
        <span>{isSame ? "same" : "not same"}</span>
        <span>{title}</span>
        <span>{value}</span>
      </li>
    );
  }
  const { brandName, displayName, pricePns, productPns } = revised;
  function checkIsSame(attrKey: string) {
    return revised[revised] === brandName[revised];
  }
  function checkSameFromArr(targetId: string, attrKey: string) {
    let isSame = false;
    if (
      submitted &&
      submitted[attrKey] &&
      submitted[attrKey].find(
        ({ id: submitAttrValueId }: any) =>
          submitAttrValueId === targetId
      )
    ) {
      isSame = true;
    }
    return isSame;
  }
  return (
    <div>
      <h2>Inspection Report</h2>
      <span>{differentReason}</span>
      <ul>
        <RenderItem
          title="Phone adasda"
          value={brandName}
          isSame={checkIsSame("brandId")}
        />
        <RenderItem
          title="Model"
          value={displayName}
          isSame={checkIsSame("productId")}
        />
        <RenderItem title="Model" value={1} />
        {productPns.map(({ name, ppnName, id }: any) => (
          <RenderItem
            title={ppnName}
            value={name}
            isSame={checkSameFromArr(id, "pricePns")}
          />
        ))}
        {pricePns.map(({ id, type, name }: any, index: number) => {
          const { answerId } = getIdFromAllQuestion(phoneConditionQuestion, id);
          let currentQuestion: any;
          phoneConditionQuestion.find((parent: any) => {
            const { subQuestionArr } = parent;
            return subQuestionArr.find((subQuestion: any) => {
              const { id: subQuestionId, content } = subQuestion;
              if (subQuestionId === answerId) {
                currentQuestion = subQuestion;
                return true;
              } else {
                return false;
              }
              return;
            });
          });
          return (
            <RenderItem
              isSame={checkSameFromArr(id, "pricePns")}
              key={index}
              title={currentQuestion && currentQuestion.content}
              value={name}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default function InspectionWrapper(props: any) {
  const {
    inquiryInfo,
    postEmailForm,
    subOrderNo,
    revisedPriceConfirm,
    revisedPriceReject,
    phoneConditionQuestion
  } = props;
  function postEmailFormHandler(data: any) {
    postEmailForm({
      subOrderNo,
      ...data
    });
  }
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  const innerProps = {
    order: {
      inquiryInfo: {
        isDifferent: isDifferent,
        differentReason,
        price: revised ? revised.amount : submitted.amount
      }
    }
  };
  return renderModel({
    phoneConditionQuestion,
    inquiryInfo
  });
  return (
    <Inspection
      {...innerProps}
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
      revisedPriceReject
    } = this.props;
    const { inquiryInfo } = this.props.order;
    const { isDifferent, differentReason, price } = inquiryInfo;

    // 是否match
    return (
      <div className="page-difference">
        <section className="line-with-title">
          <h3>Inspection Result</h3>
          <Tag status={isDifferent ? "fail" : "success"}>
            {differentReason || "Matched"}
          </Tag>
        </section>
        {!isDifferent && (
          <section>
            <ul className="information-list">
              <li className="price-view">
                <span>Price Guarantee</span>
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
        )}
        {isDifferent && (
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
              {this.renderAcceptLine({
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
              <video className="comp-video" />
              <CheckInspectDiff />
              <div className="mb-ele">
                {this.renderAcceptLine({
                  postEmailFormHandler,
                  revisedPriceConfirm,
                  revisedPriceReject
                })}
              </div>
            </section>
          </div>
        )}
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
            that.setModalHandler(false);
          }
        });
      }
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {formProps.form.getFieldDecorator("subject", {
              rules: [{ required: true, message: "Please input your question" }]
            })(<Input placeholder="Please input your question" />)}
          </Form.Item>
          <Form.Item>
            {formProps.form.getFieldDecorator("content", {
              rules: [{ required: true, message: "Please input your question" }]
            })(<TextArea placeholder="Please input your question" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          {/*<label>123123</label>*/}
          {/*<TextArea />*/}
          {/*<label>123123</label>*/}
          {/*<Form.Item>*/}
          {/*  <Button className="common-button" type="primary" htmlType="submit">*/}
          {/*    Log in*/}
          {/*  </Button>*/}
          {/*</Form.Item>*/}
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
            onClick={this.setModalHandler.bind(this, true)}
          >{`< Return Device`}</span>
          <TipsIcon />
        </div>
        <Modal
          title="Have questions? Send us a message."
          visible={this.state.showModal}
          onCancel={this.setModalHandler.bind(this, false)}
          footer={null}
        >
          <WrappedForm />
          <button
            className="common-button"
            onClick={() => {
              this.setModalHandler(false);
              revisedPriceReject();
            }}
          >
            Initiate Device Return
          </button>
        </Modal>
      </div>
    );
  };
}

// export default Inspection;
