var User = require('../schemas/user.js');
var Repository = require('./generalRepository.js');
var bcrypt   = require('bcrypt-nodejs');

function UserRepository(){
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.addUser = function(data, callback) {
	var model = this.createModel();
	var salt = bcrypt.genSaltSync(8);
	data.password = bcrypt.hashSync(data.password, salt, null);
	data.salt = salt;
	var newitem = new model(data);
	newitem.save(callback);
};

UserRepository.prototype.getAll = function (callback) {
	var model = this.model;
	var query = model.find({}).populate('cityId').populate('roleId');
	query.exec(callback);
};

module.exports = new UserRepository();