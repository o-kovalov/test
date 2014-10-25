var UserRepository = require('../repositories/userRepository');
var CityRepository = require('../repositories/cityRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
module.exports = function(app) {
	app.get('/users', isLoggedIn, function(req, res) {
		UserRepository.getAll(function(err, users){
			CityRepository.getAll(function(err, cities){
				res.render('../frontend/views/users.ejs', {userlist: users, user : req.user, cities: cities});
			});
		});

	});
};