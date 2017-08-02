var mongoose = require('mongoose');
var User = mongoose.model('User');
var Route = mongoose.model('Route');
mongoose.Promise = global.Promise
var session = require('express-session')

module.exports = {

    getAll: function(req,res,next){
        console.log("in get all controller")
        User.find({name : {$ne: req.session.name}})
        .then(users => {console.log("controller get all success"); res.status(200).json(users)})
        .catch( err => {console.log("controller get all fail"); res.status(500).json(err)})
    },

    saveRoute: function(req, res, next){
        User.findOne({name:req.session.name}, function(err, user){
        let newRoute = new Route(req.body)
        newRoute._user=user._id
        newRoute.save()
            .then(() => {
                console.log("route saved")
                user.routes.push(newRoute)
                user.save(function(err){
                    if(err){
                        res.json(false)
                    } else {
                        res.json(user)
                    }
                })
            })
        })
    },

    deleteRoute: function(req,res,next){
        console.log("in controller delete route", req.body._id)
        Route.remove({_id:req.body._id})
        .then(() => {console.log("controller delete route success");res.status(200).json(true)})
        .catch(() => {console.log("controller delete route fail"); res.status(500).json(false)})
    },

    logout: function(req, res, next){
        console.log("controller log off ")
        req.session.destroy()
        res.redirect('/')
    }

}