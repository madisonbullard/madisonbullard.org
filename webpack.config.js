const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: './dist',
    filename: 'index_bundle.js'
  },
  devServer: {
    inline: true,
    open: true,
    port: 3000
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000', exclude: /node_modules/ },
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}
