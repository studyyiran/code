import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import Svg from "buy/components/svg";
import { isServer } from "../../common/utils/util";

let bodyRoot: any = isServer() ? {} : document.getElementById("modal-root");
if (!bodyRoot) {
  bodyRoot = document.createElement("div");
  bodyRoot.id = "modal-root";
  (document.querySelector("body") as any).appendChild(bodyRoot);
}
const prefixCls = "yr-modal";
/*
modifiy
7-14

差异
没有实现mask

footer:
undefined: show default footer
null: not show footer
vNode: outDiv is container.inner div1 is cancel. inner div2 is onClick.如果只有一个外层，一个内层，那就只有取消回调功能。

maskStyle
 */
export default class Modal extends React.Component<any, any> {
  public static defaultProps = {
    children: "",
    maskClosable: false,
    closable: true,
    footer: "default",
    title: "提示",
    okText: "确认",
    cancelText: "取消",
    centered: false,
    needDefaultScroll: false,
    reverseButton: false
  };
  public confirm: any;
  private bodyStyle: string | null;
  private outNode: any;
  constructor(props: any) {
    super(props);
    this.state = {};
    this.onOkClick = this.onOkClick.bind(this);
    this.onClose = this.onClose.bind(this);
    // 禁止滚动
    this.bodyStyle = (document.querySelector("body") as any).getAttribute(
      "style"
    );
  }

  public componentDidMount() {
    this.init();
  }

  public componentDidUpdate(prevProps: any) {
    this.init();
  }

  public init = () => {
    const modalRoot: any = this.props.getContainer || bodyRoot;
    if (this.outNode) {
      if (this.props.visible) {
        (document as any)
          .querySelector("body")
          .setAttribute("style", "overflow: hidden; height: 100vh");
      }
      if (this.props.visible && this.outNode.parentNode !== modalRoot) {
        modalRoot.appendChild(this.outNode);
      }
      // 清除
      if (modalRoot && !this.props.visible) {
        ReactDOM.unmountComponentAtNode(this.outNode);
        if (this.outNode.parentNode) {
          this.outNode.parentNode.removeChild(this.outNode);
          document.body.style.overflow = "auto";
          this.outNode = null;
        }
      }
    }
  };

  public renderFooter() {
    const { footer, okText, cancelText }: any = this.props;
    // 如果footer，渲染并嵌入onClick
    if (footer && footer.props && footer.props.children) {
      return React.cloneElement(
        footer,
        {},
        React.Children.map(footer.props.children, (footerElement, index) => {
          if (this.props.reverseButton) {
            if (index === 0) {
              return React.cloneElement(footerElement, {
                onClick: this.onClose
              });
            } else if (index === 1) {
              return React.cloneElement(footerElement, {
                onClick: this.onOkClick
              });
            }
          } else {
            if (index === 0) {
              return React.cloneElement(footerElement, {
                onClick: this.onOkClick
              });
            } else if (index === 1) {
              return React.cloneElement(footerElement, {
                onClick: this.onClose
              });
            }
          }
          return null;
        })
      );
    } else if (footer === "default") {
      return (
        <div className="yr-modal-footer">
          {this.props.reverseButton ? (
            <div
              className="yr-modal-button yr-modal-button-sure"
              onClick={this.onOkClick}
            >
              {okText}
            </div>
          ) : null}
          <div
            className="yr-modal-button yr-modal-button-cancel"
            onClick={this.onClose}
          >
            {cancelText}
          </div>
          {!this.props.reverseButton ? (
            <div
              className="yr-modal-button yr-modal-button-sure"
              onClick={this.onOkClick}
            >
              {okText}
            </div>
          ) : null}
        </div>
      );
    } else if (footer === "single") {
      return (
        <div className="yr-modal-footer">
          <div
            className="yr-modal-button yr-modal-button-sure"
            onClick={this.onClose}
          >
            {cancelText}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  public onOkClick() {
    const { onOk, destoryFunc } = this.props;
    let onOkResult;
    // 添加异步按钮
    if (onOk) {
      onOkResult = onOk();
    }
    if (onOkResult instanceof Promise) {
      onOkResult.then(() => {
        finish();
      });
    } else {
      finish();
    }
    function finish() {
      if (destoryFunc) {
        destoryFunc();
      }
    }
  }

  public onClose() {
    // body init
    (document as any)
      .querySelector("body")
      .setAttribute("style", this.bodyStyle);
    const { onCancel, destoryFunc } = this.props;
    if (onCancel) {
      onCancel();
    }
    if (destoryFunc) {
      destoryFunc();
    }
  }
  public setModalScroll = (ele: any) => {
    ele &&
      ele.addEventListener(
        "touchmove",
        (e: any) => {
          !this.props.needDefaultScroll && e && e.preventDefault();
        },
        {
          passive: false
        }
      );
  };

  public renderModal() {
    const {
      maskStyle,
      className,
      style = {},
      bodyStyle,
      closable,
      centered,
      width,
      title
    } = this.props;
    if (width) {
      style.width = width;
    }
    /* icon-close可能没有。 */
    return (
      <div
        ref={this.setModalScroll}
        style={maskStyle}
        onClick={this.props.maskClosable ? this.onClose : () => null}
        className={`${prefixCls}-mask ${centered ? "modal_pos_centered" : ""}`}
      >
        <div
          className={`${prefixCls} ${className} ${
            centered ? "" : "modal_pos_top"
          } `}
          style={style}
        >
          <div
            className={`${prefixCls}-content`}
            onClick={e => e.stopPropagation()}
          >
            {title ? (
              <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-title`}>{title}</div>
              </div>
            ) : null}
            {closable && (
              <button className={`${prefixCls}-close`} onClick={this.onClose}>
                <span className={`${prefixCls}-close-x`}>
                  <Svg icon="wrong" />
                </span>
              </button>
            )}
            <div style={bodyStyle} className={`${prefixCls}-body`}>
              {this.props.children}
            </div>
            {this.renderFooter()}
          </div>
        </div>
      </div>
    );
  }

  public render() {
    if (this.props.visible && this.props.children) {
      if (!this.outNode) {
        this.outNode = document.createElement("div");
        if (this.props.wrapClassName) {
          this.outNode.setAttribute("class", this.props.wrapClassName);
        }
      }
      return ReactDOM.createPortal(this.renderModal(), this.outNode);
    } else {
      return null;
    }
  }
}

// @ts-ignore
Modal.confirm = function(props: any) {
  const modalRoot: any = bodyRoot;
  const addEle = document.createElement("div");
  if (props.wrapClassName) {
    addEle.setAttribute("class", props.wrapClassName);
  }
  modalRoot.appendChild(addEle);
  render(true);
  const destroy = (ele: any) => {
    render(false);
    window.setTimeout(() => {
      ReactDOM.unmountComponentAtNode(ele);
      ele && ele.parentNode && ele.parentNode.removeChild(ele);
      document.body.style.overflow = "auto";
    }, 1000);
  };
  function render(bool: boolean) {
    ReactDOM.render(
      <Modal
        {...props}
        visible={bool}
        maskClosable={false}
        destoryFunc={() => {
          destroy(addEle);
        }}
      />,
      addEle
    );
  }
  return {
    destroy: () => {
      destroy(addEle);
    }
  };
};
