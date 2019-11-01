import * as React from "react";
import { IProgressData } from "../../../interface/order.inerface";
import "./index.less";
import { useContext } from "react";
import {
  GlobalSettingContext,
  IGlobalSettingContext
} from "../../../../../context";
import { safeEqual } from "../../../../../common/utils/util";
import Svg from "../../../../../components/svg";

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
        <Svg icon="dot" className="dot-icon" />
        {this.props.children && (
          <div className={childCls}>{this.props.children}</div>
        )}
        {this.props.isCurrent && <div className="currentMark" />}
      </div>
    );
  }
}

export default function ProgressBar(props: any) {
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  const propsData = props.data as IProgressData;
  const cls = ["comp-order-progressBar"];
  //
  let showList = propsData.dataList;
  if (isMobile) {
    const count = showList.length > 2 ? 3 : showList.length;
    let start;
    if (propsData.currentIndex === 0) {
      start = 0;
    } else if (propsData.currentIndex === propsData.dataList.length - 1) {
      start = propsData.dataList.length - count;
    } else {
      start = propsData.currentIndex - 1;
    }
    return (
      <div className={cls.join(" ")}>
        {showList
          .map((t, i) => {
            const isCurrent = safeEqual(propsData.currentIndex, i);
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
          })
          .slice(start, start + count)}
      </div>
    );
  } else {
    return (
      <div className={cls.join(" ")}>
        {showList.map((t, i) => {
          const isCurrent = safeEqual(propsData.currentIndex, i);
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
