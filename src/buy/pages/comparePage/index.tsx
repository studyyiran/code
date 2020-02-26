import React, { useContext, useEffect } from "react";
import "./index.less";
import { locationHref } from "../../common/utils/routerHistory";
import { StoreShoppingCartContext } from "../shoppingCartPage/context";
import { CompareItem } from "./components/compareItem";
import { RenderByCondition } from "../../components/RenderByCondition";
import Svg from "../../components/svg";
import { getLocationUrl } from "../../common/utils/util";
import { getDescArr } from "../detail/util";
import { IProductDetail } from "../detail/context/interface";

interface IProps {
  history?: any;
}

export const ComparePage: React.FC<IProps> = props => {
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    orderCompareGet,
    orderCompareDelete,
    storeShoppingCartContextValue
  } = storeShoppingCartContext;
  const { compareInfoList } = storeShoppingCartContextValue;
  useEffect(() => {
    orderCompareGet();
  }, [orderCompareGet]);
  const fillWithEmpty = (maxLength: number) => {
    const arr = [];
    for (let i = 0; i < maxLength; i++) {
      if (compareInfoList && compareInfoList[i]) {
        arr.push(compareInfoList[i]);
      } else {
        arr.push({});
      }
    }
    return arr;
  };

  const renderPc = (rowInfo: any) => {
    const { type, title } = rowInfo;
    const columnArr = [{}].concat(fillWithEmpty(4));
    return columnArr.map((columnInfo: any, columnIndex: number) => {
      if (type === "detail") {
        if (columnIndex === 0) {
          return <div />;
        } else {
          return (
            <RenderTopPart
              productInfo={columnInfo}
              orderCompareDelete={orderCompareDelete}
            />
          );
        }
      } else if (type === "Battery") {
        if (
          columnArr.find((item: any) => {
            return item.buyProductBatteryLife;
          })
        ) {
          if (columnIndex === 0) {
            return <RenderTitleList>{title}</RenderTitleList>;
          } else {
            return <RenderListItem rowInfo={rowInfo} columnInfo={columnInfo} />;
          }
        } else {
          return null;
        }
      } else {
        if (columnIndex === 0) {
          return <RenderTitleList>{title}</RenderTitleList>;
        } else {
          return <RenderListItem rowInfo={rowInfo} columnInfo={columnInfo} />;
        }
      }
    });
  };

  const renderMb = (rowInfo: any) => {
    const { type, title } = rowInfo;
    const columnArr = fillWithEmpty(4);
    return columnArr.map((columnInfo: any, columnIndex: number) => {
      if (type === "detail") {
        return (
          <RenderTopPart
            productInfo={columnInfo}
            orderCompareDelete={orderCompareDelete}
          />
        );
      }
      if (compareInfoList && compareInfoList.length) {
        if (type === "Battery") {
          if (
            columnArr.find((item: any) => {
              return item.buyProductBatteryLife;
            })
          ) {
            if (columnIndex === 0) {
              return <RenderTitleList>{title}</RenderTitleList>;
            } else {
              return <RenderListItem rowInfo={rowInfo} columnInfo={columnInfo} />;
            }
          } else {
            return null;
          }
        } else {
          return <RenderListItem rowInfo={rowInfo} columnInfo={columnInfo} />;
        }
      } else {
        return null
      }
      
    });
  };

  function renderList() {
    const configArr = [
      {
        type: "detail",
        title: "",
        key: ""
      },
      {
        type: "",
        title: "Price",
        key: "buyPrice"
      },
      {
        type: "",
        title: "Condition",
        key: "buyLevel"
      },
      {
        type: "",
        title: "Inspection Notes",
        key: "buyProductRemark"
      },
      {
        type: "Battery",
        title: "Battery",
        key: "buyProductBatteryLife"
      },
      {
        type: "",
        title: "Manufacture",
        key: "brandDisplayName"
      }
    ];
    if (compareInfoList && compareInfoList.length) {
      if (compareInfoList && compareInfoList[0]) {
        const { buyProductBQV } = compareInfoList[0];
        buyProductBQV.forEach(({ bpName, bpvName }: any, index: number) => {
          configArr.push({
            type: "",
            title: bpName,
            key: "buyProductBQV",
            valueIndex: String(index)
          } as any);
        });
      }
      configArr.push({
        type: "productDescription",
        title: "Phone Specs",
        key: "productDescription"
      });
      configArr.push({
        type: "",
        title: "Functional Test",
        key: "FunctionalTest"
      });
      return configArr.map((rowInfo, rowIndex) => {
        return (
          <RenderByCondition
            ComponentPc={renderPc(rowInfo)}
            ComponentMb={renderMb(rowInfo)}
          />
        );
      });
    } else {
      configArr.push({
        type: "productDescription",
        title: "Phone Specs",
        key: "productDescription"
      });
      return configArr.map((rowInfo, rowIndex) => {
        return (
          <RenderByCondition
            ComponentPc={renderPc(rowInfo)}
            ComponentMb={renderMb(rowInfo)}
          />
        );
      });
    }
  }
  return (
    <div className="compare-page">
      <div className="title-container">
        <h1>Comparison Chart</h1>
      </div>
      <div className="compare-item-list-container">{renderList()}</div>
      <div
        className="go-back-button"
        onClick={() => {
          locationHref("", "back");
        }}
      >
        <img src={require("./res/arrow_left.svg")} />
        <span>Back to shopping cart</span>
      </div>
    </div>
  );
};

