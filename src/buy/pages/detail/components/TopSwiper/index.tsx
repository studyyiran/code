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
        <div className="actual-tag">Actual Phone</div>
        <RenderByCondition
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
                <VideoComponent className="innerdiv" src={buyProductVideo} />
              );
            }
            return <Carousel className="swiper-mb mb-carousel">{dom}</Carousel>;
          })()}
          ComponentPc={(() => {
            let dom = buyProductImgPc.map((item: string, index: number) => {
              return (
                <InnerDivImage imgUrl={item} key={index} dataIndex={index} />
              );
            });
            if (buyProductVideo) {
              dom.unshift(
                <VideoComponent className="innerdiv" src={buyProductVideo} />
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
                    if (
                      e &&
                      e.target &&
                      e.target.dataset &&
                      e.target.dataset.index
                    ) {
                      setCurrentImageIndex(e.target.dataset.index);
                      setShowImgModal(true);
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
        />
      </div>
    </>
  );
}
