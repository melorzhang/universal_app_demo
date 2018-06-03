const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
// 是否为开发环境
const isDev = process.env.NODE_ENV === 'development';
console.log('isDev',isDev);
const config = {
    mode: isDev ? 'development' : 'production', //开发模式 
    entry: {
        app: path.resolve(__dirname, '../client/index.js') //入口文件 
    },
    output: {
        path: path.resolve(__dirname, '../dist/'), // 输出路径 
        filename: '[name].[hash:8].js', // 输出的文件名（带版本号） 
        chunkFilename:'[name].[chunkhash:8].js',
        publicPath: '/public/'
    },
    // 模块管理 
    module: { // 规则匹配，并使用loader处理 
        rules: [ // 使用babel-loader来处理js文件，及jsx文件 
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                options: {
                    plugins: ["react-hot-loader/babel","syntax-dynamic-import" ],
                    presets: ["env", "react"]
                },
                exclude: path.join(__dirname, '../node_modules')
            }
        ]
    }, 
    // webpack插件 
    plugins: [
        // for ssr,
        new HTMLPlugin({ template: '!!ejs-compiled-loader!' + path.resolve(__dirname, '../client/server.ejs'), filename: 'server.ejs' })
    ]
};
if (isDev) {
    // webpack-dev-server配置
    config.devServer = {
        host: '0.0.0.0', // 域名
        port: 8000, // 端口
        contentBase: path.resolve(__dirname, '../dist/'), //静态文件路径
        overlay: true, // 开启错误调试
        hot: true, //是否开启hot-module-replacement
        publicPath: '/public/',
        historyApiFallback: { // 404默认返回
            index: '/public/index.html'
        },
        // noInfo: true
    }
    config.plugins.push( new HTMLPlugin({
        template: path.resolve(__dirname, '../client/index.html')
    }));
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}else{
    // config.plugins.push()
}
module.exports = config;