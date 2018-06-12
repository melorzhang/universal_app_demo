import React from "react";
import { connect } from "react-redux";
import { refreshUserState } from "@/containers/actions.js";
const mapStateToProps = (state, ownProps) => {
  return { userState: state.userState };
};
const mapDispatchToProps = dispatch => {
  return { refreshUserState: (data = {}) => dispatch(refreshUserState({...data,inited:true})) };
};
export default connect(mapStateToProps, mapDispatchToProps);
export const connectUserState = connect(mapStateToProps, mapDispatchToProps);
