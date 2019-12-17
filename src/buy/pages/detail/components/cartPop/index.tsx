import React, { useContext, useEffect, useState } from "react";
import PhoneInfo, { ProductInfoCard } from "../phoneInfo";
import { currencyTrans } from "../../../../common/utils/util";
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

interface ICartPop {
  showModal: boolean;
  setShowModal: any;
  productDetail: IProductDetail;
}

function WithTitle(props: { title: string; children: any }) {
  const { title, children } = props;
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

interface IOtherProduct {
  productId: string;
}

export function CartPop(props: ICartPop) {
  const { showModal, setShowModal, productDetail } = props;
  const [needProtection, setNeedProtection] = useState(false);
  const [otherProductList, setOtherProductList] = useState(
    [] as IOtherProduct[]
  );

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
        <PhoneInfo
          {...productDetail}
          needProtection={needProtection}
          setNeedProtection={(value: any) => {
            setNeedProtection(value);
          }}
          isPeiJian={true}
        />
        {/*保险*/}
        <RenderProtection
          needProtection={needProtection}
          setNeedProtection={setNeedProtection}
        />
        {/*其他子商品*/}
        <RenderOtherProduct />
        {/*价格计算*/}
        {/*<ul className="price-list">*/}
        {/*  <li>*/}
        {/*    <label>Subtotal: </label>*/}
        {/*    <span>{currencyTrans(buyPrice)}</span>*/}
        {/*  </li>*/}
        {needProtection ? (
          <li>
            <label>Protection: </label>
            <span>{currencyTrans(protectPrice)}</span>
          </li>
        ) : null}
        {/*  <li className="protect">*/}
        {/*    <label>Total:</label>*/}
        {/*    <span>*/}
        {/*      {currencyTrans(*/}
        {/*        needProtection ? buyPrice + protectPrice : buyPrice*/}
        {/*      )}*/}
        {/*    </span>*/}
        {/*  </li>*/}
        {/*</ul>*/}
        <CheckOutButton
          productId={productDetail.productId}
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
        {/*<PayCardImages />*/}
      </div>
    </MyModal>
  );
}

function CheckOutButton(props: {
  productId: string;
  needProtection: boolean;
  otherProductList: IOtherProduct[];
  onClick: any;
}) {
  const { productId, needProtection, otherProductList } = props;
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextDispatch } = orderInfoContext as IOrderInfoContext;
  return (
    <button
      className="common-button"
      onClick={() => {
        const otherProductInfo = otherProductList.map(item => {
          return {
            productId: item.productId,
            needProtection: false
          };
        });
        // 1 他会xx
        orderInfoContextDispatch({
          type: orderInfoReducerTypes.addSubOrder,
          value: [{ productId, needProtection }].concat(otherProductInfo)
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
    <div onClick={cartChangeHandler}>
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
        productName={"90 Days"}
        productImage={protectionInfo.img}
        price={protectPrice}
      >
        {protectionInfo.content}
        <div>
          <a>Learn more</a>
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

function RenderOtherProduct() {
  return (
    <WithTitle title="Recommended accessories">
      商品list
      {/*<AddToCart*/}
      {/*  value={needProtection}*/}
      {/*  cartChangeCallBack={value => {*/}
      {/*    setNeedProtection(value);*/}
      {/*  }}*/}
      {/*/>*/}
    </WithTitle>
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
