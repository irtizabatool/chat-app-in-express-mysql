const mysql = require('mysql');

//Creating a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysqlexpress'
});

//Connect
db.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
});

module.exports = db;