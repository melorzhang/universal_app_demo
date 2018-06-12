import React from "react";
import { connect } from "react-redux";
import { demoObj } from "@/containers/actions.js";
const mapStateToProps = (state, ownProps) => {
  return { demoObj: state.demoObj };
};
const mapDispatchToProps = dispatch => {
  return { placeDemoData: (data = {}) => dispatch(demoObj(data)) };
};
export default connect(mapStateToProps, mapDispatchToProps);
export const connectDemo = connect(mapStateToProps, mapDispatchToProps);
