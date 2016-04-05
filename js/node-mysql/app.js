var mysql = require("mysql");

//First connect to DB
var con = mysql.createConnection({
  host: "localhost",
  user: "josh",
  password: "12345"
});

con.connect(function(err) {
  if (err) {
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connection established');
});

con.end(function(err) {
  //The connection is terminated gracefully
  //Ensures all previous enqueued queries are still before sending a COM_QUIT packet to the MySQL server
});