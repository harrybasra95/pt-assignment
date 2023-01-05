const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
     mode: 'development',
     entry: './src/App.jsx',
     devtool: 'inline-source-map',
     output: {
          path: path.join(__dirname, '/dist'),
          filename: 'bundle.js',
     },
     devtool: 'inline-source-map',
     devServer: {
          static: './dist',
          historyApiFallback: true,
     },
     module: {
          rules: [
               {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
               },
               {
                    test: /\.(css)$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
               },
               {
                    test: /\.(s(a|c)ss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
               },
               {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: 'file-loader',
               },
          ],
     },
     resolve: {
          alias: {
               Components: path.resolve(__dirname, './src/Components'),
               Content: path.resolve(__dirname, './src/Content'),
               Layouts: path.resolve(__dirname, './src/Layouts'),
               Images: path.resolve(__dirname, './src/Assets/Images'),
               Data: path.resolve(__dirname, './src/Assets/Data'),
               Hooks: path.resolve(__dirname, './src/Hooks'),
          },
          extensions: ['.jsx', '.ts', '.js'],
     },
     plugins: [
          new HtmlWebpackPlugin({
               template: './public/index.html',
          }),
     ],
};
