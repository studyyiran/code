import * as React from 'react';
import './leftside.less';
import { ILeftSideState } from '../interface/index.interface';
export default class LeftSide extends React.Component<object, ILeftSideState> {

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
        main: 'We send you a shipping label',
        sub: 'Where we send your money'
      }, 
      {
        main : 'Where we send your money',
        sub: 'Where we send your money'
      }
    ]
  }
  public render() {
    return (
      <div className="comp-sellayout-leftside-container">
        {
          this.state.steps.map((step, index) => (
            <div className="step" key={index}>
              <p className="main-content">{step.main}</p>
              <p className="sub-content">{step.sub}</p>
            </div>
          ))
        }
      </div>
    )
  }
}