const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, './client')
};

const getPlugins = (env = {}) => {
  let plugins = [];

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './client/img/ico'),
        to: path.resolve(__dirname, './dist/images/ico'),
      },
    ])
  )

  // Conditionally add plugins for Production builds.
  if (env.NODE_ENV=='production') {
    // console.log('MINIFYYYYYY', env)
    plugins.push(new MinifyPlugin())
  }

  // Conditionally add plugins for Development
  else {
    // console.log('NO MINIFY', env)
  }
  return plugins;
}

module.exports = (env = {}) => {
  // Use env.<YOUR VARIABLE> here:
  // console.log('env.NODE_ENV: ', env.NODE_ENV) // 'development'
  // console.log('process.env.NODE_ENV: ', process.env.NODE_ENV) // 'development'
  return {
    entry: path.join(paths.SRC, 'index.js'),
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
    plugins: getPlugins(env),
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

