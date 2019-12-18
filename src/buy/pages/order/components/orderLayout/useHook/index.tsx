import { useContext } from "react";
import { IOrderInfoContext, OrderInfoContext } from "../../../context";
import { protectPrice } from "../../../../../common/config/staticConst";
import NP from "number-precision";
import { constProductType } from "../../../../../common/constValue";
import {
  IProductDetailContext,
  ProductDetailContext
} from "../../../../detail/context";
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
  const { productDetail, partsInfo } = productDetailContextValue;

  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextValue } = orderInfoContext as IOrderInfoContext;
  const { subOrders, taxInfo, userExpress, expressInfo } =
    orderInfoContextValue || props;
  function totalProductPrice() {
    let total = 0;
    // 首先计算手机.
    subOrders.forEach(item => {
      const { productType, productId } = item;
      if (productType !== constProductType.PRODUCT) {
        if (partsInfo) {
          total =
            total +
            partsInfo
              .map(({ buyPrice }) => buyPrice)
              .reduce((count, b) => count + Number(b), 0);
        }
      } else if (productType) {
        // 从detail中获取值
        if (productDetail) {
          total = total + Number(productDetail.buyPrice);
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
