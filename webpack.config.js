var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    "resolve": {
        "extensions": [
            ".ts",
            ".js",
            ".vue"
        ],
        "modules": [
            "./node_modules"

        ],
        "symlinks": true
    },
    entry: {
        index: './app/index.js',
        //api:'./app/index1.js'
        // polyfill: './app/other/polyfill.js',
        // jquery:'./app/other/jquery.js'
        //vendor: 'moment'
    },
    output: {
        filename: '[name].js',
        publicPath: '/wgc/js/',
        path: path.resolve(__dirname, 'dist/wgc/js/'),
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',

            }, {
                test: /\.css$/,
                loader: 'css-loader'
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // })
            }, {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015', 'stage-3']
                }
            },
            {
                test: /\.less$/,
                //loader: 'less-loader',
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "less-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    limit: 10000,
                    // 路径要与当前配置文件下的publicPath相结合
                    name: '../style/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader',
                query: {
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里
                    limit: 10000,
                    name: '../fonts/[name].[ext]?[hash:7]',
                    prefix: 'font'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../style/styles.css'),

        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // })
        //  new webpack.optimize.DedupePlugin(),//去重
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor' // 指定公共 bundle 的名字。
        // }),
        // new webpack.optimize.UglifyJsPlugin(), //压缩js,
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // })
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // }),

    ]

}
