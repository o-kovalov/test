var ProjectRepository = require('../repositories/projectRepository');
var isLoggedIn = require('../middleware/isLoggedIn');
module.exports = function(app) {
	app.get('/projects', isLoggedIn, function(req, res) {
		ProjectRepository.getAll(function(err, projects){
			console.log('err & projects=', err, projects);
			console.log('req user= ', req.user);
			res.render('../frontend/views/projects.ejs', {projectlist: projects, user : req.user});
		});

	});
};
