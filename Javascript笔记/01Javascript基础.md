# Javascript基础
## js须知
### 装零散的知识点

>  1.alert("Hello world") // 弹对话框，网页之上
>  2.document.write("Hello world") // 写页面文本     
>  3.==console.log("woooo") // 在检查里的控制台显示，调试用的, 相当于输出printf，**控制台打印字符串类型和数字类型的数据颜色是不同的,数字类型蓝色，字符串黑色**==
>  4.==alt+shift+a 多行注释==
>  5.js位置：外链，内嵌，行内（=css） 在04节课

### 变量命名规则
 
    ```
    规则
    1.只能由英文、数字、下划线、美元符号$组成
    2.区分大小写
    3.不能以数字开头
    4.不能使用关键字和保留字定义变量 例如： var class
    5.不要出现空格

    规范
    1.语义化命名  例如 age email name 或者拼音 zhanghao
    2.驼峰大写分隔多个单词 例如 javascript -> JavaScipt 
    3.不要用中文
    ```
### 断点
- js的断点在浏览器中使用，open in browsers,打开源代码，打上断点，刷新页面，后面同c语言进行步骤调试。

## js基础语法
### var
- 定义的变量： var 名字 = 数据 。 ==（万能，不像c，分int，float，string,boolean等，都可以定义）==

### 数据类型
#### 基本类型和复杂类型
- **简单数据类型--栈**
- ==直接赋值不会连坐，改一个另一个也不会改==
  1.Number 
  支持整形，字符型，2e3（2000，科学计数法），十六进制，八进制，二进制（会转化为十进制）NaN（特殊，也是Number型，意为不是个数字，not a number）
  2.String （字符串 " "）
  3.Boolean  (true/false) 不大写,直接写
  4.Undefined  只声明不赋值的变量，变量就为undefined型数据
  5.Null 
  定义变量想要在未来存储对象类型数据，可以先赋值null，不成文的规定，只给要存对象的变量赋值null，其余的默认undefined
  6.Symbol Es6的，待定。。。。。。。。。
- **复杂数据类型--堆**
- ==直接赋值会连坐，赋值会把相同地址给两个变量，改一个，原来的另一个也会被改==
  1.函数 function FNname(){...}
  2.对象 var obj = {.....}
  3.数组 var array = [.....]
  4.正则表达式
  5.原型prototype
  6.面向对象 var obj1 = new Object("kerwin")
  7.类 (ES6) class

#### 判断数据类型

- 语法 ： typedef + 变量名 ，返回此变量的数据类型（注意：返回的数据为字符串类型）
- 一些代码示例：
  ```
   //判断来自后端数据的类型
    var a = 100
    var str = "100"       // 输出结果
    console.log(typeof a) // number 字符串
    console.log(typeof str) // string 字符串
    console.log(typeof a + 100) //number100 字符串 (100数字类型被同化为字符串类型了)
    console.log(typeof (a + 100)) // number 字符串

    var b
    console.log(b,typeof b) // undefined 字符串
    var c = null
    console.log(c,typeof c) // object 字符串（对象类型数据）
  ```

#### 转换数据类型

1. 转换为字符串类型, ==String(),所有类型都能转换为字符串类型==
   ```
    var a = 100 / true / undefined
    var b = String(a) 
    则 b = '100' / 'true' / 'undefined'
   ```
   方法2 ：==--.toString== ， **区别是不能转化null和undefined型数据**
   ```
    var a // undefined类型数据
    var b = a.toString() XXXX报错
   ```
   `var b = a.toString() // js里比较不同，a在对象与变量之间的转化，学过原型后会懂`

   方法3 ： ==+== , 只要一边为字符串，就都同化为字符串并拼接在一起,只有两边都是数字类型时，才会进行数学运算。
   不改变内容操作如下，加空字符串`var a=100  var b=a+"" `

2. Boolean()转换
   js中，只有'' 0 null undefined NaN 为false，其余为true
   `var a=100  var b=Boolean(a) -> true`

3. **Number(--)** 强制转化为数值类型
   ```
    var a = "abc" // 不是纯数字的统一转化为NaN
    var b = Number(a) // NaN = not a number 
    // 布尔转Number true = 1 false = 0

    // 特殊的转化undefined 与 null 区别如下
    // null(对象) -> 0 
    // undefined -> NaN
   ```
   ==方法2 ：== **parseInt(--)**,非纯数字的会单摘出数字，"abc123" -> 123
   但只能是int整形，舍去小数, "123.45" -> 123
   **parseFloat(--)** 可以找小数，没小数也不补0

   > 1.Number 不用在乎类型，但是格式严格为纯数字才能正常使用
   > 2.parseInt parseFloat 可以从混合字符串中找出数字，根据是否需要小数点使用,有时后端传来字符串"1.25rem"，就用parseFloat()转
   > 3.parse类的也可以直接对数字类型进行转，例如：浮点型转整形

   ==方法3：== 非加号 会做数学运算的，只有-0 /1 *1 值才不会变，
   但布尔的加法可以。
    `var a = "100" var b = a-0`

### 运算符
#### 数学运算符

> 1.如 + - * / %加减乘除 取余，对两侧为数字进行运算
> 2.% 对1000分钟 -> xx小时xx分钟 
  ```
    var a = praseInt(1000/60) // 小时，向下取整 16.88888 -> 16
    var b = 1000%60 //分
    console.log(b+"小时"+c+"分钟")
  ```

> 测试： 1+ "2" * 3 + 4 = 11 先乘，非+，转化为数字类型，6，在正常加法运算 1+6+4 = 11（Number）
> "1" + "2" * 3 + 4 = 164(String)  同理先乘得6，然后加法算，只不过，加法里有字符串， “1” + 6 + 4 -> “16” + 4 -> “164”
> 所以做运算，要时刻注意字符串与数字类型得转化，失之毫厘茶之千里。
#### 赋值运算符

