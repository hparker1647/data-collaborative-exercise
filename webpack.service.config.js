const path = require('path');

module.exports = {
  entry: './src/service/index.ts',
  output: {
    path: path.resolve('./dist'),
    filename: 'service.js'
  },
  devtool: 'source-map',
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  }
}
