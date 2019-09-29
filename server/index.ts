const dom = new JSDOM('<!DOCTYPE html><p></p>');
global['document'] = dom.window.document;
global['window'] = dom.window
import Koa from 'koa'
import path from 'path';
import staticCache from 'koa-static-cache';
import App from './app';
import { JSDOM } from 'jsdom'
import rootPath = require('app-root-path').path;
import Loadable from 'react-loadable';
import Raven from 'raven';


const app = new Koa();
app.use(App.routes())
app.use(App.allowedMethods())
app.use(staticCache(__dirname, {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}));

Raven.config('https://981d62baf6ac480a8078c2d548889faf@sentry.aijihui.net/40').install();

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  Raven.captureException(err, function (err, eventId) {
    console.log('Reported error ' + eventId);
  });
});

// const port: any = process.env.PORT || '3006';
const port: any = '8080';
Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.log('listen on:' + port);
  });
})