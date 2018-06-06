import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from "react-loadable";
import App from './App.js';
var reactDOMRender = window.location.port == '8000' ? ReactDOM.render :ReactDOM.hydrate; // 将App组件渲染到html页面 
Loadable.preloadReady().then(() => {
  reactDOMRender(<Router><App /></Router>, document.getElementById('root'));
});
