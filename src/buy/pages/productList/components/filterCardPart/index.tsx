import React, { useContext } from "react";
import "./index.less";
import Svg from "../../../../components/svg";
import { IProductListContext, ProductListContext } from "../../context";
import RouterLink from "../../../../common-modules/components/routerLink";

export default function FilterCardPart(props: any) {
  const productListContext = useContext(ProductListContext);
  const {
    productListContextValue,
    setUserSelectFilter,
    findInfoById,
    willReplaceSEOUrl
  } = productListContext as IProductListContext;
  const { currentFilterSelect } = productListContextValue;
  const { onClick } = props;
  return (
    <ul className="filter-card-part" onClick={onClick}>
      {currentFilterSelect.map(({ id: typeAddId }) => {
        const [type, id] = typeAddId.split("-");
        const findArr: any = findInfoById(typeAddId);
        return (
          <li className="filter-card-part-item" key={typeAddId}>
            <span>{findArr[1] ? findArr[1].displayName : ""}</span>
            <RouterLink to={willReplaceSEOUrl({ type, id })}>
              <Svg
                onClick={() => {
                  setUserSelectFilter({ type, id });
                }}
                icon={"wrong"}
              />
            </RouterLink>
          </li>
        );
      })}
    </ul>
  );
}
