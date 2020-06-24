const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'earthcore-rl.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
        }
    },
    watchOptions: {
        aggregateTimeout: 250,
        ignored: [/node_modules/, '*.test.js', ],
    },
};
