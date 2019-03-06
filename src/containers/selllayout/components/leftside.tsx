import * as React from 'react';
import classnames from 'classnames';
import { PC, MOBILE } from '@/config/progress.config';
import './leftside.less';
import { ILeftSideState } from '../interface/index.interface';
export default class LeftSide extends React.Component<{ stepIndex: number, isMobile: boolean; }, ILeftSideState> {
  public static readonly displayName: string = '步骤组件';
  public readonly state = {
    steps: []
  }
  public render() {
    const steps: ILeftSideState['steps'] = this.props.isMobile ? MOBILE : PC;
    return (
      <div className="comp-sellayout-leftside-container">
        {
          steps.map((step, index) => (
            <div className="step" key={index}>
              <p className={classnames('main-content', { active: index === this.props.stepIndex, done: index < this.props.stepIndex })}>{step.main}</p>
              <p className="sub-content">{step.sub}</p>
            </div>
          ))
        }
      </div>
    )
  }
}