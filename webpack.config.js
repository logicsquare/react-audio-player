const path = require("path");

module.exports = {
  mode: "production",
  target: "web",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.min.js",
    libraryTarget: "umd",
    library: "@logicsquare/react-audio-player",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|)$/i,
        loader: "file-loader",
        options: {
          name: "/assets/img/[name].[ext]",
        },
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "ReactDOM",
  },
};
