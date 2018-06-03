const path = require('path'); // 是否为开发环境 
const isDev = process.env.NODE_ENV === 'development'
const config = {
    mode: isDev ? 'development' : 'production', //开发模式 
    target: 'node', // node运行环境 
    entry: {
        app: path.resolve(__dirname, '../client/server.app.js') //入口文件 
    }, output: {
        path: path.resolve(__dirname, '../dist/'), // 输出路径 
        filename: 'server-app.js', // 输出的文件名 
        libraryTarget: 'commonjs2' // 使用最新commonjs模块化方案 
    },
    // 模块管理 
    module: { // 规则匹配，并使用loader处理 
        rules: [ // 使用babel-loader来处理js文件，及jsx文件 
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
                options: {
                    plugins: ["syntax-dynamic-import"],
                    presets: ["env","react"]
                },
                exclude: path.join(__dirname, '../node_modules')
            }
        ]
    }
};
module.exports = config;