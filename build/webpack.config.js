const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
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
const ReactLoadablePlugin = require("react-loadable/webpack")
  .ReactLoadablePlugin;
// 是否为开发环境
const isDev = process.env.NODE_ENV === "development";
console.log("isDev", isDev);
const config = {
  mode: isDev ? "development" : "production", //开发模式
  entry: {
    app: path.resolve(__dirname, "../client/index.js") //入口文件
  },
  output: {
    path: path.resolve(__dirname, "../dist/"), // 输出路径
    filename: "[name].[hash:8].js", // 输出的文件名（带版本号）
<<<<<<< HEAD
    chunkFilename: isDev ? "app.[name].js" : "[name].[chunkhash:8].js",
=======
    chunkFilename: isDev ? "app.[name].js" : "app.[name].[chunkhash:8].js",
>>>>>>> c7120f522234d1c38273dc02f94b5491c2b53318
    publicPath: "/"
  },
  // 模块管理
  module: {
    // 规则匹配，并使用loader处理
    rules: [
      // 使用babel-loader来处理js文件，及jsx文件
      {
        test: /\.jsx?$/i,
        loader: "babel-loader",
        options: {
          plugins: [
            "react-hot-loader/babel",
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
  // webpack插件
  plugins: [
    // for ssr,
    new HTMLPlugin({
      template:
        "!!ejs-compiled-loader!" +
        path.resolve(__dirname, "../client/server.ejs"),
      filename: "server.ejs"
    }),
    new webpack.DllReferencePlugin({
      manifest: manifestReact
    }),
    new webpack.DllReferencePlugin({
      manifest: manifestLib
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash:6].css",
      chunkFilename: "[id].[hash:6].css"
    }),
    new ManifestPlugin(),
    new ReactLoadablePlugin({
      filename: "./dist/react-loadable.json"
    })
  ]
};
if (isDev) {
  // webpack-dev-server配置
  config.devServer = {
    host: "0.0.0.0", // 域名
    port: 8000, // 端口
    contentBase: path.resolve(__dirname, "../dist/"), //静态文件路径
    overlay: true, // 开启错误调试
    hot: true, //是否开启hot-module-replacement
    publicPath: "/",
    historyApiFallback: {
      // 404默认返回
      index: "/index.html"
    }
    // noInfo: true
  };
  config.plugins.push(
    ...[
      new HTMLPlugin({
        template: path.resolve(__dirname, "../client/index.html")
      }),
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, "../vendor/*.dll.js")
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]
  );
} else {
  config.plugins.push(
    ...[
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } }
      }),
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, "../vendor/*.dll.js")
      }),
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  );
}
module.exports = config;
