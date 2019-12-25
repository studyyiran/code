import React, { useEffect, useState } from "react";
import PhoneInfo from "../phoneInfo";
import { currencyTrans, safeEqual } from "../../../../common/utils/util";
import { dataReport } from "../../../../common/dataReport";
import PayCardImages from "../payCardImages";
import MyModal from "../../../../components/modal";

import { IProductDetail } from "../../context/interface";
import { protectPrice } from "../../../../common/config/staticConst";
import "./index.less";
import { RenderProtection } from "./components/renderProtection";
import { RenderOtherProduct } from "./components/renderOtherProtection";
import { CheckOutButton } from "./components/checkoutButton";

interface ICartPop {
  showModal: boolean;
  setShowModal: any;
  productDetail: IProductDetail;
  partsInfo: IProductDetail[];
}

export interface IOtherProduct {
  productId: string;
  productType?: string;
  buyPrice: string;
}

export function CartPop(props: ICartPop) {
  const { showModal, setShowModal, productDetail, partsInfo } = props;
  const [needProtection, setNeedProtection] = useState(false);
  const [otherProductList, setOtherProductList] = useState(
    [] as IOtherProduct[]
  );
  const initStateStep = 1;
  const [step, setStep] = useState(initStateStep);
  const { buyProductId, buyPrice, productDisplayName, skuId } = productDetail;
  const otherProductSubTotal = otherProductList
    .map(({ buyPrice }) => Number(buyPrice))
    .reduce((count: number, a: number) => count + a, 0);

  useEffect(() => {
    setShowModal(initStateStep);
  }, [setShowModal]);

  function renderByStep() {
    if (step === 1) {
      return (
        <div className="step1">
          {/*保险*/}
          <RenderProtection
            needAddButton={true}
            needTitle={false}
            setShowModal={setShowModal}
            needProtection={needProtection}
            setNeedProtection={setNeedProtection}
          />
          {/*其他子商品*/}
          <RenderOtherProduct
            otherProductList={otherProductList}
            setOtherProductList={setOtherProductList}
            partsInfo={partsInfo}
            needTitle={false}
            needAddButton={true}
          />
          <button
            className="common-button"
            onClick={() => {
              setStep(2);
            }}
          >
            Continue
          </button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="step2">
          {/*机子*/}
          <PhoneInfo {...productDetail} />
          {/*保险*/}
          {needProtection ? (
            <RenderProtection
              needTitle={true}
              needAddButton={false}
              setShowModal={setShowModal}
              needProtection={needProtection}
              setNeedProtection={setNeedProtection}
            />
          ) : null}
          {/*其他子商品*/}
          <RenderOtherProduct
            otherProductList={otherProductList}
            setOtherProductList={setOtherProductList}
            partsInfo={partsInfo}
            needTitle={true}
            needAddButton={false}
          />
          {/*价格计算*/}
          <ul className="price-list">
            <li>
              <label>Subtotal: </label>
              <span>{currencyTrans(buyPrice + otherProductSubTotal)}</span>
            </li>
            {needProtection ? (
              <li>
                <label>Protection: </label>
                <span>{currencyTrans(protectPrice)}</span>
              </li>
            ) : null}
            <li className="protect">
              <label>Total:</label>
              <span>
                {currencyTrans(
                  otherProductSubTotal +
                    (needProtection ? buyPrice + protectPrice : buyPrice)
                )}
              </span>
            </li>
          </ul>
          <CheckOutButton
            buyProductId={buyProductId}
            otherProductList={otherProductList}
            needProtection={needProtection}
            onClick={() => {
              setShowModal(false);
              try {
                dataReport({
                  event: "EEcheckout",
                  ecommerce: {
                    currencyCode: "USD",
                    add: {
                      products: [
                        {
                          sku: String(skuId),
                          name: productDisplayName,
                          price: Number(buyPrice)
                        }
                      ].concat(
                        otherProductList.map(item => {
                          const target = partsInfo.find(item2 =>
                            safeEqual(item2.buyProductId, item.productId)
                          );
                          if (target) {
                            return {
                              sku: String(target.skuId),
                              name: target.productDisplayName,
                              price: Number(target.buyPrice)
                            };
                          } else {
                            return {
                              sku: String(item.productId),
                              name: item.productId,
                              price: Number(item.buyPrice)
                            };
                          }
                        })
                      )
                    }
                  }
                });
              } catch (e) {
                console.error(e);
              }
            }}
          />
          <span
            className="goback"
            onClick={() => {
              setStep(1);
            }}
          >{`< Go back`}</span>
          <PayCardImages />
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <MyModal
      needDefaultScroll={true}
      className="cart-modal"
      visible={showModal}
      maskClosable={false}
      title={step === 1 ? "Dont't forget your essentials" : "Your cart"}
      width={"90%"}
      onCancel={() => setShowModal(false)}
      footer={null}
    >
      {renderByStep()}
    </MyModal>
  );
}

// function CheckBoxProtection(props: any) {
//   if (props && props.needProtectionState) {
//     const [needProtection, setNeedProtection] = props.needProtectionState;
//     return (
//       <div className="checkbox-protection">
//         <Checkbox
//           checked={needProtection}
//           onChange={() => {
//             setNeedProtection((current: any) => {
//               return !current;
//             });
//           }}
//         >
//           <span>
//             Add UpTrade Protection for {currencyTrans(protectPrice)}
//             {staticContentConfig.perMonth}
//           </span>
//         </Checkbox>
//         <TipsIcon>{TipsProtection}</TipsIcon>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }
