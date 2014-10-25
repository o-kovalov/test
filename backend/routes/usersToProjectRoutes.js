var usersToProjectRepository = require('../repositories/usersToProjectRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/usersToProject/:id', function(req, res, next){
		usersToProjectRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/usersToProject', function(req, res, next){
		console.log('REq', req.body);
		usersToProjectRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.put('/usersToProject/:id', function(req, res, next){
		usersToProjectRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.delete('/usersToProject/:id', function(req, res, next){
		usersToProjectRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);
};