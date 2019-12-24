import React from "react";
import "./index.less";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { sellPageGoTo } from "../../../../common/utils/util";
import { locationHref } from "../../../../common/utils/routerHistory";
export default function AdLine(props: any) {
  const { line } = props;
  let dom;
  switch (String(line)) {
    case "0":
      return (
        <div className="ad-line" key="adline0">
          <div>
            <h3>Questions?</h3>
            <p>We’ve got answers</p>
          </div>
          <a className="big" onClick={() => locationHref("/contact")}>
            Get Help
          </a>
          {/*<RenderByCondition*/}
          {/*  ComponentMb={<a className="big">972-833.0136</a>}*/}
          {/*  ComponentPc={<a className="big">Get Help</a>}*/}
          {/*/>*/}
        </div>
      );
      break;
    case "1":
      return (
        <div className="ad-line" key="adline1">
          <h3>Buy with confidence</h3>
          <RenderByCondition
            ComponentMb={null}
            ComponentPc={
              <ul>
                <li>Real photos</li>
                <li>Free phone history report</li>
              </ul>
            }
          />
        </div>
      );
      break;
    case "2":
      return (
        <div className="ad-line" key="adline2">
          <h3>Protect your phone</h3>
          <RenderByCondition
            ComponentMb={null}
            ComponentPc={
              <p>Affordable device & screen damage protection plans</p>
            }
          />
        </div>
      );
      break;
    case "3":
      return (
        <div className="ad-line" key="adline3">
          <h3>“Fast, professional, great price.”</h3>
          <p className="name">-Craig Black</p>
        </div>
      );
      break;
    default:
      return null;
  }
}
