var projectRepository = require('../repositories/projectRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/project/:id', function(req, res, next){
		projectRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM projects WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('project is: ', rows);		
				});
			next();
		});
	}, apiResponse);

	/*app.get('/project', function(req, res, next){
		projectRepository.getAll(function(err, data){
			console.log('project data err', data, err);
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
*/
	app.post('/project', function(req, res, next){
		projectRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
				var set={
					_id:data._id, 
					description: data.description, 
					name: data.name,
					create: data.create,
					update: data.create,
				};
				app.connection.query('INSERT INTO projects SET ?', set, function(err, results) {
					if (err) throw err;
					console.log('project added to sql database');
				});
			next();
		});
	}, apiResponse);

	app.put('/project/:id', function(req, res, next){
		projectRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('proj err=',err);
			console.log('proj data=',data);
			res.err = err;
			res.data = data;
				var set={
					description: data.description, 
					name: data.name,
					update: data.update,
				};
				app.connection.query('UPDATE projects SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('project update to sql database');
				});
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
				app.connection.query('DELETE FROM projects WHERE _id="'+req.params.id+'"' , function(err, results) {
					if (err) throw err;
					console.log('results', results);
					console.log('_id', req.params.id);
					console.log('project deleted from sql database');
				});	
			next();
		});
	}, apiResponse);
};