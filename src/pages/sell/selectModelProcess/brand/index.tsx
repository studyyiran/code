import React, { useEffect, useContext, useState } from "react";
import "./index.less";
import sellServer from "../server";
import { SelectModelContext, ISelectModelContext } from "../context";
import { HeaderTitle } from "@/components/headerTitle";

// interface IBrand {}

export default function Brand(props: any) {
  const brandContext = useContext(SelectModelContext);
  console.log(brandContext);
  const {
    getBrandList,
    selectModelContextValue,
    dispatch
  } = brandContext as ISelectModelContext;
  const { brandList, brand } = selectModelContextValue;
  const [currentSelectBrand, setCurrentSelectBrand] = useState("");
  function selectBrandHandler(id: string) {
    setCurrentSelectBrand(id);
    dispatch({ type: "setBrand", value: id });
    // props.canGoNext() && props.goNextPage();
  }
  useEffect(() => {
    console.log("dispatch");
    dispatch({ type: "setCategoryId", value: "1" });
    return () => {
      console.log('will un mount')
    }
  }, []);
  useEffect(() => {
    if (currentSelectBrand && currentSelectBrand === brand) {
      props.goNextPage();
    }
  }, [brand, currentSelectBrand]);
  function renderList() {
    return brandList
      .filter((item, index) => {
        return index < 6;
      })
      .sort((a: any, b: any) => {
        return a.order - b.order;
      })
      .map((item: any) => {
        const { name, id, iconUrl } = item;
        console.log(item);
        return (
          <li
            className="brand-icon-container"
            key={id}
            onClick={() => {
              selectBrandHandler(id);
            }}
          >
            <img src={iconUrl} />
          </li>
        );
      });
  }
  return (
    <div className="page-select-brand">
      <HeaderTitle title={"Select a manufacturer"} />
      <ul className="brand-list">{renderList()}</ul>
    </div>
  );
}
