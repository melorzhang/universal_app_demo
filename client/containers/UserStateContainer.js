import React from "react";
import { connect } from "react-redux";
import { refreshUserState } from "@/containers/actions.js";
const mapStateToProps = (state) => {
  const localUserState=sessionStorage.getItem('userInfo');
  return { userState:  state.userState||JSON.parse(localUserState) };
};
const mapDispatchToProps = dispatch => {
  return { refreshUserState: (data = {}) => 
  {
    const newState={...data,inited:true}
    sessionStorage.setItem('userInfo',JSON.stringify(newState))
    dispatch(refreshUserState(newState)) 
  }};
};
export default connect(mapStateToProps, mapDispatchToProps);
export const connectUserState = connect(mapStateToProps, mapDispatchToProps);
