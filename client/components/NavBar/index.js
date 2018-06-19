import React from "react";
import { Link } from "react-router-dom";
import "./index.less";
import { connectUserState } from "@/containers/UserStateContainer";
const NavBar = ({ userState, logout }) => (
  <div className="navbar">
    <Link to="/">home</Link>
    <Link to="/pagenotexist">404page</Link>
    <Link to="/reducer">Reducer demo</Link>
    <Link to="/reducer/router">Reducer router</Link>
    <Link to="/protected">protected page</Link>
    {userState.inited ? (
      <React.Fragment>
        <Link to={`/user/center/${userState.username}`}>
          user {userState.username}
        </Link>
        <a href='javascript:void(0)' onClick={logout}>logout</a>
      </React.Fragment>
    ) : (
      <Link to="/login">login</Link>
    )}
  </div>
);
export default connectUserState(NavBar);