> 如下：+= -= *= /= %= (x%=3 => x=x%3)

#### 比较运算符

> **不同：**==(只看值) ===（看值和数据类型）
> !=、 > 、< 、>=、 <=
> 比较结果返回true 与 false

#### 逻辑运算符

1. && 且 （两边有false即为false，全true为true）
2. || 或 （两边有true即为true，全false为false）
> 在实际应用中，两边一般写的是数学运算符一类的表达式。
> 例如：console.log(category==="家电" && price>= 200)
3. ! 取反 
> 一般只能这么用
> !0 = true; 
> !"" = true; 
> !"123123"= false; 
> !NaN = !null = !undefined = true(1)

> ==1.特殊== !!a => 意为转换为布尔值，本身true和false不变，
> var a = "1111" 
> console.log( Boolean(a) or !!a ) true
> 
> ==2.短路用法==， && 如果前面为假，后面不看了，结果为假
> 同理 || 前面为真，后面也不看了，结果为真
> ==&&的用法==
> 比如一个安全用法，console.log(y && y.toString())
> toString()如果遇到null和undefined会报错，程序停止，如果按上面那样写，y是false，&&会中断程序对后面y.toString()的读取，程序不会终止
> ==||的用法==
> var z = "" // 用户自定义输入，默认为空字符串
> console.log(z || "这个人很懒什么都没有留下")
> 如果用户留言，就为true，||不会执行后半段的代码
> 如果没留言，就为false，会把后面的执行，认定为用户默认的留言标签


#### 自增自减运算符

> ++ -- 
> ++n 先n+1再返回值； n++先返回n再+1；同理--
> 例如：n = 10 则 ++n -> 11 n++ -> 10 (两者返回值)
> console.log(++n) ->11
> console.log(n++) ->10
> 当然在外部运算完后在输出结果是一样的
> ++n or n++
> console.log(n) => 11
> 练习 ： n = 10
> res = ++n + n++ + ++n
> 35 =  11  +  11 +  13
> ++n 先加1返回11，n++先返回值11，后来再加1，但是那是后期，在运算之后，最后++n，先加1返回13（12是n++后期的结果）  
>  
> ==记住++n很勤快，优先+1再返回n，返回的n已经+1了，n++很懒，先不管别的，先返回n的初始值，后期再加1，返回的n没+1,记住再后面的运算n是加过1的。==

#### 三目运算符
> 语法 ： 条件 ？ ture执行 ： false执行
> 可以嵌套,再写一个三目在后面的true或false区

### 分支结构
#### if
  ```
  if(){

  }else{

  }
  ----------------
  if(){

  }else if(){

  }else if(){

  }else{

  }
  -----------------
  if(){

  }
  if(){

  }
  ```
#### switch
  ```
  switch(要判断的变量){
    case: 情况1（判断的变量为情况一时，会执行下面代码）
    执行的代码
    break;
    case: 情况2
    执行的代码
    break;
    case: 情况3
    执行的代码
    break;
    case: 情况4
    执行的代码
    break;
    default:（可省）
    上面都不满足时执行
    break;
  }
  ```
- 代码示例：
>  在业务中，后端会发给前端一些状态码
>  1 未付款 2 已付款 3 已发货 4 已完成
>  前端根据状态码去执行case的语句，执行相应的代码服务用户
>  ==**1.通常会把一些信息（未付款 已付款等）转化为简单数据（1，2，3...） 然后根据简单数据去写case**==
> ==2.也可以对数据进行一些运算来简化数据，例如成绩0-100，这么写==
> score2 = parseInt(score/10) -> 0-10
> switch(score2)...... case 0-10 .... EZ
```

  var code = 1 // 后端给前端的信息存储在code里
  switch(code){
      case 1:
          document.write("未付款")
          break;
      case 2:
          document.write("已付款")
          break;
      case 3:
          document.write("已发货")
          break;
      case 4:
          document.write("已完成")
          break;
      default :
          document.write("出错了")
          break;
  }

  // 注意：
  // 1.不要写 === ，后端传字符串就完了，类型不匹配
  // 2.case尽量不写运算符，最好是直接就是写文本数据（写一些数字，字母，地址等实打实的数据）
  // 3。break看情况省略


  var month = 2
  switch (month) { // 对于多种相同结果的，不写break，增加代码简洁性
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        console.log("31days")
        break
    default:
        console.log("30days")
        break;
  }
```

### 循环分支结构
#### while
> while(条件){ // 别写出无限循环
>     .....      
> }   
> 条件判断——》ture才执行——》执行语句（**一定要对判断条件的变量进行更改，否则无限循环**）——》变量自身改变 ——》在判断条件是否还成立——》.....
#### do while
```
do{
  // 无论条件如何，先执行一次
}while()

```

#### for
  ```
  for(var i = 0; i < 10; i++){
    .......
  }
  执行顺序，i=0--> i<10 --> 执行for语句代码 --> i++ --> i=1 --> i<10(true) --> 执行for语句代码 --> .... --> i=11--> i<10(false) -->跳出for循环 
  ```
#### 循环控制语句 break continue
> break 直接跳出整个循环结构
> continue 跳过此次循环

### 函数
#### 基础知识
- 语法： function fn(){.....}
- 定义函数: 
  ```
    // 1.声明函数function(会预解析)  调用可以放在函数前面
    function test1(){
        console.log("test1")
        var test1_a = 1 
    }
    test1() // 调用

    // 2.赋值函数  调用不可以放在函数前面
    var test2 = function(){
        console.log("test2")
    }
    test2() // 调用
  ```
  > 1.函数有两种定义方法，并且第一种会有预解析功能（与c不同）
  > 2.形参实参与c相同，传参数都不用写类型，特指形参
  > 3.参数数量不同不会直接报错，传少了给默认值，传多了就只截取前面的。
  > 4.return与c相同
