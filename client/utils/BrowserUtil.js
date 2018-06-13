// for ssr, need to wrap some browserMethod into function;
const ifBrowser = process.browser;
const BrowserUtil = {
  getSessionStorage: key => sessionStorage.getItem(key),
  setSessionStorage: (key, val) => sessionStorage.setItem(key, val)
};
const proxy=new Proxy(BrowserUtil,{
  get: function (target, key, receiver) {
    if(typeof target[key]==='function'){
      return ifBrowser ? Reflect.get(target, key, receiver):function () {
        console.log('call in node,return nothing',key,arguments)
      };
    }
    return Reflect.get(target, key, receiver);
  },
})
export default proxy;