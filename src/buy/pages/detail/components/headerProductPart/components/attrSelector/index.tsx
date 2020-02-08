import React, { useEffect, useState } from "react";
import "./index.less";
import { safeEqual } from "../../../../../../common/utils/util";
import Svg from "../../../../../../components/svg";

interface IProps {}

export const AttrSelector: React.FC<IProps> = props => {
  const config = [
    {
      title: "Carrier",
      arr: new Array(6).fill(1).map((item, index) => {
        return {
          name: "carrier" + index,
          renderSelect: () => {
            return (
              <div className="button-select button-select-selected">
                carrier{index}
              </div>
            );
          },
          renderNotSelect: () => {
            return <div className="button-select">carrier{index}</div>;
          }
        };
      })
    },
    {
      title: "Condition5",
      arr: new Array(4).fill(1).map((item, index) => {
        return {
          name: "Condition" + index,
          renderSelect: () => {
            return (
              <div className="button-select button-select-selected">
                <span>Condition{index}</span>
                <span className="green">From $1{index}3</span>
              </div>
            );
          },
          renderNotSelect: () => {
            return (
              <div className="button-select">
                <span>Condition{index}</span>
                <span className="green">From $1{index}3</span>
              </div>
            );
          }
        };
      })
    },
    {
      title: "Storage",
      arr: new Array(4).fill(1).map((item, index) => {
        return {
          name: "storage" + index,
          renderSelect: () => {
            return (
              <div className="button-select button-select-selected">
                storage{index}
              </div>
            );
          },
          renderNotSelect: () => {
            return <div className="button-select">storage{index}</div>;
          }
        };
      })
    },
    {
      title: "Color",
      arr: new Array(5).fill(1).map((item, index) => {
        return {
          name: "Color" + index,
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
        };
      })
    }
  ];
  console.log(config);
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
