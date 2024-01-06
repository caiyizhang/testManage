'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"//localhost:8000"'
  // API_ROOT: '"https://mock.apifox.cn/m1/3355434-0-default"'
  API_ROOT: '"https://mock.apifox.com/m1/3841634-0-default"'
})
