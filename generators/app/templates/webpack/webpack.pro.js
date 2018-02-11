var webpack = require('webpack');
var helper = require("./helper");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(
            ['dist/*'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        ),
        //去掉重复
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new CopyWebpackPlugin([
            {
                from: helper.root('src/*.html'),
                to: helper.root('dist'),
                toType: 'dir',
                flatten: true
            }
        ], {
                copyUnmodified: true,

            })
    ]
};
