var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
      "./apps/main/scripts/app.js",
      "./apps/main/style/main.scss",
      "bootstrap-loader",
      "font-awesome-loader!./font-awesome.config.js"
    ],
    output: {
        path: path.resolve(__dirname, "../static"),
        filename: "bundle.js",
        sourceMapFilename: "bundle.js.map",
        publicPath: "./static/"
    },
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
          { test: /\.json$/, loader: "json-loader" },
          { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },
          { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
          { test: /\.(ttf|eot)$/, loader: 'file-loader' },
           // parse config to build font-awesome source
          {
            test: /font-awesome\.config\.js/,
            use: [
              { loader: 'style-loader' },
              { loader: 'font-awesome-loader' },
            ],
          }

        ]
    },

    resolve: {
        extensions: ['.js']
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: 'apps/**/*.html', to: path.resolve(__dirname, "../static") },
        { from: 'components/**/*.html', to: path.resolve(__dirname, "../static") },
        { from: 'apps/**/*.jpg', to: path.resolve(__dirname, "../static") },
        { from: 'components/**/*.jpg', to: path.resolve(__dirname, "../static") },
        { from: 'apps/**/*.png', to: path.resolve(__dirname, "../static") },
        { from: 'components/**/*.png', to: path.resolve(__dirname, "../static") },
        { from: 'apps/**/*.svg', to: path.resolve(__dirname, "../static") },
        { from: 'components/**/*.svg', to: path.resolve(__dirname, "../static") },
        { from: 'media/**/*.png', to: path.resolve(__dirname, "../static") },
        { from: 'media/**/*.svg', to: path.resolve(__dirname, "../static") },
        { from: 'media/**/*.jpg', to: path.resolve(__dirname, "../static") },
        { from: 'media/**/*.ico', to: path.resolve(__dirname, "../static") },

      ]),
      new ExtractTextPlugin('../static/css/style.css')
    ]
};
