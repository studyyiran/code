import { action, observable, autorun } from 'mobx';
import { requireJS, gcj02ToBd09 } from 'utils';
import { ICommonStore, IStaticOffice, IReviews, IReviewsPagation } from './interface/common.interface';
import * as Api from './api/common.api';
class Common implements ICommonStore {
  @observable public positionInfo: any = null;
  @observable public isMobile: boolean = false;
  @observable public staticOffice: IStaticOffice | null = null;
  @observable public reviews: IReviews | null = null;
  @observable public reviewsPagation: IReviewsPagation = {
    page: 0,
    list: [],
    rating: ''
  }
  @observable public moduleOn: boolean = false;
  @observable public reviewsLoading: boolean = false;

  constructor() {
    autorun(() => {
      if (this.reviews) {
        this.filterReviews();
      }
    })
  }

  @action public filterReviews = () => {
    if (this.reviews) {
      this.reviewsPagation.list = this.reviews.reviews.slice(this.reviewsPagation.page * 10, this.reviewsPagation.page * 10 + 10)
    }
  }

  @action public async initPosition() {
    // Toast('正在获取定位信息');
    // 加载高德地图
    await requireJS('//webapi.amap.com/maps?v=1.4.2&key=ebcdb503893f04fddcb6fb1c814f6d0e');

    let result: any = null;
    try {
      result = await Api.getPostion();
    } catch (e) {
      this.positionInfo = e;
      return false;
    }
    if (!result.addressComponent) {
      this.positionInfo = { type: 'error', info: 'ERROR' };
      return false;
    }
    if (!result.addressComponent.city) {
      result.addressComponent.city = result.addressComponent.city.province;
    }
    this.positionInfo = result;
    this.positionInfo.baiduPoi = gcj02ToBd09(result.position.lat, result.position.lng);
    console.log(result);
    return true;
  }

  @action public onSubscribe = async (email: string) => {
    try {
      await Api.onSubscribe<boolean>(email);
    } catch (e) {
      return false;
    }

    return true;
  }

  @action public getStaticOffice = async () => {
    try {
      this.staticOffice = await Api.getStaticOffice<IStaticOffice>();
    } catch (e) {
      return false;
    }
    return true;
  }

  @action public getReviews = async (query: { [key: string]: string | number }) => {
    this.reviewsLoading = true;
    try {
      this.reviews = await Api.getReviews<IReviews>(query);
    } catch (e) {
      return false;
    } finally {
      this.reviewsLoading = false;
    }
    return true;
  }

  @action public getModuleOn = async () => {
    try {
      this.moduleOn = await Api.getModuleOn<boolean>();
    } catch (e) {
      return false;
    }
    return true;
  }
}

// 外部使用require
export default new Common();
