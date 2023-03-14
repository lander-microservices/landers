const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const fs = require('fs');
try{
  fs.mkdirSync('./dist')
} catch(error){}
fs.copyFileSync('./src/_redirects', "./dist/_redirects")



const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8082/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8082,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "lander",
      filename: "remoteEntry.js",
      remotes: {
      },
      exposes: {
        "./Lander1":"./src/pages/lander1",
        "./Lander2":"./src/pages/lander2",
        "./Lander3":"./src/pages/lander3",
        "./Lander4":"./src/pages/lander4",
        "./Lander5":"./src/pages/lander5",
        "./Lander6":"./src/pages/lander6",
        "./Lander7":"./src/pages/lander7",
        "./Lander8":"./src/pages/lander8",
        "./Lander9":"./src/pages/lander9",
        "./Lander10":"./src/pages/lander10",
        "./Lander11":"./src/pages/lander11",
        "./Lander12":"./src/pages/lander12",
        "./Lander13":"./src/pages/lander13",
        "./Lander14":"./src/pages/lander14",
        "./Lander15":"./src/pages/lander15",
        "./Lander16":"./src/pages/lander16",
        "./Lander17":"./src/pages/lander17",
        "./Lander18":"./src/pages/lander18",
        "./Lander19":"./src/pages/lander19",
        "./Lander20":"./src/pages/lander20",
        "./Lander21":"./src/pages/lander21",
        "./Lander22":"./src/pages/lander22",
        "./Lander23":"./src/pages/lander23",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
