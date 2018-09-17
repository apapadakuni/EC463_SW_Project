var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require("cors");
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();


var mongoDB = config.dbURL;
mongoose.connect(mongoDB);

//connecting to the database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to the DB");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('./models/User');

passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: "http://localhost:3000/auth/login/callback"
},
function(accessToken, refreshToken, profile, done) {

     User.findOrCreate(profile.id, function (err, user) {
       if (user){
          done(err, user);
       }
       else{
        let newUser = new User({
              username: profile.displayName,
              google_id: profile.id,
              rooms: []
          });
          User.saveUser(function (err, user){
            done(err, user);
          }, newUser);
       }
     });
}
));

app.use(passport.initialize());
app.use(passport.session());

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