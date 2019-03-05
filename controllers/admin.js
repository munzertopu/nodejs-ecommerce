var express = require('express');
var router = express.Router();

var productModel = require.main.require('./model/product-model');
var categoryModel = require.main.require('./model/category-model');
const format = require("node.date-time");
var orderModel = require.main.require('./model/order-model');
var orderDetailsModel = require.main.require('./model/orderDetails-model');
var userModel = require.main.require('./model/user-model');


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

	userModel.userCount(function(result){
		productModel.productCount(function(result2){

	res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/index", data:{userCount:result,productCount:result2}}});
	

	});

	});

});


router.get('/addProduct/',function(req,res){

	

	categoryModel.getAllCategories(function(result){
		
		res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addProduct", data:{msg:" ",categories: result}}});
	});

	
});

router.post('/addProduct/',function(request,response){

	categoryModel.getAllCategories(function(result){

		if(request.body.title=="" || request.body.price=="" || request.body.price<1 || isNaN(request.body.price) == true
		 || isNaN(request.body.stock) == true
			|| request.body.stock=="" || request.body.stock<1 || request.body.short_desc==""
			|| request.body.cat=="" || request.body.cat=="")
		{
			response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addProduct", data:{msg:"Oops! Please insert proper data.",categories: result}}});
						
		}
		else{
			if(request.files.pic){

			 	if(request.files.pic.mimetype=="image/jpeg" || request.files.pic.mimetype=="image/png"){

			 			ImgName = new Date().format("yMdHms")+request.files.pic.name;
					 	request.files.pic.mv('public/images/'+ImgName+'', function(err) {

					  	});

						var product = {
							title: request.body.title,
							price: request.body.price,
							stock: request.body.stock,
							short_desc: request.body.short_desc,
							catId: request.body.cat,
							filename: ImgName

						};

						productModel.insert(product, function(flag){
							if(flag)
							{
								response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addProduct", data:{msg:"Product added succesfully!!",categories: result}}});
							}
							else
							{
								response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addProduct", data:{msg:"something went wrong!!",categories: result}}});
							}
						});
			 	}else{
			 		response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addProduct", data:{msg:"Invalid image!!",categories: result}}});
			 	}
			}else{
				response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addProduct", data:{msg:"Image not selected!!",categories: result}}});
			}
		}
	
	});
});




router.get('/deleteProduct/',function(req,res){

	categoryModel.getAllCategories(function(result){
		res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/deleteProduct", data:{msg:" ",categories: result,products:null}}});
	});
	
});

router.post('/deleteProduct/',function(req,res){

	categoryModel.getAllCategories(function(result){
		productModel.getProductByCatId(req.body.cat,function(result2){
			res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/deleteProduct", data:{msg:" ",categories: result,products: result2}}});
		});
	});
	
});

router.get('/deleteProduct/:id', function(request, response){
	
	
	productModel.delete(request.params.id, function(flag){
		if(flag){
			
			response.redirect('/admin/deleteProduct');
			
		}
	});
		
	
	
	
});

router.get('/updateProduct/',function(req,res){

	categoryModel.getAllCategories(function(result){
		productModel.getProductByCatId(req.body.cat,function(result2){
			res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/updateProduct", data:{msg:" ",categories: result,products: result2}}});
		});
	});
	
});

router.post('/updateProduct/',function(req,res){

	categoryModel.getAllCategories(function(result){
		productModel.getProductByCatId(req.body.cat,function(result2){
			res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/updateProduct", data:{msg:" ",categories: result,products: result2}}});
		});
	});
	
});


router.get('/updateProduct/:id', function(request, response){
	
	categoryModel.getAllCategories(function(result){
		productModel.getProductById(request.params.id, function(result2){
			response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/editProduct", data:{msg:" ",categories: result,product: result2}}});
		});
		
	});
	
	
});


router.post('/updateProduct/:id', function(request, response){
	
	categoryModel.getAllCategories(function(result){
		productModel.getProductById(request.params.id, function(result2){
			
			if(request.files.pic){

			 	if(request.files.pic.mimetype=="image/jpeg" || request.files.pic.mimetype=="image/png"){

			 			ImgName = new Date().format("yMdHms")+request.files.pic.name;
					 	request.files.pic.mv('public/images/'+ImgName+'', function(err) {

					  	});

						var Updatedproduct = {
							id: request.params.id,
							title: request.body.title,
							price: request.body.price,
							stock: request.body.stock,
							short_desc: request.body.short_desc,
							catId: request.body.cat,
							filename: ImgName

						};

						productModel.updateProductById(Updatedproduct, function(flag){
							if(flag)
							{
								response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/editProduct", data:{msg:"<p style='color:#fff; background-color: rgba(36, 143, 36,0.7); border-radius: 10px;'>Updated!</p>",categories: result,product: result2}}});
							}
							else
							{
								response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/editProduct", data:{msg:"Something went wrong!",categories: result,product: result2}}});
							}
						});
			 	}else{
			 		response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/editProduct", data:{msg:"Invalid image file.",categories: result,product: result2}}});
			 	}
			}else{
				response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/editProduct", data:{msg:"Please select an image first.",categories: result,product: result2}}});
			}
		});
		
	});
	
	
});

router.get('/addCategory/',function(req,res){
	res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addCategory", data:{msg:" "}}});
});

router.post('/addCategory/',function(req,res){
	var category={
		category_name: req.body.cat_title,
		short_desc: req.body.short_desc
	};
	categoryModel.insert(category,function(flag){
		if(flag){
			res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addCategory", data:{msg:"Category added succesfully!!"}}});
		}else{
			res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/addCategory", data:{msg:"Something went wrong!!"}}});
		}
	});
	
});


router.get('/deleteCategory/',function(req,res){

	categoryModel.getAllCategories(function(result){
		
		res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/deleteCategory", data:{categories: result}}});

	});
});


router.get('/deleteCategory/:id', function(request, response){
	
	
	categoryModel.delete(request.params.id, function(flag){
		if(flag){
			
			response.redirect('/admin/deleteCategory');
			
		}
	});
});



router.get('/updateCategory/',function(req,res){

	categoryModel.getAllCategories(function(result){
		
		res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/updateCategory", data:{categories: result}}});
			
	});
	
});


router.get('/updateCategory/:id', function(request, response){
	
	categoryModel.getCategoryById(request.params.id,function(result){
		
		response.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/editCategory", data:{msg:" ",categories: result}}});
		
		
	});
	
	
});


router.post('/updateCategory/:id',function(req,res){
	var category={
		id: req.params.id,
		category_name: req.body.cat_title,
		short_desc: req.body.short_desc
	};
	categoryModel.updateCategoryById(category,function(flag){
		if(flag){
			res.redirect('/admin/updateCategory');
		}
	});
	
});


router.get('/pendingOrder/',function(req,res){

	orderModel.getAllPendingOrder(function(result){
		res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/pendingOrder", data:{pendingOrders:result}}});
	});
});


router.get('/deliveredOrder/:id',function(req,res){
	orderModel.deliverOrderById(req.params.id,function(flag){
		res.redirect('/admin/pendingOrder');
	});
	
});


router.get('/showUsers/',function(req,res){

	userModel.getAllUser(function(result){
		res.layout('layouts/admin/header', {title:"Admin Panel"}, {content:{block:"admin/showUser", data:{users:result}}});
	});
});


router.get('/showUsers/:id', function(request, response){
	
	
	userModel.delete(request.params.id, function(flag){
		if(flag){
			response.redirect('/admin/showUsers');
		}
	});
});



module.exports=router;