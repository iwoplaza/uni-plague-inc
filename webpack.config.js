const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env, argv) {
  const development = argv.mode === 'development';

  console.log(`Mode: ${development ? 'DEV': 'PROD'}`);

  return {
    mode: env.mode,
    entry: {
      index: path.join(__dirname, 'src', 'index.ts')
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.js']
    },
    devtool: development ? 'inline-source-map' : undefined,
    devServer: {
      contentBase: './dist',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/templates/index.html'
      }),
      new MiniCssExtractPlugin(),
    ]
  };
}