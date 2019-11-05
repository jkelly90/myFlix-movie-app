const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//schema for movies
var movieSchema = mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
    genre : {
        name : String,
        description : String
    },
    director : {
        name : String,
        bio : String
    },
    /*Actors : [String],
    ImagePath : String,
    Featured : Boolean*/
});

//schema for users
var userSchema = mongoose.Schema({
    username : {type: String, required: true},
    password : {type: String, required: true},
    email : {type: String, required: true},
    birthday : Date,
    favoriteMovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = function(password) {
    var salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

