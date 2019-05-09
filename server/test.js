const Koa = require('koa')
const Request = require('request')
const SitemapGenerator = require('sitemap-generator');
var schedule = require('node-schedule');

const app = new Koa();

var curl = () => {
  const options = {
    url: 'https://oapi.dingtalk.com/robot/send?access_token=9586e21e95d59e2fc3579d27997450694fcaaa0b10da01a4f0cd73ccfd68f456',
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    json: true,
    body: {
      "msgtype": "markdown",
      "markdown": {
        "title": '定时任务消息',
        "text": "#### 美国BMB Sitemap 生成成功\n\n" +
          "> 时间：" + new Date() + "\n\n" +
          "> 部署启动时由PM2进程(0)生成\n\n" +
          "> 下次生成时间：" + new Date() + "\n\n" +
          "> ###### [查看](http://www.thinkpage.cn/) \n\n"
      }
    }
  };
  Request(options, (err, request, body) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(request)
    console.log(body);
  });
}

app.use((ctx) => {

  var generator = SitemapGenerator('https://uptradeit.com', {
    maxDepth: 0,
    filepath: './sitemap.xml',
    maxEntriesPerFile: 50000,
    stripQuerystring: true,
    lastMod: true
  });

  generator.on('done', () => {
    console.log('done');
    // curl();
  });

  generator.on('error', (error) => {
    console.log(error);
    // => { code: 404, message: 'Not found.', url: 'http://example.com/foo' }
  });
  generator.start();

  ctx.body = '222'
})


app.listen('3302', () => {
  curl();
  console.log('listen on:3302');
});