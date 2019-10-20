import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import FilterCardPart from "./components/filterCardPart";
import {
  ProductListContext,
  IProductListContext,
  productListReducerActionTypes
} from "./context";
import { FilterList } from "./components/filsterList";
import { QuickSelect } from "./components/quickSelect";
import PhoneProductCard from "./components/phoneProductCard";
import { RenderByCondition } from "../../components/RenderByCondition";
import SearchProduct from "../../components/SearchProduct";
import Modal from "../../components/modal";
import AdLine from "./components/adLine";
import LoadingMask from "./components/loading";
import { productListSsrRule } from "./ssr";

export default function ProductList(props: any) {
  const productListContext = useContext(ProductListContext);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const {
    productListContextValue,
    getStaticFilterList,
    useHehe
  } = productListContext as IProductListContext;
  const { productList, pendingStatus } = productListContextValue;
  useHehe(productListSsrRule);
  // 进入界面.请求静态属性filterList
  useEffect(() => {
    getStaticFilterList();
  }, []);

  function renderList() {
    if (productList && productList.length) {
      const renderArr: any[] = [];
      let count = 0;
      productList.forEach((productInfo, index) => {
        if (index % 4 === 0 && index && count < 4) {
          renderArr.push(<AdLine line={count} />);
          count++;
        }
        renderArr.push(
          <PhoneProductCard {...productInfo} history={props.history} />
        );
      });
      return renderArr;
    } else {
      return null;
    }
  }
  return (
    <div className="product-list-page">
      <LoadingMask visible={pendingStatus} />
      <RenderByCondition
        ComponentMb={
          <Modal
            width={"6rem"}
            style={showModal2 ? { left: "-3px" } : {}}
            visible={showModal}
            title={""}
            className="product-list-filter-mb"
            maskClosable={true}
            footer={false}
            needDefaultScroll={true}
            closable={false}
            onCancel={() => {
              setShowModal2(false);
              setTimeout(() => {
                setShowModal(false);
              }, 250);
            }}
          >
            <FilterList />
          </Modal>
        }
        ComponentPc={<FilterList />}
      />
      <div className="list-part">
        <section className="title-part">
          <h1>Buy Used Phones</h1>
          <p>
            Buy used refurbished phones. Fully inspected, certified, data
            cleaned, and sanitized by UpTrade.{" "}
          </p>
        </section>
        <SearchProduct />
        <QuickSelect />
        <RenderByCondition
          ComponentMb={
            <div className="filter-part-mb">
              <div className="img-container">
                <img
                  src={require("./res/mb-filter.png")}
                  onClick={() => {
                    setShowModal(true);
                    setTimeout(() => {
                      setShowModal2(true);
                    }, 50);
                  }}
                />
              </div>
              <FilterCardPart />
            </div>
          }
          ComponentPc={<FilterCardPart />}
        />
        <section className="product-list-container">{renderList()}</section>
        <RenderFooter />
      </div>
    </div>
  );
}

function RenderFooter() {
  const productListContext = useContext(ProductListContext);
  const {
    productListContextValue,
    productListContextDispatch
  } = productListContext as IProductListContext;
  const { productList, haveMore } = productListContextValue;
  if (productList.length === 0) {
    return <div>Looks like we couldn't find what you were looking for.</div>;
  } else {
    if (haveMore) {
      return (
        <div
          className="load-more-button tips-button"
          onClick={() => {
            productListContextDispatch({
              type: productListReducerActionTypes.setPageNumber,
              value: 1
            });
          }}
        >
          Load More
        </div>
      );
    } else {
      return <div className="no-more-data tips-button">No more data</div>;
    }
  }
}
