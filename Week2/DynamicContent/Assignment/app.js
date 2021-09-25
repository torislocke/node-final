const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res, next) => {
    res.render('index', { pageTitle: 'Add User' });
  });

app.get('/users', (req, res, next) => {
    res.render('users', {
      pageTitle: 'User',
      users: users,
    });
  });

  app.post('/add-user', (req, res, next) => {
    users.push({ name: req.body.username });
    res.redirect('/users');
  });

app.listen(5000);