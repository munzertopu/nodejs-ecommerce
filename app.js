//Decleration
var express = require('express');
var app = express();
var port = 1337;

var body_parser = require('body-parser');
var layout = require('ejs-layouts');
var express_session = require('express-session');
const upload = require('express-fileupload');


var login = require('./controllers/login');
var logout = require('./controllers/logout');
var registration = require('./controllers/registration');
var home = require('./controllers/home');
var admin = require('./controllers/admin');
var user = require('./controllers/user');

// CONFIGURATION
app.set('view engine', 'ejs');

//middlewares
app.use(body_parser.urlencoded({extended:false}));
app.use(upload());
app.use(layout.express);
app.use(express.static('public'));
app.use(express_session({secret: 'secretpassabcdefg', saveUninitialized: true, resave: false}));


//route
app.get('/',function(req,res){
	res.redirect('/home');
});


app.use('/login',login);
app.use('/logout',logout);
app.use('/registration',registration);
app.use('/home',home);
app.use('/admin',admin);
app.use('/user',user);





//server
app.listen(port, function(){
	console.log('Listenting at port ' + port + ' ...');
});