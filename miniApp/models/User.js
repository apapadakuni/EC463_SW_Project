var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Schema for Users of the website
//unique identifier for the User is the username
var UserSchema = new Schema({
    //username of the user, taken from the OAuth Login - example: "mwcote97"
    username:{
        type: String, 
        required: true
    },
    //the age of the user - example: 21
    google_id:{
        type: String,
        required: true
    },
    //the street address of the user - example: "700 Commonwealth Ave"
    rooms:{
        type: [String],
        required: true
    }
});

var User = module.exports = mongoose.model('Users', UserSchema);

//function to save the user object
module.exports.saveUser = function(callback, newUser){
    newUser.save(callback);
}

module.exports.findOrCreate = function(id, callback){
    const query = { google_id: id}
    User.findOne(query, callback);
}

//function to update the user with the given username
module.exports.updateUser = function(callback, id, updatedUser, options){
    const query = {google_id: id};
    User.findOneAndUpdate(query, updatedUser, options, callback)
}
