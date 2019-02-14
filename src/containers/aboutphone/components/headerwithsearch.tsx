import * as React from 'react';
import './headerwithsearch.less';
import { NAVIGATOR } from 'config';
import { Input } from 'antd';
import { INavigatorObj } from '@/containers/aboutphone/interface/index.interface';

interface IStates {
  navigatorObj: INavigatorObj | null

}

export default class BrandHeader extends React.Component<object, IStates> {

  public readonly state: Readonly<IStates> = {
    navigatorObj: null
  }

  public componentDidMount() {
    const navigator = NAVIGATOR;
    const navigatorKey = Object.keys(navigator);
    this.onMappingText(navigatorKey, navigator);
  }

  public onMappingText = (navigatorKey: string[], navigator: object) => {
    const arr = navigatorKey.filter(v => new RegExp(v).test(window['__history__'].location.pathname));
    const navigatorObj: INavigatorObj = navigator[arr[arr.length - 1]];

    this.setState({
      navigatorObj: { ...navigatorObj }
    });
  }

  public render() {
    if (this.state.navigatorObj === null) {
      return null;
    }
    const Search = Input.Search;
    const { navigatorObj } = this.state;

    return (
      <div className="comp-brand-header-container" style={{ height: navigatorObj.subText ? '110px' : '90px' }}>
        <div className="left-wrapper">
          <p className="main-text">{navigatorObj.mainText}</p>
          {
            navigatorObj.subText && <p className="sub-text">{navigatorObj.subText}</p>
          }
        </div>
        {
          navigatorObj.hasSearch &&
          <div className="right-wrapper">
            <Search
              placeholder="Search for..."
              onSearch={this.handleSearch}
              enterButton={true}
            />
          </div>
        }
      </div>
    )
  }

  private handleSearch = (value: string) => {
    console.log(value);
  }
}