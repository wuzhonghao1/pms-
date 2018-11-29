const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:__dirname+'/client/entry.js', //入口文件
    output:{
        publicPath:__dirname+"/public/client/",//必须加publicPath
        //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径
        path:__dirname+"/public/client/", //输出位置
        filename:'js/main.js' //输入文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": false,
                                    "helpers": true,
                                    "regenerator": true,
                                    "useESModules": false
                                }
                            ],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                }]
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                loader: "url-loader",
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['public/client']),
    ],
}