#### 预解析 
- js代码分为解析与执行，预解析会先把代码声明的大纲看一遍，具体内容不管,如果没有预解析功能，根据代码执行顺序的原理，调用在定义前面会报错。
- ==可以被的预解析对象==： (预解析只在当前script标签生效,只能提升到当前标签的最前面，不能跨标签)
  1.var定义的变量,==只把变量提到代码最前面去==
  2.声明式定义的函数 function fb(){.....}，==把整个函数提到前面去==
  ```
  console.log(a) // undefined
  var a = 100
  console.log(a) // 100

  fb() // 123
  function fb(){
    console.log("123")
  }
  fb() // 123
  ```
- ==**预解析与函数、变量重名导致BUG的面试题**==
  系统解释预解析提到前面是个什么意思,==多看几遍课加深印象==
  ```
  // 你写的
  var age = 100
  function age(){
    console.log("123")
  }
  console.log(age) // 100

  // 计算机预解析后的逻辑
  // 预解析部分
  var age // var的预解析，只提变量
  function age(){ // 函数预解析，整个提前
    console.log("123")
  }

  age = 100 // var剩余的赋值部分，函数上去了
  console.log(age) // 输出100
  如果你把上一行代码写为age(),就会报错，因为按照逻辑，你已经给age赋值100了，age是一个整形变量而非函数。

  ```
#### 作用域
- 变量生效的范围，分为全局作用域，局部作用域
- 全局作用域：==哪都能用，函数不传参数也能在内部用,跨script标签,跨js文件（要引入的）==，页面关闭才结束，例如script内的var定义的变量、定义的函数等
- 局部作用域：函数内定义的变量，只能在函数内使用（同c），==并且预解析只能提到此函数最上面==

#### 访问规则
- 如果要获取一个变量的值，意为访问
- 规则为：先在自己作用域找，不行返回上一级找，直到全局作用域，都没有就报错,==**如果有重名的，就近原则访问。**==
- 代码示例：
  ```
  <script>
    var num1 = 100
    function fn(){ // 函数1
      var num2 = 200
      function fun(){ // 函数2（内）
        var num3 = 300
        console.log(num3) // fun()有
        console.log(num2) // 上一级fn()有
        console.log(num1) // 上上一级，全局有
        console.log(num) // 没有，报错
      }
      fun()
    }
    fn() // 在外面无法直接跨级调用fun()函数
    </script>
  ```
#### 赋值规则
- 和访问规则一样：先在本作用域找有没有这个变量，有就赋值，没有就返回上一级继续找，直到全局，==唯一不同：如果都没有，把要赋值的变量转化为全局并赋值==

#### 函数(PLUS)
- 1.==函数封装代码 :==
  核心: 提取相同的部分封装为函数,数据改变的部分为参数,用于区分不同
  在js中,许多节点的实现功能很相似,所以把这些功能封装为一个函数,不同节点通过传递参数的不同实现属于自己的效果,减少代码冗余.
  ==**封装函数是不允许用全局变量的,因为你用他也用会混乱的**==
  ==例如 第二阶段的专题九的Day24-03-动画封装 或者是 专题八-Day23-06-08 里面的表单提示success和error都被封装进函数了==
- 2.==函数参数位置==
  设计参数时,尽可能把选填类型的参数放在后面,这样传参时省事,不用都写出来占位


### 对象
#### 基础知识
- 语法: var obj = {......}
  ```
  // 1.基础的创建对象
  var obj = { // 键key ：值value  ~ python
    num : 100,   // 记得逗号分割
    str : "ni hao" 
    // 往后值可以是函数，数组等复杂的东西
  }
  var obj0 = {} // 空对象

  // 2.new创建对象
  var obj1 = new Object() // 创建一个obj1的空对象

  obj1.name = "kerwin" // 往对象添加内容
  obj1.age = 20

  ```

#### 对象的增删改查
- > 1 -> obj.XX  
  > 2 -> obj["XX"] ==别忘了加引号，要不然计算机会以为是变量==
- 增
  ```
  // 1
  var obj = {}
  obj.name = "kerwin" //在对象内自动创建key并赋值
  obj.age = 18
  // 2
  obj["name"] = "kerwin" // + name : "kerwin"
  // name别忘了加引号，要不然计算机会以为是变量
  ```
- 查
  ```
  // 1
  console.log("name:"+obj.name)
  // 2
   console.log(obj["name"])
  ```
- 改
  ```
  // 1
  obj.age = 20 // 覆盖age = 18
  // 2
  obj["age"] = 20
  ```
- 删 
  ```
  // 1
  delete obj.name
  // 2
  delete obj["name"]
  ```

- ==2种方法的区别==：
- 对于不符合key命名规则的需要加引号（key的命名规则和变量一样）
- 那么对于这种key的访问，只能用第二种方式去操作
  ```
  var obj = {
    "a+b" : 120,
    "#abc" : "kerwin"
  }

  console.log(obj."a+b") X
  console.log(obj["a+b"]) V

  ```
#### 对象的遍历 = Python

- 语法：for(var i in obj){......} 很像python
  ```
  for(var i in obj){ // 把obj的key赋给i
      // console.log(i) // 变量i = key
      // console.log(obj[i]) // 获取value，i不要加引号，当作变量i使用
      // 回顾：i加引号就是找的是key为i这个字符的value
      document.write(i+":"+obj[i])
      document.write("<br>")
    }
  ```
