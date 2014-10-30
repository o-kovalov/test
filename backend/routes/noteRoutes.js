var noteRepository = require('../repositories/noteRepository');
var apiResponse = require('express-api-response');

module.exports = function(app){
	app.get('/note/:id', function(req, res, next){
		noteRepository.getById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
				app.connection.query('SELECT * FROM notes WHERE _id LIKE "%' + req.params.id + '%"', function(err, rows, fields) {
					if (err) throw err;
					console.log('note from sql is: ', rows);
				});
			next();
		});
	}, apiResponse);

	app.post('/note', function(req, res, next){
		noteRepository.add(req.body, function(err, data){
			res.successStatus = 201;
			res.err = err;
			res.data = data;
				var set={
					_id:data.id, 
					milestoneId: data.milestoneId, 
					userId: data.userId, 
					note: data.note, 
					create: data.create,
					update: data.create,
				};
				app.connection.query('INSERT INTO notes SET ?', set, function(err, results) {
					if (err) throw err;
					console.log('note added to sql database');
				});	
			next();
		});
	}, apiResponse);

	app.put('/note/:id', function(req, res, next){
		noteRepository.updateByObjectId(req.params.id, req.body, function(err, data){
			res.err = err;
			res.data = data;
				var set={
					milestoneId: data.milestoneId, 
					userId: data.userId, 
					note: data.note, 
					update: data.update,
				};
				app.connection.query('UPDATE notes SET ? WHERE _id="'+req.params.id+'"', set, function(err, results) {
					if (err) throw err;
					console.log('note update to sql database');
				});	
			next();
		});
	}, apiResponse);

	app.delete('/note/:id', function(req, res, next){
		noteRepository.delete(req.params.id, function(err, data){
			res.err = err;
			res.data = data;
				app.connection.query('DELETE FROM notes WHERE _id="'+req.params.id+'"' , function(err, results) {
					if (err) throw err;
					console.log('note deleted from sql database');
				});	
			next();
		});
	}, apiResponse);
};