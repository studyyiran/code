import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { safeEqual } from "../../../../../../common/utils/util";
import Svg from "../../../../../../components/svg";
import {
  IChoice,
  IChoiceMin,
  IProductDetailGetWithCode
} from "../../../../context/interface";
import {
  IProductDetailContext,
  ProductDetailContext
} from "../../../../context";

interface IProps {
  productDetailByCode: IProductDetailGetWithCode;
}

export const AttrSelector: React.FC<IProps> = ({ productDetailByCode }) => {
  // 首先要排序.
  // 1 先找出quick
  const findQuickIndex = productDetailByCode.attributes.findIndex(item => {
    return item.tags === "QUICKFILTERBUY";
  });
  let after = [];
  if (findQuickIndex === -1) {
    after = [
      productDetailByCode.condition,
      ...productDetailByCode.attributes.sort((a, b) => {
        return a.sort - b.sort;
      })
    ];
  } else {
    after = [
      productDetailByCode.attributes[findQuickIndex],
      productDetailByCode.condition,
      ...productDetailByCode.attributes
        .filter((item, index) => {
          return item.tags !== "QUICKFILTERBUY";
        })
        .sort((a, b) => {
          return a.sort - b.sort;
        })
    ];
  }
  function renderSelect(tags: string, selectItem: IChoiceMin) {
    // 区分种类
    const { choose, disabled, name, conditionPrice, colorCode } = selectItem;
    if (tags === "ISCOLOR") {
      if (choose) {
        return (
          <div className="circle-select circle-select-selected">
            <Svg />
          </div>
        );
      } else {
        return (
          <div
            className="circle-select"
            style={{ backgroundColor: colorCode }}
          ></div>
        );
      }
    } else {
      return (
        <div
          className={`button-select ${choose ? "button-select-selected" : ""} ${
            disabled && !choose ? "disabled" : ""
          }`}
        >
          {name}
          {conditionPrice ? (
            <span className="green">From ${conditionPrice}</span>
          ) : null}
        </div>
      );
    }
  }
  console.log(after);
  const config = after.map(item => {
    const { name, values, tags } = item;
    return {
      title: name,
      currentSelectName: (values.find(item => {
        return item.choose === true;
      }) as any).name,
      arr: values.map(selectItem => {
        const { name, choose, id } = selectItem;
        return {
          id,
          name,
          children: renderSelect(tags, selectItem)
        };
      })
    };
  });
  console.log(config);
  return (
    <div className="attr-selector">
      {config.map(({ title, arr, currentSelectName }) => {
        return <RenderSelectList title={title} arr={arr} currentSelectName={currentSelectName} />;
      })}
    </div>
  );
};

interface IProps2 {
  currentSelectName: string;
  title: string;
  arr: {
    id: string;
    name: string;
    children: any;
  }[];
}

export const RenderSelectList: React.FC<IProps2> = ({
  arr,
  title,
  currentSelectName
}) => {
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    getProductDetailByIdAndCondition
  } = productDetailContext as IProductDetailContext;
  const { productDetail } = productDetailContextValue;
  const { buyProductCode } = productDetail;
  const [currentSelect, setCurrentSelect] = useState("");

  useEffect(() => {
    if (currentSelect) {
      if (!isNaN(Number(currentSelect))) {
        getProductDetailByIdAndCondition({
          buyProductCode: buyProductCode,
          skuBasicPropertyValueId: currentSelect
        });
      } else {
        getProductDetailByIdAndCondition({
          buyProductCode: buyProductCode,
          condition: currentSelect
        });
      }
    }
  }, [currentSelect]);

  // useEffect(() => {
  //   if (defaultSelect) {
  //     setCurrentSelect(defaultSelect);
  //   }
  // }, [defaultSelect]);
  return (
    <div className="select-list">
      <h3 className="title">
        {title} : <span className="name">{currentSelectName}</span>
      </h3>
      <ul className="list-container">
        {arr.map(({ children, id }, index) => {
          return (
            <li
              onClick={() => {
                setCurrentSelect(id);
              }}
            >
              {children}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
