var _env = process.env.NODE_ENV;
var config = _env == "development" ? require('./config/webpack.dev') : require('./config/webpack.pro')
var merge = require('webpack-merge');
var common = require('./config/webpack.common');
module.exports = merge(common, config);

