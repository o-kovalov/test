var UsersToProject = require('../schemas/usersToProject.js');
var Repository = require('./generalRepository.js');

function UsersToProjectRepository(){
	Repository.prototype.constructor.call(this);
	this.model = UsersToProject;
}

UsersToProjectRepository.prototype = new Repository();


UsersToProjectRepository.prototype.getAll = function (callback) {
	var model = this.model;
	var query = model.find({}).populate('projectId').populate('userId');
	query.exec(callback);
};

UsersToProjectRepository.prototype.deleteUser = function(id1, id2, callback) {
	var model = this.model;
	model.findOne({_id: id1}, function(err, res){				 
		res.userId.remove(id2);
		res.save(callback);	 
	});
};

UsersToProjectRepository.prototype.deleteByProject = function(id, callback){
	var model = this.createModel();
	var query = model.remove({projectId: id});
	console.log('delete by project');
	query.exec(callback);
};

UsersToProjectRepository.prototype.addUser= function(id1, id2, callback) {
	var model = this.model;
	var query = model.findOneAndUpdate({_id: id1},{$addToSet: {userId :id2}});
	query.exec(callback);
};
module.exports = new UsersToProjectRepository();