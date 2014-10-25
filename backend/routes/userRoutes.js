var userRepository = require('../repositories/userRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/user/:id', function(req, res, next){
		userRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/user', function(req, res, next){
		console.log('REq', req.body);
		userRepository.addUser(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.put('/user/:id', function(req, res, next){
		userRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.delete('/user/:id', function(req, res, next){
		userRepository.delete(req.params.id, function(err, data){
			console.log('delete err,data', err, data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);
};0