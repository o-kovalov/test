var milestoneRepository = require('../repositories/milestoneRepository');
var apiResponse = require('../middleware/apiResponse');

module.exports = function(app){
	app.get('/milestone/:id', function(req, res, next){
		milestoneRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/milestone', function(req, res, next){
		console.log('REq', req.body);
		milestoneRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.put('/milestone/:id', function(req, res, next){
		milestoneRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.delete('/milestone/:id', function(req, res, next){
		milestoneRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);
};