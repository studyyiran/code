import React, { useContext } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import Svg from "components/svg";
import TipsIcon from "pages/sell/selectModelProcess/components/tipsIcon";
import { Collapse } from "antd";
import { currencyTrans } from "utils/util";
import { Tabs } from "components/tabs";
import Tag from "components/tag";
const { Panel } = Collapse;

export default function Brand(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch,
    removeFromList,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const {
    priceInfo,
    userProductList,
    inquiryKey,
    productsList
  } = selectModelContextValue;
  const { resultList, guaranteedPayout } = priceInfo;
  function selectHandler(id: any) {
    // 当前有选择
    const currentTarget = userProductList.find((item: any) => {
      return item.inquiryKey === id;
    });
    if (id) {
      selectModelContextDispatch({
        type: "changeModelCache",
        value: currentTarget
      });
    } else {
      selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    }
  }
  // 添加新机型
  function addNewHandler() {
    selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    props.history.push(props.route.path);
  }
  function renderList() {
    return resultList.map((item: any, index: number) => {
      const {
        brandName,
        productName,
        bpvIds,
        qpvIds,
        inquiryKey: productInquiryKey,
        deviceEstimate,
        platformFee,
        thirdPartyFee,
        brandId,
        productId,
        subTotal,
        productPhoto
      } = item;
      // 不需要自己组织数据的教训.因为数据出不来
      // const modelInfo = {
      //   modelId: productId,
      //   othersAttr: {}
      // };
      // bpvIds.forEach(({ id, ppId }: any) => {
      //   modelInfo.othersAttr[ppId] = id;
      // });
      // const nameObj = getNameInfo({
      //   brandId,
      //   ...modelInfo
      // });
      return (
        <Panel
          key={productInquiryKey}
          header={
            <div className="panel-header">
              <img className="phone-image" src={productPhoto} />
              <div className="phone-model">
                <span>{productName}</span>
                <span>
                  {bpvIds.map((attr: any) => {
                    return <span key={attr}>{` ${attr.name} `}</span>;
                  })}
                </span>
              </div>
            </div>
          }
        >
          <ul className="li-container">
            {resultList.length > 1 ? (
              <li
                className="edit-panel-line canclick"
                onClick={() => {
                  removeFromList(productInquiryKey);
                }}
              >
                Remove
              </li>
            ) : null}
            <li className="estimate-line">
              <span>Device Estimate</span>
              <div>
                <span>{currencyTrans(deviceEstimate)}</span>
              </div>
            </li>
            <li className="service-fee-line">
              <span>10% Service Fee</span>
              <div className="tag-container">
                <Tag status="fail">Limited time offer</Tag>
                <div className="slash-container">
                  <span>-{currencyTrans(platformFee)}</span>
                </div>
              </div>
            </li>
            <li className="seller-fee-line">
              <span>3rd Party Seller Fees</span>
              <div className="tag-container">
                <Tag status="fail">Limited time offer</Tag>
                <div className="slash-container">
                  <span>-{currencyTrans(thirdPartyFee)}</span>
                </div>
              </div>
            </li>
            <li className="subtotal">
              <span>Subtotal</span>
              <span>{currencyTrans(subTotal)}</span>
            </li>
          </ul>
        </Panel>
      );
    });
  }
  return (
    <div className="page-offer">
      <div className="padding-container">
        <div className="product-container">
          {resultList && resultList.length ? (
            <Collapse
              expandIconPosition="right"
              expandIcon={panelProps => {
                return (
                  <div className="circle-tag">
                    {panelProps.isActive ? (
                      <Svg icon="jian" />
                    ) : (
                      <Svg icon="jia" />
                    )}
                  </div>
                );
              }}
              accordion={true}
              onChange={selectHandler}
              defaultActiveKey={inquiryKey}
            >
              {renderList()}
            </Collapse>
          ) : null}
        </div>
        <section className="payout-container">
          <div>
            <span className="big-font">Total Payout</span>
            <TipsIcon>
              We will pay out this amount within 1-2 business day(s) once we
              receive and inspect the device(s) in your order.{" "}
            </TipsIcon>
          </div>
          <span className="big-font">{currencyTrans(guaranteedPayout)}</span>
        </section>
      </div>
      <div className="risk-container">
        <section className="risk">
          <h3>Zero Risk & Free Retuns</h3>
          <p>
            If you change your mind after shipping your phone, we even ship it
            back to you for free!
          </p>
        </section>
      </div>
      <div className="buttons-container">
        <button className="common-button second" onClick={addNewHandler}>
          Add another device
        </button>
        <button
          className="common-button"
          onClick={() => {
            selectModelContextDispatch({
              type: "changeModelCache",
              value: "reset"
            });
            props.goNextPage();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
