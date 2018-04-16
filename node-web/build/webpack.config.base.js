// webpack 配置文档
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // css样式从js文件中分离出来
import CopyWebpackPlugin from 'copy-webpack-plugin';

export const resolve = function (url) {
    return path.resolve(__dirname, url);
}
export const DEV_PATH = resolve('../dev');
const sassExt = new ExtractTextPlugin(`assets/css/[name].[hash:8].css`);

export default {
    output: {
        publicPath: '/',
        path: resolve('../dist'),
        filename: `assets/js/[name].[hash:8].js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', '.less'],
        alias: {
            '@': resolve('../dev'),
            'conf': resolve('../dev/conf')
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: DEV_PATH,
            use: ['babel-loader']
        }, {
            test: /\.(woff|eot|ttf|svg)$/,
            include: DEV_PATH,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: 'assets/fonts/[name].[ext]'
                }
            }]
        }, {
            test: /\.html$/,
            loader: 'html-loader?minimize=false'
        }, { // 图片加载处理
            test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
            include: DEV_PATH,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'assets/images/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        sassExt, // 提取出来的样式放在css-文件中
        // new HtmlWebpackPlugin({
        //     hash: true,
        //     chunks: ['phone', 'h5ds', 'pc'],
        //     template: './dev/html/edit.html',
        //     filename: 'edit.html'
        // }),
        new HtmlWebpackPlugin({
            // hash: true,
            // chunks: ['main'],
            template: resolve('../dev/index.html'),
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('../dev/assets'),
                to: resolve('../dist/assets'),
                toType: 'dir'
            }
        ])
    ]
};