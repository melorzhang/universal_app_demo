import * as actions from '@/containers/actions';
export const counter=(state = 0, action)=> {
  const data=action.data;
  const num=data&&data.num||1;
  switch (action.type) {
    case actions.INCREMENT:
      return state + num;
    case actions.DECREMENT:
      return state - num;
    default:
      return state;
  }
}
export const demoObj=(state={},action)=>{
  const data = action.data;
  switch (action.type) {
    case actions.DEMOOBJCHANGE:
      return { ...data, mark: actions.DEMOOBJCHANGE };
    default:
      return state;
  }
}
export const userState=(state={},action)=>{
  const data = action.data;
  switch (action.type) {
    case actions.REFRESH_USER_STATE:
      return { ...data };
    default:
      return state;
  }
}