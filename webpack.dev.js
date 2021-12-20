const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

 module.exports = merge(common, {
   mode: 'development',
   entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
   devtool: 'inline-source-map',
   devServer: {
     historyApiFallback: true,
   },
 });