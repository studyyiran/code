import * as React from "react";
import {IBrandLogo} from './index.interface'
import './index.less'


export function BrandLogo(props: IBrandLogo) {
  const {brand} = props
  const {iconUrl, name} = brand
  return <div className="comp-brand-logo">
    <span>
      <img src={iconUrl} />
    </span>
    <span>{name}</span>
  </div>
}