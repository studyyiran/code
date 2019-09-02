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
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { priceList, userProductList, inquiryKey } = selectModelContextValue;
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
  function renderList() {
    return priceList.map((item: any, index: number) => {
      const { brandName, productName, bpvIds, qpvIds, inquiryKey: productInquiryKey, subTotal } = item;
      // const nameObj = getNameInfo({
      //       //   brandId,
      //       //   ...modelInfo
      //       // });
      return (
        <Panel
          key={productInquiryKey}
          header={
            <div>
              {brandName}
              <span>
                {productName + bpvIds[0].name}
              </span>
              <span>{bpvIds[1].name}</span>
            </div>
          }
        >
          <li
            className="brand-icon-container"
            onClick={() => selectHandler(item)}
          >
            <span>{subTotal}</span>
          </li>
        </Panel>
      );
    });
  }
  // 添加新机型
  function addNewHandler() {
    selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    props.history.push(props.match.url);
  }
  return (
    <div className="page-offer">
      <Collapse
        accordion={true}
        onChange={selectHandler}
        defaultActiveKey={inquiryKey}
      >
        {renderList()}
      </Collapse>
      <div onClick={addNewHandler}>add another</div>
      <div onClick={props.goNextPage}>next page</div>
    </div>
  );
}
