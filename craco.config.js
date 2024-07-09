/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const { ProvidePlugin } = require("webpack")
module.exports = {
    // ...
    devServer: {
        port: 3000
    }, 
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
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) => constructor && constructor.name === "ModuleScopePlugin"
            )
        
            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
            return webpackConfig
        },
    },
}