#### 不同类型数据的存储---堆和栈
- 简单类型数据存在栈，复杂类型数据存在堆
- 对象obj属于复杂类型，在对对象的赋值时会有所不同,不同对象的堆地址也不同
  ```
   var obj = {
        name : "kerwin",
        age : 100,
        location : "大连"
    }
    var obj2 = {
        name : "kerwin",
        age : 100,
        location : "大连"
    }

    // obj和obj2的数据虽然一样，但是堆地址不同，所以不相等
    console.log(obj == obj2) // false
    console.log(obj === obj2) // false

    ----------------------

    var obj3 = obj // obj的地址赋值给了obj3了
    obj3.name = "tiedachui" 
    // 更改obj3时，顺着地址把堆的数据给改了，等于是把obj也给改了，两个的数据都变了
    console.log(obj,obj3) 

    //那么如何避免赋值两个复杂数据，在更改其中一个数据时“连坐”呢？
    //答案是创建一个新的空的复杂数据(地址不同，互相不影响)，然后把原来的一个个赋值进去

    var obj4 ={}
    for(var i in obj){ // 把obj的key赋给i
      obj4[i] = obj[i] // key(obj4) = value(obj)
      // obj4会自动创建key，并把相应的value赋值给key，参考对象为obj,实现对象赋值且不互相干扰
    }

  ```
#### 可选链操作符（?.）
- 在 JavaScript 中，==可选链操作符 ?. 主要用于安全地访问嵌套对象的属性==。==**当你不确定某个对象是否存在（可能为 null 或 undefined），但又想访问它的某个属性时，使用可选链操作符可以避免出现错误**==
  ```js
      const user = {
           name: 'John',
          // address属性可能不存在
      };
      // 链操作即,如果user.address不存在,则不会执行后面的.street,如果正常执行,会报错(从undefined中取数据)
      const streetName = user.address?.street;
      // 如果user.address不存在，不会报错，直接返回undefined
      console.log(streetName); 
  ```
### 数组
#### 基础知识
- 复杂数据类型
- 语法： var ageArr = [18,20,35,40] (与c不同，c是{})
  **==还可以存对象和函数，把名字放进去即可==**

- 内置构造函数创建数组，Array
  ```
  var arr1 = new Array() // 创建一个空数组
  var arr2 = new Array(10) // 创建一个长度为10的数组
  var arr3 = new Array(1,2,3,4) // 创建一个数组，内容为1，2，3，4
  ```
#### 数组长度与索引修改 = C
- 数组长度： XXX.length
  > var arr1 = [1,2,3,4]
  > console.log(arr1.length) // 4
  > 特殊的，可读可写 arr1.length(2)
  > console.log(arr1) // 1,2
  > 由于只能从前截取，局限大，常用于清空数组，arr1.length(0)

- 根据索引对数组指定位置修改，从0开始，与c一样
  ```
  var arr = [1，2]
  console.log(arr[0],arr[1],arr[2]) // 1 2 undefined（超出索引不会报错）
  arr[30] = 100 // 超出索引的赋值 = 增加新数据进入数组 
  // 跳过的数组自动填充empty
  // 对比如指定插入等功能，这个基础功能太鸡肋，极少用
  ```
#### 数组遍历 = C
  ```js
  var arr = [1,2,3,4,5]
  for(var i = 0; i < arr.length; i++){
    console.log(arr[i])
  }
  ------------------------------
  // 如何对数组赋值，考虑到数组也是复杂数据类型，存储在堆里，解决“连坐”问题，是和对象一样操作方法
  var arr2 = []
   for(var i = 0; i < arr.length; i++){
    arr2[i] = arr[i]
  }
  ```
#### 数组常用的方法
##### 数组的增删和简单排序
  - **修改数组内容**
    ```
      var arr = [1,2,3]

      // .push() 在数组后面追加一个数据
      var res = arr.push("k") // 返回值是数组的长度
      console.log(arr)
      console.log(res)

      // .pop() 删除后面的元素
      var respop = arr.pop() 
      console.log(arr)
      console.log(respop) //返回值是删除的元素

      // .unshift() 前面追加元素
      //返回值是长度
      var resunshift = arr.unshift("tiefig")
      console.log(arr)
      console.log(resunshift)

      // .shift()从前面删除 ，返回值是删除的元素
      var resshift = arr.shift()
      console.log(arr)
      console.log(resshift)

      ---------------------------

      // .reverse() 倒序排序
      var arr2 = [3,1,7,2]
      arr2.reverse()
      console.log(arr2)

      // .sort() 排序
      var arr3 = [11,23,5,17]
      arr3.sort() //它是按位数排序的，就是个位，十位，百位那么排,不是按照数字大小排序

      // 这样写就行，之后解释a-b正序（小到大） b-a倒序
      // 回调函数，在参数里放一个函数
      arr3.sort(function(a,b){
          return a-b
      })

      console.log("sort" + arr3)

      ----------------------------

      //万能splice()

      // .splice() 删除
      // var ressplice = arr.splice(1,2)  // 两个数，前面是删除位置(下标)，后面是删除个数，也就是arr[1]开始删除，删2个,arr[1]和arr[2]
      // console.log(arr,ressplice) // 返回值是删除的元素组成的数组

      // .splice() 增加
      var ressplice = arr.splice(1,2,"kerwin","kkkio") //删完再加，返回操作完的数组 
      var ressplice = arr.splice(1,0,"winner","win") // 不删就加，在arr[1]处不删除，然后把新的元素加到arr[1]前面
      console.log(arr,ressplice) 

    ```
    > **==注意==**
    > 1.增加元素返回数组长度，删除元素返回被删除元素
    > 2.splice增加就返回修改后数组，删除就返回被删除元素组成的数组
  
