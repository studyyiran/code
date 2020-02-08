import React, { useEffect, useState } from "react";
import "./index.less";
import { safeEqual } from "../../../../../../common/utils/util";
import Svg from "../../../../../../components/svg";

interface IProps {}

export const AttrSelector: React.FC<IProps> = props => {
  const config = [
    {
      title: "Carrier",
      arr: [
        {
          name: "carrier1",
          renderSelect: () => {
            return <div className="button-select button-select-selected">carrier1</div>;
          },
          renderNotSelect: () => {
            return <div className="button-select">carrier1</div>;
          }
        },
        {
          name: "carrier2",
          renderSelect: () => {
            return <div className="button-select button-select-selected">carrier1</div>;
          },
          renderNotSelect: () => {
            return <div className="button-select">carrier1</div>;
          }
        },
        {
          name: "carrier3",
          renderSelect: () => {
            return <div className="button-select button-select-selected">carrier1</div>;
          },
          renderNotSelect: () => {
            return <div className="button-select">carrier1</div>;
          }
        }
      ]
    },
    {
      title: "Color",
      arr: [
        {
          name: "Color1",
          renderSelect: (info: any) => {
            return (
              <span className="circle-select circle-select-selected">
                <Svg />
              </span>
            );
          },
          renderNotSelect: () => {
            return <div className="circle-select"></div>;
          }
        },
        {
          name: "Color2",
          renderSelect: (info: any) => {
            return (
              <span className="circle-select selected">
                <Svg />
              </span>
            );
          },
          renderNotSelect: () => {
            return <div className="circle-select"></div>;
          }
        }
      ]
    }
  ];
  return (
    <div className="attr-selector">
      {config.map(({ title, arr }) => {
        return <RenderSelectList title={title} arr={arr} />;
      })}
    </div>
  );
};

interface IProps2 {
  defaultSelect?: number;
  title: string;
  arr: {
    name: string;
    renderSelect: any;
    renderNotSelect: any;
  }[];
}

export const RenderSelectList: React.FC<IProps2> = ({
  arr,
  title,
  defaultSelect
}) => {
  const [currentSelect, setCurrentSelect] = useState(0);

  useEffect(() => {
    if (defaultSelect) {
      setCurrentSelect(defaultSelect);
    }
  }, [defaultSelect]);
  return (
    <div className="select-list">
      <h3 className="title">
        {title} : <span className="name"> {arr[currentSelect].name}</span>
      </h3>
      <ul className="list-container">
        {arr.map(({ renderSelect, renderNotSelect }, index) => {
          return (
            <li
              className=""
              onClick={() => {
                setCurrentSelect(index);
              }}
            >
              {safeEqual(index, currentSelect)
                ? renderSelect()
                : renderNotSelect()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
