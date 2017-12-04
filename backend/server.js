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
	connection.query("select * from PRODUCT where Product_stock != 0", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
});

app.get('/all-product-zero', function(req, res){
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
			res.send(error);
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


app.get('/search-customer-by-name/name=:inputName', function(req, res){
	const newName = req.params.inputName;
	console.log("select * from CUSTOMER where Customer_name=\""+newName+"\"");
	connection.query("select * from CUSTOMER where Customer_name=\""+newName+"\"", function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			console.log("nice one");
			res.send(rows);
		}
	});
	
});

app.get('/show-products-by-branch/id=:inputBranch', function(req, res){
	const newBranch = req.params.inputBranch;
	console.log("select * from PRODUCT where Branch_id="+newBranch+" and Product_stock != 0");
	connection.query("select * from PRODUCT where Branch_id="+newBranch+" and Product_stock != 0", function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.get('/buy-product-by-branch/branch=:inputBranch&product=:inputProduct&quantity=:inputQuantity', function(req, res){
	const newBranch = req.params.inputBranch;
	const newProduct = req.params.inputProduct;
	const newQuantity = req.params.inputQuantity;
	console.log("update PRODUCT set Product_stock = Product_stock - "+newQuantity+" where Branch_id = "+newBranch+" and Product_number = "+newProduct);
	connection.query("update PRODUCT set Product_stock = Product_stock - "+newQuantity+" where Branch_id = "+newBranch+" and Product_number = "+newProduct, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			connection.query("select * from PRODUCT where Branch_id="+newBranch+" and Product_stock != 0", function(error, rows, fields){
				if (error){
					console.log(error);
					res.send(error);
				}else{
					console.log(rows);
					res.send(rows);
				}
			});
		}
	});
});

app.get('/get-product-total-price/id=:inputID', function(req, res){
	var id = req.params.inputID;
	var query = "select * from PRODUCT where Product_number = "+id;
	connection.query("select * from PRODUCT where Product_number = "+id, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
	
});

app.get('/delete-product-by-id-and-branch/id=:inputID&branch=:inputBranch', function(req, res){
	const idToDelete = req.params.inputID;
	const branchToDelete = req.params.inputBranch;
	console.log("delete from PRODUCT where Product_number = " + idToDelete + " and Branch_id = " + branchToDelete);
	connection.query("delete from PRODUCT where Product_number = " + idToDelete + " and Branch_id = " + branchToDelete, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.get('/update-product-by-id/id=:newID&product=:newName&stock=:newStock&price=:newPrice&branch=:newBranch', function(req, res){
	const productID = req.params.newID;
	const productName = req.params.newName;
	const productStock = req.params.newStock;
	const productPrice = req.params.newPrice;
	const productBranch = req.params.newBranch;
	console.log("update PRODUCT set Product_name = \"" + productName + "\", Product_stock = " + productStock + ", Product_price = " + productPrice + ", Branch_id = " + productBranch + " where Product_number = " + productID);
	connection.query("update PRODUCT set Product_name = \"" + productName + "\", Product_stock = " + productStock + ", Product_price = " + productPrice + ", Branch_id = " + productBranch + " where Product_number = " + productID, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});


app.get('/add-product/product=:newName&stock=:newStock&price=:newPrice&branch=:newBranch', function(req, res){
	const productName = req.params.newName;
	const productStock = req.params.newStock;
	const productPrice = req.params.newPrice;
	const productBranch = req.params.newBranch;
	console.log("insert into PRODUCT(Product_name, Product_stock, Product_price, Branch_id) values(\""+productName+"\", "+productStock+", "+productPrice+", "+productBranch+")");
	connection.query("insert into PRODUCT(Product_name, Product_stock, Product_price, Branch_id) values(\""+productName+"\", "+productStock+", "+productPrice+", "+productBranch+")", function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.get('/delete-branch/branch=:inputBranchID', function(req, res){
	const toDelete = req.params.inputBranchID;
	console.log("delete from BRANCH where Branch_id = " + toDelete);
	connection.query("delete from BRANCH where Branch_id = " + toDelete, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.get('/add-branch/branchName=:inputBranchName&location=:inputBranchLocation', function(req, res){
	const newBranchName = req.params.inputBranchName;
	const newLocation = req.params.inputBranchLocation;
	console.log("insert into BRANCH(Branch_name, Branch_location) values(\""+newBranchName+"\", \""+newLocation+"\")");
	connection.query("insert into BRANCH(Branch_name, Branch_location) values(\""+newBranchName+"\", \""+newLocation+"\")", function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.get('/update-branch-by-id/branch=:inputBranchID&branchName=:inputBranchName&branchLocation=:inputBranchLocation', function(req, res){
	const branchID = inputBranchID;
	const branchName = inputBranchName;
	const branchLocation = inputBranchLocation;
	console.log("update BRANCH set Branch_name=\""+inputBranchName+"\", Branch_location=\""+inputBranchLocation+"\" where Branch_id = "+inputBranchID);
	connection.query("update BRANCH set Branch_name=\""+inputBranchName+"\", Branch_location=\""+inputBranchLocation+"\" where Branch_id = "+inputBranchID, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
			console.log("SUCESS in the query");
		}
	});
});

app.get('/add-promostar/amount=:inputAmount&productNum=:inputProductNum&branch=:inputBranch&expireDate=:inputExpireDate', function(req, res){
	const amount = req.params.inputAmount;
	const product = req.params.inputProductNum;
	const branch = req.params.inputBranch;
	const expireDate = req.params.inputExpireDate;
	console.log("insert into PROMOSTAR(Amount ,Product_number, Branch_id, Expire_date) values("+amount+", "+product+", "+branch+", str_to_date(\""+expireDate+"\"))");
	connection.query("insert into PROMOSTAR(Amount ,Product_number, Branch_id, Expire_date) values("+amount+", "+product+", "+branch+", str_to_date(\""+expireDate+"\", \"%Y-%m-%d\"))", function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.get('/edit-promostar/amount=:inputAmount&productNum=:inputProductNum&branch=:inputBranch&expireDate=:inputExpireDate&control=:controlNum', function(req, res){
	const amount = req.params.inputAmount;
	const product = req.params.inputProductNum;
	const branch = req.params.inputBranch;
	const expireDate = req.params.inputExpireDate;
	const controlNum = req.params.controlNum;
	console.log("update PROMOSTAR set Amount = "+amount+",Product_number = "+product+", Branch_id = "+branch+", Expire_date = str_to_date(\""+expireDate+"\", \"%Y-%m-%d\") where Control_number =  "+controlNum);
	connection.query("update PROMOSTAR set Amount = "+amount+",Product_number = "+product+", Branch_id = "+branch+", Expire_date = str_to_date(\""+expireDate+"\", \"%Y-%m-%d\") where Control_number =  "+controlNum, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.get('/search-product-by-id/id=:inputID', function(req, res){
	const id = req.params.inputID;
	console.log("select * from PRODUCT where Product_number=" + id);
	connection.query("select * from PRODUCT where Product_number=" + id, function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			console.log("nice one");
			res.send(rows);
		}
	});
	
});

app.get("/add-transaction/cash=:inputAmount&accumulated=:inputAccmumulated&card=:inputCard&branch=:inputBranch", function(req, res){
	const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
	console.log(now);
	const inputAmount = req.params.inputAmount;
	const inputAccmumulated = req.params.inputAccmumulated;
	const inputCard = req.params.inputCard;
	const inputBranch = req.params.inputBranch;
	console.log("insert into TRANSACTION(Cash_payment, Accumulated_reward_points, Card_number, Branch_id, Date_and_time) values("+inputAmount+", "+inputAccmumulated+", "+inputCard+", "+inputBranch+", STR_TO_DATE(\""+now+"\", \"%Y-%m-%d\")");
	connection.query("insert into TRANSACTION(Cash_payment, Accumulated_reward_points, Card_number, Branch_id, Date_and_time) values("+inputAmount+", "+inputAccmumulated+", "+inputCard+", "+inputBranch+", STR_TO_DATE(\""+now.substring(0,10)+"\", \"%Y-%m-%d\"))", function(error, rows, fields){
		if (error){
			console.log(error);
			res.send(error);
		}else{
			console.log(rows);
			res.send(rows);
		}
	});
});

app.listen(1337);