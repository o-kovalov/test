var Project = require('../schemas/project.js');
var Repository = require('./generalRepository.js');

function ProjectRepository(){
	Repository.prototype.constructor.call(this);
	this.model = Project;
}

ProjectRepository.prototype = new Repository();

ProjectRepository.prototype.getAll = function (callback) {
	var model = this.model;
	var query = model.find({});
	query.exec(callback);
};

module.exports = new ProjectRepository();