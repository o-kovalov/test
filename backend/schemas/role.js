var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var roleSchema = new Schema({
	name : { 
		type: String,
		default: 'RoleName'
	}
});

module.exports =  mongoose.model('Role', roleSchema);