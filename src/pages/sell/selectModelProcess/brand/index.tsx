import React, { useEffect, useContext } from "react";
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
  const { brandList } = selectModelContextValue;
  useEffect(() => {
    console.log("dispatch");
    dispatch({ type: "setCategoryId", value: "1" });
  }, []);
  function selectBrandHandler(id: string) {
    dispatch({ type: "setBrand", value: id });
    // props.canGoNext() && props.goNextPage();
  }
  function renderList() {
    return brandList.map((item: any) => {
      const { name, id } = item;
      return (
        <li className={}>
          <div
            key={id}
            onClick={() => {
              selectBrandHandler(id);
            }}
          >
            {name}
          </div>
        </li>
      );
    });
  }
  return (
    <div className="brand">
      <HeaderTitle title={"Select a manufacturer"} />
      <ul className="barnd-list">{renderList()}</ul>
    </div>
  );
}
