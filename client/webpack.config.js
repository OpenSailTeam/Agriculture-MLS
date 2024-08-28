const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point for TypeScript
  output: {
    filename: 'bundle.js', // Output bundled file
    path: path.resolve(__dirname, 'dist'), // Output directory
    publicPath: '',
  },
  mode: 'production', // Change to 'development' for development mode
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Transpile TS and TSX files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/, // Load CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // Load images
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Cleans output directory before each build
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML template file
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
