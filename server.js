const path = require('path');
const staticHandler = require('serve-handler');
const http = require('http');

const serverConfig = {
    cleanUrls: true,
    directoryListing: false,
    etag: true,
    public: path.resolve(__dirname, 'public'),
}
const server = http.createServer((request, response) => staticHandler(request, response, serverConfig));

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
