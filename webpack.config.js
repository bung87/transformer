const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack  = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevServer = process.env.WEBPACK_DEV_SERVER;

const plugins = [
  
  new MiniCssExtractPlugin({
    filename: 'app.css'
  })

]

if (isDevServer) {
  plugins.concat([
    new webpack.DefinePlugin({
      NL_OS: JSON.stringify("MacOS(Darwin)"),
      NL_VERSION: JSON.stringify('1.3.0'),
      NL_NAME: JSON.stringify('5fa3b9'),
      NL_PORT: "5006",
      NL_MODE: 'browser',
      NL_TOKEN: "",
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html'
    })
  ])
}

module.exports = {
  optimization: {
    splitChunks: {
      // chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  target: 'web',
  entry: path.resolve(__dirname, './src/app.tsx'),
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
    contentBase: [__dirname, path.join(__dirname, 'app'), path.join(__dirname, "node_modules", "neutralino-client-library", "dist")],
    port: 9000,
  },
  plugins: plugins,
};