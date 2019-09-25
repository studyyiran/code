import * as React from 'react';
import { observer } from 'mobx-react';
import Footer from './components/footer/footer';
// import MobileFooter from './mobile/footer';
import * as PropTypes from 'prop-types';
@observer
export default class HeaderHoc extends React.Component<{ router: any }> {
  // 通过context 拿到 router 对象
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    }).isRequired
  }
  public readonly state = {
    showMobileFooter: true
  }
  public componentDidMount() {
    this.setMobileFooter();
    this.context.router.history.listen(() => {
      this.setMobileFooter();
    })
  }
  public render() {
    return (
      <>
        {/*{this.state.showMobileFooter && <MobileFooter />}*/}
        {!this.state.showMobileFooter && <style>
          {
            `.ismobile .layout-container .layout-content {
              padding-bottom:0 !important;
              margin-bottom:0 !important;
            }`
          }
        </style>}
        <Footer router={this.props.router} />
      </>
    )
  }

  private setMobileFooter = () => {
    let showMobileFooter = true;
    // 处理 m 版是否要显示 footer，/sell 路由下不用显示
    // if (/\/sell\//.test(window.location.href)) {
    //   showMobileFooter = false
    // }
    this.setState({
      showMobileFooter
    })
  }
}