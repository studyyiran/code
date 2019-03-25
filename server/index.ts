const dom = new JSDOM('<!DOCTYPE html><p></p>');
global['document'] = dom.window.document;
global['window'] = dom.window
import Koa from 'koa'
import path from 'path';
import staticCache from 'koa-static-cache';
import koaStatic from 'koa-static';
import mount from 'koa-mount'
import App from './app';
import { JSDOM } from 'jsdom'


const app = new Koa();
app.use(App.routes())
app.use(App.allowedMethods())
app.use(staticCache(path.resolve(__dirname, '/../build'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}));

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


const port: any = process.env.PORT || '3008';
app.listen(port, () => {
  console.log('listen on:' + port);
});