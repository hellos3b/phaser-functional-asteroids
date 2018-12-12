const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
}

const htmlLoader = {
  test: /\.html$/,
  use: [
    {
      loader: "html-loader",
      options: { minimize: true }
    }
  ]
}

const cssLoader = {
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader, 
    "css-loader",
    'less-loader'
  ]
}

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})

const cssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
})

module.exports = {
  module: {
    rules: [
      jsLoader,
      htmlLoader,
      cssLoader
    ]
  },
  plugins: [
    htmlPlugin,
    cssPlugin
  ]
}