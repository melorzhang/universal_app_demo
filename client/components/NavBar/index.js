import React from "react";
import { Link } from "react-router-dom";
import './index.less';
const NavBar = () => (
  <div className="navbar">
    <Link to="/">home</Link>
    <Link to="/pagenotexist">404page</Link>
    <Link to="/reducer">Reducer demo</Link>
    <Link to="/reducer/router">Reducer router</Link>
    <Link to="/login">login</Link>
  </div>
);
export default NavBar;
