var fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	utils = require('util');

function RESPONSE(serverPath,req,res){

	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(GET(req).name + GET(req).nn);
}

function ROUTER(request,response){}

function GET(request){ //GET(req).[QueryObjectName]
	return url.parse(request.url, true).query;
}

function POST(request,callback){ //POST(req,function(body){console.log(body)})
	var fullBody = '';
    
    request.on('data', function(chunk) {
      fullBody += chunk.toString();
    });
    request.on('end', function() {
      var decodedBody = querystring.parse(fullBody);
      callback(utils.inspect(decodedBody));
  	});
}

function SEARCH(){}

function RENDER(){}

module.exports = {
	RESPONSE : function(serverPath,request,response){return RESPONSE(serverPath,request,response)}
}