import React, { useContext, useEffect, useRef, useState } from "react";
import Svg from "../svg";
import "./index.less";
import { Icon, Button, Input, AutoComplete } from "antd";
import {
  IProductListContext,
  ProductListContext
} from "../../pages/productList/context";
import { RenderByCondition } from "../RenderByCondition";
import { debounce } from "../../common/utils/util";

export default function SearchProduct(props: any) {
  const productListContext = useContext(ProductListContext);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const {
    getDropDownInfo,
    setSearchInfo,
    productListContextValue
  } = productListContext as IProductListContext;
  let { placeholder } = props;
  placeholder = placeholder
    ? placeholder
    : "Search phone manufacturer and model";

  const { searchInfo } = productListContextValue;
  useEffect(() => {
    setSearchValue(getValue());
  }, [searchInfo.productKey]);
  // 用户选中了某一个机型
  function onSelect(value: any) {
    console.log("onSelect", value);
    const target: any = list.find((item: any) => {
      return String(item.productBrandName) === String(value);
    });
    setSearchInfo({
      productId: target.productId,
      productKey: target.productBrandName
    });
  }
  // 用户输入文字后,自动触发一次搜索行为
  function handleSearchInner(value: string) {
    console.log("handleSearch");
    getDropDownInfo(value).then((res: any) => {
      if (res && res.length) {
        setList(res);
      } else {
        setList([]);
      }
    });
  }
  const handleSearch = debounce(handleSearchInner, 300);
  // 用户输入了文字,自动保存当前的输入.
  function onChangeHandler(value: string) {
    console.log("onchange");
    // 不需要每次都修改.只需要search的时候修改
    // setSearchInfo({
    //   productKey: [value]
    // });
    setSearchValue(value);
  }

  function getValue() {
    if (searchInfo && searchInfo.productKey && searchInfo.productKey.length) {
      console.log("set value");
      return (searchInfo.productKey as any).join(" ");
    } else {
      return "";
    }
  }
  function searchHandler() {
    // 愚蠢的缓存
    setSearchInfo({
      productKey: searchValue
    });
    if (props && props.onClickSubmit) {
      props.onClickSubmit();
    }
  }
  return (
    <RenderByCondition
      ComponentMb={
        <div className="search-product-container mb">
          <AutoComplete
            className="certain-category-search"
            size="large"
            style={{ width: "100%" }}
            dataSource={list.map(
              ({ productBrandName }: any) => productBrandName
            )}
            onSelect={onSelect}
            onSearch={handleSearch}
            onChange={(value: any) => {
              onChangeHandler(value);
            }}
            // defaultValue={getValue()}
            value={searchValue}
            placeholder={placeholder}
            // optionLabelProp="text"
          >
            <Input
              suffix={
                <Svg
                  onPressEnter={searchHandler}
                  icon="wrong"
                  onClick={(e: any) => {
                    // 清空
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchInfo({
                      productKey: ""
                    });
                  }}
                />
              }
            />
          </AutoComplete>
          <Icon type="search" onClick={searchHandler} />
        </div>
      }
      ComponentPc={
        <div className="search-product-container">
          <AutoComplete
            className="certain-category-search"
            size="large"
            style={{ width: "100%" }}
            dataSource={list.map(
              ({ productBrandName }: any) => productBrandName
            )}
            onSelect={onSelect}
            onSearch={handleSearch}
            onChange={(value: any) => {
              onChangeHandler(value);
            }}
            // defaultValue={getValue()}
            value={searchValue}
            placeholder={placeholder}
            // optionLabelProp="text"
          >
            <Input
              onPressEnter={searchHandler}
              suffix={
                <Svg
                  icon="wrong"
                  onClick={(e: any) => {
                    // 清空
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchInfo({
                      productKey: ""
                    });
                  }}
                />
              }
            />
          </AutoComplete>
          <div className="common-button" onClick={searchHandler}>
            Search
          </div>
        </div>
      }
    />
  );
}
