var Milestone = require('../schemas/milestone.js');
var Repository = require('./generalRepository.js');

function MilestoneRepository(){
	Repository.prototype.constructor.call(this);
	this.model = Milestone;
}

MilestoneRepository.prototype = new Repository();


MilestoneRepository.prototype.getAll = function (callback) {
	var model = this.model;
	var query = model.find({}).populate('projectId');
	query.exec(callback);
};

module.exports = new MilestoneRepository();