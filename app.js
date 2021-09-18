const path = require('path');

// third party installs
const express = require('express'); // import express framework for utilities
const bodyParser = require('body-parser');

const app = express(); // run express as a function as pass to createServer as handler

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { dirname } = require('path');
app.use(bodyParser.urlencoded({extended: false})); // middleware function to parse body

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join__dirname, 'views', 'pageNotFound.html');
});

app.listen(5000) // app object uses express listen to create server
// either use next to travel from middleware to middleware or return response
