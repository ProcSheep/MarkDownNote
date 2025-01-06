# js笔记
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
  ```
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
  ```
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
#### 模板字符串（ES6）
- 学了2个：换行代码与js代码嵌入字符串
- 代码：
  ```
    // 1.换行使用,格式好看(tab上面的键)
    var myhtml = `<li>1111</li>
                  <li>2222</li>
                  <li>3333</li>`
    // 2.不再拼接变量与字符串了，直接嵌入
    myname = "kerwin" // 承接后端传进来的数据的变量
    var str = `My name is ${myname} ${10+20} ${(10>20)?'aaa':'bbb'}` 
    // ${可以放入变量myname} and ${里面所有东西遵循js语法}
    // S{}执行完后，结果加入到字符串中
    document.write(str)

    // 应用
    var arr = ["xixiix","sindhw","dkfgewb"]
    var arr2 = arr.map(function(item){
      // return "<li>" + item + "</li>" // 拼接写法 X
      return `<li>${item}</li>` //简便写法,字符串模板  
    })
    document.write(arr2.join(""))
  ```
  > 功能：1美化了代码，2简化了代码复杂度（拼接->嵌入）
### 字符串与数值扩展
- indcludes函数
- 判断字符串内部是否含有相关字符,返回布尔类型

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


## BOM(浏览器对象模型)
### 介绍
- 
  ```
    BOM : 浏览器对象模型
    操作浏览器的一些能力
    我们可以操作的内容： 
    1.可以获取浏览器的相关信息（窗口大小，版本信息）
    2.页面跳转
    3.获取浏览器的地址栏信息
    4.操作浏览器滚动条
    5.浏览器弹出框(alert,confirm,prompt)
    .......

    BOM核心是window对象
    window是浏览器的内置对象,内部含有操作浏览器的方法
    例如:我们学的清除定时器方法就是window对象里面众多内置方法的一个
    格式为: 对象.属性(window.innnerHeight....) window可以省略不写,直接用他的属性

  ```
### 浏览器可视窗口尺寸

- 获取窗口尺寸,窗口是网页内容区域,不包括上面的地址栏等,再比如当弹出检查菜单时,也会对应缩小,==**但是包含滚动条**==
- 
  ```
    console.log(window.innerHeight,window.innerWidth) // 获取高度和宽度 
    console.log(innerHeight,innerWidth) // 简写
  ```

### 浏览器弹出层

- 代码:(主要是测试效果使用,实战中使用不多)
  ```
    // alert 提示框
    alert("123") // 直接提示
    btn.onclick = function(){
        alert("44567")
    }

    // confirm 询问框
    btn.onclick = function(){
        var res = confirm("你确定删除吗?") // 在询问框中由确定和取消,用户点击完后会对应的返回true或false
        console.log(res) // res接受用户反馈
    }

    // prompt 输入框 
    btn.onclick = function(){
        var res = prompt("请输入你的用户名") // res接收输入的信息(String型)
        console.log(res) 
    }

  ```
  > 注意:==因为js是单线程的,所以里面的绑定了onclick后,如果不点击就不会继续向下执行代码==

### 浏览器的地址信息(当前页跳转)
- 获取或改变当前浏览器页面的地址
- 地址:
  ```
  <button id = "btn">前往下一个百度</button>
  <button id = "btn2">刷新</button>

  <script>
      console.log(location.href) // 拿地址
      btn.onclick = function(){ // 点击后改变浏览器的地址,跳转到百度
          location.href = "http://www.baidu.com"
      }
      btn2.onclick = function(){ 
          location.reload() // 刷新功能
      }
  </script>

  ```
### 浏览器打开标签页(新的页面跳转)

- ==location.href 只能在当前页面跳转,而window.open("") 在新的标签页面打开网页,还有个close()是关掉网页.==
- 代码:
  ```
  <body>
    <button id = "btn">click</button>
    <button id = "btn2">close</button>

    <script>
      // 
      // 
      btn.onclick = function(){ 
          open("http://www.baidu.com") // window省略了
      }
      //window.close() 关掉自己
      btn2.onclick = function(){ 
          close()
      }
    </script>

  </body>
  ```
### 浏览器历史记录(浏览网页前进和回退)
- pc端因为有按钮了,所以特别在移动端上,我们点开网页后,想要回退到上一页,有时用手势,有时有按钮,进行回退
- 学习 history.forward() and history.back() = history.go()
- 代码:
  ```
  ----------首页------------
  <body>
    这里是首页
    <button id="btn">02html</button>
    <button id="btn2">前进</button>

    <script>
      btn.onclick = function(){
      location.href="73.html" // 点击后当前页面跳转到73.html
          
      }
      // window.history
      btn2.onclick = function(){
        //history.forward() // 只有在第一次跳过后,浏览器留下记录,才能使用
        history.go(1) // 和上面一样，前进一步，负数就是返回，数字代表去多远  
      }
    </script>
  </body>
  ---------跳转页------------
  <body>
    这里是html02的页面
    <button id="btn1">history.back()</button>
    <script>
      // 跳回上一个页面
      btn1.onclick = function(){
          //history.back() // 回去
          history.go(-1)
      }
      console.log(window.location.href)
    </script>
  </body>

  ```
 > 注意:浏览器只有在第一次跳转页面后,浏览器留下记录,才能使用history.forward()/history.back()/history.go()快速跳转

### 浏览器的常见事件

- 三个onload onresize onscroll

- 代码:
  ```
    CSS:
    <style>
        *{
            margin: 0;
            padding: 0 ;
        }
        body,html{
            height: 2000px;
        }
    </style> 
    ----------------------------------
    JS:
    <script>
    // 本节课学的都是给window挂的事件
    // 1. window 对象的一个属性 onload
    window.onload = function(){
      // 当页面所有资源加载完成后，执行此函数
      console.log("加载完成")
      console.log(btn) 
      // 这里我们把js代码放在了body前面,根据代码运行逻辑从前往后,如果不添加onload函数,就会出现在未定义btn的前提下去打印btn,会报错的.

      // 2. onresize
      window.onresize = function(){
          console.log("resize") // 改变窗口大小时和手机横屏竖屏时执行，CSS中的响应式布局
      }

      // 3. onscroll
      window.onscroll = function(){
          console.log("scroll") // 页面滚动时执行
      }
    }
    </script>

    ---------------------------------------------
    HTML:
    <body>
        <button id = "btn">click</button>
    </body>
  ```
