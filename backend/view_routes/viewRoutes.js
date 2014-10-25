var authRoutes = require('./authRoutes');
var showUserRoutes = require('./showUserRoutes');
var projectRoutes = require('./projectRoutes');
var milestoneRoutes = require('./milestoneRoutes');
var noteRoutes = require('./noteRoutes');

module.exports = function(app){
	return {
		authRoutes: authRoutes(app),
		showUserRoutes: showUserRoutes(app),
		projectRoutes: projectRoutes(app),
		milestoneRoutes: milestoneRoutes(app),
		noteRoutes: noteRoutes(app)
	};
};