# Node和MongoDB
- 总结一些Node状态下连接MongoDB相关知识
## Mongoose
- Node <-> Mongoose <-> MongoDB，==Node通过mongoose连接数据库，可以了解连接数据库时创建的“连接”实例connect==
  ```js
    const mongoose = require("mongoose");
    // 一个连接中可能有多个数据库，这里选择数据库test
    const connect = await mongoose.connect(`mongodb://127.0.0.1:27018/test`);

    // 1. 主动关闭数据库连接（比如服务停止时释放资源）
    // 避免连接泄露，尤其在脚本/测试场景中必需
    app.on('close', async () => {
      await connect.disconnect(); 
      console.log('数据库连接已关闭');
    });

    // 2. 监听连接状态变化（调试/监控常用）
    connect.on('connected', () => console.log('连接成功'));
    connect.on('error', (err) => console.log('连接失败：', err));
    connect.on('disconnected', () => console.log('连接断开'));
  ```
- 1.connect就是Mongoose 连接实例（Connection 对象），它是操作 MongoDB 数据库的核心 “桥梁”，==所有数据库交互（增删改查、索引操作、事务等）都依赖这个连接实例==。
- 1.1 ==直接连接数据库某个集合(**最主要的**)==
- 比如：想要临时测试一些数据查询，不想要通过Model+Schema来操作数据库
  ```js
    // 获取数据库中users集合
    const usersCollection = await connect.collection('users') 

    // 统计age>18数量
    const userCount = await usersCollection.countDocuments({age: {$gt: 18}})
    const class = await usersCollection.find({class: "1001"}).toArray()
  ```
  > 通过获取数据库集合，相当于获取到model+schema定义的model实例，可以通过它直接实现对数据库数据的增删改查，比如`find updateOne delete insertOne`等等操作
- ==toArray() 方法==将聚合管道的结果转换为数组，方便后续处理。
  - 没有toArray，node在数据库查询中返回的是一个 MongoDB 游标对象（Cursor），而不是直接的数据结果，游标是一种特殊的对象，它指向查询结果集，但并不立即包含所有数据
  - ==MongoDB 使用游标的设计是为了高效处理大量数据，避免一次性将所有数据加载到内存==,游标允许按需获取数据，但在这个分页查询场景中，我们需要一次性获取当前页的所有数据
  - toArray() 方法会遍历游标中的所有文档，并将它们转换为标准的 JavaScript 数组格式(数组的每一项就是查询的一条数据), 转换后的数组包含普通的 JavaScript 对象，这些对象可以直接在代码中使用（访问属性、进行操作等）
  > 1.如果不使用 toArray()，直接使用游标对象，你将无法像操作普通数组那样使用查询结果，也无法获取总记录数等必要信息。所以虽然 MongoDB 返回的游标也包含数据，但为了在 Node.js 代码中更方便地操作这些数据，通常需要调用 toArray() 将其转换为标准 JavaScript 数组
  > ==2.数据库集合可以显式去写，比如`replay -> replaies`,数据库无法`y->ies`,就需要直接写成`collection("replaies")`==
- 1.2 新：多个原子操作，connect创建事务回话
  ```js
    // 1. 开启事务会话
    const session = await connect.startSession();
    session.startTransaction();

    try {
      // 2. 所有操作绑定会话（确保原子性）
      await User.updateOne({ _id: 'A' }, { $inc: { money: -100 } }, { session });
      await User.updateOne({ _id: 'B' }, { $inc: { money: 100 } }, { session });

      // 3. 成功则提交事务
      await session.commitTransaction();
    } catch (err) {
      // 4. 失败则回滚（恢复到操作前状态）
      await session.abortTransaction();
      throw err;
    } finally {
      // 5. 关闭会话
      session.endSession();
    }
  ```
- 3.可以通过 connect 直接操作集合的索引、创建 / 删除集合等：
  ```js
    // 1. 为 "users" 集合创建索引（提高查询效率）
    await connect.collection('users').createIndex({ email: 1 }, { unique: true });

    // 2. 删除集合（谨慎使用！）
    await connect.collection('temp_data').drop();

    // 3. 查看集合列表
    const collections = await connect.db.listCollections().toArray();
    console.log('数据库中所有集合：', collections.map(c => c.name));
  ```

## **注意Node/Shell的时区**
- Mongodb默认的时区是UTC，即0时区时间，中国时区的UTC+8,数据库这样存储时间为了统一不同地区的时间，所以不推荐修改，==只要在用的时候把数据库内时间转化为对应时区的时间即可==
- 1.Node插入/shell直接插入
  ```js
    db.collection.insertOne({
      name: "张三",
      age: 25,
      // 自动填充创建时间和更新时间（插入时两者一致）
      createAt: new Date(),
      updateAt: new Date()
    });
  ```
  ```shell
    db["testdatas"].insertOne({
      "name": "tod",
      "createAt": new Date(),
      "updateAt": new Date()
    })
  ```
  > mongo直接插入数据不会自动生成createAt/updateAt，需要手动写，==生成时间默认UTC+0==
- 1.2 如果在引入json的时候,可以这样设置时间
  ```json
    [
      {
        "name": "张三",
        "age": 25,
        "createdAt": { "$date": "2025-11-26T02:00:00Z" },
        "updatedAt": { "$date": "2025-11-26T02:00:00Z" }
      },
      {
        "name": "李四",
        "age": 30,
        "createdAt": { "$date": "2025-11-26T03:00:00Z" },
        "updatedAt": { "$date": "2025-11-26T03:00:00Z" }
      }
    ]
  ```
  > 这样通过compass引入数据库的时间也是UTC时间，Z代表祖鲁时间，即0时区的时间（UTC+0）
  0000000000000
- ==**注意：生成的时间不是单纯的字符串，而是MongoDB的ISODate类型(对应mongoose的Date类型)，相对比字符串有天然优势**==
- 表格(ISODate与纯字符串的区别)
  | 对比维度                | ISODate 类型（MongoDB 原生）                          | 普通字符串时间（如 "2025-11-28 18:00:00"）          |
  |-------------------------|-------------------------------------------------------|-----------------------------------------------------|
  | 底层存储                | UTC 时间戳（毫秒数），结构化数据类型                   | 纯文本，无结构化语义                                 |
  | 时间范围查询（$gt/$lt） | 支持，精准匹配时间逻辑（如查询过去1个月）              | 不支持，按字典序比较（逻辑错误，如 "2025-12-01" < "2025-11-30"） |
  | 排序/分页               | 支持，按时间顺序排序（如按创建时间倒序）               | 不支持，排序结果为字典序（与时间序无关）             |
  | 索引优化                | 支持创建索引，大幅提升时间查询性能（百万级数据适用）   | 字符串索引对时间查询无效，全表扫描性能极差           |
  | 时间计算/转换           | 支持 MongoDB 日期函数（$dateAdd/$dateDiff）、时区转换   | 需手动解析为日期对象，步骤繁琐且易出错               |
  | 跨时区兼容性            | 存储 UTC 时间，可转为任意时区（如北京/纽约时间）       | 时区固定，跨地区部署易出现时间混乱                   |
  | 数据一致性              | 自动标准化（ISODate 格式），无格式差异                 | 需手动维护格式（如 "2025-11-28" vs "2025/11/28"），易出错 |
  | Mongoose 对应类型       | Date 类型（自动映射）                                 | String 类型（需手动处理）                             |
- 图000000000000000
- ==2.查询示例：（会自动转化）==
- Node/shell: ==mongoose和mongodb会自动转化时区==
  ```js
      // 场景1：查询「过去1个月内创建」的用户（createdAt > 1个月前的当前时间）
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // 计算1个月前的时间（UTC 时间戳）

      const usersIn1Month = await User.find({
        createdAt: { $gt: oneMonthAgo } // $gt：大于1个月前，即近1个月内
      }).sort({ createdAt: -1 }); // 按创建时间倒序（最新的在前）

      // 场景2：查询「过去3个月内更新」的用户（updatedAt >= 3个月前 && <= 当前时间）
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const usersIn3Months = await User.find({
        updatedAt: {
          $gte: threeMonthsAgo, // $gte：大于等于3个月前
          $lte: new Date()      // $lte：小于等于当前时间
        }
      });
  ```
  ```shell
  // shell： 查询5个小时之前创建的数据
    db["testdatas"].find({
      createAt: {$gte: new Date(Date.now() - 1000 * 60 * 60 * 5)}
    })
  ```
- ==解析==：比如第一个oneMonthAgo
  - 1.你在 Node.js 中计算 oneMonthAgo = new Date()（假设本地是北京时间 UTC+8，当前时间为 2025-11-28T18:00:00+08:00）；
  - 2.oneMonthAgo.setMonth(...) 调整后，日期对象变为 2025-10-28T18:00:00+08:00；
  - 3.当执行 find({ createdAt: { $gt: oneMonthAgo } }) 时，==Mongoose 会自动将 oneMonthAgo 转为 UTC 时间戳（比如 1756434983801）==
  - 4.数据库中 createdAt（ISODate("2025-11-14T10:03:03.801Z")）的底层也是 UTC 时间戳（比如 1756434983801 对应的 UTC 时刻）；
  - 5.MongoDB 直接对比两个时间戳的数值大小（createdAt 的时间戳 > oneMonthAgo 的时间戳），得出查询结果。
  > ==同理shell执行时数据库mongodb会把里面的时间转化为UTC时间戳==
- Node.js（Mongoose）vs MongoDB Shell 时间查询差异（核心逻辑一致）
  | 对比维度                | Node.js（Mongoose）                                  | MongoDB Shell                                      |
  |-------------------------|-----------------------------------------------------|-----------------------------------------------------|
  | 传递时间格式            | 主要使用 Date 对象（如 new Date()、oneMonthAgo），也支持时间戳数字 | 主要使用 Date 对象（如 new Date()），也支持时间戳数字 |
  | 自动转换逻辑            | Mongoose 先将 Date 对象 → UTC 时间戳 → 传递给 MongoDB | Shell 直接将 Date 对象 → UTC 时间戳 → 与 ISODate 对比 |
  | 底层对比逻辑            | 完全一致：UTC 时间戳数值对比（$gt/$lt 本质是数值比较） | 完全一致：UTC 时间戳数值对比                         |
  | 时区处理                | 本地时区 Date 对象自动转为 UTC 时间戳，无需手动加减时差 | 本地时区 Date 对象自动转为 UTC 时间戳，无需手动处理   |
  | 代码示例（过去1个月查询） | ```javascript const oneMonthAgo = new Date(); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); User.find({ createdAt: { $gt: oneMonthAgo } }); ``` | ```javascript const oneMonthAgo = new Date(); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); db.users.find({ createdAt: { $gt: oneMonthAgo } }); ``` |
  | 支持的时间格式扩展      | 支持 Mongoose Schema 配置（如 timestamps、transform 转换） | 支持直接调用 MongoDB 日期函数（如 $dateToString）     |
  | 批量操作/聚合查询       | 通过 Mongoose 聚合方法（aggregate()）调用日期管道       | 直接编写聚合管道语法，原生支持所有日期函数           |
  | 依赖项                  | 依赖 Mongoose 库（对 MongoDB 原生驱动的封装）          | 无依赖，直接操作数据库原生接口                       |

- 1.3（可选） 这样插入数据可以添加验证器validate校验数据，以防没有添加不合法数据，例如
  ```shell
    // 创建 users 集合，指定Schema验证：createAt和updateAt必须是日期类型且必填
    db.createCollection("users", {
      validator: {
        $and: [
          { createAt: { $type: "date" } }, // 类型必须是date
          { updateAt: { $type: "date" } }
        ]
      },
      validationLevel: "strict", // 严格验证：不符合Schema的文档无法插入
      validationAction: "error"
    });
  ```
  > 或者在compass中的validation中可以直接写条件，校验数据，通过调整action/level参数设置规则属性（可看文档）
    0000000000
- ==2.非手动插入，Node创建Schema时可以设置自动添加的属性==
  ```js
    //  Schema 配置
    const userSchema = new Schema(
      { name: String, age: Number }, // 业务字段
      { timestamps: true } // 开启自动时间戳
    );

    // 不想使用默认名字这样写
    const userSchema = new Schema(
      { name: String },
      {
        timestamps: {
          createdAt: 'createTime', // 自定义「创建时间」字段名
          updatedAt: 'updateTime'  // 自定义「更新时间」字段名
        }
      }
    );
  ```
  > 之后在Node层面插入数据(insertOne/insertMany)，都会自动创建createAt/updateAt字段，默认时间为UTC+0,同时更新数据updateOne，save等操作也会自动更新updateAt字段


## mongoose和mongodb
- 在node中可以用mongodb语法实现简单的链接，进行测试，比如`connect.collection('users')`
- 常规去写的话(express/koa)，比如router-controller-model一条龙，这里的使用第三方库mongoose实现对数据库的链接，mongoose是对原生mongodb的封装，所以语法和使用上有所不同
- Mongoose vs MongoDB 原生 核心查询方法差异总表
  | 功能分类         | 具体功能需求                | MongoDB 官方驱动（Collection 用法）                                                                 | Mongoose（Model 用法）                                                                 | 核心差异点（避坑重点）                                                                 |
  |------------------|-----------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
  | **基础查询**     | 查单条文档（按条件）        | `await AiImages.findOne({ uuid: 'xxx' })`                                                           | `await AiImages.findOne({ uuid: 'xxx' })`                                               | 方法名一致；Mongoose 返回 **Model 实例**（可调用 save()），原生返回 **普通对象**          |
  |                  | 查多条文档                  | `await AiImages.find({ uuid: 'xxx' }).toArray()`                                                    | `await AiImages.find({ uuid: 'xxx' })`                                                 | 原生需手动 `toArray()`；Mongoose 返回 Query 实例，支持链式调用（.sort/.limit）           |
  |                  | 按 ID 查文档                | `const { ObjectId } = require('mongodb'); await AiImages.findOne({ _id: ObjectId('xxx') })`         | `await AiImages.findById('xxx')`                                                       | Mongoose 自动转字符串 ID 为 ObjectId，原生需手动转换                                    |
  | **结果控制**     | 计数（符合条件文档数）      | `await AiImages.countDocuments({ uuid: 'xxx' })`                                                     | `await AiImages.countDocuments({ uuid: 'xxx' })` / `await AiImages.find().countDocuments()` | 方法名一致；Mongoose 支持链式计数，原生需直接传条件                                      |
  |                  | 分页（跳过+限制）           | `await AiImages.find().skip(10).limit(20).toArray()`                                                | `await AiImages.find().skip(10).limit(20)`                                              | 原生需 `toArray()`；Mongoose 链式操作后直接 await 返回结果                              |
  |                  | 排序                        | `await AiImages.find().sort({ createTime: -1 }).toArray()`                                          | `await AiImages.find().sort('-createTime')` / `sort({ createTime: -1 })`                | Mongoose 支持字符串简写（-表降序），原生仅支持对象格式                                   |
  |                  | 投影（只返回指定字段）      | `await AiImages.find({}, { photos: 1, uuid: 1, _id: 0 }).toArray()`                                 | `await AiImages.find().select('photos uuid -_id')`                                      | Mongoose 支持字符串简写（空格分隔，-排除字段），原生需传对象                             |
  |                  | 去重查询（单字段）          | `// 需用聚合实现 await AiImages.aggregate([{ $group: { _id: '$uuid' } }]).toArray()`                | `await AiImages.distinct('uuid', { photos: { $exists: true } })`                        | Mongoose 直接提供 `distinct()` 方法，原生无封装需手动处理                                |
  | **原子操作**     | 查并更新                    | `await AiImages.findOneAndUpdate({ uuid: 'xxx' }, { $push: { photos: 'new' } }, { returnDocument: 'after' })` | `await AiImages.findOneAndUpdate({ uuid: 'xxx' }, { $push: { photos: 'new' } }, { new: true, runValidators: true })` | Mongoose 用 `new: true` 返更新后文档，支持 `runValidators` 校验；原生用 `returnDocument: 'after'` |
  |                  | 查并删除                    | `await AiImages.findOneAndDelete({ uuid: 'xxx' })`                                                   | `await AiImages.findOneAndDelete({ uuid: 'xxx' }, { deleted: true })`                    | Mongoose 默认返删除前文档，原生默认返删除后文档；Mongoose 可通过 `deleted: true` 调整     |
  | **高级查询**     | 聚合查询                    | `await AiImages.aggregate([{ $group: { _id: '$uuid', count: { $size: '$photos' } } }])`             | `await AiImages.aggregate([{ $group: { _id: '$uuid', count: { $size: '$photos' } } }]).model(AiImages)` | 方法名一致；Mongoose 可通过 `.model()` 转为 Model 实例，支持虚拟字段/中间件              |

