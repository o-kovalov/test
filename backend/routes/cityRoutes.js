var cityRepository = require('../repositories/cityRepository');
var apiResponse = require('express-api-response');
var mysql = require('mysql');

module.exports = function(app){
	app.get('/city/:id', function(req, res, next){
		cityRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM cities WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('city is: ', rows);		
				});
			next();
		});
	}, apiResponse);

	app.post('/city', function(req, res, next){
		cityRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			console.log('post data', data);
				var set={_id:data.id, name:data.name};
				app.connection.query('INSERT INTO cities SET ?', set, function(err, results) {
					if (err) throw err;
					console.log('city added to sql database');
				});				
			next();
		});
	}, apiResponse);

	app.put('/city/:id', function(req, res, next){
		cityRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;

				var set={name:data.name};
				app.connection.query('UPDATE cities SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('city update to sql database');
				});				

			next();
		});
	}, apiResponse);

	app.delete('/city/:id', function(req, res, next){
		cityRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
				
				app.connection.query('DELETE FROM cities WHERE _id="'+req.params.id+'"' , function(err, results) {
					if (err) throw err;
					console.log('results', results);
					console.log('_id', req.params.id);
					console.log('city deleted from sql database');
				});	

			next();
		});
	}, apiResponse);
};