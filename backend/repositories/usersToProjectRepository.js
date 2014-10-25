var UsersToProject = require('../schemas/usersToProject.js');
var Repository = require('./generalRepository.js');

function UsersToProjectRepository(){
	Repository.prototype.constructor.call(this);
	this.model = UsersToProject;
}

UsersToProjectRepository.prototype = new Repository();


UsersToProjectRepository.prototype.addUsersToProject = function(body, callback) {
	console.log('body', body);
	var model = this.createModel();
/*	var newitem = new model({
		lastName: body.lastName,
		firstName: body.firstName
	});
	newitem.save(callback);
*/
	var newitem = new model(body);
	newitem.save(callback);
};

module.exports = new UsersToProjectRepository();