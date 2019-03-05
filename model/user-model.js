var db = require('./db');

module.exports = {
	insert: function(user, callback){
		var sql = "INSERT INTO userinfo VALUES (null, '" + user.name + "', '" + user.email + "', '" + user.password + "', '" + user.gender + "',2)";
		db.execute(sql, function(flag){
			callback(flag);
		});
	},
	validate: function(user, callback){
		var sql = "SELECT * FROM userinfo WHERE email='" + user.email + "' AND password='" + user.password + "'";
		db.getResult(sql, function(result){
			if(result.length ==1)
			{
				callback(result);
			}
			else
			{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM userinfo WHERE id='" +id+ "'";
		db.execute(sql, function(flag){
		callback(flag);
		});
	},
	userCount: function(callback){
		var sql = "SELECT * FROM userinfo WHERE user_type_id=2";
		db.getResult(sql,function(result){
		numRows = result.length;
		callback(numRows);
		});
	},
	getAllUser:function(callback){
		var sql = "SELECT * FROM usertype,userinfo WHERE usertype.id=userinfo.user_type_id";
		db.getResult(sql,function(result){
		callback(result);
		});
	}


};