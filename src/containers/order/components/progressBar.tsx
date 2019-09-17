import * as React from "react";
import { IProgressData } from "@/containers/order/interface/order.inerface";
import "./progressBar.less";
import { inject, observer } from "mobx-react";

interface IDot {
  isActive: boolean;
  isCurrent?: boolean;
}
class Dot extends React.Component<IDot> {
  public render() {
    let cls = this.props.isActive ? "dot dot-active" : "dot";
    let childCls = "child-mark";
    if (this.props.isCurrent) {
      cls = cls + " dot-current";
      childCls = childCls + " child-mark-current" + " current";
    }
    return (
      <div className={cls}>
        <div className="dot-icon" />
        {this.props.children && (
          <div className={childCls}>{this.props.children}</div>
        )}
        {this.props.isCurrent && <div className="currentMark" />}
      </div>
    );
  }
}

@inject("common")
@observer
class ProgressBar extends React.Component<{
  data: IProgressData;
  common?: any;
}> {
  public render() {
    const { isMobile } = this.props.common;
    const props = this.props.data;
    const cls = ["comp-order-progressBar"];
    //
    let showList = props.dataList;
    if (isMobile) {
      const count = 3;
      let start;
      if (props.currentIndex === 0) {
        start = 0;
      } else if (props.currentIndex === props.dataList.length - 1) {
        start = props.dataList.length - 3;
      } else {
        start = props.currentIndex - 1;
      }
      showList = props.dataList.slice(start, start + count);
    }
    return (
      <div className={cls.join(" ")}>
        {showList.map((t, i) => {
          const isCurrent = t.name === props.dataList[props.currentIndex].name;
          return (
            <Dot isActive={true} key={i} isCurrent={isCurrent}>
              {isCurrent && t.img && (
                <div className="icon">
                  <img src={t.img} alt="" />
                </div>
              )}
              <div className="title">{t.name}</div>
              {t.date && <div className="date">{t.date}</div>}
            </Dot>
          );
        })}
      </div>
    );
  }
}

export default ProgressBar;
