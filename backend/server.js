var express = require('express');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
require('./config/passport')(passport);
var flash = require('connect-flash');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var crypto = require('crypto');
var path = require('path');

var configDB = require('./config/database.js');
mongoose.connect('mongodb://localhost/test'); // connect to our database
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set up ejs for templating

var staticPath = path.normalize(__dirname + '/../frontend');
app.use(express.static(staticPath));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


var routes = require('./routes/routes')(app);
var viewRoutes = require('./view_routes/viewRoutes')(app);

var server = app.listen(3000, function () {
  var port = server.address().port
  console.log('Example app listening at http://localhost:%s', port)

})

module.exports = app;