var MilestoneRepository = require('../repositories/milestoneRepository');
var ProjectRepository = require('../repositories/projectRepository');
var isLoggedIn = require('../middleware/isLoggedIn');

module.exports = function(app) {
	app.get('/milestones', isLoggedIn, function(req, res) {
		MilestoneRepository.getAll(function(err, milestones){
			console.log('err & milestones=', err, milestones);
			console.log('req user= ', req.user);
			ProjectRepository.getAll(function(err, projects){
				res.render('../frontend/views/milestones.ejs', {milestonelist: milestones, user : req.user, projects: projects});				
			})
			
		});

	});
};