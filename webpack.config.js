const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const def = new webpack.DefinePlugin({
  NL_OS:JSON.stringify("MacOS(Darwin)"),
  NL_VERSION:JSON.stringify('1.3.0'),
  NL_NAME: JSON.stringify('5fa3b9'),
  NL_PORT: "5006",
  NL_MODE: 'browser',
  NL_TOKEN:"",
});
module.exports = {
  entry: path.resolve(__dirname, './src/app.ts'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
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

    ],
  },
  resolve: {
    extensions: ['.js','.ts'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './app/assets'),
  },
  devServer: {
    contentBase: [path.join(__dirname,'app'),path.join(__dirname,"node_modules","neutralino-client-library","dist")],
    port: 9000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
    def,
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html'
    })
 
  ],
};