import React, { useContext } from "react";
import "./index.less";
import { FilterItem } from "../filterItem";
import { ProductListContext, IProductListContext } from "../../context";
import CommonCollapse from "../../../../components/commonCollapse";

export function FilterList() {
  const productListContext = useContext(ProductListContext);
  const {
    productListContextValue,
    getFilterList,
    setUserSelectFilter
  } = productListContext as IProductListContext;
  const { currentFilterSelect } = productListContextValue;
  const filterList = getFilterList();
  return (
    <div className="filter-list">
      {/*<SearchProduct />*/}
      {/*<h2>Filters</h2>*/}
      {filterList.map((item, index) => {
        const {
          title,
          clickMoreHandler,
          optionArr,
          allTitle,
          type,
          tag
        } = item;
        return (
          <CommonCollapse
            isActiveKey={index < 2}
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
              onSelectOption={(id: string) => {
                setUserSelectFilter({
                  type,
                  id
                });
              }}
              clickMoreHandler={clickMoreHandler ? clickMoreHandler : null}
              list={optionArr}
              render={({ id, displayName }: any) => {
                if (tag && tag.indexOf("ISCOLOR") !== -1) {
                  return <span className="circle" style={{ background: id }} />;
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
