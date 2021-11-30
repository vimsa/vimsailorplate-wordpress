const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { hasPostCSSConfig } = require("@wordpress/scripts/utils");
const postcssPlugins = require('@wordpress/postcss-plugins-preset');
const { hasBabelConfig } = require("@wordpress/scripts/utils");

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const cssLoaders = [
   {
      loader: MiniCSSExtractPlugin.loader,
      options: {
         publicPath: 'build/',
      }
   },
   {
      loader: require.resolve('css-loader'),
      options: {
         sourceMap: !isProduction,
         modules: {
            auto: true,
         },
      },
   },
   {
      loader: require.resolve('postcss-loader'),
      options: {
         // Provide a fallback configuration if there's not
         // one explicitly available in the project.
         ...(!hasPostCSSConfig() && {
            postcssOptions: {
               ident: 'postcss',
               plugins: postcssPlugins,
            },
         }),
      },
   },
];

module.exports = {
   mode,
   ...defaultConfig,
   entry: {
      ...defaultConfig.entry,
      plugins: path.resolve(process.cwd(), 'src', 'plugins.js'),
   },
   plugins: [
      ...defaultConfig.plugins,
      new MiniCSSExtractPlugin({
         filename: ({ chunk }) => {
            if (chunk.name === 'index') {
               return '../style.css';
            }

            return `${chunk.name}.css`;
         },
      }),
   ],
   module: {
      rules: [
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[hash][ext][query]',
            }
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
               require.resolve('thread-loader'),
               {
                  loader: require.resolve('babel-loader'),
                  options: {
                     cacheDirectory:
                        process.env.BABEL_CACHE_DIRECTORY || true,
                     presets: [
                        '@wordpress/babel-preset-default',
                        '@babel/preset-react'
                     ]
                  },
               },
            ],
         },
         {
            test: /\.(c|sc|sa)ss$/,
            use: [
               ...cssLoaders,
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: !isProduction,
                     sassOptions: { includePaths: ['node_modules'] },
                     implementation: require('sass'),
                  },
               },
            ],
         },
         {
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
         },
         {
            test: /\.(bmp|png|jpe?g|gif)$/i,
            loader: require.resolve('file-loader'),
            options: {
               name: 'images/[name].[hash:8].[ext]',
            },
         },
      ]
   },
   resolve: {
      extensions: ['', '.js', '.jsx'],
   }
}