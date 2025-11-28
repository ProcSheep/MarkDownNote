# JS进阶
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
### 基础知识
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
