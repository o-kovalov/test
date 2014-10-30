var UserRepository = require('../repositories/userRepository');
var ProjectRepository = require('../repositories/projectRepository');
var UsersToProjectRepository = require('../repositories/usersToProjectRepository');
var RoleRepository = require('../repositories/roleRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
module.exports = function(app) {
	app.get('/userstoproject', isLoggedIn, function(req, res) {
		UsersToProjectRepository.getAll(function(err, userstoproject){
			UserRepository.getAll(function(err, users){
				RoleRepository.getAll(function(err, roles){
					for (var i = 0; i < roles.length; i++){
						if (JSON.stringify(req.user.roleId) == JSON.stringify(roles[i]._id)) {
							var role = roles[i].name;
						}
					}
					if (role === 'God') {
						res.render('../frontend/views/god/userstoproject.ejs', {users: users, user : req.user, userstoproject: userstoproject});
					} else if (role === 'Admin') {
						res.render('../frontend/views/admin/userstoproject.ejs', {users: users, user : req.user, userstoproject: userstoproject});
					} else if (role === 'Client'){
						res.render('../frontend/views/client/userstoproject.ejs', {users: users, user : req.user, userstoproject: userstoproject});
					} else if (role === 'Manager'){
						res.render('../frontend/views/manager/userstoproject.ejs', {users: users, user : req.user, userstoproject: userstoproject});
					}
				});		
			});
		});

	});
};