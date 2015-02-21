var fs = require('fs'),
	path = require('path'),
	relpath = getPath();

function sortNumber(a, b){
	return a - b
}

function getPath(){
	try{
		return fs.readFileSync('../path').toString();
	}catch(e){
		new Error('path file under install directory is not found!, please redo initialization!');
	}
}

/**
* getItem
* return all Item
*
*/
function getItem(){
	var files = fs.readdirSync(path.join(relpath));
	var blob = [];
	for(var i = 0;i<files.length;i++){
		try{
			if(fs.lstatSync(path.join(relpath,files[i])).isDirectory()){
				blob.push(files[i]);
			}
		}catch(e){
			return new Error("Can't read directory, please redo initialization!");
		}
	}
	return blob;
}

/**
* getSection
* return all Section array
* 
* @param {String}fullname
*/
function getSection(fullname){
	if(fs.readdirSync(path.join(relpath,fullname))) return fs.readdirSync(path.join(relpath,fullname));
	else return new Error("Anime name is not match, please enter other name");
}

//Use this output
function filter(fullname){
	var blob = [];
	var files = getSection(fullname);
	for(var i = 0;i<files.length;i++){
		if(fs.lstatSync(path.join(relpath,fullname,files[i])).isFile()){
			blob.push(files[i]);
		}
	}
	return blob;
}

function getbgp(fullname){
	var files = fs.readdirSync(path.join(relpath,fullname));
	for(var i = 0;i<files.length;i++){
		if(files[i].indexOf('bgp') != -1){
			return path.join(relpath,fullname,files[i]);
		}
	}
	return false;
}

function inThisSeason(){
	var item = fs.readFileSync(path.join(relpath,'weekly.txt'),'UTF-8');
	var blob = [];
	item = item.split(/\r\n/gi);
	return item;
}

function oldItem(){
	var item = inThisSeason();
	var all = getItem();
	for(var i = 0;i<all.length;i++){
		for(var j = 0;j<item.length;j++){
			if(all[i] == item[j]){
				delete all[i];
				all.splice(i,1);
			}
		}
	}
	return all;
}

function check(fullname){
	var stat = fs.existsSync(path.join(relpath,fullname));
	if(stat){
		var lstat = fs.lstatSync(path.join(relpath,fullname));
		if(lstat.isDirectory()){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function coolFilter(fullname){
	var blob = [];
	var files = getSection(fullname);
	for(var i = 0;i<files.length;i++){
		if(fs.lstatSync(path.join(relpath,fullname,files[i])).isFile()){
			blob.push(files[i]);
		}
	}
	
	var flush2 = []
	for(var i = 0;i<blob.length;i++){
		var num = /[0-9][0-9]/gi.exec(blob[i]);
		if(num != null){
			flush2.push(parseInt(blob[i].split(']')[2].replace('[','')));
		}
	}
	flush2.sort(sortNumber);

	var newBlob = [];
	for(var i = 0;i<flush2.length;i++){
		for(var j = 0;j<blob.length;j++){
			var reg = /[0-9][0-9]/gi.exec(blob[j]);
			if(reg != null) num = parseInt(blob[j].split(']')[2].replace('[',''));
			if(num == flush2[i]){
				newBlob.push(blob[j]);
				break;
			}
		}
	}
	return newBlob;
}

function numberList(fullname){
	var blob = [];
	var files = getSection(fullname);
	for(var i = 0;i<files.length;i++){
		if(fs.lstatSync(path.join(relpath,fullname,files[i])).isFile()){
			blob.push(files[i]);
		}
	}
	
	var flush2 = []
	for(var i = 0;i<blob.length;i++){
		var num = /[0-9][0-9]/gi.exec(blob[i]);
		if(num != null){
			flush2.push(parseInt(blob[i].split(']')[2].replace('[','')));
		}
	}
	return flush2.sort(sortNumber);
}

module.exports = {
	getPath : function(){return getPath()},
	getItem : function(){return getItem()},
	filter : function(fullname){return filter(fullname)},
	getbgp : function(fullname){return getbgp(fullname)},
	inThisSeason : function(fullname){return inThisSeason(fullname)},
	oldItem : function(){return oldItem()},
	check: function(fullname){ return check(fullname)},
	coolFilter: function(fullname){ return coolFilter(fullname)},
	numberList: function(fullname){ return numberList(fullname)}
};
//console.log(getItem()); // 獲得動畫目錄(所有動畫)
//console.log(filter("百合熊風暴")); //獲得動畫下的影片
//console.log(getbgp("百合熊風暴")); // 獲得動畫下的功能縮圖
//console.log(inThisSeason()) //取得本季動畫
//console.log(oldItem());//取得舊動畫
