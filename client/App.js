import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AsyncHello from './hello'
import { hot } from 'react-hot-loader';
const Home = () => <div>Home</div>;

 
// const App = () => {
//  return (
//   <div>
//    <Route exact path="/" component={Home} />
//    <Route exact path="/hello" component={AsyncHello} />
//   </div>
//  )
// }
 
const App = () => <h1>hello react</h1>
export default hot(module)(App)