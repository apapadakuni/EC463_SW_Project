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
    res.redirect('http://localhost:4200/home/' + req.user.google_id);
  }
);


router.get('/getUser/:id', function(req, res) {
    var id = req.params.id;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    User.findOrCreate(id, function (err, user) {
        if (err){
            res.json({success: false, error: err});
        }
        else{
            res.json(user);
        }
    })
  }
);

router.post("/updateUser/", function(req, res, next) {
    //gets username and user from body
    var id = req.body.google_id;
    let updatedUser = req.body;
  
    //attempts to update user in database
    User.updateUser(function(err, user){
      if(err){
        res.json({success: false, error: err});
      }
      else{
        res.json(user);
      }
    }, id, updatedUser, {});
  });

module.exports = router;
