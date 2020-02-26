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
      console.log(columnInfo);
      if (type === "detail") {
        if (columnIndex === 0) {
          return <div />;
        } else {
          return <RenderTopPart productInfo={columnInfo} />;
        }
      } else if (type === "Battery") {
        return null;
      } else {
        if (columnIndex === 0) {
          return <RenderTitleList>{title}</RenderTitleList>;
        } else {
          return <RenderListItem />;
        }
      }
    });
  };

  const renderMb = (rowInfo: any) => {
    const { type, title } = rowInfo;
    const columnArr = fillWithEmpty(4);
    return columnArr.map((columnInfo: any, columnIndex: number) => {
      if (type === "detail") {
        return <RenderTopPart productInfo={columnInfo} />;
      } else if (type === "Battery") {
        return null;
      } else {
        return null;
        return <RenderListItem />;
      }
    });
  };

  function renderList() {
    const configArr = [
      {
        type: "detail",
        title: "Price"
      },
      {
        type: "",
        title: "Price"
      },
      {
        type: "",
        title: "Condition"
      },
      {
        type: "",
        title: "Inspection Notes"
      },
      {
        type: "Battery",
        title: "Battery"
      },
      {
        type: "",
        title: "Color"
      },
      {
        type: "",
        title: "Manufacture"
      },
      {
        type: "",
        title: "Storage"
      },
      {
        type: "",
        title: "Carrier"
      },
      {
        type: "",
        title: "Phone Specs"
      }
    ];
    return configArr.map((rowInfo, rowIndex) => {
      return (
        <RenderByCondition
          ComponentPc={renderPc(rowInfo)}
          ComponentMb={renderMb(rowInfo)}
        />
      );
    });
    return compareInfoList.map((item, index) => {
      if (true && index === 0) {
        return (
          <>
            <CompareItem isTitleLine={true} key={"first"} />
            <CompareItem key={index} />
          </>
        );
      } else {
        return <CompareItem key={index} />;
      }
    });
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

const RenderTopPart = ({ productInfo }: { productInfo?: IProductDetail }) => {
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
          <button>Buy Now</button>
          <div>remove</div>
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

const RenderListItem = ({ children }: { children?: any }) => {
  if (children) {
    return <div className="grid-block">{children}</div>;
  } else {
    return <div className="grid-block empty" />;
  }
};
