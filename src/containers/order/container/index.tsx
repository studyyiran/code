import React, { useContext, useEffect } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import { ITotalOrderInfoContext, TotalOrderInfoContext } from "./context";
import Svg from "@/components/svg";

function CollapseWithPanelList(props: {
  onChange: (s: string) => void;
  defaultActiveKey?: string;
  list: any[];
}) {
  const { onChange, defaultActiveKey, list } = props;
  return (
    <div className="comp-collapse-panel-list">
      <Collapse
        expandIconPosition="right"
        expandIcon={panelProps => {
          return (
            <div className="circle-tag">
              {panelProps.isActive ? <Svg icon="jian" /> : <Svg icon="jia" />}
            </div>
          );
        }}
        accordion={true}
        onChange={onChange}
        defaultActiveKey={defaultActiveKey}
      >
        {list.map((item: any) => {
          const { header, children, key } = item;
          return (
            <Panel header={header} key={key}>
              {children}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export class OrderContainerWrapper extends React.Component<any, any> {
  public render() {
    return <div>123123</div>;
    // return <OrderContainer {...this.props} />;
  }
}

function OrderContainer(props: any) {
  // 监听
  const totalOrderInfoContext = useContext(TotalOrderInfoContext);
  // 获取
  const {
    totalOrderInfoContextValue,
    getAjax
  } = totalOrderInfoContext as ITotalOrderInfoContext;
  // 获取
  const { totalOrderInfo } = totalOrderInfoContextValue;
  console.log(totalOrderInfo);

  // effect请求
  useEffect(() => {
    getAjax();
  }, []);
  // 方法
  function selectHandler(key: string) {
    // 当前有选择
    // const currentTarget = userProductList.find((item: any) => {
    //   return item.inquiryKey === id;
    // });
    // if (id) {
    //   selectModelContextDispatch({
    //     type: "changeModelCache",
    //     value: currentTarget
    //   });
    // } else {
    //   selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    // }
  }
  // 渲染
  if (totalOrderInfo.groupOrderNo) {
    return totalOrderInfo.groupOrderNo;
  } else {
    return null;
  }
  return (
    <CollapseWithPanelList
      onChange={selectHandler}
      list={[]}
      defaultActiveKey={""}
    />
  );
}
