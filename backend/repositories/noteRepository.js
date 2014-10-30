var Note = require('../schemas/note.js');
var Repository = require('./generalRepository.js');

function NoteRepository(){
	Repository.prototype.constructor.call(this);
	this.model = Note;
}

NoteRepository.prototype = new Repository();

NoteRepository.prototype.getAll = function (callback) {
	var model = this.model;
	var query = model.find({}).populate('userId').populate('milestoneId');
	query.exec(callback);
};

NoteRepository.prototype.deleteMilestone = function(id1, callback) {
	var model = this.model;
	var query = model.remove({milestoneId: {$in:id1}}, function(err, res){				 
 		console.log(res,err);
	});
	query.exec(callback);
};

NoteRepository.prototype.deleteUser = function(id, callback) {
	var model = this.model; 
	var query = model.remove({userId: id}, function(err, res){
		console.log(res,err);				 
	});
	query.exec(callback);
};

module.exports = new NoteRepository();