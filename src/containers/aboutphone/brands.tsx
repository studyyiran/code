import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IBrandsProps, IBrands } from './interface/index.interface';
import LayOut from '@/containers/aboutphone/layout';
import BrandItem from '@/containers/aboutphone/components/branditem';
import './brands.less';
import { DEFAULT } from '@/config';
// import { IPreOrder } from '@/store/interface/user.interface';

@inject('yourphone', 'user')
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
          <div style={{ paddingBottom: '32px' }}>
            {
              brands.map((brand, index) => <BrandItem key={index} brand={brand} activeBrandsId={activeBrandsId} onBrandClick={this.onBrandItemClick} />)
            }
          </div>
        </LayOut>
      </div>
    );
  }

  private onBrandItemClick = (brand: IBrands) => {
    try {
      const productInfo = {...this.props.user.preOrder.productInfo, brand: brand.id};
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        productInfo,
        yourphoneStore: { ...this.props.yourphone }
      };
    } catch (error) { console.warn(error, 'in brands page updatePreorder') }

    this.props.yourphone.activeBrandsId = brand.id;
    // 是否为TBD机型
    brand.id === DEFAULT.otherBrandsId ? this.props.history.push('/sell/yourphone/shipping') : this.props.history.push('/sell/yourphone/carrier');
  }
}