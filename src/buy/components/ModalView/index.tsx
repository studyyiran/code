import React, { useEffect } from "react";

export function ModalView(props: any) {
  const { visible, onCancel, children } = props;

  useEffect(() => {
    if (visible) {
      // 禁止滚动
      const bodyStyle = (document.querySelector("body") as any).getAttribute(
        "style"
      );
      (document as any)
        .querySelector("body")
        .setAttribute("style", "overflow: hidden; height: 100vh");
      return () => {
        (document as any)
          .querySelector("body")
          .setAttribute("style", bodyStyle);
      };
    }
    return () => {};
  }, [visible]);

  if (visible) {
    return children;
    return <div className="yr-modal-mask">{children}</div>;
  } else {
    return null;
  }
}
