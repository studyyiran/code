import { Request } from "utils";
import { IOpts } from "utils/request.interface";
// import { user } from 'utils/requestPath';
// import { ECaptchaErrCode } from '../interface/user.interface';
export const getPostion = () => {
  const dwindow = window as any;
  const AMap = dwindow.AMap;
  let map: any;
  let geolocation;

  const options = {
    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
    timeout: 4000 // 超过10秒后停止定位，默认：无穷大
  };

  // 加载地图，调用浏览器定位服务
  map = new AMap.Map("__container__", {
    resizeEnable: true
  });

  return new Promise((reslove, reject) => {
    map.plugin("AMap.Geolocation", function () {
      geolocation = new AMap.Geolocation(options);

      geolocation.getCurrentPosition();

      AMap.event.addListener(geolocation, "complete", (data: any) => {
        reslove(data);
      });
      // 返回定位信息
      AMap.event.addListener(geolocation, "error", (err: any) => {
        reject(err);
      });
    }); // 返回定位出错信息
  });
};

export const onSubscribe = <T>(userEmail: string): Promise<T> => {
  const opts: IOpts = {
    method: "POST",
    url: `/subscription/sendMail`,
    params: {
      userEmail
    },
    loading: false
  };

  return Request<T>(opts);
};


export const getStaticOffice = <T>(): Promise<T> => {
  const opts: IOpts = {
    url: `/static/office`,
  };

  return Request<T>(opts);
}

export const getReviews = <T>(query: { [key: string]: string | number }): Promise<T> => {
  const opts: IOpts = {
    url: `https://api.reviews.io/merchant/reviews`,
    params: {
      page: query.page || 0,
      per_page: 1000 || query.pageSize,
      order: query.order || 'desc',
      min_rating: query.min_rating,
      max_rating: query.max_rating,
      store: 'uptradeit-com' // amazon
    },
    isFullUrl: true
  };

  return Request<T>(opts);
}

export const getModuleOn = <T>(): Promise<T> => {
  const opts: IOpts = {
    url: `/reviews-io/module-on`,
  };

  return Request<T>(opts);
}

export const collectException = <T>(userEmail: string): Promise<T> => {
  const opts: IOpts = {
    url: `/static/collect-exception`,
    method: 'POST',
    params: {
      userEmail
    }
  };

  return Request<T>(opts);
}
