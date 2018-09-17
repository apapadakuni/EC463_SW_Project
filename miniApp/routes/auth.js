var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

/* GET home page. */
/*router.get('/login', function(req, res, next) {
   // console.log("stuff");
  //res.render('index', { title: 'Express' });
  console.log("hit");
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] })
  console.log("hit 2");
});*/

router.get('/login', passport.authenticate('google', {

    scope: ['profile',]

}));

router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user.google_id);
    console.log("heellllloooo")
    res.redirect('http://localhost:4200/home/' + req.user.username);
  }
);

module.exports = router;
