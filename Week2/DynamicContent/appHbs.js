const path = require('path');

// third party installs
const express = require('express'); // import express framework for utilities
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express(); // run express as a function as pass to createServer as handler

app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));  //intialize the view engine
app.set('view engine', 'hbs');
app.set('views', 'views');

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