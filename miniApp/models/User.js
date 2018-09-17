var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Schema for the users of the site. 
var UserSchema = new Schema({
    // display name of the user, obtained from the google profile.
    username:{
        type: String, 
        required: true
    },
    // unique ID of the user, obtained from the google profile. 
    google_id:{
        type: String,
        required: true
    },
    // A list of the rooms for which the user has sensor data. 
    rooms:{
        type: [String],
        required: true
    }
});

var User = module.exports = mongoose.model('Users', UserSchema);

// Function to save the user object.
module.exports.saveUser = function(callback, newUser){
    newUser.save(callback);
}

// Function to find a user. 
module.exports.findOrCreate = function(id, callback){
    const query = { google_id: id}
    User.findOne(query, callback);
}

// Function to find a user based on it's google ID and update the user record. 
module.exports.updateUser = function(callback, id, updatedUser, options){
    const query = {google_id: id};
    User.findOneAndUpdate(query, updatedUser, options, callback)
}
