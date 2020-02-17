import {viewAllClickHandler} from "../../util";
import {RenderByCondition} from "../../../../components/RenderByCondition";
import {Carousel} from "antd";
import PhoneProductCard from "../../../productList/components/phoneProductCard";
import React from "react";
import './index.less';
import {locationHref} from "../../../../common/utils/routerHistory";
import {getProductListPath} from "../../../../common/utils/util";

interface IProps {
  similiarPhoneList: any[];
  productDetail: any;
  history: any;
}

export const RenderSimilar : React.FC<IProps> = (props) => {
  const {similiarPhoneList, productDetail} = props
  // 哪怕有ts,也不能相信他一定有值.
  if (similiarPhoneList && similiarPhoneList.length) {
    return (
      <section className="similar">
        <header className="title-with-border">
          <h2 className="sub-title-size-main">Recommended</h2>
          <a>
              <span
                className={"view-all-text"}
                onClick={() => {
                  locationHref(getProductListPath());
                }}
              >
                VIEW ALL
              </span>
          </a>
        </header>
        <RenderByCondition
          ComponentMb={
            <Carousel className="mb-carousel" dots={true}>
              {similiarPhoneList.map((item, index) => {
                return (
                  <PhoneProductCard
                    key={index}
                    {...item}
                    history={props.history}
                  />
                );
              })}
            </Carousel>
          }
          ComponentPc={
            <div className="list" data-length={similiarPhoneList && similiarPhoneList.length > 4 ? "true" : "false"}>
              {similiarPhoneList.map((item, index) => {
                return (
                  <PhoneProductCard
                    key={index}
                    {...item}
                    history={props.history}
                  />
                );
              })}
            </div>
          }
        />
      </section>
    );
  } else {
    return null;
  }
};