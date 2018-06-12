export const INCREMENT = "INCREMENT";
export const addCounter = num => {
  return { type: INCREMENT, data: { num } };
};
export const DECREMENT = "DECREMENT";
export const subCounter = num => {
  return { type: DECREMENT, data: { num } };
};
export const DEMOOBJCHANGE='DEMOOBJCHANGE';
export const demoObj=(data={})=>{
  return { type: DEMOOBJCHANGE, data };
}
export const REFRESH_USER_STATE = "REFRESH_USER_STATE";
export const refreshUserState = (data = {}) => {
  return { type: REFRESH_USER_STATE, data };
};