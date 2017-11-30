import connection from './';

exports.findAll = (req, res) => {
	connection.query("select * from member", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			res.send(rows);
		}
	});
}

exports.numberone = (req, res) => {
	connection.query("select * from cheerdance", function(error, rows, fields){
		if (error){
			console.log("error in the query");
		}else{
			console.log("SUCESS" + rows[0].membername);
			res.send(rows);
		}
	});
}