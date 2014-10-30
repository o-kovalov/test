var Milestone = require('../schemas/milestone.js');
var Repository = require('./generalRepository.js');
var noteRepository = require('./noteRepository');

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

MilestoneRepository.prototype.deleteProject = function(id1, callback) {
	var model = this.model;
	var query = model.remove({projectId: id1}, function(err, res){				 
		console.log('note rep in mile rep', err, res);
	});
	query.exec(callback);		
};

MilestoneRepository.prototype.getIdsByProject = function(id, callback){
	var model = this.model;
	var query = model.find({projectId: id}, {projectId:0, update:0, create:0, number:0, complete:0, name:0, __v:0 });
	query.exec(callback);	
}
module.exports = new MilestoneRepository();