const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundled.js",
  },
  resolve: {
    extensions: [".js", ".jsx", "scss", "css"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.jpe?g|png$/,
        exclude: /node_modules/,
        type: "asset/resource",
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "/api": "http://localhost:3000",
    },
    static: path.join(__dirname, "public"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
  },
};
