export const getQueryString = (name: string): string | null => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

export const ModalScroll = (() => {
  let scrollTop: number;

  return {
    afterOpen() {
      try {
        if (document.scrollingElement) {
          scrollTop = document.scrollingElement.scrollTop;
        }
        document.body.style.cssText = 'position:fixed;top:-' + scrollTop + 'px';
      } catch (e) {
        console.warn(e);
      }
    },
    beforeClose: function () {
      try {
        document.body.style.cssText = 'position:initial';
        if (document.scrollingElement) {
          document.scrollingElement.scrollTop = scrollTop;
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };
})();

export const checkedMobilePhone = (num: string) => {
  return /^1[0-9]{10}$/.test(num);
};

export const isArrayAIsPartOfArrayB = <T>(a: T[], b: T[]) => {
  for (const item of a) {
    if (b.findIndex(v => item.toString() === v.toString()) < 0) {
      return false
    }
  }
  return true
}

export const isArrayAIsPartOfArrayBMult = <T>(arr: T[], collections: T[][]) => {
  for (const itemN of collections) {
    if (isArrayAIsPartOfArrayB(arr, itemN)) {
      return true;
    }
  }
  return false;
}

export const elementIsPartOfArrayBMult = <T>(a: T, collections: T[][]) => {
  for (const b of collections) {
    if (b.findIndex(v => a.toString() === v.toString()) > -1) {
      return true;
    }
  }
  return false;
}


export const random = (num: number) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < num; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * @param {Number} lat
 * @param {Number} lng
 * @description 高德坐标转百度坐标
 */

export const gcj02ToBd09 = (lat: any, lng: any) => {
  const xPi = 3.14159265358979324 * 3000.0 / 180.0;
  const x = lng;
  const y = lat;
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPi);
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPi);
  const tempLon = z * Math.cos(theta) + 0.0065;
  const tempLat = z * Math.sin(theta) + 0.006;
  const gps = { lat: tempLat, lng: tempLon };
  return gps;
};

export const getWeek = (date: string) => {

  const weekMap = {
    '0': '周日',
    '1': '周一',
    '2': '周二',
    '3': '周三',
    '4': '周四',
    '5': '周五',
    '6': '周六'
  };
  return weekMap[new Date(date).getDay()];
};