##### 数组的拼接,截取,转化,寻找等
  - **不修改数组内容**
    ```
    // 1 .concat() 拼接  返回拼接好的数组
    var arr1 = [1,2,3]
    var arr2 = [4,5,6]
    var arr0 = [11,545,663]

    var arr1_2 = arr1.concat(arr2) // 把arr2接到arr1后面
    var arr3 = arr1.concat(arr1_2,7,"keiiek",arr0)
    // 可以多接几个数据，在arr1_2后面拼接了7、"keiiek"、数组arr0所有元素

    console.log(arr1,arr1_2,arr3)

    var arr4 = arr1.concat() // 不拼接数据，一种新的互不影响的复制方式，不“连坐” ，arr4与arr1不是同一个地址
    console.log(arr4,arr1)

    ------------------------

    // 2 .join() 数组转化成字符串
    var arr5 = [11,22,33,44,55]
    document.write(arr5) // 强制数组——>字符串
    document.write(arr5.join("|")) // 数组里数字之间的连接符号为 |

    // 使用join实现后端实时更新前端数据
    var arr6 = []
    for(var i = 0; i < 5; i++){
        arr6.push("<li>"+i+"</li>") 
    // i以后可以是接受来自后端的信息，放入数组,并且都转化为字符串， arr6 = ['<li>0</li>', '<li>1</li>', '<li>2</li>', '<li>3</li>', '<li>4</li>']
    }
    
    document.write(arr6.join("")) // // li标签会生效，但带着逗号进去了不美观，所以再删除连接的逗号

    ----------------------------

    //3 .slice() 截取，但不影响原数组，索引都是以0开头的，返回截取好的数组片段
    var arr7 = ["a","bb","ccc","dfdfdf"]
    var arr8 = arr7.slice(0,2) // 包前0不包后2，截取的索引为0和1
    console.log(arr7,arr8)
    var arr9 = arr7.slice(2) // 从索引2开始到最后
    console.log(arr7,arr9)
    var arr10 = arr7.slice() // 全截取，又一种新的互不影响的复制方式，arr10 = arr7
    console.log(arr7,arr10)

    var arr11 = arr7.slice(2,-1) // -1意为倒着数，数组最后一个元素为-1，以此类推向前-2 -3 ...，包前不包后，这里是截取索引2到索引-1，包前不包后，所以-1（末尾元素）舍去，结果为["ccc"]
    var arr11_2 = arr7.slice(-3) // 直接从末尾截取倒数的三个数(PLUS)

    -----------------------------

    // 4 .indexOf() 查询数组内容有无所需数据,-1就是找不到 ,找到就传输回值的索引
    var arr12 = ["k","j","1"]
    var res = arr12.indexOf("jdshlfhwf") // 没有匹配的，-1
    var res2 = arr12.indexOf("1") // “1”在数组里的索引为2

    // 缺点 ：如果有重复的，只能查到第一个
    console.log(arr12.indexOf("k",1)) // 1代表从索引1处开始往后查, -1

    // 5 .lastindexOf() 从后往前找 ，其他的同上
    console.log(arr12.lastindexOf("k",2)) // 2代表从索引2处开始往前查, 索引为0

    ```
    > **==注意==**
    > 1.concat()和slice()都有数组赋值的简便方法，一个是啥也不拼接，一个是截取整个数组
    > 2.join转化字符串再后面很有用，主要是接受后端实时数据，然后依靠标签自动填充页面，起到页面实时更新的状态，li标签实时更新常用于热搜、人们视频推荐、排行榜、新闻榜等页面的刷新
    > 3.(last)indexof是一次性的，只能查到第一个符合条件的，再有重复需重新调用

##### 数组的操作方法(回调函数)
  - **回调函数，参数为函数的常用方法**
    > 这里的函数我们只定义并没有调用，但是系统会自动调用它们，所以别名为回调函数，回过头来就调用你，回调函数是解决异步的好方法，后面会学。
    > ==格式均为 ： **.方法名( function(参数){.....} )**==
    > ==传入的参数有 ： item（数组的每个元素） index（数组索引） 数组名（会打印整个数组） prev(上次return的结果)== 
    ```
      // 1 .forEach() 遍历数组每个元素
      var arr = [1111,2222,3333,4444]
      arr.forEach(function(item,index,arr){
          console.log(item,index,arr) // 分别对应里面每一项的元素和索引数以及整个数组(使用自己数组的名字)
      })

      ----------------------------------

      // 2 .map() 映射 
      var arr2 = [1,2,3,4,5]
      arr3 = arr2.map(function(item){ // 映射操作为，首先把arr2里面的每一项元素拿过来放入函数运算，再一个个地返回给数组对应元素去修改它
          return item*item // 返回其平方
          })
      console.log(arr3)
      
      // .join() PLUS 改进
      var arr4 = ["xiao","bai","giil"]
      var arr5 = arr4.map(function(item){
          return "<li>"+ item + "</li>"
      })
      console.log(arr5)
      document.write(arr5.join("")) // 删除数组元素间链接符逗号
      
      -----------------------------------

      // 3 .filter() 过滤
      var arr6 = [102,200,142]
      var arr7 = arr6.filter(function(item){
          return item >= 200
      })
      console.log(arr7) //200

      var arr8 = [ // 数组里面放对象
          {
              name : "aaa",
              price : 100
          },
          {
              name : "bbb",
              price : 200
          },
          {
              name : "ccc",
              price : 300
          }
      ]
      var arr9 = arr8.filter(function(item){ // 每个对象为数组的一个元素
          return item.price >= 200 // 对象的属性price >= 200
      })
      console.log(arr9) // 打印 后两个对象

      ---------------------------------
      // 检查整体数据是否合格

      // 4 .every() 返回布尔值，每一个都满足才返回true，否则false
      var arr10 = [80,90,92,94]
      var arr11 = arr10.every(function(item){
          return item >= 90 
      })
      console.log(arr11) // false 

      // 5 .some() 同上 ，但是条件上很宽松，只要元素中一个满足条件，就为true，否则false

      ----------------------------------

      // 6 .find() 不如 .fliter()
      var arr12 = [
          {
              name : "chinese",
              grade : 90
          },
          {
              name : "math",
              grade : 95
          },
          {
              name : "english",
              grade : 100
          }
      ] 
      
      var arr13 = arr12.filter(function(item){
          return item.grade === 100
      })
      console.log(arr13) // 遍历整个数组，把所有符合条件的元素放入数组中一起返回
      var arr14 = arr12.find(function(item){
          return item.grade === 100
      })
      console.log(arr14) // 返回数组里的元素，且只能找到符合条件的第一个元素，有重复很鸡肋

      ------------------------------------

      // 7 .reduce() 叠加
      var ar = [1,2,3,4,5]
      ar1 = ar.reduce(function(prev,item){
          return prev+item  // prev 上次的结果（return返回的） item是每个元素
      },0) // 第一个参数是回调函数，第二个参数0是初始值（累加操作，初始值为0 + ...）
      ar2 = ar.reduce(function(prev,item){
          return prev+item
      },"")  // 转化成字符串了
      console.log(ar1) // 0+1+2+3+4+5 = 15(Number)
      console.log(ar2) // 12345（String）
      
    ```

    > ==**注意**==
    > 1.map()可以对join()实时更新前端页面的代码进行简化
    > 2.因为find()只能用一次，虽同为过滤作用，但效果远不如filter好

