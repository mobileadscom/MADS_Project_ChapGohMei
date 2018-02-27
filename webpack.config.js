var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = function(env) {
  isProduction = env && env.NODE_ENV === 'production'

  var plugins = [new CopyWebpackPlugin([
      {
        from: 'index.html',
        to: 'dist/index.html'
      }, {
        from: 'data.json',
        to: 'dist/data.json'
      }, {
        from: 'options.json',
        to: 'dist/options.json'
      }, {
        from: 'src/img',
        to: isProduction
          ? 'dist/img'
          : 'img'
      }, {
        from: 'src/js',
        to: isProduction
          ? 'dist/js'
          : 'js'
      }, {
        from: 'src/css',
        to: isProduction
          ? 'dist/css'
          : 'css',
        ignore: ['*.scss']
      }
    ])];

  var devServer = {
    overlay: {
      warning: false,
      error: true
    }
  };

  if (isProduction) {
    plugins.push(new UglifyJSPlugin({
      uglifyOptions: {
        comments: false,
        compress: {
          drop_console: true
        }
      }
    }));
  }

  if (!isProduction) {
    plugins.push(new FriendlyErrorsPlugin())
  }

  return {
    entry: './src/main.js',
    output: {
      filename: isProduction
        ? 'dist/js/main.js'
        : 'js/main.js',
      libraryTarget: 'var'
    },
    devtool: isProduction
      ? ''
      : 'cheap-eval-source-map',
    devServer: devServer,
    resolve: {
      modules: [
        'node_modules', 'src'
      ],
      extensions: [
        '.js', '.css'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'bootstrap': path.join(__dirname, 'node_modules/bootstrap'),
        'slick-carousel': path.join(__dirname, 'node_modules/slick-carousel')
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            quiet: !isProduction,
            formatter: require('eslint-friendly-formatter')
          }
        }, {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }, {
          test: /\.css$/,
          use: [
            'style-loader', {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        }, {
          test: /\.scss$/,
          use: [
            'style-loader', {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader', {
              loader: 'sass-loader'
            }
          ]
        }, {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    },
    plugins: plugins
  }
};
