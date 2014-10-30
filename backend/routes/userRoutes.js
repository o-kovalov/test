var userRepository = require('../repositories/userRepository');
var noteRepository = require('../repositories/noteRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/user/:id', function(req, res, next){
		userRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM users WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('user from sql is: ', rows);		
				});			
			next();
		});
	}, apiResponse);

	app.post('/user', function(req, res, next){
		userRepository.addUser(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
				var set={
					_id:data._id,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					password: data.password,
					salt: data.salt,
					cityId: data.cityId,
					create: data.create,
					update: data.create,
					role: data.roleId
				};
				app.connection.query('INSERT INTO users SET ?', set, function(err, results) {
					if (err) throw err;
					console.log('note added to sql database');
				});
			next();
		});
	}, apiResponse);

	app.put('/user/:id', function(req, res, next){
		userRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			res.err = err;
			res.data = data;
				var set={
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					password: data.password,
					salt: data.salt,
					cityId: data.cityId,
					update: data.update,
					role: data.roleId
				};
				app.connection.query('UPDATE users SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('user update to sql database');
				});	
			next();
		});
	}, apiResponse);

	app.delete('/user/:id', function(req, res, next){
		noteRepository.deleteUser(req.params.id, function(err, data){
			userRepository.delete(req.params.id, function(err, data){
				res.err = err;
				res.data = data;
					app.connection.query('DELETE FROM users WHERE _id="'+req.params.id+'"' , function(err, results) {
						if (err) throw err;
						console.log('user deleted from sql database');
					});	
				next();
			});
		});
	}, apiResponse);
};