var express = require('express'),
	app = express(),
	tree = require('./tree.js');

app.set('views', '../assets')
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index',{});
});

app.listen(80);

