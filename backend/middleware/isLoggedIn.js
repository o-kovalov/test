module.exports = function(req, res, next){
	console.log('is logged in work');
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}