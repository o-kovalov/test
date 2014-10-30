var noteRepository = require('../repositories/noteRepository');
var milestoneRepository = require('../repositories/milestoneRepository');
var userRepository = require('../repositories/userRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
var RoleRepository = require('../repositories/roleRepository');

module.exports = function(app) {
	app.get('/notes', isLoggedIn, function(req, res) {
		noteRepository.getAll(function(err, notes){
			milestoneRepository.getAll(function(err, milestones){
				userRepository.getAll(function(err, users){
					RoleRepository.getAll(function(err, roles){
						for (var i = 0; i < roles.length; i++){
							if (JSON.stringify(req.user.roleId) == JSON.stringify(roles[i]._id)) {
								var role = roles[i].name;
							}
						}
						if (role === 'God') {
							res.render('../frontend/views/god/notes.ejs', {notelist: notes, user : req.user, users: users, milestones: milestones});
						} else if (role === 'Admin') {
							res.render('../frontend/views/admin/notes.ejs', {notelist: notes, user : req.user, users: users, milestones: milestones});
						} else if (role === 'Client'){
							res.render('../frontend/views/client/notes.ejs', {notelist: notes, user : req.user, users: users, milestones: milestones});
						} else if (role === 'Manager'){
							res.render('../frontend/views/manager/notes.ejs', {notelist: notes, user : req.user, users: users, milestones: milestones});
						}
					});
				});	
			});
		});
	});
};