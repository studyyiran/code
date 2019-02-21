import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IBrandsProps, IBrands } from './interface/index.interface';
import LayOut from '@/containers/aboutphone/layout';
import BrandItem from '@/containers/aboutphone/components/branditem';
import './brands.less';
import { DEFAULT } from '@/config';
import { userEmailValidate } from '@/containers/aboutphone/pageValidate';
import Breadcrumb from '@/containers/aboutphone/components/breadcrumb';

@inject('yourphone', 'user')
@observer
export default class Brands extends React.Component<IBrandsProps> {
  public componentDidMount() {
    // 检验是否获取到页面需要到必须数据
    if (!userEmailValidate()) {
      this.props.history.push('/sell/account');
      return;
    }
    this.props.yourphone.getBrandsByCid();
  }

  public render() {
    const { brands, activeBrandsId } = this.props.yourphone;
    return (
      <div className="page-brans-container">
        <LayOut>
          <>
            <Breadcrumb />
            <div style={{ paddingBottom: '32px' }}>
              {
                brands.map((brand, index) => <BrandItem key={index} brand={brand} activeBrandsId={activeBrandsId} onBrandClick={this.onBrandItemClick} />)
              }
            </div>
          </>
        </LayOut>
      </div>
    );
  }

  private onBrandItemClick = (brand: IBrands) => {
    try {
      // const productInfo = { ...this.props.user.preOrder.productInfo, brand: brand.id };
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        productInfo: {
          brandId: brand.id,
          brandName: brand.name
        }
      };
    } catch (error) { console.warn(error, 'in brands page updatePreorder') }

    this.props.yourphone.activeBrandsId = brand.id;
    this.props.yourphone.activeBrandsName = brand.name;
    // 是否为TBD机型
    brand.id === DEFAULT.otherBrandsId ? this.props.history.push('/sell/yourphone/shipping') : this.props.history.push('/sell/yourphone/carrier');
  }
}