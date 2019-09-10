import * as React from 'react';
import config from '@/config';
import './index.less';
import { Button, Icon } from 'antd';
import { INavigatorObj } from '@/containers/aboutphone/interface/index.interface';
interface IProps {
  nextPath?: string;
  progress?: number;
  nextCb?: () => void;
  disabled?: boolean
}

interface IStates {
  navigatorObj: INavigatorObj | null,
  nextButtonLoading: boolean
}

export default class NavigatorWithBar extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    navigatorObj: null,
    nextButtonLoading: false,
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
      <div className="comp-navigatorwithbar-container">
        <div className="left-wrapper">
          <Button
            icon='arrow-left'
            style={{ width: '130px', height: '50px' }}
            onClick={this.goBack}
          >BACK</Button>
        </div>
        <div className="middle-wrapper">
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
        <div className="right-wrapper">
          {
            (navigatorObj.progress === 3 || navigatorObj.step > 0 || navigatorObj.showNext) &&
            <Button
              style={{ width: '130px', height: '50px' }}
              onClick={this.goNext}
              type="primary"
              disabled={this.props.disabled}
              loading={this.state.nextButtonLoading}
            >
              NEXT <Icon type="arrow-right" />
            </Button>
          }
        </div>
      </div>
    )
  }

  private goBack() {
    window['__history__'].goBack();
  }

  private goNext = async () => {

    if (typeof this.props.nextCb === 'function') {
      this.setState({
        nextButtonLoading: true
      })
      await this.props.nextCb();
      this.setState({
        nextButtonLoading: false
      })
      return;
    }

    if (this.props.nextPath) {
      window['__history__'].push(this.props.nextPath!);
    }
  }
}