// hoc children renderProps 他们的本质区别究竟是什么？如何决定用什么？
/*
children 和 React.cloneElement 和Component的确是一对。

renderProps
 */
import React, { useEffect, useState } from "react";
import "./index.less";

interface Interface {
  list: any[];
  render: (props: any) => any;
  onSelectOption: (id: string) => void;
  allTitle?: string;
  type?: string;
  tag?: string;
  clickMoreHandler?: (pn: any) => void;
  currentSelectArr: string[];
}

export function FilterItem(props: Interface) {
  const {
    allTitle,
    tag,
    list,
    clickMoreHandler,
    render,
    onSelectOption,
    type,
    currentSelectArr
  } = props;
  const nextPageHandler = usePn(clickMoreHandler);
  return (
    <section className="filter-item">
      <ul
        data-type={type}
        className="item-container"
        data-iscolor={tag && tag.indexOf("ISCOLOR") !== -1}
      >
        {allTitle ? (
          <li
            className="all"
            onClick={() => {
              onSelectOption("all");
            }}
            data-select={
              !currentSelectArr.find((item: any) => {
                return list.find((itemInfo: any) => {
                  return !!(
                    item &&
                    item.id &&
                    String(item.id).split("-") &&
                    String(item.id).split("-")[1] &&
                    String(item.id).split("-")[1] === String(itemInfo.id)
                  );
                });
              })
            }
          >
            {allTitle}
          </li>
        ) : null}
        {(list || []).map((itemInfo: any) => {
          return (
            <li
              onClick={() => {
                onSelectOption(itemInfo.id);
              }}
              key={itemInfo.id}
              data-select={
                !!currentSelectArr.find((item: any) => {
                  return !!(
                    item &&
                    item.id &&
                    String(item.id).split("-") &&
                    String(item.id).split("-")[1] &&
                    String(item.id).split("-")[1] === String(itemInfo.id)
                  );
                })
              }
            >
              <div>{render(itemInfo)}</div>
            </li>
          );
        })}
        {nextPageHandler ? (
          <li onClick={nextPageHandler} style={{ textAlign: "center" }}>
            Show more
          </li>
        ) : null}
      </ul>
    </section>
  );
}

function usePn(pnChangeCallBack?: (pn: any) => void) {
  const initPn = 1;
  const [pn, setPn] = useState(initPn);
  function addPn() {
    setPn(currentPn => {
      return ++currentPn;
    });
  }
  useEffect(() => {
    pnChangeCallBack && pnChangeCallBack(pn);
  }, [pn]);
  if (pnChangeCallBack) {
    return addPn;
  } else {
    return null;
  }
}
