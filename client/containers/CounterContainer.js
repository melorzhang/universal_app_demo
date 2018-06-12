import React from "react";
import { connect } from "react-redux";
import { addCounter, subCounter } from "@/containers/actions.js";
const mapStateToProps = (state, ownProps) => {
  return { counter: state.counter };
};
const mapDispatchToProps = dispatch => {
  return {
    addCounter: num => dispatch(addCounter(num)),
    subCounter: num => dispatch(subCounter(num))
  };
};
export default connect(mapStateToProps, mapDispatchToProps);
export const connectCounter = connect(mapStateToProps, mapDispatchToProps);
