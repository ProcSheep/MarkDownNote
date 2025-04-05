# Javascript框架
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
## sass 
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
