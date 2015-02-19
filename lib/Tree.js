var fs = require('fs'),
	path = require('path'),
	relpath = getPath();

function getPath(){
	try{
		return fs.readFileSync('../../path').toString();
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
	fs.readFileSync(relpath,);
}

//console.log(getItem()); // 獲得動畫目錄
//console.log(filter("百合熊風暴")); //獲得動畫下的影片
//console.log(getbgp("百合熊風暴")); // 獲得動畫下的功能縮圖
//con //取得本季動畫
