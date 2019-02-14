import * as React from 'react';
import { inject, observer } from 'mobx-react';
import LayOut from '@/containers/aboutphone/layout';
import ModelItem from '@/containers/aboutphone/components/modelitem';
import './models.less';
import { IModelsProps } from './interface/index.interface';

@inject('yourphone')
@observer
export default class Models extends React.Component<IModelsProps> {

  public render() {
    return (
      <div className="page-models-container">
        <LayOut>
          <div onClick={this.onModelItemClick}>
            <ModelItem />
            <ModelItem />
            <ModelItem />
          </div>
        </LayOut>
      </div>
    );
  }

  private onModelItemClick = () => {
    this.props.history.push('/sell/yourphone/condition');
  }
}