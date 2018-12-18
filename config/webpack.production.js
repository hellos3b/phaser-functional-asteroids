const path = require('path')
const base = require('./webpack.config')

const __root = path.join(__dirname, '..')

module.exports = Object.assign({}, base, {
  devtool: false
})