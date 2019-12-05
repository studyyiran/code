import React, { useContext, useEffect, useState } from "react";
import Button from "../../../../../../components/button";
import "./index.less";
const ShareContext = React.createContext({});
/*
提供isEdit注入

 */

interface IHehe {
  children: any;
  title: string;
  successHandler: any;
  userInfo: any;
}

/*
1.让内部组件,有isEdit状态.
2.让内部组件,可以使用已经写好的组件.

方案1
通过复合组件穿进去(配合cloneElement)
通过renderProps传入进去?
 */
export function UpdateFormLayout(props: IHehe) {
  const { userInfo, title, children, ...others } = props;
  const [isEdit, setIsEdit] = useState(false);

  const { Provider } = ShareContext;

  const contextState = {
    isEdit,
    setIsEdit
  };

  useEffect(() => {
    // 当收到userInfo更新的时候,一定需要关闭.大胆假设
    setIsEdit(false);
  }, [userInfo]);

  function renderChildren(children: any) {
    if (userInfo && userInfo.email) {
      return React.Children.map(children, child => {
        return React.cloneElement(child, {
          ...others,
          userInfo: userInfo,
          isEdit,
          setIsEdit,
          successHandler: others.successHandler
        });
      });
    } else {
      return null;
    }
  }
  // 遇到一个问题.children如何获取这个注入的值???
  // 获取不了.children默认被注入state.
  // 深层次的内容自己使用context解决
  return (
    <Provider value={contextState}>
      {userInfo && userInfo.email ? (
        <div className="update-form-layout">
          <h2>{title}</h2>
          {renderChildren(children)}
        </div>
      ) : null}
    </Provider>
  );
}

(UpdateFormLayout as any).RenderButton = function RenderButton(props: any) {
  const { onClick, ...others } = props;
  const shareContext = useContext(ShareContext);
  const { isEdit, setIsEdit } = shareContext as any;
  if (isEdit) {
    return (
      <div className="update-button-container">
        <Button type="submit" {...others}>
          Update
        </Button>
        <Button
          className="disabled-status"
          type="button"
          {...others}
          isLoading={false}
          disabled={false}
          onClick={() => {
            setIsEdit(false);
          }}
        >
          Cancel
        </Button>
      </div>
    );
  } else {
    return (
      <div className="update-button-container">
        <Button
          type="button"
          {...others}
          onClick={() => {
            onClick && onClick(isEdit);
            // 使用type 来框定点击后的行为.
            // 加入timer fix掉点击按钮后 submit行为有误
            window.setTimeout(() => {
              setIsEdit(true);
            }, 0);
          }}
        >
          Edit
        </Button>
      </div>
    );
  }
};
