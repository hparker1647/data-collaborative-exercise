const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/index.ts',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  target: 'web',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              // interpolation: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [/*'style-loader',*/ 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/app/index.html'
    })
  ]
}

