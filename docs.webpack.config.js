const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const settings = require('./app/settings.json')
let plugins = [
    new MiniCssExtractPlugin({
        filename: 'app.css'
    })
]


plugins = plugins.concat([
    new webpack.DefinePlugin({
        NL_OS: JSON.stringify("MacOS(Darwin)"),
        NL_VERSION: JSON.stringify('1.3.0'),
        NL_NAME: JSON.stringify(settings.appname),
        NL_PORT: JSON.stringify(settings.apport),
        NL_MODE: 'browser',
        NL_TOKEN: "",
    }),
    new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        filename: "index.html",
        title: settings.appname,
        template: 'src/index.html'
    }),
    new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, 'docs')
    })
])


module.exports = {

    target: 'web',
    entry: path.resolve(__dirname, './src/docs.tsx'),
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'css-loader',
                ],
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader', options: { publicPath: '/assets/', name: "sass.worker.js" } }
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', ".tsx"],
    },
    output: {
        filename: 'app.js',
        publicPath: "/assets/",
        path: path.resolve(__dirname, './docs/assets'),
    },

    plugins: plugins,
};