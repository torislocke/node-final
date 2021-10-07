// All required third party and node modules
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const errorController = require("./controllers/error");
const User = require("./models/user");
const cors = require('cors')

// all application to run on Heroku or localhost:5000
const PORT = process.env.PORT || 5000; 

// connect to Mongo Database
const MONGODB_URI =
  "mongodb+srv://tlocke:MongoDB12@cluster0.sd8ux.mongodb.net/ecommerce?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

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

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, options)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Tori",
          email: "tbos@mail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(PORT, () => console.log(`Listening on ${PORT}`)); 
  })
  .catch((err) => {
    console.log(err);
  });
