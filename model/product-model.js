var db = require('./db');

module.exports = {

	insert: function(product, callback){
		var sql = "INSERT INTO productinfo VALUES (null, '" + product.catId + "', '" + product.title + "', '" + product.short_desc + "', '" + product.filename + "','" + product.price+ "', '" + product.stock+ "')";
		db.execute(sql, function(flag){
			callback(flag);
		});
	},

	delete: function(productId, callback){
		var sql = "DELETE FROM productinfo WHERE id='"+productId+"'";
		db.execute(sql, function(flag){
			callback(flag);
		});
	},

	getAllProduct: function(callback){
		var sql = "SELECT * FROM productinfo";
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	getProductByCatId: function(catId, callback){
		var sql = "SELECT * FROM productinfo WHERE category_id='"+catId+"'";
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	getProductById: function(Id, callback){
		var sql = "SELECT * FROM productinfo WHERE id='"+Id+"'";
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	productCount: function(callback){
		var sql = "SELECT * FROM productinfo";
		db.getResult(sql,function(result){
		numRows = result.length;
		callback(numRows);
		});
	},

	updateProductById: function(product, callback){
		var sql = "UPDATE productinfo SET category_id='" + product.catId + "', title='" + product.title + "', short_desc='" + product.short_desc + "', img_path='" + product.filename + "', price='" + product.price+ "', stock='" + product.stock+ "' WHERE id='"+product.id+"'";
		db.execute(sql, function(flag){
			callback(flag);
		});
	}
};