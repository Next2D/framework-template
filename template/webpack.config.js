const path = require("path");
const env  = require("@next2d/env");

const ESLintPlugin = require("eslint-webpack-plugin");
const Next2DWebpackAutoLoaderPlugin = require("@next2d/webpack-auto-loader-plugin");

module.exports = {
    "mode": "development",
    "entry": path.resolve(__dirname, "src/index.js"),
    "output": {
        "filename": "app.js",
        "path": path.resolve(__dirname, "dist")
    },
    "resolve": {
        "alias": {
            "@": path.resolve(__dirname, "src")
        }
    },
    "module": {
        "rules": [
            {
                "test": /\.(png|svg|jpg|jpeg|gif)$/i,
                "type": "asset/inline"
            }
        ]
    },
    "plugins": [
        // If you use eslint, please uncomment it.
        // new ESLintPlugin({
        //     "fix": true
        // }),
        new Next2DWebpackAutoLoaderPlugin(env(), { "LICENSE": false })
    ],
    "devServer": {
        "static": [
            { "directory": path.resolve(__dirname, "dist") },
            { "directory": path.resolve(__dirname, "mock") }
        ],
        "watchFiles": "src/config/*.json",
        "historyApiFallback": true,
        "compress": false,
        "open": true
    },
    "watchOptions": {
        "ignored": [
            path.resolve(__dirname, "src/config/Config.js"),
            path.resolve(__dirname, "src/Packages.js")
        ]
    }
};
