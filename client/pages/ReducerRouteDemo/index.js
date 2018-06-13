import React from "react";
import PropTypes from "prop-types";
import NavBar from "coms/NavBar";
import { connectCounter } from "@/containers/CounterContainer";
import { connectDemo } from "@/containers/DemoContainer";
class ReducerRouteDemo extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    demoObj: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }
  render() {
    // props from container
    const {  counter } = this.props;
    const {  demoObj } = this.props;
    return (
      <div className="reducer-demo-page page">
        <NavBar />
        <div>{JSON.stringify(demoObj)}</div>
        <div>{counter}</div>
      </div>
    );
  }
}
export default connectCounter(connectDemo(ReducerRouteDemo));