- 1.find/findOne
  - MongoDB 原生（Collection）
    find() 返回 Cursor 游标，需手动调用 toArray() 或遍历获取结果；
    findOne() 直接返回匹配的「普通对象」（无 Schema 关联）；
    按 ID 查询时，需手动将字符串 ID 转为 ObjectId。
    ```js
      const { ObjectId } = require('mongodb');
      const db = client.db('test');
      const AiImages = db.collection('aiimages');

      // 1. 查多条：必须 toArray()
      const list = await AiImages.find({ uuid: 'xxx' }).sort({ createTime: -1 }).limit(10).toArray();

      // 2. 查单条
      const doc = await AiImages.findOne({ _id: ObjectId('60d21b4667d0d8992e610c85') });

      // 3. 投影（只返回 photos 和 uuid，隐藏 _id）
      const projectedDoc = await AiImages.findOne(
        { uuid: 'xxx' },
        { projection: { photos: 1, uuid: 1, _id: 0 } } // 原生需用 projection 字段
      );
    ```
  - Mongoose（Model）
    find() 返回 Query 实例，支持链式调用（无需手动 toArray ()），最终返回「Model 实例数组」；
    findOne() 返回「Model 实例」（可直接调用 save()、remove() 等方法）；
    按 ID 查询支持 findById('xxx')，自动转换 ObjectId；
    投影支持字符串简写（更简洁）。
    ```js
      // 1. 查多条：链式调用，直接返回实例数组
      const list = await AiImages.find({ uuid: 'xxx' })
        .sort('-createTime') // 简写：-表示降序
        .limit(10)
        .select('photos uuid -_id'); // 投影简写：空格分隔字段，-排除

      // 2. 按 ID 查单条（简化）
      const doc = await AiImages.findById('60d21b4667d0d8992e610c85');

      // 3. 查单条并操作（Model 实例特性）
      if (doc) {
        doc.photos.push('new-url'); // 直接修改实例
        await doc.save(); // 保存修改（原生需单独调用 updateOne）
      }
    ```
