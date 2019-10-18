import * as React from 'react';
import config from 'config/index';
import './progressbar--mobile.less';
import { INavigatorObj } from 'containers/aboutphone/interface/index.interface';
interface IProps {
  progress?: number;
}

interface IStates {
  navigatorObj: INavigatorObj | null;
}

export default class NavigatorWithBar extends React.Component<IProps, IStates> {
  public static readonly displayName: string = '移动端步骤组件';
  public readonly state: Readonly<IStates> = {
    navigatorObj: null
  }

  public componentDidMount() {
    const navigator = config.NAVIGATOR;
    const navigatorKey = Object.keys(navigator);
    this.onMappingStep(navigatorKey, navigator);
  }


  public onMappingStep = (navigatorKey: string[], navigator: object) => {
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

    const { navigatorObj } = this.state;
    return (
      <div className="comp-order-progressbar-container">
        {
          navigatorObj.progress !== -1 &&
          <div className="bar-wrapper">
            {/* props.progress优先级高于配置 */}
            {
              Array(this.props.progress ? this.props.progress : navigatorObj.progress).fill(undefined).map((item, index) => (<span className="bar-item" key={index} />))
            }
          </div>
        }
      </div>
    )
  }
}