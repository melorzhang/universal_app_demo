import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link,Switch } from "react-router-dom";
import AsyncHello from "./hello";
// import Hello from "./hello/Hello";
import { hot } from "react-hot-loader";
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";
import "./index.less";
const Home = () => (
  <div>
    <h1 className="f20">hello react!</h1>
    <div className="f16">f16</div>
    <Link to="/hello">hello</Link>
    <Link to="/ahello">ahello</Link>
    <img src={require("./assets/images/demo.png")} alt="" />
    <img src={require("./assets/images/demo_big.jpg")} alt="" />
  </div>
);

const NoMatch = ({ location }) => {
  console.log("come not match!");
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <p>
        <Link to="/">Go back HomePage</Link>
      </p>
    </div>
  );
};
const App = () => (
  <TransitionSwitch component={Fader}>
    <Route path="/" exact component={Home} />
    <Route path="/ahello" component={AsyncHello} />
    <Route component={NoMatch} />
  </TransitionSwitch>
);
export default hot(module)(App);
export const HomeCom = Home;
