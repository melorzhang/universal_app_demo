import express from "express";
import React from "react";
import App, { HomeCom } from "./App.js";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import stats from "../dist/react-loadable.json";
import AsyncHello from "./hello";
import path from 'path';
const app = express();
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.get("*", (req, res,next) => {
  let modules = [];
  let bundles = getBundles(stats, modules);
  const context = {};
  if(/\./.test(req.url)){
    console.log('url',req.url);
    next();
  }else{
    res.send(`
    <!doctype html>
    <html lang="en">
      <head>...</head>
      <body>
        <div id="app">
        ${ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <div>
            <Route path="/" exact component={HomeCom} />
            <Route path="/ahello" component={AsyncHello} />
          </div>
        </StaticRouter>
      )}
        </div>
        <script src="/dist/main.js"></script>
      </body>
    </html>
  `);
  }
  
});
app.listen(3001, () => {
  console.log("Running on http://localhost:3001/");
});
