var Role = require('../schemas/role.js');
var Repository = require('./generalRepository.js');

function RoleRepository(){
	Repository.prototype.constructor.call(this);
	this.model = Role;
}

RoleRepository.prototype = new Repository();


module.exports = new RoleRepository();