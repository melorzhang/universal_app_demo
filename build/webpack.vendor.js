const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const AssetsPlugin = require('assets-webpack-plugin');
const reacts = Object.keys(pkg.dependencies).filter(item => /^react/.test(item));
// const lib = Object.keys(pkg.dependencies).filter(item => !/^react/.test(item));
const lib=['axios','redux']
console.log(reacts,lib);
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  entry: {
    'vendor_react': reacts,
    'vendor_lib': lib,
  },
  devtool: '#source-map',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../vendor'),
    filename: '[name]_[chunkhash:6].dll.js',
    library: '[name]_[chunkhash:6]'
  },
  plugins: [
    new CleanWebpackPlugin(["./vendor"], { root:path.resolve(__dirname,'../')}),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../vendor', '[name]_manifest.json'),
      name: '[name]_[chunkhash:6]',
    }),
    new AssetsPlugin({
      filename: 'vendor_config.json',
      path: path.resolve(__dirname, '../vendor')
    })
  ]
};