import React, { useEffect, useContext, useState } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import { HeaderTitle } from "components/headerTitle";

// interface IBrand {}

export default function Brand(props: any) {
  // 这个ts为什么带不过来？先别管，先撸。
  const brandContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch
  } = brandContext as ISelectModelContext;
  const { brandList, brand } = selectModelContextValue;
  const [currentSelectBrand, setCurrentSelectBrand] = useState("");
  function selectBrandHandler(id: string) {
    setCurrentSelectBrand(id);
  }
  useEffect(() => {
    document.title = "Sell My Phone | UpTradeit.com"
  }, [])
  // canPost?
  useEffect(() => {
    if (currentSelectBrand) {
      // post
      selectModelContextDispatch({
        type: "setBrand",
        value: currentSelectBrand
      });
    }
  }, [currentSelectBrand]);
  // canNext?
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
        const { displayName: name, id, goodLogo: iconUrl } = item;
        return (
          <li
            className="brand-icon-container canclick"
            key={id}
            onClick={() => {
              selectBrandHandler(id);
            }}
          >
            <div className="img-container">
              <img src={iconUrl} />
            </div>
          </li>
        );
      });
  }
  return (
    <div className="page-select-brand">
      <ul className="brand-list">{renderList()}</ul>
    </div>
  );
}
