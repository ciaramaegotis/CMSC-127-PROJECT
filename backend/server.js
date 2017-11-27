var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ciaralovesgod',
	database: 'uaap'
});

connection.connect(function(error){
	if (error){
		console.log("error connecting");
	}else{
		console.log("successful connection");
	}
});

app.get('/', function(req, res){
	connection.query("select * from cheerdance", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			console.log("SUCESS" + rows[0].membername);
		}
	});
});

app.listen(1337);

