const mysql = require('mysql2');

// 1.创建一个连接(连接上数据库)
const connection = mysql.createConnection({
  host: 'localhost', // 本地数据库
  port: 3306,
  user: 'root',
  password: '730035185Lhj.',
  database: 'music_db'
})

// 2.执行一个sql语句: 预处理语句?
const statement = 'SELECT * FROM `products` WHERE price > ? AND score > ?;'
// 编译预处理语句和传参
connection.execute(statement,[3000,8],(err,values) => {
  if(err){
    console.log(err)
  }
  console.log(values)
})

// 断开连接 
// 立即断开连接,不管是否正在查询数据,不安全
// connection.destroy()

// 安全的查询数据后,再断开连接
connection.end()