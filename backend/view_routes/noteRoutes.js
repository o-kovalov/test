var noteRepository = require('../repositories/noteRepository');
var milestoneRepository = require('../repositories/milestoneRepository');
var userRepository = require('../repositories/userRepository');
var isLoggedIn = require('../middleware/isLoggedIn');

module.exports = function(app) {
	app.get('/notes', isLoggedIn, function(req, res) {
		noteRepository.getAll(function(err, notes){
			milestoneRepository.getAll(function(err, milestones){
				userRepository.getAll(function(err, users){
					res.render('../frontend/views/notes.ejs', {notelist: notes, user : req.user, users: users, milestones: milestones});
				})
			})
		});

	});
};