#### 数组去重（复习课）
- ==新东西 ：new set 构造的一种类型为set结构，特点是内部不能有重复==
- 代码：
  ```js
    // 1 51的复习
    var arr = [1,2,2,1,3,4,3,4,4,5,6]
    var arr2 = []
    for(var i = 0; i < arr.length; i++){
        if(arr2.indexOf(arr[i]) === -1){ // 查不到重复时再加
            arr2.push(arr[i])
        }
    }
    console.log(arr,arr2) //两个数组还相互不影响

    --------------------------

    // 2 利用对象 利用相同对象覆盖的原理，可以把重复的key同化
    // 数组的内容当作key去赋值，之后只提取key
    var obj = {} // 空对象
    for(var i = 0; i < arr.length; i++){
        obj[arr[i]] = "" // 对象赋值，key = value（全是""），对象的key对应着数组的数据（并且把重复的同化），而每个key的value都是""
    }
    //删除""
    var arr3 = [] // 新数组
    for(var i in obj){ // 前面学的，i在这检索的是对象的key值
        arr3.push(Number(i)) // 只打印key,这里承接obj的i是字符串类型，强制转化成数字类型
    }
    console.log(arr,arr3)

    ---------------------------

    // 3 最好用的（后面学,ES6的知识），new Set 一个不允许有重复
    var set1 = new Set(arr)
    console.log(set1) // 变为Set结构
    var arr4 = Array.from(set1) // 把set结构转化为数组Array结构
    console.log(arr4)

  ```

### 字符串基本操作
#### 字符串基本知识
- ==创造字符串有2种方法，基本类型String，存在栈区,所以字符串直接赋值，不用在乎地址连坐问题==
- ==字面量==：`var str = "hello" `
- ==构造函数==：`var str = new String("hellow) `
- **获取长度**: `console.log(str.length) ` 只读不写，不能通过改变长度来减少字符串长度。
- **索引获取单个字符**: `console.log(str[0]) // str[0] = "h" `只读不写,不能定向修改单个字符
- **字符串的遍历**: 
  ```
    for(var i = 0; i < str.length; i++){
      console.log(i,str[i])
    }
  ```
- 练习：字符串查重统计  
  ```
    var str = "abcabcab"
    var obj = {}    // 统计完存在对象里,key是字符，对应的value是出现次数
    for(var i=0; i<str.length; i++){
      var key = str[i]
      if(obj[key] === undefined){ //如果obj没有这个key，会自动创建一个key = str[0]("a") // 以0为例子
          obj[key] = 1 // value = 1
      }else{
          obj[key]++ // 如果obj已经有这个字符了，value数量+1
      }    
    }
    // 遍历obj对象（查看统计数据）
    for(i in obj){ // key: value
    console.log(i + ": " +obj[i])  // {a: 3,b: 3,c: 2}
    }
  ```

#### 字符串常用方法

- 代码示例：
  ```
    // 1.charAt 返回索引对应的字符
    var str = "kerwin"
    var str1 = str.charAt(1) // e
    console.log(str,str1)

    // 2.charCodeAt 返回索引对应字符的ASCLL码（只针对英文） unicode万国码（别的各种语言）UTF-8就是这个意思，现在计算机就用这个码
    // 2.2 fromCharCode()是String的一个方法，作用是方向转化，ASCII变成字符
    var str0 = str.charCodeAt(1) // e的ASCII码
    var arr = [] 
    for(var i = 65; i < 91; i++){
        arr.push(String.fromCharCode(i)) // 把i的ASCLL(65-91)转化成字符输入进(push)str对象中去
    }
    console.log(arr)

    // 3.toUpperCase toLowerCase 分别转化成大写的和小写的
    var str2 = "heHHllo"
    var str3 = str2.toUpperCase()
    var str4 = str2.toLowerCase()
    console.log(str3)
    console.log(str4)

    // 4.截取 substr(开始索引，截取长度) | substring(开始索引，结束索引) === slice(和substring几乎完全相同,就是能写负数)
    var sr = "kerwin"
    var sr1 = sr.substr(0,2)

    var sr2 = sr.substring(0,2) //包前不包后
    var sr3 = sr.substring(1) // 从索引1开始到结束

    var sr4 = sr.slice(0,2) //包前不包后
    var sr5 = sr.slice(1) // 从索引1开始到结束
    console.log(sr1,sr2,sr3,sr4,sr5)
    //首字母大写
    console.log(sr.substr(0,1).toUpperCase() + sr.substring(1))
    
    // 5.replace 替换 （比如游戏公平不文明用语转化为*）
    var ssr = "avsfaaavvd"
    var ssr1 = ssr.replace("a","*") // 缺点：只替换遇到的第一个a为* 
    console.log(ssr1)

    // 6.split 分割 把字符串按分隔符转化成数组
    // join 把数组转化为字符串，可以自定义字符串的分隔符
    var ssr2 = "ab|c|de"
    console.log(ssr2.split("|")) //在字符串中以|分割标志，分割成数组

    // 7.indexOf lastIndexOf 寻找所需的字符，返回索引位置，查不到返回-1，分为前面找，后面找，只能找一次
    // 和数组的常用方法里的查找一样
    var ssr3 = "abcd"
    console.log(ssr3.indexOf("b"))  
    console.log(ssr3.indexOf("b",1)) //从索引1处开始检索

    // 8.concat 连接字符串 也可以用+  和数组一样
    var ssr4 = "sfdsk"
    var ssr5 = ssr4.concat("DDD")
    var ssr6 = ssr4 + "FFF"

    // 7. trim() 去掉首尾空格 空格个数不影响
    //trimStart() = trimLeft()去首
    //trimEnd() = trimRight() 去尾

    var ssr7 = "      hello world!!!! "
    console.log("|" + ssr7.trim() + "|")

  ```
  > 注意：1.字符串操作里的里面的indexOf与lastIndexOf以及concat与数组使用方法没区别，并且一般字符串拼接我们习惯用 ‘+’
  > 2.截取有substr和substring，后者和slice功能几乎一样，就是不能写负数
  > 3.split与join拥有相反的功能，再数组与字符串之间转化

