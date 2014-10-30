var ProjectRepository = require('../repositories/projectRepository');
var RoleRepository = require('../repositories/roleRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
module.exports = function(app) {
	app.get('/projects', isLoggedIn, function(req, res) {
		ProjectRepository.getAll(function(err, projects){
			RoleRepository.getAll(function(err, roles){
				for (var i = 0; i < roles.length; i++){
					if (JSON.stringify(req.user.roleId) == JSON.stringify(roles[i]._id)) {
						var role = roles[i].name;
					}
				}
				if (role === 'God') {
					res.render('../frontend/views/god/projects.ejs', {projectlist: projects, user : req.user});
				} else if (role === 'Admin') {
					res.render('../frontend/views/admin/projects.ejs', {projectlist: projects, user : req.user});
				} else if (role === 'Client'){
					res.render('../frontend/views/client/projects.ejs', {projectlist: projects, user : req.user});
				} else if (role === 'Manager'){
					res.render('../frontend/views/manager/projects.ejs', {projectlist: projects, user : req.user});
				}
			});
		});

	});
};
