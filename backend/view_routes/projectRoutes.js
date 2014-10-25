var ProjectRepository = require('../repositories/projectRepository');
module.exports = function(app) {
	app.get('/projects', isLoggedIn, function(req, res) {
		ProjectRepository.getAll(function(err, projects){
			console.log('err & projects=', err, projects);
			console.log('req user= ', req.user);
			res.render('../frontend/views/projects.ejs', {projectlist: projects, user : req.user});
		});

	});
};
function isLoggedIn(req, res, next) {
	console.log('is logged in work');
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}