const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const srcDir = path.resolve(__dirname, "..", "src");
const distDir = path.resolve(__dirname, "..", "dist");

module.exports = {
  context: srcDir,
  devtool: "cheap-module-source-map",
  entry: ["./index.js"],
  module: {
    rules: [
      //js or jsx loader
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        include: srcDir,
      },
      //less loader
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: ["style-loader", "css-loder", "less-loader"],
      },
      // css loader
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      // scss loader
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: "[name]-[local]_[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9", // React doesn't support IE8 anyway
                  ],
                  flexbox: "no-2009",
                }),
              ],
            },
          },
          "sass-loader",
        ],
      },
      // file loader or url loader
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 10240,
              esModule: false,
            },
          },
        ],
        include: path.resolve(srcDir, "assets"),
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // specifying the maximum size of a file in bytes.
              // If the file size is equal or greater than the limit file-loader will be used (by default)
              limit: 819200,
              esModule: false,
              // Set publicPath for File loader
            },
          },
        ],
        include: path.resolve(srcDir, "assets"),
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: distDir,
    publicPath: "/",
    // At some point you'll have to debug your code, that's why I'm giving you
    // for free a source map file to make your life easier
    sourceMapFilename: "main.map",
  },
  devServer: {
    contentBase: srcDir,
    // match the output path
    publicPath: "/",
    // match the output `publicPath`
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, "index.html"),
      path: distDir,
      filename: "index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
