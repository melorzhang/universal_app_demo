import React from "react";
import { Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";
import Loadable from "react-loadable";
import "./index.less";
import PrivateRoute from 'coms/PriviteRoute';
import Loading from 'coms/Loading';
import routes, { privateRoutes } from "@/routes";
const NoMatch = Loadable({
  loading: Loading,
  loader: () => import("pages/NoMatch")
})
const App = () => (
  <TransitionSwitch component={Fader}>
    {routes.map(props => <Route {...props} />)}
    {privateRoutes.map(props => <PrivateRoute {...props} />)}
    <Route component={NoMatch} />
  </TransitionSwitch>
);

export default hot(module)(App);
