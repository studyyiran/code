import { safeEqual } from "../../../../../../common/utils/util";
import { InnerDivImage } from "../../../innerDivImage";
import React, { useEffect, useState } from "react";
import "./index.less";
import Svg from "../../../../../../components/svg";

interface IProps {
  swiperWidth: number;
  currentImageIndex: any;
  setCurrentImageIndex: any;
  buyProductVideo: string;
  style: any;
  isMobile: boolean;
  buyProductImgM: string[];
}
export const RenderSwiper: React.FC<IProps> = ({
  isMobile,
  style,
  swiperWidth,
  buyProductVideo,
  buyProductImgM = [],
  currentImageIndex,
  setCurrentImageIndex
}) => {
  useEffect(() => {
    if (currentImageIndex === "") {
      if (buyProductVideo) {
        setCurrentImageIndex("video");
      } else {
        setCurrentImageIndex("0");
      }
    }
  }, [buyProductVideo, currentImageIndex, setCurrentImageIndex]);

  const [currentPos, setCurrentPos] = useState(0);

  const maxNumber = isMobile ? 1000 : 9;
  function onOpenModal(e: any, index = 0) {
    // 可以确定当前显示的.
    setCurrentImageIndex(String(index));
    // setShowImgModal(true);
  }
  const afterStyle = {
    flex: `0 0 ${swiperWidth}px`,
    width: swiperWidth,
    height: swiperWidth
  };
  let dom = buyProductImgM.map((item: string, index: number) => {
    return (
      <div
        style={afterStyle}
        className="inner-div-container"
        key={index}
        data-selected={safeEqual(index, currentImageIndex)}
      >
        <InnerDivImage imgUrl={item} dataIndex={index} style={afterStyle} />
      </div>
    );
  });
  if (buyProductVideo) {
    dom.unshift(
      <div
        style={afterStyle}
        className="inner-div-container"
        key={"videoimg"}
        data-selected={safeEqual("video", currentImageIndex)}
      >
        <InnerDivImage
          style={afterStyle}
          imgUrl={require("./res/poster.png")}
          dataIndex={"video"}
        />
      </div>
    );
  }
  const canRenderArrow = dom.length > maxNumber;
  const afterFilterDom = dom.filter((item: any, index: any) => {
    return index >= currentPos && index < maxNumber + currentPos;
  });

  const getStyleAndClass: (
    condition: boolean,
    onClickFunc: any
  ) => { style: any; className?: any } = (condition, onClickFunc) => {
    if (condition) {
      return {
        onClick: onClickFunc,
        style: { background: "rgba(55, 90, 125, 1)", color: "white" },
        className: "canclick"
      };
    } else {
      return {
        style: { background: "rgba(233, 233, 233, 1)" }
      };
    }
  };

  const renderButton = ({
    children,
    style,
    className,
    onClick
  }: {
    children: any;
    style: any;
    className?: any;
    onClick?: any;
  }) => {
    if (canRenderArrow) {
      return (
        <div className="arrow-button" style={style} onClick={onClick}>
          {children}
        </div>
      );
    } else {
      return null;
    }
  };

  const isFirst = () => {
    return safeEqual(currentPos, 0);
  };

  return (
    <div
      className="swiper-part"
      data-flex={afterFilterDom.length < maxNumber - 1 ? true : false}
      style={Object.assign(
        {},
        style,
        { width: isMobile ? "100%" : swiperWidth }
      )}
      onClick={(e: any) => {
        if (e && e.target && e.target.dataset && e.target.dataset.index) {
          onOpenModal(e, e.target.dataset.index);
        }
      }}
    >
      {renderButton({
        ...getStyleAndClass(canRenderArrow && !isFirst(), () => {
          setCurrentPos(c => --c);
        }),
        children: <Svg icon="arrow_up" />
      })}
      {afterFilterDom}
      {renderButton({
        ...getStyleAndClass(
          canRenderArrow && currentPos + maxNumber < dom.length,
          () => {
            setCurrentPos(c => ++c);
          }
        ),
        children: <Svg icon="arrow_down" />
      })}
    </div>
  );
};
