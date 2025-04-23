# Javascript高级
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
## ES6及额外知识
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
### this的4种绑定方式
- ==1.默认绑定==
- ==记住一句话,单独地执行一个函数,不加任何修饰,那么这个函数内部的this一定指向window,这就是默认绑定==
  ```js
    // 1.默认绑定
    function foo() {
      console.log('foo',this);
    }
    // 独立调用函数
    foo() // window 
    =============================================
    var a1 = {
      foo2 : function (){
        console.log(this)
      }
    }
    // 把foo2内容赋值给bar,然后调用bar也是默认调用
    var bar = a1.foo2 
    bar() // window
    a1.foo2() // a1 这才是基于a1对象下的隐式调用
    =============================================
    // 3.直接调用函数,不附加任何操作都算默认调用,比如
    function test(fn){
      fn()
    }
    test(a1.foo2) // 把a1.foo2函数丢进去执行了
  ```
- ==2.隐式调用==
- ==就是对象调用,调用对象内部的函数,函数内部的this就指向这个对象,注意箭头函数会有变数==
  ```js
    // 2.隐式绑定 对象调用
    function foo3(){
      console.log(this)
    }

    var obj = {
      foo3: foo3
    }

    obj.foo3() // obj3
  ```
- ==3.显式调用==
- ==即call apply bind改变this指向的情况==
  ```js
    var obj = {
      name: 'a'
    }

    function foo4(){
      console.log(this)
    }

    // 改变this指向为obj,call与apply自动执行,bind是返回一个函数,需要手动执行
    foo4.call(obj) // this->obj
    foo().call(obj) X , 这是执行了foo函数后,对其返回值进行操作

    // 最好传入对象,即使是简单的数据类型,也会给自动包装为包装类对象
    foo4.call(123) // Number(123)
    foo4.call('123') // String(123)
    // 对于没有包装类的数据类型 如undefined 则指向window
    foo4.call(undefined)
  ```
- 4.new绑定
- ==可以学习巩固构造函数的知识点==
  ```js
    // 4. new绑定 js中使用new构建构造函数
    /*
      new绑定的流程: 
      1.创建一个空对象
      2.将this指向这个空对象
      3.执行函数体中的代码
      4.如果没有写返回代码,会自动返回这个对象
    */

    function foo5(name){ // 构造函数也是函数的一种
      this.name = name
      this.logThis = function (){
        console.log('foo5',this)
      }
    }

    var cdy = new foo5('cdy') // new实例对象cdy
    console.log(cdy.name)
    cdy.logThis() // this指向这个实例对象
  ```
### 箭头函数
- 1.写法简便
  2.this在箭头函数内规则不同于ES6之前的规则
- 代码:
  ```js
    <input type="text" id="mytext">

    <script>
        var test1 = function () {
            console.log("test1")
        }
        // 箭头函数的写法
        var test2 = () => {
            console.log("test2")
        }

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
    </script>
  ```
- ==箭头函数的额外补充==
  - 1.箭头函数没有显式原型,不能通过new来创建构造函数,在ES6中,class类语法糖代替了ES5的构造函数方式创建的类
  - 2.箭头函数不能绑定this,arguments,super参数,只从上层作用域去找
### this+箭头函数面试题
- ==前情提要:== 这是在html中执行js代码,由浏览器执行,因为在严格模式或者模块化模式下,全局定义的var变量并不会挂载到window上了(nodejs环境下是global),而node环境现在自带es模块化功能,如果不想要还需要config中去删除,麻烦所以不用了,另外es6的let const均不支持全局定义后自动挂载到window
- ==**this面试题1**==
  ```js
    <script>
      var name = "window";

      var person = {
        name: "person",
        sayName: function () {
          console.log(this.name);
        },
      };

      function sayName() {
        var sss = person.sayName; // sss是获取对象中的函数sayName方法
        // sss是独立的函数,直接调用属于默认绑定,指向window
        sss(); // 因为this->window, 所以this.name = window (var name)

        // window->window 分别意为指向和答案
        person.sayName(); // 隐式绑定: 指向的就是person, person->person

        // ========== 3 4 ==============
        (person.sayName)() // 和上面一样,()内部什么都没有做 person->person
        (b=person.sayName)() // 间接函数引用,属于给b赋值一个函数,得到的结果是一个独立函数,同等与b(),和sss()一个道理,调用独立的函数 window->window
      }

      sayName();
    </script>
  ```
- ==重点知识:==
  - 1.sss赋值: 把person的函数sayName内容赋值给了sss了,此时sss就是一个独立的函数,==独立函数全局直接调用,this->window==
  - 2.区别于赋值给sss,person.sayName()直接执行了person的sayName函数,那这个this就指向了person
  - ==3和4比较冷门==,了解即可,且4并未正常运行,间接函数引用
- ==**面试题2**==
  ```js
    <script>
      var name = 'window'

      var person1 = {
        name: 'person1',
        foo1: function(){
          console.log(this.name)
        },
        foo2: ()=> console.log(this.name),
        foo3: function () {
          return function () {
            console.log(this.name)
          }
        },
        foo4: function(){
          return ()=> {
            console.log(this.name)
          }
        }
      }

      var person2 = {name : 'person2'}

      // 隐式绑定 简单调用,person1->person1
      person1.foo1()  
      // call 显式绑定 person2->person2
      person1.foo1.call(person2) // call会自动执行 person1.foo1是函数,并没有执行,而是call方法执行的,并把指向变了,person2->person2

      // 箭头函数 window->window
      person1.foo2() // 箭头函数,this的指向是父级函数作用域,没有就指向window window->window
      // window->window 
      person1.foo2.call(person2) // 箭头函数没有this,所以对箭头函数的this改变指向毫无作用,同上, window->window 

      // window->window
      person1.foo3()() // 第一()执行获得return返回一个函数func,第二()执行了这个函数func,这个函数属于独立函数,默认绑定 window->window
      // window->window
      person1.foo3.call(person2)() // 不执行foo3,拿到foo3函数后通过call调用,但是call进改变了foo3函数内部的this指向,并没有影响到return的函数,所以还是获取了一个函数,第二()执行这个独立函数,window->window
      // person2->person2
      person1.foo3().call(person2) // 与上面不同的是,这次执行了foo3函数,先获取到了return的函数,这时通过call改变了this指向为person2,person2->person2

      // person1->person1
      person1.foo4()() // 第一次()执行拿到箭头函数,第二次()执行这个箭头函数,箭头函数this看父级函数作用域,所以this指向foo4函数作用域,即person1,person1->person1
      // person2->person2
      person1.foo4.call(person2)()  // call先把foo4的this指向改为person2,然后执行foo4的函数,这时箭头函数this指向也就跟着foo4一同指向person2,第二()执行这个箭头函数,person2->person2
      // person1->person1
      person1.foo4().call(person2) // 先执行foo4(),获取箭头函数,然后又给箭头函数call新的this指向,箭头函数没有this,所以毫无作用,依旧按照this的父级作用域来判断this,person1->person1
    </script>
  ```
- ==重点==
  - 1.foo1就是直接调用和简单call改了this指向,没有坑,==call和apply会自动执行,bind不会==
  - 2.foo2,箭头函数相关,第一个直接执行,箭头函数父级函数作用域的问题; 第二个call尝试对箭头函数本体修改this,无效工; ==注意是直接执行(带括号)还是先提取函数内容,再借助call(...)执行,后面有很多,foo2不叫执行,foo2()才叫执行==
  - 3.foo3考察返回值为函数的问题,返回的这个函数是独立函数,this->window,即第一个foo3测试,后面两个foo3测试即有关于直接执行(带括号)还是先提取函数内容,再借助call(...)执行
  - 4.foo4返回箭头函数,==箭头函数this早已确定了为foo4函数的this指向==,只要不改变foo4函数this指向,就无法影响到箭头函数的this
  - ==**认识到person.foo().call(...)和person.foo.call(...)()的不同**==
- ==**this面试题3**==
  ```js
    <script>
      // 设置window的name属性值,为了测试
      window.name = 'window'
      // 构造函数下的this面试题
      function Person(name){
        this.name = name
        this.foo1 = function (){
          console.log(this.name)
        }
        this.foo2 = ()=> console.log(this.name)
        this.foo3 = function(){
          return function(){
            console.log(this.name)
          }
        }
        this.foo4 = function(){
          return () => {
            console.log(this.name)
          }
        }
      }

      var person1 = new Person('person1')
      var person2 = new Person('person2')

      person1.foo1() // 隐式调用 person1
      person1.foo1.call(person2) // 给foo1换this指向 显示调用, person2
      person1.foo2() // 箭头函数 父级函数作用域 -> func Person, person1
      person1.foo2.call(person2) // 箭头函数无this,无效, person1
      person1.foo3()() // 独立调用 window
      person1.foo3.call(person2)() // 给foo3的函数改指向了,但不关return func函数的指向,window  
      person1.foo3().call(person2) // 给return的函数改this指向, person2
      person1.foo4()() // 箭头函数 父级作用域 是foo4的函数, foo4函数内部的this指向实例, person1
      person1.foo4.call(person2)()  // 改变了父级作用域foo4的this指向,箭头函数随之改变,person2
      person1.foo4().call(person2) // 给箭头函数改this,无效,person1

    </script>
  ```
