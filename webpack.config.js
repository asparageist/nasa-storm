const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js', // change this line
    marsRover: './src/marsData/marsData.js', // add this line
    earth: './src/earthData/earthData.js'
    spacePhenomena: './src/space-phenomena/space-phenomena.js',
    search: './src/search/search.js',
    about: './src/about/about.js',

  },
  output: {
    filename: '[name].bundle.js', // change this line
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: './dist',
  },
  devtool: 'eval-source-map',
  plugins: [
    new ESLintPlugin(),
    new Dotenv(),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      title: '',
      template: './src/index.html',
      inject: 'body',
      chunks: ['main'], // add this line
    }),
    new HtmlWebpackPlugin({
      filename: 'mars-rover.html',
      template: './src/mars-rover.html',
      chunks: ['marsRover'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({

      filename: 'earth.html',
      template: './src/earth.html',
      chunks: ['earth'],

      filename: 'space-phenomena.html',
      template: './src/space-phenomena.html',
      chunks: ['spacePhenomena'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: './src/search.html',
      chunks: ['search'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './src/about.html',
      chunks: ['about'],
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(gif|png|avif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
