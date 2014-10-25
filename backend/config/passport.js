var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../schemas/user');
var UserRepository = require('../repositories/userRepository');
module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			console.log('signup email and pass', email, password);
			User.findOne({email:email }, function(err, user) {
				console.log('findone signup', err, user);
				if (err)
					return done(err);
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					var newUser = new User();
					newUser.email = email;
					newUser.password = password;
					newUser.lastName = req.body.lastName;
					newUser.firstName = req.body.firstName;
					newUser.cityId = req.body.cityId;
					UserRepository.addUser(newUser, function(err, data){
						if (err)
							throw err;
						return done(null, data);
					});	
				}

			});    
		});

	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		console.log('email and pass', email, password);
		User.findOne({email:email}, function(err, user) {
			console.log('findone login', err, user);
			if (err)
				return done(err);
			// if no user is found, return the message
			if (!user)
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			if (!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
			return done(null, user);
		});

	}));
};
