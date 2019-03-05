var express = require('express');
var router = express.Router();
const format = require("node.date-time");
var productModel = require.main.require('./model/product-model');
var categoryModel = require.main.require('./model/category-model');
var orderModel = require.main.require('./model/order-model');
var orderDetailsModel = require.main.require('./model/orderDetails-model');


router.get('/cart',function(req,res){
	var totalPrice=0;
	var totalQuantity=0;

	if(req.session.CartProduct!=null){

		for(var i = 0; i < req.session.CartProduct.length; i++) {
			for(var j = 0; j < req.session.CartProduct[i].length; j++) {
				totalPrice=totalPrice+req.session.CartProduct[i][j].price;
				totalQuantity+=1;
			}
		}
		res.layout('layouts/user/header', {title:"User Panel"}, {content:{block:"user/cart",data:{catPro:req.session.CartProduct,totalPrice:totalPrice,totalQuantity:totalQuantity,msg:""}}});
	}else{
		res.layout('layouts/user/header', {title:"User Panel"}, {content:{block:"user/cart",data:{catPro:null,totalPrice:0,totalQuantity:0,msg:""}}});
	}
	
});


router.get('/cart/:id',function(req,res){
	productModel.getProductById(req.params.id,function(result){
		if(req.session.CartProduct==null){
			req.session.CartProduct=[];
			req.session.CartProduct.push(result);
			res.redirect('/home');
		}else{
			req.session.CartProduct.push(result);
			res.redirect('/home');
		}
		
	});
	
});






router.all('*', function(request, response, next){
	if(request.session.loggedUser == null)
	{
		response.redirect('/login');
	}
	else
	{
		next();
	}
});

router.get('/',function(req,res){
	res.layout('layouts/user/header', {title:"User Panel"}, {content:{block:"user/index", data:{uname:"user"}}});
});

router.get('/pendingOrder',function(req,res){
	orderModel.getAllPendingOrderByCustomerId(req.session.loggedUser[0].id,function(result){
		res.layout('layouts/user/header', {title:"User Panel"}, {content:{block:"user/pendingOrder", data:{pendingOrders:result}}});
	});
	
});

router.get('/deliveredOrder',function(req,res){

	orderModel.getAllDeliveredOrderByCustomerId(req.session.loggedUser[0].id,function(result){
		res.layout('layouts/user/header', {title:"User Panel"}, {content:{block:"user/deliveredOrder", data:{deliveredOrders:result}}});
	});
	
});

router.post('/cart',function(req,res){

	if(req.session.CartProduct!=null){
		orderDate = new Date().format("y-M-d H:m:s");

		var totalPrice=0;
		var totalQuantity=0;

		for(var i = 0; i < req.session.CartProduct.length; i++) {
			for(var j = 0; j < req.session.CartProduct[i].length; j++) {
				totalPrice=totalPrice+req.session.CartProduct[i][j].price;
				totalQuantity+=1;
			}
		}
		

		var order={
			customer_id: req.session.loggedUser[0].id,
			customer_address: req.body.shipadd,
			order_date: orderDate,
			shipping_date: req.body.shippingDate,
			order_amount: totalPrice,
			delivery_status: "pending"
		}

	    orderModel.insert(order,function(flag){
	    		if(flag){
	    			

	    			orderModel.getLastOrderIdByCutomerId(req.session.loggedUser[0].id,function(result){
	    				
	    				for(var i = 0; i < req.session.CartProduct.length; i++) {
							 for(var j = 0; j < req.session.CartProduct[i].length; j++) {

							 	var orderDetails={
							 		order_id: result[0].id,
							 		product_id: req.session.CartProduct[i][j].id,
							 		price: req.session.CartProduct[i][j].price,
							 		quantity: 1
							 	}
							 	orderDetailsModel.insert(orderDetails, function(flag2){
							 		
							 	});
							 }
						}
						req.session.CartProduct=null;
						res.layout('layouts/user/loggedHeader', {title:"User Panel"}, {content:{block:"user/cart", data:{catPro:null,totalPrice:0,totalQuantity:0,msg:"Success!"}}});

	    			});

	    			

	    			
	    		}
	    });
	}else{
		res.layout('layouts/user/loggedHeader', {title:"User Panel"}, {content:{block:"user/cart", data:{catPro:null,totalPrice:0,totalQuantity:0,msg:"Seems like you haven't added anything to the cart."}}});
	}

	
});

module.exports=router;
