var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    routes: [{type:Schema.Types.ObjectId, ref:'Route'}]  
}, {timestamps: true})

var User = mongoose.model('User', UserSchema);