const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, './client'),
  JS: path.resolve(__dirname, './client'),
};

module.exports = (env = {}) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
  console.log('Production: ', env.production) // true
  return {
    entry: path.join(paths.JS, 'index.js'),
    output: {
      path: paths.DIST,
      filename: 'index_bundle.js'
    },
    node: {
      fs: 'empty'
    },
    devServer: {
      contentBase: paths.SRC,
      inline: true,
      open: true,
      port: 3000
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      // new MinifyPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(paths.SRC, 'index.html'),
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './client/img/ico'),
          to: path.resolve(__dirname, './dist/images/ico'),
        },
      ]),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            'file-loader?limit=1024&name=images/[name].[ext]',
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            'file-loader?limit=1024&name=fonts/[name].[ext]',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }
}

