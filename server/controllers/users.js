var mongoose = require('mongoose');
var User = mongoose.model('User');
mongoose.Promise = global.Promise
var session = require('express-session')
var bcrypt = require('bcrypt');

module.exports = {
    
    login: function(req, res, next){
        console.log("in login function controller************************")
        User.findOne({email: req.body.email})
        .then( user => {
            if(user){
                console.log("found user in controller")
                if (bcrypt.compareSync(req.body.password, user.password)){
                    console.log("password match")
                    req.session.name = user.name;
                    res.json(true)
                } else {
                    console.log("password mismatch", user.password, req.body.password)
                    res.status(500).json(false)
                }
                
            } else{
                console.log("in find user else")
                res.status(500).json(false)
            }
        })
    },

    get_user: function(req, res, next){
        console.log("in get user controller")
        if(!req.session.name){
            console.log("no logged in user")
            res.status(500).json(false)
        } else {
            console.log(req.session.name)
            let found_user = User.findOne({name: req.session.name})
            .then( user => {
                if(!user){
                    console.log("no logged in user")
                    res.status(500).json(false)
                } else {
                    console.log("found logged user");
                    User.findOne({name: req.session.name})
                        .populate('routes')
                        .exec(function(err, popuser){
                        console.log("sending user")
                        res.status(200).json(popuser)
                        })
                    }
            })
        }
    },

    register: function(req,res,next){
        console.log("in controller register", req.body.name)
        User.findOne({email:req.body.email})
        .then( user => {
            if(user){
                console.log("found user in register")
                res.status(500).json(false)
            } else {
                let new_user = new User(req.body)
                new_user.password = bcrypt.hashSync(new_user.password, bcrypt.genSaltSync(8));
                new_user.save()
                .then(() => {
                    console.log("save new user success")
                    req.session.name = new_user.name;
                    res.json(true);
                })
                .catch(err => {res.status(500).json(err)})
            }
        })
    },

    getAll: function(req,res,next){
        console.log("in get all controller")
        User.find({name : {$ne: req.session.name}})
        .then(users => {console.log("controller get all success"); res.status(200).json(users)})
        .catch( err => {console.log("controller get all fail"); res.status(500).json(err)})
    },

    create: function(req, res, next){
        User.findOne({name:req.session.name}, function(err, user){
        let newBucket = new Bucket({title: req.body.title, description: req.body.description, checked: false, creator: req.session.name, _users:[user]})
        newBucket.save()
            .then(() => {
                console.log("bucket saved")
                user.buckets.push(newBucket)
                user.save(function(err){
                    if(err){
                        res.json(false)
                    } else {
                        res.json(newBucket)
                    }
                })
            })
        })
    },

    check: function(req, res, next){
        console.log(req.body._id)
        console.log('check controller')
        Bucket.findOne({_id:req.body._id})
            .then( bucket => {bucket.checked = true;
            bucket.save()
            })
            .catch(() => {console.log("didnt find bucket in check controller")})
    },

    uncheck: function(req, res, next){
        console.log(req.body._id)
        console.log('uncheck controller')
        Bucket.findOne({_id:req.body._id})
            .then( bucket => {bucket.checked = false;
            bucket.save()
            })
            .catch(() => {console.log("didnt find bucket in uncheck controller")})
    },

    tag: function(req, res, next){
        console.log(req.body.title)
        console.log('tag controller')
        User.findOne({_id:req.body.tagged}, function(err, user){
        Bucket.findOne({title:req.body.title})
        .then(foundBucket => {
        console.log(foundBucket, "foundbucket", foundBucket._users)
        foundBucket._users.push(user)
        foundBucket.save()
            .then(() => {
                console.log("bucket saved")
                user.buckets.push(foundBucket)
                user.save(function(err){
                    if(err){
                        res.json(false)
                    } else {
                        res.json(foundBucket)
                    }
                })
            })
        })
        })
    },

    logout: function(req, res, next){
        console.log("controller log off ")
        req.session.destroy()
        res.redirect('/')
    }

}