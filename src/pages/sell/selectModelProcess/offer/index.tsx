import React, { useContext } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import { Collapse } from "antd";
const { Panel } = Collapse;

export default function Brand(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch,
    removeFromList,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { priceInfo, userProductList, inquiryKey } = selectModelContextValue;
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
    props.history.push(props.match.url);
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
        subTotal
      } = item;
      return (
        <Panel
          key={productInquiryKey}
          header={
            <div>
              <img />
              <div>
                <span>{productName + bpvIds[0].name}</span>
                <span>{bpvIds[1].name}</span>
              </div>
            </div>
          }
        >
          <ul className="">
            {resultList.length > 1 ? (
              <li
                className="edit-panel-line"
                onClick={() => {
                  debugger
                  removeFromList(productInquiryKey);
                }}
              >
                Remove
              </li>
            ) : null}
            <li className="estimate-line">
              <span>Device Estimate</span>
              <span>{deviceEstimate}</span>
            </li>
            <li>
              <span>10% Service Fee</span>
              <span>{platformFee}</span>
            </li>
            <li>
              <span>3rd Party Seller Fees</span>
              <span>{thirdPartyFee}</span>
            </li>
            <li className="subtotal">
              <span>Subtotal</span>
              <span>{subTotal}</span>
            </li>
          </ul>
        </Panel>
      );
    });
  }
  return (
    <div className="page-offer">
      {resultList && resultList.length ? (
        <Collapse
          expandIconPosition="right"
          expandIcon={panelProps => {
            console.log(panelProps);
            return <div>+</div>;
          }}
          accordion={true}
          onChange={selectHandler}
          defaultActiveKey={inquiryKey}
        >
          {renderList()}
        </Collapse>
      ) : null}
      <section className="payout-container">
        <div>
          <span className="big-font">Total Payout</span>
          <TipsIcon tips={"123"} />
        </div>
        <span className="big-font">{guaranteedPayout}</span>
      </section>
      <div className="button-container">
        <button className="common-button second" onClick={addNewHandler}>
          Add another device
        </button>
        <button className="common-button" onClick={props.goNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

function TipsIcon(props: any) {
  const { tips } = props;
  return <span className="comp-tips">?</span>;
}
