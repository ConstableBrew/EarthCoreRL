const static = require('node-static');
 
// Create a node-static server instance to serve the './public' folder
const server = new static.Server('./public');
 
require('http').createServer((request, response) => {
    request.addListener('end', () => {
        server.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 8080);
