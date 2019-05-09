import Request from 'request';
import CONFIG from '../config';
import * as moment from 'moment'

const options = (isSuccess: boolean) => {
  return {
    url: CONFIG.dingTalkHook,
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    json: true,
    body: {
      "msgtype": "markdown",
      "markdown": {
        "title": 'NodeJS定时任务',
        "text": "#### 美国BMB Sitemap 生成" + (isSuccess ? "成功" : "失败") + "\n\n" +
          "> 时间：" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + "\n\n" +
          "> 部署启动时由PM2进程(" + (process.env.NODE_APP_INSTANCE || "本机") + ")生成\n\n" +
          "> 下次生成时间：" + moment(addHours(new Date(), 6)).format('YYYY-MM-DD HH:mm:ss') + "\n\n" +
          "> ###### [查看sitemap](http://uptradeit.com/sitemap.xml) \n\n"
      }
    }
  }
};

const addHours = (date: Date, hours: number = 1) => {
  date.setHours(date.getHours() + hours);
  return date;
}


export default (isSuccess: boolean) => {
  Request(options(isSuccess), (err, request, body) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(request)
    console.log(body);
  });
}