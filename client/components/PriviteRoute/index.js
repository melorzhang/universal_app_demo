import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connectUserState } from "@/containers/UserStateContainer";
const PrivateCom = connectUserState(({ component: Component, ...props }) => {
  const { userState } = { ...props };
  console.log('props', props);
  return userState.inited ? <Component {...props} /> : <Redirect
    to={{
      pathname: "/login",
      state: { from: props.location }
    }}
  />
})
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return <PrivateCom component={Component} {...props} />
    }
    }
  />
);
export default connectUserState(PrivateRoute);
