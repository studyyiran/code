import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IBrandsProps, IBrands } from './interface/index.interface';
import LayOut from '@/containers/aboutphone/layout';
import BrandItem from '@/containers/aboutphone/components/branditem';
import './brands.less';

@inject('yourphone')
@observer
export default class Brands extends React.Component<IBrandsProps> {

  public componentDidMount() {
    this.props.yourphone.getBrandsByCid();
  }

  public render() {
    const { brands, activeBrandsId } = this.props.yourphone;
    return (
      <div className="page-brans-container">
        <LayOut>
          {
            brands.map((brand, index) => <BrandItem key={index} brand={brand} activeBrandsId={activeBrandsId} onBrandClick={this.onBrandItemClick} />)
          }
        </LayOut>
      </div>
    );
  }

  private onBrandItemClick = (brand: IBrands) => {
    this.props.history.push('/sell/yourphone/carrier');
  }
}