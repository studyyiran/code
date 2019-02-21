import * as React from 'react';
import { observer } from 'mobx-react';
import './headerwithsearch.less';
import { NAVIGATOR } from 'config';
import { Input } from 'antd';
import { INavigatorObj, IProductModel } from '@/containers/aboutphone/interface/index.interface';
import yourphoneStore from '@/containers/aboutphone/store/yourphone.store';

interface IStates {
  navigatorObj: INavigatorObj | null
}
let timer: any = 0;
@observer
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
              onChange={this.handleKeyWordChange}
              enterButton={true}
            />
            {
              yourphoneStore.products4Search.length > 0 &&
              <div className="results-wrapper">
                {
                  yourphoneStore.products4Search.map((product, index) => (
                    <p
                      key={index}
                      className='product'
                      onClick={this.handleProductSelect.bind(this, product)}
                    >
                      {product.name}
                    </p>
                  ))
                }
              </div>
            }
          </div>
        }
      </div>
    )
  }

  private handleSearch = (value: string) => {
    if (value.trim()) {
      yourphoneStore.getProductsList(value.trim());
    }
  }

  private handleKeyWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 防抖目前搞不通，死活报warning
    // 获取input dom对象，然后获取里面的值
    const value = event.target.value;
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    timer = window.setTimeout(() => {
      if (value.trim()) {
        yourphoneStore.getProductsList(value.trim())
      }
      timer = 0;
    }, 300)
  }

  private handleProductSelect = (product: IProductModel) => {
    yourphoneStore.products = [product];
    yourphoneStore.products4Search = [];
  }
}