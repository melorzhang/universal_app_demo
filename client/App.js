import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link, Switch } from "react-router-dom";

import { hot } from "react-hot-loader";
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";
import Loadable from "react-loadable";
import "./index.less";
import PrivateRoute from 'coms/PriviteRoute';
const Loading = () => <div>loading...</div>;
const App = () => (
  <TransitionSwitch component={Fader}>
    <Route
      path="/"
      exact
      component={Loadable({
        loading: Loading,
        loader: () => import("pages/Home")
      })}
    />
    <Route
      path="/reducer"
      exact
      component={Loadable({
        loading: Loading,
        loader: () => import("pages/ReducerDemo")
      })}
    />
    <Route
      path="/reducer/router"
      exact
      component={Loadable({
        loading: Loading,
        loader: () => import("pages/ReducerRouteDemo")
      })}
    />
    <Route path="/login" component={Loadable({
        loading: Loading,
        loader: () => import("pages/Login")
      })} />
    <PrivateRoute path="/protected" component={Loadable({
        loading: Loading,
        loader: () => import("pages/ProtectedPageDemo")
      })} />  
    <Route
      component={Loadable({
        loading: Loading,
        loader: () => import("pages/NoMatch")
      })}
    />
  </TransitionSwitch>
);
export default hot(module)(App);
