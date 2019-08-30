import React, { useEffect, useContext, useState } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import { HeaderTitle } from "@/components/headerTitle";

// interface IBrand {}

export default function Brand(props: any) {
  const [productId, setProductId] = useState("");
  const brandContext = useContext(SelectModelContext);
  
  const {
    selectModelContextValue,
    dispatch
  } = brandContext as ISelectModelContext;
  const { brandList, brand, productsList } = selectModelContextValue;
  console.log('render')
  console.log(productsList)
  function selectProductHandler(id: string) {
    setProductId(id);
  }
  useEffect(() => {
    if (productId) {
      
    }
  }, [productId])
  // canPost?
  useEffect(() => {
    if (productId) {
      // post
      dispatch({ type: "setBrand", value: productId });
    }
  }, [productId]);
  // canNext?
  useEffect(() => {
    if (productId && productId === brand) {
      props.goNextPage();
    }
  }, [brand, productId]);

  function renderList() {
    return productsList
      .sort((a: any, b: any) => {
        return 1
        // return a.order - b.order;
      })
      .map((item: any) => {
        const { name, id, imageUrl } = item;
        return (
          <li
            className="brand-icon-container"
            key={id}
            onClick={() => {
              selectProductHandler(id);
            }}
          >
            <img src={imageUrl} />
            <span>{name}</span>
          </li>
        );
      });
  }
  return (
    <div className="page-select-brand">
      <HeaderTitle title={"Model"} />
      <ul className="brand-list">{renderList()}</ul>
    </div>
  );
}
