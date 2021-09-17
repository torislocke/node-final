const http = require('http');  // import server from node.js global module
const routes = require('./app-routes');

const server = http.createServer(routes);

server.listen(5000); // local host 5000 in for development - production it would use defaul port 80