var UserRepository = require('../repositories/userRepository');
var ProjectRepository = require('../repositories/projectRepository');
var UsersToProjectRepository = require('../repositories/usersToProjectRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
module.exports = function(app) {
	app.get('/userstoproject', isLoggedIn, function(req, res) {
		UsersToProjectRepository.getAll(function(err, userstoproject){
			UserRepository.getAll(function(err, users){
				res.render('../frontend/views/userstoproject.ejs', {users: users, user : req.user, userstoproject: userstoproject});
			});
		});

	});
};