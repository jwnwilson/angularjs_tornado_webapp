var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ["./apps/main/scripts/app.js", "./apps/main/style/main.scss"],
    output: {
        path: path.resolve(__dirname, "../static/js"),
        filename: "bundle.js",
        sourceMapFilename: "bundle.js.map",
    },

    watch: true,

    module: {
        loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "eslint-loader",
              enforce: "pre",
              options: {
                configFile: './config/eslint.json'
              }
          },
          {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader']
              })
          },
          { test: /\.css$/, loader: "style!css" },
          { test: /\.html$/, loader: "mustache-loader" },
          { test: /\.json$/, loader: "json-loader" }

        ]
    },

    resolve: {
        extensions: ['.js']
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: 'apps/**/*.html', to: path.resolve(__dirname, "../static") },
        { from: 'components/**/*.html', to: path.resolve(__dirname, "../static") }
      ]),
      new ExtractTextPlugin('../css/style.css')
    ]
};
