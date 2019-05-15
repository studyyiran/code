import * as React from 'react';
import { observer } from 'mobx-react';
import Footer from './footer';
import MobileFooter from './mobile/footer';
@observer
export default class HeaderHoc extends React.Component<{ router: any, showMobileFooter: boolean }> {
  public render() {
    return (
      <>
        {this.props.showMobileFooter && <MobileFooter />}
        <Footer router={this.props.router} />
      </>
    )
  }
}