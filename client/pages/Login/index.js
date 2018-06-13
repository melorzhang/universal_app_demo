import React from "react";
import { connectUserState } from "@/containers/UserStateContainer";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
class Login extends React.Component {
  static propTypes = {
    refreshUserState: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  submit = () => {
    // console.log(this.state);
    const {refreshUserState}=this.props;
    refreshUserState(this.state);
  };
  formChangeHandler = id => e => {
    this.setState({
      [id]: e.target.value
    });
  };
  render() {
    const { userState } = this.props;
    if(userState.inited){
      return <Redirect to='/'/>
    }
    return (
      <div>
        <input
          type="text"
          value={this.state.username}
          onChange={this.formChangeHandler("username")}
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.formChangeHandler("password")}
        />
        <input type="button" value="登录" onClick={this.submit} />
      </div>
    );
  }
}

export default connectUserState(Login);
