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
var mysql = require('mysql'),
    mysqlUtilities = require('mysql-utilities');

var connection = mysql.createConnection(configDB.mysql);

connection.connect();
// Mix-in for Data Access Methods and SQL Autogenerating Methods
mysqlUtilities.upgrade(connection);

// Mix-in for Introspection Methods
mysqlUtilities.introspection(connection);

connection.queryRow('SELECT * FROM actor', [], function(err, row) {
    console.dir({queryRow:row});
});

connection.query('SELECT * FROM actor', function(err, rows, fields) {
	if (err) throw err;
	for (var i=0; i<rows.length; i++){
		console.log('The solution is: ', rows[i].first_name);		
  	}
});
mongoose.connect(configDB.uri); // connect to our database
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set up ejs for templating

var staticPath = path.normalize(__dirname + '/../frontend');
app.use(express.static(staticPath));

// required for passport
app.use(session({ secret: 'sessionsecretsessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


var routes = require('./routes/routes')(app);
var viewRoutes = require('./view_routes/viewRoutes')(app);

var server = app.listen(3000, function () {
  var port = server.address().port
  console.log('app listening at http://localhost:%s', port)

})

module.exports = app;