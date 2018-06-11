const path = require("path"); // 是否为开发环境
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const manifestReact = require("../vendor/vendor_react_manifest.json");
const manifestLib = require("../vendor/vendor_lib_manifest.json");
const bundleConfig = require("../vendor/vendor_config.json");
const ManifestPlugin = require("webpack-manifest-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

const config = {
  devtool: isDev ? "source-map" : "",
  mode: isDev ? "development" : "production", //开发模式
  target: "node", // node运行环境
  entry: {
    app: path.resolve(__dirname, "../client/server.app.js") //入口文件
  },
  output: {
    path: path.resolve(__dirname, "../dist/"), // 输出路径
    filename: "server-app.js", // 输出的文件名
    chunkFilename: isDev ? "server.[name].js" : "server.[name].[chunkhash:6].js",
    libraryTarget: "commonjs2", // 使用最新commonjs模块化方案,
    publicPath: "/"
  },
  // 模块管理
  module: {
    // 规则匹配，并使用loader处理
    rules: [
      // 使用babel-loader来处理js文件，及jsx文件
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        options: {
          plugins: [
            "syntax-dynamic-import",
            [
              "import-inspector",
              {
                serverSideRequirePath: true,
                webpackRequireWeakId: true
              }
            ],
            "react-loadable/babel"
          ],
          presets: ["env", "react"]
        },
        exclude: path.join(__dirname, "../node_modules")
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          // 应用多个 loader 和选项
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          // 应用多个 loader 和选项
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.l?[ec]ss$/,
        loader: "ignore-loader",//服务端不加载样式，对seo没用，浪费性能
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash:6].css",
      chunkFilename: "[id].[hash:6].css"
<<<<<<< HEAD
    }),
    new ReactLoadablePlugin({
      filename: "./dist/react-loadable.json"
=======
>>>>>>> c7120f522234d1c38273dc02f94b5491c2b53318
    })
  ]
};
module.exports = config;
