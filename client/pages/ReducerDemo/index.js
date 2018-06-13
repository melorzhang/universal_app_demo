import React from "react";
import PropTypes from "prop-types";
import NavBar from "coms/NavBar";
import { connectCounter } from "@/containers/CounterContainer";
import { connectDemo } from "@/containers/DemoContainer";
class ReducerDemo extends React.Component {
  static propTypes = {
    addCounter: PropTypes.func.isRequired,
    subCounter: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
    placeDemoData: PropTypes.func.isRequired,
    demoObj: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }
  render() {
    // props from container
    const { addCounter, subCounter, counter } = this.props;
    const { placeDemoData, demoObj } = this.props;
    return (
      <div className="reducer-demo-page page">
        <NavBar />
        <div onClick={() => addCounter(2)}>add</div>
        <div onClick={() => subCounter(3)}>sub</div>
        <div>{counter}</div>
        {demoObj.a ? null : (
          <div onClick={() => placeDemoData({ a: 1 })}>demo A</div>
        )}
        {demoObj.b ? null : (
          <div onClick={() => placeDemoData({ b: 1 })}>demo B</div>
        )}
      </div>
    );
  }
}
export default connectCounter(connectDemo(ReducerDemo));
