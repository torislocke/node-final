const path = require('path');

// third party installs
const express = require('express'); // import express framework for utilities The express() function is a top-level function exported by the express module.
const bodyParser = require('body-parser');

const app = express(); // run express as a function as pass to createServer as handler

app.set('view engine', 'ejs'); // app.set establishes global dynamic template engine
app.set('views', 'views'); // tells express where to find the dynamic views

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); // middleware function to parse body
app.use(express.static(path.join(__dirname, 'public')));  // read access to public folder


app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found' });
});

app.listen(5000) // app object uses express listen to create server
// either use next to travel from middleware to middleware or return response
