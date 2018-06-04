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
  mode: isDev ? "development" : "production", //开发模式
  target: "node", // node运行环境
  entry: {
    app: path.resolve(__dirname, "../client/server.app.js") //入口文件
  },
  output: {
    path: path.resolve(__dirname, "../dist/"), // 输出路径
    filename: "server-app.js", // 输出的文件名
    libraryTarget: "commonjs2" // 使用最新commonjs模块化方案
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
          plugins: ["react-hot-loader/babel", "syntax-dynamic-import"],
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
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("autoprefixer")(),
                require("cssnano")()
              ]
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    // for ssr,
    // new HTMLPlugin({
    //     template:
    //         "!!ejs-compiled-loader!" +
    //         path.resolve(__dirname, "../client/server.ejs"),
    //     filename: "server.ejs"
    // }),
    new webpack.DllReferencePlugin({
      manifest: manifestReact
    }),
    new webpack.DllReferencePlugin({
      manifest: manifestLib
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),

    new ManifestPlugin()
  ]
};
module.exports = config;
