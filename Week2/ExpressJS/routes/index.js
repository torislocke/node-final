const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, rs, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/users', (req, rs, next) => { //next passes a function as an argument need to call next at the end of code to allow the request to continue to next midddleware code
    res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});


module.exports = router;

