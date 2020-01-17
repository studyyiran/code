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
import {
  callBackWhenPassAllFunc,
  getProductListPath,
  isServer
} from "../../common/utils/util";
import { safeEqual } from "../../common/utils/util";

export default function ProductList(props: any) {
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

  let hehePathName = props && props.location ? props.location.pathname : "";
  // 根据选择设置title
  useEffect(() => {
    if (!isServer()) {
      const splitResult = hehePathName.split(getProductListPath());
      hehePathName = splitResult && splitResult[1] ? splitResult[1] : "";
      let paramsArr = hehePathName.split(/-|\//);
      if (paramsArr && paramsArr[0] === "") {
        paramsArr = paramsArr.slice(1);
      }
      const jsonArr = new Array(5)
        .fill("")
        .map((item, index) => {
          if (paramsArr && paramsArr[index]) {
            return paramsArr[index];
          } else {
            return "";
          }
        })
        .map((item: string) => {
          if (item.indexOf("all") === -1) {
            return item;
          } else {
            return "";
          }
        });
      // 分割后，应该最多有5个字符。
      const json = {
        brandName: jsonArr[0],
        productName: jsonArr[1],
        skuAttrNames: [jsonArr[2], jsonArr[3], jsonArr[4]]
      };
      // ssrTitle
      // 当有机型的时候
      const titleTemplete = `Buy Used REPLACE | Uptradeit.com`;
      let ssrTitle = "";
      if (json.productName) {
        if (json.skuAttrNames && json.skuAttrNames[0]) {
          ssrTitle = titleTemplete.replace(
            "REPLACE",
            `${json.productName.split(",")[0]} ${
              json.skuAttrNames[0].split(",")[0]
            }`
          );
        } else {
          ssrTitle = titleTemplete.replace(
            "REPLACE",
            `${json.productName.split(",")[0]}`
          );
        }
      } else {
        if (json.brandName) {
          ssrTitle = titleTemplete.replace(
            "REPLACE",
            `${json.brandName.split(",")[0]}`
          );
        }
      }
      ssrTitle = ssrTitle || "Buy Used Phones | UpTradeit.com";
      if (ssrTitle && document.title !== ssrTitle) {
        document.title = ssrTitle;
      }
    }
  }, []);

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

  function renderFilterByCondition() {
    return (
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
    );
  }

  function renderFilterCard() {
    return (
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
    );
  }

  return (
    <div className="product-list-page">
      <LoadingMask visible={pendingStatus} />
      {renderFilterByCondition()}
      <div className="list-part">
        <section className="title-part">
          <h1>Buy Used Phones</h1>
          <p>
            Buy used refurbished phones. Fully inspected, certified, data
            cleaned, and sanitized by UpTrade.
          </p>
        </section>
        <SearchProduct onClickSubmit={onClickSubmitHandler} />
        <QuickSelect />
        {renderFilterCard()}
        <section className="product-list-container">
          <RenderList productList={productList} />
        </section>
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
    return (
      <div style={{ marginBottom: "30px", marginTop: "20px" }}>
        Looks like we couldn't find what you were looking for. We are listing more phones to meet your needs.
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

function RenderList(props: { productList: any[] }): any {
  const { productList } = props;
  if (productList && productList.length) {
    const renderArr: any[] = [];
    let count = 0;
    productList.forEach((productInfo, index) => {
      if (index % 4 === 0 && index && count < 4) {
        renderArr.push(<AdLine line={count} key={"ad" + index} />);
        count++;
      }
      renderArr.push(
        <PhoneProductCard key={"phone" + index} {...productInfo} />
      );
    });
    return renderArr;
  } else {
    return null;
  }
}
