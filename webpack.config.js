/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const stdLibBrowser = require("node-stdlib-browser")
const {
    NodeProtocolUrlPlugin
} = require("node-stdlib-browser/helpers/webpack/plugin")
const webpack = require("webpack")

module.exports = {
    // ...
    resolve: {
        alias: stdLibBrowser
    },
    plugins: [
        new NodeProtocolUrlPlugin(),
        new webpack.ProvidePlugin({
            process: stdLibBrowser.process,
            Buffer: [stdLibBrowser.buffer, "Buffer"]
        })
    ]
}