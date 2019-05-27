import { action, observable, autorun } from 'mobx';
import { requireJS, gcj02ToBd09 } from 'utils';
import { ICommonStore, IStaticOffice, IReviews, IReviewsPagation, IReview } from './interface/common.interface';
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
  @observable public showEmailModal: boolean = true;

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
    let result: IReviews | null = null;
    try {
      result = await Api.getReviews<IReviews>(query);
    } catch (e) {
      return false;
    } finally {
      this.reviewsLoading = false;
    }

    this.reviews = this.mappingReviews(result);

    return true;
  }
  @action public getReviewsSort = async (query: { [key: string]: string | number }) => {
    this.reviewsLoading = true;
    let result: IReviews | null = null;
    try {
      result = await Api.getReviews<IReviews>(query);
    } catch (e) {
      return false;
    } finally {
      this.reviewsLoading = false;
    }

    const list = [...result.reviews];

    result.reviews = list.sort((n1, n2) => n1.rating > n2.rating ? -1 : 1);

    this.reviews = this.mappingReviews(result);

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

  @action public collectException = async (email: string) => {
    try {
      return await Api.collectException<boolean>(email);
    } catch (e) {
      return false;
    }
  }

  private mappingReviews = (item: IReviews) => {
    let json = null;
    try {
      json = Object.create({});
      json['page'] = Number(item.page) || 0;
      json['per_page'] = Number(item.per_page) || 0;
      json['store'] = item.store.toString();
      json['total_pages'] = Number(item.total_pages) || 0;
      json['stats'] = {
        average_rating: item.stats.average_rating.toString(),
        total_reviews: item.stats.total_reviews.toString()
      }
      json['reviews'] = item.reviews.map((v: IReview) => {
        return {
          timeago: v.timeago.toString(),
          comments: v.comments.toString(),
          rating: v.rating.toString(),
          reviewer: {
            first_name: v.reviewer.first_name.toString(),
            last_name: v.reviewer.last_name.toString()
          }
        }
      })
    } catch {
      return null;
    }
    if (Object.keys(json).length > 0) {
      return json;
    }
    return null;
  }
}

// 外部使用require
export default new Common();
