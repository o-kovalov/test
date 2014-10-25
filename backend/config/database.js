module.exports = {
	dbname: 'hurri',
	uri: 'mongodb://localhost/test',
	mocked_db: false,
	opts: {
		server: { 
			auto_reconnect: true
		},
		user: 'root'
	},

	mysql: {
		host:     'localhost',
		user:     'root',
		password: 'k1992k',
		database: 'sakila'
	}
};