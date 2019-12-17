import React, { useContext, useState } from "react";
import PhoneInfo from "../phoneInfo";
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
import {protectPrice} from "../../../../common/config/staticConst";

interface ICartPop {
  showModal: boolean;
  setShowModal: any;
  productDetail: IProductDetail;
}

export function CartPop(props: ICartPop) {
  const { showModal, setShowModal, productDetail } = props;
  const [needProtection, setNeedProtection] = useState(false);
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
        <PhoneInfo
          {...productDetail}
          needProtection={needProtection}
          setNeedProtection={(value: any) => {
            setNeedProtection(value);
          }}
          isPeiJian={true}
        />
        <ul className="price-list">
          <li>
            <label>Subtotal: </label>
            <span>{currencyTrans(buyPrice)}</span>
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
                needProtection ? buyPrice + protectPrice : buyPrice
              )}
            </span>
          </li>
        </ul>
        <CheckOutButton
          productId={productId}
          needProtection={needProtection}
          isPeiJian={true}
          onClick={() => {
            setShowModal(false);
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
                  ]
                }
              }
            });
          }}
        />
        <PayCardImages />
      </div>
    </MyModal>
  );
}

function CheckOutButton(props: any) {
  const { productId, isPeiJian, needProtection } = props;
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextDispatch } = orderInfoContext as IOrderInfoContext;
  return (
    <button
      className="common-button"
      onClick={() => {
        // 1 他会xx
        orderInfoContextDispatch({
          type: orderInfoReducerTypes.addSubOrder,
          value: {
            productId,
            isPeiJian,
            needProtection
          }
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
