const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

const cesiumDir = "node_modules/cesium/Build/Cesium"
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: `${cesiumDir}/Assets`, to: "./Assets" },
                {
                    from: `${cesiumDir}/ThirdParty`, to: './ThirdParty'
                },
                { from: `${cesiumDir}/Workers`, to: './Workers' },
                {from: `${cesiumDir}/Widgets`,to: './Widgets'},
                {from: "./src/index.html",to: './'}

            ]
        })
    ]

}