import {safeEqual} from "../../../../../../common/utils/util";
import {InnerDivImage} from "../../../innerDivImage";
import React, {useEffect} from "react";
import './index.less'

interface IProps {
  swiperWidth: number,
  currentImageIndex: any,
  setCurrentImageIndex: any,
  buyProductVideo: string,
  buyProductImgM: string[],
}
export const RenderSwiper : React.FC<IProps> = ({swiperWidth, buyProductVideo, buyProductImgM =[], currentImageIndex, setCurrentImageIndex}) => {
  
  useEffect(() => {
    if (currentImageIndex === "") {
      if (buyProductVideo) {
        setCurrentImageIndex("video");
      } else {
        setCurrentImageIndex("0");
      }
    }
  }, []);
  const maxNumber = 7;
  function onOpenModal(e: any, index = 0) {
    // 可以确定当前显示的.
    setCurrentImageIndex(String(index));
    // setShowImgModal(true);
  }
  let dom = buyProductImgM.map((item: string, index: number) => {
    return (
      <div
        className="inner-div-container"
        key={index}
        data-selected={safeEqual(index, currentImageIndex)}
      >
        <InnerDivImage imgUrl={item} dataIndex={index} />
      </div>
    );
  });
  if (buyProductVideo) {
    dom.unshift(
      <div
        className="inner-div-container"
        key={"videoimg"}
        data-selected={safeEqual("video", currentImageIndex)}
      >
        <InnerDivImage
          imgUrl={require("./res/poster.png")}
          dataIndex={"video"}
        />
      </div>
    );
  }
  dom = dom.filter((item: any, index: any) => {
    return index < maxNumber;
  });
  return (
    <div>
      <div
        className="swiper-pc"
        onClick={(e: any) => {
          if (e && e.target && e.target.dataset && e.target.dataset.index) {
            onOpenModal(e, e.target.dataset.index);
          }
        }}
      >
        {dom}
      </div>
    </div>
  );
};