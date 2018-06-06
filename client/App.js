import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AsyncHello from './hello'
import { hot } from 'react-hot-loader';
const Home = () => <div>Home</div>;
import './index.less';
 
// const App = () => {
//  return (
//   <div>
//    <Route exact path="/" component={Home} />
//    <Route exact path="/hello" component={AsyncHello} />
//   </div>
//  )
// }
 
const App = () => (
  <div>
    <h1 className="f20">hello react!</h1>
    <div className='f16'>f16</div>
    <img src={require('./assets/images/demo.png')} alt=""/>
    <img src={require('./assets/images/demo_big.jpg')} alt="" />
  </div>
);
export default hot(module)(App)