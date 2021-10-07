const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('615e2433e83a84d4b3816800')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://tlocke:MongoDB12@cluster0.sd8ux.mongodb.net/ecommerce?retryWrites=true&w=majority'
).then(result => {
  User.findOne().then(user => { // if it finds a user don't create one
    if (!user) {
      const user = new User({
        name: 'Tori',
        email: 'tbos@mail.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(5000);
})
.catch(err => {
  console.log(err);
});
