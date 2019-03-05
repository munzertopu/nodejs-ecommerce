var express=require('express');
var router = express.Router();
var userModel = require.main.require('./model/user-model');


router.get('/',function(req,res){
	res.layout('layouts/visitor/header', {title:"Registration"}, {content:{block:"visitor/registration"}});
});

router.post('/', function(request, response){

	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(request.body.name=="" || request.body.email=="" || request.body.password=="" || request.body.gender=="" || re.test(request.body.email) != true)
	{
		response.layout('layouts/visitor/header', {title:"Registration"}, {content:{block:"visitor/registration-error"}});
		//response.redirect('/registration');
	}
	else{	 	
	
		var user = {
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,
			gender: request.body.gender
		};

		userModel.insert(user, function(flag){
			if(flag)
			{
				response.redirect('/login');
			}
			else
			{
				response.layout('layouts/visitor/header', {title:"Registration"}, {content:{block:"visitor/registration-error"}});
			}
		});
	}
});


module.exports=router;