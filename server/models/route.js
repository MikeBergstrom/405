var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var RouteSchema = new mongoose.Schema({
    name: String,
    direction: String,
    entry: String,
    exit: String,
    _user: [{type:Schema.Types.ObjectId, ref:'User'}]  
}, {timestamps: true})

var Route = mongoose.model('Route', RouteSchema);