- 2.计数：countDocuments ()
  - 差异点：两者方法名一致，但 Mongoose 废弃了旧的 count() 方法（推荐用 countDocuments()）；Mongoose 支持链式计数（先筛选再计数），原生需直接传条件。
  - mongodb
  ```js
    // 统计 uuid 为 xxx 的文档数
    const count = await AiImages.countDocuments({ uuid: 'xxx' });   
  ```
  - mongoose
    ```js
      // 方式1：直接传条件
      const count1 = await AiImages.countDocuments({ uuid: 'xxx' });

      // 方式2：链式计数（先筛选再计数，更灵活）
      const count2 = await AiImages.find({ uuid: 'xxx' }).limit(100).countDocuments();
    ```
- 3.分页查询：skip () + limit ()
  - 核心差异：原生需手动调用 toArray() 取结果；Mongoose 链式调用后直接 await，返回实例数组。
  - MongoDB 原生
    ```js
      // 跳过前 10 条，取 20 条（第 2 页，每页 20 条）
      const pageData = await AiImages.find({})
        .sort({ createTime: -1 })
        .skip(10 * 20) // 跳过前 N 条（页码-1 * 每页条数）
        .limit(20)
        .toArray();
    ```
  - Mongoose
    ```js
      const pageData = await AiImages.find({})
      .sort('-createTime') // 简写降序
      .skip(10 * 20)
      .limit(20)
      .select('uuid photos createTime'); // 只返回需要的字段
    ```