- ==看完this的四大绑定方式的new绑定和下面的构造函数相关知识点,结合前面的面试题1和2,很轻松就会理解,换汤不换药==
- ==person1/2的实例对象图==
  - ==**堆中创建**==
  - 独立内存,互不干扰(内部的foo函数也是如此)
  [![pEtckge.png](https://s21.ax1x.com/2025/03/08/pEtckge.png)](https://imgse.com/i/pEtckge)
- ==4.this面4(和3很像)==
  ```js
    <script>
      // 构造函数2
      function Person(name){
        this.name = name
        this.obj = {
          name: 'obj',
          foo1: function(){
            return function(){
              console.log(this.name)
            }
          },
          foo2: function(){
            return ()=>{
              console.log(this.name)
            }
          }
        }
      }

      var person1 = new Person('person1')
      var person2 = new Person('person2')

      // 多了一个寻找obj的过程 其余的没有太大变化 会3就会4
      person1.obj.foo1()() // window
      person1.obj.foo1.call(person2)() // window
      person1.obj.foo1().call(person2) // person2

      // 注意仔细看 外层还有个obj
      person1.obj.foo2()() // obj
      person1.obj.foo2.call(person2)() // person2
      person1.obj.foo2().call(person2) // obj

    </script>
  ```
### 改变this指向

- 在面向对象中用
- 代码:
  ```js
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
### 函数对象的原型与Function的关系
- ==apply-call-bind来自何方?==
  ```js
    function foo(name){
      console.log(this,name)
    }

    foo.apply()
  ```
  foo在使用apply方法时是当作对象使用的,而函数对象是由`new Function()`创建的,所以==所有的函数实例对象==都有以下关系
  ```js
    console.log(foo.__proto__ === Function.prototype) // true
  ```
  foo本身没有apply方法,所以会到自身的原型上去找,自己的原型就是Function的原型
  ```js
    console.log(foo.apply === Function.prototype.apply) //true
  ```
  ==结论: apply方法来自js内置函数Function的显式原型上==
- 对象中某些属性和方法来自Function.prototype,==意味着我们给Function.prototype添加的属性和方法可以被所有函数使用==
### 手写apply-call
- ==基础了解==
  ```js
    // 1.给函数对象添加方法
    Function.prototype.hyapply = function () {
      console.log(this) // -> foo
      this() // = foo()
    }

    function foo () {
      console.log('我是foo,我的this指向',this) // -> window
    }

    // 2.调用自己写的apply模拟函数
    foo.hyapply()
  ```
  - `foo.hyapply()`执行内部代码,this指向调用者foo,所以打印了foo函数,`this()`相当于`foo()`,并执行foo函数,==而foo内部打印的this指向`window`,因为foo刚刚属于默认调用,this指向window==
- ==手写apply==
  ```js
    // 1.给函数对象添加方法
    Function.prototype.hyapply = function (thisArg,otherArg) {
      // 严谨一点(非严格模式下)
      // undefined和null指向window 其余的基础类型,比如数字,字符串统一Object()转化为对象类型,对象本身直接返回
      thisArg = (thisArg === undefined || thisArg === null) ? window : Object(thisArg)

      thisArg.fn = this // 把foo函数赋值给fn
      thisArg.fn() // 执行了foo函数,由thisArg调用,所以指向thisArg
    }

    function foo () {
      console.log('我是foo,我的this指向',this) // 指向thisArg
    }

    
    // 2.调用自己写的apply模拟函数
    foo.hyapply({name: 'codewhy'},['教室',10110])
    foo.hyapply(123,['教室',10110])
    foo.hyapply("cdy",['教室',10110])
    foo.hyapply(null,['教室',10110])
  ```
- ==手写call==
- 两者的唯一区别时,apply只接受2个参数,第二个参数为数组,内部放置了其他的参数,而call是把参数展开直接写
  ```js
  // 2.call方法 接受参数的方法不同而已 
    Function.prototype.hycall = function (thisArg,...otherArg) {
      thisArg = (thisArg === undefined || thisArg === null) ? window : Object(thisArg)
      thisArg.fn = this 
      thisArg.fn(...otherArg)
    }

    foo.hycall(123,'cdy',1212121)
  ```
  > 使用剩余参数语法即可,剩余参数会被包装进数组中
- ==**二次封装**==
  ```js
    // 二次封装
    // 1.封装到独立函数中
    function execFn(thisArg,otherArg,that){
      thisArg = (thisArg === undefined || thisArg === null) ? window : Object(thisArg)

      thisArg.fn = that // 如果不传递this,作为全局函数,它的this默认指向window
      thisArg.fn(...otherArg)
    }

    Function.prototype.hycall = function (thisArg,...otherArg) {
      execFn(thisArg,otherArg,this)
    }

    // 2.封装到Function原型上 少传递一个参数that
    Function.prototype.hyExec = function (thisArg,otherArg) {
      thisArg = (thisArg === undefined || thisArg === null) ? window : Object(thisArg)

      thisArg.fn = this 
      thisArg.fn(...otherArg)
    }

    Function.prototype.hyapply = function (thisArg,otherArg) {
      this.hyExec(thisArg,otherArg)
    }
  ```
  > hycall方法使用独立函数测试; hyapply使用原型方法测试
  > 原型方法优势: 随时使用,不用import; 少传递一个参数
- ==原型方法为何不必传递this的值?==
  当函数foo调用hyapply时,内部this指向foo,而hyExec又被这个this调用,所以hyExec内部的this就指向hyapply的this,而前面说了hyapply的this指向foo,串联起来就是hyExec内部的this直接指向了foo,即hyapply方法的调用者,所以不用传递this
### 手写bindX
- bind不会
  ```js
    function foo(){
      console.log(this,arguments)
    }
    
    // 第一个参数是指向谁,剩下的为剩余参数接受
    Function.prototype.hybind = function (thisArg,...otherArgs){
      thisArg = (thisArg === undefined || thisArg === null) ? window : Object(thisArg)
      thisArg.fn = this // this.fn存储了foo函数

      // 返回的这个函数必须箭头函数,如果是普通函数,那么返回给newFoo的新函数就是一个独立函数,独立函数的this指向window
      // 箭头函数则将内部this向上一层,指向外部的this,外部的this就指向foo
      return (...newArgs) => { 
        var allArgs = [...otherArgs,...newArgs]
        thisArg.fn(...allArgs) // thisArg调用了foo函数,foo指向thisArg
      }
    }
    // bind是返回新函数,自行调用,剩余参数接受参数的方式
    var newFoo = foo.hybind("abc","codewhy",100) 
    newFoo(1.22,'杭州') // 传递新的参数
  ```
- ==唯一要注意的是内部封装返回的新函数是箭头函数,保证了新函数内部的this指向==
### let,const与var
- 之前的var太过于松散不严谨,与其它语言的规范格格不入
- ==1.let const 与 var 区别==: 
  1.必须先定义后使用,var无所谓
  2.同一作用域不能重复声明,var是后面覆盖前面
- ==**2.let 和 const 区别**==:
  1.let定义变量,const定义常量,let定义的变量可以被赋值更新,const只有初始化的值,不可以更改
  2.let可以先定义而不初始化,const必须定义+初始化
  > 注意: const对于复杂类型的数据,只有改变地址,才算违规,不改地址只改内容,不算对常量的修改(**复杂类型只返回堆地址**)
- ==3.暂时性死区==
  - **let const创建的变量在代码执行前就会被创建**,但是从块级作用域顶部到声明变量完成前(即执行到let和const语句位置前),**变量是不能被访问的**,所以这些变量在此期间储存在==暂时性死区==
    ```js
      function foo(){
        console.log(bar) // bar在暂时性死区,访问不到
        let bar = 'bar'
      }
      foo()
    ```
  - 2.暂时性死区和==代码执行顺序有关==,和定义位置无关
    ```js
      function foo(){
        console.log(bar)
      }
      let bar = 'bar' // 声明完bar
      foo() // 可以访问bar
    ```
### 块级作用域
- ==在ES6中,let const function class都会创建块级作用域(即 { }),**函数比较特殊,浏览器允许外部访问作用域内的函数**,目的是方便维护老的项目==
  ```js
    {
      let foo = 'foo'
      function foo() {}
      class Person{}
    }
    console.log(foo) // X
    var p = new Person() // X
    foo() // V
  ```
- ==块级作用域应用:==
  ```js
  <button>按钮1</button>
  <button>按钮2</button>
  <button>按钮3</button>

  <script>
    const btnEls = document.querySelectorAll('button')
    for(let i=0;i<btnEls.length; i++){
      var btnEl = btnEls[i]
      btnEl.onclick = function(){
        console.log('点击了' + i)
      }
    }
  </script>
  ```
  - ==let定义的i有自己块级作用域==,执行了4次{}代码块,每个代码块都是一个作用域,每个作用域内i的值都会被保存,即使执行完代码块,因为有监听函数的引用,所以也不会被销毁,即i的值会被保存
  - ==如果是var定义的i,i就会在全局中保存==,当给四个函数绑定完事件后,通过for循环,全局的i已经变为2(0 1 2),此时再触发点击事件打印的i值就都是2
### var let const的选择
- var是js的语法遗留问题,是一个缺陷,==新版本下可以不使用var定义变量声明==
- 定义变量
  - const定义变量不会被修改,==可以优先使用==,防止不小心修改变量的值
  - let,当确定某些变量后期会频繁改变,使用let

### ES6的解构赋值
- ==快速的从**对象和数组**中获取里面的成员==
- ==1.在数组中使用==
  ```js
      // 1.数组的解构赋值,使用的[]
      var arr = ["111", "222", "333"]
      let [x, y, z] = arr  // 严格的顺序要求,就是一一对应
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
  ```
- ==2.在对象中使用==
  ```js
      var obj = {
          name : "kerwin",
          age : 100,
          location : "shandong"
      }
      // 根据对象中的key值,提取对应value值(没有顺序要求)
      let {name,age,location: mylocation} = obj 
      // 其中第三个参数修改了名字,提取location的value赋值给mylocation
      console.log(name)
      console.log(age)
      console.log(mylocation) 

      // 复杂对象 对象成员内部存对象和数组
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


      // 默认值,解构不存在的值可以初始化
      var obj = {
        name: 'obj'
      }

      let { name , num: myNumber = 20 } = obj
      console.log(name,myNumber)
  ```
### ES6对象和函数简写
- ==属性简写:==
  ```js 
    // var obj = { // 复杂写法
    //     username : username,
    //     password : password
    // }

    var obj = {
        username, // 1.当key与value相等时，写一个就行
        password
    }
        
    console.log(obj)
  ``` 
- ==函数简写:==
  ```js
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
  ```
### ES6模板字符串
- 学了2个：换行代码与js代码嵌入字符串
- 代码：
  ```js
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
### ES6展开运算符
- ==1.展开数组 **展开运算符: ... (就是三个点)**==
- 还可以展开字符串,转为一个个字符,但是用的少,就不写了
    ```js
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
        var b = a // 赋值的a地址,会"连坐"
        
        var b = [...a] // 简化:新的数组，与原来的不是同一个地址,只是把a的数据放进去了
        // 注意数组a内如果还存着复杂数据,还是会把地址复制进去的,展开运算符只展开一层的数据
        b[0] = "kerwin"
        console.log(a[0],b[0]) // 1 kerwin

        //3. 函数中的展开运算符---传参
        var test1 = function(a,b,...arr){
            console.log(a,b,arr)
        }
        let nums = [1,2,3,4,5,6]
        test1(...nums) // 1,2,[3,4,5,6]

        //4. 快速一一对应传参
        var arr = [1,2,3]
        var test = function(a,b,c){
            console.log(a,b,c)
        }
        test(...arr)// test(arr[0],arr[1],arr[2]) 

        // 5.后端传过开一个你不知道长度的数组，要你求最大值
        var arr = [21,32,54,66,141,457,1,426,77,2]
        var res = Math.max(...arr)
        console.log(res)

        //6.伪数组转换
        function test(){
            //var arr = Array.from(arguments)
            // 暴力:把伪数组的值复制到数组里
            var arr = [...arguments]
            console.log(arr)
        }
        test(1,2,3,4,5,6)

        // 获取的dom对象数组转换
        var oli = document.querySelectorAll("li")
        console.log(oli) // 伪数组 Nodelist
        var oliArr = [...oli]
        console.log(oliArr) // 真数组 Array
    ```
- ==ES9后,..展开运算也可用于对象==
    ```js
        // 在对象中应用
        // 1.对象的合并
        var obj1 = {
            name:"kerwin",
            age : 100
        }
        var obj2 = {
            location : "dongbei"
        }
        var obj3 = {
            ...obj1,
            ...obj2 // 如果有同名的key，后面的会把前面的覆盖
        } 
        console.log(obj3)
    ```
- 对象的展开运算应用场景个人信息的修改
    ```js
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
    ```
### ES6进制和长数字
  ```js
      // 1.二进制 0b开头
      console.log(0b100) // 二进制转十进制: 100 -> 4

      // 2.八进制 0o
      console.log(0o100); // 64
      

      // 十六进制 0x
      console.log(0x100) // 156

      // 长数字标识 ES12(2021)
      // 任意位置加_分割
      const money = 1_0000_0000_0000
  ```
### ES6 Object.assign
- ==ES9的对象展开运算符已经代替它了==
  ```js
    Object.assign(target, ...sources)
  ```
  - target：目标对象，即要将其他对象属性复制到的对象。
  - ...sources：一个或多个源对象，是包含要复制属性的对象。
- ==合并多个对象==
  ```js
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };

    const mergedObj = Object.assign({}, obj1, obj2, obj3);
    console.log(mergedObj); // 输出: { a: 1, b: 2, c: 3 }
  ```
- ==额外注意:==
  - ==Object.assign() 执行的是浅拷贝==，即如果源对象的某个属性是引用类型（如对象或数组），那么只会复制引用，而不是对象本身。
  - ==Object.assign() 只会复制对象的可枚举属性==。通常，对象的自有属性都是可枚举的，但有些内置对象的属性可能是不可枚举的，这些属性不会被复制, 比如使用`Object.defineProperty()`自定义的一些对象属性。
  - 如果多个源对象或源对象与目标对象有同名属性，==后面的属性会覆盖前面的属性。==
### ES6的Symbol
- Symbol: ES6之前,对象的属性名都是字符串形式,容易造成属性名冲突,比如在手写apply时,手动添加fn参数和函数内原有的fn冲突,造成覆盖,==symbol可以生成一个独一无二的值,有symbol函数生成,每次通过symbol创建的值都是不一样的==
  ```js
    const s1 = Symbol()
    const obj = {
      [s1]: 'aaa', // symbol数据可以作为对象的属性
      s2: 'bbb'
    }

    const s2 = Symbol()
    obj[s2] = 'ccc' // symbol数据不会覆盖obj原有的属性

    console.log(obj)
  ```
- 属性覆盖的体现
  ```js
    function foo(obj){
      obj.fn = function(){
        console.log('function - fn')
      }
    }

    const obj = {
      fn: 'fn',
      name: 'obj'
    }

    console.log(obj.fn)
    foo(obj)
    console.log(obj.fn) // fn属性被覆盖了
  ```
- ==Symbol应用==
  ```js
  function foo(obj){
      const fn = Symbol() // symbol的用处
      obj[fn] = function(){
        console.log('function - fn')
      }
    }

    const obj = {
      fn: 'fn',
      name: 'obj'
    }

    foo(obj)
    console.log(obj.fn) // 属性不会被覆盖 
  ```
### 获取symbol属性值
- 常规获取key (==Object.keys()获取不到==)
- ==新属性==
  ```js
    const s1 = Symbol()
    const s3 = Symbol()

    const obj = {
      [s1]: 'aaa',
      s2: 'bbb',
      [s3]: 'ccc'
    }
    console.log(Object.keys(obj)) // ['s2']

    const symbolKeys = Object.getOwnPropertySymbols(obj) // 放入数组 [Symbol(), Symbol()]
    for(const key of symbolKeys){
      console.log(obj[key]) // [aaa,ccc]
    }
  ``` 
### symbol额外知识(了解)
  ```js
    // description: 打印值
    // Symbol(key)创建的值独一无二
    const s3 = Symbol('111')
    console.log(s3.description) // 111
    const s4 = Symbol('111')
    console.log(s3 === s4) // false
    // Symbol.for(key)相同的key,创建相同的Symbol
    const s5 = Symbol.for('222')
    const s6 = Symbol.for('222')
    console.log(s5 === s6) // true
    // Symbol.keyFor() 获取传入的key
    console.log(s5.Symbol.keyFor()) // 222
  ```
### ES-字符串与数值扩展
- ==字符串扩展==
- ==includes 检查是否含有字符串(常用)==
  ```js
    let name = "kerwin"
    // 检查是否含有字符串(常用)
    console.log(name.includes('k')) // true
    console.log(name.includes('g')) // false

    // 支持多个参数,第二个参数是数字,从哪里开始查找
    console.log(name.includes('k',2)) // false
    // 是从索引2处开始查找k字符,索引从0开始,name[2]='r',显然后面没有'k'
  ```
- startsWith/endsWith
  ```js
    // startsWith 判断字符是否以某字符串开头
    console.log(name.startsWith('ker'))
    console.log(name.startsWith('er'))

    // 同理支持第二个参数,给开头指定位置
    console.log(name.startsWith('er',1)) // 开头设置为name[1]='e',开头有'er'

    // endsWith 同理字符是否以XX结尾

    console.log(name.endsWith('win'))
    console.log(name.endsWith('wi'))

    // 指定结尾位置略微不同,不包含所写索引,即以索引前面的剩余字符为结尾
    
    // name[3]='w',由于不包含索引项,所以实际结尾应当为r(w的前一个)
    // 字符串类似变为 'ker' (win)
    console.log(name.endsWith("r",3))
    console.log(name.endsWith("w",3))
  ```
- repeat 重复字符串X次
  ```js
    console.log(name.repeat(2)) // 重复2次,返回新字符串
    console.log(name.repeat(0)) // 特殊: 重复0次 = 空字符串
    // 如果写小数点,会只截取整数部分
    // 如果写字符串,数字字符串,例如"4",他会转化好为Number类型; 但是如果是普通字符串,例如"aaa",那么转化为空字符串
  ```
>
- ==数值扩展==
- 1.支持多种进制的写法 ---> 转为十进制
- 进制的相关知识已经保存到edge收藏夹的'其他文件夹'内部,随用随看
  ```js
    // 二进制 八进制 十进制 十六进制
    // 在二进制数的表示中，“0b” 是一种前缀，用于明确表示后面的数字是二进制数。
    // 十进制数一般没有前缀,就是我们常见的数字
    // 十六进制数通常用 “0x” 作为前缀，比如 “0x100” 表示十六进制的数字
    // 八进制数的前缀一般是 “0o”

    let num = 100 
    let num1 = 0b100 
    let num2 = 0o100 
    let num3 = 0x100 

    console.log(num)
    console.log(num1)
    console.log(num2)
    console.log(num3)
  ```
- 2.Number.isFinite / Number.isNaN
  ```js
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
  ```js
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
  ```js
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
  ```js
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
### ES-数组扩展
- 1.==扩展运算符 ... (讲过的)==
  ```js
      let arr1 = [1, 2, 3]
      let arr2 = [4, 5, 6]
      let arr3 = [...arr1, ...arr2]
      console.log(arr3)
      // 只能浅赋值,也就是一维数组,多维数组的赋值需要递归,这里不讲
  ```
- 2.批量解构赋值 (==有一定用处==)
  ```js
    let myarr = [1, 2, 3, 4, 5, 6]
    let [a,b,...c] = myarr
    // a=1 b=2 c=[3,4,5,6](剩下的)
  ```
- 3.Array.from() 转化数组 ==有一定应用==
  ```js
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
  ```js
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
  ```js
  let arr = [0,-2,3,5,4]

  let res = arr.find(function(item){
      return item>3
  })

  console.log(res) // 5,找到大于3的第一个值,从前往后
  // findIndex用法和find一摸一样,就是返回的是索引,不是值

  // findLast findLastIndex 从后往前找,其余的一样 --- ES2022 ES13
  ```
- 6.fill 快速填充相同的内容
  ```js
    let arr = new Array(3).fill("kerwin")
    console.log(arr)
    // fill支持覆盖,可以把原有数据覆盖,也可以设置参数规定覆盖/填充具体哪一项
    let arr1 = [1,2,3]
    console.log(arr1.fill("kerwin",1,2)) // 包前不包后,即从索引1开始到索引2,最后把2变为'kerwin'
  ```
- 7.==扁平化(重要)== flat() flatMap() ==把二维数组-->一维数组(例如 [1,2,3,[4,5]] ---> [1,2,3,4,5])== 以往用lodash库
  ```js
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
          return item.list // 指定好对每一项的哪个属性扁平化(数组所在的属性list)
      }))
      // ['安阳', '安庆', '鞍山', '北京', '保定', '包头']
  ```
### ES-对象扩展
- 1.对象简写 key=value时,就写一个即可,还有关于函数的简写方法(==非常常见==)
  ```js
    let name = 'kerwin'
    let obj = {
        name, // name:name
        test1(){  // 原写法: test1 : function(){....}
            console.log('test1')
        },
    }
  ```
- 2.对象属性表达式 ["key"] : value 重要 (==偶尔会用的==)
  ```js
    let name = "studentName"
    let classes = "class"
    let obj = {
        [name] : "xiaoming", // 内部支持变量
        [classes + "A1"] : "1班" // 支持简单的字符串拼接
    }
    console.log(obj)
  ```
- 3.==对象的扩展运算符== ... ==很常见==,把对象解体扩展其实这是ES9的方法
- ==至此,数组和对象都有'...'运算方法,效果都一样的,统一了==
  ```js
    let oldData = {
      name : "xiaoming",
      score : 100
    }

    let newData = {
      score : 90, // 覆盖旧成绩
      age : 12 // 添加新信息,年龄
    }

    console.log({...oldData,...newData})
    // es6中是一个叫Object.assign的方法,类似这个
  ```
- 4.`Object.is()` 相当于 `===`, =有个弊端,无法判断NaN, == ===都不行
  ```js
    // 所以新增这个方法打补丁
    console.log(Object.is(10,10))  // t
    console.log(Object.is(10,"10"))  // f
    console.log(Object.is({},{}))  // f 对象复杂类型,地址不同
    console.log(Object.is(NaN,NaN)) // t
    // 冷门,还可以判断 +0===-0 真没啥用
  ```
### ES-函数扩展
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

### ES6 Set
- 在ES6之前,我们存储数据的结构主要有==数组和对象==, ES6中新增了两种数据结构 ==Set和Map==
- ==1.Set结构的创建和特性==
  ```js
    // set结构: set中没有相同的数据,有相同的会被自动合并,所以可以去重
    // 1.创建set结构
    let set = new Set()
    console.log(set.size) // 长度表示不再是length 而是size 

    // 2.数组去重,记得把Set类型数据转化回数组类型
    let arr2 = [1,1,1,2,2,3,3,3,4,4]
    arr2 = [... new Set(arr2)] // 也可以通过 Array.from()转化为数组
    console.log(arr2);

    // 3.字符串去重先转化为数组,再通过.join("")转化回字符串
    let str = "aaaaabbbbbbccccccdddeee"
    str = [... new Set(str)].join("")
    console.log(str);
  ```
- 2.==Set添加数据的方式==
  ```js
    // 1.建立时直接放入数据 参数可以是数组,字符串
    let set2 = new Set([1,2,3,4,5,6,1,1,1,2,2,2]) // 会默认去重
    let set3 = new Set("hello world ") // 会把字符串拆分为单项,空格也是,然后去重
    console.log(set2);
    console.log(set3);

    // 2.通过set工具 set.add() 放入数据,整条数据视为一项
    let set4 = new Set()
    set4.add("hello world") // 即不会把字符串拆分成单项了,视为一个整体
    set4.add([1,2,3])
    console.log(set4)
  ```
- ==3.Set补充==
  ```js
    // 1.set结构中 NaN视为重复
    console.log(NaN === NaN) // 在全局中,NaN不相等,false 
    set4.add(NaN) 
    set4.add(NaN)
    // 在set里,添加两条NaN后,只保留一个,另一个视为重复
    console.log(set4); 
    // 2.set中对象是不重复的,因为地址不同
    set5.add({})
    set5.add({})
    console.log(set5)
    // 3.set遍历:for of,没有for in
    // set是可迭代对象
    let set6 = new Set([2,3,7,4,8,10,21])
    for(let x of set6.keys()){ // set6.values()也行,都是打印每一项的值
        console.log(x) // 打印数组每一项
    }
    // 遍历方法2: forEach()
    set6.forEach(item => console.log(item))

    // 4. 额外知识 
    // set.has() 判断当前结构中是否存在某条数据,返回ture或false
    // set.delete() 删除set中的某条数据
    // set.clear() 全清
    let set = new Set([1,2,3,4,5,5,5,6])
    console.log(set.has(5)) // true
    console.log(set.has(7)) // false
    set.delete(5)
    console.log(set) // 没有5了
    set.clear() 
    console.log(set) // 全部清除了
  ```
### ES6 Map
- ==Map: 意为映射==
- ==1.Map的存取==
  ```js
    // 1. 创建map结构; 
    let map = new Map();

    // 2. 向map结构之中放入数据:  
    // - 使用set工具;
    // map的结构为键值对 key-value,与对象相似,不同的是,map结构中的key可以是任意数据类型 
    map.set(100, "value"); // key为Number类型
    let obj = { name: 'obj'};
    map.set(obj, "hello world") // key为Object类型,这时会把对象obj转为字符串'Object'作为key值
    console.log( map );

    // 3. 取出map结构之中数据: 
    // - 使用 get工具; 记得key值
    let res = map.get(100)
    console.log( res );
    let res2 = map.get(obj);
    // 注意: 如果map类型的key值是引用类型，我们一定要注意引用类型的地址! 
    console.log( res2 );
    console.log( map.size ); // size: 长度
  ```
- ==2.map的遍历==
  ```js
    // map可以遍历不同的部分 : 
    // - 遍历key值部分; 
    // - 遍历value值部分; 
    // - 遍历key,value 

    let map2 = new Map();
    map2 // 连缀写法--添加数据
    .set("key1", "value1")
    .set("key2", "value2")
    .set("key3", "value3")

    // 获取所有的key值
    let keys = map2.keys();
    console.log(keys) // 返回值为map迭代器,同理下面的values和entries
    // 遍历key值
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
- ==3.map的方法补充==
  ```js
  // 同set一样
  map.has(key)
  map.delete(key)
  map.clear()
  ```
### ES6类的混入mixins(了解)
- 用的少,主要是一种思想
```js
    // 类的混入mixins
    // js只支持单继承,不支持多继承
    class Bird{
      sayBird(){
        console.log('我是鸟')
      }
    }

    function mixinRunner(BaseClass){
      // 返回一个新类,继承BaseClass
      return class extends BaseClass{
        running(){
          console.log('running')
        }
      }
    }
    function mixinFlying(BaseClass){
      // 返回一个新类,继承BaseClass
      return class extends BaseClass{
        flying(){
          console.log('flying')
        }
      }
    }

    // 混入方法: 形成一个继承链条 NewBird->>Run->>Fly->>Bird
    class NewBird extends mixinRunner(mixinFlying(Bird)){
      
    }

    let bird = new NewBird()
    bird.running()
    bird.flying()
    bird.sayBird()
```
### with语句(了解)
```js
  var obj = { message: '123'}
  // 在规定作用域查找
  with(obj){
    console.log(message)
  }
```
> 不建议使用,出现混淆错误和兼容性问题
### eval函数(了解)
- 内置eval函数允许执行一个代码字符串,它可以将传入的字符串当作js执行,并把最后一句执行语句的结果,作为返回值
  ```js
  const codeString = "var message = '你好'; console.log(message)"
  eval(codeString)
  ```
> 不建议用,可能有攻击性的脚本字符串
> 可读性非常差
## 面向对象
### 原型(CodeWhy)
#### 普通对象的原型
- 每一个对象都有原型`[[prototype]]`,可以在检查栏看到,==这个原型在对象中的属性名为__proto__==,是一个默认的属性,会在对象创建时自动添加
- ==**获取对象的原型有2个方法**,如下==
  ```js
    <script>
      // 1.正规获取对象原型的方法(推荐) Object.getPrototypeOf()
      var obj = {}
      console.log(Object.getPrototypeOf(obj))
      // 2.非正规获取方法(浏览器内置的方法,可能有的浏览器不支持) obj.__proto__
      console.log(obj.__proto__)
      // 验证这两个都是同一个东西
      console.log(Object.getPrototypeOf(obj) === obj.__proto__) // true
    </script>
  ```
- ==对象在寻找一个属性的顺序==
  - 先找自己身上有没有这个属性
  - 在找__proto__属性中有没有这个属性
#### 函数的原型
- ==函数独有的原型,对象没有,属性名为prototype==,函数也有__proto__属性,因为函数也属于对象的一种,但是函数的__proto__和对象的不一样
- ==__proto__也被成为隐式原型,prototype也被称为显式原型==
  ```js
    <script>
      function foo() {}
      console.log(foo.prototype)
      console.log(foo.__proto__)
    </script>
  ```
#### new构造函数
- ==前面函数和对象的原型是为了给new构造函数的一个而底层原理做铺垫,**其实构造函数就是ES6和面向对象中最重要的"类"**==
- ==new操作(**第三步**)==
  - 1.创建空对象
  - 2.将空对象赋值给this
  - ==3.将函数的显式原型prototype赋值给对象的隐式原型__proto__==
  - 4.执行函数内代码
  - 5.默认自动返回这个对象(==就是实例对象==)
- ==**要解决的问题**==:当我们构造多个相同实例对象并且调用里面相同的函数方法时,会造成内存浪费
  ```js
    <script>
      function foo(name){
        this.name = name

        this.getName = function(){
          console.log('我的名字是' + this.name)
        }
      }

      var kiki = new foo('kiki')
      var codewhy = new foo('codewhy')
    </script>

  ```
- ==**原因:**== 由于函数是复杂类型,所以在new创建的每一个实例对象中(kiki,codewhy),都需要为函数在堆中开辟一块内存空间,但是这些实例对象的函数内容都一样却都占用了内存,造成资源浪费
- ==**原型解决方法**==: 所有通过此函数构造出的实例对象中,大家公用一个原型prototype,这样只要将相同的函数方法挂载到这个函数的原型prototype上就可以减少内存的浪费了
  ```js
  + foo.prototype.getName = function() {
      console.log('我的名字是' + this.name)
    }
  ```
- ==**细化new的第三步操作**==: 每一次创建实例对象(kiki,codewhy),执行new的5部操作,==其中第三步的操作就是把foo的原型prototype赋值给这些实例对象的原型__proto__,**所以这些实例对象的__proto__都相同**==
  ```js
    console.log(kiki.__proto__ === foo.prototype) // true
    console.log(codewhy.__proto__ === foo.prototype) // true
    console.log(kiki.__proto__ === codewhy.__proto__) // true
  ```
- ==最后执行这些实例对象的原型==: 按照对象查找属性的原则,首先会在自己身上找有没有getName函数,发现没有就在__proto__上找,而它们的__proto__都是函数的prototype,==所以在函数的prototype上面都可以放置大家共用的函数方法==,其中this遵循隐式绑定,哪个对象调用的指向谁
  ```js
    kiki.getName() // 我的名字是kiki
    codewhy.getName() // 我的名字是codewhy
  ```
#### 构造函数与函数
- 在 JavaScript 里，==构造函数本质上也是函数，但它在使用目的、调用方式、内部 `this` 指向以及约定俗成的命名规范等方面和普通函数存在差异==，下面为你详细介绍。

- 定义与基本概念
- **函数**：是一段可重复使用的代码块，用于执行特定任务，可以接受参数并返回值。在 JavaScript 中，函数是一等公民，可以作为参数传递、赋值给变量等。
- **构造函数**：==是一种特殊的函数==，用于创建和初始化对象。当使用 `new` 关键字调用构造函数时，它会创建一个新对象，并将这个新对象的 `this` 指向该对象，最后返回这个新对象。
- **==构造函数的创建流程(少一步)==**
  - 1.创建一个空对象
  - 2.将this指向这个空对象
  - ==3.将函数的显式原型prototype赋值给对象的隐式原型__proto__==
  - 4.执行函数体中的代码
  - 5.如果没有写返回代码,会自动返回这个对象

- 具体区别

- 1.调用方式
- **普通函数**：可以直接调用，不依赖特定的调用方式。
  ```javascript
  function greet(name) {
      return `Hello, ${name}!`;
  }
  // 直接调用普通函数
  const message = greet('John');
  console.log(message); 
  ```
- **构造函数**：通常使用 `new` 关键字来调用，以创建新对象。
  ```javascript
  function Person(name) {
      this.name = name;
      this.sayHello = function() {
          console.log(`Hello, my name is ${this.name}.`);
      };
  }
  // 使用 new 关键字调用构造函数
  const person = new Person('Jane');
  person.sayHello(); 
  ```

- 2.内部 `this` 指向
- **普通函数**：`this` 的指向取决于函数的调用方式。在全局作用域中直接调用时，`this` 指向全局对象（在浏览器中是 `window`，在严格模式下是 `undefined`）；作为对象方法调用时，`this` 指向调用该方法的对象。
  ```javascript
  function showThis() {
      console.log(this);
  }
  // 在全局作用域调用，非严格模式下 this 指向 window
  showThis(); 

  const obj = {
      method: showThis
  };
  // 作为对象方法调用，this 指向 obj
  obj.method(); 
  ```
- **构造函数**：当使用 `new` 关键字调用时，`this` 指向新创建的对象。
  ```javascript
  function Car(make) {
      this.make = make;
      console.log(this);
  }
  // 使用 new 调用构造函数，this 指向新创建的 Car 实例 myCar
  const myCar = new Car('Toyota'); 
  ```

- 3.返回值
- **普通函数**：返回值由函数内部的 `return` 语句决定，如果没有 `return` 语句，则默认返回 `undefined`。
  ```javascript
  function add(a, b) {
      return a + b;
  }
  const result = add(2, 3);
  console.log(result); 

  function noReturn() {
      // 没有 return 语句
  }
  const emptyResult = noReturn();
  console.log(emptyResult); 
  ```
- **构造函数**：如果没有显式的 `return` 语句，默认返回新创建的对象；如果显式返回一个对象，则返回该对象；如果显式返回一个基本类型的值，则忽略该返回值，仍然返回新创建的对象。
  ```javascript
  function Dog(name) {
      this.name = name;
      // 没有显式 return 语句，返回新创建的对象
  }
  const dog1 = new Dog('Buddy');
  console.log(dog1); 

  function Cat(name) {
      this.name = name;
      return { type: 'Cat' }; // 显式返回一个对象
  }
  const cat1 = new Cat('Whiskers');
  console.log(cat1); 

  function Bird(name) {
      this.name = name;
      return 123; // 显式返回一个基本类型的值，忽略该返回值，返回新创建的对象
  }
  const bird1 = new Bird('Tweety');
  console.log(bird1); 
  ```

- 4.命名约定
- **普通函数**：命名通常遵循驼峰命名法，以描述函数的功能。
  ```javascript
  function calculateArea(radius) {
      return Math.PI * radius * radius;
  }
  ```
- **构造函数**：通常采用大驼峰命名法（帕斯卡命名法），以表明这是一个用于创建对象的构造函数。
  ```javascript
  function Rectangle(width, height) {
      this.width = width;
      this.height = height;
      this.getArea = function() {
          return this.width * this.height;
      };
  }
  ```
-  总结
   - 虽然构造函数和普通函数在本质上都是函数，但它们在调用方式、`this` 指向、返回值和命名约定等方面存在明显差异，开发者可以根据具体需求选择合适的使用方式。 

#### 函数原型上的constructor属性
- ==函数原型上的constructor属性又反过来指向这个函数 **很重要**==
  ```js
    <script>
      function foo() {}
      console.log(foo.prototype.constructor === foo) // true
      // 实例对象也有constructor属性
      var p = new foo()
      console.log(p.__proto__.constructor) // 指向foo函数
    </script>
  ```
#### 构造函数在内存中的表现
- ==从内存方面了解内存中的表现,分为构造函数func Person区,Person显式原型区,Person构造的实例区p1,p2==
    [![pEtbiXq.jpg](https://s21.ax1x.com/2025/03/09/pEtbiXq.jpg)](https://imgse.com/i/pEtbiXq)
  ```js
    <script>
      // 构造函数
      function Person(name,age){
        this.name = name
        this.age = age
      }

      // Person原型
      Person.prototype.running = function (){
        console.log('running')
      }

      // 实例 p1 p2
      var p1 = new Person('why',20)
      var p2 = new Person('kobe',30)

      // 给Person显式原型赋值
      Person.prototype.address = '中国'
      p1.__proto__.info = '中国很美丽'

      // 给对象赋值属性
      p1.height = 1.8
      p2.isAdmin = true

      // 可以从实例对象上直接直到
      console.log(p1.height)
      console.log(p2.isAdmin)

      // 自身上找不到,从实例的原型__proto__上找的
      console.log(p1.info)
      p1.running()
      p2.running()

      // p1的操作是增加新属性adress给p1实例对象,不会影响到Person原型
      // 只有在寻找属性时才会有原型身上寻找的可能性,这也是[[get]]操作而不是[[set]]操作
      p1.address = '广州市'
      console.log(p2.address) // 中国
    </script>
  ```
  > ==**理解了内存上的原理,就可以看懂代码获取和设置属性时的过程了**==
#### 重写原型对象
- ==有时候原型上有过多的属性时可以这样做,赋值一个新的对象给原型,在新的对象中统一写内容,但是丢失了constructor属性,需要添加一下constructor属性==
  ```js
    <script>
      function Person(){

      }

      Person.prototype = {
        message: "hello",
        age: 20,
        run: function(){},
        eat: function(){},
        // constructor: Person // 普通添加
      }

      // 为了更严谨,因为js内置的constructor是隐藏的,即通过Object.keys()无法检索到
      Object.defineProperty(Person.prototype, "constructor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: Person
      })
      
    </script>
  ```
#### 原型链
- ==了解原型链的机制,即可了解对象的查找原则,进而为理解es5的继承做铺垫==
- ==**1.{}的本质 理解内置函数function Object()**==
  ```js
    // 简单的对象写法 (只有js中可以,java等语言都是比较严格的,需要new Object())
    var a = {} // 等同于 var a = new Object()
    // Object()是js内置的函数,可以通过new操作创建对象数据
    // 根据new构造函数的创建原则,Object()的原型对象prototype赋值给a的原型__proto__
    console.log(a.__proto__ === Object.prototype) // true
  ```
- ==同理延伸到其他Number() String(),在js中为了方便我们都会`var a = 1; var b = 'hello'`,实际都是new操作==
  ```js
    var a = 1
    var b = 'hello'
    console.log(a.__proto__ === Number.prototype) // true
    console.log(b.__proto__ === String.prototype) // true
  ```
- ==**2.原型链的查找机制**==
  - 1.现在自己身上找 `obj` 
  - 2.再在原型链上找 `obj.__proto__`
  - 3.再在原型链的原型链上找 `obj.__proto__.__proto__`
  - 4.以此类推... 原型链条形成
  - 5.==直到找到或者原型链的值为null(返回undefined)==
  ```js
    var obj = {
        name: 'why',
        age: 20
      } 

      // obj的原型 即Object()的原型
      obj.__proto__ = {
        // message: 'ni hao'
      }

      // obj原型的原型,Object()的原型的原型,默认值为null
      obj.__proto__.__proto__ = {
        // message: 'ni hao'
      }

      // 我们可以自己设置原型链
      // 如果自己设置的原型链也没有message,那么这个原型的原型是什么? 还是Object.__proto__,因为下面的代码本质操作还是赋值{},即new Object() 
      obj.__proto__.__proto__.__proto__ = {
        // message: 'ni hao'
      }

      console.log(obj.message) // 如果原型链的尽头是null,返回undefined
  ```
  > 由此得知Object的原型为null就是为了截断原型链的查找,返回undefined,==通过原型链的查找机制,进而得知如果我们将多个孩子的原型设置为同一个父原型,那么就可以实现继承==
#### 原型进阶
- ==更进一步的了解原型==
- [![pEUEFO0.jpg](https://s21.ax1x.com/2025/03/12/pEUEFO0.jpg)](https://imgse.com/i/pEUEFO0)
- ==1.js内置的函数方法Object Function==
  ```js
  var a = {} 
  var a = new Object()
  ========================
  function foo(){}
  var foo = new Funtion()
  ```
  > js内置有 function Object和function Funtion方法,也就可以通过构造new方法创建 对象或函数
- ==2.函数与对象关于原型的区别==
  - 前面讲过,对象只有隐式原型`__proto__`,函数既有隐式原型,也有显式原型`prototype`
- ==3.看图中间的三个function Function/Object/Person==
  - ==作为函数来看==,每个函数都有自己的原型对象,即Function函数的原型,Object函数的原型和Person函数的原型,==所以三个函数`prototype`存储了这3个原型==
  - ==作为对象来看==,这三个都是函数,所以都可以通过`new Function`创建,所以作为实例对象,它们的隐式原型`__proto__`都指向Function函数的原型
    > ==**这里解释了函数的`__proto__`和`prototype`分别指向了什么**==
- ==4.三个函数的原型==
  - 特殊地,Object的原型对象的隐式原型指向null
  - 另外两个.Person函数和Function函数的原型也是对象,也是`new Object`获取的,所以它们的`__proto__`指向Object函数的显式原型
    > ==**Object是Function和Person(代表所有的常规函数)的父类,即Object类是所有类的父类**==
#### Object类是所有类的父类
- js内置函数Object也有自己的显式原型,==如下图Person类的显式原型也是对象,既然是对象,那么它的原型就和Object原型一样,指向同一个,Student作为Person的孩子,继承Person类,也可以通过原型链最终连接到Object显式原型上面==
- 以此类推,所有的类都有原型,这些原型都是对象,这些对象的原型都指向Object原型,==那么在Object类原型上面设置新的函数,可以被所有的类使用,比如设置个message==,而Object原型上本来就有一些函数方法
  [![pENeRG4.jpg](https://s21.ax1x.com/2025/03/09/pENeRG4.jpg)](https://imgse.com/i/pENeRG4)
  ```js
    console.log(Person.prototype.__proto__ === Object.prototype) // true
    console.log(Object.prototype) // 查看Object原型上的函数方法
  ```
### 继承
- ==基本代码 父类和子类==
  ```js
    // 定义Person类 父
    function Person(name,age,height){
      this.name = name
      this.age = age
      this.height = height
    }

    Person.prototype.run = function(){
      console.log('run')
    }
    Person.prototype.eat = function(){
      console.log('eat')
    }

    // 定义学生类 子
    function Student(name,age,height,son,score){
      this.name = name
      this.age = age
      this.height = height
      this.son = son
      this.score = score
    }

    Student.prototype.study = function(){
      console.log('study')
    }

    var stu1 = new Student('cdy')
  ```
#### 原型链继承
- ==原型链继承思路: 将子类构造函数Student的原型指向父类构造函数Person的原型,进而继承父类原型中的函数==
- ==**方式1: 典型错误 X**==
  ```js
    Student.prototype = Person.prototype // 直接赋值
  ```
  > ==这个操作最终使得子类和父类**共用一个原型**,即父类的原型Person.prototype,**这不是继承,是共用**==,而且随着子类添加过多的属性,会造成父类原型内部函数臃肿
  ==内存关系如下图==
  [![pEtX3xH.png](https://s21.ax1x.com/2025/03/09/pEtX3xH.png)](https://imgse.com/i/pEtX3xH)
- ==**方法2: 中间人策略 创建一个父类实例对象赋值给子类的原型**==
  ```js
    // 前后顺序不能乱,先指向temp,再在原型上设置函数
    var temp = new Person()
    Student.prototype = temp
    Student.prototype = function () {}  

    var stu1 = new Student('codeWhy')
  ```
  > ==**实现思路**: 原型链为 子类实例stu1自身--->子类实例stu1的原型(即实例temp)---->temp的原型(即Person原型) **进而找到父类Person原型上的函数**==
  > 最终子类和其实例对象添加的函数都会添加到temp这个实例对象temp的原型上,而不会像之前那样添加到父类Person的原型上,而当子类的实例对象想要使用父类的函数时,也可以跟随原型链找到父类原型中的函数
  > **注意: 上面执行完Student原型替换temp后方可设置新的Student原型函数,否则设置到Student原型上后,再改变原型指向为temp,之前设置的函数就没了**
  [![pEtXaIf.png](https://s21.ax1x.com/2025/03/09/pEtXaIf.png)](https://imgse.com/i/pEtXaIf)
- ==**总结: 解决了继承父类函数(方法)的问题,但是没有解决继承父类属性的问题,子类Student和父类Person都有对name age height属性的定义,有重复**==
#### 借用继承
- ==承接上面解决没有解决继承父类属性的问题==
- ==**思路: 通过借用父类的构造函数,并改变父类构造函数的this指向,实现子类继承父类属性**==
> 
- ==**修改子类构造函数的代码**==
  ```js
    function Student(name,age,height,son,score){
      // this.name = name
      // this.age = age
      // this.height = height
      // 父类继承
      Person.call(this,name,age,height)
      // 子类独有
      this.son = son
      this.score = score
    }
  ```
- ==代码解析:== 
  call函数自带自动执行和更改this指向的功能,这里是把Person构造函数中的this指向改变了,让它指向Student构造函数,然后再执行里面代码,创建相同的属性给Student,实现继承
#### 组合式继承
- ==两种方法结合实现的继承基本上满足了所有需求==
  ```js
    // 定义Person类 父
    function Person(name,age,height){
      this.name = name
      this.age = age
      this.height = height
    }

    Person.prototype.run = function(){
      console.log('run')
    }
    Person.prototype.eat = function(){
      console.log('eat')
    }

    // 定义子类
    function Student(name,age,height,son,score){
      // 借用函数继承 --- 属性继承
      Person.call(this,name,age,height)
      // 子类独有
      this.son = son
      this.score = score
    }

    // 原型链继承 --- 函数继承
    var temp = new Person()
    Student.prototype = temp

    Student.prototype.study = function(){
      console.log('study')
    }

    var stu1 = new Student('cdy',10,1.00,111,222)
    console.log(stu1)
  ```
  [![pENSt4x.png](https://s21.ax1x.com/2025/03/09/pENSt4x.png)](https://imgse.com/i/pENSt4x)
#### 终极方案 寄生式继承
- ==相对比上面的方法,在进行函数原型链接时,需要借助一个中间变量temp进行,稍微麻烦了一点,而且temp中也有一份来自父类垃圾信息,即p对象中的name和age==
  [![pENSBKe.jpg](https://s21.ax1x.com/2025/03/09/pENSBKe.jpg)](https://imgse.com/i/pENSBKe)
- ==解决temp链接原型链的问题 不借助构造函数==
   1. 必须创建一个对象
   2. 对象的隐式原型必须指向父类的显式原型
   3. 将这个对象赋值给子类的显式原型
  ```js
    // 这个obj就是代替temp作用的对象
    // 方法1:
    var obj = {}
    // obj.__proto__ = Person.prototype // 不规范
    Object.setPrototypeOf(obj,Person.prototype)
    Student.prototype = obj

    // 方法2: 量身定制的一个新js方法
    // Object.creat(P) 返回一个对象,此对象的隐式原型指向P
    var obj = Object.create(Person.prototype)
  ```
- ==**究极方案 也是现在代码常用的**==
  ```js
    // 一般封装为函数,同时解决constructor
    // 参数为 Subtype(子) Supertype(父)
    function inherit(Subtype,Supertype){
      Subtype.prototype = Object.create(Supertype.prototype)
      Object.defineProperty(Subtype.prototype,'constructor',{
        enumerable: false,
        configurable: true,
        writable: true,
        value: Subtype
      })
    }
  ```
  > 一般也封装在utils工具文件夹内,作为工具函数,供多个文件使用
- ==引入这个函数,**将原来组合式继承代码中的temp替换为inherit函数,其余不变**==
  ```js
    // 原型链继承 --- 函数继承
    // var temp = new Person()
    // Student.prototype = temp
    ============V=============
    // 寄生式继承
    inherit(Studnet,Person)
  ```
  [![pENZUj1.jpg](https://s21.ax1x.com/2025/03/09/pENZUj1.jpg)](https://imgse.com/i/pENZUj1)
### 构造函数的类方法
- ==实例方法和类方法的定义方式==
  ```js
    function Person(name,age){
      this.name = name
      this.age = age
    }

    // 实例方法,只有创建对应的实例对象后才能使用
    Person.prototype.foo = function() {}
    // 类方法,直接使用
    Person.bar = function(){}

    // 实例p1 
    var p1 = new Person('why',20)
    p1.foo() // Person.foo() X

    Person.bar() // 直接使用
  ```
- 举个例子Number的类方法parseInt()和实例方法toFixed()
  ```js
    var num = 100
    var numStr = '100'

    // Number.parseInt() 是 Number 对象的一个类方法（也可以直接使用全局函数 parseInt()，它们是等价的）
    // 用于将一个字符串解析为整数。如果解析成功，返回解析后的整数；如果无法解析，则返回 NaN
    Number.parseInt(numStr) // parseInt(numStr)也行
    // toFixed() 是 Number 对象的一个实例方法，用于将一个数字转换为指定小数位数的字符串表示。
    // 返回的是一个字符串，而不是数字
    num.toFixed(2) // '100.00'
  ```
  > 类方法和实例方法很常见,只是平时没有注意而已

### 对象Object方法的补充
- ==针对Object原型上的函数方法api==
- 1.==hasOwnProperty()== 判断拿到的属性是在自己身上还是原型身上,**在自己身上返回true,在原型身上返回false**
- 2.==in / for in==
  - ==in==: 判断某个属性是否在某个对象内部,或者这个对象的原型上面,存在就返回true,否则false
  - ==for in==: 遍历自己对象和原型对象上的属性内容,==不能遍历Object原型的内容是因为那些内容设置enumerable为false,不允许被遍历,不是for in没有去找过他,所以这说明了会把原型链上除了Object原型的所有属性全部遍历==
    ```js
      for(key in stu1){
        console.log(key)
      }
    ```
- ==3.instanceof==
  - 检测构造函数(Person Student)的prototype,是否出现在某些实例对象(stu1)的原型链上 (==看看之前的图==)
  - ==用于判断实例**对象和类(构造函数)之间的关系**,看看这个对象是不是属于这个类==
    ```js
      // 父Person 子Studnet 
      var stu1 = new Student()
      console.log(stu1 instanceof Student) // true
      console.log(stu1 instanceof Person) // true
      console.log(stu1 instanceof Object) // true
      console.log(stu1 instanceof Array) // false
    ```
    > ==它的判断逻辑是,查找自己的原型链上的原型,看看这些原型的constructor是否有Person Student Object Array==
- 4.isPrototypeOf() ==很少用==
- 检测某个对象是否出现在某个对象的原型链上,==判断对象之间的继承关系==
- ==用于判断**对象和对象之间的关系**==
  ```js
    console.log(Student.prototype.isPrototypeOf(stu1)) // true
    console.log(Person.prototype.isPrototypeOf(stu1)) // true
  ```
  > Student原型对象(Student.prototype)处在stu实例对象的原型链上,同理Person
### Class(ES6语法糖)
- 语法糖:js面向对象的方法太过新奇,所以包装了一个新语法,格式向java看齐
- 代码:
  ```js
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
### ES6继承
- ==ES6继承写法代码:==
  ```js
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
            eat(){
              console.log("eat",this.name)
            }
        }

        // 子类
        // ES6 Student 继承 Person
        class Student extends Person{
            constructor(name,age,grade){ 
                super(name,age) // 继承属性,写在最上面
                this.grade = grade // 添加新属性
            }
            // 覆盖父类方法
            say(){ 
                console.log("您好",this.name)
            }
            // 继承父类方法
            eat(){ 
                super.eat() // 可以通过super调用父类的方法
                // 下面写子类的代码
                console.log("您好",this.name)
            }
            exam(){ // 新方法
              console.log(this.name + '学生考试中')
            }
        }

        var stu1 = new Student("kerwin",20,140)
        console.log(stu1)
        stu1.say()
        stu1.eat()
        stu1.exam()
    </script>
  ```
### 关于ES5和ES6在面向对象中使用
- 我们的原则是用最新的,也就是ES6,这个更加靠近其它语言规范,但是ES5可以让我们从底层了解到js的运行逻辑,这是知其所以然,在本单元中,class(ES6)就是把前面学的原型,对象等所有ES5一勺烩了打包成ES6语法糖,后面的继承亦如此,ES5知其所以然,实战中使用ES6.
### js中的多态(了解)
- ==面向对象的三大特征:封装 继承 **多态**==
- 多态: ==不同的数据类型进行同一操作表现不同的行为==
- 由于js数据类型相当灵活,不同于java的严格,所以js中都是多态,结合ts后就会规范很多了,==js的多态用处不大==
  ```js
    function sum(a1,a2){
      return a1 + a2
    }
    sum(10,20)
    sum('10','20')
  ```  
## 对象增强definedProperty
### 属性描述符
- ==针对对象属性进行更多的操作==
- ==基础语法== `Object.definedProperty()`
- ==三个参数== : 目标对象,属性的key值,属性的特征{}
- ==属性的特征==
  - ==configurable: 是否可以被删除 `delete obj.XX`==
    - 当直接在一个对象上定义某个原有属性时,默认值为true
    - 当通过属性描述符在对象定义一个新属性时,默认值为false
  - ==enumerable: 是否可被枚举 `Object.keys(obj)`==
    - 当直接在一个对象上定义某个原有属性时,默认值为true
    - 当通过属性描述符在对象定义一个新属性时,默认值为false 
  - ==writable: 是否可写(是否可被赋值)==
    - 当直接在一个对象上定义某个原有属性时,默认值为true
    - 当通过属性描述符在对象定义一个新属性时,默认值为false 
  - ==value: 属性值==
    - 添加新的属性时,不写就默认undefined
    - 修改原有属性时,起到修改属性值的作用
- 代码演示:
  ```js
    let obj = {
      b : 100
    }
    Object.defineProperty(obj,"a",{
      configurable : true,
      enumerable : true,
      writable : true
      value: 'aaaa'
    })
    console.log(obj)
  ```
  ```js
    // 多个属性 ES7
    const obj = {
      name: "codewhy",
      age: 18,
    };

    Object.defineProperties(obj, {
      name: {
        configurable: true,
        enumerable: true,
        writable: false      
      },
      age: {
        configurable: true,
        enumerable: true,
        writable: false
      }
    })
  ```
### 存取属性描述符(Vue2)
- ==vue2的响应式原理==
- ==首先,**此时我们定义的属性不是以存储数据为目的,而是以触发"取值,赋值"行为为目的的操作,这里面的get和set对应的函数是当对对象发生取值和赋值的行为时才会执行此函数的内容**,后面的proxy也会有这个set get ,道理是一样的==
- ==存储属性描述符有如下4个属性==
- 代码:
  ```js
    let obj = {
      name: "codewhy"
    }
    
    let _name = ""
    Object.defineProperty(obj, "name", {
        configurable: true,
        enumerable: false,
        // set: 监听此对象的赋值操作,value是赋值参数,执行内部回调函数
        set: function (value) { 
          _name = value
          console.log("set方法被调用了", value);
        },
        // get: 监听此对象的获取操作,执行回调函数,返回获取值
        get: function () {
          console.log("get方法被调用了")
          return _name
        }
    })

    obj.name = 'kiki'
    console.log(obj.name)
  ```
## Proxy拦截器
### vue2中的监听对象操作
- defineProperty:
  ```js
    // vue2 - defineProperty
    var obj = {
      name: 'obj',
      num: 100,
      foo: 'foo'
    }

    // 对象所有的key进行监听
    const keys = Object.keys(obj)
    for(const key of keys){
      let value = obj[key]
      Object.defineProperty(obj,key,{
        set: function (newValue){
          console.log(`修改了${key}属性`,newValue)
          value = newValue
        },

        get: function (){
          console.log(`获取了${key}属性`)
          return value
        }
      })
    }

    console.log(obj.name)
    obj.foo = 'bar'
    console.log(obj.foo)
  ```

- ==弊端==: 
  - defineProperty设计初衷是为了监听某一个属性,而不是全部属性
  - ==只能监听get,set操作,不能监听新增,删除属性等操作==

### 对象拦截(Vue3)
- proxy: ==拦截行为就是在取值或赋值之前做一些预处理,**vue3中的响应式原理源码就应用了这个语法**==,让我们获取的数据更好用,拦截对象或者函数,==返回的是一个新对象Proxy.操作也是在这个代理对象内部的==!
- ==语法==: new Proxy(目标对象,配置拦截参数)
- ==配置拦截参数== get(对象) set(对象) apply(函数)
- 代码:
  ```js
   // 基本语法:
    // 我们通过new objProxy创建了一个中间层对象,通过这个中间层对象我们也可以访问到原对象,但是中间层提供了一层可被我们编程的函数层
    let obj = { a: 100, b: "你好世界", c: "ABC" }
    // 建立了objProxy后,以后对obj的操作就不通过obj操作了,而是通过新构建出来的objProxy对象进行操作
    let objProxy = new objProxy(obj, {
        // 1. get 参数 : 表示对象有取值行为时触发
        get: function (target, prop, objProxy) {
            // get函数存在三个参数
            // 1. target : 原始对象
            // 2. prop : 我们访问数据时访问的属性名 a b c
            // 3. objProxy : 我们创建的代理对象,通常不用

            // 需求: 我们希望从obj中获取的所有数字类型数据全部转化为字符串类型数据
            // 判断当前的属性值类型
            if (typeof target[prop] === "number") {
                return target[prop] + "" // 把数字转化为字符串
            } else {
                return target[prop]
            }
        },

        // 2. set : 赋值的时候会进行拦截操作
        set: function (target, prop, val) { 
            // target : 初始对象
            // prop : 我们设置数据的属性名 a b c
            // val : 你赋的值

            // 需求:我们赋值的数据小于10时,对这个数据进行补零(-> String)
            // 10 => "10"
            // 1  => "01"
            // 注意这里你修改的是objProxy新对象的值,对原始对象obj没有影响
            if(val < 10 && val >= 0){
                // return 无意义
                target[prop] = "0" + val
            }else{
                target[prop] = val
            }

            // 针对具体属性具体赋值
            switch( prop ){
                case  "list" :  
                target[prop] = [val]
                break;
                case "obj" :
                target[prop] = {val}
                break;
            }
        }
    })

    // 1. get的测试
    console.log(objProxy.a)
    console.log(objProxy.b)
    console.log(objProxy.c)

    // 2. set的测试
    objProxy.a = 1
    objProxy.b = 100
    objProxy.c = "ni hao"
    // switch特殊处理
    objProxy.list = "hello world"
    objProxy.obj = "hello world"
    console.log(objProxy.list);
    console.log(objProxy.obj);

    console.log(objProxy) // 获取中间对象,set所有的操作在中间变量上进行的,所以通过objProxy获取,而非obj
  ```

### 函数拦截(了解)
- 基本上和拦截对象大差不差,基本语法是 new Proxy(要拦截的函数,配置参数)
- 代码:
  ```js
   <script>
      // 拦截器拦截函数调用行为,在函数调用之前做些事情
      let foo = function(a,b,c,d){
          console.log(" hello world ",this,a,b,c,d);
      }
      // 拦截语法
      let proxy = new Proxy(foo,{
          // 拦截调用行为,在函数调用之前做预处理
          apply : function(fn,ctx,args){
              // fn : 调用的函数foo
              // ctx : fn函数的this指向
              // args : 调用proxy函数时传入的所有参数,放入了数组中

              console.log("proxy的参数数组",args);
              fn() // 调用原有函数foo
              // 原函数的fn的this指向的是window,直接打印ctx在ES6中是undefined
              console.log(ctx);

              // 更改this的指向,ctx的指向一个对象,并更改传入的参数
              fn.apply({a : 100},args.map(item => item * 2)) // this不在指向window,指向新对象,传入的四个参数都乘2
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
### Reflect(ES6)
- 在 Reflect 出现之前，JavaScript 中对对象的操作比较分散，不同的操作使用不同的语法和方法。Reflect 对象将这些操作集中起来，提供了一套统一的 API 来处理对象的各种操作，如属性的获取、设置、删除，函数的调用等。这使得代码更加统一和规范。
- ==使用reflect的好处 (与Proxy配合使用)==
  ```js
  const objProxy = new Proxy(obj,{
    set: function(target,key,newValue){
      // 优点1: 不修改原始对象
      let isSuccess = Reflect.set(target,key,newValue)
      // 优点2: 有返回值,可以判断本次操作是否成功(严谨)
      if(!isSuccess){
        return new Error(`修改${key}属性失败`)
      }
    },

    get: function(target,key){

      }
    })
  ```
  > 注意Reflect是一个对象,不能new构造函数,proxy是函数,可以new构造函数
  > 另外内部还有许多别的api方法,可以随用随学
## Promise
### 基础知识
- ==**1.promise对象的作用?**==
- ==Promise: 解决回调函数过渡嵌套导致的回调地狱问题!==
- ==Promise对象是非常适合处理javascript网络请求的异步程序!== 
- 代码:
  ```js
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
  ==**let p1 = new Promise ( function( resolve,reject ) {.....} )**==
  ==**let p2 = new Promise ( (resolve,reject) => {.....} )**==
  ==关键点==: 
  - 1.初始创建Promise对象时必须要传入一个函数,这个函数名为规则指定函数,就是里面这个function,他的作用是改变promise对象的状态,这个函数的两个参数就是改变状态的工具,==resolve为成功,reject为失败==,执行后promise的状态就会改变,==这个初始promise对象只能改变一次状态==
  - 2.==promise的状态是很重要的,使用promise都是要围绕着其状态执行响应代码的==
  初始状态 -> 成功状态/失败状态
  通过打印,promise对象是有状态属性`[[PromiseState]]`
  ==初始状态: "pending"  成功状态: "fullfilled"  失败状态: "rejected"==
    > 注意:状态只能改变一次,即从初始->成功/失败,改变之后再次改变无效
- 代码:
  ```js
    // 创建promise对象的语法
    let p = new Promise(function(resolve,reject){
      // 传入的函数有两个参数,成功状态改变工具,失败状态改变工具
      // 两个参数可以随意起名字,但是顺序是固定的,即第一个就是代表成功,第二个就是代表失败
      // resolve : 解决, 表示承诺被解决,状态为成功
      // reject : 解决, 表示承诺未被解决,状态为失败
      // 注意: 这两个参数都是函数,调用哪个当前的promise状态就变成什么

      // resolve() // 状态为成功
      // reject() // 状态为失败

      // 这两个工具的用处?
      // 答: 放在异步程序之中改变promise对象状态
      // 使用工具时可以传入参数,之后相应的回调函数会执行then/catch去进行下一步操作
      setTimeout(function(){
          // 网络请求等操纵代码
          if(1){
            resolve('success') // 成功的回调 then
          }else{
            reject('fail') // 失败的回调 catch
          }
      },1000)
      // 我们的网络请求等异步程序都放在promise内中编写
      // 而异步执行成功与否就可以由resolve/reject体现,进而进行下一步操作
      
      // 总结 : 我们用promise对象记录异步程序的执行状态!  
    })
  ```
### promise的监听工具
- 新工具: ==**promise的三个监听工具 then catch finally**==,这三个是promise的方法
- ==then(成功) catch(失败)会监听promise状态==,然后执行对应的函数,从这里我们可以看到promise的使用紧紧围绕其状态的改变,==finally无论状态如何都会执行==
  > 补充: ==**resolve和reject这两个方法可以传入形参,在对应的then或catch函数内可以接受到这个参数**==
- 代码:
  ```js
    // 使用promise对象
    // 核心: 查看promise对象的状态.等到其状态改变时再去执行某些程序

    // promise状态监听工具有三个
    //  2个参数  then(状态成功之后执行的函数,状态失败后执行的函数)
    // catch(状态失败时执行的函数)
    // finaly(只要状态改变就执行函数) 但是finaly没有数据

    let p = new Promise(function(resolve,reject){
        // 随机时间后会改为成功状态
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
  ```
- ==then的回调函数简写==
  ```js
   p.then(res => {
      // ...
   }, err => {
      // ...
   })
  ```
### then进阶使用
- 关键点: 
  - 1.介绍了then的返回值的两个原则,==默认返回值和返回新的promise==
  - 2.==学会连缀写法以及其内部执行逻辑==
- 代码:
  ```js
    // then函数的进阶使用 
    // promise对象会在1s后把状态改为成功状态
    let p = new Promise((resolve,reject) =>{
      setTimeout(function(){
          resolve() // 成功
      },1000)
    })

    function handlerSuccess(){
      console.log("success");
      // then成功回调函数会在1s后返回一个失败状态的Promise实例对象,它的状态决定p最终的状态
      return new Promise((resolve,reject) => {
        setTimeout(function(){
            reject()
        },1000)
      })
    }
    function handlerError(){
        console.log("error");
    }

    // then的返回值分为两种
    // 1.回调函数的返回值不是promise对象! then就启用默认返回值
    // 默认返回值是一个新的proimse对象,和调用then的promise对象(p)不是一个! 但是新的promise对象和旧的proimse对象状态一致; 
    // 打印测试
    let a = p.then()
    console.log(a) // 看看p的then回调函数的默认返回值是不是promise,状态是不是一致
    // 2.如果回调函数返回值是一个promise对象,那么就返回这个promise对象,也就是说p的最终状态由这个返回的promise对象决定
  ```
- ==连缀写法==
  - ==连缀写法,按顺序执行,后面是否执行的状态依据是前面执行的返回值的状态==
  - 解释: 首先p作为一个promise对象会有成功或失败的状态,如果是成功状态,那么执行then方法,根据then的返回值重新确定新的状态,而连缀的下一个方法catch的执行就取决于then返回的这个promise对象的状态是否是失败,如果是失败则执行catch方法,如果不是则不执行,同理的如果p的初始状态是失败,那么就直接执行catch
  - ==优点==: 异步程序列队,杜绝了嵌套,防止了回调地狱,后面的代码执行会根据promise对象的状态来进行,不会关注异步程序的内部代码,维护难度大大减轻
  ```js
    // 注意我们一般用then执行成功回调函数,用catch执行失败回调函数

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
  ```
- ==业务99%这么写==
  ```js
    p1
    .then(res => {
      // ...
    })
    .catch(err => {
      // ...
    })
  ```
### catch的进阶使用(了解)
- ==catch的执行时机==,在连缀写法中,最好在最后加catch,捕获报错异常,可以自己抛出throw,可以js检测出报错
  ```js
      const p = new Promise((resolve,reject)=>{
        resolve('success')
      })

      p.then(res => {
        console.log('第一次调用then',res)
        // 在这里不能调用reject,拿不到
        throw new Error('失败异常') // 直接跳转catch
      })
      .then(res => {
        console.log('第二次调用then',res)
      })
      .then(res => {
        console.log('第三次调用then',res)
      })
      .catch(err => { // 处理throw抛出的异常
        console.log('第一次调用catch',err)
      })
  ```
### finally的补充(了解)
- ES9中的语法,无论promise状态如何,finally都会执行,学过任务队列后,promise的then和catch属于异步的微任务,我们如果有想到等待promise决议全部执行完后再执行的代码,直接写在后面是会提前执行的(因为属于同步代码),所以写在finally里面即可
  ```js
    p.then(() => { // 异步
      console.log('success')
    }).catch(()=>{
      console.log('error')
    })

    // 同步
    console.log('promise执行总结')
  ```
  ```js

  p.then(() => {
    console.log('success')
  }).catch(()=>{
    console.log('error')
  }).finally(()=> {
    console.log('promise执行总结')
  })
  ```
### 类方法resolve/reject(了解)
- 对于一些不需要额外操作的结果,直接调用类方法更方便
  ```js
    Promise.resolve('hello')
    .then(res => console.log(res))

    // 相当于 new Promise 并执行resolve
    new Promise ((resolve) => {
      resolve('hello')
    })
    .then(res => console.log(res))

    // reject 类方法同理
    Promise.reject('error')
    .catch(err => console.log(err))

    // 潜规则: 如果有的形参不用,但是需要占位,那么写成_即可
    new Promise ((_,reject) => {
      reject('error')
    })
    .catch(err => console.log(err))
  ```
### 类方法all
- 在学习了then catch finally后,新增两个新方法,在promise对象系统默认的构造函数constructor内部,==分别为all和race==,简单理解下其应用
- 代码:
  ```js
  <script>
      // 作用: 对多个promise对象的状态监听,让多个promise对象状态改变后进行统一处理
      // all: 等待所有传入的promise对象状态全部转变为成功之后在进行处理
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
    </script>
  ```
### 类方法any和race
- ==race==: 哪个promise对象先执行完,就使用哪个promise对象,好坏都接
- ==any==: 等待最快的成功状态的Promise,如果失败状态更快则无视,只接受好,==如果所有的都是失败,则执行catch==
  ```js
    let p1 = new Promise((resolve, reject) => {
        setTimeout(function () {
            reject("p1-fail")
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

    let race_promise = Promise.race([p1,p2,p3])
    race_promise.then(res => {
        console.log("race " + res);
    }).catch(err => {
        console.log("race" + err)
    })

    let any_promise = Promise.any([p1,p2,p3])
    any_promise.then(res => {
        console.log("any " + res);
    }).catch(err =>{
      console.log('error: ' + err) // 这个err是js内置的错误信息
    })
  ```
### 类方法allSettled(了解)
- ==all方法的缺陷==: 当数组中有一个promise对象返回reject失败状态,整个promise都会变为失败状态,导致有一些成功状态promise还没到执行就结束了,导致丢失了一些数据
- ==ES11--allSettled==: 无论数组中的promise是成功还是失败,都会等待所有promise执行有结果后,统一执行then方法,也就是说无论如何allSettled只会返回成功状态的promise对象,不会执行catch方法
  ```js
    let p1 = new Promise((resolve, reject) => {
        setTimeout(function () {
            reject("p1-fail")
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

    Promise.allSettled([p1, p2, p3])
    .then(res => {
        console.log(res); 
        // res: 获取的数据是对象数组,每一个数组item记录着一个promise的信息
        // status记录promise的状态: 如果是成功,则对应显示value值; 如果是失败,则显示原因reason(值即reject的参数)
    })
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