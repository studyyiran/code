import React, { useContext, useEffect, useState } from "react";
import PhoneInfo, { ProductInfoCard } from "../phoneInfo";
import { currencyTrans, safeEqual } from "../../../../common/utils/util";
import { dataReport } from "../../../../common/dataReport";
import PayCardImages from "../payCardImages";
import MyModal from "../../../../components/modal";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes
} from "../../../order/context";
import { locationHref } from "../../../../common/utils/routerHistory";
import { IProductDetail } from "../../context/interface";
import {
  protectionInfo,
  protectPrice
} from "../../../../common/config/staticConst";
import { constProductType } from "../../../../common/constValue";
import "./index.less";
import { PartsProductCard } from "../partsProductCard";
import RouterLink from "../../../../common-modules/components/routerLink";

interface ICartPop {
  showModal: boolean;
  setShowModal: any;
  productDetail: IProductDetail;
  partsInfo: IProductDetail[];
}

function WithTitle(props: { title: string; children: any }) {
  const { title, children } = props;
  return (
    <div className="with-title-container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

interface IOtherProduct {
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
  const { buyProductId, buyPrice } = productDetail;
  const otherProductSubTotal = otherProductList
    .map(({ buyPrice }) => Number(buyPrice))
    .reduce((count: number, a: number) => count + a, 0);
  return (
    <MyModal
      needDefaultScroll={true}
      className="cart-modal"
      visible={showModal}
      maskClosable={false}
      title="Your cart"
      width={"90%"}
      onCancel={() => setShowModal(false)}
      footer={null}
    >
      <div>
        {/*机子*/}
        <PhoneInfo {...productDetail} />
        {/*保险*/}
        <RenderProtection
          needProtection={needProtection}
          setNeedProtection={setNeedProtection}
        />
        {/*其他子商品*/}
        <RenderOtherProduct
          otherProductList={otherProductList}
          setOtherProductList={setOtherProductList}
          partsInfo={partsInfo}
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
            // dataReport({
            //   event: "EEcheckout",
            //   ecommerce: {
            //     currencyCode: "USD",
            //     add: {
            //       products: [
            //         {
            //           sku: String(skuId),
            //           name: productDisplayName,
            //           price: Number(buyPrice)
            //         }
            //       ]
            //     }
            //   }
            // });
          }}
        />
        <PayCardImages />
      </div>
    </MyModal>
  );
}

function CheckOutButton(props: {
  buyProductId: string;
  needProtection: boolean;
  otherProductList: IOtherProduct[];
  onClick: any;
}) {
  const { buyProductId, needProtection, otherProductList } = props;
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextDispatch } = orderInfoContext as IOrderInfoContext;
  return (
    <button
      className="common-button"
      onClick={() => {
        // 进行other的数据组织
        const otherProductInfo = otherProductList.map(item => {
          return {
            productId: item.productId,
            needProtection: false,
            productType: item.productType as string
          };
        });
        // 1 他会xx
        orderInfoContextDispatch({
          type: orderInfoReducerTypes.addSubOrder,
          value: [
            {
              productId: buyProductId,
              needProtection,
              productType: constProductType.PRODUCT
            }
          ].concat(otherProductInfo)
        });
        if (props.onClick) {
          props.onClick();
        }
        // 2 短暂delay
        window.setTimeout(() => {
          locationHref("/buy/info");
        }, 100);
      }}
    >
      Checkout
    </button>
  );
}

interface IAddToCard {
  cartChangeCallBack: (haveAddIntoCart: boolean) => any;
  value?: boolean;
}

function AddToCart(props: IAddToCard) {
  const { cartChangeCallBack, value } = props;
  const [haveAdd, setHaveAdd] = useState(false);

  function getState() {
    if (value !== undefined) {
      return value;
    } else {
      return haveAdd;
    }
  }

  function cartChangeHandler() {
    const next = !getState();
    cartChangeCallBack(next);
    setHaveAdd(next);
  }
  return (
    <div
      className="add-to-cart-button"
      data-status={getState()}
      onClick={cartChangeHandler}
    >
      {getState() ? <span>Remove</span> : <span>Add to card</span>}
    </div>
  );
}

function RenderProtection(props: {
  needProtection: boolean;
  setNeedProtection: any;
}) {
  const { needProtection, setNeedProtection } = props;
  return (
    <WithTitle title="Phone protection">
      {/*<div>{protectPrice}</div>*/}
      <ProductInfoCard
        productName={protectionInfo.title}
        productImage={require("./res/protection_img.png")}
        price={protectPrice}
      >
        {protectionInfo.content}
        <div className="last-line-flex-container">
          <RouterLink to={"/uptrade/protect"}>Learn more</RouterLink>
          <AddToCart
            value={needProtection}
            cartChangeCallBack={value => {
              setNeedProtection(value);
            }}
          />
        </div>
      </ProductInfoCard>
    </WithTitle>
  );
}

function RenderOtherProduct(props: {
  partsInfo: IProductDetail[];
  otherProductList: IOtherProduct[];
  setOtherProductList: any;
}) {
  const { partsInfo, otherProductList, setOtherProductList } = props;
  const dom = partsInfo.map(item => {
    const { buyProductId, productType, buyPrice } = item;
    return (
      <PartsProductCard productInfo={item}>
        <div className="last-line-flex-container peijian">
          <AddToCart
            value={otherProductList.some(item =>
              safeEqual(item.productId, buyProductId)
            )}
            cartChangeCallBack={value => {
              setOtherProductList((arr: IOtherProduct[]) => {
                // 根据选中状态来操作列表
                if (value) {
                  return arr.concat([
                    {
                      productId: buyProductId,
                      productType,
                      buyPrice
                    }
                  ]);
                } else {
                  return arr.filter(
                    item => !safeEqual(item.productId, buyProductId)
                  );
                }
              });
            }}
          />
        </div>
      </PartsProductCard>
    );
  });
  if (dom && dom.length) {
    return <WithTitle title="Recommended accessories">{dom}</WithTitle>;
  } else {
    return null;
  }
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