- 4.原子操作：findOneAndUpdate () /findOneAndDelete ()
  - 关键差异：
    返回值控制参数不同：Mongoose 用 new: true 返回更新后文档，原生用 returnDocument: 'after'；
    Mongoose 支持 runValidators: true（触发 Schema 校验），原生无此特性；
    Mongoose 默认返回「更新 / 删除前的文档」，原生默认返回「更新 / 删除后的文档」（需注意兼容）。
  - MongoDB 原生
    ```js
    // 1. 查并更新：返回更新后的文档
    const updatedDoc = await AiImages.findOneAndUpdate(
      { uuid: 'xxx' }, // 条件
      { $push: { photos: 'new-url' } }, // 更新操作（push 数组）
      {
        returnDocument: 'after', // 关键：返回更新后的文档（默认 after）
        projection: { uuid: 1, photos: 1 } // 只返回指定字段
      }
    );

    // 2. 查并删除：返回删除的文档
    const deletedDoc = await AiImages.findOneAndDelete({ uuid: 'xxx' });
    ```
  - Mongoose
    ```js
      // 1. 查并更新：返回更新后的文档（需 new: true）
      const updatedDoc = await AiImages.findOneAndUpdate(
        { uuid: 'xxx' },
        { $push: { photos: 'new-url' } },
        {
          new: true, // 关键：返回更新后的文档（默认 false，返回更新前）
          runValidators: true, // 触发 Schema 校验（如 photos 必须是数组）
          select: 'uuid photos'
        }
      );

      // 2. 查并删除：默认返回删除前的文档（需返回删除后用 deleted: true）
      const deletedDoc = await AiImages.findOneAndDelete(
        { uuid: 'xxx' },
        { deleted: true } // 返回删除后的文档（Mongoose 新增参数）
      );
    ```

