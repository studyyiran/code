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
          name: "1",
          renderSelect: () => {
            return <div>1</div>;
          },
          renderNotSelect: () => {
            return <div>1</div>;
          }
        }
      ]
    },
    {
      title: "Color",
      arr: [
        {
          name: "Red",
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
        },
        {
          name: "Red",
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
    <div>
      <h3>
        {title}: {arr[currentSelect].name}
      </h3>
      <ul>
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
