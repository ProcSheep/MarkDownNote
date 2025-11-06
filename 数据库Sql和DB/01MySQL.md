# 数据库
- 常见的数据库
  - **关系型数据库**: ==MySQL,Oracle==,DB2,SQL Server,Postgre SQL等
  - **非关系型数据库**: ==MongoDB,Redis==,Memcached,HBse等
- 在公司中关系型数据库使用的居多,而非关系型数据库则在爬虫方面应用比较多,存储数据方便
## MySQL核心知识
### 认识MySQL
- MySQL是一个开源的数据库软件,被甲骨文(oracle)公司收购
- 1.下载MySQL,网上有教程,已下载
- 2.启动MySQL80(在"开始"搜索栏中搜索服务,即可查看数据库是否在正常运行)
- 3.连接MySQL
  - ==直接mysql8.0连接==
    - "我的"->直接搜索mysql->点击即可打开mysql 8.0
      [![pEcT06x.md.png](https://s21.ax1x.com/2025/04/07/pEcT06x.md.png)](https://imgse.com/i/pEcT06x)
    - 输入对应的数据库密码后(730035185Lhj.),使用数据库
      [![pEcTBX6.png](https://s21.ax1x.com/2025/04/07/pEcTBX6.png)](https://imgse.com/i/pEcTBX6)
  - ==配置cmd终端连接==
    - 点击设置->系统->高级系统设置->环境变量->为所有用户配置更好(下面的)->双击path->新建并黏贴mysql的文件地址`C:\Program Files\MySQL\MySQL Server 8.0\bin`
    [![pEcTdpR.png](https://s21.ax1x.com/2025/04/07/pEcTdpR.png)](https://imgse.com/i/pEcTdpR)
    在cmd中使用mysql8.0
    [![pEcTw11.md.png](https://s21.ax1x.com/2025/04/07/pEcTw11.md.png)](https://imgse.com/i/pEcTw11)
- 4.显示数据库: `show databases;` ==记得加分号==
    [![pEcL5TK.jpg](https://s21.ax1x.com/2025/04/07/pEcL5TK.jpg)](https://imgse.com/i/pEcL5TK)
- 5.数据的组织方式: 
   [![pEcL4w6.md.jpg](https://s21.ax1x.com/2025/04/07/pEcL4w6.md.jpg)](https://imgse.com/i/pEcL4w6)
### 终端操作数据库
- ==简单的练习命令行==
  - 创建数据库: `create database 数据库名字;`
  - 进入创建的数据库: `use 数据库名字;`
  - 建立一张表: `create table 表的名字(表的配置);` ==可以换行== 
      ```
        create table t_singer(
          name varchar(10), 
          age int
        );
      ```
  - 查看创建的table: `show tables;`
  - 向表中插入数据: `insert into 表名字 (表参数) values (值);`
    ```
      insert into t_singer (name,age) values ('五月天',30);
    ```
  - 查看表中的所有数据: `select * from 表名字`
  > ==操作数据库是不方便的,一般用到一些数据库图形界面工具==
### GUI工具介绍
- 使用GUI软件可以更好地操作mysql数据库,这就是图形化界面工具的好处!
- 推荐的工具:
  - ==Navicat==(14天试用,优秀但付费)
  - SQLyog(免费的)
### 认识SQL语句
- SQL语句可以对数据库进行操作,所有的关系型数据库的SQL语句都是相似的
- ==SQL规范==
  - ==通常关键字大写== 例如CREATE TABLE SHOW
  - ==一条SQL语句结束后,**用`;`结尾**==
  - 遇到关键字作为表名或者字段名称,可以用``包裹,尽量不要这么做
- ==SQL语句的分类==
  - DDL: 数据定义语言: ==数据库或表的创建,删除,修改==
  - DML: 数据操作语言: ==对表的添加,删除,修改==
  - DQL: ==数据查询语言(重点,难点):== 对数据库内的数据进行查询
  - DCL: 数据控制语言: 对数据库,表格的权限进行相关控制
## DDL语句
- DDL: 数据定义语言: ==数据库或表的创建,删除,修改==
### 基础的DDL语句
- 数据库查询一栏进行sql语言的描述
  ```sql
    -- 对数据库的操作
    -- 1.查看当前所有的数据库
    SHOW DATABASES;
    -- 2.使用某一个数据库
    USE music_db;
    -- 3.查看目前正在使用的数据库
    SELECT DATABASE();
    -- 4.创建一个数据库
    CREATE DATABASE test_demo;
    -- 安全地创建数据库,如果不存在test_demo数据库,就创建;如果存在就不创建; 重复创建数据库会报错!
    CREATE DATABASE IF NOT EXISTS test_demo;
    -- 5.删除某一个数据库
    DROP DATABASE test_demo;
    -- 同理创建数据库的安全方式,对不存在的数据库进行删除是会报错的!
    DROP DATABASE IF EXISTS test_demo;
  ```
  > 修改数据库,比如修改数据库的字符编码格式utf8,但是这个功能几乎不用,所以了解即可
  ```sql
    -- 基础的表操作
    -- 1.查看当前数据库中有哪些表
    USE music_db;
    SHOW TABLES;
    -- 2.查看表的结构 DESC=description
    DESC t_singer;
    -- 3.创建表(安全方式)
    CREATE TABLE IF NOT EXISTS users(
      -- 表的字段
      name VARCHAR(10), 
      age INT,
      height DOUBLE 
    );
  ```
  > ==此表操作为最基础的演示==
### sql的数据类型
- sql中支持的数据类型有: ==数字(bool由数字代替),日期,时间,字符串==,空间和JSON
- ==数字类型:(表示的数字大小不同)==  
  [![pEgix74.jpg](https://s21.ax1x.com/2025/04/08/pEgix74.jpg)](https://imgse.com/i/pEgix74)
  > 比如 TINYINT只有一个字节=>256,承载数字范围很小,一般用于表示布尔(0flase/1true)
  > 精确数字类型可以把浮点数的小数位数精确到某一位等
  > ==常用的类型: INT DOUBLE==
- ==日期类型==
  [![pEgFSAJ.jpg](https://s21.ax1x.com/2025/04/08/pEgFSAJ.jpg)](https://imgse.com/i/pEgFSAJ)
  > TIMESTAMP是时间戳(UTF时间范围),==常用的DATE (DATETIME/TIMESTAMP)==
- ==字符串类型==
  [![pEgivBF.jpg](https://s21.ax1x.com/2025/04/08/pEgivBF.jpg)](https://imgse.com/i/pEgivBF)
  > ==常用的是VARCHAR== 
  > BLOB一般用于存储大的视频文件(转为二进制)

### 表约束
- ==**介绍几个常见的表约束:**==
- ==**1.主键: PRIMARY KEY**==(primary key)
  - 一张表中,用于区分每一条数据的唯一性,==有一个字段永远不会重复并且不能为空,这个字段就是主键==
  - 主键是表中唯一的索引,类型为 NOT NULL(默认)
  - 主键也可以是多列主键 PRIMARY KEY(key_part),称为联合主键
  - ==建议: 主键字段应该与业务无关==
- ==**2.唯一 UNIQUE**==
  - 定义字段,这个字段不会重复,比如身份证,手机号等; ==使用UNIQUE约束的字段在表中必须是不同的==
  - UNIQUE允许有多个NULL值,不算重复;
- ==**3.不能为空 NOT NULL**==
  - 要求字段必须插入值,不能为空
- ==**4.默认值 DEFAULT**==
  - 给一个值添加默认值
- ==**5.自动递增 AUTO_INCREMENT(无提示词)**==
  - 某些字段我们希望不设置值可以自动递增,比如用户id
  > 了解: 如果删除数据后,再次添加新的数据,原来删除数据使用过的id不会被重新启用,而是顺次继续递增
> ==外键约束也是一种常见的表约束手段,在多表关系时再学习==
### 完整表操作
- ==1.创建更加完整的表 + 表约束==
  ```sql
    -- 4.创建更加完整的表 + 表约束
    CREATE TABLE IF NOT EXISTS t_users(
      id INT PRIMARY KEY AUTO_INCREMENT, -- id 主键+自动递增
      name VARCHAR(20) UNIQUE NOT NULL, -- name 唯一的+不为空
      level INT DEFAULT 0, -- level 默认值为0
      telPhone VARCHAR(20) UNIQUE -- telPhone 唯一的
    );
  ```
- ==2.修改表结构==
  ```sql
    -- 5.修改表结构
    -- 5.1修改表名字 t_users -> t_userInfo
    ALTER TABLE t_users RENAME TO t_userInfo;
    -- 5.2添加新的字段(field) 新字段createTime/updateTime,类型为TIMESTAMP
    ALTER TABLE t_userInfo ADD createTime TIMESTAMP;
    ALTER TABLE t_userInfo ADD updateTime TIMESTAMP;
    -- 5.3修改字段的名称  旧名字 新名字 类型(可以顺带把类型也修改了)
    ALTER TABLE t_userinfo CHANGE createTime createAt DATETIME;
    -- 5.4删除某一个字段(列)
    ALTER TABLE t_userinfo DROP updateTime;
    -- 5.5修改某一个字段的类型 字段id类型(int->bigint)
    ALTER TABLE t_userinfo MODIFY id BIGINT;
  ```
## DML语句
- DML: 数据操作语言: ==对表的添加,删除,修改==
### 表的操作 
- 创建新的商品表
  ```sql
    -- 1.新建商品表
    CREATE TABLE IF NOT EXISTS `t_products`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(20) UNIQUE NOT NULL,
      description VARCHAR(200) DEFAULT '',
      price DOUBLE DEFAULT 0,
      publishTime DATETIME
    );
  ```
- 表的添加: 即插入数据,前端返回数据后,后期通过后端(Node/java)的代码,向数据库中插入数据(insert),这里是最基本的插入操作
  ```sql
    -- 2.插入语句
    -- INSERT INTO `t_products` (字段列表) VALUES (值的列表);
    INSERT INTO `t_products` (title,description,price,publishTime) VALUES ('电视','这是电视',1299,'2018-9-25');
    INSERT INTO `t_products` (title,description,price,publishTime) VALUES ('小米','手机1',2599,'2020-10-25');
    INSERT INTO `t_products` (title,description,price,publishTime) VALUES ('华为','手机2',3499,'2022-6-15');
  ```
- 更新数据日志log
  ```sql
    -- 5.记录修改数据的时间,修改数据时更新最新的时间记录
    -- 给表加一个新字段updateTime,规定数据类型和添加默认值(CURRENT_TIMESTAMP.当前时间)
    -- 同时监听ON更新行为UPDATE,然后更新数值为CURRENT_TIMESTAMP
    ALTER TABLE `t_products` ADD `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; 
  ```
## DQL语句
- DQL: ==数据查询语言(重点,难点):== 对数据库内的数据进行查询
### 基础查询
- ==基础的表查询操作==
- 创建新的表,并使用node向数据库插入数据
  ```sql
    CREATE TABLE IF NOT EXISTS `products`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      brand VARCHAR(20),
      title VARCHAR(100) NOT NULL,
      price DOUBLE NOT NULL,
    -- 数字类型数据,共2位数,一位小数
      score DECIMAL(2,1),
      voteCnt INT,
      url VARCHAR(100),
      pid INT
    );
  ```
- nodejs插入数据(==后面细讲==)
- 需要提前下载: `npm i mysql2` 
  ```js
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '730035185Lhj.',
      database: 'music_db'
    });

    const statement = `INSERT INTO products SET ?;`
    const phoneJson = require('./lib/phone.json');

    for (let phone of phoneJson) {
      connection.query(statement, phone);
    }
  ```
- ==基本查询SELECT(无条件)==
  ```sql
    -- 1.基本查询
    -- 1.1 查询所有的数据 *
    SELECT * FROM `products`;
    -- 1.2 指定对应的字段
    SELECT id,brand,title,price FROM `products`;
    -- 1.3 查到字段后可以重命名(AS可以省略) id->phoneId brand-> phoneBrand
    SELECT id AS phoneId,brand AS phoneBrand,title,price FROM `products`;
  ```
- ==条件查询WHERE==
  ```sql
    -- 2.where查询条件(一)
    -- 2.1 比较运算符 >,>=,<,<=,=,!=
    SELECT * FROM `products` WHERE price <= 1000;
    SELECT * FROM `products` WHERE price >= 3000;
    SELECT * FROM `products` WHERE brand = '华为';
    SELECT * FROM `products` WHERE brand != '苹果';
    -- 2.2 逻辑运算符 AND(&&) OR(||)
    SELECT * FROM `products` WHERE brand = '华为' AND price <= 2000; 
    SELECT * FROM `products` WHERE brand = '华为' && price <= 2000; 
    SELECT * FROM `products` WHERE brand = '华为' OR price > 5000; 
    SELECT * FROM `products` WHERE brand = '华为' || price > 5000; 
    -- 2.3 查询区间范围
    SELECT * FROM `products` WHERE price >= 1000 && price <= 2000;
    SELECT * FROM `products` WHERE price BETWEEN 1000 AND 2000;
    -- 2.4 枚举其中之一 小米或华为都可以
    SELECT * FROM `products` WHERE brand = '华为' || brand = '小米'; 
    SELECT * FROM `products` WHERE brand IN ('华为','小米'); 
  ```
- ==LIKE关键字==
  ```sql
    -- 3.where查询条件(二)
    -- 查询使用LIKE关键字: %表示匹配任意个任意字符; _匹配一个任意字符;
    -- 模糊查询,title以v开头的商品, v% 以v开头,后面任意字符
    SELECT * FROM `products` WHERE title LIKE 'v%';
    -- 查询商品中带v的商品
    SELECT * FROM `products` WHERE title LIKE '%v%';
    -- 查询分数 8.0分-8.9分
    SELECT * FROM `products` WHERE score LIKE '8._';
  ```
- ==排序 ASC DESC==
  ```sql
    -- 4.查询结果排序 ASC升序(低->高) DESC降序(高->低)
    -- 查询小于等于1000元的手机,并把评分按照降序排序
    SELECT * FROM `products` 
      WHERE price <= 1000 
      ORDER BY score DESC;
  ```
- ==分页查询==
- 当数据库内容太多的时候,一次性显示过多的数据不现实;
- ==我们要求用户传入offset,size,page等参数,让我们在数据库中进行分页查询==
  ```sql
    -- 5.分页查询
    -- 查询20条数据,默认从第一条数据开始
    SELECT * FROM `products` LIMIT 20;
    -- 查询20条数据,指定偏移40条数据
    SELECT * FROM `products` LIMIT 20 OFFSET 40;
  ```
## MySQL的高级特性
### 聚合函数与group by
- 聚合函数: 对值的集合进行操作的组(集合)函数
- ==1.常见的聚合函数==
  ```sql
    -- 1.计算华为手机的平均价格 AVG(价格集合) 对价格集合求平均值
    SELECT AVG(price) FROM `products` WHERE brand = '华为';
    -- 计算华为手机的平均分数,并改名
    SELECT AVG(score) AS HuaWeiAVGScore FROM `products` WHERE brand = '华为';
    -- 2.选择所有手机中的最高评分 MAX()/同理有Min()
    SELECT MAX(score) FROM `products`;
    -- 3.所有的手机一共有多少人投过票 SUM()
    SELECT SUM(voteCnt) FROM `products`;
    -- 4.计算有多少个商品 COUNT(*) 所有条目
    SELECT COUNT(*) FROM `products`;
    SELECT COUNT(*) FROM `products` WHERE brand = '华为'; -- 华为的
  ```
- ==2.认识Group By==
- ==先对数据进行分组,然后每一组数据进行聚合函数运算==
  ```sql
    -- 5.group by 所有的数据根据brand分类,然后进行集合运算
    SELECT brand FROM `products` GROUP BY brand;
    -- 分组后,查询每组中手机的最高价格, ROUND(数据,保留几位小数)
    SELECT
      brand,
      MAX(price),
      ROUND(AVG(price), 2),
      ROUND(AVG(score), 2)
    FROM
      `products`
    GROUP BY
      brand;
  ```
- ==分组后的二次查询==
  ```sql
    -- 6.对分组后的数据进行2次查询
    -- 不分组: 条件查询的组合 SELECT + WHERE
    -- 分组后: 条件查询的组合 GROUP BY + HAVING
    SELECT
      brand,
      MAX(price),
      ROUND(AVG(price), 2) AS AvgPrice,
      ROUND(AVG(score), 2) AS AvgScore
    FROM
      `products`
    GROUP BY
      brand
    HAVING
      AvgScore > 7 AND AvgPrice <= 4000;
  ```
- ==**聚合函数与group by的结合**==
  - 聚合函数的功能是对一组数据进行计算，进而返回单一的值。像 SUM、AVG、COUNT、MAX、MIN 以及 JSON_ARRAYAGG 等,都属于聚合函数。
  - JSON_ARRAYAGG可以按照分组把字段数据整合为JSON数据
  - GROUP BY 子句会把查询结果按照指定的列进行分组，每个组内的数据会被视为一个整体，聚合函数会对每个组分别进行计算。
  - ==若不使用 GROUP BY 子句，数据库就不清楚该对哪些行进行聚合操作。因为聚合函数要求对一组行进行计算，要是没有明确分组，数据库就无法决定如何处理数据。所以，在使用聚合函数时，必须明确指定 GROUP BY 子句，告知数据库按照哪些列进行分组。==
  - ==数据库运行时会先进行group by分组,然后再对分组后的数据进行聚合运算==
### 多表联合
[![pEgMN9S.png](https://s21.ax1x.com/2025/04/08/pEgMN9S.png)](https://imgse.com/i/pEgMN9S)
> 多表联合,如图这两个表可以按照这个关系连接在一起 
- ==主键约束与外键约束==
  - products表中已经有主键约束id,==外键约束是表中有一个字段和别的表中某些字段有关联,进而产生了联系和约束;==
  - 将两张表连接起来,==比如可以把products表的中brand_id与brands表的id进行关联,**那么products表中的brand_id字段就被称为外键约束**==
  - ==**外键约束体现**==: products表的brand_id的值必须是brands表中id字段值的某一个,不得超出范围
- ==**1.创建外表brands**==
  ```sql
    -- 4. 为品牌创建一张表 (phone.json)
    CREATE TABLE IF NOT EXISTS brands(
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(10) NOT NULL,
      website VARCHAR(100),
      worldRank INT
    );

    -- 数据故意和products不一致
    INSERT INTO brands (name, website, worldRank) VALUES ('华为', 'www.huawei.com', 1);
    INSERT INTO brands (name, website, worldRank) VALUES ('小米', 'www.mi.com', 10);
    INSERT INTO brands (name, website, worldRank) VALUES ('苹果', 'www.apple.com', 5);
    INSERT INTO brands (name, website, worldRank) VALUES ('oppo', 'www.oppo.com', 15);
    INSERT INTO brands (name, website, worldRank) VALUES ('京东', 'www.jd.com', 3);
    INSERT INTO brands (name, website, worldRank) VALUES ('Google', 'www.google.com', 8);
  ```
- ==**2.如何创建外键约束**?==
  - ==1.创建阶段==
    ```sql
      -- 单独为歌手建立一张表 
      CREATE TABLE IF NOT EXISTS singers(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(10) NOT NULL,
        info VARCHAR(200),
        singer_id INT,
        -- 外键: 为singer_id引入其他表brands的字段id
        -- 将singers表的singer_id与brands表的id进行连接!
        FOREIGN KEY (singer_id) REFERENCES brands(id);
      );
    ```
    > FOREIGN KEY 外来的钥匙(外键)
    > REFERENCES 引入
  - ==**2.对于已经创建的表**==
    ```sql
      -- 5.为products表添加brand_id字段,并设置外键约束
      -- 添加新的字段brand_id 作为外键约束字段
      ALTER TABLE `products` ADD `brand_id` INT;
      -- 为products表添加新的外键约束 (此表的字段) REFERENCES 外表(外表的字段)
      ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES brands(id);
    ```
    > 检验字段是否有外键约束,可以从右键表-设计表-查看tab栏的外键项; 也可以点入表的视图,双击外键属性,会显示对应的外键连接选项,示意你填写外键允许的值
- ==**3.为products表的brand_id字段赋值**==
  ```sql
    -- 6.为新外键属性赋值
    UPDATE `products` SET `brand_id` = 1 WHERE `brand` = '华为';
    UPDATE `products` SET `brand_id` = 4 WHERE `brand` = 'OPPO';
    UPDATE `products` SET `brand_id` = 3 WHERE `brand` = '苹果';
    UPDATE `products` SET `brand_id` = 2 WHERE `brand` = '小米';
  ```
### 外键更新与删除
- ==brands表中的外键id被删除或更新时会发生什么?== 原则上,外键(父)是不允许随意修改或删除的
- 如果我希望可以更新呢? ==我们需要修改ondelete或者onupdate的值==
 - ==我们可以给更新或者删除时设置几个值==：
    - ==RESTRICT（默认属性）==：当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话会报错的，不允许更新或
    删除；
    - NO ACTION：和RESTRICT是一致的，是在SQL标准中定义的；
    - ==CASCADE(意为'跟随')==：当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话：
    ✓ 更新：那么会更新对应的记录；
    ✓ 删除：那么关联的记录会被一起删除掉；
    - SET NULL：当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话，将对应的值设置为NULL；
- ==为外键设置on update和on delete==
  - ==**先删除原外键,再重新创建并设置,这样操作简单**==
    ```sql
      --  7.为外键设置on update和on delete
      SHOW CREATE TABLE products; -- 查看外键的名字,会显示表的结构;也可以在设计表的tab外键一栏中查看
      ALTER TABLE products DROP FOREIGN KEY products_ibfk_1; -- 删除外键
      -- 设置新的外键,和原来一样,并设置对应on update和on delete = CASCADE
      ALTER TABLE products ADD FOREIGN KEY (brand_id) REFERENCES brands(id) ON UPDATE CASCADE ON DELETE CASCADE;
      -- 8.修改外键的值 把brands表中id为1的字段id改为998
      UPDATE brands SET id = 998 WHERE id = 1;
    ```
- 设置华为id为998后的效果图
  ![外键更改](https://github.com/ProcSheep/picx-images-hosting/raw/master/学习笔记/外键更改.9nzz0usm9y.webp)
### 多表查询
- ==查询产品信息时,因为数据是分别放在2张表中的,所以这时候需要进行连表查询==
- ==**常规查询(都不可用)**==
  ```sql
    -- 1.直接从两张表中查询数据 笛卡尔乘积 X*Y
    SELECT * FROM products,brands; -- 108 * 6
    -- 2.筛选数据,过滤后,依旧不是我们想要的,比如锤子科技和vivo因为没有对应的brands外键,直接被过滤了
    SELECT * FROM products,brands WHERE products.brand_id = brands.id;
  ```
- ==SQL JOIN的示意图==
  ![表之间的连接](https://github.com/ProcSheep/picx-images-hosting/raw/master/学习笔记/表之间的连接.41y8mzrbgk.webp)
- ==**用的最多的是左连接和内连接,其余的用的很少**==
- ==1.左连接==和右连接
  ```sql
    -- 3.表之间的连接 SQL JOIN
    -- 3.1 左连接(LEFT JOIN): 以左边的表为主,左边的表会全部展示,开发中常用(80%-90%)
    -- 左表(主表) LEFT JOIN 右表 ON 连接条件,以左表为主,如果左表有的数据对应右表没有数据就显示为null
    SELECT * FROM products LEFT JOIN brands ON products.brand_id = brands.id;
    -- 左边的哪些数据是和右表没有交集的(即锤子科技,vivo) 很少用 
    SELECT * FROM products LEFT JOIN brands ON products.brand_id = brands.id WHERE brands.id IS NULL;
    -- 有交集的数据(华为 小米 苹果 OPPO)
    SELECT * FROM products LEFT JOIN brands ON products.brand_id = brands.id WHERE brands.id IS NOT NULL;
  ```
- 同理
  ```sql
    -- 3.2 右连接(RIGHT JOIN): 以右边的表为主,右边的表会全部展示,不常用(了解)
    SELECT * FROM products RIGHT JOIN brands ON products.brand_id = brands.id;
    SELECT * FROM products RIGHT JOIN brands ON products.brand_id = brands.id WHERE brands.id IS NULL;
    SELECT * FROM products RIGHT JOIN brands ON products.brand_id = brands.id WHERE brands.id IS NOT NULL;
  ```
- ==2.内连接==
  ```sql
    -- 3.3 内连接 [CROSS] JOIN , []意为可省略
    -- 意为左右表共有的数据,其实就是交集
    SELECT * FROM products JOIN brands ON products.brand_id = brands.id;
  ```
- 3.全连接
  ```sql
    -- 3.4全连接(全集) FULL JOIN X
    -- 但是MySQL不支持全连接, 需要使用UNION(联合), 曲线实现'左连接+右连接'(重复的会删除)
    (SELECT * FROM products LEFT JOIN brands ON products.brand_id = brands.id) 
    UNION 
    (SELECT * FROM products RIGHT JOIN brands ON products.brand_id = brands.id);
  ```
### 多对多的数据库
- 在数据库中,最难的情况属于==多对多==,上面学的是比较难的一对多情况(例如一个华为品牌对应多部华为手机)
- 多对多的关系一般==建立一张关系表==
  ![多对多的数据库](https://github.com/ProcSheep/picx-images-hosting/raw/master/学习笔记/多对多的数据库.41y8mzrbgl.webp)
- 关系表的体现: 
  ![关系表](https://github.com/ProcSheep/picx-images-hosting/raw/master/学习笔记/关系表.7i0kf30yit.webp)
- SQL语句练习:
- ==1.表的创建和基础数据准备==
  ```sql
    -- 1多对多的关系
    -- 1.1 创建学生表
    CREATE TABLE IF NOT EXISTS `students`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(20) NOT NULL,
      age INT
    );


    -- 1.2 创建课程表
    CREATE TABLE IF NOT EXISTS `courses`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(20) NOT NULL,
      price DOUBLE NOT NULL
    );

    -- 1.3 为学生表和课程表插入数据
    INSERT INTO `students` (name, age) VALUES('why', 18);
    INSERT INTO `students` (name, age) VALUES('tom', 22);
    INSERT INTO `students` (name, age) VALUES('lilei', 25);
    INSERT INTO `students` (name, age) VALUES('lucy', 16);
    INSERT INTO `students` (name, age) VALUES('lily', 20);
    INSERT INTO `courses` (name, price) VALUES ('英语', 100);
    INSERT INTO `courses` (name, price) VALUES ('语文', 666);
    INSERT INTO `courses` (name, price) VALUES ('数学', 888);
    INSERT INTO `courses` (name, price) VALUES ('历史', 80);
    INSERT INTO `courses` (name, price) VALUES ('物理', 100);
    
    
    -- 1.4 创建学生选课的关系表
    CREATE TABLE IF NOT EXISTS `students_select_courses`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      course_id INT NOT NULL,
      --  外键约束: 学生id和课程id要受学生表和课程表的约束!
      --  UPDATE CASCADE和DELETE CASCADE保证了关系表的数据可以跟随主表变化(更新/删除),保证数据的一致性
      FOREIGN KEY (student_id) REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
    
      -- 1.5 学生选择课程
    # why 选修了英文和数学
    INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 1);
    INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 3);
    # lilei选修了语文和数学和历史
    INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 2);
    INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 3);
    INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 4);
  ```
- ==1.查询多对多数据(一)==
  ```sql
    -- 2.查询多对多数据(一)
    -- 所有的别名关键字 AS 省略; 旧名字 [AS] 新名字
    -- 2.1 所有学生的选课情况(有选课的) 内连接
    SELECT
      stu.NAME stuName,
      stu.age stuAge,
      cs.NAME csName,
      cs.price csPrice
    FROM
      students stu
      JOIN students_select_courses ssc ON stu.id = ssc.student_id
      JOIN courses cs ON ssc.course_id = cs.id;
    -- 2.2 所有的学生(有没有选课都行) 左连接
    -- 展示所有的学生信息
    SELECT
      stu.NAME stuName,
      stu.age stuAge,
      cs.NAME csName,
      cs.price csPrice
    FROM
      students stu
      LEFT JOIN students_select_courses ssc ON stu.id = ssc.student_id
      LEFT JOIN courses cs ON ssc.course_id = cs.id;

  ```
- ==JOIN连表解析(依据ON连接)==
  ```
    1.students stu JOIN students_select_courses ssc ON stu.id = ssc.student_id：
      这部分将 students 表（别名 stu）和 students_select_courses 表（别名 ssc）进行了连接。
      连接条件是 stu.id = ssc.student_id，意思是 students 表中的 id 字段与 students_select_courses 表中的 student_id 字段值相等的记录会被匹配连接起来。
    2.students_select_courses ssc JOIN courses cs ON ssc.course_id = cs.id：
      这部分将 students_select_courses 表（别名 ssc）和 courses 表（别名 cs）进行了连接。
      连接条件是 ssc.course_id = cs.id，即 students_select_courses 表中的 course_id 字段与 courses 表中的 id 字段值相等的记录会被匹配连接起来。
  ```
- ==2.查询多对多数据(二)==
  ```sql
    -- 3.查询多对多数据(二)
    -- 3.1 某一个学生的选择情况why
    -- 承接之前的JOIN连接查好的数据,然后加个条件WHERE即可
    SELECT
      stu.NAME stuName,
      stu.age stuAge,
      cs.NAME csName,
      cs.price csPrice
    FROM
      students stu
      JOIN students_select_courses ssc ON stu.id = ssc.student_id
      JOIN courses cs ON ssc.course_id = cs.id
    WHERE
      stu.NAME = 'why';
      
    -- 3.2 lilei的选课情况(没选课的学生) 左连接
    -- 为了安全,其实3.1也应当用左连接,保证学生没有选课也会返回数据
    SELECT
      stu.NAME stuName,
      stu.age stuAge,
      cs.NAME csName,
      cs.price csPrice
    FROM
      students stu
      LEFT JOIN students_select_courses ssc ON stu.id = ssc.student_id
      LEFT JOIN courses cs ON ssc.course_id = cs.id
    WHERE
      stu.NAME = 'lilei';
      
    --  3.3查看哪些学生没有选课
    SELECT
      stu.NAME stuName,
      stu.age stuAge,
      cs.NAME csName,
      cs.price csPrice
    FROM
      students stu
      LEFT JOIN students_select_courses ssc ON stu.id = ssc.student_id
      LEFT JOIN courses cs ON ssc.course_id = cs.id
    WHERE
      cs.id IS NULL;
      
    -- 3.4查看哪些课程没有被选择 (右连接) 以右边的表为主
    SELECT
      stu.NAME stuName,
      stu.age stuAge,
      cs.NAME csName,
      cs.price csPrice
    FROM
      students stu
      RIGHT JOIN students_select_courses ssc ON stu.id = ssc.student_id
      RIGHT JOIN courses cs ON ssc.course_id = cs.id
    WHERE
      stu.id IS NULL;
  ```
## MySQL-node的使用

- ==使用node/java/go程序操纵数据库,进行数据存储和查询,对应的需要额外的数据库驱动,比如node的驱动就是mysql2,本章节学习通过node连接数据库mysql的知识==

### 查询结果转为对象
- 正常情况下,我们查询的数据返回是以表为单位的,每一张表在程序中的体现是一个数组,表中的每一条信息都是数组中的一个对象;
- ==外键brand_id变为单独的,内置的一个对象,对象内容为对应的brands表中的值==
  ```js
    [
        // 第一条手机信息
        {
            id: ,
            title: ,
            price: ,
            ...
            brand: { // 外键信息单独成一体
              name: ,
              website: ,
              ....
            }
        },
        // 第二条手机信息
        {
          .......
        },
        // 其他剩余信息
        ........
    ]
  ```
- SQL代码:
  ```sql
    -- 1.多表查询,品牌单独一个对象
    SELECT
      products.id AS id,
      products.title AS title,
      products.price AS price,
      -- 创建新的内置对象,命名brand,内部的属性和值一一注明;
      JSON_OBJECT('id', brands.id, 'name',brands.`name`, 'website', brands.website, 'rank', brands.worldRank) AS brand
    FROM
      products
      LEFT JOIN brands ON products.brand_id = brands.id;
  ```
- 示例图: 
  ![查询结果转化为对象](https://github.com/ProcSheep/picx-images-hosting/raw/master/学习笔记/查询结果转化为对象.26lnv3iks8.png)

### 多对多转数组
- ==查询学生选课的数据格式应当如下格式:== 
  ```js
    [
      {
        // 学生
        name: why,
        age: 20,
        // 学生的选课
        courses: [
          {id:1,name:"英语",price:100},
          {id:2,name:"数学",price:120}
        ]
      },
      .......
    ]
  ```
- ==直接查询的格式:== 
  ![未整理的多表查询](https://github.com/ProcSheep/picx-images-hosting/raw/master/学习笔记/未整理的多表查询.8dx1v9ebwa.png)
- SQL语句
  ```sql
    -- 2.查询到的结果转化为数组类型
    SELECT
      stu.id stuId,
      stu.`name` stuName,
      stu.age stuAge,
      -- 定义一个数组,数组中定义好对象格式,数组别名为courses
      JSON_ARRAYAGG(JSON_OBJECT('id', cs.`name`, 'name', cs.NAME, 'price', cs.price)) AS courses
    FROM
      students stu
      LEFT JOIN students_select_courses ssc ON stu.id = ssc.student_id
      LEFT JOIN courses cs ON ssc.course_id = cs.id
    WHERE
      cs.id IS NOT NULL
    GROUP BY
      -- SQL查询运用了JSON_ARRAYAGG函数,此函数属于聚合函数,聚合函数要和GROUP BY子句搭配使用;
      stu.id;
  ```
  ![查询结果转为数组](https://github.com/ProcSheep/picx-images-hosting/raw/master/学习笔记/查询结果转为数组.1e8sdd1z21.png)

### 认识mysql2
- ==在node代码中连接mysql数据库就是用第三方库`mysql2`==
- 下载: `npm i mysql2`
- ==mysql2的优势:==
  - 更快的性能;
  - 预编译语句(perpared statement): 提高性能和放置SQL语句注入;
  - 支持promise,async/await;
- ==mysql2基本使用:==
  ```js
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
  ```
### 预编译语句
- ==Prepared Statement(预编译语句) 的优点==:
  - 提高性能;
  - 防止SQL注入;
- ==1.提高性能==
  - node编写的sql语句在进入sql程序运行之前,会解析为二进制,检查语法是否有错误和适当的优化,然后才会运行sql代码;
  - 如果客户端用户刷新页面或者重新进入页面,需要再次请求数据,那么有的sql语句就会重复执行多次,而每次执行都会编译,这样浪费了性能
  - ==预处理(编译)语句格式(?)==
    ```sql
      SELECT * FROM students WHERE price > ?;
    ```
    > ==?不是固定的值==,遇到这种sql语句,程序会把这个语句模板发送给sql程序编译,==然后会存储起来但不执行==,当接受到真正的参数时才会执行对应的代码,==并且就算多次执行,也只会编译一次sql语句==,所以性能更高!
- ==2.防止SQL注入(了解)==
  - 数据库安全方面的问题,比如一个论坛的数据库的用户数据库,有管理员用户和普通用户,普通用户登录时,后端处理前端传递的信息时,会拼接一些sql语句,然后交由数据库处理
  - 有一些用户(黑客)会用某些手段去登录管理员账号,通过注入一些sql语句,连同自己的登录信息一起发送给后端,然后这个sql语句会干扰后端正常的逻辑运行,使得这个用户可以顺利登录到管理员账号,造成安全隐患!
  - 现在解决一般会用预处理语句?,用户输入的信息(用户名和密码)会被当作?的参数传给sql程序,==而sql程序解析?时,不会执行sql内容,它会把?的内容纯当作字符串处理,所以黑客对应的sql语句不会被当作sql执行,而是当作简单的字符串处理==,这样杜绝了sql注入造成的安全问题
  >
- ==**编写预处理语句**==
  ```js
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
  ```
### 连接池
- ==连接的问题==: 当我们创建一个连接后,当有数据请求时,会执行对应代码,但是同时有多个请求时,连接会被第一个请求占用,导致后面的请求需要等待,这时可以重新创建一个新的连接处理后续的请求,使用完成后再删除,但是频繁的创建+销毁连接操作会浪费性能.
- ==连接池(Connection Pools)==: 连接池可以在需要连接的时候自动创建连接,并且创建的连接不会被销毁,而是放入连接池中,后续可以继续使用,==我们可以在创建连接池限制最大连接个数LIMIT==
- ==连接池语法==
  ```js
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
    connectionPool.execute(statement, [3000, 8], (err, values) => {
      if (err) {
        console.log(err);
      }
      console.log(values);
    });
  ```
### mysql2与promise
- 查询数据库数据时都是异步操作,比如`execute()`; 通过promise可以使代码更简洁,防止回调地狱;
  ```js
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
  ```