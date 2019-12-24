import { FilterItem } from "../filterItem";
import React, { useContext } from "react";
import { IProductListContext, ProductListContext } from "../../context";
import "./index.less";

export function QuickSelect(props: any) {
  const productListContext = useContext(ProductListContext);
  const {
    productListContextValue,
    setUserSelectFilter,
    getFilterList,
    willReplaceSEOUrl
  } = productListContext as IProductListContext;
  const { currentFilterSelect, staticFilterList } = productListContextValue;
  const quickFilterTarget =
    getFilterList().find(({ tag = "" }) => {
      return tag.indexOf("QUICKFILTERBUY") !== -1;
    }) || ({} as any);
  let quickFilterList = quickFilterTarget.optionArr;
  return (
    <div className="quick-select">
      <FilterItem
        seoUrl={(id: string) =>
          willReplaceSEOUrl({
            type: quickFilterTarget.type,
            id
          })
        }
        list={quickFilterList}
        onSelectOption={(id: string) => {
          setUserSelectFilter({
            type: quickFilterTarget.type,
            id
          });
        }}
        currentSelectArr={currentFilterSelect.filter(({ id }) => {
          return id.indexOf(quickFilterTarget.type) !== -1;
        })}
        render={({ id, displayName }: any) => (
          <div className="select-button">{displayName}</div>
        )}
      />
    </div>
  );
}
