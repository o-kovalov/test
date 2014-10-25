var cityRoutes = require('./cityRoutes');
var milestoneRoutes = require('./milestoneRoutes');
var userRoutes = require('./userRoutes');
var noteRoutes = require('./noteRoutes');
var projectRoutes = require('./projectRoutes');
var roleRoutes = require('./roleRoutes');
var userRoutes = require('./userRoutes');
var usersToProjectRoutes = require('./usersToProjectRoutes');

module.exports = function(app){
	return {
		cityRoutes: cityRoutes(app),
		milestoneRoutes: milestoneRoutes(app),
		noteRoutes: noteRoutes(app),
		projectRoutes: projectRoutes(app),
		roleRoutes: roleRoutes(app),
		userRoutes: userRoutes(app),
		usersToProjectRoutes: usersToProjectRoutes(app)
	};
};