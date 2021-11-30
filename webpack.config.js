const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: './assets/javascript/index.js',
   mode: 'development',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
   },
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ]
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: '../style.css'
      }),
   ]
};