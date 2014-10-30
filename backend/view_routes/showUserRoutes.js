var UserRepository = require('../repositories/userRepository');
var CityRepository = require('../repositories/cityRepository');
var RoleRepository = require('../repositories/roleRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
module.exports = function(app) {
	app.get('/users', isLoggedIn, function(req, res) {
		UserRepository.getAll(function(err, users){
			CityRepository.getAll(function(err, cities){
				RoleRepository.getAll(function(err, roles){
					for (var i = 0; i < roles.length; i++){
						if (JSON.stringify(req.user.roleId) == JSON.stringify(roles[i]._id)) {
							var role = roles[i].name;
						}
					}
					if (role === 'God') {
						res.render('../frontend/views/god/users.ejs', {userlist: users, user : req.user, cities: cities, roles: roles});
					} else if (role === 'Admin') {
						res.render('../frontend/views/admin/users.ejs', {userlist: users, user : req.user, cities: cities, roles: roles});
					} else {
						res.render('../frontend/views/badpermission.ejs');
					}

				});
			});
		});

	});
};