### 浏览器页面的滚动距离 
- 纵向滚动距离图(横向同理):[![pkBTDqx.png](https://s21.ax1x.com/2024/06/20/pkBTDqx.png)](https://imgse.com/i/pkBTDqx)
- 这个代码模拟了网页的功能,当我们京东购物时,往下划到一定距离时会出现返回顶部的标志,我们点击就会回到页面顶部
- 实现: ==1. 新学习了ducument.documentElement.scrollTop,document.documentElement.scrollLeft以及它们的兼容性写法,用于获取页面的滑动距离
  2. 当距离合适时,点击按钮,新学习的scrollTo()可以把页面带划动到指定位置==
  > ==**注意**==: 1.ducument.documentElement.scrollTop,document.documentElement.scrollLeft也是window对象的属性,只是省略了
  > 2.再强调, window.onscroll = function(){...}意为滚动时执行函数,在函数内部具体些滚动到何种程度执行函数
- 代码:
  ```
  <style>
    *{
        margin: 0;
        padding: 0 ;
    }
    body{
        height: 3000px;
        width: 3000px;
    }
    </style>

  <body>
    <div style="height: 300px; width: 100px;"></div>
    <button id = "btn">回到顶部</button>

    <script>
      // 获取纵向与横向滚动距离px
      window.onscroll = function(){ // 滚动条运动时执行函数
          console.log(document.documentElement.scrollTop || document.body.scrollTop) // 动态显示纵向滚动的长度, || 兼容新老版本
      
          console.log(document.documentElement.scrollLeft || document.body.scrollLeft) // 动态显示横向滚动的长度, || 兼容新老版本
      }

      window.onscroll = function(){ // 滚动条运动时执行函数
          console.log(document.documentElement.scrollTop || document.body.scrollTop)
          if((document.documentElement.scrollTop || document.body.scrollTop) > 100){ // 当纵向滚动距离大于100px时执行
              console.log("显示回到顶部按钮")
          } else{
              console.log("隐藏回到顶部的按钮")
          }
      }
        
      // btn绑定一个点击事件
      btn.onclick = function(){
          // 1.普通写法 
          // scrollTO(0,0) //滚动到页面指定位置(x,y) top left 
          // 2.对象写法
          scrollTo({
              left :0,
              top:0
          })
      }
    </script>
    
  </body>
  ```
### 浏览器的本地存储
- 例如我们在登录QQ时,点击记录用户名,我们再登陆时,会发现用户名和密码自动填充好了,密码数据存在了本地(也会同步存储在网站腾讯的数据库里)
- ==在这里我们学的是存在本地,只针对使用的这个电脑,暂时不涉及服务器端的数据库,在别的电脑上是看不到的==
- 打开检查-应用程序-本地存储/会话(临时)存储,即可查看
- 本地存储localStorage  = 永久存储 || 会话存储sessionStorage = 临时存储,关闭浏览器就会丢失存储的信息,下面的代码以本地存储为例子,两者方法一样
- 代码:
  ```
  <body>
    <button id="btn1">setItem in localStorage</button>
    <button id="btn2">getItem</button>
    <button id="btn3">removeItem</button>
    <button id="btn4">clear all</button>
  </body>

  <!-- localStorage 永久存储  -->
  <script>
    btn1.onclick = function(){
        // 省略window , storage意为存储
        localStorage.setItem("name","kerwin") // key , value   存,只能存字符串,其他的会强行转化成字符串
        localStorage.setItem("obj",JSON.stringify({name:"ssser",age:100})) // 存对象,转化成JSON字符串,否则会强制转化为字符串"Object"
        // key = obj value = {name:"ssser",age:100}  
    }
    btn2.onclick = function(){
        console.log(localStorage.getItem("name")) // 根据key取出value值并打印在控制台
        console.log(JSON.parse(localStorage.getItem("obj"))) // 首先获取obj的value(String),再用json把字符串转化回对象(Object)
    }
    btn3.onclick = function(){
        localStorage.removeItem("name") // 删除
    }
    btn4.onclick = function(){
        localStorage.clear() // 全删除
    }
  </script>

  ```
  > ==**注意**==: 1.本地存储和临时存储的方法一样,但是记得前缀不一样, (localStorage / sessionStorage)
  > 2.setItem存储只能存储字符串类型,分为key和value(都要加双引号)
  > 3.getItem获取存储信息,输入key值找value(记得加双引号)
  > 4.存储对象时要注意转化为JSON格式,获取对象时要从JSON格式转化回对象

### 记住户名名(存储复习课)
- 简单功能:输入用户名和密码,然后点击登录,之后将信息存储在本地,下次登录自动填充信息
- 代码:
  ```
    <body>
      <div>
          用户名：
          <input type="text" id="username">
      </div>
      <div>
          密码：
          <input type="password" id="password">
      </div>
      <div>
          <button id="login">登录</button>
      </div>
    </body>
      
    <script>
      // 前提知识
      console.log(username) // 通过id获取标签并打印(这是个对象)
      console.log(username.value) // 打印对象的value属性值(登录框输入的信息)

      // 1.点击登录按钮存储key和value
      login.onclick = function(){ 
          localStorage.setItem("username",username.value)  
          localStorage.setItem("password",password.value)
      }

      // 2.从本地获取用户名和密码(根据key获取value),存在变量中
      var uservalue = localStorage.getItem("username")
      var passvalue = localStorage.getItem("password")

      // 3.对输入框赋值,输入本地存储的信息
      username.value = uservalue 
      password.value = passvalue

      // 这一步可以简化,即使为null,输入进登录框也是啥都没有(只针对这个功能,具体情况集体分析)
      // if(uservalue && passvalue){ // 两个value都不为null时，把值写入登录框(下次登录会自动执行填充信息)
      //     username.value = uservalue // 可写
      //     password.value = passvalue
      // }
          
    </script>
  ```
## DOM(文档对象模型)
### 基础知识(+PLUS)
- ==**操作html中标签的能力,DOM的核心是document对象,document对象是浏览器内置对象,里面存储着操作元素的方法,页面中的标签,我们通过js获取后,这个对象就是DOM对象,所以我们一般称之为DOM树结构,主干是document,分支里是html,body这种标签,body里面又有div,img等标签,依次向外扩展.**==,例如创建,获取,删除,添加元素,给标签绑定事件,获取元素属性,添加css样式等.
- ==**PLUS**==
- ==1.dom对象的补充==
- ==**dom对象有其他功能(添加事件,获取信息等),但是dom对象本质还是对象,且存储方式和普通对象一样**,所以有时候我们可以用dom对象来存储一些局部变量无法保存的值==,具体详见 第二阶段-专题九-Day24-04动画目标点中的清除定时器,在那里dom对象用于记录上次开启的定时器,用来清除
### DOM前情提要(很重要)
- ==**下一节我们会学习获取元素的方式,但是在后面的很多节课里我们通常为了省事,会把元素标签用id设置,然后在js中直接用id名来操作元素对象,一定要记住,js要通过获取html里的标签才能操作它,id只是省事写罢了**==
### 获取元素的方式(元素节点/标签节点)
- ==**通过js获取页面中的标签**==
- 代码:
  ```
  <!-- 1. id -->
    <div id="box"></div>

    <!-- 2.class -->
    <ul>
        <li class="new">111</li>
        <li class="new">111</li>
        <li class="new">111</li>
        <li class="new">111</li>
        <li class="newlist">111</li>
        <li class="newlist">111</li>
    </ul>

    <!-- 3.name -->
    <input type="text" name="username">
    <input type="password" name="password">

    <!-- 获取节点 -->
    <!-- 1.非常规：head,html,boay
         2.常规 ： id,class,tag... -->


    <script>
      // 1.非常规,直接获取并打印标签
      console.log(document.documentElement) // html(改rem)
      console.log(document.head) // 获取head
      console.log(document.body) // 获取body
    </script>


    <script>
      // 2.常规  获取的全是伪数组

      // 1. get element by id
      console.log(document.getElementById("box")) // 通过id获取元素,id是唯一的,只能获取一个对象
      var obox = document.getElementById("box") // 赋值
      obox.innerHTML = "11111" // 修改
      
      // 2. get elements by class name
      console.log(document.getElementsByClassName("new"))  // 通过class获取元素，获取伪数组，数组属性不能用,不唯一的,可以获取多个相同class名字的标签,获取的是伪数组
      var list = document.getElementsByClassName("new")
      list[0].innerHTML = "12331" // 对第一个标签更改内容
      // 伪数组不是数组,不能使用数组的常规方法,但是可以使用length,借助这个我们for循环遍历,可以更改内容
      for(var i=0;i<list.length;i++){
          list[i].innerHTML = "list-" + i
      }
      // 伪数组转换成真数组,真数组的prototype为Array(0)
      var newlist = Array.from(list) // Array.from = list转化为数组元素
      console.log(newlist)
      console.log(newlist.map) // 只有真数组可以找到,这里是调用map方法看他有没有,而不是使用它 .map()


      // 3.  get elements by tag name
      var list2 = document.getElementsByTagName("li") // 通过标签名TagName获取对象，获取的是伪数组，转化操作方法同上
      console.log(list2)


      //4.针对的是input类型函数,input标签需要带name属性,这是后端识别是哪个标签的重要信息 
      // get elements by name
      var input1 = document.getElementsByName("username") // 获取的是伪数组
      console.log(input1)
      input1[0].value= "kerwin请看输入框" // 提前在对应input内输入内容(value)
      var input2 = document.getElementsByName("password")
      console.log(input2)

      //5. querySelector 只会返回遇到的第一个对象,新版浏览器才兼容
      var item = document.querySelector("ul li") // 和CSS写法相同
      var item2 = document.querySelector("#box") // id #XXX / class .XXX

      console.log(item)
      console.log(item2)

      //6. querySelectorAll 返回遇到的所有符合的对象
      var item3 = document.querySelectorAll("ul li")  // 和CSS写法同步
      var item4 = document.querySelectorAll("ul li.new")  
      var item5 = document.querySelectorAll("ul li.newlist")  
      console.log(item3)
      console.log(item4)
      console.log(item5)
    </script>
  ```
  > ==注意==: 1.获取的元素有常规和非常规
  > 2.获取标签id是唯一的,class是可以多个重名一起获取的,在获取语法中也只有id的Element是不加s的
  > 3.一次获取多个标签的都是伪数组,==只能使用length <=这个是属性,不是方法,不要写成.length()==,可用Array.from()转化为数组
  > 4.query系列是遵循css写法的获取元素方式
  > 5.针对用法: 获取单个的,不可重复的,用id;少量多个的可用class,多个重复的,用TagName,input标签用Name.
  >6.==**除了id/querySelector,其他的获取完节点后(因为不一定取一个节点,所以即使取一个也是放在伪数组里面),是存在伪数组里的,取出来才能添加事件,伪数组条件下无法直接添加,[0]取出后可以**==

### 操作元素属性和设置自定义属性(属性节点)
- 导引(要仔细看代码) : 
  ```
  1.操作元素属性(标签),分为原生属性和自定义属性
  2.为了方便本代码均为id直接获取的元素,然后进行属性修改,获取的元素为对象,其原生属性就为成员方法(java描述),点一下调用修改值就可以了
  例如:  <input type="text" id="password"> 这个标签通过id直接获取,然后修改 password.text = password
  3.获取标签属性有box.getAttribute("id"),获取box标签的id属性值,还有box.attributes 获取box所有的元素属性,按顺序box.attributes[0] 获取box第一个属性和值, box.attributes[1] 获取box第二个属性和值.....(88学的(6),放这里合适)
  4.自定义属性就是自己起名字,给标签复制,但是是没什么用的,没有内置功能,主要用于li标签的一些功能.
  约定俗成的自定义格式为 data-XXX ,可以用setAttribute或setdata定义,获取属性的自定义value,又有getAttribute和data.set(获取所有符合格式的自定义属性并装入对象中返回),另外,removeAtrribute和delete支持对dataset设置的属性删除,后者要删除哪个用点去定位=>对象.自定义属性可用key名
  ```

- 代码:
  ```
   <!-- 
        1.元素自带的属性 id class name value
        2.自定义属性 data-kerwin(自己定义的) 常用于列表标位置顺序
     -->

    <div id="box" data-kerwin="kerwin"> 111 </div>
    <div id="box2" data-kiki="Niko" data-tiechui="dachui"></div>


    <form action="">
        <input type="text" value="hello" id="username">

        <input type="text" id="password">

        <img src="" alt="" id="photo">

        <input type="checkbox" checked id="check">
    </form>


    <ul>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
    </ul>



    <script>
      // 1.操作原生属性 这里为了方便通过id获取元素
      username.value = "123" // 修改username 中的value属性值

      console.log(password.type) // 获取id为password的标签的type值
      password.type = "password" // 修改

      // img地址
      photo.src = "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1iW7AR.img?w=750&h=499&m=6&x=283&y=89&s=102&d=102"

      check.checked = false // 取消框选

      // 2.自定义属性有3个操作方式，分别为设置set/获取get/删除remove,Attribute意为属性

      box.setAttribute("kiki", "tiechui") // 在代码里栏目里 "kiki" = "tiechui"
      console.log(box.getAttribute("kiki")) // 获取属性kiki的值 "tiechui"
      box.removeAttribute("kiki") // 删除自定义属性kiki

      // 3.使用遍历伪数组添加自定义属性
      // 添加自定义属性方法1
      var list = document.getElementsByTagName("li") // 通过TagName获取li标签赋值给list
      for(var i=0;i<list.length;i++){ // 伪数组可用length()
          list[i].setAttribute("data-kerwinindex",i) // 给列表设置自定义属性data-kerwinindex = 1,2,3,4.....
      }
      // 添加自定义属性方法2
      var list = document.querySelectorAll("ul li") // 通过query获取li标签
      for(var i=0;i<list.length;i++){
          list[i].setAttribute("list-number",i)
          console.log(list[i].getAttribute("list-number")) // 获取属性
      }

      // 4.H5==>自定义属性约定俗成格式：data-XXXX 方便区分自定义属性和原生属性
      // 通过dataset来获取自定义格式
      console.log(box2.dataset) // 获取自定义属性（以data-XXXX命名的自定义属性）返回值是对象 
      box2.dataset.xiaoming = "hello xiaoming" // 新添加自定义属性，自动转化为data-XXXX格式 data-xiaoming = "hello xiaoming"
      console.log(box2.dataset)

      delete box2.dataset.xiaoming // 删除xiaoming属性

      // 5.使用dataset添加自定义属性
      var list = document.getElementsByTagName("li")
      for (var i = 0; i < list.length; i++) {
          list[i].dataset.index = i
      }
    </script>
  ```
### 购物车全选(练习)80 -- 笔记导引
- 群体绑定onclick事件,函数替代简化代码
  
### 操作文本内容(文本节点)
- 三个 innerHTML innerText value
- 代码:
  ```
   <div id="box">
      1234
      <div>kerwin</div>
    </div>

    <input type="text" id="user">

    <select name="" id="select">
      <option value="1">1111</option>
      <option value="2" selected>2222</option> 
      <option value="3">3333</option>
    </select>
    <script>
      // 三个 innerHTML innerText value
      console.log(box.innerHTML) // 会打印标签
      box.innerHTML = "123123123" // 删除原有所有内容并赋值
      box.innerHTML = "<h1>12313123</h1>" // 可以解析HTML标签,会把h1的css格式体现出来 innerText不行
      console.log(box.innerHTML) // 把box里面的内容全改了

      box.innerText = "<h1>12313123</h1>" // 不解析，标签当作文本打印出来,输出纯文本，收到后端的信息更安全

      // 针对表单标签(只有它原生属性有value)
      // 表单标签有form-input+button select-option
      user.value="HOPH"
      // 下面操作可以通过按钮的文字来判断是哪一个option
      console.log(select.value) // 默认第一个标签的value=1 ,可用selected属性强制别的option变为默认值,从而获取这个默认标签的value=2
      select.value="3" // 把上一行默认的value修改为3,记得格式为字符串,选中value为3的option,button变为3333
    </script>

  ```
  > 1.区分三个的用法, innerHTML会解析html标签,会把html标签打印出来,或者实现css,innerText则是纯文本,value只服务于表单

### 动态渲染页面(复习课)

- 1.从后端接受数组(里面存对象信息)
  2. 写好页面html和css格式,使用map()把后端数组的数据更改,利用es6的``和\${},返回含有html和css格式的代码
  3. 关键位置(动态变化)利用\${}把对象中的变量传入
  4. 把改好的数组转化为字符串.join("")
  5. 使用innerHTML去把改好的字符串打印到对应的标签里
- 代码 :
  ```
   // 从后端传进来的数据,存在数组里，放了许多对象
    var filmlist = [
      {
        url:"https://img.zcool.cn/community/01bd15599c606aa801201794e1fa30.jpg@1280w_1l_2o_100sh.jpg",
        title:"西瓜太好吃了",
        grade:9.5
      },
      {
        url:"https://img.zcool.cn/community/01bd15599c606aa801201794e1fa30.jpg@1280w_1l_2o_100sh.jpg",
        title:"西瓜太好吃了",
        grade:9.5
      },
      {
        url:"https://img.zcool.cn/community/01bd15599c606aa801201794e1fa30.jpg@1280w_1l_2o_100sh.jpg",
        title:"西瓜太好吃了",
        grade:9.5
      }
    ]

     // 前端
        var filmitems = filmlist.map(function(item){ // 映射：把对象依次放入函数中，然后函数内设置格式
        //` `要紧挨着return写,不要换行 
            return `<li>  
            <img src="${item.url}" alt="">
            <h3>${item.title}</h3>
            <p>${item.grade}</p>
        </li>`
        })
        console.log(filmitems) // 数组
        console.log(filmitems.join("")) //数组,转化成字符串

        var oul = document.querySelector("ul") // 获取ul元素 
        oul.innerHTML = filmitems.join("") // 显示在页面的ul上，inner.HTML自动解析
  ```
### 操作元素样式(css样式)
- **单个操作元素**
- ==每次只对某个对象的单个css进行操作,例如,标签box有width height background 等许多css,但每次只能选取一个==
- 代码 : 
    ```
      <style>
        #box{
            height: 100px;
        }
      </style>


      <div id="box" style="width: 100px;color: black;background-color: yellow;">
        slmple Top 1 2021
      </div>
    
    <script>
      //  1.style只能获取行内样式 可读可写
      console.log(box.style.width) // v
      console.log(box.style.height) // x
      // 复合属性获取的两种写法
      console.log(box.style["background-color"]) // []写法
      console.log(box.style.backgroundColor) // 驼峰写法

      box.style.width = "200px"
      box.style.backgroundColor = "red" //可读可写

      // 2.获取内部(style)外部(link)行内样式  getComputedStyle 只读不写
      var res = getComputedStyle(box).height 
      // 也可以这样获取 height属性,因为get获取了box所有css属性存入对象,key值都是css属性名的字符串
      var res1 = getComputedStyle(box)["height"]
      // ()里面放变量,getComputedStyle(box)获取box对象的style中的height属性,这里省事了,用的id直接获取的,如果严谨一些,var box1 = documentElementById("box") +  var res = getComputerStyle(box1).height

      var res2 = getComputedStyle(box).backgroundColor
      console.log(res)
      console.log(res1)
      console.log(res2)

    </script>
    ```
    > 有两种: 1.对行内的可读可写(style),对内部样式和外部样式的getComputedStyle,只读不写,==其中getComputedStyle(dom对像)返回的是此dom对象的超多css值,通过.调用即可==
    > 2.复合属性写法: 例如background-color -> []写法 或 驼峰写法
    > 3.同过打印,getComputedStyle()内部存储了这个对象的一大堆css属性
    > 4.内部获取对象都省事了,用id直接获取了
    >5.==获取的css有的带单位px,通过parseInt()获取数字(转换数据类型那节)==

- **操作元素类名操作**
- ==相对于第一种,这次我们直接获取本元素的所有的类名(className),不在针对类内部的单个css进行操作,事先写好相应的css样式,对应好类名,到时候直接修改/增加/删除类实现效果==
- 代码:
  ```
   <style>
      *{
          margin: 0;
          padding: 0;
      }
      .item{
          width: 100px;
          height: 100px;
          background-color: red;
          border-radius: 5%;
      }
    </style>


  <body>
    <div id="box" class="item item1 item2 item3">kerwin</div>
    <button id="btn">click</button>
    <script>
      // 都省事了 使用id直接获取了box对象
      // 1.className 获取标签class类名(为了避嫌class关键字(类名)所以有所不同)
      // 优势:可读可写(自由)
      // 弊端：出现重复的类(不安全)，也不会管,例如有两个item2
      
      console.log(box.className) // 得到字符串
      // 修改方式 => 重新赋值
      box.className = "item item1" 
      console.log(box.className)
      // 纯当字符串添加,记得开头加空格!
      box.className += "item4" 
      console.log(box.className)
      box.className += " item5"
      console.log(box.className)


      // 2.classList属性 
      console.log(box.classList) // 得到数组

      box.classList.add("item3") // 数组会自动去重
      box.classList.add("item4")

      box.classList.remove("item") // 一个个删除

      // 3.切换 toggle 有就删，没有就加
      btn.onclick = function(){
          box.classList.toggle("item")
      }

    </script>
  ```
  > 1.两个 className(自由读写,不安全) classList(安全,修改稍微麻烦) 
  > 2.className 是获取对象的所有类并组合成字符串,而classList组装成数组,所以前者不具有查重功能,但是读写方便(直接重新赋值或添加字符串),后者具有查重功能,修改有其独特方法,add remove
  > 3.classList的一个方法 切换功能 toggle 有就删，没有就加
  > 4.内部获取对象都省事了,用id直接获取了
### 选项卡案例(for循环绑定事件)
- 最重要的for循环绑定事件的坑:\
  1.只绑定事件,不触发事件
  2.你要手动触发事件,此时绑定完成,for里的i已然发生变化
- 代码:
  ```
  CSS略
  <ul class="header">
        <!-- 导航 -->
        <li class="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <ul class="box"> 
        <!-- 内容 -->
        <li class="active">111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
    </ul>


    <script>
        // 1.js获取元素标签
        var oHeaderItems = document.querySelectorAll(".header li")
        var oBoxItems = document.querySelectorAll(".box li")

        // 2.给导航栏oHeaderItems绑定鼠标点击事件onclik
        
        for(var i=0;i<oHeaderItems.length; i++){
            oHeaderItems[i].dataset.index = i // data-index = 0/1/2/3
            oHeaderItems[i].onclick = handler  // 回调函数写法不简洁(没有名字的函数,随用随弃)
            // 记住for循环在上一行的作用是绑定事件,而非执行事件,只有点击才会执行
            // 那么在点击之前,for循环已经循环结束了,全部绑定完成,此时i=4(固定了),所以无论我们点击哪个触发事件打印i都是4,不知道具体点击的哪一个
            // 解决方法: 我们可以通过自定义属性来获取当前点击的是哪一个导航栏 !!
        }
        
        function handler(){
            // 4.老朋友this:当前对象 java , 通过this获取自定义属性
            console.log(this.dataset.index)
            var index = this.dataset.index
            // 5.先把导航的active全删后,在对this(当前点击对象)加active || 内容栏同理
            for(var i=0;i<oHeaderItems.length;i++){
                oHeaderItems[i].classList.remove("active")
                oBoxItems[i].classList.remove("active")
            }
            oHeaderItems[index].classList.add("active")
            oBoxItems[index].classList.add("active") // 导航和内容的index是一样的,一一对应,拿过来到索引直接用
        }
    </script>
  ```

### DOM节点
#### 元素/文本/属性/注释
- 知识点:[![pkrF3D0.jpg](https://s21.ax1x.com/2024/06/22/pkrF3D0.jpg)](https://imgse.com/i/pkrF3D0)
  [![pkrF8bV.jpg](https://s21.ax1x.com/2024/06/22/pkrF8bV.jpg)](https://imgse.com/i/pkrF8bV)
  [![pkrF1uq.jpg](https://s21.ax1x.com/2024/06/22/pkrF1uq.jpg)](https://imgse.com/i/pkrF1uq)
- ==**在前面我们已经见过了所有的节点,这里再进一步学习节点知识**==
- 元素节点: 我们通过getElementBy.....获取的都是元素节点,也成为标签节点,获取的都是html的标签
- 属性节点:标签内的属性,class id width height color...., 通过getAtrribute获取,属性无父子一类的
- 文本节点: innnerHTML 获取的就是文本节点(包括空格与换行),文本节点也有父节点
- 注释节点: 就是注释
#### 寻找节点的方式(孩子/兄弟/父)
- ==分为获取所有节点和只获取标签节点(元素节点)两种方式==
- ==关系分为孩子/父/兄弟三种,**其中元素属性不分父子,兄弟之类的,排除在外**,**另外找父节点也不分获取所有节点和只获取元素节点这一说,因为我们不会说:这个标签的父是个文本节点**==
- 代码:
  ```
    <div>hello</div>
    <div id="box">
        kerwin
        <p>11111111</p>
        <h1>123</h1>
        <!-- sdahj -->
    </div>

    <div>tiechui</div>

    <script>
      // 1.孩子节点
      // 1.childNodes vs children (返回值为节点(对象),装在数组里,注释节点是comment)
      console.log(box.childNodes) // 找到里面所有孩子的节点（只向下一层，不是孙子节点） 共5个各类节点
      console.log(box.children) // 只获取所有的元素节点 p（子元素）

      // 2.firstChild vs firstElementChild （返回值为节点值）
      console.log(box.firstChild) // 第一个节点 文本节点
      console.log(box.firstElementChild) // 第一个元素节点 p

      // 3.lastChild vs lastElementChild (同2)
      console.log(box.lastChild) 
      console.log(box.lastElementChild)

      --------------------------
      // 2.兄弟节点 sibling意为兄弟
      //4.previousSibling vs previousElementSibling 上一个兄弟
      console.log(box.previousSibling) //box上一个兄弟节点是#text回车和空客
      console.log(box.previousElementSibling) //box上一个元素兄弟节点是div
      box.previousElementSibling.innerHTML = "lolppper" //更改上一个元素兄弟的HTML内容

      //5. nextSibling vs nextElementSibling  下一个兄弟
      console.log(box.nextSibling) // 回车空格
      console.log(box.nextElementSibling) // div-tiechui
      box.nextElementSibling.dataset.index = 1 // 给兄弟的添加自定义属性 data-index = 1

      ---------------------------
      // 3.父节点
      // 6. parentNode vs parentElement 找父节点，唯一区别就是后者找不了document节点(特殊根节点)
      console.log(box.parentNode) // body
      console.log(box.parentNode.parentNode) // html
      console.log(box.parentNode.parentNode.parentNode) // document , parentElement找不到document 
    </script>
  ```
#### 节点操作(创建/插入/删除/替换/克隆)

- 创建新节点用于插入,替换,克隆等功能
- 代码:
  ```
  // 1.创建节点
      var odiv = document.createElement("div") // 创建新节点div (对象)
      odiv.id="oid" // 加元素属性id
      odiv.style.background="yellow" // css
      odiv.innerHTML = "我是创建的节点" // 加内容
      console.log(odiv)

    -------------------------------------
    
      // 注意下面都省事都用id获取了元素节点,所以直接把id放入了,如果是class,你要用getElementsByClass重新获取它的元素节点,然后再放入

    -------------------------------------
      // 1.插入节点
      // 1.给box追加一个儿子节点obox
      // box.appendChild(odiv)
      // 2.insertBefore(要加的节点，放在谁的前面) 
      box.insertBefore(odiv,child) 
      

      // 2.删除节点(要删除的节点对象)
      // box.removeChild(child) // 删box孩子child
      // box.remove() // 删除自己以及后代

      // 3.替换节点(新节点，老节点)
      var odiv2 = document.createElement("div")
      odiv2.innerHTML = "2222"
      box.replaceChild(odiv2,child) // 新节点 老节点(被替换)

      // 4.克隆节点 
      // var oclonebox = box.cloneNode() // 不写参数默认false，不克隆后代,只克隆自己
      var oclonebox = box.cloneNode(true) // 写true克隆box及其后代
      console.log(oclonebox) 
      document.body.appendChild(oclonebox) // class id啥的也克隆的一摸一样
      oclonebox.id = "box2" // 克隆后把id改改，防止冲突
    </script>
  ```
#### 节点属性nodeName nodeType NodeValue
- 节点的属性
- nodeName
> nodeName 属性返回节点的名称：
  1.如果节点是元素节点，则 nodeName 属性返回标签名（==大写==）。
  2.如果节点是属性节点，则 nodeName 属性返回属性的名称。
  3.如果节点是文本节点，则 nodeName 属性返回 #text。
  4.如果节点是注释节点，则 nodeName 属性返回 #comment。
  5.如果节点是文档节点，则 nodeName 属性返回 #document。
- nodeType
> nodeType 属性以数字形式返回指定节点的节点类型。
  1.如果节点是元素节点，则 nodeType 属性将返回 1。
  2.如果节点是属性节点，则 nodeType 属性将返回 2。
  3.如果节点是文本节点，则 nodeType 属性将返回 3。
  4.如果节点是注释节点，则 nodeType 属性将返回 8。
- childNodes
> childNodes 属性返回元素子节点的集合（列表）。
  1.childNodes 属性返回的是 NodeList 对象。
  2.childNodes 属性是只读的。
  3.childNodes[0] 与 firstChild 相同。(都指的是此节点的第一个孩子节点)
  4.childNodes 返回的节点种类：元素节点(css名)、文本节点(text)和注释节点(comment)。
  5.元素之间的空白与换行也是文本节点。
- nodeValue
> 1.如果节点是元素节点，则 nodeValue 属性将返回 null。
> 2.返回文本节点和注释节点的值
- 代码:
  ```
  <div class="box"><span></span>hello world <!-- kerwin --></div>
    <script>
      var obox = document.querySelector(".box")
      console.log(obox.childNodes) // 打印box的所有属性节点(数组)

      // nodeType 节点数字 nodeName 节点名字 nodeValue 节点值
      for(var i=0;i<obox.childNodes.length;i++){
          console.log(obox.childNodes[i].nodeType)
          console.log(obox.childNodes[i].nodeName)
          console.log(obox.childNodes[i].nodeValue)
      }

      // 根据这个数字可以提取自己想要的数据
       if(obox.childNodes[i].nodeType === 8){ // 只要注释节点的数据
          console.log(obox.childNodes[i])
       }
       
    </script>
  ```

### 获取元素尺寸
- 就是获取元素的占地面积,获取的是没有单位的数字类型,本语法用于懒加载项目,检测当你滑倒页面底部时再更新10条数据给你,就是刷视频思路
> 注意 : ==**辨析与getComputedStyle(css操作样式那节)的优缺点和区别!!!!!!!!!!!**==
> 1.前面学的getComputerStyle(dom)通过width height的获取是仅content内容的,如果想要获取更让多的需要继续调用border padding等属性,而offsetW/H则从开始就包含了content + padding + border
> 2.对于diaplay:none 的元素,无法通过offset获取,只能用getComputedStyle获取
> 3.get...获取的是带单位的,想要去单位,parseInt();
> offset 获取的是纯数字,赋值给css要+"px"

- 代码:
  ```
    // 就两种方式获取
    <script>
      // 1.offset...(大小由border+padding+内容组成)
      // 怪异盒也按如上规则计算
      // 但是如果盒子display:none;隐藏了,我们就不会拿到盒子的数据了
      console.log(box.offsetWidth,box.offsetHeight)
      // 2.client...(padding + 内容)
      console.log(box.clientWidth,box.clientHeight)
    </script>
  ```
### 获取元素偏移量

- 记录盒子与其他盒子的距离,参考对象是有条件的,有两个语法,功能不同
- 代码:
  ```
    <div id="box">
        <div id="parents">
            <!-- parent 是关键字,不能用  -->
            <div id="child">
                
            </div>
        </div>
    </div>

    <ul id="list"></ul>

    <script>

      // 记录盒子与其他盒子的距离(偏移量)
      // 1.offsetLeft offsetTop 
      console.log(child.offsetLeft,child.offsetTop)
      console.log(parents.offsetLeft,parents.offsetTop)
      console.log(box.offsetLeft,box.offsetTop)

      // 参考的对象是有定位的父级，就是我们这个节点遇到的第一个有定位的父级,都没有定位就以body为准(也就是可视页面)
      // 给parents加一个相对定位，那么最里面的child参考的就是parents这个父级的定位了 ===> 50

      // 2.client.... => padding + content 意为距离左上角的内容（就是左上角两个相邻边框的宽度）
      console.log(list.clientLeft,list.clientTop)

    </script>

  ```

### 获取可视窗口的尺寸
- BOM学的window.innerHeight和window.innerWidth获取的窗口会加上滚动条
- 这节课学的是可视窗口的尺寸(不包括滚动条) document.documentElement.clientWidth/cilentHeight 

## 事件及其进阶
### 初识事件和绑定事件

- ==事件的组成及其作用==:
  - 事件源: 给谁附上事件
  - 事件类型: 触发什么类型的事件,比如点击触发的onclick,滚动触发的onscroll等
  - 事件处理函数： = function(){....}
- DOM绑定方式:
  - DOM1绑定方式: (常用)
  ```
   box.onclick = function(){ 
            console.log("111")
        }
  ``` 
  > 注意:重复定义后面的会覆盖前面的,有很多方式可以避免定义重复
  - DOM2绑定方式: (绑定多个事件,按顺序执行)
  ```
  box2.addEventListener("click",function(){
    console.log("hello world!")
  })
  box2.addEventListener("click",function(){
    console.log("你好 世界!")
  })
  ```
### 事件解绑

- 例如:抽奖机案例,只能在有限的次数里抽奖,解绑后再点击也无法抽奖
- 代码: 推荐DOM0方法 
  ```
  // 1.不安全，会被从网页端篡改
    btn.onclick = function(){
        console.log("Thank you")
        // 这是button的属性
        this.disabled = "disabled" // 按钮失效
    }

  // 事件解绑有2个方法
  // 2.DOM0 (简单好用)
    btn.onclick = function(){
        console.log("thanks")

        this.onclick = null 
        // 解绑，通过后定义覆盖前定义特性实现对btn的onclick事件重新定义,之后再点击就没用了
    }

  // 3.DOM2 removeEventListener ()
  // DOM2只能删除具名函数(有名字的函数),DOM0定义的那种函数没法删除
    btn.addEventListener("click",handler)
    function handler(){ 
        console.log("thanks")
        // 删除语法和添加事件的语法是完全一样的,只是不同的API
        // dom.removeEventListener( 事件类型 , 事件处理函数)
        btn.removeEventListener("click",handler)
        // 优点: 可以根据名字确定删除具体哪个事件
    }

  ```
  > 经测试,DOM2如果是不同的两个函数,结果反正就是无法解绑事件
### 事件类型
- 事件类型: ==鼠标事件,键盘事件,浏览器事件,表单事件,触摸事件(移动端)==
- 认真看代码,注意都写在注释里了
- ==**鼠标事件:(以下均为id获取元素后,使用.触发事件,都加on前缀)**==
- 代码:
  ```
    //1. click   单击 ........
    //2. dblclick 双击
      btn.onclick = function(){
          console.log("one")
      }
      btn.ondblclick = function(){
          console.log("double")
      }

    //3. contextmenu 右键单击
      btn.oncontextmenu = function(){
          console.log("右键单击,自定义右键菜单")
      }
      document.oncontextmenu = function(){ // 全网页(文档对象)触发
          console.log("右键单击,自定义右键菜单")
      }

    //4. mousedown mousemove mouseup 鼠标按下，移动，抬起
    //4.2 click是按下和抬起在同一按钮时才执行，如果按下后，移动鼠标离开按钮再抬起，则不会执行
      btn2.onmousedown = function(){ 
          console.log("鼠标按下")
      }
      btn2.onmouseup = function(){
          console.log("鼠标抬起")
      }
      box.onmousemove = function(){ 
      // 在box身上移动时触发 
          console.log("鼠标移动")
      }

    // 5.移入移出 mouseover mouseout vs mouseenter mouseleave (必须两两配套使用,否则出BUG)

      // (1)在父子之间进入进出会触发
      // 无论父子从谁到谁,都是先移出后移入
      box2.onmouseover = function(){
          console.log("移入")
      }
      box2.onmouseout = function(){
          console.log("移出")
      }
        

      // (2)在父子之间进入进出不触发
      box2.onmouseenter = function(){
          console.log("移入")
      }
      box2.onmouseleave = function(){
          console.log("移出")
      }
  ```
- ==**键盘事件 针对的对象window,document,input(输入框)**==
- 对于window,document的绑定,比如银河战舰小游戏,WSAD控制飞机移动,就需要绑定到window,document上面
- 代码:
  ```
   // 给输入框input绑定事件
      user.onkeydown = function(){
          console.log("按下键盘")
      }
      user.onkeyup = function(){
          console.log("抬起键盘")
      }
      ---------补充----------
    // 通过键盘事件传输过来的对象KeyboardEvent包含了键盘输入信息,其中keyCode很重要,类似于ASCII,给键盘字母,特殊字符,数字,标点等编号的
      document.addEventListener("keydown",function(e){ // 给页面绑定键盘按下事件
      console.log(e) // 获取事件对象
      console.log(e.keyCode);
      })
    
    // Plus新学的 e是键盘对象
    e.ctrlKey和e.shiftKey(代表按下ctrl和shitf键)
    if(e.ctrlKey){
      console.log("按下了ctrl键")
    }
  
  ```
- ==**浏览器事件 BOM里讲了,load scroll等,略过**==
- ==**表单事件 针对input,button等表单元素的操作(重要)**==
- 代码:
  ```
   // 焦点检测: 应用场景例如,输入用户名后，焦点移出输入框时，会检测用户名是否被注册过，并反馈给用户
    username.onfocus = function(){
        console.log("点击本输入框,获取焦点")
    }
    username.onblur = function(){
        console.log("点击别的地方,本输入框失去焦点")
    }

    // change 失去焦点时,对比获取焦点时,内容发生变化,则触发
    username.onchange = function(){
       console.log("失去焦点对比获取焦点时内容发生变化")
    }

    // input 一旦内容不一样就触发,用于百度搜索的模糊查询,每打一个字更新下默认词表
    username.oninput = function(){
        console.log("内容不一样")
    }

    // submit/reset, 必须要有表单form,内部的也要有对应submit和reset的input/button
    // 特殊:submit/reset是绑在form上的
    myform.onsubmit = function(){ 
      // 提交给后端，由于action地址没写，所以刷新一下网页
        console.log("submit") 
      // 由于提交的瞬间会刷新网页，但有时为了校验数据内容,所以要有立即阻止刷新的方法
      // 即使有地址,也会阻止跳转,还是要先检验一下数据是否符合规定
        return false // 后面会讲 
    }
    myform.onreset = function(){
       console.log("reset")
    }
  ```
- ==**触摸事件，针对移动端**==
- ==手机所有点击事件都是这几个事件的组合,有专门的库==
- 代码:
  ```
    box.ontouchstart = function(){
        console.log("触摸开始,点击")
    }
    box.ontouchmove = function(){
        console.log("触摸着屏幕移动=手指在屏幕上滑动")
    }
    box.ontouchend = function(){
        console.log("触摸结束,抬手")
    }
    box.ontouchcancel = function(){
        console.log("cancel")
        // 用不大到：来电话时，强制结束正在触摸的事件
    }
  ```
- ==**自动触发事件(plus学的)**==
- 目前用法是
- 
  ```
    // 语法: dom.dispatchEvent( new Event("事件类型") )
    // 自动执行dom节点上的XXX事件
      btn.dispatchEvent( new Event("click") )
    // 自动执行btn的click事件
  ```

### 事件对象
#### 基础知识
- ==事件对象：每一个事件都会对应有一个对象描述这个事件的基本信息，这个对象叫事件对象，它包括了对应事件的一些属性及其对应信息值==
-  例如：在输入框中，怎么知道点的回车；在点击屏幕时，点击的坐标位置等等，都可以通过事件对象返还给我们
- 代码:
  ```
    // 以keyup为例
    user.onkeyup = function(event){ // 形参随便起名字
    // 当我们点击时,系统会传递一个实参(对象)给形参,里面包含了很多信息
    // 例如下面的keyCode就是对象的一个属性,根据keyCode能得知你敲的哪个字母(形如ASCII码那样)
        if(event.keyCode === 13){  // 回车的keyCode值为13
            console.log("回车输入完成")
        }else{
            console.log(event.keyCode) 
        }
    }

    box.onclick = function(evt){ 
        console.log(evt) // 点击后,打印看看系统传过来的对象都有啥属性(巨多)
    }
  ```
#### 事件对象之鼠标对象的位置属性
- ==根据上节课所学,鼠标点击事件系统也会自动返回一个对象,记录这次点击事件的基本信息pointerEvent.==
- 代码:
 ```
  // 全局点击为例
  document.onclick = pointerEvent
  function pointerEvent(evt){ // evt即系统自动返回的对象
    console.log(evt)
  }
 ```
- ==本节针对点击事件返回的对象的三个属性(涉及点击位置,但是有不同的计算规则)==
- ==**难点:分清楚可视页面和文档流页面(document)的区别和"冒泡现象"(后面会学)**==
- 代码:
  ```
  // 书接上文,我们细看下系统对于点击事传回来的对象里的三个坐标属性
    box.onclick = function(evt){
        console.log(evt.clientX,evt.clientY) 
        // 距离浏览器可视窗口的左上角的坐标值,因为是可视化窗口，所以拖动滚动条可以是div位置相对左上角发生变化，进而再点击相同位置,坐标值会发生变化
        console.log(evt.pageX,evt.pageY) 
        // 相对于文档流document(页面)左上角的位置，不受滚动条影响
        console.log(evt.offsetX,evt.offsetY) 
        // 相对于实际触发对象左上角的位置,比如点p对象，只相对于p本身，后面会讲这个“冒泡现象”(虽然我们给box绑定了事件,但是点击p仍然触发了)
    }
  ```
- 可视页面与文档流页面坐标计算区别(client/page)如下图:
  [![pk6SBwT.jpg](https://s21.ax1x.com/2024/06/27/pk6SBwT.jpg)](https://imgse.com/i/pk6SBwT)
  [![pk6SskF.jpg](https://s21.ax1x.com/2024/06/27/pk6SskF.jpg)](https://imgse.com/i/pk6SskF)
- 相对于实际触发对象左上角的位置 offset:
  [![pk6SDTU.jpg](https://s21.ax1x.com/2024/06/27/pk6SDTU.jpg)](https://imgse.com/i/pk6SDTU)
- 冒泡现象的盒子位置(box有事件,p没有,p是box的孩子),如下图:
 [![pk6S0mV.png](https://s21.ax1x.com/2024/06/27/pk6S0mV.png)](https://imgse.com/i/pk6S0mV)
#### 鼠标跟随案例
- 鼠标放在box上会有一个p介绍框跟随鼠标移动
- 要点都写在注释里了,注意几个要点,父与子的定位;如何新学的哪一个鼠标位置属性实现;在其中由于"冒泡现象",又用哪种新语法来指定某个元素事件禁止触发;如果有别的元素,如何防止标签p被覆盖;最后又温故知新,用到了获取元素标签和改写元素标签css属性的知识
- 代码:(认真看+注释)
  ```
  css:

    /* box相对定位 p绝对定位 p的定位坐标参考父元素,这时可以用offsetX/Y实现 */
    #box {
        width: 200px;
        height: 50px;
        margin: 50px;
        background-color: yellow;
        position: relative;
    }
    
    #box p {
        width: 300px;
        height: 200px;
        background: red;
        /* 有了子绝父相,才能参考父,去对子的top和left(css属性)进行更改并有效!!! */
        position: absolute;
        left: 100px;
        top: 100px;
        display: none;
        
        pointer-events: none;
        /* 穿透，鼠标打上去也不触发事件,防止鼠标在p上触发事件,会出现频繁闪现,我们只想要事件只在box身上触发 */
        /* 注意:虽然也只是被box附上事件没给p,但是根据上节课见到的"冒泡现象",p也会触发 */
      
        
        /* 如果p层级低被其他div挡住，就是用这个属性单独设置一下层级 */
        /* z-index: 1; */
    }

    js:
     // 鼠标移入
      box.onmouseover = function(){
          this.firstElementChild.style.display = "block" 
          // this.firstElementChild 当前元素的第一个元素，也就是p标签,style(可读可写)
      }
      // 鼠标移出
      box.onmouseout = function(){
          this.firstElementChild.style.display = "none"
      }
      // 鼠标移动 + p跟随鼠标移动
      box.onmousemove = function(evt){
          // console.log(evt.offsetX,evt.offsetY) // 鼠标相对于此元素左上角的位置
          // p的定位紧跟鼠标位置(注意offsetX是number要加px)
          this.firstElementChild.style.left = evt.offsetX + 'px'
          this.firstElementChild.style.top = evt.offsetY + 'px'
      }
  ```
#### 鼠标拖拽案例
- 代码:(看注释,清洗步骤和用法,还有些老知识复习一下)
  ```
   <script>
      box.onmousedown = function(){
          console.log("down")

      // 1.为了使box跟随鼠标在全页面移动,我们把移动属性绑在页面上,这样获取鼠标在页面上的坐标,而box跟随鼠标坐标
      // 2.按下box时,才触发移动事件
      document.onmousemove = function(evt){
          // 2.1 温故知新 offsetW/H 获取元素的宽高尺寸
          var x = evt.clientX - box.offsetWidth / 2 
          var y = evt.clientY - box.offsetHeight / 2 
          // 2.2不出页面边界,左和上
          if(y < 0) y=0
          if(x < 0) x=0
          // 右和下 复习:可视窗口的宽高
          if(x >= document.documentElement.clientWidth - box.offsetWidth) x = document.documentElement.clientWidth - box.offsetWidth
          if(y >= document.documentElement.clientHeight - box.offsetHeight) y = document.documentElement.clientHeight - box.offsetHeight

          box.style.left = x + 'px'
          box.style.top = y + 'px'
          }
      }
      box.onmouseup = function(){
          console.log("up")
      // 3.松开box时,解绑移动事件
      // 但发现只有在box内部抬起鼠标才会触发事件解绑,不用担心,因为实现的功能就是盒子跟随鼠标移动,所以效果最终实现时,无论如何鼠标都在盒子内
          document.onmousemove = null
      }
        
    </script>
  ```
- 更简洁写法(依旧是使用boolean判断,逻辑要清晰)
- 代码:
  ```
  
    <script>
      isDown = false
      box.onmousedown = function () {
          console.log("down")
          isDown = true
      }
      box.onmouseup = function () {
          console.log("up")
          isDown = false
          // document.onmousemove = null // 删除,依靠bool判断是否执行函数,不要解绑了
      }


      document.onmousemove = function (evt) {
          if (!isDown) return
          var x = evt.clientX - box.offsetWidth / 2
          var y = evt.clientY - box.offsetHeight / 2

          if (y < 0) y = 0
          if (x < 0) x = 0

          if (x >= document.documentElement.clientWidth - box.offsetWidth) x = document.documentElement.clientWidth - box.offsetWidth
          if (y >= document.documentElement.clientHeight - box.offsetHeight) y = document.documentElement.clientHeight - box.offsetHeight

          box.style.left = x + 'px'
          box.style.top = y + 'px'
      }

    </script>
  ```
### DOM事件流
- 事件流如图:[![pk6uLgP.jpg](https://s21.ax1x.com/2024/06/28/pk6uLgP.jpg)](https://imgse.com/i/pk6uLgP)
- 事件的传递顺序 inner -> center -> outer (这是三个div盒子,从左往右层层嵌套,逐渐变大) -> body -> html -> document -> window
-  隔山打牛 ：     
    比如 虽然inner没有click事件，但是你点击了inner盒子，这个点击行为被传递到了center层面的div盒子，而恰巧center拥有click事件，那么它就会被触发
    然后这个点击行为会一直传递到window的层面,中间不间断，层层检查。（==注意：inner有click事件，照样执行不误，事件行为继续传递，**记住传递的是点击的行为，看看后面有没有对应的触发函数，只有后面的层面只有不具有click事件执行函数时，才不会执行,但也不影响点击行为的传递**==） 
  > 只传递行为,只按照DOM的事件流规则传递,与页面布局无关.
- ==**向上传递evt参考值问题(很重要)**==
   再回到鼠标跟随案例,虽然父box右func而其子p没有,但是鼠标在子上移动时,不加干预下其移动行为会传递到父并触发func,要注意的点来了,经测试如果是p传递的行为触发的box的func,那么此时func的evt为p,如果单纯时box自己触发,evt是box,由于evt不同,导致坐标计算结果不同,会出现p闪现,经验证向上传递均有此特性,==**在本节课代码中有两个注释的鼠标移动事件,可以通过看evt.target(后面学的事件委托)来认识这一点**==
- ==标准的DOM事件流:==
        获取 ： window -> .... -> innner (只获取事件)
        目标 ： inner （点击的div，以inner为例）
        冒泡 ： inner -> .... -> window (传递事件行为并触发)
        默认情况 ： 只在冒泡环节触发事件,捕获阶段不触发事件
        按照dom2绑定,并进行配置,才能看到捕获环节的触发
- DOM0(标准)
- 代码:
  ```
  inner.onclick = function () { // 点我，我不光执行自己，还会把事件行为传给center和outer，把他们的click事件一起触发
        console.log("inner")
    }


    center.onclick = function () { // 我虽然没有传递给inner的能力，但我可以霍霍outer
        console.log("center")
    }
    // 向上传递evt问题演示
    // center.onmousemove = function(evt){
    //     console.log(evt.target)
    // }


    outer.onclick = function () { // 我是最低层，没法影响上面两位大佬，点我就只能执行我自己
        console.log("outer")
    }
    // 向上传递evt问题演示
    // outer.onmousemove = function(evt){
    //     console.log(evt.target)
    // }


    document.body.onclick = function () {
        console.log("document.body")
    }
    document.documentElement.onclick = function () {
        console.log("document.documentElement = html")
    }
    document.onclick = function () {
        console.log("document")
    }
    window.onclick = function () {
        console.log("window")
    }
  ```
- DOM2(很少用)
- 代码:
  ```
  // 获取阶段
  inner.addEventListener("click",function(){
        console.log("inner1")
    },true)
    center.addEventListener("click",function(){
        console.log("center1")
    },true)
    outer.addEventListener("click",function(){
        console.log("outer1")
    },true)
    // 冒泡阶段
    inner.addEventListener("click",function(){
        console.log("inner")
    })
    center.addEventListener("click",function(){
        console.log("center")
    })
    outer.addEventListener("click",function(){
        console.log("outer")
    })
  ```

#### 阻止事件流传递

- 阻止事件传播是默认事件对象的一个属性
- 语法: evt.stopPropagation() // evt系统自动传递的实参
- 代码:(在90动态删除标签案例的小改进)
  > 新增li点击就跳转功能,但如果点击按钮删除,根据事件传递,也会跳转,所以要阻断事件传递 
  ```
    var arr = ["111", "222", "333"]
    for (var i = 0; i < arr.length; i++) {
        var oli = document.createElement("li") // 创建li节点
        var obutton = document.createElement("button") //  创建按钮节点

        oli.innerHTML = arr[i] // 给li节点输入文本内容
        obutton.innerHTML = "delete" // 给按钮内添加内容

        oli.appendChild(obutton) // 给li加儿子节点（button）


    ---------------new----------------
    // 新加了一个功能，点li可以跳转到百度，其余的不变，这里有问题了，点delete时，点击行为传递到了li层面，删完后仍然跳转百度
    // 原因:button点击行为传递到li层面,li的点击事件为跳转页面
    oli.onclick = function () {
        location.href = "http://www.baidu.com"
    }

    list.appendChild(oli) // 给ul加儿子节点(li)

    
    obutton.onclick = handler // 绑定事件，已经在循环里执行了
    }

    ---------------new-----------------
    function handler(evt) {
        this.parentNode.remove() // this+父节点+全删 知识点
        
        // 解决：在点击delete后阻止事件传播(此时evt为button)
        // 这样点击行为不会从button传递到li了
        // console.log(evt.target)
        evt.stopPropagation() // 里面的一个属性
    }
  ```
#### 阻止默认行为
- 前面的98_2的表单案例,阻止提交表单后的默认提交行为,先阻止提交校验下数据是否合规
- 代码:
  ```
  <!-- 98.2 比如页面右键出自定义菜单，阻止默认的系统菜单弹出 -->
    <script>
      // DOM0 return false 阻止
      document.oncontextmenu = function(){
          console.log("右键单击出自定义菜单")
          return false
      }

      // DOM2  evt.preventDefault()
      document.addEventListener("contextmenu",function(evt){
          console.log("右键单击出自定义菜单")
          evt.preventDefault()
      })
    </script>
  ```
#### 右键自定义菜单
- 先阻止默认菜单弹出,然后设置自己默认菜单跟随鼠标移动,点击时菜单消失
- 代码:
  ```
    <ul id="list">
        <li class="1">1111</li>
        <li class="2">2222</li>
        <li class="3">3333</li>
    </ul>


    <script>
      document.addEventListener("contextmenu", function (evt) {
          evt.preventDefault()
          list.style.display = "block"
          var x = evt.clientX
          var y = evt.clientY

          // 不出界,自定义的菜单定位到鼠标位置
          if (x > document.documentElement.clientWidth - list.offsetWidth)
              x = document.documentElement.clientWidth - list.offsetWidth
          if (y > document.documentElement.clientHeight - list.offsetHeight)
              y = document.documentElement.clientHeight - list.offsetHeight

          list.style.left = x + "px"
          list.style.top = y + "px"
      })


      document.addEventListener("click", () => {  
          list.style.display = "none" // 不论点页面，还是其他的层级（比如li），点击行为都会传递到document，然后触发事件none，ul消失
      })
    </script>
  ```

#### 事件委托
- 事件委托 ： target 指向触发事件的源头(子元素行为冒泡传递给父元素,而通过target,我们父元素层面知道是哪个子元素触发的),子元素的行为会传递到父元素上,而父元素可以把子元素要实现的功能一起写进父的事件中,只要加以区分,父元素就可以执行多个子元素的时间任务,这叫事件委托,
- ==**优点**==: 
  1. 代码简洁,不用给每个子元素单独一个个绑定事件，一个父元素+target定位搞定所有子元素的事件执行（106）(107_2)
  2. 动态添加li的也会自动附上事件(107_2)

- 代码:(最直接体现target作用)
  ```
   <ul id="list">
          <li>
              1111
              <button>123</button>
          </li>
      </ul>
    <script>
      list.onclick = function(evt){
          console.log(evt.target) 
          // 返回当前点击的事件对象，点list的子元素li或button(或其本体),都会冒泡到list去执行这个函数,然后target会告诉你现在点击的是哪个子元素
      }
    </script>
  ```
- 针对优点1:代码简洁,不用给每个子元素单独一个个绑定事件,我们对右键自定义菜单的部分代码进行更改
  ```
  html:
  <ul id="list">
        <li class="1">11111</li>
        <li class="2">22222</li>
        <li class="3">33333</li>
    </ul>


  js:
      document.addEventListener("click", () => {  
            list.style.display = "none" // 不论点页面，还是其他的层级（比如li），点击行为都会传递到document，然后触发事件none，ul消失
        })

      
      list.onclick = function(evt){  // 从list父元素把所有li子元素搞定,通过target+className限定范围为li并区分是哪个li
          console.log("list",evt.target)  
          if(evt.target.className === "1"){ // 根据当前事件的属性精准定位
              console.log("执行1111栏目的任务") // 事件委托进行执行
          }else if(evt.target.className === "2"){
               console.log("执行2222栏目的任务") // 事件委托进行执行
          }else{
               console.log("执行3333栏目的任务") // 事件委托进行执行
          }
      }
  ```
- 代码:优点2,动态添加li的也会自动附上事件
  ```
    // 原案例来自90
    var arr = ["111", "222", "333"]
    for (var i = 0; i < arr.length; i++) {
        var oli = document.createElement("li") // 创建li节点
        var obutton = document.createElement("button") //  创建按钮节点

        oli.innerHTML = arr[i] // 给li节点输入文本内容
        obutton.innerHTML = "delete" // 给按钮内添加内容

        oli.appendChild(obutton) // 给li加儿子节点（button）
        list.appendChild(oli) // 给ul加儿子节点(li)

    }

    // 不需给每个按钮绑定删除事件，委托给父元素,以后即使动态加li和button，将会自带删除能力（反正都委托给父节点了）
    list.onclick = function (evt) { // 子元素行为冒泡到list（ul）执行操作
        console.log(evt.target.nodeName)
        if (evt.target.nodeName === "BUTTON") { // 只有点到button时才执行,给之后所有动态添加的button加删除事件
            evt.target.parentNode.remove()  // button的父元素是li，执行li的删除
        }
    }

  ```
### 异步机制(PLUS)
- kerwin的定时器笔记中也有一小部分
- 代码:
  ```
   <script>
        // 异步: js特殊代码的执行顺序
        // 同步: js是一个单线程语言,一个代码执行完之后才会执行新代码

        // 即使出现了执行时间非常长的代码,也会等待
        for(var i = 0; i< 10000000000; i++){
            // 这种耗时同步无论执行多久,后面都会等待
        }
        console.log(1)

        // 但是这种机制,面对js某些特殊机制会很尴尬
        // - 事件机制(等待触发事件) / 定时器机制(等待计时器) / 网络请求机制(等待网络)
        // 所以js创建了异步机制,我们会让这些场景的回调函数,会让同步程序执行完再去执行它

        // 回调函数: 上面的三个场景都会有函数,因为这些函数同步程序结束后,才会被调用,这些函数中的代码称之为异步程序的代码

        console.log(1)
        setInterval(function(){
            // 即使定时器倒计时为0ms,依旧等待同步执行完后再执行异步程序
            console.log(2) // 异步代码,不被回调函数包裹的程序都是同步程序
        },0)
        console.log(3)

        // 异步机制
        console.log(1)
        for (var i = 0; i < 10; i++) {
            // 打印了10个10
            // 原因: 定时器内部的函数是异步,要等待同步执行完,for循环是同步的,执行完i=10,同时for打开了10个定时器程序,等待所有同步程序执行完后,这10个定时器执行内部异步代码,打印了10个10
            // 异步使得代码执行顺序和代码编写顺序不一定一致
            setTimeout(function () {
                console.log(3) 
            }, 10)
        }
        console.log(2);
    </script>
  ```
### 事件Plus(很重要)
- 这里是plus事件中总结的知识点
- 1.js是事件驱动型的语言,事件的绑定极其重要,根据实现的效果来决定是给哪个元素绑定事件,是特定的还是document,同理提取事件也是如此,是从documnet中找还是从某个div中找(div也要提前获取节点),有许多获取节点的方式,不推荐偷懒的方式,就是直接用id获取
- 2.每次我们写一个事件是,要先用console.log()去测试是不是我们要的哪个效果,然后再写

- ==**案例的总结**==:
- **1.鼠标跟随或拖拽出现的问题**
- kerwin的鼠标跟随案例和鼠标拖拽案例和plus专题八的Day20-04跟随移动以及Day18-03-04鼠标拖拽出现类似闪现,功能失效情况,==都是由于鼠标进入了其他元素,而其他元素没有绑定事件所发生的BUG==,给随案例->鼠标进入了跟随的元素里怎么办 拖拽案例->万一网卡了鼠标卡出框了,这时候松开鼠标,由于没给document绑定鼠标抬起事件,只给框绑了,就会出现结束拖拽功能失灵现象
- **==1.2鼠标拖拽改进==**
- 元素跟随鼠标点击位置移动就要加上offsetX/Y Day18 03-04
- ==**2.函数调用问题Day18 03-04:**== 
- 1.==两个函数有调用关系,直接调用 2.两个函数无调用关系,用全局变量保存提取出来,然后再拿到别的函数中用==
- 在事件处理函数中,要看是哪个元素添加了这个事件,当触发这个事件时就会调用,==俗称这个事件绑定在谁身上,谁捡来就会调用,this就指向它==
- ==尤其要谨慎,**如果函数中有this和一些系统自动返回的事件对象(例如鼠标事件对象,键盘事件对象),你只要改变了调用它的函数,this将会失去指向,原来返回的事件对象将会变化甚至为空**,那么函数体内部所依赖这些参数执行的代码会崩==
- ==**3.选项卡案例Day19**==
- **1.处理标题样式**
- ==多个元素公用一个事件处理函数,注意使用this指向当前触发事件的元素==
- ES5下的this规则 : 谁调用指向谁  函数名.()
- 逻辑: 谁触发事件 -> 谁就调用这个事件的事件处理函数 -> this就指向这个触发事件的节点
- 给这个节点添加active

- **2.处理内容与标题的对应从而实现内容根据标题切换**
- 选项标题与内容的对应
- kerwin最初讲的使用dataset绑定data-XXXX-数字来识别,用这个也行(选项卡案例) 那个坑就是用var给多个节点绑定事件,然后找不到当前触发事件的元素 
- ==而plus更简单,标题与内容一一对应,我们js获取多个标题元素时,把自动它们放入到数组,只要用数组和当前这个this(触发事件的元素)一比较,就能获取标题的下标了,再根据这个找内容去==
- 选项卡的只有一个元素显示都是那个能可错杀不可放过的策略,先全部删除,再给当前元素添加

- 3.**==间隔定时器==**
- 在轮播图和拖拽回放中有了新的用法,分别在Day18和07的选项卡轮播

- 4.**==零散小知识==**
- **1.键盘事件** // 放入事件类型 - 键盘事件
  keydown按下键盘的返回的事件对象
  记住keyCode代表的键盘编号
  新学的ctrlKey和shiftKey
  e.ctrlKey和e.shiftKey(代表按下ctrl和shitf键)
  if(e.ctrlKey){
    console.log("按下了ctrl键")
  }
- **2.自定义触发事件**
  新东西:模拟触发dom上的事件: 放入初识事件
  语法:dom.dispatchEvent( new Event("事件类型") )
- 5.==**隐藏问题**==
- 隐藏有两种 display:none/block  visibility:visible/hidden 
  1. 其中display不光隐藏,还不占位置,也就是说,如果下面有别的元素,会顶上来占领它的位置,而后者不会,只是单纯不显示,元素还占着位置,考虑这一点,如果此元素隐藏会导致页面结构改变,就用后者
  2. 在复杂的(父子之间的鼠标移动事件)使用visibility
- ==**6.性能优化**==
- 减少消耗的性能,再别的案例中也有,我们在事件触发的内部函数中,涉及计算的数学公式,==如果是某些元素的常量,我们在函数外面提前用全局变量去计算好直接带入,减少每次触发事件时,计算机号要重复获取某些元素的数据,**记住针对的是常量,如果是一直变化的例如坐标,那没办法,该获取获取**==
- 7.==获取元素尺寸的offset和getComputedStyle的区别  **(很重要!)** 已经放入获取元素尺寸==

## 正则表达式
### 初始正则表达式
- 正则表达式是复杂数据类型
- 作用: 有时候提交数据表格，比如邮箱，你需要检测写的格式是否符合邮箱格式，然后在提交给后端，正则表达式可以解决这个问题
- ==代码介绍==: 正则表达式的2种写法 + 一种检测方法test()
- 代码:
  ```
    <form action="">
        <input type="text" required id="mytext"> // required表示必填
    </form>

    // 写法1： /.../
    var reg = /abc/ // 检查输入的文字中是否有abc（连续的）
    console.log(reg)
    // 写法2：内置构造函数
    var reg2 = new RegExp("abc")
    console.log(reg2)

    mytext.onblur = function(){ // 失去焦点时触发
        console.log(mytext.value) // 失去焦点时，获取输入内容的信息
        // 3.校验 mytext.value是否符合reg要求
        console.log(reg.test(mytext.value))
    }
  ```
  > ==**注意:正则表达式\\...\写的什么就是什么,都是连续的,被包含在数据中的**==
### 元字符-基本元字符
- 对输入的数据进行更加详细的限定
- 代码:
  ```
  <script>
      // 1.\d 要求至少有一位数字 0-9 ,不关心类型number或者是string,一般我们从输入框拿到的都是string
      var reg = /\d/ 
      var reg2 = /\d\d/ // 至少2个数字，以此类推,可以叠加
      console.log(reg.test("abc")) // false
      console.log(reg.test("f1")) // true 
      console.log(reg2.test("f1")) // false

      //2 \D 至少一位非数字,可以叠加
      var reg = /\D/
      console.log(reg.test("123")) // false
      console.log(reg.test("12f")) // true
      var reg2 = /\Dk\D/ // 必须两个非数字+中间一个k(紧密相连)
      console.log(reg2.test("f!d")) // false
      console.log(reg2.test("fkd"))  // 中间的k必须放上，位置不能改，必须连续且一致 true

      //3 \s 以为空白内容，即空格，换行(\n)，缩进(tab),可以叠加
      var reg = /\s/
      console.log(reg.test("12 34")) // true
      console.log(reg.test("12\n34")) // true
      console.log(reg.test("1234")) // false

      //4 \S 一位非空白内容,可以叠加

      var reg = /\S/

      console.log(reg.test("      1")) // true
      console.log(reg.test("       ")) //false
      console.log(reg.test("\n\n\n\n")) //false

      //5 \w 至少一位字母或数字或下划线,可以都有,至少一位,可以叠加
      var reg = /\w/
      console.log(reg.test("@#$%")) // false
      console.log(reg.test("1")) // true
      console.log(reg.test("r")) // true
      console.log(reg.test("_")) // true
      console.log(reg.test("Donk_666")) // true

      //6 \W 一位非数字，字母，下划线，可以叠加
      // 比如特殊字符,空格,换行,缩进等

      var reg = /\W/

      console.log(reg.test("1_r#")) // true
      console.log(reg.test("1 a_bc")) // true
      console.log(reg.test("r\n12_34")) // true
      console.log(reg.test("a_1")) // false

      //7 . 至少一个任意内容（但是不包含换行），即只有全部是换行为false
      var reg = /./

      console.log(reg.test("!@#$ qWERer 1234 __ == :?>< ")) // true
      console.log(reg.test("A\n\n\n\n\n\n")) // true
      console.log(reg.test("\n\n\n\n\n\n")) // false

      // 8 \ 转义字符 把元字符变成普通字符(markdown里同用来表示文档格式的特殊字符转化为普通字符)
      // 要求:输入一位小数
      var reg = /\d.\d/ // 这中间的.被当作基本元字符的.了，即格式为 “数字+任意内容+数字”
      console.log(reg.test("2.3"))  
      console.log(reg.test("2#3")) // true
      var reg2 = /\d\.\d/ // 这里前面加上\，组合成\.就成为了普通字符串的.了，即格式为 “数字.数字”
      console.log(reg2.test("2.3"))
      console.log(reg2.test("2#3")) // false
      </script>
  ```

> ==注意==: 1.\加字母大小写,有规律,它们意思相反: 大写的是非... 小写的是...,记忆时一对对记忆
> 2.转义字符在Markdown文档同样好用,如下
\> \- \=\=123\=\= \*\*1234\*\*
### 元字符-边界符
- 规定开头结尾的字符要求
- ==开头 ^ 结尾 $==
- ==^ 代表一行的开始，美元符号$ 代表一行的结束==
- 代码:
  ```
   <script>

      // 对特定内容的位置进行限制 例子如下
      //1. ^\d 开头必须是数字
      //2. \d$ 结尾必须是数字
      //3. 也可以组合 ^ ... $ 意为从开头到结尾为中间的...
      // 例如 ^abc$ 不是说开头abc 结尾abc,因为后面学了(),我们才可以对组合字符规定规则,所以这个意为开头必须为a,之后衔接文本b,然后结尾必须为c,所以abc就是唯一的true 
      // ^\d{10}$ 意为从开头到结尾共10个数字

      var reg = /^abc/ // 开头a 之后衔接文本b和c
      console.log(reg.test("abc")) // true
      
      var reg2 = /^a\dc$/ // 开头结尾为a和c,中间内容至少一个数字
      console.log(reg2.test("a1c")) // true
      console.log(reg2.test("a 1 c")) // true
      console.log(reg2.test("aFc")) // false

    </script>
  ```
### 元字符-限定符
- 对输入的特定字符数量进行限定,针对基本元字符的完善,例如数据要求有5-10个数字,单纯的\d解决不了
- 代码:(==认真看==)
  ```
    <script>
      // 1. * 0~多次
      var reg = /\d*/
      console.log(reg.test("abc")) //0个数字也行
      console.log(reg.test("abc1")) //1
      console.log(reg.test("abc12"))  //2

      //2. + 1~多次
      var reg2 = /\d+/ 
      console.log(reg2.test("abc"))  // X
      console.log(reg2.test("abc1")) 
      console.log(reg2.test("abc12"))  

      var reg3 = /\d/ 
      console.log(reg3.exec("abc123"))  // exec后面学 1
      console.log(reg2.exec("abc123"))  // 123

      // 3. ? \d? 代表有没有数字都行
      var reg = /\d?/
      console.log(reg.test("abc"))
      console.log(reg.test("abc1234"))
      
      // 4.{n} n为次数  实际个数 只能多不能少！
      var reg1 = /\d{3}/ // 连续三个数字及以上
      var reg2 = /p{3}/ // 连续三个p及以上
      var reg3 = /oh{3}/ // o后面必须连接三个h及以上
      var reg4 = /^oh{3}/ // o后面必须连接三个h及以上,且o在开头

      console.log(reg1.test("1234rrr"))
      console.log(reg2.test("oppp!!!"))
      console.log(reg3.test("   ohhh"))
      console.log(reg4.test("ohhh"))

      // 5.{n,} 代表>=n
        var reg = /\d{3,}/ // 连续的
      console.log(reg.test("abc1")) 
      console.log(reg.test("abc12")) 
      console.log(reg.test("abc123"))
      console.log(reg.test("abc1234")) 
    

      // 6.{n,m} n<=个数<=m   
      var reg = /x{3,5}/ // 连续的
      console.log(reg.test("xxxx1"))
      console.log(reg.test("xx1xx")) // X


      // 7.以上的所有* + ? {}等等,只能修饰一个字符，例如只能 /d{3}/,不能/ddd{3}/对三个字符进行修饰

      var reg = /abc{2}/ // 代表内容中必须包含 "abcc" (连续的)
      console.log(reg.test("#14q_ abcc Esdsfn")) // true

      // 8.exec 提前讲了: (可以捕获任意字符,不只有数字,后面还讲)
      // 1.exec()捕获个数 ： 在\d+可以捕获字符中所有，而在\d只能捕获第1个 (/d* 一个也捕获不到)
      // 2.在{n} {n,} {n,m}中,其捕获的个数规则很简单,分别为 个数=n,个数>=n和n<=个数<=m
      // 3. reg.exec(".....") 按照reg的正则表达式规则寻找特定字符或数字,并有个数的限制(第二条)
      var reg123 = /a{3,5}/
      console.log(reg123.exec("ui aaaa op123")) // aaaa

    </script>
  ```
### 元字符-特殊符号(组合)
- 最大区别:对字符串可以有正则要求.而非单个字符 第二:[]可以对字母,数字的范围进行规定
- 代码:
  ```
  <script>
      // 1.() 整体 ,可以对字符串设置正则,而非单个字符
      var reg = /(abc){2}/ // 两个相连接的abc字符
      console.log(reg.test("321abcabc123"))
      console.log(reg.test("321abc abc123")) // X

      // 2. | 或  （注意：|作为分隔符，把左和右都看作一个整体）
      var reg2 = /a|b/ // a或者b
      var reg3 = /(abc|def)/ // 代表要么abc 要么def
      var reg4 = /abc|def/ // 同样代表要么abc 要么def
      var reg5 = /abc|def|ghi/ 
      console.log(reg2.test("1a"))
      console.log(reg3.test("abc dedede"))
      console.log(reg4.test("abc dedede"))
      console.log(reg5.test("ghi"))

      // 3.[] 当字符串中有中括号里面的任意一个字符就对
      var reg = /[abcdef]/
      var reg = /[abcdef]{3,5}/ // 数量要求3-5
      console.log(reg.test("a_b"))
      console.log(reg.test("ovo"))
      console.log(reg.test("abvvv")) // 有a和b，但只有2个，false 
      console.log(reg.test("defvvv")) // def,有3个,true

      // [A-Z] [0-9] [a-z]表示一个集合范围

      // 4.[^abc] 取反，只要有一个不是abc就对，全是里面的数就错，区分与^[abc] 开头是abc中任意一个就对
      var reg2 = /[^abc]/
      console.log(reg2.test("abd")) // true
      console.log(reg2.test("aaa")) // false
        
    </script>
  ```
### 捕获exec()
- test()检查正则表达式是否达到要求,==而exec()是根据要求捕获片段==
- 代码:
  ```
  <script>
        //  test() 检查正则表达式是否达到要求 exec() 根据要求捕获片段
        var reg = /\d{3}/ // 要求

        console.log(reg.exec("abc1234")) // 123

        // 1.提取有价值的信息(主要用法)

        var datestr = "time is 2029-01-01"
        // 传化为这个格式  2029/01/01
        // 截出数字，转化数组，拼接/
        var reg2 = /\d{4}-\d{1,2}-\d{1,2}/  // exec(截取规则)
        var reg3 = reg2.exec(datestr) // 按照原格式，从信息中先截出数字
        console.log(reg3) // 现在是数组
        console.log(reg3[0].split("-").join("/")) // 以-把数组分割再按照分割用\连接起来，转化为字符串   
        
      
        
        // 2.标识符 写在/.../外面  g(全局调用,解决exec懒惰问题) i(忽略大小写)

        var datestr = "time is from 2029-01-01 12:20:20 to 2029-11-01 12:20:20"
        
        // var reg = /\d{4}-\d{1,2}-\d{1,2}/ 
        // 懒惰特性：这里exec只能调用第一次出现的符合条件的，后面的2029-11-01调不出来
        // 1.+g (在下一节,用match匹配比这个方便多了)
        var reg = /\d{4}-\d{1,2}-\d{1,2}/g // 可以依次调用两个符合条件的信息了
        var reg2 = reg.exec(datestr)  // 已经是数组了
        console.log(reg2) //2029-01-01
        var reg3 = reg.exec(datestr) 
        console.log(reg3) //2029-11-01
        var reg4 = reg.exec(datestr) 
        console.log(reg4) // null 都调用过了
        console.log(reg2[0].split("-").join("/"))
        console.log(reg3[0].split("-").join("/"))

        var reg5 = /(\d{4})-(\d{1,2})-(\d{1,2})/g  // 捕获全部后，另外的把()再次单独捕获
        var reg6 = reg5.exec(datestr) // 数组
        for(var i=0;i<reg6.length;i++){
            console.log(`reg6[${i}]` + reg6[i]) // ES6
        }
        
        // 2. +i
        var myreg = /[a-z]/i // 忽略大小写
        console.log(myreg.test("AAA"))

        //  ig可以写在一起 形如：/\d/ig

    </script>
  ```
### 正则表达式两大特性(懒惰和贪婪)
- 懒惰在上一节用g解决了,这节解决贪婪,使用?
- 代码:
  ```
  <script>
      //贪婪 使用?解决
      var reg = /\d{1,4}/
      console.log(reg.exec("abc1234bnn")) // 1-4都行，但exec就取4个，贪婪，永远取最多 1234
      var reg2 = /\d{1,4}?/
      console.log(reg2.exec("abc1234bnn")) // 不再贪婪 1

      // ?搭配使用  只要有选择范围的，都可以使用,取其范围最小值
      // *?=0 +?=1 ??=0 {n,}?=n {n,m}?=n  

      // 应用：截取代码片段
      var str = `<p class="p1"><h1><span></span></h1></p>`
      var mystr = /<p.*?>/ // 只截取前面的<p class="p1"> .代表任意字符
      console.log(mystr.exec(str))
    </script>
  ```
### 正则与字符串方法结合
- ==可以结合的字符串方法有三个 .replace() /.search() /.match()分别为替换,查找,匹配,**其中第三个最有用!**==
- 代码:
  ```
  <script>

      // 1.replace 替换
      var str = "abcaefa"
      var str1 = str.replace(/a/g,"*") // +g使用正则全局替换, a->*
      console.log(str1)

      // 2.search 查找字符的位置
      console.log(str.search("a")) // 第一个位置 0
      console.log(str.search(/bc/)) // 用不了g，不能全局查找,类似indexof查找字符串(一次性)
      console.log(str.search(/ax/)) // 找不到-1

      // 3.match 匹配内容 
      var datestr = "time is from 2029-01-01 12:20:20 to 2029-11-01 12:20:20"
      console.log(datestr.match(/(\d{4})-(\d{1,2})-(\d{1,2})/g)) // 一步到位,全局查找,返回数组

    </script>
  ```
### 密码强度案例(附插件)
- 在工作中我们能看懂正则表达式即可,通过edge的一个前端助手插件,直接拿过来用即可,不需要额外自己写.
- 代码:(不展示CSS代码了,逻辑就是通过正则判断输入的字符level,再通过level给相应的span加css属性(active对应着背景颜色的改变))
  ```
    <form action="">
        <input type="text">
        <p>
            <span>弱</span>
            <span>中</span>
            <span>强</span>
        </p>
    </form>

    <script>
      // 不偷懒的获取对象
      var oinput = document.querySelector("input") 
      var ospan = document.querySelectorAll("span")
      var reg1 = /\d/
      var reg2 = /[a-z]/i
      var reg3 = /[!@#$%^&*()]/
      oinput.oninput = function(evt){ // 表单事件:输入框内容改变时触发
          // console.log(this.value) // 1.this->oinput
          // console.log(evt.target.value) // 2.evt.target->input
          var level = 0 // 每次输入触发oninput事件都重置level,然后判断等级
          if(reg1.test(this.value)) level++
          if(reg2.test(this.value)) level++
          if(reg3.test(this.value)) level++
          console.log(level)
          for(var i=0;i<ospan.length;i++){
              ospan[i].classList.remove("active") //每次先都删除,然后再判断给谁加
              if(i<level){ // 很巧妙,如果说level = 1 那么只有i=0符合条件,正好只给ospan[1]加active,同理level=2,就给i=1和2(ospan[0]和ospan[1]加active属性)
                  ospan[i].classList.add("active") // 加css属性
              }
          }
      }
    </script>
  ```
## ES5补充(+PLUS)
### 严格模式
> ==**解释**==: 1.参数严格,没啥用,这种错不会犯
> 2.arguments的扩充,在kerwin的箭头函数中有提及,用的少,了解下
> 3.this指向问题,重要的,在事件PLUS中有笔记,这里更详细,还是那句谁调用指向谁
> 4.this->window在严格模式下为undefined,注意undefined不能被调取(.)
- 代码:
  ```
  <script>
        // 开启严格模式: (一旦出错绝不姑息)
        // "use strict" 只要这个字符串放在代码前方,后面的代码就会按照严格模式开启
        // 分为全局和局部两个模式,写在局部是局部(函数内),写在全局是全局(代码开头)

        // 1.严格模式 - 参数严格(指的是,不能有相同的参数,比如下面有两个b,这种错误一般不可能犯)
        function fnc(b,b,c){
            "use strict"
            console.log("1234567");
        }
        fnc(1,2,3)

        // 1.2 arguements 在函数中使用,可以获取多个参数
        // 这个关键字还可以访问当前函数本身
        function foo(){
            // arguments(了解) 伪数组对象,其中有一个属性可以找到函数本身callee   arguments.callee -> 一般应用于匿名函数之中
            "use strict"
            console.log(arguments); 
            // 在严格模式中被禁用了
            console.log(arguments.callee);

            // 2.arguments 可以不用形参获取传递过来的实参
            // 处理不定参数(不知道传过来几个参数)还是可以的,之后将伪数组换为数组 
        }
        foo()


        // 2.严格模式中对this指向严格
        // 我们之前的this都是在事件处理函数中用的,this就指向触发事件的dom对象
        // - this指向函数的调用者
        // - 通过(.)我们可以知道这个调用者是谁
        // 注意: 只有在函数调用时我们才知道this指向谁

        function foo(){
            console.log(this);
        }
        foo() // 如果直接调用,那么this->window

        var obj = {
            fn : function(){
                console.log(this);
            },
            name : "kerwin"
        }
        obj.fn() // this -> obj
        
        var fn = obj.fn //把obj的fn函数地址给fu
        fn() // 调用,由于是直接调用,所以this->window

        // 严格模式下 
        // 规定: 如果this指向window,则为undefined
        // undefined不能取出运算(.) 所以有时要注意window的取出运算在严格模式下会报错
    </script>
  ``` 
### this指向(扩充)
- ==ES6之前的this 关键字，谁调用this，this指向谁 （不同于ES6箭头函数的this==）
- ==**this常被放置于函数中,简单粗暴,谁调用的这个函数func,this就指向谁**==
- 代码:
  ```
    <div id="box">click
        <span>1234</span>
    </div>
    <script>
      // ES6之前的this关键字，谁调用this，this指向谁 （不同于ES6箭头函数的this）
      

      // 1. 全局中使用，指向的是window
      console.log(this)

      function test(){
          console.log(this)
      }
      window.test() // 写在全局中的函数，其实是挂在window上的
      //只不过调用时，window可以省略，你看上面的代码，就是windou调用的test(),所以this指向window
      test()

      // 2. 对象中使用
      var obj = {
          name : "kerwin",
          test : function(){
              console.log("123",this) // 既然this被obj调用，指向obj，那么可以通过给this添加属性以便于更多的使用obj的其他信息
              console.log("456",this.name) // this指向obj,那么this.name就是obj.name -> kerwin
          }
      }
      console.log(obj.test) // 打印一下对象中test(key)对应的value（就是函数整体内容）,这不是调用
      obj.test() // test被obj调用，test函数里面的this就指向obj


      // 3. setTimeout 86节学的
      setTimeout(function(){ // 倒计时定时器
          console.log("123",this) 
      },2000)
      setInterval(function(){ // 间隔定时器
          console.log("456",this)
      },2500)
      // 输出显示window，说明到时间后每次里面的函数都是由window调用的


      // 4. 事件绑定中使用 DOM0
      box.onclick = function (evt) { // 每次点击触发点击事件,都会自动执行box.onclick() 其实还是box调用了后面的函数，所以this指向box
          console.log(this) 
          //console.log(this.innerHTML) // 这样可以任意拿取里面的信息了
          // 在div里面有多个标签时,作为点击事件的默认参数evt,它的target指向的是点到的当前标签,而this一如既往的只指向调用他的对象box，两者不一定相同
          console.log(evt.target)  
      }
      
      // DOM2
      box.addEventListener("click",function(){
          console.log("123",this) // 依旧指向前面的对象box
      })


      // 在86 ，自定义选项卡的顺序，就是用的this根据特定对象取出其顺序值
    </script>
  ```
### 改变this指向

- 在面向对象中用
- 代码:
  ```
      <button id="btn">click</button>

      <script>

        var obj1 = {
            name: "obj1",
            getName: function (a,b,c) {
                console.log("getName1", this.name) // this->obj1
                console.log(`call或apply带入的形参${a} ${b} ${c}`)
            }
        }
        var obj2 = {
            name: "obj2",
            getName: function () {
                console.log("getName2", this.name) // this->obj2
            }
        }
        // 不干预this指向
        obj1.getName() // getName1 obj1
        obj2.getName() // getName2 obj2

        // 1. call 可以多个参数，第一个改变this指向，第二个是带入形参，注意代入的对象是obj1
        obj1.getName.call(obj2,1,2,3) // 把obj1里的getName里的this指向obj2对象，此时的this.name = obj2
        // 执行函数并改变this的指向
        // 这是指令，不改变本质信息，单独的obj1.getName()改啥样还啥样

        // 2.apply,与call的区别，只支持两个参数，第二个参数打包成数组
        obj1.getName.apply(obj2,[1,2,3])
        
        // 2.2
        var name = "123456789" // window全局定义的
        obj2.getName.call(window) //this指向window的name，为123456789

        // 3.bind 改了this，但不自动执行 , 其余的与call相同
        var fun1 = obj1.getName.bind(obj2,1,2,3) // 返回值为函数,所以用fun1为新函数承接返回值
        console.log(fun1) // 单纯打印fun1的内容,不执行
        fun1() // 手动执行,this指向已变,不会再指向window
        // bind的优势用法,绑事件改this的同时不立即执行
        btn.onclick = handler.bind(window) // 改变原函数handler的this指向，并且只有点击才会执行
        // btn.onclick = handler() 与 btn.onclick = handler ，前者自动执行，后者点击执行, 注意我们绑定事件都用后者,给一个函数+()就地标着执行此函数,和有没有点击无关了

        function handler(){
            console.log("this->window",this) 
        }

        // PLUS 里的解释(更清晰)
        // bind
        // - 语法 : fn.bind();
        // 注意 : fn.bind() 调用之后 , fn函数并没有被调用! 此时只是制定好了以后fn函数调用时this指向 , 指向哪里! 
        // - 参数 : fn.bind( this的新指向 [, 固定的参数1 [, 固定的参数2 ...] ]) 
        // 注意 : 这个工具的返回值才是重总之重!
        // - 返回值 : 返回了一个新函数 , 这个新函数调用的时候, 会让fn函数也被调用, 此时的fn this指向和参数都是我们在bind 调用时定义好的参数! 

        function foo( a , b , c ){
            console.log(this , a , b , c );
        }
        var obj = {
            name : "foo函数的this指向!",
            age : 123
        }
        // 使用bind创建一个新函数; 
        var bind_foo = foo.bind( obj , "你好"); // foo的this指向obj了,并且传入一个固定形参 a = "你好"
        // 注意 : 我们使用bind之后 函数调用就不再是函数本身调用了，而是使用bind返回值(新函数bind_foo)去调用; 
        // 如果我们传递实参, foo函数是可以接收到的，但是对应关系需要从固定的形参("你好")之后一一对应; 
        bind_foo( 10 , 20 ); //  b = 10 c = 20
        // 最后执行foo的打印函数,this指向obj,所以打印obj对象内容,而a b c三个参数也依次打印
    </script>

  ```
## ES6~ES13
### let,const与var(严谨并看向其他语言的规则)
- 之前的var太过于松散不严谨,与其它语言的规范格格不入
- ==let const 与 var 区别==: 
- ==**与其它语言规则对齐 = C**==
  1.必须先定义后使用,var无所谓
  2.不能重名,var是后面覆盖前面
  3.块级作用域,var定义的变量只有在函数内,才是局部变量,而在其他语言中,例如循环体内{...},条件语句体内{...}以及循环()或if()内,都是局部变量,let const解决这个问题,作用域被限制在{}内
  4. let 是 var 的完美升级版本   
   - let 声明的变量遵从的作用域规则是块级作用域 ; 
   - 函数作用域 : 只有函数的大括号才可以划定作用域; 
   - 块级作用域 : 只要有大括号就是作用域! 
   注意 :  let 关键字声明的变量才遵从块级作用域规则 , var 声明的关键字是函数作用域! 
- ==let 和 const 区别==:
  1.let定义变量,const定义常量,let定义的变量可以被赋值更新,const只有初始化的值,不能重新赋值(java里的final)
  2.注意,const对于复杂类型的数据,只有改变地址,才算违规,不改地址只改内容,不算对常量的修改(因为复杂类型只返回堆地址),并且不能重新赋值覆盖,通过前面学过内容可知,内容虽相同但是钥匙不同了(新开辟的地址,一覆盖原地址就变了)
  3.let可以先不初始化,const不行
- 代码:(有许多错误示范)
  ```
   <script>

      // 之前的是ES5
      // ES6 2015年的东西，增加了大量的东西，之后的ES789...每次增加的比较少

      // 新的定义变量方式 let const /// 老的 var


      // 一. let,const与var的区别

      // 严谨了,要先声明再使用
      console.log(a) // 1.不能在未定义的情况下引用
      let a = 100
      let a = 200 // 2.不能重名，var是后面的覆盖前面的

      // 3.var定义的变量的作用域只有函数function的{}大括号能限制住，形如if的大括号{}等其他的{}限制不住
      if(true){
          var i = 1
          console.log(i)
      }
      console.log(i) // 仍能访问到i,在别的语言中是不行的,i是局部变量,var就可以,很怪

      if(true){
          let i = 1 // 3.1块级作用域{}，只要是大括号就能框住定义的变量定义域
          console.log(i)
      }
      console.log(i) // 不能访问到i


      // 二. const与let 区别
      // 1.let 变量，可以随意更改其值 ，而const,常量只要设置后不能之后改变其值

      let name1 = "kerwin"
      name1 = "xiaoming"

      const name2 = "kerwin"
      name2= "xiaoming"

      // 2.对const的深度理解
      const obj ={
          name:"kerwin"
      }
      obj.name = "xiaoming" // 对象是复杂类型，数据存在堆里，而在栈有一个指针指向其地址，这里改的是堆的值，而非改变了指针的值
      // const 认定的是指针的值，而非堆的值，只要指针不变就能改
      console.log(obj.name) 
      obj = { // 只有这样直接对obj的指针改变，才会被const认定为不合法,这是给obj赋值一个新对象{}
          name:"kei2er" // 在堆里开辟新空间存储新值，并把一个新的指针赋值给obj对象
      }

      // 3. let可以先定义不初始化，const不行
      let b
      const c // X

    </script>
  ```
### 块级作用域案例(记住,86)
- 代码:
  ```
  for (let i = 0; i < oheaderitems.length; i++) {
      oheaderitems[i].onclick = function () { 
      //   唯一的用法,let会保存下每一次循环的值,不需自定义属性
          var index = i // 直接用
          for (var m = 0; m < oheaderitems.length; m++) { // 能可错杀不可放过，全删一遍
              oheaderitems[m].classList.remove("active")
              oboxitems[m].classList.remove("active")
          }
          oheaderitems[index].classList.add("active")
          oboxitems[index].classList.add("active")
      }
  }
  ```
### 箭头函数
- 1.写法简便
  2.this在箭头函数内规则不同于ES6之前的规则
- 代码:
  ```
    <input type="text" id="mytext">

    <script>
        var test1 = function () {
            console.log("test1")
        }
        // 箭头函数的写法
        var test2 = () => {
            console.log("test2")
        }
        test1()
        test2()

        // 箭头函数的特点：
        // 1. ()可以省略,条件是只有一个形参
        var test = a =>{
            console.log(a)
        }
        test("1")

        //2.{}可以省略，条件函数只有一句话/只有返回值(return也省了)
        var test = a => 100*a
        console.log(test(10)) // 1000

        var list = ["aaa","bbb","ccc"]
        var newlist = list.map(item => `<li>${item}</li>`) // 简写
        console.log(newlist.join(""))

        // 针对函数体是对象obj的情况，加个(),因为对象本身带{},让系统区分
        var test = () => ({
            name : "kerwin"
        })
        console.log(test())

        //3.箭头函数没有arguments
        var test = function(){ //  不写形参情况下,使用arguments在找形参(按顺序)
            console.log(arguments[0],arguments[1],arguments[2]) // 1 2 3
            // arguments是形参的伪数组
            console.log(Array.from(arguments)) // 转成真数组
        }
        test(1,2,3)

        // 4.this在箭头函数的作用域是父级函数,没有就是window

        mytext.oninput = function(){ 
            var that = this // 代存this
            setTimeout(function(){
                console.log(that.value) // 在set函数里直接用this，指向的是window,用that临时在外面存储this也可以实现效果
            },1000)
        }

        mytext.oninput = function(){
            
            setTimeout(() => {
                console.log(this.value) // 在箭头函数this作用域是父级函数(mytext)，所以this被其父级oninput调用的,不需要that
            },1000)
        }

        // 5.多讲一点题外话：函数的默认参数，防止后期忘记传参崩溃

        function test1(a=1,b=2){
            return a+b
        } 
            
        var test2 = (a=100,b=200) => a+b
        
        console.log(test1())
        console.log(test1(10,20))
        console.log(test2())

    </script>
  ```
### ES6的解构赋值(+PLUS)
- ==快速的从对象和数组中获取里面的成员==
- 代码:(分区快执行,let有定义重名的)
  ```
    <script>

        // 1.数组的解构赋值,使用的[]
        var arr = ["111", "222", "333"]
        let [x, y, z] = arr  // 只能把前面填满,把333解构赋值,要一一对应
        console.log(x, y, z) // 数组的成员就被简化为了x y z

        // 2.常用的交换方法,不用中间变量
        var a = 10, b = 20 // 不能用let,因为var可以重复定义
        var [b,a] = [a,b] // 重复定义
        console.log(a,b) 

        // 3.快速打印多维数组
        var arr2 = [1,2,[3,4,[5]]] // 多维度数组
        console.log(arr2[2][2][0]) // 5
        var [q,w,[e,r,[t]]] = arr2
        console.log(t) // 5

        // 4.在对象中使用,使用{}
        var obj = {
            name : "kerwin",
            age : 100,
            location : "shandong"
        }
        let {name,age,location : mylocation} = obj // 这些变量分别对应着对象中此变量名字的value,例如对象中name变量的value值赋值给解构中的value
        // 4.2第三个参数规避了直接打location这个window属性,他是把location的值存入了mylocation里面,以后打印mylocation时其值就为location的value
        console.log(name)
        console.log(age)
        console.log(mylocation) 

        // 5.复杂对象 对象成员内部存对象和数组
        var obj2 = {
            name:"jer",
            age:100,
            location:{
                province:"liaoning",
                city:"dalian"
            },
            hobby:[111,222,333]
        }

        var {
            name,
            age,
            location:{
                province,
                city
            },
            hobby:[n,m,k]
        } = obj2

        console.log(name,age,city,n,m,k)


      // 6.在ES6合并对象操作之中,提供了一个对象工具也可以用于对象合并 : 
      // 语法: Object.assign( obj1 , obj2 ....)
      // 作用是把obj2及以后的所有对象内容都合并到obj1上; 
      // 返回值是 obj1 ;

      // PLUS版解释(其中多了一个提取工具的用法,下面的Math提取)
      // - 对象解构; 
        // 把对象之中的某条数据取出 
        // let obj = { a : 10 , b : 20 , c : 30 };
        // 我们可以直接以属性名 命名我们的变量，根据变量名取出对象之中的数据; 
        // 声明变量 a 把 对象之中属性名为a的数据赋值给变量! 

        // 多个变量之间的声明可以用,分隔! 
        // let { a , b } = obj;
        // 1. 声明变量a;
        // 2. 把obj里面的a属性赋值给变量a;
        // console.log( a , b );

        ----------------提取------------------
        // 我们可以直接提取某些工具进行使用 , 不需要写前缀了! 
        // 注意 : 这种提取并不是所有的工具都适用的! 
        // let { abs , pow , PI } = Math;
        // console.log( abs(-100) , pow( 10 , 2 ) , PI );

        // 注意 : 如果我们在取出工具之后调用的时候报错那么我们就不要这么用了! 
        // let { reload } = location;
        // location.reload() 和 reload() 的区别在于内部的this指向; 
        // 不建议这么做 : reload.call( location );
        // reload();
        // reload.call( location );

        // 注意 : 我们在解构对象的过程之中是有改变变量名需求的; 
        // 语法 : let { 对象之中的key名 : 新的变量名  } = {} 
        // let obj = { a : 10 , b : 20 , c : 30 };
        // let { a : aaa } = obj;
        // console.log( aaa );


    </script>
  ```
### ES6对象简写
- 代码:
  ```
   <script> 

      mybtn.onclick = function(){

          // 通过id直接获取
          let username = myusername.value // input输入值
          let password = mypassword.value

          // var obj = { // 复杂写法
          //     username : username,
          //     password : password
          // }

          var obj = {
              username, // 1.当key与value相等时，写一个就行
              password
          }
                    
          console.log("发给后端",obj)
      }

      var obj1 = {
          a:1,

          // getName : function(){ // 复杂写法
          //     console.log(this.a)
          // }

          getName(){ // 2.对象的value为函数时的简写方法
              console.log(this.a)
          }
      }
      obj1.getName()

    </script>
  ```
### ES6展开运算符(内部有案例)
- 代码:(==内部含有更新数据的案例==)
  ```
  <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
    </ul>

    <h1>修改</h1>

    <input type="text" id="myusername">
    <input type="number" id="myage">
    <button id="mybtn">修改</button>
    <div id="box"></div>


    <script>
        // 展开运算符: ... (就是三个点)

        // 在数组中的应用：

        // 1.展开并合并数组成一个数组
        var a = [1,2,3]
        var b = [4,5,6]
        console.log(a.concat(b)) // 之前的方法
        console.log([a,b]) // 这种是数组里放入两个数组 => [[1,2,3],[4,5,6]]
        var c = [...a,...b] // => [1,2,3,4,5,6]
        console.log(c)

        //2 复制不改变东家的值,数组是复杂数据
        var a = [1,2,3]
        var b = a // 赋值的地址,会"连坐"
        //之前学的 .slice() .concat()
        var b = [...a] // 简化:新的数组，与原来的不是同一个地址
        // 注意数组内如果还存着复杂数据,更改时仍会影响原数据
        b[0] = "kerwin"
        console.log(a,b) // 1 kerwin

        //3. 在箭头函数中，代替arguments把形参传入数组使用
        var test = (...arr) =>{ // arguments是伪数组,...输出的是真数组
            console.log(arr) // 放入数组
        }
        test(1,2,3,4,5,6) // [1,2,3,4,5,6]

        var test1 = function(a,b,...arr){
            console.log(arr) // 把剩下的3456存在一起，但是...必须放在最后一位参数位置 [3,4,5,6]
        }
        test1(1,2,3,4,5,6) // [1,2,3,4,5,6]

        //4. 快速一一对应传参
        var arr = [1,2,3]
        var test = function(a,b,c){
            console.log(a,b,c)
        }
        // test(arr[0],arr[1],arr[2]) 
        test(...arr)

        // 6.后端传过开一个你不知道长度的数组，要你求最大值
        var arr = [21,32,54,66,141,457,1,426,77,2]
        var res = Math.max(...arr)
        console.log(res)

        //7.伪数组转换
        function test(){
            //var arr = Array.from(arguments)
            // 暴力:把伪数组的值复制到数组里
            var arr = [...arguments]
            console.log(arr)
        }
        test(1,2,3,4,5,6)

        var oli = document.querySelectorAll("li")
        console.log(oli) // 伪数组 Nodelist
        var oliArr = [...oli]
        console.log(oliArr) // 真数组 Array



        // 在对象中应用

        // 1.对象的合并
        var obj1 = {
            name:"kerwin",
            age : 100
        }
        var obj2 = {
            location : "dongbei"
        }
        var obj = {
            ...obj1,
            ...obj2 // 如果有同名的key，后面的会把前面的覆盖
        } 
        console.log(obj)

        // 应用场景，个人信息的修改
        // 假设obj是之前你的注册信息，已经存在数据库了
        var obj1 = {
            name : "kerwin",
            age : 110,
            location: "dalian",
            id : "1234567890" // 官方给每个用户的id，从后端随机生成，不重复 
        }

        // 刚进页面显示之前的注册信息
        function render({name,age,location}){ // 解构赋值,直接写在形参里,与传入的实参一一对应,就是obj的前三个参数,没有第四个参数id
            box.innerHTML = `name:${name},age:${age},location:${location}`
        }
        render(obj1)

        // 修改使用新的newobj数据覆盖之前的obj1的数据
        mybtn.onclick = function(){
            // 不填就不修改,如果填了就执行前面,如果没填那前面为null,就执行后面(原数据),防止不填数据的情况下把数据库的数据修改为空
            var name = myusername.value || obj.name 
            var age = myage.value || obj.age

            var newobj = {
                ...obj1, // 对原数据没影响,这里只是把数据复制过来了
                name, // key与value相同,对象简写,后面的覆盖前面的
                age
            }

            console.log(newobj) // 新的数据也应同时传给后端
            render(newobj) // 更改页面的信息
        }

    </script>
  ```
> 注意: 1 ...除了代替arguments,弥补箭头函数无法使用的缺陷,还有一个区别,...返回真数组,arguements返回伪数组

### 模块化语法(很重要,写项目必备)
- ==**模块化解决了三个痛点 1.私密不漏 2.重名不怕 3.依赖不乱**==
- 介绍: (==普通情况下==)
  ==私密漏==:我们在外面创建了a.js文件,内置三个函数方法,分别为 A1() A2() A_common(),它们的作用是:A1和A2分别实现某些功能,而A_common是在A1和A2的内部都会使用的一个大众函数,将js引入html文件后,我们执行A1和A2函数,但是A_common()也可以被调用,这是我们不希望看到的,如果A_common被更改,A1和A2就失效了,这就是私密性不好,即a.js的专有函数会被主文件调用
  ==怕重名==:简单说就是在外部引入两个js文件,巧合的是它们都有一个内置的test()函数方法,如果我们调用test,只会执行第二个js文件的test(后引入的js把前面的js中的重名test覆盖了),这就是怕重名
  ==依赖混乱==:引入三个js文件分别为a.js,b.js,c.js,其中a和b有方法A()和B(),而c也有自己的C(),但是c也调用了a和b的A()和B()方法,这时,js外部文件引入的顺序尤其重要,如果c.js引入先于a.js或b.js,会报错出现A()或B()在未定义情况下被调用,如果有多个js文件互相调用,我们需要理清它们之间的依赖关系来去更改引入顺序,这就很麻烦和混乱
- ==模块化写法(module):==
- ==私密不漏:==
    ```
    a.js:
      function a1(){
          a_common()
          console.log("a1布局创建")
      }
      function a2(){
          a_common()
          console.log("a2布局创建") 
      }
      function a_common(){
          console.log("a_common")
      }

      <------------解决方案------------>
      // 1.暴漏函数，里面写的才会被主文件调用,没有a_common,主部文件就调用不了
      export{ // 导出的是对象,只导出两个函数 a1和a2
          a1, // 简写,不简写为 a1(名字) : a1（函数）
          a2
      }

    主文件:
    <script type="module"> // module必须写
        // 要用live server打开文件，才会生效,不能是alt+b
        import {a1,a2} from '../125module_js/125a.js'
        // 语法: import{引入的} from '地址'
        a1()
        a2()
        a_common() // X
    </script>
    ```
- ==重名不怕:(只展示主文件,a和b的js导出就不展示了,一样的)==
  ```
    <script type="module">
        // 通过as重命名一下即可
        import {a1,a2,test as a_test} from '../125module_js/125a.js'   
        import {a1,a2,test as b_test} from '../125module_js/125b.js'

        a_test() // 执行a.js的test方法    
        b_test() // 执行b.js的test方法    
    </script>
  ```
- ==依赖不乱:(不在主文件里解决,在js内部解决)==
  ```
  c.js
  import {a1} from './125a.js'
  import {b1} from './125b.js'

  function c(){
    a1()
    b1()
    console.log("执行c.js程序")
  }

  export default c // 针对单个导出

  主文件:
  <script type="module">
      import c from '../125module_js/125c.js' // 不报错了
      import {a1,a2} from '../125module_js/125a.js'
      import {b1,b2} from '../125module_js/125b.js'
  </script>

  ```
- ==写法二:直接引入c.js并执行里面的代码,不需导出导入(module还是要写的)==
  ```
  c.js
  import {a1} from './125a.js'
  import {b1} from './125b.js'

  function c(){
    a1()
    b1()
    console.log("执行c.js程序")
  }

  主文件:
  <script type="module" src="../125module_js/125c.js">
      c()
  </script>
  ```
### ES6字符串与数值扩展
- ==字符串扩展==
- ==includes 检查是否含有字符串(常用)==
  ```
    let name = "kerwin"
    // 检查是否含有字符串(常用)
    console.log(name.includes('k')) // true
    console.log(name.includes('g')) // false

    // 支持多个参数,第二个参数是数字,从哪里开始查找
    console.log(name.includes('k',2)) // false
    // 是从索引2处开始查找k字符,索引从0开始,name[2]='r',显然后面没有'k'
  ```
- startsWith/endsWith
  ```
    // startsWith 判断字符是否以某字符串开头
    console.log(name.startsWith('ker'))
    console.log(name.startsWith('er'))

    // 同理支持第二个参数,给开头指定位置
    console.log(name.startsWith('er',1)) // 开头设置为name[1]='e',开头有'er'

    // endsWith 同理字符是否以XX结尾

    console.log(name.endsWith('win'))
    console.log(name.endsWith('wi'))

    // 指定结尾位置略微不同,不包含所写索引,即以索引前面的剩余字符为结尾
    
    // name[3]='w',由于不包含索引,所以实际结尾应当为r,而不是w
    // 字符串类似变为 'ker' (win)
    console.log(name.endsWith("r",3))
    console.log(name.endsWith("w",3))
  ```
- repeat 重复字符串X次
  ```
    console.log(name.repeat(2)) // 重复2次,返回新字符串
    console.log(name.repeat(0)) // 特殊: 重复0次 = 空字符串
    // 如果写小数点,会只截取整数部分
    // 如果写字符串,数字字符串,例如"4",他会转化好为Number类型; 但是如果是普通字符串,例如"aaa",那么转化为空字符串
  ```
>
- ==数值扩展==
- 1.支持多种进制的写法 ---> 转为十进制
- 进制的相关知识已经保存到edge收藏夹的'其他文件夹'内部,随用随看
  ```
    // 二进制 八进制 十进制 十六进制
    // 在二进制数的表示中，“0b” 是一种前缀，用于明确表示后面的数字是二进制数。
    // 十进制数一般没有前缀,就是我们常见的数字
    // 十六进制数通常用 “0x” 作为前缀，比如 “0x100” 表示十六进制的数字
    // 八进制数的前缀一般是 “0o”

    let num = 100 // 10
    let num1 = 0b100 // 2
    let num2 = 0o100 // 8
    let num3 = 0x100 // 16

    console.log(num)
    console.log(num1)
    console.log(num2)
    console.log(num3)
  ```
- 2.Number.isFinite / Number.isNaN
  ```
      // 在 JavaScript 中，isFinite() 是一个全局函数(挂载在window下的方法)，用于判断一个值是否为有限数。
      // 如果传入的值是有限数（包括正数、负数和零），则返回 true；如果传入的值是 Infinity（正无穷）、-Infinity（负无穷）或 NaN（非数字），则返回 false。
      // isFinite() 函数的参数可以是任何类型的值。当传入非数字类型的值时，函数会先尝试将其转换为数字类型，然后再进行判断。
      console.log(isFinite(5));  
      console.log(isFinite(-3.14)); 
      console.log(isFinite("0"));   
      console.log(isFinite(Infinity)); 
      console.log(isFinite(NaN));  
      // 输出结果依次为 true、true、true、false、false。

      // 而 Number.isFinite() 是 Number 构造函数的一个静态方法。它们的主要区别在于对非数字类型的处理。Number.isFinite() 不会尝试将非数字类型的值转换为数字，只有当参数本身是数字且为有限数时才返回 true, 它会把所有的非Number类型数据统一归为NaN,返回false
      console.log(Number.isFinite("10"));  // false

      // 同理 isNaN()：它是一个全局函数，用于判断一个值是否为 NaN（Not a Number，非数字）。当传入的值经过转换后为 NaN 时，返回 true；否则返回 false。
      // 这个函数会先尝试将传入的参数转换为数字，然后再判断是否为 NaN。例如，对于字符串 "abc"，isNaN("abc") 会先将 "abc" 转换为数字，由于无法转换为有效数字，得到 NaN，所以返回 true。对于布尔值 true，isNaN(true) 会将 true 转换为数字 1，所以返回 false。
      // Number.isNaN(): 它不会进行类型转换，要求传入的参数必须是数字类型。如果传入非数字类型的参数，如字符串 "abc"，Number.isNaN("abc") 会直接返回 false。只有像 Number.isNaN(NaN) 这样传入真正的 NaN 数字时，才会返回 true。

      // 对不同类型数据使用isNaN进行判断
      console.log(isNaN(5)); // false，因为5是有效的数字
      console.log(isNaN('abc')); // true，'abc'转换为数字是NaN
      console.log(isNaN('10')); // false，'10'能成功转换为数字10
      console.log(isNaN(true)); // false，true转换为数字1
      console.log(isNaN(null)); // false，null转换为数字0
      console.log(isNaN(undefined)); // true，undefined转换为数字是NaN
      console.log(isNaN(NaN)); // true，本身就是NaN

      // 对不同类型数据使用Number.isNaN进行判断
      console.log(Number.isNaN(5)); // false，5不是NaN且是数字类型
      console.log(Number.isNaN('abc')); // false，'abc'不是数字类型
      console.log(Number.isNaN('NaN')); // false，'NaN'是字符串不是数字类型的NaN
      console.log(Number.isNaN(NaN)); // true，本身就是数字类型的NaN
  ```
  - ==总结一下: isFinite和isNaN在全局和Number对象上的最大区别就是,在Number挂载的方法不能够转化字符串==
- 3.isinteger
  ```
    // 3. isinteger 在 JavaScript 中，Number.isInteger()是一个静态方法，用于判断一个数是否为整数。如果给定的值是整数（没有小数部分），则返回true；否则返回false。
    // 不支持字符串转化
    console.log(Number.isInteger("10"))
    // 特殊地 10.000 可以认定为整数,会截取; 但是10.001就不行了
    console.log(Number.isInteger(100))
    console.log(Number.isInteger(100.0))
    console.log(Number.isInteger(100.01))
    console.log(Number.isInteger("kerwin"))
    // // f t t f f 
  ```
- 4.==极小常量Number.EPISLON 比较有用的==
  ```
    // 计算机在处理浮点数运算时,无法精确,会带很多小数,这是计算机底层问题
    // 0.1 + 0.2 = 0.3 这是正常数学运算; 而在计算机中 0.1 + 0.2 != 0.3
    console.log(0.1+0.2) // 0.30000000000000004
    console.log(0.1+0.2 === 0.3) // false

    // // 使用极小常量判断,如果两者之间的差值小于极小常量,说明两者数值极其接近,认定为相等
    function isEqual(x,y){
        return Math.abs(x - y) < Number.EPSILON
    }

    console.log(isEqual(0.1+0.2,0.3)) // true
  ```
-  5.关于Math的相关方法 Math.trunc / Math.sign
  ```
    // 5.1 Math.trunc,将小数点抹掉,返回整数部分,单纯地取整数部分
    // parseInt parseFloat是字符串数据转Number数据的知识点,在js笔记/数据类型/转化数据类型
    
    console.log(Math.trunc(1.8)) // 1
    console.log(Math.trunc(-1.8)) // -1

    // 和向上取整向下取整 celi floor 有区别 (js笔记中/js内置对象/数字对象中有许多对于数字Math的运算方法)
    console.log(Math.floor(1.8)) // 向下取整,取小的, 1
    console.log(Math.floor(-1.8)) // 向下取整,取小的, -2
    console.log(Math.ceil(1.8)) // 向上取整,取大的, 2
    console.log(Math.ceil(-1.8)) // 向上取整,取大的, -1

    // 5.2 Math.sign 判断数值为 正数+1,负数-1,0就是0,-0就是-0,不是数字NaN(支持字符串转化,如果是数字字符串还是可以先转化为Number再判断的) 布尔true->1 false->0 undefined->NaN 
    // 不再举例了

  ```
### ES6数组扩展
- 1.==扩展运算符 ... (讲过的)==
  ```
      let arr1 = [1, 2, 3]
      let arr2 = [4, 5, 6]
      let arr3 = [...arr1, ...arr2]
      console.log(arr3)
      // 只能浅赋值,也就是一维数组,多维数组的赋值需要递归,这里不讲
  ```
- 2.批量解构赋值 (==有一定用处==)
  ```
    let myarr = [1, 2, 3, 4, 5, 6]
    let [a,b,...c] = myarr
    // a=1 b=2 c=[3,4,5,6](剩下的)
  ```
- 3.Array.from() 转化数组 ==有一定应用==
  ```
    // 之前学习参数arguments把参数转化为类似数组格式(不是数组类型,数组的方法不能用)
    function test(){
        console.log(arguments) // 只可读,不具备数组方法,不是数组类型 [[Prototype]]:Object
        let arr = Array.from(arguments)
        console.log(arr)
    }
    test(1,2,3,4)
    ---------------------------------
    // 还有个用法,通过querySelectAll获取的dom节点,也不是数组类型,转化为数组类型,可以结合map映射等数组方法做些操作
    let olis = document.querySelectorAll("li")
    console.log(olis) // [[Prototype]]: NodeList
    let olisArr = Array.from(olis)
    console.log(olisArr)

  ```
- 4.Array.of 将一组值转化为数组
  ```
    // 就是打补丁 Array方法
    let arr1 = Array(1,2,3)
    let arr2 = Array.of(1,2,3)
    console.log(arr1,arr2) // 在多参数下没问题
    // 当只有一个参数时
    let arr3 = Array(3) // 创建3个空位的空数组
    let arr4 = Array.of(3) // 数组[3]
    console.log(arr3,arr4)
  ```
- 5.find findIndex() 数组上的方法,对标字符串方法 indexOf()和 lastindexOf (注意: lastfind lastfindIndex是ES13的方法)
  ```
  let arr = [0,-2,3,5,4]

  let res = arr.find(function(item){
      return item>3
  })

  console.log(res) // 5,找到大于3的第一个值,从前往后
  // findIndex用法和find一摸一样,就是返回的是索引,不是值

  // findLast findLastIndex 从后往前找,其余的一样 --- ES2022 ES13
  ```
- 6.fill 快速填充相同的内容
  ```
    let arr = new Array(3).fill("kerwin")
    console.log(arr)
    // fill支持覆盖,可以把原有数据覆盖,也可以设置参数规定覆盖/填充具体哪一项
    let arr1 = [1,2,3]
    console.log(arr1.fill("kerwin",1,2)) // 包前不包后,即从索引1开始到索引2,最后把2变为'kerwin'
  ```
- 7.==扁平化(重要)== flat() flatMap() ==把二维数组-->一维数组(例如 [1,2,3,[4,5]] ---> [1,2,3,4,5])== 以往用lodash库
  ```
     let arr = [
            ["安阳", "安庆", "鞍山"],
            ["北京", "保定", "包头"]
      ]

      console.log(arr.flat()) // ['安阳', '安庆', '鞍山', '北京', '保定', '包头']

      // 在实际应用中,往往数据是在对象中,这时使用flatMap()

      let data = [
          {
              name: "A",
              list: ["安阳", "安庆", "鞍山"]
          },
          {
              name: "B",
              list: ["北京", "保定", "包头"]
          }
      ]

      console.log(data.flatMap(function(item){
          return item.list // 指定好对每一项的那个属性扁平化(数组所在的属性list)
      }))
  ```
### ES6对象扩展
- 1.对象简写 key=value时,就写一个即可,还有关于函数的简写方法(==非常常见==)
  ```
    let name = 'kerwin'
    let obj = {
        name, // name:name
        test1(){  // 原写法: test1 : function(){....}
            console.log('test1')
        },
    }
  ```
- 2.对象属性表达式 ["key"] : value 重要 (==偶尔会用的==)
  ```
    let name = "studentName"
    let classes = "class"
    let obj = {
        [name] : "xiaoming", // 内部支持变量
        [classes + "A1"] : "1班" // 支持简单的字符串拼接
    }
    console.log(obj)
  ```
- 3.对象的扩展运算符 ... ==很常见==,把对象解体扩展
- 其实这是ES9的方法,es6也有方法,但是我们不用了,这个新的...太好用了
- ==至此,数组和对象都有'...'运算方法,效果都一样的,统一了==
  ```
    let oldData = {
      name : "xiaoming",
      score : 100
    }

    let newData = {
      score : 90, // 覆盖旧成绩
      age : 12 // 添加新信息,年龄
    }

    console.log({...oldData,...newData})
    // es6中是一个叫Object.assign的方法(不用这个,不讲),后来为了统一和数组的展开运算符,就都可以用...了
  ```
- 4.Object.is() 相当于 ===, =有个弊端,无法判断NaN, == ===都不行
  ```
    // 所以新增这个方法打补丁
    console.log(Object.is(10,10))  // t
    console.log(Object.is(10,"10"))  // f
    console.log(Object.is({},{}))  // f 对象复杂类型,地址不同
    console.log(Object.is(NaN,NaN)) // t
    // 冷门,还可以判断 +0===-0 真没啥用
  ```
### 函数扩展
- 1.函数参数默认值(默认初始化) ==很有用==
  ```
    function ajax(url,method="get",async=true){
        console.log(url,method,async)
    }

    ajax("/aaa","get",true)
    ajax("/bbb")
  ```
- 2.rest参数 剩余参数
  ```
    function test(...data){ // 也可以单独获取+剩余获取 x,y,...data --> x=1,y=2,data=[3,4,5,6]
      // 上面意为直接获取所有的参数,并放入数组;
      // 相比于arguments,这个data是数组类型
      console.log(data)
    }

    test(1,2,3,4,5,6)
  ```
- 3.name属性,可以拿到函数的名字,没用
  ```
    console.log(test.name) // test函数的名字为test,没用
  ```
- ==**箭头函数相关知识,已经有了,这是重点**==

### PLUS ES6新结构 Set
- 之前kerwin提到过
- 代码:
  ```
        // set结构: 很像数组,但是set中没有相同的数组,有相同的会被自动合并
        // 1.创建set结构
        let set = new Set()
        console.log(set) // 长度表示不再是length 而是size

        // 2.向set结构之中存储数据,有两种方法,插入的形式不同!
        // - 2.1建立时直接放入数据 参数可以是数组,字符串
        let set2 = new Set([1,2,3,4,5,6,1,1,1,2,2,2]) // 会默认去重
        let set3 = new Set("hello world ") // 重复的字符串也会去重 hello world ,空格都能给你去重
        console.log(set2);
        console.log(set3);

        let arr = [...set2]
        console.log(arr);

        // 1.可以轻松实现数组去重实现
        let arr2 = [1,1,1,2,2,3,3,3,4,4]
        arr2 = [... new Set(arr2)]
        console.log(arr2);
        // 2.同理字符串去重先转化为数组,再通过.join("")转化回字符串
        let str = "aaaaabbbbbbccccccdddeee"
        str = [... new Set(str)].join("")
        console.log(str);

        // - 2.2通过set工具 set.add() 放入数据
        // 但是整条数据为一项,而不像第一种方法一样,拆开成单个的
        let set4 = new Set()
        set4.add("hello world")
        set4.add("你好 世界")
        // console.log(set4)
        // 2.2.1注意:set中 NaN是重复的
        console.log(NaN === NaN) // 在外面,NaN不相等,false 
        set4.add(NaN) 
        set4.add(NaN)
        // console.log(set4); // 但是在set里,添加两条NaN后,只保留一个,另一个视为重复
        // 2.2.2注意set中对象是不重复的,因为地址不同
        set4.add({})
        set4.add({})
        console.log(set4)
        
        // 3.set转化为数组类型
        // - 方法1 Array.from(set) 返回值为数组
        let set5 = Array.from( new Set(set2))
        console.log(set5);
        // - 方法2 ...(展开运算符) 在上面


        // 4. set的方法工具 
        // 除了set.add()插入数据
        // 4.1 set.has() 判断当前结构中是否存在某条数据,返回ture或false
        // 4.2 set.delete() 删除set中的某条数据

        // 5.set遍历 :  for of 
        let set6 = new Set([1,2,3,4,5,6,7])
        for(let x of set6.keys()){ // set6.keys()是迭代器 set6.values()也行
            console.log(x) 
        }
  ```

### PLUS ES6新结构 Map
- 它和数组的map方法不是一回事
- 代码:
  ```
        // map 
        // 很像对象, 对象的key值必须是字符串, map的key值是任意数据; 

        // 1. 创建map结构; 
        let map = new Map();

        // 2. 向map结构之中放入数据 : 
        // - 使用set工具; 
        map.set("key", "value");
        let obj = {};
        map.set(obj, "hello world")
        // console.log( map );

        // 3. 取出map结构之中数据 ； 
        // - 使用 get工具; 
        let res = map.get("key")
        //console.log( res );
        let res2 = map.get(obj);
        // 注意 : 如果map类型的key值是引用类型，我们一定要注意引用类型的地址! 
        // console.log( res2 );
        //  console.log( map.size );

        // - map有判定是否存在数据的工具 has
        // has判定的是key值
        //console.log( map.has("key") );
        // - map有删除数据的工具; 
        map.delete("key")
        // console.log(map);
        // - 清除全部数据的工具; 
        // clear
        map.clear();
        // console.log(map);

        // 4. map结构的遍历 : 
        // - map需要使用for of 进行遍历; 

        // map可以遍历不同的部分 : 
        // - 遍历key值部分; 
        // - 遍历value值部分; 
        // - 遍历key,value 

        let map2 = new Map();
        map2
            .set("key1", "value1")
            .set("key2", "value2")
            .set("key3", "value3")
        // console.log( map2 );
        // 获取所有的key值，放在新结构之中输出; 
        let keys = map2.keys();
        // keys 返回值是新结构, 我们可以把这个东西变成数组; 
        // [...keys]
        // console.log( keys, [...keys] );
        for(let key of keys ){
            console.log( key );
        }
        // 遍历数据部分; 
        let values = map2.values();
        for(let value of values ){
            console.log( value );
        }
        // 遍历完整部分 ; 
        let entries = map2.entries();
        for(let [key , value] of entries ){
            console.log( key, value );
        }
  ```
## jQuery
### 初始jquery
- jquery可以从官网下载代码保存到本地文件夹中(==我选的这个,保存进lib/jquery.min.js中==); 也可以CDN网络引入
- 之后在html文件中先行引入,就可以使用了,如下
  ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <!-- 引入jquery文件,已下载在本地 -->
        <script src="lib/jquery.min.js"></script>
    </head>
    <body>
        <script>
            console.log($)
            console.log(jQuery)
            console.log($===jQuery) // 一样的对象,简写就是$
        </script>
    </body>
    </html>
  ```
  > 注意: jquery的所有操作基于$或者jQuery进行,为了方便,选择前者
### jquery选择器
- 选择器分为三种
  - 1.基本选择器: 进似乎css的用法
  - 2.特殊选择器: 合乎js逻辑的选择方式,不再以css语法为基准
  - ==3.筛选方法: 对节点进行二次筛选==
- html:
  ```
    <ul class="list">
        <li class="start">111</li>
        <li>222</li>
        <li class="active">333</li>
        <li>444</li>
        <li class="end">555</li>
        <li>666</li>
        <li>777
            <ul>
                <li>7-111</li>
                <li>7-222</li>
                <li>7-222</li>
            </ul>
        </li>
    </ul>

    <div id="box">aaa</div>
  ```
- 1.基本选择器:
  ```
    // 基本选择器的选择方式照搬css选择html节点的语法
    // 例如下面的例子
    console.log($("ul li")) // 返回伪数组,只可读
    console.log($("#box")) // id #
    console.log($("ul li:nth-child(1)")) // 第一个li
    console.log($("ul li:first-child")) // 第一个li
  ```
- 2.特殊选择器:
  ```
    // 合乎js逻辑的选择方式,不再以css语法为基准
    console.log($("ul li:first")) // 第一个li
    console.log($("ul li:last")) // 最后一个li
    console.log($("ul li:eq(0)")) // 取第一个li,合乎js索引逻辑,索引从0开始
    var index = 2
    console.log($(`ul li:eq(${index})`)) // 支持动态化 ES6
    console.log($("ul li:odd")) // 选择奇数 按索引选 其中0为偶数
    console.log($("ul li:even")) // 选择偶数 
  ```
- 3.==筛选方法 对节点进行二次筛选==
  ```
    console.log($("ul li").first()) // 先选出ul内部的li,在选择处第一个li
    console.log($("ul li").last()) // 先选出ul内部的li,在选择处最后一个li

    // 以后链式操作时,二次筛选很有用,第一次筛选可能做些操作,然后再从经过操作的节点中选出特定节点进行2次操作
    // $("ul li").removeclass().first().添加class()
  ```
- 3.1 对ul li的常规操作
  ```
    var index = 3
    console.log($("ul li").eq(index)) // 响应式

    console.log($("ul li.active").next()) // 选择这一项的下一项
    console.log($("ul li.active").nextAll()) // 选中当前节点后面所有的兄弟
    console.log($("ul li.active").nextAll(".end")) // 选中当前节点后面所有的兄弟中class为end的节点

    console.log($("ul li.active").prev()) // 选择这一项的上一项
    console.log($("ul li.active").prevAll()) // 选中当前节点前面所有的兄弟
    console.log($("ul li.active").prevAll(".start")) // 选中当前节点前面所有的兄弟中class为start的节点
    
    // 注意: 选中的首尾都不包含
    console.log($("ul li.active").nextUntil()) // 从class=active的节点开始选择,没写内容就是直到结束 
    console.log($("ul li.active").nextUntil(".end")) // 从class=active的节点开始选择,直到结束 class=end的节点结束 

    console.log($("ul li.active").prevUntil()) // 从class=active的节点开始选择,向前选择直到结束 
    console.log($("ul li.active").prevUntil(".start")) // 同理,从class=active的节点开始选择,向前直到class=start节点结束

    console.log($("ul li.active").index()) // 获取索引
  ```
- 3.2 ul li 的关于父/子,祖宗/后代
  ```
    console.log($("ul li.active").parent()) // 找这个节点的父节点 ul
    console.log($("ul li.active").parents()) // 找这个节点的所有前辈(祖宗都给你找出来) ul body html(直到这里)

    console.log($("ul li.active").siblings()) // 找这个节点所有的兄弟(除了自己) 

    console.log($("ul.list").children()) // ul(class="list")所有的孩子,亲儿子,往里面找一层
    console.log($("ul.list").find("li")) //  ul(class="list")所有的孩子(li),后代,一直找到底
    // 注意: 涉及深度查找的方法,性能损耗较大,不推荐
  ```
### jquery操作样式
- 操作样式就是操作css
- html:
  ```
    <div id="box" style="width: 100px;"></div>

    <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
    </ul>
  ```
- 1.==css() 获取,内部写想要获取的css属性==
  ```
    console.log($("#box").css("width")) // 100px
    console.log($("#box").css("height")) // 100px
    console.log($("#box").css("background-color")) // rgb()
  ```
- 2.==设置css css(属性,属性值)==
  ```
      $("#box").css("width","200px")
      $("#box").css("height",200)// 省略写,直接数字
      $("#box").css("background-color","red")
  ```
- 3.多个节点加css样式(==不用for循环一个个加,多方便啊==)
  ```
    $("ul li").css("color","red") // 隐式迭代,隐藏地进行for循环迭代
    $("ul li:eq(2)").css("background-color","yellow") // 结合css选择器,对特定的标签进行css样式设置
  ```
- 4.批量设置css,多个样式,包装进入对象(==只适用于对少量的节点设置,多了麻烦,看下节==)
  ```
    $("ul li:eq(4)").css({width:200,height:300,backgroundColor:"yellow"})
  ```
### jquery操作class
- html:
  ```
    <div id="box">active</div>

    <ul>
        <li class="aaa">111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
    </ul>
  ```
- style: ==css提前预制好了==
  ```
    <style>
      .active{
          background-color: yellow;
          color: red;
      }
    </style>
  ```
- ==直接添加class,附带着css属性也就添加上去了==
  ```
    $("#box").addClass("active") // 给这个节点添加class active
    $("#box").removeClass("active") // 给这个节点删除class active

    // 同样支持隐式迭代
    $("ul li").addClass("active")
    $("ul li").removeClass("active")
  ```
- ==小型应用: 选项卡案例的截取==
  ```
    // 之前选项卡案例,点击到的选项卡加样式,其他的没有样式,由于不知道上次点击的谁,所以给当前点击的添加前,先把所有的样式都删除
    $("ul li").removeClass("active").eq(3).addClass("active") // 假设点击的第四项(索引3)
    // 还有别的思路,比如先给点击项添加好样式,再把它所有的兄弟的样式全部删除
    $("ul li").eq(3).addClass("active").siblings().removeClass("active")
  ```
- 额外补充属性hasClass toggleClass,==其中后者更有用==
  ```
      // hasClass 判断有没有class aaa 
      console.log($("ul li:eq(0)").hasClass("aaa")) // true
      console.log($("ul li:eq(1)").hasClass("aaa")) // false

      // toggleClass 切换 --- 有就删除,没有就添加上 (相对于hasClass实现了自动化添加与删除)
      $("ul li:eq(0)").toggleClass("active") // 第一项li没有class active,所以就加上
  ```
### jquery操作内容
- html:
  ```
    <div id="box">
        <div>
            111111
            <p>2222
                <span>3333</span>
            </p>
        </div>
    </div>

    <ul class="list1"></ul>
    <ul class="list2"></ul>

    <input type="text">
  ```
- ==就三种,html() text() val(),看代码==
  ```
    // html()和text()也会隐式迭代
    // 1.html() innerHTML 带标签的内容
    console.log($("#box").html()) // box-div内部的所有内容

    var arr = ["aaa","bbb","ccc"]
    // 设置html内容,对等innerHTML
    var listr = arr.map(item=>`<li>${item}</li>`).join("")
    $("ul.list1").html(listr) // 设置好html内容
    
    // 2.text() innerText 只有文本内容,没有标签
    console.log($("#box").text()) // 纯文本
    $("ul.list2").text(listr) // 当作纯文本放进去,这种更安全,如果内容有攻击脚本,html()会执行,而text只是会把文本显示出来


    // 3.val() value 表单form的一些输入内容
    console.log($("input").val()) // 获取input输入框的输入内容
    // val()只能精准获取,不存在隐式迭代
    // 同理可以给input设置内容,val()内部写什么就设置成什么,虽然可以统一设置多个input,但是毫无意义,还是要精准设置
  ```
### jquery操作属性
- ==分为原生属性和自定义属性,主要有attr和prop两个方法==
- html:
  ```
    <!-- id原生 index自定义 -->
    <div id="box" index="1">1111</div>

    <button id="btn">click</button>
  ```
- js:
  ``` 
    // 设置自定义属性,比如存储索引等
    // 默认不成文的规定(推荐): attr() 操作自定义   prop() 操作原生属性
    // 接下来都试试
    // 1. attr() 获取与设置
    console.log($("#box").attr("id")) // 获取原生id属性值box
    console.log($("#box").attr("id","box2")) // 设置原生id属性值为box2,不过设置完id后,后面的再写链式代码根据最前面的$("#box")就获取不到这个节点了(改名了) || 或者后面另起的新代码再获取#box也获取不到了

    // 对button设置disabled属性 设置为禁用
    $("#btn").attr("disabled",true)

    console.log($("#box").attr("index")) // 获取自定义属性index属性值1
    console.log($("#box").attr("index","2")) // 设置自定义属性index属性值为2

    // 1.2 移除操作 removeAttr() 先移除自定义的,否则先移除id后无法获取这个节点了,如何再找到这个节点进而移除自定义属性呢?
    console.log($("#box").removeAttr("index")) // 移除自定义
    console.log($("#box").removeAttr("id")) // 移除原生id (很少这么操作)

    ------------------------------------------------------------

    // 2. prop() 只能设置原生属性,不能操作自定义属性
    console.log($("#box").prop("id")) // 获取原生id属性值box
    console.log($("#box").prop("id","box2")) // 设置原生id属性值为box2

    // prop实际上可以设置自定义属性,只不过不是在标签里,而是添加到div本身的属性里(设置到对象身上了),经过设置后,再获取标签的自定义属性又可以获取到设置再对象身上的属性值了,同时删除自定义属性又可以把这个属性从div中踢出去

    // 移除功能 removeProp
    console.log($("#box").removeProp("id")) // 移除原生属性,发现不行,不过也不推荐移除原生属性这种操作
  ```
  > ==总结: 为了平衡功能,attr主要用于自定义属性的设置与清除; prop主要用于原生属性的设置与清除,**实际上: attr全能,prop鸡肋**==
### jquery操作偏移量
- style:
  ```
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    div{
        width: 100px;
        height: 100px;
        margin: 50px;
        background-color: yellow;
        /* 子绝父相,子p绝对定位,父div就要相对定位 */
        position: relative; 
    }
    p{
        position: absolute;
        width: 50px;
        height: 50px;
        left: 0;
        top: 0;
        background-color: red;
    }
  </style>
  ```
- html: 
  ```
    <div id="box">
        <p></p>
    </div>
  ```
- ==offset()  获取距离文档流左上角的letf和top,如果传参就是设置这些值==
  ```
    console.log($("#box").offset()) // 相对于文档流左上角 left:50 top:50 (margin设置了50px)
    // 设置: 距离左上角文档流各100px,不会受之前的margin=50px影响,相当于div又向右向下各走了50px,而margin不受影响还是50px
    // 具体操作是又给标签加了relative相对定位去根据设置的offset()来更改div的位置
    $("div").offset({ 
        left:100,
        top:100
    })

    console.log($("p").offset()) // 还是50 50,它不管你是什么定位,就看你距离文档流左上角的top和left值

    // 设置left top 结果还是只看距离文档流左上角的top和left值
    $("p").offset({ 
        left:100,
        top:100
    })
  ```
  - 设置div-box的offset图
  [![pA4nSvq.png](https://s21.ax1x.com/2024/11/26/pA4nSvq.png)](https://imgse.com/i/pA4nSvq)
  - 设置div内部p标签的定位offset图
  [![pA4mz2n.png](https://s21.ax1x.com/2024/11/26/pA4mz2n.png)](https://imgse.com/i/pA4mz2n)
  > ==总结: offset的获取和设置,不受任何定位影响,只看你获取的dom节点距离文档流左上角的top和left值(偏移量);== 
- ==针对有绝对定位的  position()方法==
  ```
    // position
    console.log($("p").position()) // 0 0 根据定位,p(绝对定位)相对于父标签(相对定位)的偏移量,只适用于子绝父相的情况
    console.log($("div").position()) // 0 0 由于是相对定位,且没有设置top left值,所以没有意义
  ```
  > ==但是position不支持设置==
### jquery获取元素尺寸
- style:
  ```
    <style>
      div{
          width: 100px;
          height: 100px;
          padding: 10px;
          margin: 100px;
          border: 2px solid red;
          /* display: none; */
      }
    </style>
  ```
- html : `<div></div>`
- js:
  ```
    // 关于获取元素尺寸的原生js方法
    // offsetWidth offsetHeight content + padding + border
    // clientWidth clientHeight content + padding 
    // 并且设置display:none之后,就获取不到这个值了

    // 拿到的content内容的宽高 width() height()
    console.log($("div").width(),$("div").height()) 
    // 和原生的区别: 即使设置了display: none;,照样能获取content的值

    // 1.padding + content的宽高 innerWidth innerHeight 约等于 clientWidth clientHeight的能力
    console.log($("div").innerWidth(),$("div").innerHeight()) // 120 120 padding左右上下都有

    // 2.padding + content + border outerWidth outerHeight 约等于 offsetWidth offsetHeight的能力
    console.log($("div").outerWidth(),$("div").outerHeight())

    // 3.padding + content + border + margin  独有的
    console.log($("div").outerWidth(true),$("div").outerHeight(true))

  ```
> 相对于原生的offsetWidth和clientWidth方法,还可以获取更全面的padding + content + border + ==margin== 全家桶界别元素尺寸
### jquery事件
- html:
  ```
    <ul>
        <li>111
            <button>del</button>
        </li>
        <li>222
            <button>del</button>
        </li>
        <li>333
            <button>del</button>
        </li>
        <li>444
            <button>del</button>
        </li>
    </ul>

  ```
- ==on() 全能添加事件函数,**事件委托部分是重点**==
  ```
      // 1.on() 内部写监听事件类型和事件处理函数   隐式迭代
      $("ul").on("click",function (){ // 冒泡机制依旧存在
          console.log("ul click")
      })
      $("ul li").on("click",function (){
          console.log("li click")
      })

      // 2.事件委托,委托给父元素做
      // 事件委托依据冒泡机制,给ul添加'点击'事件委托,这样即使后来新添加li进入ul标签,也不用管这个li是否有点击事件,他的点击行为会委托给父ul处理
      // on 冒泡针对特定元素button才会触发冒泡
      $("ul").on("click","button",function (){ // 冒泡机制依旧存在
          console.log("ul click")
          // console.log(this) // this就是事件源target,button标签
          // console.log(this.parentNode.remove()) // 混合用法(演示,不推荐) 通过this获取到button节点,借此找到其父li,可以删除掉
      })

      // on 支持传参数(必须是对象格式)
      $("ul").on("click",{name:"kerwin"} , function (e) { 
          // console.log(e)
          console.log(e.data) // 拿到参数
      })

      // on 事件委托+参数(随意,可以直接写字符串,不必是对象)
      // 记得按顺序, 事件类型 目标元素 传递的参数 回调函数
      $("ul").on("click","button", "kerwin" , function (e) { 
          // console.log(e)
          console.log(e.data) // 拿到参数
      })

  ```
- one()
  ```
    // one和on很像,唯一区别: on每次点击都触发,one只触发一次,触发后自动解绑事件(例如应用与抽奖系统) 
    $("ul").one("click",function(){
        console.log("ul")
    })
  ```
- ==jQuery封装了一些常用的事件处理函数==
- ==**常用方法函数 click mouseover mouseout blur change input ....**==
  ```
    // 简化写法,支持链式写法
    $("ul li").click(function(){
        console.log("li")
    }).mouseover(function(){
        console.log("mouseover")
    })

    // 支持传参(对象)
    $("ul li").click({ name: "kerwin" }, function (e) {
        console.log("li", e.data)
    }).mouseover({ name: "kerwin" }, function (e) {
        console.log("mouseover", e.data)
    })
  ```
  > 注意: 不支持事件委托,事件委托还是靠on()方法
- ==事件解绑 off(): 内部写解绑的事件类型==
  ```
    $("ul li").off("mouseover")
    $("ul li").off("click")
    // 不写参数就默认全清
    $("ul li").off()

  ```
- ==给原生的节点加事件,比如document(**不是jQuery对象**),放入$(),转为jquery对象再使用各种绑定事件==
  ```
    $(document).mousemove(function(){
        console.log("move")
    }).click(function(){
        $(document).off() // 点击后解绑document的所有事件
    })
  ```
  > ==\$()常用于\$(this),获取点击事件默认target==
- ==解绑特定的函数==
  ```
    // 对特定函数解绑,支持第二个参数,为'要解绑的事件处理函数名'
    function a(){
        console.log("a")
    }
    function b(){
        console.log("b")
    }
    $("ul li").on("click",a).on("click",b)
    $("ul li").off("click",a) // 只解绑a函数
  ```
### jquery选项卡案例
- 看看代码和注释,使用的链式语法,一行等于多行
- css:
  ```
    *{
        margin: 0;
        padding: 0;
    }
    ul{
        list-style: none;
    }
    .header{
        width: 500px;
        display: flex;
    }
    .header li{
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid black;
    }
    .box{
        /* 子绝父相 */
        position: relative;
    }
    .box li{
        position: absolute;
        left: 0;
        top: 0;
        width: 500px;
        height: 200px;
        background-color: yellow;
        display: none;
    }
    .header .active{
        background-color: red;
    }
    .box .active{
        display: block;
        background-color: aqua;
    }
  ```
- html:
  ```
    <ul class="header">
        <!-- 导航 -->
        <li class="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <ul class="box"> 
        <!-- 内容 -->
        <li class="active">111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
    </ul>
  ```
- js:
  ```
    // 选项卡案例,原js代码已经删除,如需复习思路,去86_2.html

    // 1.隐式迭代,所有头部li添加click点击事件
    $(".header li").click(function(){
        // console.log(this) // 获取事件源 li标签
        // this属于原生节点,不具有jquery的方法,所以要转化为jquery对象,和转化document一样, $()
        // 下面操作一句话完成了复杂的功能,给当前li添加class,同时给兄弟li删除class
        $(this).addClass("active").siblings().removeClass("active")

        // 可以获取当前li节点在ul中的索引,然后映射到box-li里面,这是一一对应的
        // 或者可以练习attr(),使用自定义标签去完成此功能
        // console.log($(this).index())
        var index = $(this).index()
        // $(".box li").eq(index).addClass("active").siblings().removeClass("active")
        // 思路2: 先移掉所有的,在给当前的加上
        $(".box li").removeClass("active").eq(index).addClass("active")

    })

    // 新知识: 触发事件方法 trigger() 内部写事件类型,功能是自动触发这个事件 
    // 一些油猴脚本插件代码就是使用trigger()方法,模拟人的功能,在浏览器的终端执行,操纵页面进行自动化点击等行为,比如智慧树刷课

  ```
### jquery鼠标跟随案例
- 看代码:
- css:
  ```
     * {
            margin: 0;
            padding: 0;
      }
      /* box相对定位 p绝对定位 p的定位坐标参考父元素,这时可以用offsetX/Y实现 */
      #box {
          width: 200px;
          height: 50px;
          margin: 50px;
          background-color: yellow;
          position: relative;
      }
      
      #box p {
          width: 300px;
          height: 200px;
          background: red;
          /* 有了子绝父相,才能参考父,去对子的top和left(css属性)进行更改并有效!!! */
          position: absolute;
          left: 100px;
          top: 100px;
          display: none;
          
            /* 穿透: 鼠标打上去也不触发事件,防止鼠标在p上触发事件,会出现频繁闪现,我们只想要事件只在box身上触发 */
            /* 注意: 虽然也只是被box附上事件没给p,但是根据上节课见到的"冒泡现象",p也会触发 */
          pointer-events: none;
          
          /* 如果p层级低被其他div挡住，就是用这个属性单独设置一下层级 */
          /* z-index: 100; */
      }
  ```
- html:
  ```
    <div id="box">
        kerwin
        <p>kerwin jie shao</p>
    </div>
  ```
- js:
  ```
    // 鼠标跟随案例 101

    $("#box").mouseover(function(){
        $(this).children("p").css("display","block")
    })
    $("#box").mouseout(function(){
        $(this).children("p").css("display","none")
    })

    $("#box").mousemove(function(evt){
        $(this).children("p").offset({
            // offset相对于文档流左上角
            // 1.pageX/Y相对于document的左上角,在没有滚动条下和offset指向一致
            left: evt.pageX,
            top: evt.pageY

            // 2.clientX/Y相对于文档流左上角
            // left: evt.clientX,
            // top: evt.clientY

            // 而注意 offsetX/Y,是鼠标相对于此box元素的左上角的距离,不要和jquery的offset()方法混淆

            // 详细知识于js笔记 事件及其进阶/事件对象/事件对象之鼠标对象的位置属性
        })
    })

  ```
### jquery动画
- ==**基本动画**==: 
  - ==传参==: 动画持续时间 动画效果 回调函数(动画执行完后)
  - 动画效果 默认2个 swing (开头结尾慢,中间快) linera(匀速) 其余动画效果需要插件
  - ==高度封装,开箱即用==
    - show() hide() 显示隐藏(默认左上角为起点和终点) toggle() 开关
    - slideDown() slideUp() 卷轴拉伸 同理 slideToggle() 开关
    - fadeOut() fadeIn() 渐隐渐出 同理 fadeToggle 开关 fedeTo()指定透明度
  >
  - 1.show() hide() 显示隐藏
    ```
      <button id="myshow">显示</button>
      <button id="myhide">隐藏</button>
      <button id="mytoggle">切换</button>
    
      $("#myshow").click(function(){
          $("#box").show(1000,"swing",()=>{
              console.log("显示完成")
          })
      })
      $("#myhide").click(function(){
          $("#box").hide(1000,"swing",()=>{
              console.log("隐藏完成")
          })
      })
      $("#mytoggle").click(function(){
          $("#box").toggle(1000,"swing",()=>{
              console.log("切换完成")
          })
      })
    ```
  - 2. slideDown() slideUp() 卷轴拉伸
    ```
    <button id="myup">卷上</button>
    <button id="mydown">卷下</button>
    <button id="slideToggle">切换</button>

    $("#myup").click(function(){
        $("#box").slideUp(1000,"swing",()=>{
            console.log("上")
        })
    })
    $("#mydown").click(function(){
        $("#box").slideDown(1000,"swing",()=>{
            console.log("下")
        })
    })
    $("#slideToggle").click(function(){
        $("#box").slideToggle(1000,"swing",()=>{
            console.log("切换完成")
        })
    })
    ```
  - 3. fadeOut() fadeIn() 渐隐渐出
    ```
    <button id="myfade">渐隐</button>
    <button id="myfadeout">渐出</button>
    <button id="fadeToggle">切换</button>
    <button id="fadeTo">fadeTo 0.5</button>

    $("#myfade").click(function(){
          $("#box").fadeOut(1000,"swing",()=>{
              console.log("现")
          })
      })
    $("#myfadeout").click(function(){
          $("#box").fadeIn(1000,"swing",()=>{
              console.log("隐")
          })
    })
    $("#fadeToggle").click(function(){
          $("#box").fadeToggle(1000,"swing",()=>{
              console.log("切换完成")
          })
    })

    // 注意: 透明度变为0.5后,前面的三个按钮失灵
    $("#fadeTo").click(function(){
        $("#box").fadeTo(1000,0.5,"swing",()=>{
            console.log("透明度-->0.5")
        })
    })
    ```
- ==**2.综合动画**==
  - ==无法完成的动画:==
    - 1.不支持没有过渡的样式,比如display的block与none的切换
    - 2.颜色变化不支持
    - 3.不支持transform(translateX/Y)
  - 新增第一个参数: 目标值(动画目标)
    ```
      $("#myanimate").click(function () {
          $("#box").animate({
              // 记得style样式 + 定位
              left: "100px",
              top: 100,
              borderRadius: "150"
          }, 1000, "swing", () => {
              console.log("完成")
          })
      })
    ```
  - ==结束动画 stop() 点击完后,动画运动到哪里,就停止在哪里==
    ```
      $("#myanimateStop").click(function () {
            $("#box").stop().animate({
                top: 300,
                borderRadius: "150"
            }, 2000, "swing", () => {
                console.log("完成")
            })
      })
    ```
  > stop()会在其他动画调用之前调用,实现动画的'切换' (链式)
  - finish() 点击后,无论动画执行到哪个阶段,立即完成
    ```
      $("#myanimateFinish").click(function () {
            $("#box").finish().animate({
                top: 300,
                borderRadius: "150"
            }, 2000, "swing", () => {
                console.log("完成")
            })
      })
    ```
### jquery树状菜单
- ==注意的点: 冒泡的问题,css样式的伪元素使用==
  ```
    css:
    ul,
        ol {
            list-style: none;
        }
        /* 二级菜单默认隐藏 */
        ol{
            display: none;
        }

        /* 伪元素,方便+/-之间的切换,且不需要标签承载,即使后续添加新li元素时,也会自动附带,不需要额外加标签 */
        li::before {
            content: "+"
        }

        li.active::before {
            /* 带active的li标签前面是'-' */
            content: "-"
        }

    html:
    <ul>
        <!-- 一级菜单 ul-li -->
        <!-- 点到那个标签,就附带active的样式,并且展开二级菜单 -->
        <li>111
            <ol>
                <!-- 二级菜单 li-(oi-li) -->
                <li>111-1</li>
                <li>111-2</li>
                <li>111-3</li>
            </ol>
        </li>
        <li>222
            <ol>
                <li>222-1</li>
                <li>222-2</li>
                <li>222-3</li>
            </ol>
        </li>
        <li>333
            <ol>
                <li>333-1</li>
                <li>333-2</li>
                <li>333-3</li>
            </ol>
        </li>

    </ul>

    js:
    // 卷轴下拉过程中,会自动把display none--->block
    // 1.允许同时展开
    // $("ul>li").click(function(){
    //     // 点击的一级菜单+变-,下拉二级菜单,最后使用toggle开关切换
    //     $(this).toggleClass("active").children("ol").slideToggle(500)
    // })

    // 2.同一时间只允许展开一个菜单那
    $("ul li").click(function(){
        $(this).toggleClass("active").children("ol").slideToggle(500)
        // 其他兄弟,移除一级菜单的active同时卷上二级菜单
        $(this).siblings().removeClass("active").children("ol").slideUp(500)

        // 阻止冒泡,阻止ol li内的事件行为冒泡到ul li上面,否则点击二级菜单也会触发一级菜单的事件处理函数,会把菜单都收了 (也可以使用evt阻止事件冒泡)
        // 注意: this只指向附带事件的li节点,如果ul>li(只给亲儿子li加事件),当点击ol内部没有事件的li时,this还是会指向ul的li(此ol li的父节点li),这样就无法阻止ol内的li冒泡了
        // 解决: ul>li(ul的亲儿子li) ---> ul li(ul的后代li),这样ol内的li都有事件了,再次点击ol内的li时,this就指向这个点击的ol内li,针对它阻止冒泡即可,这样ol li行为不会传递到ul li,就不会收起菜单,同时二级菜单继续执行一级菜单的操作,看看有没有可展开的三级菜单
        return false
    })
  ```

### 手风琴案例
- 手风琴案例主要是对动画animate的stop的应用
  ```
    css:
    *{
        margin: 0;
        padding: 0;
    }
    ul{
        width: 640px;
        height: 550px;
        margin: 200px;
        border: 5px solid red;
        display: flex;
    }
    ul li{
        width: 160px;
        overflow: hidden;
    }
    img{
        height: 100%;
    }

    html:
    <ul>
        <li>
            <img src="./lib/img/1.jpeg" alt="">
        </li>
        <li>
            <img src="./lib/img/2.jpeg" alt="">
        </li>
        <li>
            <img src="./lib/img/1.jpeg" alt="">
        </li>
        <li>
            <img src="./lib/img/2.jpeg" alt="">
        </li>
    </ul>

    js:
    // 对173动画课程中的stop()方法的应用
    // 如果不加stop,会记录你鼠标每一次触发的动画,然后不紧不慢地依次执行,即使鼠标已经不再上面了,俗称放电影
    // 加stop是为了防止放电影的效果,再执行自己的动画之前,先停掉之前的动画,这也是stop()的标准用法 .stop().animate()
    $("ul li").mouseover(function(){ // 进入
        $(this).stop().animate({
            width:520
        }).siblings().stop().animate({
            width:40
        })
    })

    // 阻止冒泡 mouseleave在孩子触发时不会冒泡到父身上,而mouseout的孩子行为会冒泡到父身上
    // 这就是mouseleave和mouseout的最本质区别
    $("ul").mouseleave(function(){ // 出去
        $("ul li").stop().animate({
            width:160
        })
        console.log("mouseout")
    })
  ```
### 滑动选项卡
- 简单应用:
  ```
    css:
     *{
          margin: 0;
          padding: 0;
      }
      ul{
          list-style: none;
          display: flex; 
          position: relative;
      }
      ul li{
          height: 50px;
          line-height: 50px;
          text-align: center;
          width: 100px;
          position: relative;
          /* 高层级,显示在div上层 */
          z-index: 100;
      }
      ul div{
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 50px;
          background-color: skyblue;
          border-bottom: 3px solid red;
      }

    html:
      <ul>
        <li>111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
        <li>555</li>

        <div></div>
    </ul>

    js:
    $("ul li").mouseover(function(){
        // console.log($(this).index())
        // 防止放电影, + stop()
        $("ul div").stop().animate({
            left:$(this).index()*100
        },200)
    })

  ```
### jquery节点操作
- jQuery封装的这些操作有更好的兼容性
- ==动态创建/插入/删除/替换/克隆节点的操作==
- ==1.创建与插入==
  ```
    css:
    .kerwin {
            height: 50px;
    }

    html:
    <div id="box">
        <div>1111</div>
    </div>

    js:
    // 1.创建 + 插入(append appendTo往后面追加)
    // 创建记得加<> 否则当作选择器用了
    var odiv = $("<div>hello first kerwin creat</div>")
    var odiv = $("<div>") // 空标签div
    // 之前学习的东西都可以往上加
    var odiv = $("<div>").html("<b>is b</b>").addClass("kerwin").css("background","yellow")
    $("#box").append(odiv)

    // 1.2插入与创建混合,最后加appendTo(插入目标)
    $("<div>").html("<b>is b</b>").addClass("kerwin").css("background","yellow").appendTo($("#box"))

    // 往前面追加 prepend prependTo 其余一摸一样
    var odiv = $("<div>").html("<b>is b</b>").addClass("kerwin").css("background","yellow")
    $("#box").prepend(odiv)

    $("<div>").html("<b>is b</b>").addClass("kerwin").css("background","yellow").prependTo($("#box"))

    // -------------------------------------------------------------------
    // 另一种插入,同级插入
    var odiv = $("<div>hello</div>")
    // 1.在div-box前面插入,而非插入里面
    $("#box").before(odiv)

    odiv.insertBefore($("#box"))

    // 在div-box后面插入
    $("#box").after(odiv)

    odiv.insertAfter($("#box"))
  ```
- ==2.删除与替换==
- ==删除==
  ```
  html:
    <div id="box">
        <div>1111111</div>
        <div>2222222</div>
    </div>

  js:
    // 1.remove() 删除自己
    $("#box div").eq(0).remove()        

    // 2.empty() 删除内部
    $("#box").empty()
    // 等价于
    $("#box").html("")
  ```
- ==替换==
  ```
     <div id="box">
        <p>1111111111</p>
        <span>22222222</span>
        <span>22222222</span>
        <span>22222222</span>
        <div>3333333333</div>
    </div>

    // 1.替换 replace() 前提是创建出来新节点,用新节点去替换
    // 支持多个替换
    var odiv = $("<div>hello</div>")
    $("#box span").replaceWith(odiv) // span-->odiv

    // 写法2: odiv要代替box内部所有的p标签
    odiv.replaceAll($("#box p"))
  ```
- 克隆(不重要)
  ```
  html:
    <div id="box">
        <ul>
            <li>111111</li>
            <li>111111</li>
            <li>111111</li>
        </ul>
    </div>

    <div id="center">分割线
        <hr>
    </div>
  
  js:
  // 克隆 .clone() 
  // 克隆需要选择位置插入,目标把box克隆一份放入分割线下面
  // 连id都一样,可以通过prop更改id的值 (prop设置原生属性 attr设置自定义属性)
  // 克隆的新对象可以接受任意的更改,没有限制 
  // $("#box").clone().prop("id", "box").css("color","red").insertAfter($("#center"))

  $("#box").click(function(){
      console.log("box click") // 点击ul或li都会通过冒泡传递到父元素box上来,执行事件
  })
  $("#box ul").click(function(){
      console.log("ul click") 
  })

  // clone的参数: 第一个参数 true/false; 不写参数默认不克隆原对象的事件
  // 如果只有一个参数,即认定克隆所有的事件, 如果第二个参数(也是布尔)写false,就不会克隆box孩子的事件了
  // $("#box").clone(true).prop("id", "box").css("color","red").insertAfter($("#center")) 
  // 不存在 false true参数组合(父不克隆,科隆子), 结果是啥也没克隆出来
  $("#box").clone(true,false).prop("id", "box").css("color","red").insertAfter($("#center")) // 无 ul click
  ```
### 节点操作案例
- 动态todoList表案例 (==**重点是事件委托机制,动态给新增节点添加事件处理函数**==)
  ```
    html:
    <ul id="list">

    </ul>

    js:
    var arr = ["111", "222", "333"] // 后端传的数据 ajax
    // 给数组,根据数组创建节点,然后附带删除的功能,留言板和tolist小案例的思路亦是如此

    for (var i = 0; i < arr.length; i++) {
        $(`<li>${arr[i]}
            <button>del</button>
            </li>`).appendTo($("#list"))
    }

    //这样的写法有弊端,即后期添加的li不具备事件,因为js代码早就执行完事件添加的代码了
    // $("#list button").click(function(){
    //     // console.log($(this).parent())
    //     $(this).parent().remove()
    // })

    // 事件委托的方式 on()绑定的事件处理,且只处理由button标签冒泡上来的行为
    // 这样的好处是即使后期添加性的li+button,那也遵循冒泡机制,最后button点击后可以触发事件函数
    $("#list").on("click","button",function(){
        console.log($(this).parent().remove()) // 事件源不变
    })
  ```
### jquery之ajax请求
- ==使用json-server插件模拟后端,在lib文件夹内启动终端输入: `json-server ./test.json --watch`==
- 封装后的ajax请求,极大简化了原生httpXML fetch等原生网络请求的繁杂,且支持promise
- html:
  ```
    <button id="myget">get</button>
    <button id="mypost">post</button>
    <button id="myput">put</button>
    <button id="mypatch">patch</button>
    <button id="mydelete">delete</button>
  ```
- js: ==get post put patch delete 基本用法==
  > ==先行提醒: 除了get请求和delete之外,post put patch等发送数据都需要配置请求头,请求头为"application/json",告知伪后端(json-server)你传递的参数是JSON数据==
- ==get 请求数据==
  ```
    $("#myget").click(function(){
        $.ajax({
            url: "http://localhost:3000/users",
            // async: true  // 是否异步,必须是异步,可以省略
            data:{ // 传参
                username:"xiaoming" // 会自动根据请求方式拼接响应的格式,比如get: http://localhost:3000/users?username=xiaoming
            },
            method: "get", // 默认就是get
            // headers: {} // 请求头,get不需要
            // dataType: "string/json" // 不用写,自动判断返回类型,如果是字符串,那就返回字符串; 如果是json字符串,就转化为json对象
            // 成功或失败调用的函数 神似promise的.then()和.catch()
            success: function(res){
                console.log("请求成功",res)
            },
            error: function(err){
                console.log("请求失败",err)
            },
            // timeout: 30000 // 超时30s自动报错 不太常用
        })
    })
  ```
- ==post 插入数据==
  ```
    $("#mypost").click(function () {
        $.ajax({
            url: "http://localhost:3000/users",
            // async: true  // 是否异步,必须是异步,可以省略
            data: JSON.stringify({ // 传参，先转换为JSON字符串
                username: "kiki",
                password: "123"
            }),
            method: "post",
            headers: { // 请求头
                // 默认支持,不用写,有三种请求头
                "content-type": "application/json"
            },
            // dataType: "string/json" // 不用写,自动判断返回类型,如果是字符串,那就返回字符串; 如果是json字符串,就转化为json对象
            // 成功或失败调用的函数 神似promise的.then()和.catch()
            success: function (res) {
                console.log("请求成功", res)
            },
            error: function (err) {
                console.log("请求失败", err)
            },
            // timeout: 30000 // 超时30s自动报错 不太常用
        })
    })
  ```
- ==put 覆盖数据==
  ```
    $("#myput").click(function () {
            $.ajax({
                url: "http://localhost:3000/users/2", // 写好id,把id=2的数据给覆盖修改
                // async: true  // 是否异步,必须是异步,可以省略
                data: JSON.stringify({ // 传参，先转换为JSON字符串
                    username: "kerwin6666",
                    password: "888"
                }),
                method: "put",
                headers: { // 请求头
                    // 默认支持,不用写,有三种请求头
                    "content-type": "application/json" // 告知服务器端发送的数据是 JSON 格式
                },
                // dataType: "string/json" // 不用写,自动判断返回类型,如果是字符串,那就返回字符串; 如果是json字符串,就转化为json对象
                // 成功或失败调用的函数 神似promise的.then()和.catch()
                success: function (res) {
                    console.log("请求成功", res)
                },
                error: function (err) {
                    console.log("请求失败", err)
                },
                // timeout: 30000 // 超时30s自动报错 不太常用
            })
        })
  ```
- ==patch 只会对应更新某些属性,不写的就不更新,原模原样留着==
  ```
    $("#mypatch").click(function () {
        $.ajax({
            url: "http://localhost:3000/users/2", // 写好id,把id=2的数据给覆盖修改
            // async: true  // 是否异步,必须是异步,可以省略
            data: JSON.stringify({ // 传参，先转换为JSON字符串
                username: "kerwin12345",
            }),
            method: "patch",
            headers: { // 请求头
                // 默认支持,不用写,有三种请求头
                "content-type": "application/json" // 告知服务器端发送的数据是 JSON 格式
            },
            // dataType: "string/json" // 不用写,自动判断返回类型,如果是字符串,那就返回字符串; 如果是json字符串,就转化为json对象
            // 成功或失败调用的函数 神似promise的.then()和.catch()
            success: function (res) {
                console.log("请求成功", res)
            },
            error: function (err) {
                console.log("请求失败", err)
            },
            // timeout: 30000 // 超时30s自动报错 不太常用
        })
    })
  ```
- ==delete==
  ```
     $("#mydelete").click(function () {
        $.ajax({
            url: "http://localhost:3000/users/2", // 写好id,把id=2的数据删除
            // async: true  // 是否异步,必须是异步,可以省略
            // 不需要data和headers
            method: "delete",
            success: function (res) {
                console.log("请求成功", res)
            },
            error: function (err) {
                console.log("请求失败", err)
            },
            // timeout: 30000 // 超时30s自动报错 不太常用
        })
    })
  ```
- ==**promise风格 把函数--> then()和catch()即可**==
  ```
    // 以get为例
    $("#myget").click(function(){
        $.ajax({
            url: "http://localhost:3000/users",
            // async: true  // 是否异步,必须是异步,可以省略
            data:{ // 传参
                username:"xiaoming" // 会自动根据请求方式拼接响应的格式,比如get: http://localhost:3000/users?username=xiaoming
            },
            method: "get", // 默认就是get
        })
        .then(res=> {
            console.log(res) 
            // return Promise对象
        })
        .catch(err=> console.log(err))
    })

    // async await 以post为例
    $("#mypost").click(async function () {
        // 等待异步请求完再进行下一步
        var res = await $.ajax({
            url: "http://localhost:3000/users",
            // async: true  // 是否异步,必须是异步,可以省略
            data: JSON.stringify({ // 传参，先转换为JSON字符串
                username: "kiki",
                password: "123"
            }),
            method: "post",
            headers: { // 请求头
                // 默认支持,不用写,有三种请求头
                "content-type": "application/json"
            }
        })
    })
  ```
- ==**jquery对get和post请求设置封装方法 \$.get() \$.post()**== 
- ==同样支持primise风格==
  ```
    // 2参数: url 传入参数 
    $("#myget").click(function () {
        $.get("http://localhost:3000/users",
            { username: "xiaoming" }
        ).then((res) => console.log(res))
            .catch(err => console.log(err))
    })


    // 2参数: url 传入参数 
    $("#mypost").click(async function () {
        var res = await $.post("http://localhost:3000/users",
            JSON.stringify({
                username: "kiki",
                password: "123"
            })
        )
    })
  ```
### jsonp请求 
- ==**jsonp是跨域请求数据的一种方式,不属于ajax,但是jq把它们封装到一起了**==
- ==来自菜鸟的jsonp官方接口==: `https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=kerwin`
- ?前面的都是地址,?后面定义了回调函数用来接受响应数据
- 写法1:
  ```
    // 下面的操作实际是: 动态创建了script标签并设置好了src的地址,配置了全局回调函数接受数据
        
    function kerwinTest (res){
        console.log(res)
    }

    // 写法1:
    $.ajax({
        url: "https://www.runoob.com/try/ajax/jsonp.php",
        dataType: "jsonp", // 原来请求ajax时,可以不写,会自动检测json还是字符串; 这里必须写,返回数据规定为jsonp
        jsonp:"jsoncallback", // 回调参数(承接回调函数的)
        jsonpCallback: "kerwinTest" // 回调函数
    })

  ```
- 写法2: ==更简单,支持success和promise的.then/.catch,更加像ajax请求==
  ```
    // 写法2: 可以不写回调函数,他会自动生成,然后再success里面接受请求成功的数据,把jsonp做出了ajax请求的感觉
    $.ajax({
        url: "https://www.runoob.com/try/ajax/jsonp.php",
        dataType: "jsonp", // 原来请求ajax时,可以不写,会自动检测json还是字符串; 这里必须写,返回数据规定为jsonp
        jsonp:"jsoncallback", // 回调参数(承接回调函数的)
        success: (res)=>{
            console.log(res)
        }
    })

    // .then .catch的promise风格也支持
  ```

### ajax钩子函数
- ==**钩子函数会在ajax某个阶段自动执行的函数 每一个ajax请求都会被触发**==
- ==比如 vue的拦截守卫,axios的拦截器等都是如此==
  - 例子: axios的拦截器就是钩子函数,专门在发送前(成功/失败),发送后(成功/失败),供4个阶段拦截,这些钩子函数会提前运行,然后再默认执行这个阶段的其他函数
- ==全局钩子,全局即会影响到所有的ajax请求 $(window) 把window转化为jquery对象,再全局挂载==
- ==1.ajaxStart ajaxStop==
  ```
    $(window).ajaxStart(function(){
          // 只会执行一次,后面ajax发送也不会执行了,只针对第一个ajax
          // 这个ajax发送之前执行不关心第一个ajax发送是否成功,成不成功照样发
          console.log("当前页面作用域 第一个ajax发送之前执行")
          console.log("显示loading")
      })
    // 与ajaxStart对称,最后一个ajax发送结束执行
    $(window).ajaxStop(function(){
        console.log("当前页面作用域 最后一个ajax发送结束执行")
        console.log("隐藏loading")
    })
  ```
  > ==**注意: 这两个钩子的函数作用域是同一瞬间的ajax**==,即同一时间瞬发5条ajax,第一条和第五条充当ajaxStart和ajaxStop的执行依据ajax,就以这5个为一组;
  > ==但是如果1条1条或几条几条慢慢发送(**例如通过点击按钮,这些ajax们不是同一时刻瞬发的),那么它们是不同组的,每一组有自己的ajaxStart和ajaxStop**==
- ==2.ajaxSend==
  ```
    $(window).ajaxSend(function(){
            console.log("每一个ajax发送之前执行")
    })
  ```
- ==3.ajaxSuccess ajaxError ajaxComplete==
  ```
     $(window).ajaxSuccess(function(){
            console.log("每一个ajax发送成功之后执行")
      })

      // ajax请求失败
      $(window).ajaxError(function(){
          console.log("每一个ajax发送失败之后执行")
      })

      $(window).ajaxComplete(function(){
          console.log("无论成功或失败,每一个ajax发送之后执行")
      })
  ```
  > 注意: ==**这个函数是后置的**,也就是ajax请求内的success函数先执行,再执行这个钩子函数==
  > ==对比axios拦截器,它是前置的,先执行钩子函数,再执行默认ajax回调函数等==
  > 后置用的比较少了,因为都比默认函数慢了,拦截作用等于没有,特别是ajaxError,有时候我们用钩子函数捕获特定的错误进行处理,而不是上来就报错再捕获,那样控制台就会报错,程序会被截停
- js:
  ```
    // 发送2个ajax请求以供测试
    // pageNum = 1
    $.ajax({
        url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=6474864",
        headers: {
            "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"1732761370359020611239937","bc":"110100"}',
            "X-Host": "mall.film-ticket.film.list"
        },
        success: function (res) {
            console.log(res.data.films)
        }
    })   
    // pageNum = 2
    $.ajax({
        url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=2&pageSize=10&type=1&k=6474864",
        headers: {
            "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"1732761370359020611239937","bc":"110100"}',
            "X-Host": "mall.film-ticket.film.list"
        },
        success: function (res) {
            console.log(res.data.films)
        }
    })   
  ```

### loading案例
- loading是一个全屏半透明的div,在第一个ajax发送前显示,在最后一个ajax发送结束后隐藏
- ==css就不写了==
- html:
  ```
    <button id="btn1">第一页</button>
    <button id="btn2">第二页</button>
    <button id="btn3">第三页</button>
    <ul id="list"></ul>

    <div id="loading">
        <div>
            正在加载中....
        </div>
    </div>
  ```
- ==js:==
  ```
    $("#btn1").click(function () {
            getList(1)
    })
    $("#btn2").click(function () {
        getList(2)
    })
    $("#btn3").click(function () {
        getList(3)
    })

    getList(1) // getList()函数不能写在ajax钩子函数前面, 为何? 因为请求数据的时候,全局钩子还没有挂载,所以getList()需要在$()挂载的后面
    // 所以建议钩子函数的代码要靠前,如上head标签内

    // 使用$.ajax的钩子函数
    $(window).ajaxStart(function () {
        console.log("显示loading")
        $("#loading").css("display", "block")
    })
    $(window).ajaxStop(function () {
        console.log("隐藏loading")
        $("#loading").css("display", "none")
    })

     function getList(num) {
        $.ajax({
            url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${num}&pageSize=10&type=1&k=6474864`,
            headers: {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"1732761370359020611239937","bc":"110100"}',
                "X-Host": "mall.film-ticket.film.list"
            },
            success: function (res) {
                console.log(res.data.films)
                render(res.data.films)
            }
        })
      }

      function render(list) {
        var newList = list.map(item =>
            `
                <li>
                    <img src="${item.poster}" alt="">
                    <div>${item.name}</div>
                    <div>评分: ${item.grade || "没有评分"}</div>
                </li>
            `
        )
        // 记得删除数组间隔样式 join("")
        $("#list").html(newList.join(""))
      }
  ```
> 里面有注释的一个getList(1)初始化,也要写在钩子函数后面,这样钩子函数才能拦截到初始化发送的ajax
- ==拓展: 如果获取节点比如 $("#list")的代码在html代码上面; 是获取不到的,因为js是单线程代码,代码执行到这里时dom节点还没有创建呢,所以获取为undefined==
  - 获取dom节点要在html创建dom节点之后,$(jq)操作也要在dom挂载后,所以依据window.onload,jq也有新的方法
  - ==window.onload = function(){...}== 这个onload会等待window全部的外部资源(比如: js,css,dom,图片等)加载完毕后再执行回调函数,所以在函数内部执行节点的获取与操作是可以的
  - jquery提供了==$(window).ready(function(){})==, 所有的dom节点加载完成后才会执行的钩子函数
    ```
      // jquery比window快,是因为jq只用加载dom节点,而window需要加载更多
      window.onload = function(){
          console.log("window的钩子函数")
      }

      $(window).ready(function(){  // 可以简写为 $(function(){....})
          console.log("jquery的钩子函数")
          // 可以进行各种$操作dom了
      })
    ```
  > 我们可以养成一个好习惯,书写jq时先把这个 \$(function(){....}) / \$(window).ready(function(){...}) 函数写好
  > 然后内部再写jq的操作,这样可以从根本杜绝一些dom节点还没加载完就jq操作的失误,更加安全可靠 
- ==**本节课就是涉及js是单线程问题衍生出的许多过早操作的问题,如不等待dom挂载就使用$,不等待ajax钩子函数挂载就发送ajax**==
### 深浅复制(涉及简单数据和复杂数据的复制)
- ==本节课学习深浅复制的底层原理和解决,与jq无关==
- 复杂数据浅复制的'连坐'现象:
  ```
    // 基本数据类型赋值和复杂数据类型(对象,数组等)赋值最大的区别是,复杂数据类型赋值的是钥匙(即地址),在相互赋值过程中容易出现'连坐'
    // 而基本数据类型则不必担心,简单数据类型数据在栈区,不存在钥匙赋值
    var obj1 = {name:"kerwin"}
    var obj2 = obj1
    obj2.name = "xiaoming"
    console.log(obj1,obj2)
  ```
- 浅赋值 (==对象有复杂数据,但只有一层,没有深层嵌套==)
  ```
      var obj1 = {name:"kerwin"}
      var obj2 = {} // 两把不同的钥匙, {}空对象也配有一个地址

      // // 方法1
      for(let i in obj1){
          obj2[i] = obj1[i]
      }
      obj2.name = "xiaoming"
      console.log(obj1,obj2)

      // // 方法2
      var obj3 = {...obj1}
      obj3.name = "tiechui"
      console.log(obj1,obj3)
  ```
- ==涉及深层的复杂类型的赋值,浅拷贝的所有方法无效==
  ```
    // 上述的复制会把location的地址赋值过来,浅拷贝的所有方法无效
    obj3.location.city = "shanghai" // '连坐' obj 1 2 3 
    console.log(obj1,obj2,obj3)
  ```
- ==**深拷贝方法(递归)**==
- ==什么是递归?==
  ```
    // for循环递归
    // 递归: 自己调用自己,同时设定递归终止条件(否则无限循环了!!!)
    var num = 0
    function deepCopy(){
        num++
        if(num <5){ // 终止条件
            console.log(num)
            deepCopy()
        }
    }
    deepCopy()
  ```
- 构建深复制递归函数
  ```
    // 手搓递归深度赋值
    // 参数1和2为: 赋值目标 赋值模板 o1--->o2
    function deepCopy(o2, o1) {
      for (var i in o1) {
          // toString: 用于将一个对象转换为字符串; 几乎所有的 JavaScript 对象都继承了这个方法，因为它是从Object.prototype中继承而来的。
          // 对于基本数据类型（如数字、字符串、布尔值等），JavaScript 会自动进行类型转换
          // 当对一个对象调用toString方法时，默认情况下会返回"[object Object]"
          // 复杂数据分为对象和数组,各有各的处理方式,主要是判断复杂对象是数组还是对象
          // 可选链操作符'?',使用可选链操作符，就可以写成obj?.a?.b?.c，这样代码更加简洁。如果链路上的任何一个环节是null或者undefined，整个表达式就会返回null或者undefined，而不会抛出错误。
          // 在这个表达式中，o1[i]?.toString()的意思是：如果o1[i]存在（不是null或者undefined），就调用它的toString方法；如果o1[i]不存在，那么整个表达式o1[i]?.toString()就返回null或者undefined,不会去执行toString()方法且继续走下一阶段的else if
          if (o1[i]?.toString() === "[object Object]") {  // 意为o1[i](value)是对象类型,对象是复杂类型
              // 复杂类型赋值,再送进去,把o1[i]再拆一级
              o2[i] = {}
              deepCopy(o2[i], o1[i])
          } else if (Object.prototype.toString.call(o1[i]) === '[object Array]') {  // 强行给数组调用处于Object原型上的toString方法,call改变了this指向为数组
              // 还有更简单区分数组和对象的方式,比如数组有长度,比如数组o1[0]是有值的
              o2[i] = []
              deepCopy(o2[i], o1[i])
          }
          else {
              // 简单类型赋值
              o2[i] = o1[i]
          }
      }
    }
    deepCopy()

    deepCopy(obj2, obj1)

    obj2.location.city = 'shanghai'
    obj2.hobby[0] = "xyz"
    console.log(obj1, obj2)
  ```
  > 就是遇到复杂对象-->判断是数组还是对象类型,然后递归进入再拆分,直到变成单层的的数据,再按照浅复制对付复杂数据的方式解决
- ==深拷贝的简单方式 JSON.stringfy()/.parse()==
  ```
    var obj1 = { name: "kerwin", location: { city: "dalian", province: "liaoning" }, hobby: ["xxx", "yyy", "zzz"],introduction: undefined }
    var obj2 = {}

    var obj2 = JSON.parse(JSON.stringify(obj1))

    obj2.location.city = 'shanghai'
    obj2.hobby[0] = "xyz"
    console.log(obj1, obj2)
  ```
  > ==唯一的缺点是不能有值为undefined,根本复制不了这个值==
### jq深浅复制
- 非常简单,不过即使深复制也不支持复制undefined数据,不如我们自己封装的好
  ```
    var obj1 = { name: "kerwin", location: { city: "dalian", province: "liaoning" }, hobby: ["xxx", "yyy", "zzz"],introduction: undefined }
    var obj2 = {}

    // 1.extend浅拷贝,可以写多个参数,把后面所有的对象浅拷贝到第一项
    $.extend(obj2,obj1,{m:1,n:2})
    console.log(obj1,obj2)

    // 2.深拷贝 就加了一个true
    // 不负责赋值undefined
    $.extend(true,obj2,obj1,{m:1,n:2})
    obj2.hobby[0] = "aaaaa"
    obj2.location.city = "shanghai"
    console.log(obj1,obj2)
  ```
### jq多库并存
- 就是你要占用$和jQuery变量,所以jq给你让位置(==一般人闲着不会这么干==)
- 冲突js文件内部我们自己定义了\$和jQuery函数,并引入此文件,==记得引入顺序,jq在你的冲突js文件下面,这样才能使用jq语法先把\$下放==
  ```
    // 1.$.noConflict() // $被下放了,以后此文件内使用jq,只能用jQuery写法
    console.log($,jQuery)
    console.log($.ajax,jQuery.ajax)

    // 2.$和jQuery都交出去了
    // 以后使用jq就用自己定义的kerwin即可
    var kerwin = $.noConflict(true)
    console.log(kerwin)
  ```
### jq扩展机制
- jQuery的插件扩展: 即可以把自己写的方法挂载到jq上面,这促成了许多jq的方法库(大佬写的,类似于element/vant,开箱即用),之后学
- ==1.扩展直接给jq本身 比如 $.kerwin()==
- ==写法: `$.extend({})`,== 只能一个参数,空对象; 参数多了就成了深浅复制的extend方法了,一次挂载多个,不要与jq的原方法名字重名
  ```
    $.extend({
        kerwin: function () {
            console.log("kerwin")
        },
        deepCopy(o2, o1) { // 简写,把深度复制写好的代码工具拿过来
          for (var i in o1) {
              if (o1[i]?.toString() === "[object Object]") {
                  o2[i] = {}
                  this.deepCopy(o2[i], o1[i]) // this-->$
              } else if (Object.prototype.toString.call(o1[i]) === '[object Array]') {
                  o2[i] = []
                  this.deepCopy(o2[i], o1[i])
              }
              else {
                  o2[i] = o1[i]
              }
          }
        }
    })

    // 测试: 
    $.kerwin()
    var obj1 = { name: "kerwin", location: { city: "dalian", province: "liaoning" }, hobby: ["xxx", "yyy", "zzz"],introduction: undefined }
    var obj2 = {}
    $.deepCopy(obj2,obj1)
    obj2.hobby[0] = "0000"
    console.log(obj1,obj2)
  ```
- ==2.扩展给元素集 比如 $("#box").kerwin() **支持链式写法**==
- 挂到$的原型上,以后jq类型的数据可以从原型上调用你的方法,其中`\$.prototype = \$.fn`
  ```
    html:
      <!-- 写一个allChecked方法,全部'勾选/不勾选' -->
      <input type="checkbox">aa
      <input type="checkbox">bb
      <input type="checkbox">cc
      <input type="checkbox">dd

    ---------------------------
    $.fn.extend({
        allChecked(isChecked){
            // console.log(this) // this获取了$获取的所有dom节点
            this.prop("checked",isChecked)
            return this // 支持链式写法,即使用allChecked后,后面可以接其他$的方法
        }
    })

    $("input[type=checkbox]").allChecked(true).css({
        width:100,
        height:100
    })
  ```
### jq自定义插件
- 自己封装一个选项卡插件进入jq的要求:
  -  1.dom必须符合某种规定
  -  2.样式需要引入(一般封装css文件)
  -  3.js引入,并初始化
- 主文件: (==改造了下选项卡案例==)
  ```
    <!-- 引入jquery文件,已下载在本地 -->
    <script src="lib/jquery.min.js"></script>
    <!-- 引入css样式 -->
    <link rel="stylesheet" href="./css/188tabs.css">
    <!-- 引入js,在jq之后 -->
    <script src="./js/188tabs.js"></script>

    html:
    <!-- dom结构如下,class名字也不要改 -->
    <div id="container">
        <ul class="header">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
        <ul class="box">
            <li>111</li>
            <li>222</li>
            <li>333</li>
            <li>444</li>
        </ul>
    </div>

    js:
    // 参数: 初始化显示页面的数组索引
    $("#container").tabs(0)
  ```
- ==js文件,css没变就不展示了==
  ```
    $.fn.extend({
    tabs: function (index) {
        // this-->container
        // console.log(this)
        var oli = this.find(".header li")
        var obox = this.find(".box li")
        // 初始化工作
        oli.eq(index).addClass("active")
        obox.eq(index).addClass("active")

        $(".header li").click(function () {
            $(this).addClass("active").siblings().removeClass("active")
            var index = $(this).index()
            obox.removeClass("active").eq(index).addClass("active")
        })
    }
  })
  ```
  > ==js注意this的指向,按照用法传参实现相应的功能==
  > ==html注意结构,标签名,class名==
### jq插件轮播
- ==Owl Carousel 是一个强大、实用但小巧的 jQuery 幻灯片插件==
- 本节课旨在学习使用他人写好的jq库,==体会使用jq库的3点要求==
- ==**看文档为主,学习怎么用**==
- 1.引入文件js/css和jq
  ```
    <!-- 引入jquery文件,已下载在本地 -->
    <script src="lib/jquery.min.js"></script>
    <!-- 跟着文档来,路径需要修改一下 -->
    <link rel="stylesheet" href="./dist/assets/owl.carousel.min.css">
    <!-- 进入这个css文件夹,发现有许多css样式的class名,只需要在html附带上,就可以添加对应样式 -->
    <!-- assets的几个主题css文件也是改颜色改样式等; 同时直接在css文件内部改样式也可以,根据需求改,认识到每个css控制负责那部分样式 -->
    <link rel="stylesheet" href="./dist/assets/owl.theme.default.css">
    <script src="dist/owl.carousel.min.js"></script>
  ```
- 2.严格的html结构
  ```
    <!-- 严格的dom结构 -->
    <!-- Set up your HTML -->
    <div class="owl-carousel owl-theme">
        <div>
            <img src="./lib/img/1.jpeg" alt="">
        </div>
        <div>
            <img src="./lib/img/2.jpeg" alt="">
        </div>
        <div>
            <img src="./lib/img/1.jpeg" alt="">
        </div>
        <div>
            <img src="./lib/img/2.jpeg" alt="">
        </div>
    </div>
  ```
- 3.使用写好的$,==看文档有自定义的函数,**还有监听的事件on()**==
  ```
  var owl = $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
            // 看参数options
            items: 1, // 单页个数
            loop: true, // 是否循环
            autoplay: true, // 自动轮播
            autoplayTimeout: 2000 // 轮播间隔: 2s
        });
    });

    // 支持事件监听
    owl.on('changed.owl.carousel', function (event) {
        // console.log(event)
        // 每次页面滑动调取回调函数,event参数内有许多有用信息
        console.log(event.page.index)
    })
  ```
## Bootstrap
### 初始Bootstrap
- Bootstrap是前端框架的引领者,后面vue的element和vant库都是依据它的思路展开的,==重在看文档学习如何去用构建好的属性,结合jq的语法用==
- Button经典: (纯css样式的展示)
  ```
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
  ```
- 页面的布局 layout/container 经典
- container还有许多响应式的样式风格,具体见文档layout/container,下面有个表格
  ```
    <!-- 1.具有响应式布局,太好用了,随着屏幕变化而更改布局 -->
    <div class="container">
        111111
    </div>

    <!-- 2.使用 .container-fluid 可创建一个全宽容器，其宽度会横跨整个视口 -->
    <div class="container-fluid">
        111111
    </div>
  ```
  > 注意: container就是Bootstrap的根,是网页的基础架构,在这里面继续写其他的内容
### 12栅格系统
- elementPlus的24栏正是师承此处
- ==加起来等于12,超过12换行; 没占满,有的节点就会比较窄; 尽量占满==
- ==不写具体占多少,都是col,也会默认平分; col相当于加了flex:1==
  ```
    <div class="row">
        <div class="col-3">111</div>
        <div class="col-3">222</div>
        <div class="col-3">333</div>
        <div class="col-3">444</div>
    </div>
  ```
- ==**响应式col 也有自己的断点分配 layout/grid**==
- 通过型号的分配响应式地在不同断点分配不同大小的栅格
  - 例如: col-xl-... 在宽度大于1140px时生效; col-lg-... 在宽度大于960px时生效,所以我们可以在大于1140px为一种布局; 大于960px为一种布局
  - 下面代码的col响应式布局: ==大于1140 平分4份; 大于960 3+1; 大于720 2+2; 大于540 4个1==
    ```
      <div class="row">
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              1111111111111
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              2222222222222222222
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
            3333333333333333333
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              444444444444444
          </div>
      </div>
    ```
    > class叠加附带多种jq样式,可以在不同阶段下触发不同的class+jq效果
  - ==番外layout/columns都是弹性盒布局,笔记就不展示了,是对col内容的上下左右,主轴方向上的布局等的位置样式,看看文档的代码和图即可,学过css的一看就懂==
### bootstrap组件
-  ==上一节的内容纯css样式的显示,没有交互,不需要js,就比如那些按钮模板,card模板等,当组件涉及到点击,滑动等交互操作时,js就派上用场了,本节旨在介绍一些常用的交互组件,并且除了添加class之外,还会额外有监听事件等,有on()添加==
- ==组件的Accordion(第一个)==
  ```
    <div class="container-fluid">
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Accordion Item #1
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate
                    the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
            </div>
          </div>
        </div>
    </div>
  ```
  - **使用别人的组件有3步: 1.引入 2.严格html 3.js初始化**
  - ==但是看代码组件为何不用初始化?==
    - data-bs-toggle和data-bs-target自定义属性,==第一个绑定折叠展开功能(js文件内部),第二个绑定折叠展开哪个内容==(和下面的div对应flush-collapseOne)
  - ==**理解思路,许多组件都是这么用的,省略了初始化操作**==
- 再举个例子: 轮播carousel,没有swiper好
  ```
    <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="./lib/img/1.jpeg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./lib/img/2.jpeg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./lib/img/1.jpeg" class="d-block w-100" alt="...">
            </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>

  ```
  - ==对按钮button附加js功能,data-bs-target和data-bs-target; 第二个绑定轮播的目标,一定要有目标carouselExample,这个目标就是轮播的内容(几张图片)==
  > ==**学习这两个的目的是了解boot的组件运行规律风格, 第一个绑定功能,一个绑定目标**== 
  - ==轮播也有自己的监听事件==,动态创建事件等,文档有,下面的是监听
    ```
        const myCarousel = document.getElementById('myCarousel')

        myCarousel.addEventListener('slide.bs.carousel', event => {
            console.log(event)
        })
    ```
   > 通过获取轮播图的dom节点,从而添加监听事件slide.bs.carousel(==这个函数人家提前写好了,别改名==),然后通过获取res能够获取轮播图的一些信息
- 再介绍一些常用的组件 Navbar组件
- 非常好的Navbar,具有响应式,不同宽度有不同样式navbar-expand-lg (-lg), ==-lg就是上一节课栅格笔记我们自己做的响应式断点之一==
- 内部的跳转地址啥的自己配置即可
  ```
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
  ```
### 初始sass
- sass是css的扩展语言,书写更加强大的css,最后会被转化为css显示在浏览器
- ==**虽然名字为sass,但是scss文件学习成本更低(就是几乎css改版); sass有自己的一套语法规则,非常严格不推荐**==
- ==里简单点,扩展sass Easy Sass; 而在vue/react等模块化框架中,需要npm i sass下载==
- ==在scss文件(**后缀.scss**)中写css,插件会自动生成对应的css和min.css文件,然后在html内引入css或min.css文件即可==
### sass的各种结构
- **sass的各种结构,变量,if,for等会让你觉得在写js代码**
- 变量用法 ==+$当作变量了==
- ==**记得每行结尾加上;**==
- ==index1.scss==
  ```
    // +$当作变量了 记得结尾加;
    $color: blue;
    $width: 100px;

    .box{
        background-color: $color;
        width: $width;
    }
    .box2{
        background-color: $color;
        // 支持计算 +-*/
        width: $width*2;
    }

    .footer{
        border: 1px solid $color;
    }
  ```
- ==对应的css==
  ```
  .box {
  background-color: blue;
  width: 100px;
  }

  .box2 {
    background-color: blue;
    width: 200px;
  }

  .footer {
    border: 1px solid blue;
  }
  ```
- ==2.if逻辑 @if==
  ```
    $isShowTab: false;
    // $isShowTab:true;

    $isRed:true;

    // 仅支持 == 不支持 ===
    // 条件语句: @if(){...}@else{...}
    @if($isShowTab==true) {
        .tabbar {
            position: fixed;
            left: 0;
            top: 0;
        }
    }
    @else{
        .tabbar{
            position: absolute;
        }
    }

    div{
        width: 500px;
        height: 200px;
        @if($isRed){
            background-color: red;
        }@else{
            background-color: yellow;
        }
    }
  ```
- 对应的css,会根据你的if选择创建对应的css样式,而未被选中的css不会创建,节省内存,减少代码冗余
  ```
  .tabbar {
    position: absolute;
  }

  div {
    width: 500px;
    height: 200px;
    background-color: red;
  }
  ```
- ==3.循环结构 for==
  ```
   // from 1 to 5 = 1 2 3 4 但没有5
   // item = 1 2 3 4
    @for $item from 1 to 5{
      // #{}内当作js地盘,这时把$item变量放进去
      li:nth-child(#{$item}){
          position: absolute;
          // 运算时有时需要打空格符合样式,否则计算失效
          left: ($item - 1) * 100;
          top: ($item - 1) * 100;
      }
    }

    // item = 1 2 3 4 5
    @for $item from 1 through 5{ // 包含5
        // #{}内当作js地盘,这时把$item变量放进去
        li:nth-child(#{$item}){
            position: absolute;
            // 运算时有时需要打空格符合样式,否则计算失效
            left: ($item - 1) * 100;
            top: ($item - 1) * 100;
        }
    }
  ```
- 对应的css:
  ```
  li:nth-child(1) {
    position: absolute;
    left: 0;
    top: 0;
  }

  li:nth-child(2) {
    position: absolute;
    left: 100;
    top: 100;
  }

  li:nth-child(3) {
    position: absolute;
    left: 200;
    top: 200;
  }

  li:nth-child(4) {
    position: absolute;
    left: 300;
    top: 300;
  }

  // 这个 from to 没有; from through 有
  li:nth-child(5) {
    position: absolute;
    left: 400;
    top: 400;
  }

  ```
- ==3.2 直接遍历数组colors==
- ==索引需要专门的函数书写==
  ```
    $colors:red,yellow,green; // 当作数组用
    @each $item in $colors{
        // 索引函数: 当前这一项$item在当前数组$colors的索引值
        $index: index($colors,$item); 
        li:nth-child(#{$index}){ // 经过索引函数处理后,放入索引变量
            background-color: $item;
        }
    }
  ```
- css:
  ```
  li:nth-child(1) {
    background-color: red;
  }

  li:nth-child(2) {
    background-color: yellow;
  }

  li:nth-child(3) {
    background-color: green;
  }
  ```
- ==4.混入 mixin==
- 相当于定义了函数方法,可以传参,大家有相同内容,共用一个函数节省代码量
  ```
    // 定义了方法 @mixin
    // 参数默认值 相当于给参数初始化
    @mixin kerwin_transition($a: all,$b: 2s){
        transition: $a $b;
    }

    // 调用了方法,可传参
    .box1{
        // 使用默认参数
        @include kerwin_transition()
    }
    .box2{
        $model:all;
        @include kerwin_transition($model)
    }
    .box3{
        @include kerwin_transition(all,5s)
    }
  ```
- css:
  ```
  .box1 {
    transition: all 2s;
  }

  .box2 {
    transition: all 2s;
  }

  .box3 {
    transition: all 5s;
  }
  ```
### sass常用---嵌套
- ==嵌套规则等同于html结构, css结构对标html结构==
- scss:
  ```
    div{
        width: 100px;
        height: 100px;
        background-color: red;
        p{
            width: 50px;
            height: 50px;
            background-color: yellow;
            span{
                color: blue;
            }
        }
    }

  ```
- css:
  ```
  div {
    width: 100px;
    height: 100px;
    background-color: red;
  }

  div p {
    width: 50px;
    height: 50px;
    background-color: yellow;
  }

  div p span {
    color: blue;
  }
  ```
- 还可以使用>,来界定亲儿子
  ```
    // 亲儿子li
    ul{
        // 给自己加样式
        >li{
            background-color: yellow;
            // 伪类 :hover
            &:hover{ // &代表li自己
                background-color: red;
            }
            &.active{
                background-color: blue;
            }
        }
    }
  ```
- css:
  ```
  ul > li {
    background-color: yellow;
  }

  ul > li:hover {
    background-color: red;
  }

  ul > li.active {
    background-color: blue;
  }
  ```
### sass的继承与导入
- ==文件导入继承的==
- 被继承的 000.base.scss
  ```
    $color: yellow;
    $bg: skyblue;
  ```
- 导入
  ```
    @import "./000.base.scss";
    .box{
        color: $color; // 使用公共scss文件中的color变量 
        background-color: $bg;
    }
  ```
- scss: (==单文件内部继承==)
  ```
    // 被继承的 
    .base{
      width: 100px;
      height: 100px;
      outline: none;
    }

    // 继承base的
    .btn1{
        // 继承base的样式,base也会被保留下来
        // 混入mixin的样式不会保留下来
        @extend .base;
        background-color: red;
    }
    .btn2{
        @extend .base;
        background-color: yellow;
    }
  ```

## js的动画效果和swiper(PLUS)
### js动画
- js的动画效果主要服务于低版本浏览器,无法正常显示css3,十分复杂,也都是定时器,看看就行,在plus-第二阶段-专题九-Day24
### swiper框架(没做好)
- 是一个框架,内部内置了超级多的动画效果图,具体使用详见plus-第二阶段-专题九-Day25-08+09 swiper基础和进阶

## 面向对象
### 创建对象方法
- 写死的->工厂函数,自己定义对象返回对象->new 自动创建对象返回对象(面向对象)
- ==第三部分有new和this指向的详细介绍,加深理解==
- 代码:
  ```
  <script>
        // 1.写死的字面量,创建对象,还有new Object()创建对象,这都很麻烦
        var obj1 = {
            name: "kerwin",
            age: 100,
            score: [12,34,435,120,543],
            id: "019342982"
        }



        // 2.工厂函数 批量处理 自己定义对象,返回对象
        function creatObj(name){
            var obj = {}
            obj.name = name
            // if(name)
            obj.material = []
            return obj
        }

        var menu1 = creatObj("蒸羊羔")
        console.log(menu1)
        var menu2 = creatObj("烧花鸭")
        console.log(menu2)


        
        // 3.自定义构造函数(更简便，常用) 面向对象 new

        // new Object() new String() new Array()
        function CreatObj(name){
            this.name = name // this指向创建的对象,谁创建指向谁
            this.material = []
            this.cook = function(){
            console.log(this.name)
            }
            // 自动返回对象
        }
        var obj1 = new CreatObj("蒸羊羔") // 自动创建和返回对象 new
        // new过程与this指向：new实例化这个过程，示例对象已经生成，这只是把生成的对象地址赋值给obj1了,即使不赋值this也有指向了,指向这个堆中的实例化对象,obj在栈中存着堆的地址
        var obj2 = new CreatObj("烧花鸭") 
        console.log(obj1,obj2)
        obj1.cook() // obj1就是创建的对象，cook函数里的this本着谁调用指向谁原则，指向obj1，也就是创建的对象，this.name就是蒸羊羔。

      </script>
  ```
### 构造函数的规则
- 代码:
  ```
   <script>
        // 1. 首字母大写
        function CreatObj(name){
            this.name = name
        }
        var obj1 = new CreatObj("ki")
        console.log(obj1)

        // 2. 构造函数内不写return,会自动返回内部的所有属性即方法(包装在对象中)
        function CreatObj(name){
            this.name = name
            //return 111 // 普通数据不返回
            // return { // 可以返回对象，但是构造函数的意义没了，只能返回固定数据
            //     a:1,
            //     b:2
            // }
        }
        var obj1 = new CreatObj("ki")
        console.log(obj1)

        // 3. 构造函数不能当普通函数用
        function CreatObj(name){
            this.name = name
        }
        var obj1 = CreatObj("kerwin")
        console.log(obj1,window.name) 
        // 因为当成普通函数，没有写返回，所以obj1直接调用undefined，并且由于没有自定义函数，函数内部未自动创建对象，this指向根据前面学的，挂在window上了，所以window.name可以访问到。
    </script>
  ```
### 面向对象之原型(+PLUS)
- 解决的问题:当我们构造多个相同对象并且调用里面相同的函数方法时,会造成内存浪费,原因:由于函数是复杂类型,所以在new开辟的每个空间内,函数在里面只是个地址,其指向在堆中别的地方专为函数开辟的空间,如果我们多次调用不同对象的相同函数方法,就会在队中开辟多个此函数空间,造成资源浪费,而原型解决方法是,所有的对象使用此方法时,都指向一个内存空间(此函数),而不是每个对象都要配一个空间,大家公用,而这个原型时挂在构造函数上的,所有用此构造函数创建的对象都会通过对象的一个__proto__属性找到构造函数的原型(prototype)里的函数.
- 代码:(认真看)
  ```
    <div class="box1">
        <h1></h1>
        <ul></ul>
    </div>

    <div class="box2">
        <h1></h1>
        <ul></ul>
    </div>


    <script>
        // 后端传来的data
        var data1 = {
            title: "体育", // h1
            list: ["PE-1", "PE-2", "PE-3"] // ul
        }
        var data2 = {
            title: "体育2", // h1
            list: ["PE-12", "PE-22", "PE-32"] // ul
        }

        function CreatList(select, data) {
            this.ele = document.querySelector(select) // 提取整class类的所有 
            this.title = data.title
            this.list = data.list

            //this.render = 
        }

        // 原型: 共享内存，不会有多余的render占用宝贵的内存,在构造函数的原型上挂函数
        CreatList.prototype.render = function () {
            // 渲染页面的方法
            var h1 = this.ele.querySelector("h1")
            var ul = this.ele.querySelector("ul")

            //console.log(h1,ul)

            h1.innerHTML = this.title
            ul.innerHTML = this.list.map(item => `<li>${item}</li>`).join("") 
        }

        // 面向对象很方便，无论后端传什么类型的数据，我们都可以通过简单调用实现流水线式的生成
        var obj1 = new CreatList(".box1", data1)
        var obj2 = new CreatList(".box2", data2)

        console.log(obj1)
        console.log(obj2)
        obj1.render() // 渲染页面
        obj2.render()

        // 缺点 ： 每个obj的render都会占用一部分堆内存，而其内部逻辑相同，造成了内存浪费
        // 解决方法 ： 使用原型

        // 1.小问题 ： obj1为何会调用render呢？
        // 对象有个方法__proto__, 对象.__proto__ === 构造函数.prototype 就是类型内容完全一致
        console.log(obj1.__proto__)
        console.log(CreatList.prototype)
        console.log(obj1.__proto__ === CreatList.prototype) // true

        // 当使用对象obj1直接调用render时，电脑会先找obj1是否有这个函数，没有就从属性里找，而__proto__作为对象obj1的一个属性，指向了构造函数的原型
        // 于是电脑顺藤摸瓜根据__proto__找到了其对应的原型，又在原型里找，如果有，直接调用，没有就报错

        // 2. 拓展：toString() 原型链概念
        // 寻找链条 ： 对象.__proto__  --> 构造函数.prototype --> 构造函数.__proto__ (里面有toString)
        // 原型也有自己的__proto__ 属性，里面有toString属性
        // 顶点是null

        ----------------------------------

        // 3.问题拓展,如果改任意一个obj的方法,会不会通过原型影响到其他的对象(以下代码另开新篇)

        function CreatName(name){
            this.name = name
        }
        CreatName.prototype.getName = function(){
            console.log("My name is " + this.name)
        }

        var obj1 = new CreatName("kerwin")
        var obj2 = new CreatName("tiechui")

        obj1.getName() 
        obj2.getName()
        
        // 我们修改obj1的getName函数,看看会不会影响obj2
        obj1.getName = function(){
            console.log("123123123123")
        }

        obj1.getName() 
        obj2.getName()
        // 发现没有影响到obj2,为啥,上面操作实际上是在obj1对象上定义了getName函数,并没有对原型的getName造成影响,根据找函数顺序原则,直接在对象身上找到了这个函数,就不执行原型上的getName了,根本没影响到别人


        // 4.拓展 我们常用的方法 Array 的原型里存着一些处理数组的方法 map filter 等
        // 在控制台 通过输入 Array.prototype.map = function(){} 甚至可以改变原有的map方法
    </script>
  ```
- ==(PLUS)介绍下原型的功能==
- 代码:
  ```
        let obj = {}; // 空对象

        function Foo(){};
        // Foo.prototype
        Foo.prototype.b = "hello 我是 Foo 构造函数的 prototype 的属性 b"
        let foo = new Foo();

        // 注意 : 每个对象之中都有一个默认的属性 : [[prototype]] 
        // 这条属性就被我们称之为原型指针! 
        // 这条指针会指向当前实例对象对应的原型对象! 
        console.log( obj )
        console.log( foo )
        console.log( [] )
        // 普通对象(直接创建的对象) , 原型指针是直接指向顶级原型对象 Object.prototype
        // 实例对象 (构造函数创建的对象) , 原型指针是指向构造函数对应的原型对象(就是我们存放方法时创建的原型Foo.prototype.XXX = function(){...} ); 
        // 除了对象本身之外，像是数组这类的复杂类型(引用类型) , 都会有一个原型指针指向自己构造函数的原型对象;
        // 原型机制就是数据的操作方法! 就比如数组的原型中有许多数组的操作方法,比如map,fliter等,我们创建出的数组可以直接调用它们.
  ```
- ==原型链查找(plus版)==
- 
  ```
    1.查看对象之中是否存在a属性, 不存在, 我们就沿着原型对象向上查找(就是进入其prototype内)! 
    2.我们点开查看原型对象的时候里面有一条属性constructor,它表明了当前的原型对象属于哪个构造函数! 去这里面找有没有a属性
    3.当1和2都找不到后,就到达顶级原型constructor: ƒ Object(), Object.prototype 原型就是顶级原型! 是所有原型对象向上查找的终点,此时就放弃查找返回undefined
  ```
### 面向对象之选项卡案例
- 本次依旧是86案例的改进,let的使用已经添加,不在使用自定义属性,笔记就不展示js文件的模块化引入了,在代码是有的->130.js
- 1.通过学习,我们一般将属方在构造函数里,把方法放在原型里(防止浪费内存)
  2.事件函数里的this指向一定慎重,箭头函数有大用处
  3.构造函数的属性传入原型中使用,用this在构造函数中定义好这个属性,这样只要调整好原型中this指向构造函数,就可以直接通过"this.属性名"拿过来用了.
- 代码:
  ```
   <script>
        function Tabs(className,type) { // 属性写在构造函数里
            var container = document.querySelector(className) // 获取class
            this.oheaderitems = container.querySelectorAll(".header li") // 获取此class的导航栏和内容对象
            this.oboxitems = container.querySelectorAll(".box li")
            this.type = type // 方便change调用
            this.change() // 自动执行
            // console.log(this.oheaderitems,this.oboxitems)
        }

        Tabs.prototype.change = function () { // 方法写在原型里,多个对象使用相同方法时不浪费内存
          for (let i = 0; i < this.oheaderitems.length; i++) {
            this.oheaderitems[i].addEventListener(this.type, ()=>{
                // console.log(this) // 谁调用this指向谁,这里容易犯错,如果是普通函数,this就指单个的li,而我们想让它指向Tabs
                // 使用箭头函数解决问题
                var index = i
                for (var m = 0; m < this.oheaderitems.length; m++) {
                    this.oheaderitems[m].classList.remove("active")
                    this.oboxitems[m].classList.remove("active")
                }
                this.oheaderitems[index].classList.add("active")
                this.oboxitems[index].classList.add("active")
            })
          }
        } 

        new Tabs(".container1","click") // 不用加on
        new Tabs(".container2","mouseover")
        new Tabs(".container3","mouseover")
    </script>
  ```

### class(ES6语法糖,向java靠拢)
- 语法糖:js面向对象的方法太过新奇,所以包装了一个新语法,格式向java看齐
- 代码:
  ```
   <script>
        <--------老写法-------->
        // ES5 js特有的写法
        function CreatObj (name){
            this.name = name
        }
        CreatObj.prototype.say = function(){
            console.log(this.name,"hello")              
        }
        <--------class进阶--------->
        // ES6进阶写法：为了同轨其他语言的写法,看看熟悉不
        class CreatObj {
            // 构造函数，下面写属性和传参数就完了
            constructor(name){
                this.name = name
            }

            say(){ //这就是原型，比原来的简单多了,直接写在class里面即可 
                console.log(this.name,"hello")
            }
        }
        
        var obj = new CreatObj("kerwin")
        console.log(obj)
        obj.say()
    </script>
  ```
### ES5继承
- 先学ES5再学ES6
- 代码:(每个代码块下面有解释,看看原理,加深理解)
  ```
  <script>
        // ----------------ES5写法-------------------
        // 1.构造函数继承 ES5 （无法继承原型的方法，只能继承属性）
        function Person(name, age) {
            this.name = name
            this.age = age
        }
        Person.prototype.say = function () {
            console.log(this.name, " hello")
        }

        function Student(name, age, grade) {
            // 如果不使用继承还要再写一遍代码，麻烦
            // this.name = name
            // this.age = age

            // ES5继承
            Person.call(this, name, age) // 118
            // Person.apply(this,[name,age]) // 这么写也行

            // 执行Person函数，call传入三个参数，其中的this指的是Student，这样Person里的this就会指向Student，然后参数name，age（从Student传参）取代Person的name和age,实际上就是利用了Person的代码,给Student创建了新属性并赋值,让他们为Student服务，继承里Person函数的代码方法,减少代码重复
            this.grade = grade // 再给Student添加一个独有的年级属性,并复制
        }
        // 帮助理解call的含义示例2 ：
        // var obj2 = {
        //     grade : 100
        // }
        // Person.call(obj2,"Niko",90) // 利用Person继承来的方法，传入参数，其中Person的this指向了obj2,这么做的操作意味着给obj2添加了一个name ：Niko 和 age : 90 ,加上原有的grade,共三个属性
        // console.log(obj2)

        // 给Student传入三个参数分别对应name和age和grade，其中name和age使用的是Person继承来的方法，grade是Student独有的
        //console.log(obj)  // 没有原型

        ---------------------------------------
        // 2. 原型方法继承 ES5
        // Student.prototype = Person.prototype // 1.可以的,但是由于原型是复杂类型,会"连坐"
        Student.prototype = new Person() // 2.把Person()变成对象赋给了Student，继承了Person的原型的同时也继承了点废物（name / age属性），好在Student访问name/age时会优先反访问自身有没有这两个属性，如果没有然后再去找Student.prototype的name和age，ES5只能这么做，这样 Student.prototype和Person()互不影响

        // 2.1创建自己的新函数放在自己的原型上
        Student.prototype.printGrade = function () { 
            console.log(this.name, this.grade)
        }
         // 2.2还可以覆盖Person()继承过来的的say()
        Student.prototype.say = function () {
            console.log(this.name, "你好")
        }

        var obj = new Student("kerwin", 100, 100) // 
        console.log(obj.__proto__) // 看看prototype里面有啥东西
        obj.say() // 覆盖效果
        obj.printGrade() // 独有的


    </script>
  ```
### ES5继承(PLUS)
- 相对于kerwin的原型方法继承有所改进,对于构造函数的继承没区别
- ==顺便说下,构造函数的继承核心逻辑: 把父类的构造函数在子类中调用,由于父类的构造函数赋值是通过this进行的,所以通过只需要通过call,apply等改变this指向子类,就可以实现继承,借用了父类的赋值代码,但是赋值对象被修改成了子类(this->子),叫做借用继承也十分符合其操作==
- ==原型方法继承的核心逻辑: 子类的原型方法指针指向父类的原型方法==
  ==**实现:** 子类.prototype = Object.creat(父类.prototype)
  **和kerwin的有所不同,kerwin的那个new创建类是无法传参的,这个改进版更好**==
- 解释下新语法: obj = Object.creat(对象fatherObj) , 返回值是一个对象obj,这个对象obj的原型方法指向对象fatherObj
 > 注意: PLUS在构造函数的传参中用的apply(this新指向,[数组参数])
 > 和...args搭配很好, ...运算会把输入的多项数据存入数组中,apply这样用,就只用写一个args参数了,而不像是call那样,每个传参都要写,更简洁一些 
- 代码:
  ```
  -----------------借用继承-------------------
  <script>
        // 借用继承 : 
        // - 涉及的构造函数有两个 : 
        //   - 父级 : 已经有了部分功能( 属性 , 函数 )
        //   - 子集 : 想要继承父级上的功能 , 同时可以自己添加一些功能; 

        function Father( a ){
            this.name = "father 类";
            this.a = a;
            this.sayHello = function(){
                console.log( this.name );
            }
        }

        function Son( ...args ){
            // 借用继承 : 借用父级构造函数去构造实例对象! 给Son创建出的实例对象添加属性和方法! 
            //注意 :  new 调用之后，Son构造函数里面创建了一个实例对象 , 这个实例对象可以通过this关键字访问; 
            // console.log( this );
            // 借用父级构造函数对实例对象进行加工! 
            // 父级构造函数在给实例添加属性方法的时候, 是使用this进行添加的, 我们现在的借用继承其实就是把this指向替换成Son的实例对象; 
            // 我们此时是不把Father构造函数当做构造去看的, 我们是把Fahter当成普通函数去看待的; 
            // Father.apply( this );
            // 注意 : 我们在继承的过程之中如果需要传递参数 , 我们在子集构造函数之中一次性接收, 统一进行传入; 

            Father.apply( this , args );
            // 注意 : 在继承结束之后我们可以添加属性, 新增功能, 这些行为都应该放在继承之后; 
            this.sayHello = "你好"
        }
        let son = new Son("hello world");
        console.log( son );

        // 总结 : 借用继承就是在子集构造函数之中通过 apply 调用父级构造函数, 把子集生成的实例对象替换为父级构造函数的this指向实现父级构造函数属性功能的添加行为; 

    </script>

    -----------------------原型继承----------------------
    <script>
          // 原型继承 : 
          // - 原型继承所有的继承内容都是函数, 所以我们没必要重新进行赋值; 
          // - 原型继承的主要原理就是使用原型链来完成继承; 

          // let obj = {};
          // console.log( obj );

          // 角色划分 : 
          // - 父类构造函数 | 原型对象 ;  [[Prototype]] 原型指针
          //   - 父类实例对象 [[Prototype]] => 父类原型对象 [[Prototype]] => Object.prototype 
          // - 子类构造函数 | 原型对象 ; 
          //   - 子类实例对象 [[Prototype]] => 子类原型对象 [[Prototype]] => Object.prototype 
          
          // 目标 : 让子类实例对象可以访问父类原型对象上的方法, 把子类原型对象的原型指针指向父级原型对象; 
          // 子类原型对象 [[Prototype]] => 父类原型对象 [[Prototype]]

          // 我们修改原型指针的方式不能是属性赋值! 我们只能替换子类原型对象! 要求替换的对象里面的原型指针指向父类原型对象; 

          
          function Father(){}
          Father.prototype.a = function(){
              console.log("hello world");
          }
          // let f = new Father();
          // console.log( f );
          // 注意 : Father构造函数创建出的实例对象可以访问到Father原型对象上的函数a, 因为这个实例对象里面原型指针指向Father的原型对象; 
          // f.a();


          function Son(){}
          // 我们希望Son的原型对象的原型指针指向Father的原型对象; 
          // 注意 : 我们给Son的原型对象进行赋值, 赋值的内容是一个对象( 对象的原型指针要能指向父级的原型对象 )
          // new Father 就是一个父级实例对象,通过父类示例对象的原型指针可以找到父类原型上的方法
          // Son.prototype = new Father();
          // 注意 : 我们在给Son.prototype 赋值为 父级的实例对象的时候如果直接使用 new Father() 进行实例对象对象创建会导致我们没有参数传入, 但是面向对象程序是一种高级封装, 很少有不传参数的情况; 

          // 我们的解决方式是使用新的工具创建固定原型指针指向的对象; 
          // 语法 : Object.create();
          // 参数 : Object.create( 对象 )
          // 返回值 : 是一个对象, 这个对象的原型指针指向我们传入的参数对象! 
          // let obj = Object.create( Father.prototype );
          // console.log( obj );
          Son.prototype = Object.create( Father.prototype );
          // 即子类原型对象的原型指针指向父级原型对象; 
          
          Son.prototype.b = function(){
              console.log("你好世界");
          }
          // let s = new Son();
          // // console.log( s );
          // s.a();

          // let s = new Son();
          // s.a();
          // s.b();

          // 注意:原型覆盖会不会连坐? 如下这种
          // let obj1 = {};
          // let obj2 = obj1;
          // 此时我们给obj1对象赋值的时候 obj2 对象也会产生影响; 


          // 答案是不会,
          // 注意 : 我们在子类之中对父类的方法进行覆盖，是不会对父类产生影响的; 
          // 下面的操作是给Son的原型添加新的方法a,就不会沿着原型链影响到父级
          // Son.prototype.a = function(){
          //     console.log("hahahahahaha");
          // }
          // let s = new Son();
          // console.log( s );


      </script>
  ```
### ES5的继承案例
- 代码:(继承方法注意参数出入,继承拓展原方法)
  ```

    <script>
        // // 后端传来的data
        var data1 = {
            title: "体育", // h1
            list: ["PE-1", "PE-2", "PE-3"] // ul
        }
        var data2 = {
            title: "体育2", // h1
            list: ["PE-12", "PE-22", "PE-32"], // ul
            url: "129su1.jpeg"
        }

        function CreatList(select, data={}) { // 传参就覆盖,不传参默认为空,为空则data.titlt = undefined 也不会报错 
            this.ele = document.querySelector(select) // 提取整class类的所有 
            this.title = data.title
            this.list = data.list
        }

        CreatList.prototype.render = function () {
            var h1 = this.ele.querySelector("h1")
            var ul = this.ele.querySelector("ul")

            //console.log(h1,ul)

            h1.innerHTML = this.title
            ul.innerHTML = this.list.map(item => `<li>${item}</li>`).join("") 
        }

        function CreatImgList(select,data){
            CreatList.call(this,select,data) // 属性继承
            this.imgUrl = data.url // 新的,对象里的url
        }

        // 方法继承 原方法并没有打印图片
        CreatImgList.prototype = new CreatList() 
        // new Person后,继承Person的方法要传参数,因为里面用到了参数data.title data.list,没有data参数会报错

        // 加强方法 图文列表,在原有基础上增加打印图片功能
        CreatImgList.prototype.enhenceRender = function(){
            this.render() // 先继承原方法才能找到render函数
            var img = this.ele.querySelector("img")
            img.src = this.imgUrl
        }


        var obj1 = new CreatList(".box1", data1)
        var obj2 = new CreatImgList(".box2", data2)

        console.log(obj1)
        console.log(obj2)
        obj1.render() // 渲染页面
        obj2.enhenceRender()

    </script>

  ```
### ES6继承(进阶)
- ES6(看向java)继承写法代码:
  ```
  <script>
        // 父类
        class Person{
            // 属性
            constructor(name,age){
                this.name = name
                this.age = age
            }
            //方法（原型）
            say(){
                console.log("Hello",this.name)
            }
        }

        // 子类
        // ES6 Student 继承 Person  1.只继承父类的方法say()
        class Student extends Person{
            constructor(name,age,grade){ 
                super(name,age) // 2.继承属性,写在最上面,类似Person.call(this,name,age)
                this.grade = grade // 添加新属性
            }
            // say(){ // 覆盖
            //     console.log("您好",this.name)
            // }
            say(){ // 增强，甚至不用管this
                super.say() // 可以通过super调用父类的方法
                // 下面写子类的代码
                console.log("您好",this.name)
            }
        }

        var obj = new Student("kerwin",200,400)
        console.log(obj)
        obj.say()
    </script>
  ```
- ES5案例的进阶写法:
  ```
    <script>
        // 后端传来的data
        var data1 = {
            title: "体育", // h1
            list: ["PE-1", "PE-2", "PE-3"] // ul
        }
        var data2 = {
            title: "体育2", // h1
            url: "https://static.maizuo.com/pc/v5/usr/movie/6f0850b4fc5e0ddfaac2e8146c23e21c.jpg?x-oss-process=image/quality,Q_70",
            list: ["PE-12", "PE-22", "PE-32"], // ul
            url: "129su1.jpeg"
        }

        // 父类
        class CreatList {
            constructor(select, data) {
                this.ele = document.querySelector(select) // 提取整class类的所有 
                this.title = data.title
                this.list = data.list
                this.render() // 自动执行
            }

            render() { // 方法
                var h1 = this.ele.querySelector("h1")
                var ul = this.ele.querySelector("ul")

                h1.innerHTML = this.title
                ul.innerHTML = this.list.map(item => `<li>${item}</li>`).join("") // 看看这行代码咋写的
            }
        }


        var obj1 = new CreatList(".box1", data1) // 获取不带图片的数据

        // 子类
        class CreatImgList extends CreatList { // 原型继承
            constructor(select, data) {
                super(select, data) // 属性继承
                this.imgUrl = data.url // 新增属性
                this.render() // 自动执行
            }

            render() { // 增加输出图片功能的函数（原型/方法）
                super.render() // 执行之前的render函数(CreatList)
                var img = this.ele.querySelector("img") // 新增
                img.src = this.imgUrl
            }
        }

        var obj2 = new CreatImgList(".box2", data2) // 带图片的数据获取
    </script>
  ```

### 关于ES5和ES6在面向对象中使用
- 我们的原则是用最新的,也就是ES6,这个更加靠近其它语言规范,但是ES5可以让我们从底层了解到js的运行逻辑,这是知其所以然,在本单元中,class(ES6)就是把前面学的原型,对象等所有ES5一勺烩了打包成ES6语法糖,后面的继承亦如此,ES5知其所以然,ES6能用就多用.
  
## 对象的高级用法(PLUS)
### 对象的自定义属性-属性对象修改
- 针对对象属性key的一些特征修改,往常我们对对象的key值只有value修改,其实还有三个
- 基础语法 Object.definedProperty()
- 三个参数 : 目标对象,属性的key值,属性的特征(除了我们常用的value还有3个)
- 代码:
  ```
    <script>
        let obj = {
            b : 100
        }
        // Object.defineProperty 定义一个属性,不可对原生属性修改,只能添加新的
        // 3个参数 : 目标对象,属性的key值,属性的特征(除了我们常用的value还有3个)
        // 原生属性b的那三个特征属性都为true,只有对对象属性的有特殊需求时再使用这个方法
        Object.defineProperty(obj,"a",{
            // 属性配置对象的特征(4个): 
            // 1.是否可以被删除(默认false)
            // delete obj.a X
            configurable : true,
            // 2.是否可以被枚举(默认false)
            // 枚举: 使用for in 循环遍历是否可以获取到这个属性的value值
            // 不可枚举,但可以单独地访问到这个数据 obj.a V
            // 注意: 不可枚举状态下的对象属性和原生属性b颜色有差异
            // 一旦可以被枚举,颜色就和原生属性一致了
            // 另外的,原型中的一些原生态方法也都是不可枚举的状态
            // 在设置函数类工具是好用的,就比如系统自带的原型里的那些方法,枚举时不会干扰到你,单独调用时又可以使用
            enumerable : true,
            // 3.属性对应的值
            value : "Hello Niko!",
            // 4.是否可以写入数据(默认false)
            // key是否可以被赋值更新value
            writable : true
            
        })
        console.log(obj); // 打印发现,通过这种方式添加的属性和原生相比,颜色不同

        // 比如需求: 让设置对象属性为不可枚举不可删除不可写入
        // 封装 Object.defineProperty();
        // 我们在定义这条属性的时候只有value可以初始化一次; 

        function defineProperty( obj , prop , value ){
                let config = { 
                    // 属性是否可以被删除; 
                    configurable : false ,
                    // 是否可枚举属性 
                    // 注意 : 控制台之中可以查看的属性颜色变浅就是因为这个特征! 
                    // 这个特征我们在设置函数类别的工具的时候是比较好用的! 
                    enumerable : false ,
                    // 属性对应的值 : 
                    value : value,
                    // 表示给这条属性赋值时，赋值运算是否生效; 
                    writable : false
                }
                Object.defineProperty( obj , prop , config )
        }
        defineProperty( obj , "c" , "你好世界" )
        console.log( obj );
    </script>
  ```
### 对象属性的存取
- ==首先,**此时我们定义的属性不是以存储数据为目的,而是以触发"取值,赋值"行为为目的的操作,这里面的get和set对应的函数是当对对象发生取值和赋值的行为时才会执行此函数的内容**,后面的proxy也会有这个set get ,道理是一样的==
- get和set在返回值和参数上有所区别,注意识别
- 代码:
  ```
    <script>
        let obj = {}
        // 此时我们定义的属性不是以存储数据为目的,而是以触发"取值,赋值"行为为目的的操作!
        Object.defineProperty(obj, "a", {
            // 注意:属性特征设置和属性存储设置不能同时存在 !!!
            // 取值,在属性被访问时,就会调用这个函数,返回值是此函数的返回值
            get: function () {
                console.log("属性取值")
                console.log(this); // 没有任何参数,内置this属性:指向访问这条属性的对象
                return "hello world"
            },
            set: function (val) { // set有一个参数,val是赋值的具体参数
                console.log("属性赋值", this, val);
                // return 无意义(会自动返回val)
            }
        })
    </script>
  ```
### 数据驱动功能实现+本地储存
- ==这是利用对象自定义属性的get和set功能对页面渲染的一次升级,外加对要渲染的数据进行本地存储,相对于以往的数据驱动页面渲染更加方便,逻辑更清晰==
- 曾经的数据驱动 : 
    - 判定是否存在数据 , 把数据放入到变量之中 , 在变量之中转换数据类型, 把数据进行拼接渲染, 把数据放入到页面之中; 
- 现在的数据驱动 : 
    - 取值 :  获取数据 , 缓存数据; 
      赋值 :  数据的覆盖! 页面的渲染;
    - 简而言之,就是我们获取新数据后缓存给对象的变量(这是触发set),然后再set函数内写入对应的render()渲染函数,实现数据更新就执行渲染,逻辑链清洗简短
- 代码:
  ```
  HTML:
    <input type="text" id="ipt">
    <button id="add">添加数据</button> 
    <div class="container"></div>


    <script>
        // 曾经的数据驱动 : 
        // 判定是否存在数据 , 把数据放入到变量之中 , 在变量之中转换数据类型, 把数据进行拼接渲染, 把数据放入到页面之中; 
        // 混乱

        // 现在的数据驱动 : 
        // 取值 :  获取数据 , 缓存数据; 
        // 赋值 :  数据的覆盖! 页面的渲染; 

        // 我们所谓的数据驱动只不过是另一种形式的的事件驱动; 

        // 1. 在对象上建立一个属性 , 在取值时可以获取到 本地存储的数据 。 
        // 2. 赋值时可以把我们赋值的数据存入本地存储之中; 

        let module = {};

        function getStorage(){
            // 获取localstorage 里面的数据
            // 1. 获取到数据之后以数组形式进行返回; 
            // 2. 如果没有获取到数据就返回一个空对象; 
            let list = localStorage.getItem("list");

            // 判定list是否存在 : 
            if( list ){
                list = JSON.parse( list );
            }else{
                list = [];
            }

            return list ; 
        }
        function setStorage( val ){
            // 赋值的时候数据会发生改变; 
            // 我们选择在这里面进行页面渲染; 
            render( val );
            localStorage.setItem("list" , JSON.stringify(val));
        }
        function render( val ){
            document.querySelector(".container").innerHTML = val.map(
                item => `<li>${ item }</li>`
            ).join("")
        }
        Object.defineProperty( module , "list" , {
            get : getStorage,
            set : setStorage
        })

        // 注意 : 我们设置 localstorage 的方式必须给 module对象里面的list属性赋值! 

        // 向数组之中放入 "hello world" 这条数据;  

        // 1. 取值 ; 
        let { list } = module;
        // 2. 我们应该把数据拿出来进行操作,操作之后把数据赋值给 list 属性; 
        // list.push("hello worlld");
        // list.push("hello worlld");
        // list.push("hello worlld");
        // list.push("hello worlld");
        // 3. 如果想要设置到storage 那么我们必须要实现赋值操作;
        module.list = list;        

        // js之中一定是事件驱动结合数据驱动来完成我们的功能! 
        
        let btn = document.getElementById("add");
        let ipt = document.getElementById("ipt");
        function addData(){
            // 操作数据; 
            list.push( ipt.value );
            // 把数据赋值给 module.list 属性; 
            module.list = list;
        }
        btn.addEventListener("click" , addData )

    </script>
  ```
## proxy拦截器(PLUS)
### 数据拦截(对象的拦截)
- proxy: 拦截行为就是在取值或赋值之前做一些预处理,让我们获取的数据更好用,拦截对象或者函数,返回的是一个新对象!
- 语法: new Proxy(目标对象,配置拦截参数)
- 配置拦截参数 get(对象) set(对象) apply(函数)
- 代码:
  ```
  <script>
    // 基本语法:
    // 我们通过new proxy创建了一个中间层对象,通过这个中间层对象我们也可以访问到原对象,但是中间层提供了一层可被我们编程的函数层
    let obj = { a: 100, b: "你好世界", c: "ABC" }
    // 建立了proxy后,以后对obj的操作就不通过obj操作了,而是通过新构建出来的proxy对象进行操作
    let proxy = new Proxy(obj, {
        // 1. get 参数 : 表示对象有取值行为时触发
        get: function (obj, prop, proxy) {
            // // 注意:get函数存在三个参数
            // // 1. obj : 原始对象
            // console.log(obj);
            // // 2. prop : 我们访问数据时访问的属性名 a b c
            // console.log(prop)
            // // 3. proxy : 我们创建的代理对象,通常不用

            // // 访问时执行的普通代码
            // console.log("hello world");
            // // 注意:属性访问会把函数的返回值作为属性访问的结果
            // return "hello niko!"

            // 需求: 我们希望从obj中获取的所有数字类型数据全部转化为字符串类型数据
            // 判断当前的属性值类型
            if (typeof obj[prop] === "number") {
                return obj[prop] + "" // 把数字转化为字符串
            } else {
                return obj[prop]
            }
        },

        // 2. set : 赋值的时候会进行拦截操作
        set: function (obj, prop, val) { 
            // obj : 初始对象
            // prop : 我们设置数据的属性名 a b c
            // val : 你赋的值

            // 需求:我们赋值的数据小于10时,对这个数据进行补零(-> String)
            // 10 => "10"
            // 1  => "01"
            // 注意这里的obj是原始的对象数据,不是中间变量的数据,你修改的是proxy新对象的b的值,对原始对象没有影响
            // console.log(obj, prop, val)
            if(val < 10 && val >= 0){
                // return 无意义
                obj[prop] = "0" + val
            }else{
                obj[prop] = val
            }

            // 针对具体属性具体赋值
            switch( prop ){
                case  "list" :  
                obj[prop] = [val]
                break;
                case "obj" :
                obj[prop] = {val}
                break;
            }
        }

    })

    // 1. get的测试
    // console.log(proxy.a)
    // console.log(proxy.b)
    // console.log(proxy.c)

    // 2. set的测试
    proxy.a = 1
    proxy.b = 100
    proxy.c = "ni hao"
    // switch特殊处理
    proxy.list = "hello world"
    proxy.obj = "hello world"
    console.log(proxy.list);
    console.log(proxy.obj);

    console.log(proxy) // 获取中间对象,set所有的操作在中间变量上进行的,所以通过proxy获取,而非obj

  </script>
  ```
### 函数拦截
- 基本上和拦截对象大差不差,基本语法是 new Proxy(要拦截的函数,配置参数),配置参数只有apply
- 代码:
  ```
   <script>
      // 拦截器拦截函数调用行为
      // 在函数调用之前做些事情
      // 不在是get set 而是apply
      let foo = function(a,b,c,d){
          console.log(" hello world ",this,a,b,c,d);
      }
      // 拦截语法
      let proxy = new Proxy(foo,{
          // 拦截调用行为,在函数调用之前做预处理
          apply : function(fn,ctx,args){
              // fn : 调用的函数
              // ctx : fn函数的this指向
              // args : 调用函数时调用的所有参数,放入了数组中
              console.log("实际上调用了拦截器的中间函数",args);
              fn() // 调用原有函数
              // 原函数的fn的this指向的是window,直接打印ctx在ES6中是undefined
              // console.log(ctx);
              // 更改this的指向,ctx的指向一个对象
              fn.apply({a : 100},args.map(item => item * 2)) // this不在指向window,且传入了1 2 3 4 四个参数(参数也可以更改)
              // 这个apply是改变this指向里面的语法,和前面的apply毫不相干的
              // 语法: apply(this新指向,数组形式的参数)
          }
      })
      proxy(1,2,3,4)
    </script>
  ```
### 拦截器的应用
- 代码:
  ```
  <script>
      // 需求: 创建一个对象,当我们给对象的属性赋值数字类型的时候,向对象之中存入中文数字
      function creatChineseObject() {
          // 使用拦截器往往这么做,就是直接返回一个拦截器新对象,原来的对象不用单独创建,然后再单独创建一个Proxy指向它,初始对象不重要,所以这里的初始对象就是一个空对象{}
          return new Proxy({}, {
              // 存入数据时,转换数据,ES6新语法,简写
              set(obj, prop, val) {
                  // 判断val是不是数字类型
                  if (typeof (val) === "number") {
                      console.log("数字类型val,转换");
                      if(val >= 0 && val < 1000){
                          obj[prop] = toChinese(val)
                      }
                  } else {
                      console.log("其他");
                      obj[prop] = val
                  }
              }
          })
      }

      function toChinese(num) { // 数字转化为汉字的函数
          // 3位数情况
          if (num > 99 && num < 1000) {
              var bai = parseInt(num / 100)
              var shige = num % 100 // 二位数情况
              return toChinese(bai) + "百" + toChinese(shige)
          }
          // 2位数情况
          if (num > 9 && num < 100) {
              var shi = parseInt(num / 10) // 取十位数
              var ge = num % 10
              return toChinese(shi) + "十" + toChinese(ge)
          }
          // 一位数
          switch (num) {
              case 0:
                  return "零";
              case 1:
                  return "一";
              case 2:
                  return "二";
              case 3:
                  return "三";
              case 4:
                  return "四";
              case 5:
                  return "五";
              case 6:
                  return "六";
              case 7:
                  return "七";
              case 8:
                  return "八";
              case 9:
                  return "九";
          }
      }

      let obj = creatChineseObject() // 接受return返回的新对象(Proxy)
      obj.a = 67
      obj.b = "10"
      console.log(obj);
    </script>
  ```
### 运算拦截(了解)
- 代码:
  ```
  <script>
        // proxy 的 has 拦截:

        // 1. 拦截对象中属性的in运算,判断当前对象是否存在某些属性, 语法 : key in obj
        // proxy拦截运算的目的就是改写部分in运算的规则
        // in运算规则: 如果对象中存在判断的属性就返回true,否则false
        // let obj = { a : 10}
        // console.log("a" in obj); // true
        let obj = {a : 10 , _a : 100}
        let proxy = new Proxy(obj,{
            has(obj,key){ // 两个参数: 目标对象,对象的key值
                // 拦截后新增判定条件
                if(key[0] === "_"){
                    return false
                }else{
                // 正常判定
                    return key in obj
                }
            }
        })
        console.log("a" in proxy , "_a" in proxy);

        // 但是 for in 循环不受拦截器影响
        for(let key in obj){
            console.log(key) // a , _a
        }

        // 2. 拦截new运算,construct()
        // 拦截效果是改变new运算的返回值

        function Foo(a,b){
            this.num1 = a
            this.num2 = b
        }
        let Proxy2 = new Proxy(Foo,{
            construct(fn,args){ // fn原构造函数 args传入的参数
                console.log("拦截new运算");
                console.log(args); // 数组形式
                args = args.map(item => item * 2)
                console.log(args)
                // 必须有返回值,且为对象
                return new fn(...args)
            }
        })
        let p = new Proxy2(100,100) // 接收返回值(对象fn)
        console.log(p)

    </script>
  ```
### 拦截器删除拦截
- 代码:
  ```
  <script>
        // 拦截器删除拦截:
        let obj = { a: 10 , b : 100}
        let proxy = new Proxy(obj,{
            deleteProperty(obj,prop){
                // 这个删除规则是返回false就会拦截删除(不会删除),默认就删除
                console.log("123");
                switch(prop){
                    // 保留某些关键属性不会被删除
                    case "b" :
                        return false // 不可以删除proxy.b
                }
                delete obj[prop]
                // return true
            }
        })
        delete proxy.a // 删除操作.触发deleteProperty
        delete proxy.b // 不可以删除proxy.b
        console.log(proxy);
    </script>
  ```
### 自定义属性拦截
- 代码:
  ```
  <script>
        let obj = {}
        let proxy = new Proxy(obj,{
            defineProperty(obj,prop,val){
                console.log(obj,prop,val)
                // obj 是 初始对象
                // prop 是 访问的对象属性
                // val 是四个特征信息的对象集合
                // 给原对象赋值
                obj[prop] = val.value
            }
        })
        proxy.a = 10 // 触发defineProperty()
        console.log(proxy)
    </script>
  ```
## 对象克隆,闭包,科里化函数(PLUS)
### 对象的深浅克隆
- 克隆对象,用于其他操作,浅克隆只针对不涉及地址的简单数据类型
- 深克隆的野路子克隆可以解决90%的深克隆问题,可以把复杂数据类型克隆出来并且分配到不同地址
- 深克隆的递归克隆代码有难度,了解
- 代码:
  ```
   <script>
        let obj = { a: 100, b: 200, c: [] } // 数组复杂类型(引用类型)
        // 浅克隆:
        // 1. 只是把第一层数据克隆,如果原对象存在引用类型,那么内部的引用类型在克隆时不会被重新生成,而是直接引用原地址
        let cloneObj = {}
        // 浅克隆模式 for in 循环克隆
        for (let attr in obj) {
            // 克隆对象把obj的属性名作为自己属性名赋值
            // 并把对应在obj里的值赋值过来
            cloneObj[attr] = obj[attr]
        }
        console.log(cloneObj);
        console.log(cloneObj.c === obj.c); // true 地址相同
        // 克隆和原对象公用一个地址,那么我们在操作克隆对象的数据时会产生"连坐"效果影响到原对象

        // 2. 深克隆
        // 把对象结构内部的所有内容都重建一遍,包括引用类型,且无论层级(例如二维数组,引用类型内部还是引用类型[1,2,[3,4]])

        // 1. 野路子深克隆 : 把对象转换成JSON,在根据JSON重新建立对象
        // 对象 -> JSON -> 新对象(新地址)  
        // let a = {...} -> JSON({...}) -> let b = {...}  a与b的地址不同
        let obj1 = { a: 100, b: "123", c: { d: { e: {} } } } // c有3层对象嵌套
        let cloneObj1 = JSON.parse(JSON.stringify(obj1))
        console.log(cloneObj1);
        console.log(cloneObj1.c === obj1.c); // false

        // 2. 递归封装深克隆
        // 如果当前要克隆的属性值是引用类型那么我们重新调用deepclone
        // deepclone的作用是对属性值是对象或数组的数据创建一个新的[]或{},在把属性值赋值到这个[]或{}里面,然后整个返回给(递归)此属性值的key (clone[attr])
        function deepClone(data){ // data 是被克隆的数据
            let clone = null
            if(data instanceof Array){ // data是数组
                clone = []
            }else{ // data是对象
                clone = {}
            }
            for(let attr in data){
                // 判定当前 属性值 是不是数组或对象

                // 1.判定数组 新关键字 instanceof
                // 语法 : 数据 instanceof 构造函数 , 反町数据是不是构造函数的实例对象
                // 对于数组 语法 : 数据 instanceof Array(数组) , 为true表示数据是数组,反之则反
                // 2.判定对象
                // 注意 : instanceof会把所有类型的数据都判定为构造函数是Object
                // 所以对象判定需要组合逻辑
                // 1. typeof 数据 为object
                //  - 因为 array null object 的typeof结果都是object
                //  - 所以我们要排除 null 和 array 情况
                //  - 详见isObject函数
                if(obj[attr] instanceof Array || isObject(data[attr])){ // 如果属性值是数组或对象
                    clone[attr] = deepClone(data[attr])
                }else{ // 普通数据(非引用类型 or [],{}内部的普通类型赋值)
                    clone[attr] = data[attr]
                }
            }
            return clone 
        }

        function isObject (data){ // 判断属性值是不是对象
            return typeof data === "object" && data != null && !(data instanceof Array)
            // 返回true就代表data只能是对象
        }

        let cloneObj3 = deepClone(obj1)
        console.log(cloneObj3.c === obj.c);
        

    </script>
  ```
### 闭包,闭包应用,科里化
- 首先闭包在前端中类似八股文的存在,用的不多,了解即可
- 科里化也是了解即可,许多科里化的函数已经被做成包封装好了,直接用即可,例如bind
- 代码(集合3节课的)
  ```
  --------什么是闭包?-------------
   <script>
        // 闭包: 闭包就是函数的高级应用
        // 函数的使用: 定义阶段 + 调用阶段

        // 普通函数理解:
        // 定义阶段: 
        //  - 函数会在内存之中开辟一个存储空间
        //  - 把函数体的代码放入这个内存中
        //  - 把储存空间的地址给函数(函数是复杂数据类型,引用类型)

        // 调用阶段:
        //  - 按照地址找存储空间
        //  - 形参赋值(函数调用时实参给形参赋值)
        //  - 预解析(语法检查 + 声明提升)
        //  - 将函数存储空间中的代码执行

        // 从高级函数角度重新理解函数调用阶段:(前三步相同)
        // 1.按照地址找存储空间
        // 2.形参赋值
        // 3.预解析
        // 4.在内存中开辟一个*执行空间* (和定义阶段的存代码的*存储空间*不同 ! ! ! )
        // **两者区别** : 
        // 定义阶段的存代码的存储空间相当于工厂库房,只存储数据
        // 调用阶段的执行空间相当于车间,会进行装配工作
        // 5.将函数存储空间中的代码拿出开在刚开辟的执行空间里执行 (库房取零件->车间装配)
        // 6.执行代码结束后,*执行空间*会被立即销毁 
        
        // 新概念-执行空间:
        // 每个函数声明后都会有一个存储空间
        // 但是每次调用都会生成一个新的执行空间,每次调用执行空间地址都不同
        // 执行空间会在函数执行后立即销毁,存储空间会在程序关闭后(浏览器关闭)统一销毁
        
        // 学习执行空间的意义:
        // 通过闭包我们可以让这个执行空间不会被销毁
        // 函数执行空间不销毁: 一旦函数返回了引用类型,并且外部有变量接受这个地址,执行空间就不会被销毁 
        function foo(){
            let obj = { name : "kerwin"}
            return obj 
        }
        let res = foo()  
        // 闭包过程:
        // 函数执行时,生成一个执行空间 执行空间的地址 01
        // 代码在01空间中执行
        // 在01中定义了一个对象obj 这个对象的地址02
        // 在01执行代码期间把02这个地址返回出去了
        // 函数外部接受了一个地址02
        //   - 这个地址时在函数内部01空间中声明的,此时01和02产生了关联(01销毁了,02也就丢失了)
        //   - 因为02有用,所以01也不是垃圾内存,不可以被销毁

        // 但是如果想让01判定为垃圾并删除,我们需要给obj赋值null,此时01就会被删除


    </script>


    -------------闭包的应用----------------

    <script>
        // 闭包前端的八股文,用处比较少,不用过多关注
        // 了解什么是闭包,如何实现闭包?

        // 闭包的应用基于函数执行空间不销毁完成的
        // 有几个条件组成闭包
        // 1.不销毁的空间
        //  - 闭包的应用不返回对象,返回函数类型

        // function outerFoo(){
        //     return function innerFoo(){}
        // }

        // 2.内部函数引用外部函数中的变量
        //   - 设计两个函数操作

        function outerFoo(){
            // 外部函数声明的变量
            // - let var const 声明
            // - 参数(形参)
            let a = 10
            return function innerFoo(){
                console.log(a) // 在内部函数被引用
            }
        }
        let innerFoo = outerFoo()
        // outerFoo 执行时生成一个执行空间01
        // 在01执行空间内部定义了变量a,存储在02(基本类型存储也有地址)
        // 返回一个函数,函数地址03
        // 我们在全局innerFoo接受到的地址是03
        // 03和01产生了关联
        // 执行空间不删除,那么在其内部生成的变量02也不删除
        // 我们以后调用函数03时,我们可以调用到这个变量a(02地址)

        // 闭包的特点
        // 1.作用域不销毁
        //  - 优点: 变量不被销毁,延长变量的声明周期
        //  - 缺点: 变量不被销毁,占用内存
        // 2.函数外部访问函数内部变量(全局访问局部)
        //  - 优点: 可以全局访问内部数据
        //  - 缺点: 保持时刻引用,内部函数的执行空间不能被销毁
        // 3.保护私有变量
        //  - 优点: 可以把一些变放在函数内,不污染全局命名空间
        //  - 缺点: 利用内部函数才能访问到私有变量,变量访问不是很方便

        // 闭包总结
        // 1. 有一个A函数,A函数内部返回了B函数
        // 2. A函数外面有变量接受B函数
        // 3. B函数内部访问着A函数内部的私有变量

    ----------------科里化函数---------------

    <script>
        // 科里化是函数的一种转化方式
        // 将一个接收多个参数的函数,转换为接受部分参数的函数
        // 科里化函数只传递部分参数来应用,每次返回一个新函数,处理剩余的参数!
        // 科里化的应用是逐步传参的过程应用

        // function sum(a, b, c) {
        //     return a + b + c
        // }
        // let res1 = sum(1,2,3)
        // console.log(res1)
        // // 科里化: 返回的是新的函数用来接受剩余参数
        // function _sum(a) {
        //     return function (b) {
        //         return function (c) {
        //             return a + b + c
        //         }
        //     }
        // }
        // // 每次传一个参数,传三次完成运算
        // let _res2 = _sum(1)(2)(3)
        // console.log(_res2);

        // 实战科里化封装:
        function sum(a, b, c) {
            return a + b + c
        }

        function curry(fn,args=[]){
            // 科里化函数要返回一个新的函数
            // fn: 参与最终计算的函数sum
            // args: 配置参数(难点)

            // 科里化函数封装核心判断当前传入参数总数是否和函数需求数量相同
            // - 函数参数数量 , 通过函数.length 获取
            let num = fn.length;
            // - 总共传入多少参数
            // 注意: 我们传递参数是向匿名函数传参的,记录总数要在匿名函数外记录, 使用args记录
            // args设置一个默认参数 = [] 空数组
            return function(..._args){
                // ..._args表示传入的所有参数都以数组形式接受
                // 进行参数拼接,获取当前参数和之前参数总数的拼接
                _args = args.concat(_args)
                // 判断当前的拼接好的参数数量是否和函数需求数量一致,如果一致就计算,不一致重复调用curry函数,返回匿名函数
                if(_args.length === num){ // 传够参数就计算
                    return fn(..._args)
                }
                if(_args.length < num){
                    // 如果不一致,我们再次返回curry函数,并把已经拼接好的数组传进去,args = _args,再传入新参数进入_args,再拼接出新的args
                    return curry(fn,_args)
                }
            }
        }

        // 基础版科里化函数
        let _sum = curry(sum) // curry没有传递参数,所以本次args默认为空数组
        let res = _sum(1,2)(3) // 难点: _sum()里的实参1和2是对应的curry内第一个return func()的形参,所以_args = [1,2]

        // 传参在js内很自由,传1到多个参数
        let res1 = _sum(1,2,3) // 只有参数够了才计算
        let res2 = _sum(1)(2)(3)
        let res3 = _sum(1)(2,3)
        console.log(res,res1,res2,res3);

        // 我们可以提取部分重复使用的参数,简化最终计算时的函数参数传入
        // 可以设置初始值,这个初始值在后续调用中会存在
        let _sum2 = curry(sum, [998])
        // 后续操作就不用重复写998
        let res4 = _sum2(200,300)
        console.log(res4);

        // 动态创建函数,函数中自带一些数据
        // 比如:夜间外卖,函数自动传入了10元配送和8元夜间额外费用
        let _sum3 = curry(sum,[10,8])
        // 这是直接写餐费即可计算总价
        console.log(_sum3(32))

        // 总结:
        // 科里化函数作用: 
        // 1.函数多次分部执行
        // 2.固定参数(998),后期配置根据实际自行配置
        // 3.参数复用,提取公用参数(外卖)
        // 4.动态创建函数,return函数内可以创建不同语义的函数
        
        // 用的不多,有很多封装好的包都有科里化,比如bind

    </script>

  ```
## Promise对象(PLUS)
### 基础知识
- ==**1.promise对象的作用?**==
- ==Promise : 解决回调函数过渡嵌套导致的回调地狱问题!==
- ==Promise 对象是非常适合处理javascript网络请求的异步程序!== 
- 代码:
  ```
  // Promise : 解决回调函数过渡嵌套导致的回调地狱问题! 

        // 回调函数 : 
        // 函数A传递了一个参数b , 参数b是函数; 
        // 我们在A之中调用了参数函数; 
        // 执行A就会执行b
        // function A( b ){
        //     b();
        // }
        // A(function(){
        // });
        // 异步的回调函数才使用Promise对象进行处理; 
        // 同理上面的回调,自动执行func,第二个参数是1000ms倒计时
        // setTimeout( function(){
        // } , 1000 )

        // 回调地狱 : 
        // 下方程序几乎完全无法维护
        setTimeout( function(){
            setTimeout( function(){
                setTimeout( function(){
                    setTimeout( function(){
                        setTimeout( function(){
                        } , 9000 )
                    } , 7000 )
                } , 5000 )
            } , 2000 )
        } , 1000 )
        
        // 我们以后什么异步程序都用Promise对象么 ? 
        // Promise 对象是非常适合处理javascript网络请求的异步程序!  
        // 网络请求后面学,学习前置知识promise
  ```
- ==**2.Promise对象的创建**==
- ==摘要: 创建Promise对象关键字就是Promise==
  ==**let p1 = new Promise ( function( resolve,reject ) {.....} )**==
  ==关键点==: 1.初始创建Promise对象时必须要传入一个函数,这个函数名为规则指定函数,就是里面这个function,他的作用是改变promise对象的状态,这个函数的两个参数就是改变状态的工具,resolve为成功,reject为失败,执行后promise的状态就会改变,这个初始pro对象只能改变一次状态
  2.promise的状态是很重要的,使用promise都是要围绕着其状态执行响应代码的

- 代码:
  ```
   <script>
       <script>
        // 创建promise对象的语法
        // promise对象的状态机制 取决于resolver的执行情况

        // 创建promise对象
        // 注意: 我们必须传入一个函数,这个函数是resolver(),规则指定函数
        // promise的定义规则主要是为了控制promise对象的状态改变逻辑
        // 初始状态 -> 成功状态/失败状态
        // 通过打印,promise对象是有状态属性[[PromiseState]]
        // 初始状态: "pending"  成功状态: "fullfilled"  失败状态: "rejected"
        // 注意:状态只能改变一次,即从初始->成功/失败,改变之后再次改变无效
        let p = new Promise(function(resolve,reject){
            // promise对象状态的改变规则必须在创建promise对象的时候提前制定好
            // 传入的函数有两个参数,成功状态改变工具,失败状态改变工具
            // 两个参数的单词可以随意换,以下是官方文档单词
            // resolve : 解决, 表示承诺被解决,状态为成功
            // reject : 解决, 表示承诺未被解决,状态为失败
            // 注意: 这两个参数都是函数,调用哪个当前的promise状态就变成什么

            // resolve()
            // reject() // 同时还会报个错提醒你

            // 怎么使用promise的状态改变工具?
            // 答: 放在异步程序之中改变promise对象状态
            setTimeout(function(){
                resolve()
            },1000)
            // 这个语法产生后,我们的网络请求异步程序都放在promise对象创建时的函数之中进行编写
            // 此时我们异步程序的代码执行结束后,我们不需要再调用后一步的代码了
            // 只需要改变promise的状态即可

            // 总结 : 我们用promise对象记录异步程序的执行状态!  

        })
        console.log(p);

    </script>
  ```
### promise对象的使用
- 新工具: promise的三个监听工具 then catch finally,这三个是promise的方法
- then catch会监听promise状态,然后执行对应的函数,从这里我们可以看到promise的使用紧紧围绕其状态的改变
  > 补充: 改变pro状态的resolve或reject是都放入异步程序里执行了,并且这两个方法可以传入形参,再对应的then或catch函数内可以接受到这个参数.
- 代码:
  ```
  <script>
        // 使用promise对象
        // 核心: 查看promise对象的状态.等到其状态改变时再去执行某些程序

        // promise状态监听工具有三个
        //  2个参数  then(状态成功之后执行的函数,状态失败后执行的函数)
        // catch(状态失败时执行的函数)
        // finaly(只要状态改变就执行函数)
        // 但是 finaly 没有数据!!

        let p = new Promise(function(resolve,reject){
            // 随机时间后会改为成功状态
            // 此后我们不必关注异步程序具体内容,只需关注promise对象的状态即可
            setTimeout(()=>{
                // resolve("状态成功了")
                // 我们在改变状态的时候给函数传递实参, 这个实参内容就是promise对象的执行结果内容; 
                // 打印promise对象后,查看属性[PromiseResult]内容即可
                // 这个内容可以在对应的状态处理函数中接受
                reject("状态失败了")
                // 如果我们定义了失败处理函数那么我们promise状态失败时就不会报错
            },Math.random() * 5000 + 1000) // 0-6
        })
        // 使用then监听promise状态

        // 注意 : 我们以后使用promise
        p.then(handlerSuccess,handlerError)

        // res接受数据,提示promise的状态情况
        function handlerSuccess(res){
            console.log("success---异步代码执行结束");
            console.log("这是状态改变时传递出的数据!"  , res );
        }
        function handlerError(res){
            console.log("error---异步代码执行有问题");
            console.log("这是状态改变时传递出的数据!"  , res );
        }

        console.log(p);
    </script>
  ```
### promise对象的then进阶使用
- 关键点: 1.介绍了then的返回值的两个原则
  2. 根据这两个原则,我们使用promise的then方法可以解决回调地狱问题
  3. ==学会连缀写法以及其内部执行逻辑==
- 代码:
  ```
  <script>
        // then函数的进阶使用(再次强调 then是promise的一个方法)
        // then的返回值 
        // 根据返回值的连缀规则
        
        // promise对象会在1s后把状态改为成功状态
        // let p = new Promise((resolve,reject) =>{
        //     setTimeout(function(){
        //         resolve()
        //         // reject()
        //     },1000)
        // })

        // function handlerSuccess(){
        //     console.log("success");
        //     return new Promise((resolve,reject) => {
        //         setTimeout(function(){
        //             reject() // then执行了这个函数后,收到了promise返回值,状态为失败,为下一个catch方法执行做铺垫
        //         },1000)
        //     })
        // }
        // function handlerError(){
        //     console.log("error");
        // }

        // // then的返回值分为两种
        // // 1.我们传入的参数函数返回值不是promise对象!  then 就启用默认返回值
        // // 默认返回值是一个新的proimse对象和调用then的promise对象(p)不一样! 但是新的promise对象和就的proimse对象状态一致; 
        // // 2.如果传入的参数函数返回值是一个promise对象,那么就返回这个promise对象
        // // 异步程序列队,避免回调地狱问题(嵌套)

        // // 注意我们使用状态监听工具只使用一个then参数,我们会用catch接受错误函数
        // p   // 连缀写法,按顺序执行,后面是否执行的状态依据是前面执行的返回值的状态
        // // 解释: 首先p作为一个promise对象会有成功或失败的状态,如果是成功状态,那么执行then方法,根据then的返回值原则重新确定p的状态,而连缀的下一个方法catch的执行就取决于then返回的这个promise对象的状态是否是失败,如果是失败则执行catch方法,如果不是则不执行,同理的如果p的初始状态是失败,那么就直接执行catch
        // .then(handlerSuccess) // 成功状态调用的回调函数
        // .catch(handlerError) // 失败状态调用的回调函数

        // 需求 : (异步程序列队,杜绝了嵌套,防止了回调地狱,后面的代码执行会根据promise对象的状态来进行,不会关注异步程序的内部代码,维护大大减轻)
        // 异步程序1执行结束之后再去执行异步程序2, 异步程序2执行结束之后, 再去执行异步程序3, 异步程序3 执行结束之后再执行异步程序4;
        
        // 异步程序1状态对象
        let p1 = new Promise((resolve,reject) => {
            setTimeout(function(){
                console.log("异步程序1执行");
                resolve()
            },1000)
        })

        function p1Success(){
            return new Promise((resolve,reject) => {
                setTimeout(()=>{
                    console.log("异步程序2执行");
                    resolve()
                },1200)
            })
        }

        function p2Success(){
            return new Promise((resolve,reject) => {
                setTimeout(()=>{
                    console.log("异步程序3执行");
                    resolve()
                },1200)
            })
        }

        function p3Success(){
            return new Promise((resolve,reject) => {
                setTimeout(()=>{
                    console.log("异步程序4执行");
                    resolve()
                },1200)
            })
        }
       

        p1 // 执行p1初始代码---异步程序1执行且得到初始状态为成功状态
        .then(p1Success) // 依据: p1的初始状态---成功---执行p1Success(内部代码 = 执行异步程序2 + 返回一个成功状态的proimise对象)
        .then(p2Success) // 依据: then的p1Success返回值的promise对象的状态---成功---执行p2Success(以此类推)
        .then(p3Success) // 依据: then的p2Success返回值的promise对象的状态---成功---执行p3Success
         // finally 函数主要使用于dom操作,特效操作, 而不进行数据操作; 
        .finally( function(){
            console.log("负责特效的函数");
        })
    </script>
  ```
### promise的高级应用
- 在学习了then catch finally后,新增两个新方法,在promise对象系统默认的构造函数constructor内部,分别为all和race,简单理解下其应用
- 代码:
  ```
  <script>
        // 新方法
        // promise.all
        // promise.race 
        // 这两个方法在promise的构造函数上(系统默认的constructor里),可以通过构造函数直接访问

        // 作用: 对多个promise对象的状态监听,让多个promise对象状态改变后进行处理

        // all: 等待所有传入的promise对象状态全部转变为成功之后在进行处理
        // race: 哪个promise对象状态转变的快就使用哪个promise对象

        // all参数: 数组 (里面是多个promise对象)
        // 返回值: promise对象,这个对象的状态在数组中所有的promise对象全部变为成功后才会转变为成功状态
        let p1 = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve("p1-success")
            }, 2000)
        })
        let p2 = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve("p2-success")
            }, 5000)
        })
        let p3 = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve("p3-success")
            }, 3000)
        })

        let all_promise = Promise.all([p1, p2, p3])
        all_promise.then(res => {
            console.log(res); // 等待状态都成功后,再把p1 p2 p3的形参都打印出来
        })

        let race_promise = Promise.race([p1,p2,p3])
        // 注意 : Promise.race 的参数和返回值是完全相同的, 不同的是执行机制, 哪个promise对象最快发生状态改变, 我们的race_promise 状态就会变成哪个状态, 并且race 得到的数据只有最快的那个promise对象数据;  
        race_promise.then(res => {
            console.log("race " + res);
        })
        
    </script>
  ```
### async await 关键字
- 功能1 语法糖 简化then获取传入数据的过程(此为pro为成功状态下,失败状态另说)
- 代码:
  ```
      // async await 简化promise对象操作 --- 语法糖
      // 把then获取数据的语法进行简化,不用函数的嵌套写法
      // 如下

      // 目标: 获取promise对象状态改变时的resolve或reject传入的数据是可以使用async和await 
      let p = new Promise((resolve, reject) => {
          setTimeout(function () {
              resolve("hello 这是异步程序传入的数据")
          }, 2000)
      })

      // 1 传统写法 then(参数获取)
      p.then(res => { // res获取resolve内部的数据
          console.log(res);
      })

      // 2 优化 async await
      // async 定义特殊函数的关键字,特殊函数就是可以使用await关键字的函数
      // await是处理promise对象的关键字 
      //  - await + promise对象,作用是程序阻塞,等待promise对象状态改变并返回数据之后,再赋值,再执行后面的代码
      //  - let data = await p (promise对象名) 

      // async可以定义函数或箭头函数,只需要加前缀即可
      // 定义异步函数
      async function foo(){
          // async 定义的函数内部可以使用await关键字
          let data = await p // 这里的data在等待p这个pro对象状态改变后可以获取其内部resolve或reject的参数内容,对比then的传统获取更方便
          // 程序会等待p这个promise对象状态改变后再赋值,再执行后面的打印代码
          // await 后面的代码被js当作异步代码了
          console.log(data);
          // data就是传统方法的res数据
      }
      foo()
  ```
  > 1.特殊地,async定义的函数返回值是一个promise对象,但是不能用它替代new Promise去创建新的promise对象,两者的作用不同,创建pro对象是需要内部函数和状态工具的,async都没有
  > 2.async定义的函数除了返回值为promise对象外,没别的特殊区别,可以定义函数搭配await使用执行更高级的promise语法
- ==特性2: 接受async函数的返回值==
- ==首先async定义的函数返回值为promise对象,那么状态就有成功和失败,**先说成功状态**==
- 代码:
  ```
      let p = new Promise((resolve, reject) => {
          setTimeout(function () {
              resolve("hello 这是异步程序传入的数据")
          }, 2000)
      })
    
      async function foo(){ 
        let data = await p
        // 程序会等待p这个promise对象状态改变后再赋值,再执行后面
        console.log(data);
        // async 定义函数的promise对象只要函数执行到结尾了, promise对象状态就变为成功了 , 函数的返回值就是promise对象状态改变之后的值! 
        return "foo函数执行结束,状态改变为成功!"
      }
      foo()

      async function poo(){
          // 成功状态下
          let data = await foo() // 接受foo函数的返回值(pro对象)
          console.log(data);
          // data =  "foo函数执行结束,状态改变为成功!"
      }
      poo()
  ```
- ==**如果pro对象为失败状态**,那么在await等待pro对象执行过程中,执行到reject的代码会爆红,再js代码的特性,代码会停止执行==
- ==**使用try - catch来规避**==,try内部放入可能出错的代码端,并传入数据进入catch处理这个错误,在这个过程中报错不会终止程序进行
- try catch 无法捕捉语法错误
- 代码:
  ```
    // async await 关键字如何处理失败状态的pro对象
    // 语法结构如下
        try{ // 编写可能报错的代码
            console.log(a);
        }catch(e){
            // 如果try的代码报错,会执行catch中的代码
            // try-catch的参数e是必须传递的参数,把错误信息传递入catch之中,(知道错在哪里)
            // 这里e就是try内部代码报错的内容,我们打印出来
            // 错误类型为是没定义就打印变量
            console.log(e);
        }
        // 即使报错js也不中断代码执行
        console.log("try-catch后的代码");
  ```
- try-catch的应用,不报错执行try内部的代码,报错执行catch内部的代码,所以我么可以把正确情况下的代码都写入try语句,错误情况下的处理代码写入catch内部
- 代码:
  ```
    async function fn(){
        try{
            let data = await p2
            // async的函数p2的状态为成功,data接受其内部返回值
            console.log("使用data数据的代码");
        }catch(e){
            // p2的报错了,打印错误信息并执行处理这个错误代码
            console.log("错误信息:", e );
            console.log("处理错误的代码.......")
        }       
    }
    fn()
  ```
 > ==**注意:** async函数返回的是一个promise对象,这个promise对象想要使用,只能用async,await或then才能接收到数据==
### promise简单案例---红绿灯
- ==async + await 语法块,新用法就是不关心其返回值,而是使用await的特性实现顺序的列队,使不同的功能按照逻辑和时间依次执行==
- 代码:
  ```
    ///// css板块略
    <button>开启信号</button>
    <div class="light"></div>
    
    <script>
        //需求 : 红灯亮起3s 亮起绿灯 3s 亮起黄灯 1s 亮起红灯 .... 

        // promise对象的应用一般都会被封装; 
        // 每次调用都返回一个promise对象 , 控制亮起灯光时长，并且控制dom对象的颜色; 

        let light = document.querySelector(".light");
        let button = document.querySelector("button");

        // 创建灯光的函数
        function createLight( color , timer ){
            // 我们在使用promise对象的时候一定注意, 一个异步程序对应一个promise对象; 
            return new Promise(( resolve , reject ) =>{
                // 我们进行dom操作, 几秒钟之后改变状态; 
                // 注意 : new Promise传入的函数是同步程序会在创建promise对象的时候立即执行! 
                light.style.backgroundColor = color ; 
                
                setTimeout( function(){
                    // 当前的红绿灯已经量完了, 告知后续的程序可以继续执行了! 
                    resolve();
                } , timer )
            })
        }

        // function startLight(){
        //     // 创建红灯 , 等待3s之后状态改变告知变灯
        //     createLight( "red" , 3000 )
        //     .then(()=>{
        //         // 根据上一个灯的状态改变我们改变灯的颜色和时长返回这个灯的亮起状态; 
        //         return createLight( "green" , 3000 )
        //     })
        //     .then(()=>{
        //         // 根据上一个灯的状态改变我们改变灯的颜色和时长返回这个灯的亮起状态; 
        //         return createLight( "yellow" , 1000 )
        //     })
        //     // 从头开始 
        //     .then( startLight )
        // }

        // 更新语法 : 变成 async await语法; 
        // async 定义的函数除了返回值和普通函数不太一样，其余的特征都一样! 

        async function startLight(){
            // 如果想要在async之中的函数进行列队那么我们需要使用 await关键字; 
            // - 我们此时是不关注 pomise对象的返回值的, 我们只关注程序的执行顺序; 

            await createLight("red"   , 3000 )
            await createLight("green" , 3000 )
            await createLight("yellow", 1000 )

            startLight();
        }
        button.addEventListener("click" , startLight )

    </script>
  ```