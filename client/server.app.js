import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";
<<<<<<< HEAD
import { getBundles } from "react-loadable/webpack";
// import stats from "../dist/react-loadable.json";
import AsyncHello from "./hello";
import path from 'path';
=======
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";
import path from "path";
import ejs from 'ejs';
import fs from "fs";
import App from "./App.js";
const template = fs.readFileSync(path.join('.','dist','server.ejs'), 'utf-8');
>>>>>>> c7120f522234d1c38273dc02f94b5491c2b53318
const app = express();
app.get("*", (req, res, next) => {
  let modules = [];
  // let bundles = getBundles(stats, modules);
  const context = {};
  if (/\./.test(req.url)) {
    console.log("url", req.url);
    next();
  } else {
    const appString = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>);
    const html = ejs.render(template, { appString });
    res.send(html);
  }
});
// 不要通过__dirname获取路径，在文件build后，__dirname会指向系统根目录造成404；
const staticPath = path.resolve(".", "dist");
// console.log("staticPath", staticPath);
// static要在返回动态数据后面使用，否则会造成直接返回静态数据；
app.use(express.static(staticPath));
Loadable.preloadAll().then(()=>{
  app.listen(3001, () => {
    console.log("Running on http://localhost:3001/");
  });
}).catch(e => {
  console.log('err', e)
})

