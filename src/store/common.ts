import { action } from 'mobx';
import { requireJS, gcj02ToBd09 } from 'utils';
import { ICommonStore } from './interface/common.interface';
import * as Api from './api/common.api';
class Common implements ICommonStore {
  public positionInfo: any = null;

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
}

// 外部使用require
export default new Common();
