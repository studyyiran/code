import * as React from "react";
import {ISectionIcons} from './index.interface'
import './index.less'

export function SectionIcons (props: ISectionIcons) {
  const {descArr = []} = props
  return <section className={`comp-section-layout`}>
    <div className="section-layout__item-container">
    {(descArr || []).map((item: any, index: any) => {
      const {icon, descTitle, content} = item
      return <section className="item-container__item" key={index}>
        <img src={icon} />
        <h1>{descTitle}</h1>
        <p>{content}</p>
      </section>
    })}
    </div>
  </section>
}
