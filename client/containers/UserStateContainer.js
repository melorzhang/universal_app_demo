import { connect } from "react-redux";
import { refreshUserState } from "@/containers/actions.js";
import BrowserUtil from "@/utils/BrowserUtil";
import axios from "axios";
const mapStateToProps = state => {
  const localUserState = BrowserUtil.getSessionStorage("userInfo");
  if (JSON.stringify(state.userState) === "{}") {
    return localUserState
      ? { userState: JSON.parse(localUserState) }
      : { userState: {} };
  }
  return { userState: state.userState };
};
const mapDispatchToProps = dispatch => {
  return {
    refreshUserState: (data = {}) => {
      const newState = { ...data, inited: true };
      BrowserUtil.setSessionStorage("userInfo", JSON.stringify(newState));
      dispatch(refreshUserState(newState));
    },
    logout:()=>{
      BrowserUtil.setSessionStorage("userInfo", '');
      dispatch(refreshUserState({}));
    },
    getUserInfo:()=>{
      return axios.get("https://yesno.wtf/api").then(res => {
        console.log(res);
        return res.data;
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps);
export const connectUserState = connect(mapStateToProps, mapDispatchToProps);
