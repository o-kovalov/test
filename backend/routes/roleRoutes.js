var roleRepository = require('../repositories/roleRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/role/:id', function(req, res, next){
		roleRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/role', function(req, res, next){
		console.log('REq', req.body);
		roleRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.put('/role/:id', function(req, res, next){
		roleRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.delete('/role/:id', function(req, res, next){
		roleRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);
};