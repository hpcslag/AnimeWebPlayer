var express = require('express'),
	app = express(),
	tree = require('./tree.js'),
	yaml = require('js-yaml'),
	fs = require('fs'),
	path = require('path'),
	doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname,'../language.yml'), 'utf-8'));

app.set('views', path.join(__dirname,'../assets'))
app.set('view engine', 'ejs');
app.use(express.static(tree.getPath()));

var a = {name:"Animename",url:"",bgp:""};


var ThisWeek = [];
var Old = [];
for(var i = 0;i<tree.inThisSeason().length;i++){
	var realurl = './'+tree.inThisSeason()[i];
	var obj = {
		name: tree.inThisSeason()[i],
		url: realurl,
		bgp: realurl+'/bgp.png'
	};
	ThisWeek.push(obj);
}

for(var i = 0;i<tree.oldItem().length;i++){
	var realurl = './'+tree.oldItem()[i];
	var obj = {
		name: tree.oldItem()[i],
		url: realurl,
		bgp: realurl+'/bgp.png'
	};
	Old.push(obj);
}

function WhatsSeason(){
	var date = new Date();
	if(date.getMonth() >= 1 && date.getMonth() < 4){
		return date.getFullYear() + '-' + doc.language[doc.default_language].Season[3];
	}
	if(date.getMonth() >= 4 && date.getMonth() < 7){
		return date.getFullYear() + '-' + doc.language[doc.default_language].Season[0]
	}
	if(date.getMonth() >= 7 && date.getMonth() < 10){
		return date.getFullYear() + '-' + doc.language[doc.default_language].Season[1]
	}
	if(date.getMonth() >= 10){
		return date.getFullYear() + '-' + doc.language[doc.default_language].Season[2]
	}
}

app.get('/', function (req, res) {
	res.render('index',{ThisWeek:ThisWeek,Old:Old,lang:doc.language[doc.default_language],WhatSeason:WhatsSeason()});
});

app.get('/:name',function(req,res){
	var name = req.param('name');
	if(tree.check(name)){
		res.render('page',{name:name,list:tree.coolFilter(name),lang:doc.language[doc.default_language],bgp:'./bgp.png',number:tree.numberList(name)});
	}else{
		res.send('404 NOT FOUD!');
	}
})

app.get('/player/:name/video/:lists',function(req,res){
	var name = req.param('name');
	var lists = req.param('lists');
	var query = req.query['n'];
	res.render('player',{name:name,word:false,word:doc.language[doc.default_language].WORD,url:'../../../../'+name+'/'+lists,query:query});
})

app.get('/search/:keyword',function(req,res){
	var param = req.param('keyword');
	var match = tree.Search(param);
	if(!!match[0]){
		res.send(match);
	}else{
		res.send([false,doc.language[doc.default_language].NOTFOUND]);
	}
	
})

module.exports = app;

