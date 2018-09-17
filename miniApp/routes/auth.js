var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

// Info on passport route configuration: http://www.passportjs.org/docs/google/

// Initial call to get the user authenticated. Indicates that we want the google profile data
// upon successful login.
router.get('/login', passport.authenticate('google', {

    scope: ['profile',]

}));

// URL to be called after the user has been authenticated and their data has been stored in db.
router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Redirects back to the front end application user home page, with the google ID (to be used for unique identification)
    res.redirect('http://localhost:4200/home/' + req.user.google_id);
  }
);

// URL to be called to get all of the user data stored in the db. 
router.get('/getUser/:id', function(req, res) {

    // Get ID from the URL 
    var id = req.params.id;

    // Set necessary headers. 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Looks up the user in the db and then returns the user object as json back to the front-end. 
    User.findOrCreate(id, function (err, user) {
        if (err){
            throw err;
        }
        else{
            res.json(user);
        }
    })
  }
);

// Updates the user in the db. Uses the id as the unique key to lookup the user, then replaces the record with the new user. 
router.post("/updateUser/", function(req, res, next) {
    //gets username and user from body
    var id = req.body.google_id;
    let updatedUser = req.body;

    // Call schema function to update the user in the db. Return the user via json to the front-end. 
    User.updateUser(function(err, user){
      if(err){
        throw err;
      }
      else{
        res.json(user);
      }
    }, id, updatedUser, {});
  });

module.exports = router;
