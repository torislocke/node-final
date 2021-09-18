// spin up a Node.js-driven server running on port 3000. 
const http = require('http');  // import server from node.js global module
const routes = require('./prove01-routes');
const express = require('express');
const appExpress = express(); // run express as a function (express pkg exports a function)
const server = http.createServer(routes);

server.listen(3000); // local host 3000 in for development - production it would use defaul port 80

