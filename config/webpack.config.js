const path = require("path")

const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const __root = path.join(__dirname, '..')
const phaserModule = path.join(__root, 'node_modules/phaser-ce/')

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

// Expose PIXI and p2 so Phaser can use them from window.
const exposePhaser = {
  test: /phaser-split\.js$/,
  use: [{
    loader: 'expose-loader',
    options: 'Phaser'
  }]    
}
const exposePIXI = {
  test: /pixi\.js$/,
  use: [{
    loader: 'expose-loader',
    options: 'PIXI'
  }]    
}

const exposeP2 = {
  test: /p2\.js$/,
  use: [{
    loader: 'expose-loader',
    options: 'p2'
  }]    
}

const fontLoader = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
        name: '[name].[ext]',
        outputPath: 'fonts/'
    }
}]
}

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})

const cssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
})

const copyAssets = new CopyWebpackPlugin([ 
  {from: 'assets', to: 'assets' }
])

module.exports = {
  devtool: 'source-map',

  module: {
    rules: [
      jsLoader,
      htmlLoader,
      cssLoader,
      exposePhaser,
      exposePIXI,
      exposeP2,
      fontLoader
    ]
  },
  plugins: [
    htmlPlugin,
    cssPlugin,
    copyAssets,
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    alias: {
      'phaser': path.join(phaserModule, 'build/custom/phaser-split.js'),
      'pixi': path.join(phaserModule, 'build/custom/pixi.js'),
      'p2': path.join(phaserModule, 'build/custom/p2.js'),
      '@': path.join(__root, 'src')
    }
  }
}