var fs = require('fs'),
	path = require('path'),
	url = require('url');

function RESPONSE(serverPath,req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(GET(req).name);
}

function GET(request){
	return url.parse(request.url, true).query;
}

function SEARCH(){}

function RENDER(){}

module.exports = {
	RESPONSE : function(serverPath,request,response){return RESPONSE(serverPath,request,response)}
}