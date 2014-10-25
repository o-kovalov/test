var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var milestoneSchema = new Schema({
	name : { 
		type: String,
		default: 'MilestoneName'
	},
	complete: {
		type: Number,
		default: 1
	},
	number: {
		type: Number,
		default: 1
	},
	create: {
		type: Date,
		default: Date.now
	},
	update: {
		type: Date,
		default: Date.now
	},
	projectId:{
		type : Schema.Types.ObjectId,
		ref : 'Project'
	}
});

module.exports =  mongoose.model('Milestone', milestoneSchema);