var milestoneRepository = require('../repositories/milestoneRepository');
var noteRepository = require('../repositories/noteRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/milestone/:id', function(req, res, next){
		milestoneRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM milestones WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('milestone from sql is: ', rows);		
				});
			next();
		});
	}, apiResponse);

	app.post('/milestone', function(req, res, next){
		milestoneRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
				var set={
					_id:data.id, 
					name:data.name, 
					complete: data.complete, 
					number: data.number, 
					create: data.create,
					update: data.create,
					projectId: data.projectId
				};
				app.connection.query('INSERT INTO milestones SET ?', set, function(err, results) {
					if (err) throw err;
					console.log('milestone added to sql database');
				});	
			next();
		});
	}, apiResponse);

	app.put('/milestone/:id', function(req, res, next){
		milestoneRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			res.err = err;
			res.data = data;

				var set={
					name:data.name, 
					complete: data.complete, 
					number: data.number, 
					update: data.update,
					projectId: data.projectId
				};
				app.connection.query('UPDATE milestones SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('milestone update to sql database');
				});	

			next();
		});
	}, apiResponse);

	app.delete('/milestone/:id', function(req, res, next){
		noteRepository.deleteMilestone(req.params.id, function(err, data){
			app.connection.query('DELETE FROM notes WHERE _id="'+req.params.id+'"' , function(err, results) {
				if (err) throw err;
				console.log('note deleted from sql database');
			});				
			milestoneRepository.delete(req.params.id, function(err, data){
				res.err = err;
				res.data = data;
					app.connection.query('DELETE FROM milestones WHERE _id="'+req.params.id+'"' , function(err, results) {
						if (err) throw err;
						console.log('milestone deleted from sql database');
					});	
				next();
			});
		});
	}, apiResponse);
};