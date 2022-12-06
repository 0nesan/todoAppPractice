const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const Dotenv = require ('dotenv-webpack') ;

module.exports = {
  entry:"./src/index.ts",
  
  resolve: {
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
  },
  
  output:{
    path:path.resolve(__dirname, "dist"),
    filename:"./src/index.js",
    clean:true,
  },

  plugins:[
    new HtmlPlugin({
      template:"./index.html"
    }),
    new CopyPlugin({
      patterns:[{
        from:"./static"
      }]
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv(),
  ],

  devServer:{
    host:"localhost"
  },

  module:{
    rules:[
      {
        test:/\.s?css$/,
        use:[
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.js$/, 
        exclude: /node_module/,
        use: [
          "babel-loader",
        ],
      },
      {
        test: /\.ts$/, 
        exclude: /node_module/,
        use: [
          "ts-loader",
        ],
      },
    ]
  }
}
