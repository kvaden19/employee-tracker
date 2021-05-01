const mysql = require('mysql');
const showMenu = require('./scripts/queries.js');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'kyleflugen',
  database: 'management_DB'
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    showMenu(connection);
});