#### 字符串模糊插叙（练习课）
- 
  ```
  <script>
        // 模糊匹配，输入一个字符，匹配带有这个字符的字符串
        var arr = ["aaa","abb","bcc","bcb","ddd","ccd"]

        // 针对数组的filter过滤， 针对字符的indexOf过滤
        // prompt 指示浏览器显示一个对话框，其中有一个可选的信息，提示用户输入一些文本，并等待用户提交文本或取消对话框
        var input = prompt("请输入想要查询的内容")
        // 回调函数
        var res = arr.filter(function(item){ //过滤数组，传入数组的每个元素值
            return item.indexOf(input)>-1 // >-1代表数组中检索到字符串，没找到返回-1
        })
        console.log(res)
    </script>
  ```
#### json字符串 <---> 对象
- 格式：`var str = '{"name":"kerwin","age":100}' `
- > ==**目前这个json字符串还是String类型，需要自己转化为对象**
  > 后端各种编译器传给前端的信息五花八门，为了统一格式，前后端的互相交流都用json字符串的形式进行交流，然后再自己转为对应语言的对象形式==
- json -> 对象：` var obj = JSON.parse(str) // parse意为解析 `
  > ==注意： js正常创建对象时，key不需要加"",**但是JSON里面key必须加双引号，而且逗号也不能多，格式很严格**==
- 对象 -> json： 
  ```
  var obj1 = {name : "hihi"} // key可以不加""
  var str1 = JSON.stringify(obj1)
  ```



## js内置对象
### 日期对象Date
#### 基础知识
- 时间对象是js的一个特殊构造函数，用来计算时间的，==起始时间为1970.1.1 0:00:00==
- 语法： ` var date = new Date() ` 
- 传递不同参数代表不同意思
  ```
    var date = new Date()
    console.log(date) // 在控制台上自动转化成所在时区的时间（字符串型）,而日期对象本身不是字符串类型

    // 1个传参 毫秒数  1970.1.1 0:00:00开始
    var date1 = new Date(1000) + 1000ms = 1s 
    没啥用，就是在基础时间上加毫秒数和时区数
    console.log(date1)

    // 多个参数 年，月（0-11 = 1月-12月） ， 小时 ，分钟 ， 秒
    var date2 = new Date(2023,10,10,10,10,10)
    console.log(date2)

    // 字符串 遵循两种格式
    var date3 = new Date("2023-10-1 6:00")
    //var date3 = new Date("2023/10/1 6:00")
    console.log(date3)

  ```
  > 注意：==月份是从0开始记录为1月==
  > ==**时间对象是一个对象，但是特殊，直接俄打印出来会转化为字符串形式，我们下一节会通过时间对象的调用来进一步学习**==
  > 应用于外卖，优惠倒计时等，由后端传输Date参数，前端显示

#### 日期对象的常用方法
- 代码：
  ```
    var date = new Date()

    // 以下都是获取date这个对象的方法

    // 1.获取的是当前时间，get...
    // gatFullYear() 获取年
    console.log(date.getFullYear())

    // getMonth() 0-11代表1到12月 +1变正常人思维
    console.log(date.getMonth() + 1)

    // getDate() 日
    console.log(date.getDate())

    // getDay() 周日 0 周一至周六 1-6
    console.log(date.getDay())

    // getHours() getMinutes() getSeconds() getMilliseconds()获取小时，分钟，秒 毫秒

    --------------------------------

    
    // 2.设置更改 set.....
    // setFullyear() setMonth() setDate() 自动获取周
    // 没有setDay() 不能设置周几
    // setHours() setMinutes() setSeconds() 

    --------------------------------

    // getTime()  时间戳 距离1970初始时间的毫秒数
    // 一般后端获取时间戳来发给前端，前端把毫秒参数加进去就能实时显示
    console.log(date.getTime())
    // console.log(new Date(1698020479915)) // 加回来,里面的数一般从后端传进来

    // setTime() 设置时间戳，目的是保留之前的时间，覆盖当前时间戳,比如记录你下单的时间

  ```
  > 注意： 1.data是个对象，所以能调用这么多方法
  > 2.主要分为三个板块 get获取 set设置 时间戳（很重要） 
  > 3.仔细看好 关于日：Date 关于周：Day(0 = 周日 1-6 周一至周六)
  > 4.set不能设置周几，只能设置日期（自动转化为周几）
