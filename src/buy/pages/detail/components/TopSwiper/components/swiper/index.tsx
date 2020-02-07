import { safeEqual } from "../../../../../../common/utils/util";
import { InnerDivImage } from "../../../innerDivImage";
import React, { useEffect } from "react";
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
  }, []);
  const maxNumber = isMobile ? 1000 : 7;
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
  const upCanClick = canRenderArrow && currentImageIndex !== 0;
  const downCanClick =
    canRenderArrow && currentImageIndex + maxNumber < dom.length;
  dom = dom.filter((item: any, index: any) => {
    return index < maxNumber;
  });

  return (
    <div>
      <div
        className="swiper-pc"
        style={style}
        onClick={(e: any) => {
          if (e && e.target && e.target.dataset && e.target.dataset.index) {
            onOpenModal(e, e.target.dataset.index);
          }
        }}
      >
        <div className="arrow-button">
          <Svg icon="arrow_up" />
        </div>
        {dom}
        <div className="arrow-button">
          <Svg icon="arrow_down" />
        </div>
      </div>
    </div>
  );
};
