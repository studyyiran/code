import React, { useContext } from "react";
import "./index.less";
import { FilterItem } from "../filterItem";
import { ProductListContext, IProductListContext } from "../../context";
import CommonCollapse from "../../../../components/commonCollapse";
import { getFilterList } from "../../context/useGetAction";
import { isServer } from "../../../../common/utils/util";

export function FilterList() {
  const productListContext = useContext(ProductListContext);
  const {
    productListContextValue,
    setUserSelectFilter,
    willReplaceSEOUrl,
    getModelList
  } = productListContext as IProductListContext;
  const {
    currentFilterSelect,
    manufactureList,
    modelList,
    staticFilterList
  } = productListContextValue;
  const filterList = getFilterList({
    manufactureList,
    modelList,
    staticFilterList
  });
  return (
    <div className="filter-list">
      {/*<SearchProduct />*/}
      {/*<h2>Filters</h2>*/}
      {filterList.map((item, index) => {
        const { title, optionArr, allTitle, type, tag } = item;
        return (
          <CommonCollapse
            isActiveKey={isServer() ? index < 3 : index < 2}
            key={title}
            header={title ? title.toUpperCase() : ""}
          >
            <FilterItem
              tag={tag}
              type={type}
              currentSelectArr={currentFilterSelect.filter(
                (value: any) =>
                  value && value.id && value.id.indexOf(type) !== -1
              )}
              key={title}
              allTitle={allTitle}
              seoUrl={(id: string) =>
                willReplaceSEOUrl({
                  type,
                  id
                })
              }
              onSelectOption={(id: string) => {
                setUserSelectFilter({
                  type,
                  id
                });
              }}
              clickMoreHandler={type === "Model" ? getModelList : undefined}
              list={optionArr}
              render={({ id, displayName }: any) => {
                if (tag && tag.indexOf("ISCOLOR") !== -1) {
                  return (
                    <span
                      title={displayName}
                      className="circle"
                      style={{ background: id }}
                    />
                  );
                } else {
                  return displayName;
                }
              }}
            />
          </CommonCollapse>
        );
      })}
    </div>
  );
}
