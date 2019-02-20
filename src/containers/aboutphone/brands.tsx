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
  // TODO: 尚未添加TBD情况，因为other brand的id未知
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
    // const newPreOrder: IPreOrder = {
    //   ...this.props.user.preOrder,
    //   productInfo: { brandId: brand.id }
    // };
    // this.props.user.preOrder = newPreOrder; // 更新preOrder触发autorun
    this.props.yourphone.activeBrandsId = brand.id;
    // 是否为TBD机型
    brand.id === DEFAULT.otherBrandsId ? this.props.history.push('/sell/yourphone/shipping') : this.props.history.push('/sell/yourphone/carrier');
  }
}