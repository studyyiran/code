import { useContext } from "react";
import { IOrderInfoContext, OrderInfoContext } from "../../../context";
import { protectPrice } from "../../../../../common/config/staticConst";
import NP from "number-precision";
import { constProductType } from "../../../../../common/constValue";
import {
  IProductDetailContext,
  ProductDetailContext
} from "../../../../detail/context";
import { safeEqual } from "../../../../../common/utils/util";
export default function useGetTotalPrice(
  props?: any
): {
  totalProductPrice: () => number;
  totalProtections: () => number;
  calcTotalPrice: () => number;
  getShippingPrice: () => number;
} {
  // 获取物品价格信息
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue
  } = productDetailContext as IProductDetailContext;
  const { productDetailByCode, partsInfo } = productDetailContextValue;
  let productDetail =
    (productDetailByCode ? productDetailByCode.detail : ({} as any)) || {};
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextValue } = orderInfoContext as IOrderInfoContext;
  const { subOrders, taxInfo, userExpress, expressInfo } =
    orderInfoContextValue || props;
  function totalProductPrice() {
    let total = 0;

    subOrders.forEach(item => {
      const { productType, productId } = item;
      if (productType === constProductType.PRODUCT) {
        // 首先计算手机.// 从detail中获取值
        if (productDetail && productDetail.buyPrice) {
          total = total + Number(productDetail.buyPrice);
        }
      } else if (productType) {
        // 计算配件
        if (partsInfo) {
          const targetInfo = partsInfo.find(item =>
            safeEqual(item.buyProductId, productId)
          );
          if (targetInfo && targetInfo.buyPrice) {
            total += Number(targetInfo.buyPrice);
          }
        }
      }
    });
    return total;
  }
  function totalProtections() {
    let total = 0;
    const result = subOrders.some(({ needProtection }) => {
      return needProtection;
    });
    if (result) {
      total = NP.plus(total, Number(protectPrice));
    }
    return total;
  }
  function calcTotalPrice() {
    let total = 0;
    // 计算商品价格
    total = NP.plus(total, totalProductPrice());
    // 计算protecttion
    total = NP.plus(total, totalProtections());
    // 计算tax
    if (taxInfo && taxInfo.totalTax) {
      total = NP.plus(total, Number(taxInfo.totalTax));
    }
    // 计算shipping
    total = NP.plus(total, getShippingPrice());
    return Number(total);
  }
  function getShippingPrice() {
    if (expressInfo && expressInfo.length && userExpress) {
      const findTarget = expressInfo.find(item => {
        const { token } = item;
        return String(token) === String(userExpress);
      });
      if (findTarget && findTarget.totalFee) {
        return Number(findTarget.totalFee);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  return {
    totalProductPrice,
    totalProtections,
    getShippingPrice,
    calcTotalPrice
  };
}
