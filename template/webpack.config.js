const path = require("path");
const env  = require("@next2d/env");

const ESLintPlugin = require("eslint-webpack-plugin");
const Next2DWebpackAutoLoaderPlugin = require("@next2d/webpack-auto-loader-plugin");

module.exports = {
    "mode": "development",
    "entry": "./src/index.js",
    "output": {
        "filename": "app.js",
        "path": path.join(__dirname, `/${env()}`)
    },
    "plugins": [
        // If you use eslint, please uncomment it.
        // new ESLintPlugin({
        //     "fix": true
        // }),
        new Next2DWebpackAutoLoaderPlugin(env())
    ],
    "devServer": {
        "static": [
            { "directory": path.join(__dirname, `/${env()}`) },
            { "directory": path.join(__dirname, "/mock") }
        ],
        "historyApiFallback": true,
        "compress": false,
        "open": true
    }
};