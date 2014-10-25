module.exports = {
	dbname: 'hurri',
	uri: 'mongodb://localhost/test',
	mocked_db: false,
	opts: {
		server: { 
			auto_reconnect: true
		},
		user: 'root'
	}
};