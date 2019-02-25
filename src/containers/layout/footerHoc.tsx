import * as React from 'react';
import { observer } from 'mobx-react';
import Footer from './footer';
import MobileFooter from './mobile/footer';
@observer
export default class HeaderHoc extends React.Component<{ router: any }> {
  public render() {
    return (
      <>
        <MobileFooter />
        <Footer router={this.props.router} />
      </>
    )
  }
}