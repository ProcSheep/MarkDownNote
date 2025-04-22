const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '730035185Lhj.',
  database: 'music_db'
});

const statement = `INSERT INTO products SET ?;`
const phoneJson = require('../lib/phone.json');

for (let phone of phoneJson) {
  connection.query(statement, phone);
}
