var projectRepository = require('../repositories/projectRepository');
var apiResponse = require('../middleware/apiResponse');

module.exports = function(app){
	app.get('/project/:id', function(req, res, next){
		projectRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/project', function(req, res, next){
		projectRepository.getAll(function(err, data){
			console.log('project data err', data, err);
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/project', function(req, res, next){
		projectRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.put('/project/:id', function(req, res, next){
		projectRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('proj err=',err);
			console.log('proj data=',data);
			res.err = err;
			res.data = data;
			next();
		});
	}, apiResponse);

	app.delete('/project/:id', function(req, res, next){
		console.log('delete project1');
		projectRepository.delete(req.params.id, function(err, data){
			console.log('delete project2');
			res.err = err;
			res.data = data;
			console.log(res);
			next();
		});
	}, apiResponse);
};