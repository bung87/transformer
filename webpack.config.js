const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack  = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const isDevServer = process.env.WEBPACK_DEV_SERVER;
const settings = require('./app/settings.json')
let plugins = [
  
  new MiniCssExtractPlugin({
    filename: 'app.css'
  })

]

if (isDevServer) {
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
      path: "/assets/",
      // filename: path.resolve("public", "index.html"),
      title: settings.appname,
      template: 'src/index.html'
    })
  ])
}

module.exports = {
 
  target: 'web',
  entry: path.resolve(__dirname, './src/app.tsx'),
  node: {
    fs: "empty"
  },
  optimization: {
    'minimize': true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
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
        use: { loader: 'worker-loader' ,options: { publicPath: '/assets/',name:"sass.worker.js" }}
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', ".tsx"],
  },
  output: {
    filename: 'app.js',
    publicPath: "/assets/",
    path: path.resolve(__dirname, './app/assets'),
  },
  devServer: {
    contentBase: [path.join(__dirname, 'app'),path.join("node_modules","neutralino-client-library/dist/")],
    port: 9000,
  },
  plugins: plugins,
};