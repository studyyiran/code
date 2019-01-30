import * as React from 'react';
import { inject, observer } from 'mobx-react';

@inject("common")
@observer
export default class Home extends React.Component {

  public render() {

    return (
      <div className="page-home-container">
        <p>page home</p>
        <p>page home test</p>
        <p>hello world</p>
      </div>
    )
  }
}