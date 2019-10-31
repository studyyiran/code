import {
  IProductListContext,
  ProductListContext,
  productListReducerActionTypes
} from "../../context";
import { useContext } from "react";

export default function useResetProductList() {
  const productListContext = useContext(ProductListContext);
  const { resetPageNumber } = productListContext as IProductListContext;
  return resetPageNumber;
}
