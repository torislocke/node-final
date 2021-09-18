const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, rs, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/users', (req, rs, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});


module.exports = router;

