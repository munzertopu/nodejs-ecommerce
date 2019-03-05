var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
	request.session.loggedUser = null;
	response.redirect('/login');
});

module.exports = router;