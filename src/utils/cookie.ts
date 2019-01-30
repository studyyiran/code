/**
 * Created by TK on 2017/9/19.
 * cookie操作
 */
const Cookie = {
  /**
   * 设置cookie
   * name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
   * @param name {string}
   * @param value {string|number}
   * @param expires {Date|number} Date实例(絕對時間)或者毫秒（當前時間加上ms数，过期）
   * @param domain {string}
   * @param path {string}
   * @param secure {bool}
   */
  set: function (name: string, value: string, expires: number | Date, domain?: string, path?: string, secure?: boolean) {
    let cookieText = "";
    if (!path) {
      path = '/';
    }
    cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += "; expires=" + expires.toUTCString();
    } else {
      const expiress = new Date(+new Date() + expires);
      cookieText += "; expires=" + expiress.toUTCString();
    }
    if (path) {
      cookieText += "; path=" + path;
    }
    if (domain) {
      cookieText += "; domain=" + domain;
    }
    if (secure) {
      cookieText += "; secure";
    }
    document.cookie = cookieText;
  },

  /**
   * 获取cookie
   * @param name {string}
   * @returns {string}
   */
  get: function (name: string) {
    let arr: string[] | null;
    const reg: RegExp = new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]*)(;|$)");
    const result = arr = document.cookie.match(reg);
    if (result && arr) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  },
  /**
   * 删除cookie
   * @param name
   * @param domain
   * @param path
   * @param secure
   */
  del: function (name: string, domain: string, path: string, secure: boolean) {
    this.set(name, "", 0, domain, path, secure);
  }
};

export default Cookie;

