const express = require('express');

const router = express.Router(); 

router.get('/add-product',(req, res, next) => {
    console.log('second middleware line');
     // sends a response using express send function
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});
// app.post only triggers on post requests vs. app.get triggers on get requests
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); // redirect the url to /
})

module.exports = router;