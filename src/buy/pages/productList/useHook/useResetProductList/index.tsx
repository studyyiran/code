import {
  IProductListContext,
  ProductListContext,
  productListReducerActionTypes
} from "../../context";
import { useContext } from "react";

export default function useResetProductList() {
  const productListContext = useContext(ProductListContext);
  const {
    productListContextDispatch
  } = productListContext as IProductListContext;
  return () => {
    productListContextDispatch({
      type: productListReducerActionTypes.setPageNumber,
      value: "init"
    });
  };
}
