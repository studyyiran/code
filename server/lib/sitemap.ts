const sm = require("sitemap");
// import sendDingTalkMessage from './sendDingtalk';
import clientRouter from "../../src/routers/index";
import { getPageList } from "../../src/containers/blog/api/blog.api";

export default () => {
  return new Promise(async (resolve, reject) => {
    let urls = [
      ...clientRouter
        .filter(v => !/\/\:\w+/.test(v.path))
        .map(v => ({ url: v.path }))
    ];

    let list = [];
    try {
      list = await getPageList({
        pageIndex: 0,
        pageSize: 1000
      });
    } catch (e) {}

    urls = [...urls, ...list.map(v => ({ url: "/" + v.slug }))];

    const sitemap = sm.createSitemap({
      hostname: "https://uptradeit.com",
      cacheTime: 600000,
      urls: urls
    });

    sitemap.toXML(function(err, xml) {
      if (!err) {
        resolve(xml);
        return;
      }

      resolve(null);
      // sendDingTalkMessage(false, false, err);
    });
  });
};
