
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
	GET: function(req){ GET(req) },
	POST: function(req,cb){ POST(req,cb) },
};