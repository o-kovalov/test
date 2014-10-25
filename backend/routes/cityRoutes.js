var cityRepository = require('../repositories/cityRepository');
var apiResponse = require('../middleware/apiResponse');

module.exports = function(app){
	app.get('/city/:id', function(req, res, next){
		cityRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/city', function(req, res, next){
		cityRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.put('/city/:id', function(req, res, next){
		cityRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.delete('/city/:id', function(req, res, next){
		cityRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);
};