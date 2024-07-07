/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const { ProvidePlugin } = require("webpack")
module.exports = {
    // ...
    webpack: {
        alias: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            vm: require.resolve("vm-browserify"),
            "process/browser": require.resolve("process/browser"),
        },
        plugins: {
            add: [
                new ProvidePlugin({
                    process: "process/browser",
                }),
            ],
            remove: [
                /* ... */
            ],
        },
        configure: (webpackConfig) => {
            /* ... */
            return webpackConfig
        },
    },
}
