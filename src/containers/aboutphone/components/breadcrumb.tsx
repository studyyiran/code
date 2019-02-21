import * as React from 'react';
import classnames from 'classnames';
import './breadcrumb.less';
import { IBreadCrumb } from '../interface/index.interface';

const Breadcrumb: React.SFC<Partial<IBreadCrumb>> = (props) => (
  <div className="comp-yourphone-breadcrumb-container" style={props.style ? props.style : {}}>
    <span className={classnames({ active: props.brandName })}>{props.brandName ? props.brandName : 'Manufacturer'}</span>
    <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
    <span className={classnames({ active: props.carrierName })}>{props.carrierName ? props.carrierName : 'Carrier'}</span>
    <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
    <span className={classnames({ active: props.modelName })}>{props.modelName ? props.modelName : 'Modal'}</span>
  </div>
);

export default Breadcrumb;