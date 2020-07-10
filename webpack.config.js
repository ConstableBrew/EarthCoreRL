const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: [/node_modules/, /public/, /coverage/, /\.test\.js$/],
                use: ['babel-loader'],
            },
        ],
    },
    output: {
        filename: 'earthcore-rl.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
        },
        extensions: ['*', '.js'],
    },
    watchOptions: {
        aggregateTimeout: 250,
        ignored: [/node_modules/, /public/, /coverage/, /\.test\.js/],
    },
};
