import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IBrandsProps, IBrands } from './interface/index.interface';
import LayOut from '@/containers/aboutphone/layout';
import BrandItem from '@/containers/aboutphone/components/branditem';
import './brands.less';
import config from '@/config';
import Breadcrumb from '@/containers/aboutphone/components/breadcrumb';
import ProgressBar from '@/containers/aboutphone/components/progressbar--mobile';
// import Clipboard from 'clipboard';

@inject('yourphone', 'user', 'common')
@observer
export default class Brands extends React.Component<IBrandsProps> {
  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    this.props.yourphone.getBrandsByCid();
    // const a = new Clipboard('.testtttt-btn');
    // console.log(a);
  }

  public render() {
    const { brands, activeBrandsId } = this.props.yourphone;
    return (
      <div className="page-brands-container">
        <LayOut>
          <>
            {
              this.props.common.isMobile && <ProgressBar />
            }
            {/* <input id="foo" value={brands[3].name} />
            <button className="testtttt-btn" data-clipboard-target="#foo">
              12312312313
                </button> */}
            <Breadcrumb />
            <div className="brand-list-wrapper">
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
        },
        inquiryKey: brand.id === config.DEFAULT.otherBrandsId ? '' : this.props.yourphone.inquiryKey
      };
    } catch (error) { console.warn(error, 'in brands page updatePreorder') }

    this.props.yourphone.activeBrandsId = brand.id;
    this.props.yourphone.activeBrandsName = brand.name;
    // 是否为TBD机型
    if (brand.id === config.DEFAULT.otherBrandsId) {
      this.props.yourphone.inquiryKey = '';
    }
    this.props.history.push('/sell/yourphone/carrier');
  }
}