// Express JS assignment 

// third party installs
const express = require('express'); // import express framework for utilities
const app = express(); // run express as a function as pass to createServer as handler

// be careful of order a "/" is too vague needs to be specific
app.use('/',(req, res, next) => {
    console.log('This always runs');
    // either use next to travel from middleware to middleware or return response
    next();  // sends a response using express send function
});

app.use('/users',(req, res, next) => {
    console.log('this is the /users middleware')
    res.send('<p>This reflects the express middleware that handles the /users url</p>')  // sends a response using express send function
});

app.use('/',(req, res, next) => {
    console.log('second middleware line')
    res.send('<p>This reflects the express middleware that handles the / url</p>')  // sends a response using express send function
});
app.listen(5000) // app object uses express listen to create server


