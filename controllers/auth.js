const crypto = require('crypto'); // library that creates unique secure random value

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// import with destructor vlidation Result function to gather all errors
const { validationResult } = require('express-validator');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key = process.env.API_KEY
    }
  })
);
// using connect flash display error message

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  // if there is a message then retrieve it and flash on screen
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    // set fields to empty when page launches
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
    // if there is a message then retrieve it and flash on screen
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: message,
      oldInput: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      validationErrors: []
    });
  };

  exports.postLogin = (req, res, next) => {
  // retrieve information from the request body
  const email = req.body.email;
  const password = req.body.password;
  // construct error validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      // flash message 
      errorMessage: errors.array()[0].msg, // display first error of error array
     // save user input for better user experience
     oldInput: {
      email: email,
      password: password
    },
    validationErrors: errors.array() // return full array of errors
    });
  }
// look at email field and see if value matches
User.findOne({ email: email })
.then(user => {
  if (!user) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: 'Invalid email address.',
          // keep the user input for better user experience
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: [{param: 'email', param: 'password'}]
        });
      }
      // using bcrypt algorithm checked hashed password using bcrypt compare
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            // req.session.user = user;
            req.session.user = user;
            // save the session to ensure no timing issue for redirect
            // redirect is fired independent of session being saved to mogo
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid password.',
                // keep the user input for better user experience
                oldInput: {
                  email: email,
                  password: password
                },
                validationErrors: [{param: 'email', param: 'password'}]
              });
            })
            .catch(err => {
              console.log(err);
              res.redirect('/login');
            });
        })
        .catch(err => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    };
// retrieve email password and confirmed password after validation
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
// validate the user imput and collect errors into errors object
const errors = validationResult(req);
  // call if empty method - true or false
  if (!errors.isEmpty()) {
    console.log(errors.array()); // see errors in console log
    // if not empty indicate validation failed with status 422
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg, // ouput first error array of errors
          // keep the user input for better user experience
          oldInput: {
            email: email,
            password: password,
            confirmPassword: req.body.confirmPassword
          },
          validationErrors: [{param: 'email', param: 'password', param: 'confirmPassword'}]
        });
      }

      bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
      // construct new user and store email, password
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      // save in database
      return user.save();
    })
    // function following save to database redirects to login
    .then(result => {
      res.redirect('/login');
      // create email to send after signup succeeds
      return transporter.sendMail({ 
        to: req.body.email,
        from = process.env.EMAIL,
        subject: 'Signup successful!',
        html: '<h1> You successfully signed up!</h1>'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
// render reset page 
exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  // if there is an error display it
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  // response render if path
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  // using crypot to generate secure random bytes for reset
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    // if valid token create a token then convert hexidecimal to ascii
    const token = buffer.toString('hex');
    // look in database for user email
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          // use error key to flash message
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }
        // retrieve user and set reset token and give one hour and update user in db
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from = process.env.EMAIL,
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href=""https://ecommerce-functional.herokuapp.com/reset/${token}">link</a> to set a new password.</p>
          `
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  // see if there is a token
  const token = req.params.token;
  // check if resetToken matches and the time is still valid within 1 hour
  // $ gt stands for greater than
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        // pass new user id to new pawword form hidden for post request
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  // retrieve userId from form
  const userId = req.body.userId;
  // retrieve the specific token to ensure valid
  const passwordToken = req.body.passwordToken;
  let resetUser;
// find user where reset token matches and within the timeframe allowed.
User.findOne({
  resetToken: passwordToken,
  resetTokenExpiration: { $gt: Date.now() },
  _id: userId
})
  .then(user => {
    resetUser = user;
      // hash the new password with bcrypt
      return bcrypt.hash(newPassword, 12);
    })
    // store hashed password
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      // the below no longer need to store values "undefined"
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