const RenderTopPart = ({
  productInfo,
  orderCompareDelete
}: {
  productInfo?: IProductDetail;
  orderCompareDelete: any;
}) => {
  if (productInfo && productInfo.buyProductCode) {
    const {
      buyProductBQV,
      productDisplayName,
      buyLevel,
      buyProductCode
    } = productInfo;
    const renderInfoLine = () => {
      const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
      return (
        <div className="content-container">
          {lineOne ? (
            <div className="price-container">
              <h2>{lineOne}</h2>
            </div>
          ) : null}
          {lineTwo ? <span className="attr">{lineTwo}</span> : null}
          <span className="condition">Condition {buyLevel}</span>
          <span className="id">Product ID: #{buyProductCode}</span>
        </div>
      );
    };
    return (
      <div className="render-top-part">
        <div className="swiper-part">{renderInfoLine()}</div>
        <div className="button-container">
          <button className="common-button">Buy Now</button>
          <div
            className="remove"
            onClick={() => {
              orderCompareDelete(buyProductCode);
            }}
          >
            Remove
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="render-top-part">
        <div
          className="swiper-part empty"
          onClick={() => {
            locationHref(getLocationUrl("shoppingcart"));
          }}
        >
          <Svg icon="jia" />
          <span>Add Device</span>
        </div>
        <div className="button-container empty" />
      </div>
    );
  }
};

const RenderTitleList = ({ children }: { children?: any }) => {
  return <div className="title grid-block">{children}</div>;
};

const RenderListItem = (props: any) => {
  const { rowInfo, columnInfo } = props;
  const renderBy = (value: string) => {
    return (
      <RenderByCondition ComponentPc={null} ComponentMb={<div>{value}</div>} />
    );
  };
  if (
    rowInfo &&
    rowInfo.key === "FunctionalTest" &&
    columnInfo &&
    columnInfo.buyProductCode
  ) {
    return <div className={"grid-block"}>All Pass</div>;
  }
  if (columnInfo && rowInfo && rowInfo.key && columnInfo[rowInfo.key]) {
    const value =
      rowInfo && rowInfo.key === "buyProductBQV"
        ? columnInfo[rowInfo.key][Number(rowInfo.valueIndex)].bpvName
        : columnInfo[rowInfo.key];
    if (value) {
      if (rowInfo && rowInfo.key === "productDescription") {
        return (
          <div className={"grid-block"}>
            {renderBy(rowInfo.title)}
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        );
      }
      return (
        <div className="grid-block">
          {renderBy(rowInfo.title)}
          <div>{value}</div>
        </div>
      );
    }
  }
  return <div className="grid-block">{renderBy(rowInfo && rowInfo.title)}</div>;
};
