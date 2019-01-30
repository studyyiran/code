import { random } from './function';
// 加载js，用于非amd等第三方cdn js加载
const cache = {};
export default function requireJS(src: string, attrs?: any, cb?: any) {
  const dwindow = window as any;
  return new Promise(function (resolve, reject) {

    if (cache[src]) {
      resolve(cache[src]);
      return;
    }

    const scripts = document.createElement('script') as any;
    scripts.async = true;
    // 随机6位数
    const cbName = random(6);
    let links = src;
    // 如果有cb 存在则表示走 cb 回调 触发 reslove

    if (cb) {
      links = src + cb + '=' + cbName;
    }
    scripts.src = links;

    for (const item in attrs) {
      if (dwindow.rels) {
        scripts[item] = dwindow[item];
      }
    }

    document.body.appendChild(scripts);

    // 如果有cb 存在则表示走 cb 回调 触发 reslove
    if (cb) {
      window[cbName] = () => {
        cache[src] = 123;
        setTimeout(() => {
          resolve(1);
        }, 500);
      };
      return;
    }

    if (!dwindow.attachEvent) {
      scripts.onload = function () {
        setTimeout(() => {
          cache[src] = this;
          resolve(this);
        }, 200);
      };
    } else {
      scripts.onreadystatechange = function () {
        if (/(complete|loaded)/.test(scripts.readyState)) {
          setTimeout(() => {
            cache[src] = this;
            resolve(this);
          }, 200);
        }
      };
    }

  });
}

// remove JS
export function removeJS(name: string) {
  const script = document.querySelector(`script[src="${name}"]`);
  if (script !== null && script.parentNode) {
    script.parentNode.removeChild(script);
  }
  delete cache[name];
}