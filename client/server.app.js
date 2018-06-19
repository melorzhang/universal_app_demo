import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Loadable from "react-loadable";
import path from "path";
import ejs from "ejs";
import fs from "fs";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import * as reducers from "@/containers/reducers";
import App from "./App.js";
const template = fs.readFileSync(path.join(".", "dist", "server.ejs"), "utf-8");
const app = express();
const store = createStore(combineReducers({ ...reducers }));
const devPort = 8001;
const prodPort = 3456;
const isDev = process.env.NODE_ENV === "development";
Loadable.preloadAll()
  .then(() => {
  
    app.get("*", (req, res, next) => {
      let modules = [];
      // let bundles = getBundles(stats, modules);
      const context = {};
      const seoTxt = "'seo seo'"; //应该是一个(req.url)=>'specialSeoWords',用于模板字符串会转义，使用两层引号避免中间空格引起问题
      const title = "ssr例子"; //(req.url)=>title
      if (/\./.test(req.url)) {
        console.log("url", req.url);
        next();
      } else {
        const appString = ReactDOMServer.renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context} store={store}>
              <App />
            </StaticRouter>
          </Provider>
        );
        // console.log("appString", appString);
        const html = ejs.render(template, { appString, seoTxt, title });
        res.send(html);
      }
    });
    // 不要通过__dirname获取路径，在文件build后，__dirname会指向系统根目录造成404；
    const staticPath = path.resolve(".", "dist");
    // console.log("staticPath", staticPath);
    // static要在返回动态数据后面使用，否则会造成直接返回静态数据；
    app.use(express.static(staticPath));
    const port = isDev ? devPort : prodPort;
    app.listen(port, () => {
      console.log(`server is listening on ${port}`);
    });
  })
  .catch(e => {
    console.log("err", e);
  });
