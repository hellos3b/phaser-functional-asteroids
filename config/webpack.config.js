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

  entry: {
    index: path.join(__root, 'src/index.js')
  },

  output: {
    path: path.resolve(__root, 'dist'),
    filename: '[name].js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        phaser: {
          test: /[\\/]src[\\/]lib[\\/]/
        },
      }
    }
  },

  module: {
    rules: [
      jsLoader,
      htmlLoader,
      cssLoader,
      // loadPhaser,
      // loadPIXI,
      // exposePIXI,
      // exposeP2,
      fontLoader
    ]
  },
  plugins: [
    htmlPlugin,
    cssPlugin,
    copyAssets,
    // Uncomment this line if you want to view package sizes
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    alias: {
      'phaser': path.join(__root, 'src/lib/phaser-custom.js'),
      '@': path.join(__root, 'src')
    }
  }
}