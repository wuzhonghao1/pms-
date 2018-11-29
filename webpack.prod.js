const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');
const webpack = require('webpack')

 module.exports = merge(common, {
     plugins: [
         new webpack.DefinePlugin({'process.env': {
             NGINX_PATH_URL: '"/mobileapps/pms-mobile-web"'
         }}),
         new UglifyJSPlugin({sourceMap: true})
    ]
 });