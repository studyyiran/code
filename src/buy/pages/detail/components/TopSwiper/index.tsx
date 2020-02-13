import React, { useContext, useState } from "react";
import VideoComponent from "../../../../components/video";
// @ts-ignore
import ReactImageMagnify from "react-image-magnify";
import "./index.less";
import { RenderSwiper } from "./components/swiper";
import {
  GlobalSettingContext,
  IGlobalSettingContext
} from "../../../../context";
import {RenderByCondition} from "../../../../components/RenderByCondition";

const hahaA = 0.05;
const hahaB = 0.02;

export function TopSwiper(props: any) {
  const {
    buyProductImgPc,
    buyProductImgM,
    buyProductVideo,
    productId,
    containerWidth
  } = props;
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  const contentSize = (isMobile ? containerWidth : (containerWidth - containerWidth * hahaA - containerWidth * hahaB) / 2);
  const [currentImageIndex, setCurrentImageIndex] = useState("");
  const renderContent = (afterCalcSize: number) => {
    if (currentImageIndex === "video") {
      return (
        <VideoComponent
          key="videocomponent"
          src={buyProductVideo}
          className="my-video"
        />
      );
    } else {
      const zoomSize = 3;
      return (
        <ReactImageMagnify
          {...{
            enlargedImageContainerDimensions: {
              width: "100%",
              height: "100%"
            },
            enlargedImageContainerStyle: {
              width: '1px',
              marginLeft: hahaB * containerWidth + "px",
              zIndex: 99999,
            },
            imageStyle: {
              objectFit: "cover"
            },
            enlargedImageStyle: {
              objectFit: "cover",
            },
            smallImage: {
              // isFluidWidth: true,
              width: afterCalcSize,
              height: afterCalcSize,
              src: buyProductImgM[currentImageIndex]
            },
            largeImage: {
              src: buyProductImgPc[currentImageIndex],
              width: afterCalcSize * zoomSize,
              height: afterCalcSize * zoomSize
            }
          }}
        />
      );
    }
  };

  return (
    <div className="detail-top-swiper">
      <div className="swiper-part-container">
        <RenderSwiper
          style={isMobile ? { width: contentSize } : { height: contentSize }}
          buyProductVideo={buyProductVideo}
          buyProductImgM={buyProductImgM}
          isMobile={isMobile}
          swiperWidth={(isMobile ? 0.225  * containerWidth : hahaA  * containerWidth - 10)}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      </div>
      <div
        className="content-part"
        style={{
          width: contentSize,
          height: contentSize,
          flex: `0 0 ${contentSize}px`
        }}
      >
        <div className="real-phone-product">Real Phone Product ID {productId}</div>
        {renderContent(contentSize)}
        <RenderByCondition
          ComponentPc={
            <div className="zoom-container-pc">
              <img src={require('./res/zoom2.svg')}/>
              <span>Roll over image to zoom in</span>
            </div>
          }
          ComponentMb={currentImageIndex === "video" ? null : <div className="zoom-container-mb">
            <span>Long Press</span>
            <img src={require('./res/zoom2.svg')}/>
          </div>}
        />
      </div>
    </div>
  );

  // return (
  //   <>
  //     {/*<ModalView visible={showImageModal}>*/}
  //     {/*  <WxImageViewer*/}
  //     {/*    zIndex={9999}*/}
  //     {/*    urls={buyProductImgPc}*/}
  //     {/*    index={currentImageIndex}*/}
  //     {/*    onClose={() => {*/}
  //     {/*      setShowImgModal(false);*/}
  //     {/*    }}*/}
  //     {/*  />*/}
  //     {/*</ModalView>*/}
  //     <div className="detail-top-swiper">
  //       <div className="actual-tag" onClick={onOpenModal}>
  //         Actual Phone
  //       </div>
  //       <RenderByCondition
  //         ComponentMb={
  //           <img
  //             onClick={onOpenModal}
  //             className="mb-zoom"
  //             src={require("./res/zoom.svg")}
  //           />
  //         }
  //         ComponentPc={null}
  //       />
  //       <RenderByCondition
  //         ComponentPc={(() => {
  //           let dom = buyProductImgPc.map((item: string, index: number) => {
  //             return (
  //               <div className="inner-div-container" key={index}>
  //                 <InnerDivImage imgUrl={item} dataIndex={index} />
  //               </div>
  //             );
  //           });
  //           if (buyProductVideo) {
  //             dom.unshift(
  //               <VideoComponent
  //                 key="videocomponent"
  //                 className="innerdiv"
  //                 src={buyProductVideo}
  //               />
  //             );
  //           }
  //           dom = dom.filter((item: any, index: any) => {
  //             return index < maxNumber;
  //           });
  //           return (
  //             <div>
  //               {buyProductImgPc.length > 3 ? (
  //                 <div
  //                   className="pc-total-count"
  //                   onClick={onOpenModal}
  //                 >{`See More (${buyProductImgPc.length}) `}</div>
  //               ) : null}
  //               <div
  //                 className="swiper-pc"
  //                 onClick={(e: any) => {
  //                   if (
  //                     e &&
  //                     e.target &&
  //                     e.target.dataset &&
  //                     e.target.dataset.index
  //                   ) {
  //                     onOpenModal(e, e.target.dataset.index);
  //                   }
  //                 }}
  //               >
  //                 {dom}
  //               </div>
  //               {/*{isServer() ? null : (*/}
  //               {/*  <ModalGateway>*/}
  //               {/*    {showImageModal ? (*/}
  //               {/*      <Modal*/}
  //               {/*        onClose={() => {*/}
  //               {/*          setShowImgModal(false);*/}
  //               {/*        }}*/}
  //               {/*      >*/}
  //               {/*        <TestCarousel*/}
  //               {/*          styles={{*/}
  //               {/*            footer: (base: any) => {*/}
  //               {/*              return {*/}
  //               {/*                ...base,*/}
  //               {/*                backgroud: "red",*/}
  //               {/*                // paddingRight: "100px",*/}
  //               {/*                // paddingBottom: '100px',*/}
  //               {/*                justifyContent: "flex-start"*/}
  //               {/*              };*/}
  //               {/*            }*/}
  //               {/*          }}*/}
  //               {/*          currentIndex={Number(currentImageIndex)}*/}
  //               {/*          views={buyProductImgPc.map((item: any) => ({*/}
  //               {/*            src: item*/}
  //               {/*          }))}*/}
  //               {/*        >*/}
  //               {/*          {dom}*/}
  //               {/*        </TestCarousel>*/}
  //               {/*      </Modal>*/}
  //               {/*    ) : null}*/}
  //               {/*  </ModalGateway>*/}
  //               {/*)}*/}
  //             </div>
  //           );
  //         })()}
  //         ComponentMb={(() => {
  //           let dom = buyProductImgM.map((item: string, index: number) => {
  //             return (
  //               <InnerDivImage
  //                 imgUrl={item}
  //                 key={index}
  //                 dataIndex={index}
  //                 onClick={(e: any) => {
  //                   setCurrentImageIndex(String(index));
  //                   setShowImgModal(true);
  //                 }}
  //               />
  //             );
  //           });
  //
  //           if (buyProductVideo) {
  //             dom.unshift(
  //               <VideoComponent
  //                 key="videocomponent"
  //                 className="innerdiv"
  //                 src={buyProductVideo}
  //                 poster={
  //                   buyProductImgM && buyProductImgM[0]
  //                     ? buyProductImgM[0]
  //                     : require("./res/poster.png")
  //                 }
  //               />
  //             );
  //           }
  //           return <Carousel className="swiper-mb mb-carousel">{dom}</Carousel>;
  //         })()}
  //       />
  //     </div>
  //   </>
  // );
}
