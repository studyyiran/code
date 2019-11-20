import React, { useContext, useState } from "react";
import Button from "../../../../../../components/button";
import "./index.less";
const ShareContext = React.createContext({});
/*
提供isEdit注入

 */

interface IHehe {
  children: any;
  title: string;
}

/*
1.让内部组件,有isEdit状态.
2.让内部组件,可以使用已经写好的组件.

方案1
通过复合组件穿进去(配合cloneElement)
通过renderProps传入进去?
 */
export function UpdateFormLayout(props: IHehe) {
  const { title, children } = props;
  const [isEdit, setIsEdit] = useState(false);

  const { Provider } = ShareContext;

  const contextState = {
    isEdit,
    setIsEdit
  };

  function renderChildren(children: any) {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        isEdit,
        setIsEdit
      });
    });
  }
  // 遇到一个问题.children如何获取这个注入的值???
  // 获取不了.children默认被注入state.
  // 深层次的内容自己使用context解决
  return (
    <Provider value={contextState}>
      <div className="update-form-layout">
        <h2>{title}</h2>
        {renderChildren(children)}
      </div>
    </Provider>
  );
}

(UpdateFormLayout as any).RenderButton = function RenderButton(props: any) {
  const { onClick, ...others } = props;
  const shareContext = useContext(ShareContext);
  const { isEdit, setIsEdit } = shareContext as any;
  if (isEdit) {
    return (
      <Button type="submit" {...others}>
        Update
      </Button>
    );
  } else {
    return (
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
    );
  }
};
