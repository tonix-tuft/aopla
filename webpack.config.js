const webpack = require("webpack");
const libraryName = "aopla";
let outputFile;
const library = "AOPla";
const srcEntryPoint = "index.js";
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const env = process.env.WEBPACK_ENV;

if (env === "build") {
  outputFile = libraryName + ".min.js";
} else {
  outputFile = libraryName + ".js";
}

var config = {
  entry: __dirname + "/src/" + srcEntryPoint,
  devtool: "source-map",
  plugins: [
    new ESLintPlugin({
      extensions: [`js`, `jsx`],
      exclude: [`/node_modules/`]
    })
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: outputFile,
    library: library,
    libraryTarget: "umd",
    globalObject:
      "(typeof self !== 'undefined' ? self : (typeof global !== 'undefined' ? global : this))",
    umdNamedDefine: true,
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            {
              plugins: [
                "@babel/plugin-proposal-optional-chaining",
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                // [
                //   "@babel/plugin-proposal-decorators",
                //   { decoratorsBeforeExport: false },
                // ],
                "@babel/plugin-proposal-object-rest-spread",
                ["@babel/plugin-proposal-class-properties", { loose: true }] // if using @babel/plugin-proposal-decorators with "legacy": true.
                // "@babel/plugin-proposal-class-properties",
                // [
                //   "@babel/plugin-transform-runtime",
                //   {
                //     "corejs": false,
                //     "regenerator": true
                //   }
                // ]
              ]
            }
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
};

if (env === "build") {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  };
  config.mode = "production";
  config.devtool = false;
} else {
  config.mode = "development";
}

module.exports = config;
