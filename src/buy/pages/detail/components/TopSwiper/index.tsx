import React, { useState } from "react";
import { ModalView } from "../../../../components/ModalView";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { InnerDivImage } from "../innerDivImage";
import VideoComponent from "../../../../components/video";
import { Carousel } from "antd";
import { isServer } from "../../../../common/utils/util";
// @ts-ignore
import TestCarousel, { Modal, ModalGateway } from "react-images";
// @ts-ignore
import WxImageViewer from "react-wx-images-viewer";
import "./index.less";

export function TopSwiper(props: any) {
  const [showImageModal, setShowImgModal] = useState(false);
  const {
    buyProductImgPc,
    buyProductImgM,
    buyProductVideo,
    setCurrentImageIndex,
    currentImageIndex
  } = props;

  const maxNumber = 3;
  function onOpenModal(e: any, index = 0) {
    setCurrentImageIndex(index);
    setShowImgModal(true);
  }
  return (
    <>
      <ModalView visible={showImageModal}>
        <WxImageViewer
          zIndex={9999}
          urls={buyProductImgPc}
          index={currentImageIndex}
          onClose={() => {
            setShowImgModal(false);
          }}
        />
      </ModalView>
      <div className="detail-top-swiper">
        <div className="actual-tag" onClick={onOpenModal}>
          Actual Phone
        </div>
        <RenderByCondition
          ComponentMb={
            <img
              onClick={onOpenModal}
              className="mb-zoom"
              src={require("./res/zoom.svg")}
            />
          }
          ComponentPc={null}
        />
        <RenderByCondition
          ComponentPc={(() => {
            let dom = buyProductImgPc.map((item: string, index: number) => {
              return (
                <div className="inner-div-container" key={index}>
                  <InnerDivImage imgUrl={item} dataIndex={index} />
                </div>
              );
            });
            if (buyProductVideo) {
              dom.unshift(
                <VideoComponent key="videocomponent" className="innerdiv" src={buyProductVideo} />
              );
            }
            dom = dom.filter((item: any, index: any) => {
              return index < maxNumber;
            });
            return (
              <div>
                {buyProductImgPc.length > 3 ? (
                  <div
                    className="pc-total-count"
                    onClick={onOpenModal}
                  >{`See More (${buyProductImgPc.length}) `}</div>
                ) : null}
                <div
                  className="swiper-pc"
                  onClick={(e: any) => {
                    if (
                      e &&
                      e.target &&
                      e.target.dataset &&
                      e.target.dataset.index
                    ) {
                      onOpenModal(e, e.target.dataset.index);
                    }
                  }}
                >
                  {dom}
                </div>
                {isServer() ? null : (
                  <ModalGateway>
                    {showImageModal ? (
                      <Modal
                        onClose={() => {
                          setShowImgModal(false);
                        }}
                      >
                        <TestCarousel
                          styles={{
                            footer: (base: any) => {
                              return {
                                ...base,
                                backgroud: "red",
                                // paddingRight: "100px",
                                // paddingBottom: '100px',
                                justifyContent: "flex-start"
                              };
                            }
                          }}
                          currentIndex={Number(currentImageIndex)}
                          views={buyProductImgPc.map((item: any) => ({
                            src: item
                          }))}
                        >
                          {dom}
                        </TestCarousel>
                      </Modal>
                    ) : null}
                  </ModalGateway>
                )}
              </div>
            );
          })()}
          ComponentMb={(() => {
            let dom = buyProductImgM.map((item: string, index: number) => {
              return (
                <InnerDivImage
                  imgUrl={item}
                  key={index}
                  dataIndex={index}
                  onClick={(e: any) => {
                    setCurrentImageIndex(index);
                    setShowImgModal(true);
                  }}
                />
              );
            });

            if (buyProductVideo) {
              dom.unshift(
                <VideoComponent
                  key="videocomponent"
                  className="innerdiv"
                  src={buyProductVideo}
                  poster={
                    buyProductImgM && buyProductImgM[0]
                      ? buyProductImgM[0]
                      : require("./res/poster.png")
                  }
                />
              );
            }
            return <Carousel className="swiper-mb mb-carousel">{dom}</Carousel>;
          })()}
        />
      </div>
    </>
  );
}
