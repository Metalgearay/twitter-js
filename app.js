var express = require ('express');
var morgan = require('morgan');
var swig = require ('swig');
var bodyParser = require('body-parser');
var socketio= require('socket.io');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var routes = require('./routes');
app.use(express.static(__dirname + '/public'));
var server = app.listen(3000,function()
{
	var host = server.address().address
	var port = server.address().port
	console.log('Example app listening at http://%s:%s',host,port)
})
var io=socketio.listen(server);
app.use('/',routes(io));
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/views');
swig.setDefaults({cache:false});