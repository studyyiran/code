import * as React from "react";
import config from "../../config";
import * as PropTypes from "prop-types";
import "./index.less";
import HeaderHoc from "./headerHoc";
import FooterHoc from "./footerHoc";
// import { getQueryString } from 'utils';
import commonStore from "store/common";
import Raven from "raven-js";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  ISelectModelContext,
  SelectModelContext
} from "pages/sell/selectModelProcess/context";
import { isServer } from "utils/util";

export default function LayoutIndexWrapper(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextDispatch
  } = selectModelContext as ISelectModelContext;
  useEffect(() => {
    // TODO
    if (window.location.href.indexOf("#") !== -1) {
      window.location.replace("/notfound");
    }
  });
  useEffect(() => {
    const CategoryId = "1";
    selectModelContextDispatch({ type: "setCategoryId", value: CategoryId });
  }, []);
  let routerHistory = useHistory();
  return <LayoutIndex {...props} routerHistory={routerHistory} />;
}

class LayoutIndex extends React.Component<any, {}> {
  // public readonly state = {
  //   showMobileFooter: true
  // }

  public componentDidMount() {
    // if (getQueryString('origin') === 'mail') {
    //   sessionStorage.setItem('invitationCode', '1');
    // }
    // // 是否输入国 invatation code
    // if (!sessionStorage.getItem('invitationCode')
    //   && this.context.router.route.match.path !== '/invitationCode') {
    //   this.context.router.history.push('/invitationCode')
    // }

    // message.loading(ECommonText.LOADING, 1);
    window["__history__"] = this.props.routerHistory;
    // 获取title 配置 以及拿到所有的title key
    const titles = config.TITLE_CONFIG;
    const titlesKey = Object.keys(titles);
    // 初始化先匹配一次
    this.onMappingTitles(titlesKey, titles);
    // listen 路由改变，重新匹配一次
    this.props.routerHistory.listen(() => {
      // message.loading(ECommonText.LOADING, 1);
      this.onMappingTitles(titlesKey, titles);
      if (commonStore.isMobile) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    });
  }

  public componentDidCatch(error: any, errorInfo: any) {
    if (process.env.REACT_APP_SERVER_ENV === "PUB") {
      Raven.captureException(error, { extra: errorInfo });
    }
  }

  public onMappingTitles = (titlesKey: string[], titles: object) => {
    // 得到所有和当前路由匹配的数组
    const arr = titlesKey.filter(v =>
      new RegExp(v).test(this.props.routerHistory.location.pathname)
    );
    // 设置title
    const currentConfig = titles[arr[arr.length - 1]];
    // TODO这个地方需要关注一下
    if (!isServer()) {
      if (window.location.href.indexOf("sell-phone") === -1) {
        document.title = currentConfig ? currentConfig.title : "";
      }
    }
    document
      .querySelector('meta[name="keywords"]')!
      .setAttribute("content", currentConfig ? currentConfig.keywords : "");
    document
      .querySelector('meta[name="description"]')!
      .setAttribute("content", currentConfig ? currentConfig.description : "");
  };

  public render() {
    return (
      <div className="layout-container">
        <HeaderHoc />
        <main>{this.props.children}</main>
        <FooterHoc />
      </div>
    );
  }
}
