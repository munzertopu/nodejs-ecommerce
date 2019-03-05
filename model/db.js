var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'nodejsproject'
});

module.exports = {
	getResult: function(sql, callback){
		connection.query(sql, function (error, result) {
			if(error)
			{
				console.log(error.stack);
				callback([]);
			}
			else
			{
				callback(result);
			}
			
			
		});
	},

	execute: function(sql, callback){
		connection.query(sql, function (error, result) {
			if(error)
			{
				console.log(error.stack);
				callback(false);
			}
			else
			{
				callback(true);
			}
			
			
		});
	}
};