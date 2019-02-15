import * as React from 'react';
import { inject, observer } from 'mobx-react';
import LayOut from '@/containers/aboutphone/layout';
import ModelItem from '@/containers/aboutphone/components/modelitem';
import './models.less';
import { IModelsProps } from './interface/index.interface';

@inject('yourphone')
@observer
export default class Models extends React.Component<IModelsProps> {

  public componentDidMount() {
    this.props.yourphone.getProductsList();
  }

  public render() {
    return (
      <div className="page-models-container">
        <LayOut>
          {
            this.props.yourphone.products.map((phone, index) => (
              <ModelItem
                key={index}
                {...phone}
                onModelItemClick={this.onModelItemClick}
                activeProductId={this.props.yourphone.activeProductId}
                activeModelId={this.props.yourphone.activeModelId}
              />
            ))
          }
        </LayOut>
      </div>
    );
  }

  private onModelItemClick = (productId: number, skuId: number) => {
    this.props.yourphone.activeProductId = productId;
    this.props.yourphone.activeModelId = skuId;
    this.props.history.push('/sell/yourphone/condition');
  }
}