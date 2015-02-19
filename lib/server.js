var http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs'),
	stream = require('stream'),
	tree = require('./tree.js'),
	serverPath = tree.getPath(),
	router = require('./router.js');

var server = http.createServer(function(request,response){
	router.RESPONSE(serverPath,request,response);
});

server.listen(80,function(){console.log('server is running')})