const webpack = require('webpack');
module.exports = {
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        inline: true,
        contentBase: 'src',
        watchContentBase: true
    }
}