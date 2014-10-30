var projectRepository = require('../repositories/projectRepository');
var milestoneRepository = require('../repositories/milestoneRepository');
var noteRepository = require('../repositories/noteRepository');
var apiResponse = require('express-api-response');
var usersToProjectRepository = require ('../repositories/usersToProjectRepository');
var async = require('async');
module.exports = function(app){
	app.get('/project/:id', function(req, res, next){
		projectRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM projects WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('project from sql is: ', rows);		
				});
			next();
		});
	}, apiResponse);

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
		var milestonesIds = [];
		var id = req.params.id;
		milestoneRepository.getIdsByProject(id, function(err, data){
			app.connection.query('DELETE FROM userstoprojects WHERE projectId="'+id+'"' , function(err, results) {
				if (err) throw err;
				console.log('userstoprojects deleted from sql database (project del)');
			});	
			console.log('getIdsByProject', err, data);
			for (var i=0; i<data.length; i++){
				milestonesIds[i] = data[i]._id;
					app.connection.query('DELETE FROM notes WHERE milestoneId="'+milestonesIds[i]+'"' , function(err, results) {
						if (err) throw err;
						console.log('note deleted from sql database (project del)');
					});				
			}
			console.log('milestonesIds', milestonesIds);
			noteRepository.deleteMilestone(milestonesIds, function(err, data){
				milestoneRepository.deleteProject(id, function(err, data){
					app.connection.query('DELETE FROM milestones WHERE projectId="'+id+'"' , function(err, results) {
						if (err) throw err;
						console.log('milestone deleted from sql database');
					});					
					usersToProjectRepository.deleteByProject(id, function(err, data){
						projectRepository.delete(id, function(err, data){
							res.err = err;
							res.data = data;
								app.connection.query('DELETE FROM projects WHERE _id="'+id+'"' , function(err, results) {
									if (err) throw err;
									console.log('project deleted from sql database');
								});	
						});
					});
				});
			});
		});
	}, apiResponse);
};