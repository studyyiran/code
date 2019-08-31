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
  const { priceList, userProductList, stamp } = selectModelContextValue;
  function selectHandler(id: any) {
    // 当前有选择
    const currentTarget = userProductList.find((item: any) => {
      return item.stamp === id;
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
    return userProductList
      .sort((a: any, b: any) => {
        return 1;
        // return a.order - b.order;
      })
      .map((item: any, index: number) => {
        const { brand: brandId, stamp: productStamp, modelInfo } = item;
        const nameObj = getNameInfo({
          brandId,
          ...modelInfo
        });
        return (
          <Panel
            key={productStamp}
            header={
              <div>
                {nameObj.modelInfoName.modelName +
                  nameObj.modelInfoName.storageName}
                <span>
                  {nameObj.modelInfoName.modelName +
                    nameObj.modelInfoName.storageName}
                </span>
                <span>{nameObj.modelInfoName.carrierName}</span>
              </div>
            }
          >
            <li
              className="brand-icon-container"
              onClick={() => selectHandler(item)}
            >
              <span>{priceList[index] && priceList[index].price}</span>
            </li>
          </Panel>
        );
      });
  }
  function addNewHandler() {
    selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    props.history.push(props.match.url);
  }
  return (
    <div className="page-offer">
      <Collapse
        accordion={true}
        onChange={selectHandler}
        defaultActiveKey={stamp}
      >
        {renderList()}
      </Collapse>
      <div onClick={addNewHandler}>add another</div>
    </div>
  );
}
