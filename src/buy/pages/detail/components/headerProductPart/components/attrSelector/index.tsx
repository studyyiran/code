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
import { getArrBySort } from "../util";

interface IProps {
  productDetailByCode: IProductDetailGetWithCode;
}

export const AttrSelector: React.FC<IProps> = ({ productDetailByCode }) => {
  const after = getArrBySort(productDetailByCode);
  function renderSelect(
    tags: string,
    selectItem: IChoiceMin,
    fatherName: string
  ) {
    // 区分种类
    const { choose, disabled, name, conditionPrice, colorCode, id } = selectItem;
    if (tags === "ISCOLOR") {
      //
      return (
        <div
          className={`select circle-select ${
            choose ? "circle-select-selected" : ""
          } ${disabled && !choose ? "disabled" : ""}`}
          style={{ backgroundColor: colorCode }}
        >
          {choose ? <Svg /> : null}
        </div>
      );
    } else if (fatherName === "Carrier") {
      const nameToImgUrl = () => {
        const nameToImgName = {
          "AT&T": "ATT",
          "Verizon": "Verizon",
          "T-Mobile": "Tmobile",
          "Sprint": "Sprint",
          "MetroPCS": "Metro",
          "Unlockeddelete": "Unlocked",
          "Othersdelete": "Others",
        }
        let imgName = nameToImgName[name];
        if (imgName) {
          let statusName = ''
          if (choose) {
            statusName = 'Active'
          } else {
            if (disabled) {
              statusName = 'Disabled'
            } else {
              statusName = 'Normal'
            }
          }
          return require(`./res/${imgName}/${statusName}.svg`)
        } else {
          return ""
        }
      }

      return (
        <div
          className={`select button-select ${
            choose ? "button-select-selected" : ""
          } ${disabled && !choose ? "disabled" : ""}`}
        >
          {nameToImgUrl() ? <img src={nameToImgUrl()} /> : name}
        </div>
      );
    } else {
      return (
        <div
          className={`select button-select ${
            choose ? "button-select-selected" : ""
          } ${disabled && !choose ? "disabled" : ""} ${
            fatherName === "Condition" ? "is-condition" : ""
          }`}
        >
          {name}
          {conditionPrice ? (
            <span className="green">{conditionPrice}</span>
          ) : null}
          {fatherName === "Condition" && disabled && !choose ? (
            <span>Sold Out</span>
          ) : null}
        </div>
      );
    }
  }
  const config = after.map(item => {
    const { name: fatherName, values, tags } = item;
    return {
      tags: tags,
      title: fatherName,
      currentSelectName: (values.find(item => {
        return item.choose === true;
      }) as any) ? (values.find(item => {
        return item.choose === true;
      }) as any).name : "",
      arr: values.map(selectItem => {
        const { name, choose, id, disabled } = selectItem;
        return {
          id,
          name,
          disabled,
          children: renderSelect(tags, selectItem, fatherName)
        };
      })
    };
  });
  return (
    <div className="attr-selector">
      {config.map(({ title, arr, currentSelectName, tags }) => {
        return (
          <RenderSelectList
            tags={tags}
            title={title}
            arr={arr}
            currentSelectName={currentSelectName}
          />
        );
      })}
    </div>
  );
};

interface IProps2 {
  currentSelectName: string;
  title: string;
  tags: string;
  arr: {
    id: string;
    name: string;
    disabled: boolean;
    children: any;
  }[];
}

export const RenderSelectList: React.FC<IProps2> = ({
  arr,
  title,
  tags,
  currentSelectName
}) => {
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    getProductDetailByIdAndCondition,
    resetProductInfo
  } = productDetailContext as IProductDetailContext;
  const { productDetailByCode } = productDetailContextValue;
  let productDetail = (productDetailByCode ? productDetailByCode.detail : {} as any) || {}
  const { buyProductCode } = productDetail;
  const [currentSelect, setCurrentSelect] = useState("");

  useEffect(() => {
    if (currentSelect) {
      // resetProductInfo();
      window.scrollTo(0, 0);
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
      setCurrentSelect("")
    }
  }, [
    buyProductCode,
    currentSelect,
    getProductDetailByIdAndCondition,
    resetProductInfo
  ]);

  // useEffect(() => {
  //   if (defaultSelect) {
  //     setCurrentSelect(defaultSelect);
  //   }
  // }, [defaultSelect]);
  return (
    <div className="select-list" data-iscolor={tags === "ISCOLOR"}>
      <h3 className="title">
        {title} : <span className="name">{currentSelectName}</span>
      </h3>
      <ul className="list-container">
        {arr.map(({ children, id, disabled, name }, index) => {
          return (
            <li
              title={tags === "ISCOLOR" ? name : ""}
              onClick={() => {
                if (!disabled) {
                  setCurrentSelect(id);
                }
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
