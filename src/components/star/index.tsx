import * as React from 'react'
import classnames from 'classnames';
import { IStartProps } from './interface/index.interface';
import './index.less';
export default (props: IStartProps) => {
  return (
    <div className={classnames("comp-rating-list-container", { small: props.size === 'small', gray: props.gray }, props.className)}>
      <div className="comp-rating-list">
        <div className="progress" style={{ width: props.rate >= 1 ? '100%' : ((props.rate > 0 ? props.rate : 0) * 100) + '%' }} />
        <div className="background" />
      </div>
      <div className="comp-rating-list">
        <div className="progress" style={{ width: props.rate >= 2 ? '100%' : ((props.rate - 1 > 0 ? props.rate - 1 : 0) * 100) + '%' }} />
        <div className="background" />
      </div>
      <div className="comp-rating-list">
        <div className="progress" style={{ width: props.rate >= 3 ? '100%' : ((props.rate - 2 > 0 ? props.rate - 2 : 0) * 100) + '%' }} />
        <div className="background" />
      </div>
      <div className="comp-rating-list">
        <div className="progress" style={{ width: props.rate >= 4 ? '100%' : ((props.rate - 3 > 0 ? props.rate - 3 : 0) * 100) + '%' }} />
        <div className="background" />
      </div>
      <div className="comp-rating-list">
        <div className="progress" style={{ width: props.rate >= 5 ? '100%' : ((props.rate - 4 > 0 ? props.rate - 4 : 0) * 100) + '%' }} />
        <div className="background" />
      </div>
    </div>
  )
}