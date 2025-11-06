const mysql = require("mysql2");

// 1.创建连接池,限制最大连接数量为10个
const connectionPool = mysql.createPool({
  host: "localhost", // 本地数据库
  port: 3306,
  user: "root",
  password: "730035185Lhj.",
  database: "music_db",
  connectionLimit: 10, // 限制最大连接数量
});

// 2.执行sql语句
const statement = "SELECT * FROM `products` WHERE price > ? AND score > ?;";
// connectionPool.execute(statement, [3000, 8], (err, values) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(values);
// });

// 使用异步promise
connectionPool
  .promise() // 使用后返回的结果就为promise类型
  .execute(statement, [4000, 7])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
// res的数据结构是 { [values],[fields] }
// 可以解构出你想要的数据 .then(([values]) => console.log(values));
