const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'rest.cxmajmnxalee.us-east-1.rds.amazonaws.com',
  port:3306,
  user: 'Admin',
  password: 'Admin181197',
  database: 'api_rest',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
