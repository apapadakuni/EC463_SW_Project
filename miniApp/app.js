var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require("cors");
var config = require('./config');

// routers to serve the home page and the auth/user data.
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();

// Setup the mongo db database. Need to connect to mLab where the data is hosted.
// Info on mongoose/mongo db/connecting to mLab: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose 
var mongoDB = config.dbURL;
mongoose.connect(mongoDB);

// Connecting to the database.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to the DB");
});

// view engine setup. This is not used.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Info on passport configuration: http://www.passportjs.org/docs/google/

// Imports the necessary passport modules. 
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Import User schema for the db.
var User = require('./models/User');

// Setup the passport strategy
passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: "http://localhost:3000/auth/login/callback" // URL to be called after the user signs in.
},

// Callback function to be called once the user signs in and before the call to the call back URL. 
function(accessToken, refreshToken, profile, done) {

    // Determines if the google user is in the db (has accessed site before)
     User.findOrCreate(profile.id, function (err, user) {
       // If user exists, return the user
       if (user){
          done(err, user);
       }
       // Otherwise, make a new entry in the db and return the new user. 
       else{
         // Make new user object following the db schema.
        let newUser = new User({
              username: profile.displayName,
              google_id: profile.id,
              rooms: []
          });
          // Save the user object as record in the db. 
          User.saveUser(function (err, user){
            done(err, user);
          }, newUser);
       }
     });
}
));

// Passport initialization. 
app.use(passport.initialize());
app.use(passport.session());

// Necessary to work with user data returned from google. 
// SO Article: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.options('*', cors());

// Registers the routes. 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/*

in angular-app: ng serve
in miniApp: set DEBUG=miniApp:* & npm start
*/