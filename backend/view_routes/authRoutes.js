var flash = require('connect-flash');
var passport = require('passport');
var async = require('async');
var crypto= require('crypto');
var User = require('../schemas/user');
var nodemailer = require('nodemailer');
var CityRepository = require('../repositories/cityRepository');
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('../frontend/views/index.ejs');
	});
	app.get('/login', function(req, res) {
		res.render('../frontend/views/login.ejs', { message: req.flash('loginMessage') });
	});
	app.get('/signup', function(req, res) {
		CityRepository.getAll(function(err, cities){
			console.log('cities', cities);
			res.render('../frontend/views/signup.ejs', { message: req.flash('signupMessage'), error: req.flash('signupError'), cities: cities });
		});
	});
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('../frontend/views/profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/forgot', function(req, res) {
		res.render('../frontend/views/forgot.ejs', {
			user: req.user, message: req.flash('forgotMessage')
		});
	});
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/forgot', function(req, res) {
		async.waterfall([
			function(done) {
				crypto.randomBytes(20, function(err, buf) {
					var token = buf.toString('hex');
					done(err, token);
			 	});
			},
			function(token, done) {
				User.findOne({ email: req.body.email }, function(err, user) {
					if (!user) {
						req.flash('forgotMessage', 'No account with that email address exists.');
						return res.redirect('/forgot');
					}

					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

					user.save(function(err) {
						done(err, token, user);
					});
				});
			},
			function(token, user, done) {
				var smtpTransport = nodemailer.createTransport('SMTP', {
					service: 'gmail',
					auth: {
						user: 'snake.dn@gmail.com',
						pass: 'pn208d00159'
					}
				});
				var mailOptions = {
					to: user.email,
					from: 'passwordreset@demo.com',
					subject: 'Node.js Password Reset',
					text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
						'http://' + req.headers.host + '/reset/' + token + '\n\n' +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n'
				};
				smtpTransport.sendMail(mailOptions, function(err) {
					req.flash('forgotMessage', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
					done(err, 'done');
				});
			}
		], function(err) {
			console.log('email err=',err);
			if (err) return next(err);
			res.redirect('/forgot');
		});
	});

	app.get('/reset/:token', function(req, res) {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			if (!user) {
				req.flash('resetMessage', 'Password reset token is invalid or has expired.');
				return res.redirect('/forgot');
			}
			res.render('../frontend/views/reset.ejs', {
				user: req.user, message: req.flash('resetMessage')
			});
		});
	});

	app.post('/reset/:token', function(req, res) {
		async.waterfall([
			function(done) {
				User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
					if (!user) {
						req.flash('resetMessage', 'Password reset token is invalid or has expired.');
						return res.redirect('back');
					}
					user.update = Date.now();
					var hashData = user.generateHash(req.body.password);
					user.password = hashData.hash;
					user.salt = hashData.salt;
					user.resetPasswordToken = undefined;
					user.resetPasswordExpires = undefined;
					user.save(function(err) {
						req.logIn(user, function(err) {
							done(err, user);
						});
					});
				});
			},
			function(user, done) {
				var smtpTransport = nodemailer.createTransport('SMTP', {
					service: 'Gmail',
					auth: {
						user: 'snake.dn@gmail.com',
						pass: 'pn208d00159'
					}
				});
				var mailOptions = {
					to: user.email,
					from: 'passwordreset@demo.com',
					subject: 'Your password has been changed',
					text: 'Hello,\n\n' +
						'This is a confirmation that the password for your account ' + user.email +
						' has just been changed.\n'
				};
				smtpTransport.sendMail(mailOptions, function(err) {
					req.flash('resetMessage', 'Success! Your password has been changed.');
					done(err);
				});
			}
		], function(err) {
			res.redirect('/');
		});
	});
};


function isLoggedIn(req, res, next) {
	console.log('is logged in work');
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}