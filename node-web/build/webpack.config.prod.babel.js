import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig, { resolve, DEV_PATH } from './webpack.config.base';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { theme } from './theme.js';

const extractMTUI = new ExtractTextPlugin('assets/css/mtui.css');
const extractStyle = new ExtractTextPlugin(`assets/css/[name].[hash:8].css`);

console.log(__dirname);

export default webpackMerge(baseConfig, {
    // devtool: 'source-map',
    entry: {
        main: resolve('../dev/index.jsx'), // 主网站入口
        common: ['react', 'react-dom', 'react-router']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: DEV_PATH,
                use: ['babel-loader']
            },
            {
                test: /\.(css|less)$/,
                include: /node_modules/,
                use: extractMTUI.extract(['css-loader', 'postcss-loader', `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`])
            }, {
                test: /\.(css|less)$/,
                include: DEV_PATH,
                use: extractStyle.extract(['css-loader', 'postcss-loader', `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`])
            }]
    },
    plugins: [
        extractMTUI,
        extractStyle,
        new CleanWebpackPlugin(['dist/assets'], {
            root: __dirname.replace('build', '')
        }),
        // 提取主页面和魔盒页面共享的公共模块
        new webpack.optimize.CommonsChunkPlugin('common'),
        new webpack.DefinePlugin({ // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
});