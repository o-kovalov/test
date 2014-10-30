var usersToProjectRepository = require('../repositories/usersToProjectRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/usersToProject/:id', function(req, res, next){
		usersToProjectRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM userstoprojects WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('userstoproject is: ', rows);		
				});				
			next();
		});
	}, apiResponse);

	app.post('/usersToProject', function(req, res, next){
		console.log('REq', req.body);
		usersToProjectRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
				var set={
					_id:data._id, 
					projectId: data.projectId,
					usersId: data.userId.toString()
				};
				app.connection.query('INSERT INTO userstoprojects SET ?', set, function(err, results) {
					if (err) throw err;
					console.log('usersToProject added to sql database');
				});	
			next();
		});
	}, apiResponse);

	app.put('/usersToProject/:id', function(req, res, next){
		usersToProjectRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			console.log('route err=',err);
			console.log('route data=',data);
			res.err = err;
			res.data = data;
				var set={
					projectId: data.projectId,
					usersId: data.userId.toString()
				};
				app.connection.query('UPDATE userstoprojects SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('usersToProject update to sql database');
				});
			next();
		});
	}, apiResponse);

	app.delete('/usersToProject/:id/del', function(req, res, next){
		usersToProjectRepository.deleteByProject(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
				app.connection.query('DELETE FROM userstoprojects WHERE projectId="'+req.params.id+'"' , function(err, results) {
					if (err) throw err;
					console.log('utp results',results)
					console.log('usersToProject deleted from sql database');
				});	
			next();
		});
	}, apiResponse);

	app.put('/usersToProject/:id/:iduser', function(req, res, next){
		usersToProjectRepository.addUser(req.params.id, req.params.iduser, function(err, data){
			console.log('put=',err,data);
			res.err = err;
			res.data = data;
				var set={
					projectId: data.projectId,
					usersId: data.userId.toString()
				};
				app.connection.query('UPDATE userstoprojects SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('usersToProject update to sql database');
				});
			next();
		});
	}, apiResponse);

	app.delete('/usersToProject/:id/:iduser', function(req, res, next){
		usersToProjectRepository.deleteUser(req.params.id, req.params.iduser, function(err, data){
			res.err = err;
			res.data = data;
				console.log('utp on del=', data);
				var set={
					usersId: data.userId.toString() 
				};
				app.connection.query('UPDATE userstoprojects SET ? WHERE projectId="'+data.projectId+'"', set, function(err, results) {
					if (err) throw err;
					console.log('usersToProject update to sql database');
				});
			next();
		});
	}, apiResponse);	
};