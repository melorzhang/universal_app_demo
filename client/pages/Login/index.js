import React from "react";
import { connectUserState, getUserInfo } from "@/containers/UserStateContainer";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
class Login extends React.Component {
  static propTypes = {
    refreshUserState: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error:{},
    };
  }
  submit = () => {
    // console.log(this.state);
    const { refreshUserState, getUserInfo } = this.props;
    getUserInfo().then(res=>{
      // 模拟的接口，随机返回yes、no
      console.log(res);
      if(res.answer!=='yes'){
        console.log('check fail try another password');
        this.setState({
          error:{
            msg:'账户或密码错误，请重试'
          }
        })
      }else{
        refreshUserState(this.state);
      }
      
    });
    
  };
  formChangeHandler = id => e => {
    this.setState({
      [id]: e.target.value
    });
  };
  render() {
    const { userState } = this.props;
    if (userState.inited) {
      return <Redirect to="/" />;
    }
    const {msg}=this.state.error;
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
        {msg?<div>错误：{msg}</div>:null}
      </div>
    );
  }
}

export default connectUserState(Login);
