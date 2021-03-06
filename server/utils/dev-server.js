const proxy = require('http-proxy-middleware'); // 服务端代理插件 
const webpack = require('webpack');
const config = require('../../build/webpack.server');
const axios = require('axios'); // 异步请求插件 
const MemoryFS = require('memory-fs'); // 存取内存数据流插件 
const mfs = new MemoryFS();
const path = require('path');
const ReactSSR = require('react-dom/server');
const ejs = require('ejs'); // 获取模板，在开发环境，没有打包好的dist,所以模板的获取要到，webpack-dev-server服务获取 
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/public/server.ejs').then((response) => {
            resolve(response.data)
        }).catch((e)=>{
            console.log('get server.ejs fail');
            reject(e);
        });
    });
} // commonjs模块 
const NativeModule = require('module'); // 虚拟机 
const vm = require('vm'); // 把模块字符串，转化为可运行的模块 
const getModuleFromString = (bundleStr, filename) => { // 设置一个假模块 
    const m = { exports: {} }; // 把模块字符串包装为commonjs调用形式 
    const wrapper = NativeModule.wrap(bundleStr, filename); // 把字符串变成可执行脚本 
    const script = new vm.Script(wrapper, { displayErrors: true, filename });
    const result = script.runInThisContext();
    result.call(m.exports, m.exports, require, m);
    return m;
} // 编译webpack 
const compiler = webpack(config); // 把webpack磁盘形式的存取操作，改为内存形式的存取操作 
compiler.outputFileSystem = mfs; // 需要进行服务端渲染的App入口 
let serverApp; // webpack监听入口文件，以及入口文件引用的其他模块的变化 
compiler.watch({}, (err, stats) => {
    if (err) throw err; stats = stats.toJson(); // 打印webpack监听过程的报错 
    stats.errors.forEach(err => console.error(err)); // 打印webpack监听过程的警告 
    stats.warnings.forEach(err => console.warn(err)); // 内存中入口App路径 
    const bundlePath = path.join(config.output.path, config.output.filename);
    const bundleStr = mfs.readFileSync(bundlePath, 'utf-8');
    const m = getModuleFromString(bundleStr, config.output.filename);
    serverApp = m.exports.default;
})
module.exports = (app) => { // /public开头的path,代理到webpack-dev-server服务 
    app.use('/public', proxy({ target: 'http://localhost:8000' }));
    app.get('*', (req, res, next) => {
        getTemplate().then((template) => {
            if (!serverApp) {
                return res.send('serverApp还没编译完成，请稍后刷新！');
            }
            const appString = ReactSSR.renderToString(serverApp);
            const html = ejs.render(template, { appString }); res.send(html);
        }).catch(next);
    })
}