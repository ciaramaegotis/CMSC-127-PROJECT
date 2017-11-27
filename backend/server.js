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

// for CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// body parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set models
// require('./models/index');

// Setup Routes
// const TransactionRoute = require('./routes/TransactionRoute');
// app.use('/', TransactionRoute);

app.get('/', function(req, res){
	connection.query("select * from cheerdance", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			console.log("SUCESS" + rows[0].membername);
			res.send(rows[0].membername);
		}
	});
});

app.get('/numberone', function(req, res){
	connection.query("select * from cheerdance", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows[3].membername);
		}
	});
});

app.listen(1337);

