var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var projectSchema = new Schema({
	name : { 
		type: String,
		default: 'ProjectName'
	},
	create: {
		type: Date,
		default: Date.now
	},
	update: {
		type: Date,
		default: Date.now
	},
	description: { 
		type: String, 
		default: 'ProjectDescription' 
	},
});

module.exports =  mongoose.model('Project', projectSchema);