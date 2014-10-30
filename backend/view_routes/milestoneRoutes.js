var MilestoneRepository = require('../repositories/milestoneRepository');
var ProjectRepository = require('../repositories/projectRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
var RoleRepository = require('../repositories/roleRepository');

module.exports = function(app) {
	app.get('/milestones', isLoggedIn, function(req, res) {
		MilestoneRepository.getAll(function(err, milestones){
			ProjectRepository.getAll(function(err, projects){
				RoleRepository.getAll(function(err, roles){
					for (var i = 0; i < roles.length; i++){
						if (JSON.stringify(req.user.roleId) == JSON.stringify(roles[i]._id)) {
							var role = roles[i].name;
						}
					}
					if (role === 'God') {
						res.render('../frontend/views/god/milestones.ejs', {milestonelist: milestones, user : req.user, projects: projects});
					} else if (role === 'Admin') {
						res.render('../frontend/views/admin/milestones.ejs', {milestonelist: milestones, user : req.user, projects: projects});
					} else if (role === 'Client'){
						res.render('../frontend/views/client/milestones.ejs', {milestonelist: milestones, user : req.user, projects: projects});
					} else if (role === 'Manager'){
						res.render('../frontend/views/manager/milestones.ejs', {milestonelist: milestones, user : req.user, projects: projects});
					}
				});				
			});
			
		});

	});
};