// All required third party and node modules
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf'); // cross site user forgery protection
const flash = require('connect-flash');
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
//after initialize the session
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
// local variables passed into the views rendered verifies authentication and token
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, options)
  .then((result) => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`)); 
  })
  .catch((err) => {
    console.log(err);
  });
