var db = require('./db');

module.exports = {
	insert: function(category, callback){
		var sql = "INSERT INTO category VALUES (null, '" + category.category_name + "', '" + category.short_desc + "')";
		db.execute(sql, function(flag){
			callback(flag);
		});
	},
	getAllCategories: function(callback){
		var sql = "SELECT * FROM category";
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM category WHERE id='" +id+ "'";
		db.execute(sql, function(flag){
			callback(flag);
		});
	},
	getCategoryById: function(Id, callback){
		var sql = "SELECT * FROM category WHERE id='"+Id+"'";
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	updateCategoryById: function(category, callback){
		var sql = "UPDATE category SET category_name='" + category.category_name + "', short_desc='" + category.short_desc + "' WHERE id='"+category.id+"'";
		db.execute(sql, function(flag){
			callback(flag);
		});
	}
};