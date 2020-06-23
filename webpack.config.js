const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'earthcore-rl.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            Src: path.resolve(__dirname, 'src/'),
            Utilities: path.resolve(__dirname, 'src/utilities/'),
        }
    },
    watchOptions: {
        aggregateTimeout: 250,
        ignored: [/node_modules/, '*.test.js', ],
    },
};
