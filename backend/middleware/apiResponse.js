module.exports = function(req, res, next){
	var successStatus = res.successStatus || 200;
	var failureStatus = res.failureStatus || 404;
	if (res.err){
		res.status(400).end();
	}
	function emptyObject(obj) {
		for (var i in obj) {
			return successStatus;
		}
		return failureStatus;
	}
	var status = emptyObject(res.data);
	console.log('middleware', res.data, status);
	res.status(status).json(res.data);
};