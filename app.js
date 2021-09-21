const path = require('path');

// third party installs
const express = require('express'); // import express framework for utilities
const bodyParser = require('body-parser');

const app = express(); // run express as a function as pass to createServer as handler

// ****   ejs configuration for displaying views
// app.set('view engine', 'ejs');  //set view engine to ejs for dynamic views
// app.set('views', 'views'); //direct to views folder 

// ****  pug configuration for displaying views
app.set('view engine', 'ejs'); // register pug as view engine
app.set('views', 'views'); // this does not need to be set as views is the default

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // middleware function to parse body
app.use(express.static(path.join(__dirname, 'public')));  // read access to public folder


app.use('/admin', adminData.routes); // access routes object
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found'});
});

app.listen(5000) // app object uses express listen to create server
// either use next to travel from middleware to middleware or return response
