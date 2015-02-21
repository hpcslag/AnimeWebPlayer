var express = require('express'),
	app = express(),
	tree = require('./tree.js'),
	yaml = require('js-yaml'),
	fs = require('fs'),
	doc = yaml.safeLoad(fs.readFileSync('../language.yml', 'utf8')),
	path = require('path');

app.set('views', '../assets')
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
		res.render('page',{name:name,tree.coolFilter});
	}else{
		res.send('404 NOT FOUD!');
	}
})

app.listen(81);

