var noteRepository = require('../repositories/noteRepository');
var apiResponse = require('../middleware/apiResponse');

module.exports = function(app){
	app.get('/note/:id', function(req, res, next){
		noteRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/note', function(req, res, next){
		console.log('REq', req.body);
		noteRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.put('/note/:id', function(req, res, next){
		noteRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.delete('/note/:id', function(req, res, next){
		noteRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);
};