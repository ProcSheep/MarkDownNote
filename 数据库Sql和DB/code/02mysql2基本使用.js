const mysql = require('mysql2');

// 1.创建一个连接(连接上数据库)
const connection = mysql.createConnection({
  host: 'localhost', // 本地数据库
  port: 3306,
  user: 'root',
  password: '730035185Lhj.',
  database: 'music_db'
})

// 2.执行sql语句,操作数据库
const statement = 'SELECT * FROM students;'
// query()可以执行任意的sql语句
connection.query(statement,(err,values,fields) => {
  if(err){
    console.log('查询失败',err)
    return
  }

  console.log(values) // 打印值,表就是数组,每一条数据就是一个对象
  console.log(fields) // 打印字段,字段名和对应的类型和要求
})



