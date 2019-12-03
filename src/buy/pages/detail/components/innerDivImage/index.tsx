import React from "react";
import "./index.less";
import LazyLoad from "react-lazyload";

export function InnerDivImage(props: {
  imgUrl: string;
  dataIndex?: any;
  children?: any;
  lazyload?: any;
  onClick?: any;
}) {
  const { imgUrl, dataIndex, lazyload = true, onClick } = props;
  const formatIndex = String(dataIndex);
  if (lazyload) {
    return (
      <LazyLoad height={200}>
        <div
          onClick={(...arg) => {
            if (onClick) {
              onClick(arg);
            }
          }}
          data-index={formatIndex ? formatIndex : false}
          className="innerdiv"
          style={{
            backgroundImage: `url("${imgUrl}")`
          }}
        >
          {props.children}
        </div>
      </LazyLoad>
    );
  } else {
    return (
      <div
        onClick={(...arg) => {
          if (onClick) {
            onClick(arg);
          }
        }}
        data-index={formatIndex ? formatIndex : false}
        className="innerdiv"
        style={{
          backgroundImage: `url("${imgUrl}")`
        }}
      >
        {props.children}
      </div>
    );
  }
}
