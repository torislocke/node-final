const path = require('path');
const express = require('express');


const router = express.Router(); 


router.get('/',(req, res, next) => {
    console.log('second middleware line')
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //path join detects op system
});

module.exports = router;