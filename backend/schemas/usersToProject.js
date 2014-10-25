var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var usersToProjectSchema = new Schema({
	projectId:{
		type : Schema.Types.ObjectId,
		ref : 'Project'
	},
	userId:[{
		type : Schema.Types.ObjectId,
		ref : 'User'
	}]
});

module.exports =  mongoose.model('UsersForProject', usersToProjectSchema);