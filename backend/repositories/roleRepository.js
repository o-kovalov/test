var Role = require('../schemas/role.js');
var Repository = require('./generalRepository.js');

function RoleRepository(){
	Repository.prototype.constructor.call(this);
	this.model = Role;
}

RoleRepository.prototype = new Repository();


RoleRepository.prototype.addRole = function(body, callback) {
	console.log('body', body);
	var model = this.createModel();
/*	var newitem = new model({
		lastName: body.lastName,
		firstName: body.firstName
	});
	newitem.save(callback);
*/
	var newitem = new model(body);
	newitem.save(callback);
};

module.exports = new RoleRepository();