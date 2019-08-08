import * as React from "react";
import {ISectionIcons} from './index.interface'
import './index.less'

export function SectionIcons (props: ISectionIcons) {
  const {title, descArr, children} = props
  return <section className='comp-section-icons'>
    <h2>
      {title}
    </h2>
    <div className="comp-section-icons_item_container">
    {descArr.map((item: any, index: any) => {
      const {icon, descTitle, content} = item
      return <section className="comp-section-icons_item" key={index}>
        <img src={icon} />
        <h1>{descTitle}</h1>
        <p>{content}</p>
      </section>
    })}
    </div>
    {children}
  </section>
}
