import * as React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import './headerwithsearch.less';
import { NAVIGATOR } from 'config';
import { Input } from 'antd';
import { INavigatorObj, IProductModel } from '@/containers/aboutphone/interface/index.interface';
import yourphoneStore from '@/containers/aboutphone/store/yourphone.store';
import userStore from '@/store/user';
import EventHandler from '@/utils/event';

interface IStates {
  navigatorObj: INavigatorObj | null;
  value: string,
  searchList: IProductModel[]
}
// let timer: number = 0;
@observer
export default class BrandHeader extends React.Component<{ userEmail?: string }, IStates> {
  public static readonly displayName: string = '页面title显示组件';
  public readonly state: Readonly<IStates> = {
    navigatorObj: null,
    value: '',
    searchList: []
  }

  public componentDidMount() {
    const navigator = NAVIGATOR;
    const navigatorKey = Object.keys(navigator);
    this.onMappingText(navigatorKey, navigator);
    yourphoneStore.getProductsList('1')
    // 注册全局点击事件，以便点击其他区域时，隐藏展开的内容
    EventHandler.add(this.globalClick);

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

    let extraText = '';
    // checkorder页面需要添加用户邮箱展示
    if (navigatorObj.isInCheckOrder) {
      extraText = userStore.preOrder.userEmail ? userStore.preOrder.userEmail : (this.props.userEmail || '');
    }
    return (
      <div className={classnames('comp-brand-header-container', { multiple: navigatorObj.subText })}>
        <div className="left-wrapper">
          <p className="main-text">{navigatorObj.mainText}</p>
          {
            navigatorObj.subText && <p className="sub-text">{`${navigatorObj.subText} ${extraText}`}</p>
          }
        </div>
        {
          navigatorObj.hasSearch &&
          <div className="right-wrapper">
            <Search
              placeholder="Search for..."
              onSearch={this.handleSearch}
              onChange={this.handleKeyWordChange}
              onFocus={this.handleFocus}
              enterButton={true}
              value={this.state.value}
            />
            {
              this.state.searchList.length > 0 &&
              <div className="results-wrapper">
                {
                  this.state.searchList.map((product, index) => (
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
      // 没有搜索接口，先注释掉
      // yourphoneStore.getProductsList(value.trim());
      yourphoneStore.products = this.state.searchList;

      return;
    }

    // 如果value 为空
    yourphoneStore.getProductsList(value.trim());
  }

  private handleKeyWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 防抖目前搞不通，死活报warning
    // 获取input dom对象，然后获取里面的值
    const value = event.target.value;
    this.setState({
      value,
    })
    if (value.trim() === '') {
      this.setState({
        searchList: []
      })
    }

    if (value.trim()) {
      const arr: IProductModel[] = yourphoneStore.products4Search.filter((v: IProductModel) => {
        if (v.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1) {
          return true;
        }
        return false;
      })

      this.setState({
        searchList: arr
      })
    }

    // if (timer) {
    //   clearTimeout(timer);
    //   timer = 0;
    // }
    // timer = window.setTimeout(() => {
    //   if (value.trim()) {
    //     yourphoneStore.getProductsList(value.trim())
    //   }
    //   timer = 0;
    // }, 300)
  }

  private handleProductSelect = (product: IProductModel) => {
    yourphoneStore.products = [product];
    this.setState({
      searchList: []
    })
    this.setState({
      value: product.name
    })
  }

  // 全局点击
  private globalClick = () => {
    this.setState({
      searchList: []
    })
  }

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim()) {
      yourphoneStore.getProductsList(value.trim())
    }
  }

}