import React from "react";
import LazyLoad from "react-lazyload";

export function InnerDivImage(props: {
  imgUrl: string;
  dataIndex?: any;
  children?: any;
  lazyload?: any;
  onClick?: any;
  style?: any;
}) {
  const { imgUrl, dataIndex, lazyload = true, onClick, style = {} } = props;
  const formatIndex = String(dataIndex);
  const afterStyle = {...style, backgroundImage: `url("${imgUrl}")`}
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
          style={afterStyle}
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
        style={afterStyle}
      >
        {props.children}
      </div>
    );
  }
}
