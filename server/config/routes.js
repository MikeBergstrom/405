var users = require('../controllers/users.js')
var routes = require('../controllers/routes.js')
var path = require('path')

module.exports = function(app) {

    app.post('/login', users.login)

    app.get('/logout', users.logout)

    app.get('/get_user', users.get_user)

    app.post('/create', users.create)

    app.post('/register', users.register)

    app.post('/saveRoute', routes.saveRoute)
    
    app.post('/deleteRoute', routes.deleteRoute)

    app.post('/uncheck', users.uncheck)

    app.post('/tag', users.tag)

    app.get('/getAll', users.getAll)

    app.all('*', (req,res,next) => {
        console.log("in root route.js")
        res.sendfile(path.resolve("./toll/dist/index.html"))
    })
}   