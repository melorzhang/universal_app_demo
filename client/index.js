import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import App from "./App.js";
import * as reducers from "@/containers/reducers";
const store = createStore(combineReducers({ ...reducers }));
store.subscribe(() => console.log(store.getState()));
var reactDOMRender =
  window.location.port == "8000" ? ReactDOM.render : ReactDOM.hydrate; // 将App组件渲染到html页面
reactDOMRender(
  <Provider store={store}>
    <Router store={store}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
