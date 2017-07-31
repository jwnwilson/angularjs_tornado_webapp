var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./app/app.js",
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
          { test: /\.css$/, loader: "style!css" },
          { test: /\.html$/, loader: "mustache-loader" },
          { test: /\.json$/, loader: "json-loader" }]
    },

    resolve: {
        extensions: ['.js']
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: 'app/**/*.html', to: path.resolve(__dirname, "../static") }
      ])
    ]
};
