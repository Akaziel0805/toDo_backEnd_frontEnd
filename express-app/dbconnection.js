const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

connection.connect();

connection.query("SELECT * from tasks", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0]);
});

exports.connection = connection;
