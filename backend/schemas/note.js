var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var noteSchema = new Schema({
	milestoneId:{
		type : Schema.Types.ObjectId,
		ref : 'Milestone'
	},
	userId:{
		type : Schema.Types.ObjectId,
		ref : 'User'
	},
	create: {
		type: Date,
		default: Date.now
	},	
	update: {
		type: Date,
		default: Date.now
	},
	note: { 
		type: String, 
		default: 'NoteDescription' 
	},
});

module.exports =  mongoose.model('Note', noteSchema);