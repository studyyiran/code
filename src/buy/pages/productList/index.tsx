import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { callBackWhenPassAllFunc } from "../../common/utils/util";
import { safeEqual } from "../../common/utils/util";

const ProductList = React.memo(
  function ProductList() {
    const productListContext = useContext(ProductListContext);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const {
      productListContextValue,
      getStaticFilterList,
      useClientRepair,
      getManufactureList,
      getProductList
    } = productListContext as IProductListContext;
    const {
      productList,
      pendingStatus,
      manufactureList,
      staticFilterList
    } = productListContextValue;
    useClientRepair(productListSsrRule);

    useEffect(() => {
      // 在当前页面 没有值
      callBackWhenPassAllFunc(
        [() => !staticFilterList || !staticFilterList.length],
        getStaticFilterList
      );
    }, [getStaticFilterList, staticFilterList]);

    useEffect(() => {
      // 在当前页面 没有值
      callBackWhenPassAllFunc(
        [() => !manufactureList || !manufactureList.length],
        getManufactureList
      );
    }, [getManufactureList, manufactureList]);

    // 只要仅在当前页面调用 就应该放在当前页面.
    useEffect(() => {
      getProductList();
    }, [getProductList]);

    function renderList() {
      if (productList && productList.length) {
        let count = 0;
        return productList.map((productInfo, index) => {
          if (index % 4 === 0 && index && count < 4) {
            count++;
            console.log(count - 1)
            return <AdLine line={count - 1} key={'ad' + index} />
          }
          return<PhoneProductCard key={'phone' + index} {...productInfo} />
        });
      } else {
        return null;
      }
    }
    function onClickSubmitHandler(searchValues: any) {
      try {
        if (productListContextValue.currentFilterSelect) {
          const userInputTarget = productListContextValue.currentFilterSelect
            .filter((userInput: any) => {
              return (
                userInput &&
                userInput.id &&
                userInput.id.indexOf("attrOf2-") !== -1
              );
            })
            .map((userInput: any) => {
              return userInput.id.split("attrOf2-")
                ? userInput.id.split("attrOf2-")[1]
                : "";
            });
          if (
            productListContextValue.staticFilterList &&
            userInputTarget &&
            userInputTarget.length
          ) {
            const carrierTarget = productListContextValue.staticFilterList.find(
              (item: any) => {
                return item.bpDisplayName === "Carrier";
              }
            );
            const answer: string[] = [];
            if (carrierTarget) {
              const { bqvList } = carrierTarget;
              if (bqvList && bqvList.length) {
                bqvList.forEach((item2: any) => {
                  return userInputTarget.forEach((item3: any) => {
                    if (safeEqual(item2.bpvId, item3)) {
                      answer.push(item2.bpvDisplayName);
                    }
                  });
                });
              }
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    const timeKey = useMemo(() => {
      return Date.now();
    }, []);
    
    return (
      <div className="product-list-page" key={timeKey}>
        <LoadingMask visible={pendingStatus} />
        {/*<RenderByCondition*/}
        {/*  ComponentServer={*/}
        {/*    <ul>*/}
        {/*      <a href={"/buy-phone/Apple"}>Apple</a>*/}
        {/*      <a href={"/buy-phone/apple/iphone8plus"}>iphone8plus</a>*/}
        {/*      <a href={"/buy-phone/samsung"} style={{ display: "none" }}>*/}
        {/*        samsung*/}
        {/*      </a>*/}
        {/*      <a*/}
        {/*        href={"/buy-phone/samsung/galaxys10plus"}*/}
        {/*        style={{ visibility: "hidden" }}*/}
        {/*      >*/}
        {/*        galaxys10plus*/}
        {/*      </a>*/}
        {/*    </ul>*/}
        {/*  }*/}
        {/*/>*/}
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
          <SearchProduct onClickSubmit={onClickSubmitHandler} />
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
  },
  () => {
    return true;
  }
);
export default ProductList;
function RenderFooter() {
  const productListContext = useContext(ProductListContext);
  const {
    productListContextValue,
    productListContextDispatch
  } = productListContext as IProductListContext;
  const { productList, haveMore } = productListContextValue;
  if (productList.length === 0) {
    return (
      <div style={{ marginBottom: "30px", marginTop: "20px" }}>
        Looks like we couldn't find what you were looking for.
      </div>
    );
  } else {
    if (haveMore) {
      return (
        <div
          className="load-more-button tips-button"
          onClick={() => {
            productListContextDispatch({
              type: productListReducerActionTypes.setPageNumber
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
