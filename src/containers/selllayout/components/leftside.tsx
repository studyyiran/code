import * as React from 'react';
import classnames from 'classnames';
import './leftside.less';
import { ILeftSideState } from '../interface/index.interface';
export default class LeftSide extends React.Component<{ stepIndex: number }, ILeftSideState> {

  public readonly state = {
    steps: [
      {
        main: 'About You',
        sub: 'How to get in touch'
      },
      {
        main: 'About Your Phone',
        sub: 'Model and Condition'
      },
      {
        main: 'Shipping Address',
        sub: 'We send you a shipping label'
      },
      {
        main: 'Your Payment',
        sub: 'Where we send your money'
      },
      {
        main: 'You’re Done',
        sub: 'Now to ship it'
      }
    ]
  }
  public render() {
    return (
      <div className="comp-sellayout-leftside-container">
        {
          this.state.steps.map((step, index) => (
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