- 5.聚合查询：aggregate ()
  - 差异点：方法名一致，但 Mongoose 支持将聚合结果转为 Model 实例（通过 model() 方法）；Mongoose 聚合中可使用 Schema 定义的虚拟字段、中间件，原生不支持。
  - MongoDB
    ```js
      // 统计每个 uuid 对应的照片数量
      const aggResult = await AiImages.aggregate([
        { $group: { _id: '$uuid', photoCount: { $size: '$photos' } } }, // 按 uuid 分组，统计数组长度
        { $sort: { photoCount: -1 } },
        { $limit: 10 }
      ]);
      // 返回：[{ _id: 'uuid1', photoCount: 5 }, ...]（普通对象数组）
    ```
  - Mongoose
    ```js
      const aggResult = await AiImages.aggregate([
        { $group: { _id: '$uuid', photoCount: { $size: '$photos' } } },
        { $sort: { photoCount: -1 } },
        { $limit: 10 }
      ]).model(AiImages); // 可选：将结果转为 Model 实例（需确保字段匹配）

      // 若聚合结果字段和 Schema 一致，可直接调用实例方法
      aggResult.forEach(doc => {
        console.log(doc._id, doc.photoCount);
      });
    ```
- 6.去重查询：distinct ()
  - 差异点：Mongoose 直接提供 distinct() 方法（返回去重后的数组）；原生需手动处理 Cursor 或用聚合，无直接的 distinct() 封装（注：部分版本支持，但推荐统一用聚合）。
  - MongoDB 原生（推荐用聚合）
  ```js
    // 取所有不重复的 uuid
    const uniqueUuids = await AiImages.aggregate([
      { $group: { _id: '$uuid' } },
      { $project: { _id: 0, uuid: '$_id' } }
    ]).toArray().then(res => res.map(item => item.uuid));
  ```
  - mongoose
    ```js
      // 直接调用 distinct()，返回去重后的数组
      const uniqueUuids = await AiImages.distinct('uuid', { photos: { $exists: true } });
      // 第二个参数是条件：只取 photos 字段存在的文档的 uuid
    ```
