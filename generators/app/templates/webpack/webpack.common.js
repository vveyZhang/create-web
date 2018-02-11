const webpack = require('webpack');
const helper = require("./helper");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractStyle = new ExtractTextPlugin({
    filename: "style.css"
});
module.exports = {
    entry: {
        index: helper.root('src/index.js')
    },
    output: {
        path: helper.root('dist'),
        filename: '[name].[hash].js',
        publicPath: "/",
        chunkFilename: 'js/[chunkhash:8].chunk.js' //按需加载
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: extractStyle.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: "less-loader",
                        },
                        {
                            loader: "postcss-loader",
                        }],
                    fallback: "style-loader",
                }),
            },
            {
                test: /\.html$/,
                use: 'html-tpl-loader',
                include: helper.root('src')
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: 'url-loader?limit=50000&name=images/[name].[ext]'
            },
        ]
    },
    plugins: [
        extractStyle,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 指定公共 bundle 的名称。 也可指定入口  names：
            minChunks: 2
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.css', 'html', 'less']
    }

}