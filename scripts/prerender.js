const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const urlList = require('../config/prerender.config.js');

(async () => {
  for (let i = 0; i < urlList.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.uptradeit.com' + urlList[i].url + '?origin=mail');
    const html = await page.content()
    fs.writeFileSync(path.join(__dirname + '/../public/') + urlList[i].fileName, html)
    await browser.close();
  }
})();