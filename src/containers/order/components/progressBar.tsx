import * as React from 'react';
import { IProgressData } from '@/containers/order/interface/order.inerface';
import "./progressBar.less";

interface IDot {
    isActive: boolean;
    isCurrent?: boolean;
}
class Dot extends React.Component<IDot>{
    public render() {
        let cls = this.props.isActive ? "dot dot-active" : "dot";
        let childCls = "child-mark";
        if (this.props.isCurrent) {
            cls = cls + " dot-current";
            childCls = childCls + " child-mark-current";
        }
        return (
            <div className={cls}>
                <div className="dot-icon" />
                {this.props.children && (<div className={childCls}>
                    {this.props.children}
                </div>)}
                {this.props.isCurrent && (
                    <div className="currentMark" />
                )}
            </div>
        );
    }
}

class ProgressBar extends React.Component<{ data: IProgressData }>{
    public render() {
        const props = this.props.data;
        const cls = ["comp-order-progressBar"];
        if (props.currentIndex > 3) {
            cls.push("mobileHideLeft");
        }
        return (
            <div className={cls.join(" ")}>
                {props.dataList.map((t, i) => (
                    <Dot isActive={i < props.currentIndex + 1} key={i} isCurrent={i === props.currentIndex}>
                        {(i === props.currentIndex) && t.img && (
                            <div className="icon">
                                <img src={t.img} alt="" />
                            </div>
                        )}
                        <div className="title">{t.name}</div>
                        {t.date && (<div className="date">{t.date}</div>)}
                    </Dot>
                ))}
            </div>
        );
    }
}

export default ProgressBar;