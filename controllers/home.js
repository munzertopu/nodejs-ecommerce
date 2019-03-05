var express = require('express');
var router = express.Router();

var productModel = require.main.require('./model/product-model');

router.get('/',function(req,res){

	productModel.getAllProduct(function(result){

		if(req.session.loggedUser==null){
			res.layout('layouts/visitor/header', {title:"Homepage"}, {content:{block:"home/index", data:{products:result}}});
		}
		else if(req.session.loggedUser[0].user_type_id==1){
			res.layout('layouts/admin/loggedHeader', {title:"Homepage"}, {content:{block:"home/index", data:{products:result}}});
		}
		else if(req.session.loggedUser[0].user_type_id==2){
			res.layout('layouts/user/loggedHeader', {title:"Homepage"}, {content:{block:"home/index", data:{products:result}}});
		}
		
		
	});
	
});


module.exports=router;