### 数字对象
- ==一般用于计算购物车或日期以及js动画效果，针对的是数学运算,常用的对象Math==
- 代码：
  ```
    // 1.toFixed（x） 取x位小数点，不够补零，返回值是字符串类型
    var price = 142.34567
    // 因为返回字符串，所以加100只是拼接上罢了，并没有做数学运算
    var sum = (Number)(price.toFixed(2)) + 100 
    // 使用非加法化String型为Number型
    var sum1 = price.toFixed(2) - 0 + 100 
    
    console.log(sum,sum1)

    -------------------------------------------

    // 2.Math是一个对象，包含许多的数学方法
    // 以下的方法均需要调用Math,即 Math.XXX
    
    // 3.random 随机数字 0-1
    console.log(Math.random())

    // 4.round 四舍五入，取整
    console.log(Math.round(4.56))
    console.log(Math.round(4.46))

    // 5.ceil floor 向上取整 向下取整
    console.log(Math.ceil(3.01))  // 4
    console.log(Math.floor(4.99)) // 4 

    // 6.abs 绝对值
    console.log(Math.abs(-100))

    // 7.sqrt 平方根
    console.log(Math.sqrt(2))

    // 8.pow(2,3) = 2^3 2的3次幂
    console.log(Math.pow(2,3))

    // 9.max
    console.log(Math.max(11,3,45,34,6,10)) 

    // 10.min 
    console.log(Math.min(11,3,45,34,6,10)) 

    // 11.PI = 3.1415......
    console.log(Math.PI)
  ```


### 定时器
#### 倒计时定时器和间隔定时器
- 代码：
  ```
    // 绑定按钮
    <button id = "btn1">清除延时定时器</button> 
    <!-- 设置按钮，一会绑定定时器 -->
    <button id = "btn2">清除间隔定时器</button>

    <script>
    // // 1.setTimeout() 倒计时定时器 只执行1次
    // setTimeout(function(){
    //     console.log("kiko")
    // },3000) // 注册了一个定时器,2个参数是回调函数和延迟时间(ms)

    // // 2.setInterval() 间隔定时器，每到间隔时间就执行一次函数
    // setInterval(function(){
    //     console.log(new Date())
    // },1000) //ms

    // 为了不影响下面代码的执行，我们把上方代码注释掉
    // --------------------------------------

    // 2.定时器的返回值
    var time1 = setTimeout(function(){
        console.log("kiko")
    },3000)

    var time2 = setInterval(function(){
        console.log(new Date())
    },1000)

    console.log(time1,time2) // 返回值是定义的定时器的顺序 1 2

    // 3.清除定时器 clearTimeout()
    // clearTimeout(time1) 
    // clearInterval(time2)

    // 3.2通过点击按钮清除定时器 
    // 绑定 通过id拿到按钮对象,绑定onclick点击属性
    btn1.onclick = function(){
        console.log("btn1 click") // 点击按钮出发函数内事件
        clearTimeout(time1)
    }
    btn2.onclick = function(){
        console.log("btn2 click") // 点击按钮出发函数内事件
        clearTimeout(time2)
    }

    // 同步执行 > 异步执行

    console.log("213")   //同步
    var time1 = setTimeout(function(){
        console.log("ko000ok") // 异步
    },0)
    console.log("wfwfw") //同步
    
    // 执行顺序不变，123 -> setTimeout（）-> wfwfwf -> ko000ok，但是在SetTimeout是异步执行（里面会过一会执行），异步的就是要等待同步都执行完了在执行，即使延迟为0秒，同步执行不完异步不会执行！
    // 现在就学了setTimeout 和 setInterval 两个异步函数
    // 后面会更加精细地学同步和异步
    </script>
  ```
  > ==注意==：1.新东西：同步与异步，两个定时器就是异步函数
  > 2.按钮的绑定事件（后面会学），清除定时器

#### 计时器案例（复习加运用）
- 代码:
  ```
  <script>
      
    var targetDate = new Date("2024/7/26")

    function diffTime(current,target){
      // 时间对象相减会自动转化为毫秒差
      var sub = Math.ceil((target - current) / 1000) // ms -> s 秒数向上取整,保证秒是整数
      console.log(sub)
      // 使用数学方法来计算天数，小时数，分钟数，秒数
      var day = parseInt(sub/(60*60*24)) // 转换数据类型，把浮点数转化为整形，所以只保留整数，总秒数除一天的秒数 = 天数
      console.log(day)
      var hours = parseInt(sub%(60*60*24)/(60*60)) // 以天数取余，剩下的秒数在转化为小时单位
      console.log(hours)
      var minutes = parseInt(sub%(60*60)/60) // 以小时为单位取余，剩下的秒数转化为分钟单位
      console.log(minutes)
      var seconds = sub%60 // 以分钟为单位取余，剩下的为秒
      console.log(seconds)


      var obj = { // 存放数据
          day : day,
          hours : hours,
          minutes : minutes,
          seconds : seconds
      }

      return obj // 返回对象及信息
    }
  
    // 利用间隔定时器来实时显示时间的变化
    setInterval(function(){
      var currentDate = new Date() // 现在的时间是变化的，所以每一秒要重新获取一次,并用函数diffTime重新计算
      // 调用函数，res接受对象的信息
      var res = diffTime(currentDate,targetDate)
      // BOM的东西,通过id获取div元素,这里的box是id名,在js中这个box已经不是HTML的一个标签了,他是一个对象,调用这个对象的innerHTML方法可以实时更新div内部的内容,和之前调用对象的onclick删除定时器是一个道理.
      box.innerHTML = `距离暑假（大概）还有${res.day}天${res.hours}小时${res.minutes}分钟${res.seconds}秒`
    },1000) // 1s

    </script>

  ```