- 三、核心差异总结（避坑关键）
  - 返回值类型：
    原生：普通对象 / 对象数组（无 Schema 关联，不能直接调用 Model 方法）；
    Mongoose：Model 实例 / 实例数组（可直接调用 save()、remove() 等，自动触发校验）。
  - 参数简化：
    Mongoose 支持字符串简写（排序 sort('-createTime')、投影 select('uuid -_id')）；
    原生需严格传对象格式。
  - ID 处理：
    Mongoose 自动将字符串 ID 转为 ObjectId（findById('xxx')）；
    原生需手动 ObjectId('xxx') 转换。
  - 校验与中间件：
    Mongoose 所有查询 / 更新操作默认触发 Schema 校验、中间件（如 pre('save')）；
    原生无校验，需手动处理数据合法性。
  - 链式调用：
    Mongoose 的 find() 返回 Query 实例，支持无限链式（find().sort().limit().select()）；
    原生的 find() 返回 Cursor，链式方法有限（需最终 toArray() 取结果）。
- 四、实用建议
  - 若用 Mongoose：优先使用其封装方法（findById()、create()、findOneAndUpdate({ new: true })），享受 Schema 校验和便捷性；
  - 若用原生驱动：需手动处理 ObjectId 转换、结果格式化，适合追求极致性能或复杂聚合场景；
  - 避免混用：不要用 Mongoose Model 调用原生 insertOne()、deleteMany() 等方法（会绕过校验，且可能报错）；
  - 查文档时：Mongoose 用 select() 过滤字段，原生用 projection 参数，不要混淆。
