const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const env = process.env.NODE_ENV || 'development';
const outputPath = path.resolve('./dist');
module.exports = {
    context: __dirname,
    mode: env,
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        compress: true,
        port: 3002
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(jpe?g|png)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        mimetype: 'image/png',
                        limit: 1024,
                    },
                },
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf|gif)$/i,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    resolve: {
        modules: [path.join(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: '滑雪',
            template: path.resolve('./src/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(outputPath, 'assets') },
            ],
        }),
    ]
};
