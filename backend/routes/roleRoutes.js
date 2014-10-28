var roleRepository = require('../repositories/roleRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/role/:id', function(req, res, next){
		roleRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM roles WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('role is: ', rows);		
				});
			next();
		});
	}, apiResponse);

	app.post('/role', function(req, res, next){
		console.log('REq', req.body);
		roleRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
				var set={
					_id:data._id, 
					role: data.name, 
				};
				app.connection.query('INSERT INTO roles SET ?', set, function(err, results) {
					if (err) throw err;
					console.log('role added to sql database');
				});				
			next();
		});
	}, apiResponse);

	app.put('/role/:id', function(req, res, next){
		roleRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
				var set={
					role: data.name,
				};
				app.connection.query('UPDATE roles SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('role update to sql database');
				});
			next();
		});
	}, apiResponse);

	app.delete('/role/:id', function(req, res, next){
		roleRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
				app.connection.query('DELETE FROM roles WHERE _id="'+req.params.id+'"' , function(err, results) {
					if (err) throw err;
					console.log('role deleted from sql database');
				});	
			next();
		});
	}, apiResponse);
};