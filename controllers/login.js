var express=require('express');
var router = express.Router();
var userModel = require.main.require('./model/user-model');



router.get('/',function(req,res){

	res.layout('layouts/visitor/header', {title:"Login"}, {content:{block:"login/index", data:{name:"Matthew"}}});
});

router.post('/', function(request, response){
	
	var user = {
		email: request.body.email,
		password: request.body.password
	};

	userModel.validate(user, function(validUser){
		if(validUser)
		{
			if(validUser[0].user_type_id==1){
				request.session.loggedUser = validUser;
				response.redirect('/admin');
			}else{
				request.session.loggedUser = validUser;
				response.redirect('/user');
			}
			
		}
		else
		{
			//response.render('login/error');
			response.layout('layouts/visitor/header', {title:"Error"}, {content:{block:"login/error"}});
		
		}
	});
});


router.get('/registration',function(req,res){
	res.layout('layouts/visitor/header', {title:"Registration"}, {content:{block:"visitor/registration"}});
});

module.exports=router;