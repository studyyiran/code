/**
 * Created by TK on 2017/9/19.
 * 本地存储
 * 支持value为对象
 * 支持过期时间
 */
const fence: string = '$%^&*$';
export default {
  /**
   * 加入本地存储
   * @param key {string}
   * @param value {string|number|object}, 其中number当作string处理
   * @param expires {number}, 表示expires毫秒以后过期，非必须
   * @returns {boolean}
   */
  set: function (key: string, value: string | number | [] | object, expires?: number) {
    try {
      // 检测value
      // 是对象，则序列化，并记录为对象，方便取出来的时候parse
      const type = typeof value;
      if (value !== null && type !== 'function' && type === 'object') {
        value = JSON.stringify(value) + fence + 'object';
      } else {
        value += fence;
      }

      // 设置过期时间
      if (expires) {
        expires = + new Date(+ new Date() + expires);
        value += fence + expires;
      }
      window.localStorage.setItem(key, value as string);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * 读取制定存储
   * @param key
   * @returns {boolean}
   */
  get: function (key: string) {
    try {
      let data: string | string[] | null = window.localStorage.getItem(key);
      if (!data) {
        return data;
      }
      data = data.split(fence);

      // 有过期时间，并且过切，返回false，并删除对应数据
      if (data[2] && (+data[2] < (+ new Date()))) {
        this.del(key);
        return false;
      } else {
        // 没有过期时间
        if (data[1] === 'object') {
          return JSON.parse(data[0]);
        } else {
          return data[0];
        }
      }
    } catch (e) {
      return false;
    }
  },

  /**
   * 刪除
   * @param key
   * @returns {boolean}
   */
  del: function (key: string) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * 清除所有存储
   */
  clear: function () {
    try {
      window.localStorage.clear();
      return true;
    } catch (e) {
      return false;
    }
  },

  supported: function () {
    const mod = 'supported';
    try {
      window.localStorage.setItem(mod, mod);
      window.localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }
};
