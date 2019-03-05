var db = require('./db');

module.exports = {
	insert: function(order, callback){
		var sql = "INSERT INTO orderinfo VALUES (null, '" + order.customer_id + "', '" + order.customer_address + "', '" + order.order_date + "', '" + order.shipping_date + "', '" + order.order_amount + "', '" + order.delivery_status + "')";
		db.execute(sql, function(flag){
			callback(flag);
		});
	},
	getAllPendingOrder: function(callback){
		var sql = "SELECT orderinfo.*, userinfo. name FROM orderinfo RIGHT JOIN userinfo ON orderinfo .customer_id = userinfo .id WHERE userinfo. id IN (SELECT customer_id FROM orderinfo)";
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getAllPendingOrderByCustomerId: function(id,callback){
		var sql = "SELECT * FROM orderinfo WHERE delivery_status='pending' and customer_id='"+id+"'";
		db.getResult(sql, function(result){
			callback(result);
		});
	},

	deliverOrderById: function(id, callback){
		var sql = "UPDATE orderinfo SET delivery_status='delivered' WHERE id='"+id+"'";
		db.execute(sql, function(flag){
			callback(flag);
		});
	},
	getLastOrderIdByCutomerId: function(cutomerId, callback){
		var sql ="SELECT MAX(id) as id FROM orderinfo where customer_id='"+cutomerId+"'";
		db.getResult(sql, function(result){
			callback(result);
		});
	}


};