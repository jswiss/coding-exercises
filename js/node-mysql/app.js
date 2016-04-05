var mysql = require('mysql');

var con = mysql.createConnection({
  host      : "127.0.0.1:3306",
  user      : "josh",
  password  : "",
  database  : "node-mysql-db"
});

con.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log('You are connected. Yay.')
  }

  con.query('CREATE TABLE people(id int primary key, name varchar(255), age int, address text)', function(err, result) {
    if (err) {
      throw err;
    } else {
      con.query('INSERT INTO people (name, age, address) VALUES (?, ?, ?)', ['Larry', '41', 'California, USA'], function(err, result) {
        if (err) {
          throw err;
        } else {
          con.query('SELECT * FROM people', function(err, results) {
            if (err) {
              throw err;
            } else {
              console.log(results[0].id)
              console.log(results[0].name)
              console.log(results[0].age)
              console.log(results[0].address)
            }
          })
        }
      })
    }
  });

});
