const path = require('path')

const webpackconfig = {
    entry: path.join(__dirname,'./index.es6.js'),
    output: {
        filename: 'index.js',
        path: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            }
        ]
    }
}

module.exports = webpackconfig