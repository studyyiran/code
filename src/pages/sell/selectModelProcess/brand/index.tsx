import React, { useEffect, useContext } from "react";
import sellServer from "../server";
import { SelectModelContext, ISelectModelContext } from "../context";

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
    getBrandList();
  }, [getBrandList]);
  function selectBrandHandler(id: string) {
    dispatch({type: 'setBrand', value: id});
    // props.canGoNext() && props.goNextPage();
  }
  function renderList() {
    return brandList.map((item: any) => {
      const {name, id} = item
      return (
        <div
          key={id}
          onClick={() => {
            selectBrandHandler(id);
          }}
        >
          {name}
        </div>
      );
    })
  }
  return <div>{renderList()}</div>;
}
