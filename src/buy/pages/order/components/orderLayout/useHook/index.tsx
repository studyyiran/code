import { useContext } from "react";
import { IOrderInfoContext, OrderInfoContext } from "../../../context";
import { protectPrice } from "../../../../../common/config/staticConst";

export default function useGetTotalPrice(): {
  totalProductPrice: () => number;
  totalProtections: () => number;
  calcTotalPrice: () => number;
  getShippingPrice: () => number;
} {
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextValue } = orderInfoContext as IOrderInfoContext;
  const {
    subOrders,
    phoneDetailList,
    taxInfo,
    userExpress,
    expressInfo
  } = orderInfoContextValue;
  function totalProductPrice() {
    let total = 0;
    phoneDetailList.forEach((item: any) => {
      if (item && item.buyPrice) {
        total += Number(item.buyPrice);
      }
    });
    return total;
  }
  function totalProtections() {
    let total = 0;
    subOrders.forEach(({ needProtection }) => {
      if (needProtection) {
        total += protectPrice;
      }
    });
    return total;
  }
  function calcTotalPrice() {
    let total = 0;
    // 计算商品价格
    total += totalProductPrice();
    // 计算protecttion
    total += totalProtections();
    // 计算tax
    if (taxInfo && taxInfo.totalTax) {
      total += Number(taxInfo.totalTax);
    }
    // 计算shipping
    total += getShippingPrice();
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
