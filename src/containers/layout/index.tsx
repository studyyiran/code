import * as React from 'react';
import { TITLE_CONFIG } from 'config';
// import Loading from '@/components/Loading'
import * as PropTypes from 'prop-types';

import './index.less';


export default class LayoutIndex extends React.Component {
  // 通过context 拿到 router 对象
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    }).isRequired
  }

  public componentDidMount() {
    // Loading.open();
    window['__history__'] = this.context.router.history;
    // 获取title 配置 以及拿到所有的title key
    const titles = TITLE_CONFIG;
    const titlesKey = Object.keys(titles);
    // 初始化先匹配一次
    this.onMappingTitles(titlesKey, titles);
    // listen 路由改变，重新匹配一次
    this.context.router.history.listen(() => {
      // Loading.open();
      this.onMappingTitles(titlesKey, titles);
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
        {this.props.children}
      </div>
    );
  }
}
