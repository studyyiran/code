import React, { useContext, useEffect } from "react";
import "./index.less";
import { locationHref } from "../../common/utils/routerHistory";
import { StoreShoppingCartContext } from "../shoppingCartPage/context";
import { CompareItem } from "./components/compareItem";
import { RenderByCondition } from "../../components/RenderByCondition";

interface IProps {
  history?: any;
}

export const ComparePage: React.FC<IProps> = props => {
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    getCompareInfoList,
    storeShoppingCartContextValue
  } = storeShoppingCartContext;
  const { compareInfoList } = storeShoppingCartContextValue;
  useEffect(() => {
    getCompareInfoList();
  }, [getCompareInfoList]);

  const renderTopPart = () => {
    return <div>
      <div>swiper part</div>
      <button>Buy Now</button>
      <div>remove</div>
    </div>
  }

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
    const columnArr = [{}].concat(fillWithEmpty(4))
    return columnArr.map((columnInfo: any, columnIndex: number) => {
      if (type === 'detail') {
        if (columnIndex === 0) {
          return <div />
        } else {
          return renderTopPart()
        }
      } else {
        if (columnIndex === 0) {
          return <RenderTitleList>{title}</RenderTitleList>
        } else {
          return <RenderListItem>{title}</RenderListItem>
        }
      }
    })
  };

  const renderMb = (rowInfo: any) => {
    const { type, title } = rowInfo;
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
      <div className="content">
        <div className="compare-item-list-container">{renderList()}</div>
      </div>
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

const RenderTitleList = ({children}: { children: any }) => {
  return <div>{children}</div>
};

const RenderListItem = ({children}: { children: any }) => {
  return <div>{children}</div>
};
