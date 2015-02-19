var fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	utils = require('util');

function RESPONSE(serverPath,req,res){

	ROUTER(req,res,function(stat,data){
		res.writeHead(stat,data.contentType);
		res.end(data.data);
	});
	
}

function ROUTER(request,response,callback){
	var relpath = path.join(url.parse(request.url).pathname);
	if(!!OPTIONS[relpath.substr(1,relpath.length)]){
		callback(200,{contentType:{'Conent-Type':'text/html'},data:OPTIONS[relpath.substr(1,relpath.length)].data});
	}
}

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

//ADDING ROUTER FEATURE
var OPTIONS = {index:{data:"hello world"},page:{data:"nice"}}

module.exports = {
	RESPONSE : function(serverPath,request,response){return RESPONSE(serverPath,request,response,OPTIONS)}
}