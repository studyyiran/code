import * as React from 'react';
import { observer } from 'mobx-react';
// import MobileHeader from './mobile/header';
import Header from './header';
@observer
export default class HeaderHoc extends React.Component<{ router: any }> {
  public render() {
    return (
      <>
        {/*<MobileHeader router={this.props.router} />*/}
        <Header />
      </>
    )
  }
}