const path = require('path');
const express = require('express');


const rootDir = require('../utils/path');
const router = express.Router(); 


router.get('/',(req, res, next) => {
    console.log('second middleware line')
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); //path join detects op system
});

module.exports = router;