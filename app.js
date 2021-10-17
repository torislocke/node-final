// All required third party and node modules
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf'); // cross site request forgery protection
const flash = require('connect-flash'); // import 
const cors = require('cors');


const errorController = require("./controllers/error");
const User = require("./models/user");

// all application to run on Heroku or localhost:5000
const PORT = process.env.PORT || 5000; 

// connect to Mongo Database
const MONGODB_URI =
  "mongodb+srv://tlocke:MongoDB12@cluster0.sd8ux.mongodb.net/ecommerce?retryWrites=true&w=majority";

  const app = express();
// add another collection call sessions
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf(); // use default settings

const corsOptions = {
  origin: "https://ecommerce-functional.herokuapp.com/",
  optionsSuccessStatus: 200
};

const options = {
  useUnifiedTopology: true,
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  family: 4
};

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
// set session to only save if something changed could set cookie age
app.use(
  session({
    secret: "wizard",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// create mongoose user model based on data stored in session
 // if no user is logged in cannot add to cart');
   // use session data - data the percists across requests with help of mongose model

// place before routes
//after initialize the session enable CSRF protection and connect flash
app.use(csrfProtection);
app.use(flash()); // call flash as function to use in app
// local variables passed into the views rendered verifies authentication and token
// passes is authenticated and CSRF token into all views

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
// above must be before routes

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user; 
      next();
    })
    .catch(err => {
      next(new Error(err)); // inside asynch need next error
    });
}); 

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

mongoose
  .connect(MONGODB_URI, options)
  .then((result) => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`)); 
  })
  .catch((err) => {
    console.log(err);
  });
