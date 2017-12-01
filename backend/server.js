var express = require('express');
var mysql = require('mysql');
var app = express();


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ciaralovesgod',
	database: 'sixtenrewards'
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
var branchno = 1;

app.get('/all-branch', function(req, res){
	connection.query("select * from BRANCH", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			console.log("SUCESS");
			res.send(rows);
		}
	});
});

app.get('/all-customer', function(req, res){
	connection.query("select * from CUSTOMER", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/all-transaction', function(req, res){
	connection.query("select * from TRANSACTION", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/all-product', function(req, res){
	connection.query("select * from PRODUCT", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/all-promostar', function(req, res){
	connection.query("select * from PROMOSTAR", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/all-spent-promostar', function(req, res){
	connection.query("select * from PRODUCT_SPENT_PROMOSTAR", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/all-accumulated-promostar', function(req, res){
	connection.query("select * from PRODUCT_ACCUMMULATED_PROMOSTAR", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/all-stock', function(req, res){
	connection.query("select * from STOCK", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/delete=:id', function(req, res){
	const idToDelete = req.params.id;
	console.log("received" + req.params.id + "hahahah");
	console.log("delete from CUSTOMER where Card_number = " + idToDelete);
	connection.query("delete from CUSTOMER where Card_number = " + idToDelete, function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
	
});

app.get('/new-customer/name=:inputName&address=:inputAddress&branch=:inputBranch', function(req, res){
	const newName = req.params.inputName;
	const newAddress = req.params.inputAddress;
	const newBranch = req.params.inputBranch;
	console.log("insert into CUSTOMER(Customer_name, Address, Branch_id) values(\""+newName+"\", \""+newAddress+"\" ," +newBranch+")");
	connection.query("insert into CUSTOMER(Customer_name, Address, Branch_id) values(\""+newName+"\", \""+newAddress+"\" ," +newBranch+")", function(error, rows, fields){
		if (error){
			res.send(error);
		}else{
			res.send(rows);
		}
	});
	
});

app.get('/update-customer/name=:inputName&address=:inputAddress&branch=:inputBranch&id=:id', function(req, res){
	const newName = req.params.inputName;
	const newAddress = req.params.inputAddress;
	const newBranch = req.params.inputBranch;
	const identifier = req.params.id;
	console.log("update CUSTOMER set Customer_name=\""+newName+"\", Address=\""+newAddress+"\", Branch_id=" +newBranch+" where Card_number="+identifier);
	connection.query("update CUSTOMER set Customer_name=\""+newName+"\", Address=\""+newAddress+"\", Branch_id=" +newBranch+" where Card_number="+identifier, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			res.send(rows);
		}
	});
	
});


app.listen(1337);