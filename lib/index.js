var fs = require('fs'),
	path = require('path'),
	relpath = getPath();

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

//console.log(getItem()); // 獲得動畫目錄(所有動畫)
//console.log(filter("百合熊風暴")); //獲得動畫下的影片
//console.log(getbgp("百合熊風暴")); // 獲得動畫下的功能縮圖
//console.log(inThisSeason()) //取得本季動畫
//console.log(oldItem());//取得舊動畫