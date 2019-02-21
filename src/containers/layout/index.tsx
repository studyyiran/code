import * as React from 'react';
import { TITLE_CONFIG } from 'config';
import { message } from 'antd';
import * as PropTypes from 'prop-types';
import './index.less';
import { ECommonText } from '@/language/common';
import Header from './header';
import Footer from './footer';


export default class LayoutIndex extends React.Component {
  // 通过context 拿到 router 对象
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    }).isRequired
  }

  public componentDidMount() {
    console.log(this.context.router.route.match.path);
    // 是否输入国 invatation code
    if (!sessionStorage.getItem('invitationCode') && this.context.router.route.match.path !== '/invitationCode') {
      this.context.router.history.push('/invitationCode')
    }

    // message.loading(ECommonText.LOADING, 1);
    window['__history__'] = this.context.router.history;
    // 获取title 配置 以及拿到所有的title key
    const titles = TITLE_CONFIG;
    const titlesKey = Object.keys(titles);
    // 初始化先匹配一次
    this.onMappingTitles(titlesKey, titles);
    // listen 路由改变，重新匹配一次
    this.context.router.history.listen(() => {
      // message.loading(ECommonText.LOADING, 1);
      this.onMappingTitles(titlesKey, titles);

      if (!sessionStorage.getItem('invitationCode') && location.pathname !== '/invitationCode') {
        this.context.router.history.push('/invitationCode')
      }
    });
  }

  public onMappingTitles = (titlesKey: string[], titles: object) => {
    // 得到所有和当前路由匹配的数组
    const arr = titlesKey.filter(v => new RegExp(v).test(this.context.router.history.location.pathname));
    // 设置title
    document.title = titles[arr[arr.length - 1]];
  }

  public render() {
    return (
      <div className="layout-container">
        <Header />
        <div className="layout-content">
          {this.props.children}
        </div>
        <Footer router={this.context.router} />
      </div>
    );
  }
}
