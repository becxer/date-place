/*
main for crawling blog content
@author becxer
@email becxer87@gmail.com
*/
var fs = require('fs');
var google = require('./google/google.js');
var sqlite3 = require("sqlite3").verbose();
var sleep = require('sleep');
var async = require('async');

//read place list from origin place.txt
var place_list = fs.readFileSync('place','utf-8').split('\n');
var post_query = fs.readFileSync('post-query','utf-8');
post_query = post_query.substring(0,post_query.length-1);
place_list.pop();

console.log('place count : ' + place_list.length);
console.log('place list : ' + place_list)
console.log('post query : ' + post_query);
console.log('------------------------------');

//google search sample
google_list = [];
list_add = function(g_query){
	obj = function (callback){
			console.log(g_query);
			google.search(g_query, j, function(url){
				callback(null,url);
			});
		};
	google_list.push(obj);
};

for (var i in place_list) {	
	for(var j = 0 ; j < 1 ; j++){
		var place = place_list[i];
		var g_query = place + post_query;
		console.log('query : "' + g_query + '"');
		list_add(g_query);
	}
}
console.log('--------------------------');
console.log(google_list);

async.series(google_list, 
	function(err, results){
		url_list = []
		for(var i in arguments[1]){
			url_list = url_list.concat(arguments[1][i]);
		}
		console.log(url_list)
	}
);

/*
			var db = new sqlite3.Database('dpdb');
			db.serialize(function(){
				var stmt = db.prepare("INSERT INTO blog(blog_area, blog_url) VALUES(?,?)");
				stmt.run(place,url); 
				stmt.finalize();
			});
			db.close();
*/
