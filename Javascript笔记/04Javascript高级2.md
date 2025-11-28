# 高级js笔记
## 浏览器的原理
### 输入URL浏览器后台资源加载流程
- ==流程==: 进入一个网站,在搜索栏输入URL后,通过域名解析(DNS解析)后,将URL转化为IP地址,然后根据IP地址找到网页的服务器
- ==后台资源获取==: 服务器会从数据库的静态资源中返回index.html文件,==浏览器会先解析html,在解析html过程中,遇到`link`(css)或者`script`(js)等代码时,重新向服务器请求这些资源,其他的资源比如 图片 字体等皆是如此==
  [![pEND0N8.jpg](https://s21.ax1x.com/2025/03/10/pEND0N8.jpg)](https://imgse.com/i/pEND0N8)
### 浏览器页面的解析和渲染
- ==先了解html和css解析,先不管js==,解析渲染的工作主要是浏览器内核完成的,比如说chrome edge都有自己的一套内核
- ==**Dom树**==
  - DOM 树即文档对象模型树（Document Object Model Tree），==是一种将 HTML 或 XML 文档表示为树形结构的概念模型==
  - 以 HTML 文档为例，`<html>`标签是 DOM 树的根节点，它包含了文档的所有其他内容。`<head>`和`<body>`标签通常是`<html>`的子节点，而`<head>`和`<body>`标签内的标签，如`<title>、<p>、<div>`等又会成为它们的子节点或孙节点，以此类推，形成一个层级分明的树形结构。
- ==**图片解析**==
  - 1.浏览器会解析html,中途遇到css相关代码,同时会解析css,==css的解析不会影响到html的解析==
  - 2.==当html和css解析都完成后,合并成渲染树==,有时候css解析太慢可能会影响到渲染树的合成,但是浏览器会做优化,不会死等css
  - 3.==此时的渲染树还缺少关于布局位置的属性,通过layout最终完善Dom对象的位置,大小等==,为什么需要额外layout确定dom的位置,因为Dom树和渲染树不一定相等,对于一些display:none的元素,渲染树是不渲染的,对应的布局位置也就没有意义,所以==layout主要筛选可以渲染的dom对象进行位置计算==
  - 4.以上都完成后,执行绘制painting(文本 颜色 边框 阴影 替换元素img),就可以显示在页面中了display
  [![pENDr9g.jpg](https://s21.ax1x.com/2025/03/10/pENDr9g.jpg)](https://imgse.com/i/pENDr9g)

- ==对应的Dom树展示==
  [![pENDaHP.jpg](https://s21.ax1x.com/2025/03/10/pENDaHP.jpg)](https://imgse.com/i/pENDaHP)
- ==对应的css规则显示==
  [![pENDB4S.jpg](https://s21.ax1x.com/2025/03/10/pENDB4S.jpg)](https://imgse.com/i/pENDB4S)
- ==对应渲染树展示== 一些不显示的dom节点在渲染树中是没有的
  [![pENDUBt.jpg](https://s21.ax1x.com/2025/03/10/pENDUBt.jpg)](https://imgse.com/i/pENDUBt)
### 回流与重绘
- ==回流==: 第一次确定节点的位置,称为layout,==如果之后操作页面,对之前的dom进行更改,**那么就会重新布局计算dom的位置,这就是回流**==
- ==重绘==: ==修改文本 颜色 边框 阴影 替换元素img==,就会重新绘制页面
>
- ==造成回流的原因==
  - dom结构变化 --- 节点的增删
  - 改变dom的布局 --- 修改了width height padding font-size
  - 修改窗口大小resize (比如最小化页面会重新布局页面内容)
  - 调用getComputedStyle获取尺寸和位置信息(==看浏览器,有的浏览器会识别,不造成回流==)
  > ==只要回流一定重绘,而且回流很影响浏览器的性能!!!==
- ==减少回流==
  - 修改dom节点的大小布局等,一次性修改,比如通过添加class属性
  - 减少频繁地操作dom
  - 可以对一些元素使用position的absolute或fixed,减少回流的性能消耗(也会回流)
  - 避免使用getComputedStyle
### 合成图层及优化
- 合成composite: 绘制过程中,通常在标准流中布局位置并绘制页面,但是==有的元素脱离标准流(比如fixed),他会形成新的图层layer进行渲染,当全部渲染完成后,浏览器会合并这2个图层==
- ==那些属性可以合成新的合成层==
  - 3D transforms: transformsZ(10px)
  - 动画状态下(animation/transition)的opcity(透明渐变),transform(位移)
  - position: fixed(定位)
  - will-change
- ==可以从浏览器的工具layer中查看dom元素的图层==
- ==新的图层使用GPU加载,非常快,但是合成图层会增加内存负担,所以不要过多使用==
  
### 浏览器script和页面解析
- ==接下来讲解html解析到js代码时的流程==
  - 浏览器解析html中,如果遇到js,那么会立即停止html解析,进行js解析并执行,执行完成后再继续解析html,==即js解析会打断html的解析==
  [![pENcFSS.jpg](https://s21.ax1x.com/2025/03/10/pENcFSS.jpg)](https://imgse.com/i/pENcFSS)
- ==原因:== js可能会操作dom对象,如果等待所有的dom渲染完成后(html和css解析完成),再进行js操作,会==造成大量的回流和重绘,影响性能==
- 现在前端开发框架中(Vue React): ==脚本js往往比html更重,即js代码远远多余html代码==
- 比如Vue项目打包后,如下
  ```js
    <script></script>
    <script></script>
    <script></script>
    <script></script>
    <script></script>

    <div id="app"></div>
  ```
- 过多的js脚本执行会阻塞html的解析,进而造成在js脚本执行完之前,用户什么都看不到,==接下来引进defer和async属性来改变js解析与执行的优先级==
- ==对于上面的情况,浏览器也会优化,不会等待dom树构建完成后再显示,而是会对一些已经构建完的dom树进行先行渲染,让用户看到一些页面显示==
- ==**有一篇关于文章**==
### script-defer/async 
- ==**defer**: js的下载不阻塞html的解析,而且等待dom树构建完成后才会执行js代码==,
  [![pENcELj.jpg](https://s21.ax1x.com/2025/03/10/pENcELj.jpg)](https://imgse.com/i/pENcELj)
- ==defer的特点:==
  - 1.==DOMContentLoaded事件之前执行defer代码==,所以下面的代码defer打印会在DOMContentLoaded之前
    ```js
      // 外部引入的js 打印defer 
      <script defer src="./index.js"></script>
      <script>
          window.addEventListener('DOMContentLoaded',()=>{
            console.log('DOMContentLoaded')
          })
      </script>
    ```
  - ==2.defer或async都是执行外部脚本的,写在内部是无效的==
    ```js
      // 错误的
      <script defer>
        console.log('defer')
      </script>
    ```
  - 3.==defer下的script会按顺序执行==,并且在domTree构建完成后执行,所以不必担心js获取不到某些dom对象
- ==**async(用的少)**: 同理不阻塞html解析,但是js解析完成后,立马执行,并且执行顺序不唯一,谁先解析完谁执行(同时打断html解析)==,由于不一定在DomTree构建完成后执行js代码,所以不建议操作dom对象,这个用的比较少
- ==二者各自的使用:==
  - defer: 
    - ==依赖于 DOM 结构的脚本,必须dom构建完成后才能执行==,比如一个脚本用于为页面上的所有按钮添加点击事件监听器
    - ==适合严格要求执行顺序的脚本==
    - ==有些脚本的执行不会直接影响页面的初始渲染==，例如一些用于统计分析、监测用户行为的脚本。使用 defer 可以让这些脚本在后台加载，不会阻塞页面的解析和渲染，从而提高页面的加载速度和用户体验。
  - async: 适合不操作dom的js脚本或适合独立的脚本运行(即这个js运行不会影响到页面)
- ==优化的建议: 放在前面,比如head区域,早解析早下载==
### 补充DOMContentLoaded事件
- ==DOMContentLoaded 是一个在网页文档的初始 HTML 被完全加载并解析完成后触发的事件==，无需等待样式表、图像和子框架等资源加载完成。
- 当浏览器解析完 HTML 文档，构建好完整的 DOM 树后，就会触发 DOMContentLoaded 事件。此时，==所有的元素节点都已经被创建并可以通过 JavaScript 进行访问和操作，但外部资源（如图片、样式表）可能还在加载中。==
- 使用场景
  - 尽早操作 DOM：当你需要在页面的 DOM 结构准备好后立即执行某些操作，而不需要等待所有资源加载完成时，可以使用 DOMContentLoaded 事件。例如，初始化页面上的交互组件、绑定事件监听器等。
  - 优化页面性能：通过在 DOMContentLoaded 事件中执行必要的操作，可以让用户在页面的基本结构加载完成后就能够开始与页面进行交互，而不必等待所有资源都加载完毕，从而提升用户体验。
- 与其他类似事件对比
  - load 事件：==load 事件会在整个页面（包括所有资源，如图片、样式表等）加载完成后触发==。相比之下，DOMContentLoaded 事件触发的时间更早，因为它只关注 HTML 文档的解析完成，而不等待其他资源的加载。
  - beforeunload 事件：==beforeunload 事件在用户即将离开当前页面（如关闭窗口、刷新页面等）时触发==，用于提示用户保存未保存的数据或确认是否离开页面，与 DOMContentLoaded 事件的触发时机和用途完全不同。
## 深入js执行原理
### V8引擎
- ==了解js代码的执行过程,以及v8引擎的优势==
  [![pENDwAf.jpg](https://s21.ax1x.com/2025/03/10/pENDwAf.jpg)](https://imgse.com/i/pENDwAf)
- ==简单解释:==
  - js的代码是高级语言,需要转化为计算机可以是被的二进制语言
  - js代码首先被解析(通过ast抽象语法树),然后通过lgnition解释器转化为字节码,字节码的特点是可以在多个系统上运行,比如windows和Mac OS
  - TurboFan是编译器,把对应字节码转为合适地机器码(计算机识别的二进制代码)
- ==V8的优势==
  - ==它会根据规律,选择保存执行频繁函数的机器码==,比如sum()函数,专门负责Number类型的数字相加,在第一次执行时会按正常流程,把函数字节码转为机器码,==之后如果频繁执行,就会保存这个函数的机器码, 然后直接调用执行,速度很快==
  - ==小问题:== 由于js没有类型判断,理论上参数未必一定为Number类型,也可以为String类型,所以如果在一次执行中输入的参数不再都为数字类型,那么v8引擎还有个还原机制Deoptimization,他会还原机器码变回字节码,然后重新编码为新的机器码,==所以执行函数时不要频繁转换数据类型==
### js执行前创建的全局对象
- ==js引擎在执行代码之前,会在堆内存创建一个全局对象Global Object (GO) **其实就是window对象**==
  - 所有的作用域scope都可以访问
  - 内部会包含Date Array String setTimeout setInterval等
  - 还有window属性指向自己
  - 会初始化一些属性,比如Math Date parseInt等
### js全局代码执行的前后流程
- js引擎内有一个==执行上下文栈ECS (Execution Context Stack)(**就是栈**)==,用于执行代码的调用,==**执行的代码为全局代码块**==
- ==什么是全局代码块?== 在全局中执行的代码会自动构建一个全局代码块GEC(Global Execution Context),然后这些GEC会被放入ECS中执行(==就是把代码封装,压入栈,按序执行==)
- ==**总结:** 全局的代码放入执行上下文(ec),然后这些执行上下文形成了数据结构意义上的栈结构,再从栈结构中一个个调用这些ec,执行内部的代码==
- **==分清执行上下文,执行上下文栈(栈),全局代码块==**
  - 全局代码块就是全局代码构建的执行上下文,名字不同,都是一个东西
  - 执行上下文在逻辑上构成了执行上下文栈

- ==VO对象==(variable Object 变量对象): 
  - 每一个执行上下文会关联一个VO对象,==作用是存放代码中的变量和函数的声明,其中普通变量不会设置值,函数比较特殊,会开辟内存并初始化函数,并且优先声明函数==
  - **全局代码的VO对象其实就是GO**,==也就是全局代码被放入可执行上下文之前,会把声明的信息存入window内存中==
  - 除此之外,执行上下文还会关联作用域链和this(全局代码的this指向就是window)
- ==总结:==
  - 全局代码的可执行上下文关联了==VO对象,作用域链和this==
  - 同时VO=GO,所以把==代码中的声明全部存入到window对象中了==
  - 目前只是把js存入可执行上下文并压入栈,==并未执行js代码==
- ==执行js代码==
  - 把声明过的变量进行赋值
  - 跳过函数的声明,因为在关联VO中,函数已经初始化了,==这也是为什么函数可以在定义前调用的原因,而普通数据不行==
    ```js
      foo() // foo
      console.log(num) // undefined

      var message = 'global-message'
      var num = 10
      function foo (){
        var message = 'foo-message'
        var name = 'foo'
        console.log('foo')
      }
    ```
    [![pENckQg.png](https://s21.ax1x.com/2025/03/10/pENckQg.png)](https://imgse.com/i/pENckQg)
- ==面试题: 正如下面的代码,foo函数被提前声明并初始化了,如果此时再执行js代码,var的操作会被正常进行,而函数则被跳过,所以最后foo就被赋值覆盖了==
  ```js
    var foo = 'abc'
    function foo (){
      console.log('foo')
    }
    console.log(foo) // abc
  ```
### 函数代码执行前后的流程
- ==执行函数的流程==: 函数内部的代码又会生成一个执行上下文,同时关联一个VO,但是函数内的代码不是全局代码了,VO不再是GO,==所以需要创建一个新的对象,**这个对象称为AO**==
- ==关于AO(Active Object)==
  - 当函数执行上下文时,创建AO对象
  - 这个AO对象会使用arguments作为初始化,其初始值为传入的参数
  - AO对象会作为函数代码关联的VO来存放其变量的初始化
  ```js
    function foo (num){
      var message = 'foo message'
      var name = 'foo'
      console.log('foo')
    }
    foo(123)
  ```
- 只有上面的全局直接定义函数才会被认定为有效
  ```js
  var baz = function(){} // 会被认定为普通的变量baz,而非函数
  ```
  [![pENcAyQ.png](https://s21.ax1x.com/2025/03/10/pENcAyQ.png)](https://imgse.com/i/pENcAyQ)
### 函数多次执行流程
   ```js
    function foo (num){
      var message = 'foo message'
      var name = 'foo'
      console.log('foo')
    }
    foo(123) // 1
    foo(123) // 2
    foo(123) // 3
  ```
- ==重复说:== 全局解析函数代码会挂载到GO上,然后只有在执行函数内部代码时才会创建AO及初始化AO
- ==在执行1 2 3部时,虽然都是同一个函数的执行,但是每次执行完函数都会立即销毁栈内的执行上下文,然后创建新的执行上下文,并且创建新的AO+初始化,之前的AO会在之后的内存回收中被销毁==
### 函数代码相互调用
  ```js
    function bar(){
      var message = 'bar message'
    }

    function foo (num){
      var message = 'foo message'
      var name = 'foo'
      bar() // 执行其他函数
      console.log(' I am foo')
    }

    foo(123)
  ```
  - 1.初始化下,全局函数bar与foo创建初始化
  - 2.执行foo内部代码,创建foo的AO
  - 3.执行foo内的代码,给AO内部message和name初始化
  - 4.执行bar内的代码,创建bar的AO
  - 5.执行bar内的代码,给AO内部message初始化
  - 6.执行完bar函数后,销毁栈内部的bar执行上下文
  - 7.执行foo内的代码,执行log操作
  - 8.内存回收foo和bar的AO
  - ==函数内变量声明,没有值,在栈中执行代码,才会给这些变量初始化赋值==

### 变量查找的作用域链顺序
- 变量找自己的值==优先在自己的VO中找,**只要是有声明,即使没有值也会打印undefined**==,而不是盲目地向上层作用域寻找
  ```js
    var message = 'global message'
    function foo(){
      console.log(message)
      var message = 'foo message'
    }
    foo()  // 结果为undefined,不是global message
  ```
- ==当函数中根本没有message时==
  ```js
    var message = 'global message'
    function foo(){
      console.log(message) 
    }
    foo() // global message
  ```
  > 自己的VO找不到,就去作用域链找`[[scopes]]`,这个值会被赋值给执行上下文的scope属性
- ==作用域链Scope Chain==
  - 作用域链是一个对象列表,==当进入一个执行上下文时,作用域链就会被创建,根据代码类型(**全局/函数代码**),添加一系列对象==
  - 全局类型的作用域链只有GO,找不到就报错
  - ==函数类型的作用域链在创建时就被确定了==
- ==**面试题**==
  ```js
    var message = 'global message'
    // 定义foo 作用域链已经确定了
    function foo(){
      console.log(message)
    }

    var obj = {
      name: 'obj',
      bar: function(){
        var message = 'bar message'
        foo()
      }
    }

    obj.bar() // 打印结果为global message 而不是bar message
  ```
- 比如上面的,==函数foo的作用域链创建时就已经确定了,为Global Object==,当自己的VO找不到时,就去scope中找,内存中的scope chain已经把地址赋值给scope了
  [![pENcjpT.png](https://s21.ax1x.com/2025/03/11/pENcjpT.png)](https://imgse.com/i/pENcjpT)
### 函数嵌套的作用域链的查找
  ```js
    var message = 'global message'
    function foo(){
      function bar(){
        function test(){
          console.log(message)
        }
        return test
      }
      return bar
    }

    var bar = foo()
    var test = bar()
    test() // global message
  ```
  - ==每个函数都有自己的作用域链,在自己的AO内找不到后,会在作用域链内部查找==
  - foo的作用域链: 
    - 0: global 
  - bar的作用域链:
    - 0: foo的AO
    - 1: global
  - test的作用域链:
    - 0: bar的AO
    - 1: foo的AO
    - 2: global
### 豆包解释
- ==作用域链是 JavaScript 中变量查找的规则==，核心是：当访问一个变量时，==JS 会从当前作用域开始查找，找不到就往上一级作用域找，直到全局作用域==，形成一条 “链式查找路径”。
- 作用域就是变量的 “有效范围”，分三种：
  1.==全局作用域==：在所有函数外声明的变量，整个程序都能访问。
  2.==函数作用域==：在函数内声明的变量，只能在函数内访问。
  3.==块级作用域（ES6+）==：用 let/const 在 {} 内声明的变量（如 if、for 块），只能在块内访问。
- 当使用一个变量时，JS 会按以下规则查找：
  1.先在当前作用域找，找到就用。
  2.找不到就去父级作用域找。
  3.一直往上，直到全局作用域。
  4.全局也找不到，就报错（未声明）或返回 undefined（已声明未赋值）。
- 例如: (==函数内作用域在定义时已经创建,后续即使针对变量赋值不会改变初始的作用域值==)
  ```js
    // 全局作用域
    let a = 100;

    function fn() {
      // 函数作用域（fn的作用域）
      let b = 200;
      
      function inner() {
        // 函数作用域（inner的作用域，是fn的子作用域）
        let c = 300;
        console.log(a); // 100（当前作用域没有，往父级fn找，还没有，再往全局找，找到a=100）
        console.log(b); // 200（当前作用域没有，往父级fn找，找到b=200）
        console.log(c); // 300（当前作用域有，直接用）
        console.log(d); // 报错：d is not defined（全局也找不到）
      }
      
      inner();
    }

    fn();
  ```
- ES6(let const)
  ```js
    let x = 10;

    if (true) {
      let y = 20; // 块级作用域（if块内）
      console.log(x); // 10（当前块内没有x，往父级全局找）
      console.log(y); // 20（当前块内有）
    }

    console.log(y); // 报错：y is not defined（全局作用域找不到块内的y）
  ```
### 作用域面试题
  ```js
    var n = 100
    function foo(){
      n = 200
    }
    foo()
    console.log(n) // 200
  ```
  > foo函数中是==访问n==并修改其值,由于foo自己AO中没有n,所以==foo根据作用域链找到全局的n==,然后改变值,最后打印为200
  ```js
    var n = 100
    function foo(){
      console.log(n);
      var n = 200
      console.log(n);
    }
    foo() // undefined 200
  ```
  > 第一个n: 函数在初始化时已经创建自己的AO,函数内部有var n,n已经被声明出来了,但还没有值,所以foo在自己的AO内找到了没有值的n
  > 第二个: AO内声明并赋值200,访问自己AO中的n,为200
  ```js
    var n = 100

    function foo1(){
      console.log(n) // 100
    }

    function foo2(){
      var n = 200
      console.log(n) // 200
      foo1()
    }

    foo2()
  ```
  > 1.执行foo2,内部声明赋值n,打印n在自己的AO中找到,200
  > 2.执行foo1,==函数的作用域链在定义时确定,所以foo1自己AO找不到n后,作用域链指向global,所以打印的n为global内的n,值为100==
  ```js
  var n = 100
  function foo(){
    console.log(n);
    return
    var n = 200
  }
  foo() // undefined
  ```
  > 函数代码解析时,不会管return,n还是会初始化,所以n为undefined,在执行时,才会执行return,n也无法被赋值
## 闭包
### js内存管理
- 内存: 在执行代码中,会申请内存,有的语言自动创建(java js py),有的语言需要手动管理内存(c语言 c++)
- 内存生命周期: 
  - 申请内存
  - 使用内存
  - 不使用后,释放内存
- js的内存分配
  - js对于原始数据分配,就在栈空间内进行分配,同时在自己的AO内存储变量,执行完后销毁
  - js对于复杂类型数据,就在堆开辟空间,把地址返回给变量
- js垃圾内存回收(堆)
  - java也是这个机制,很多语言都使用这个,==垃圾回收机制GC Garbage Collection==
- 常见的GC算法 ==引用计数 Refrence counting==
  - 在堆中每一个内存都有自己的引用计数,栈中执行代码时,会有许多变量使用到这个内存,而算法会记录这个内存被引用的计数,当这个数字为0时,代表栈中没有变量调用这个内存了,则立即销毁这个内存
  - js不用这个



### 闭包是什么
- 闭包是一个结构,==包含函数和它所关联环境==,js中的闭包是自动化的,闭包的方便体现在下面
  ```js
    var name = 'cdy'
    var num = 100

    function foo(){
      console.log(name,num)
    }

    foo() // 'cdy' 100
  ```
  > 函数访问name和num就是个闭包,如果没有闭包,那么外部变量的值必须作为参数传入函数时才会被允许使用,但是js中通过作用域链已经链接了函数和其关联环境,所以极大方便了我们的使用
- MDN: ==一个函数和对其周围状态的引用捆绑在一起的组合称为闭包==,也就说闭包可以让你在一个内层函数中访问其外层函数的作用域,在js中创建一个函数,闭包会在函数创建的时候创建出来,但从严格角度来说,当函数访问外层作用域变量时,才会是一个闭包
### 豆包解释
- 在 JavaScript 中，闭包是指函数能够访问其自身作用域之外的变量的现象。
- 简单来说，当一个函数 A 内部定义了另一个函数 B，并且函数 B 使用了函数 A 中的变量，同时函数 B 被返回或传递到外部时，就形成了闭包。这使得函数 A 中的变量不会被垃圾回收机制清除，即使函数 A 已经执行完毕。
### 闭包的内存泄露和清除
- 造成闭包内存泄漏的代码如下: (==柯里化的函数==)
  ```js
    function createAdder(count){
      function adder(num){
        return num + count
      }
      return adder
    }

    var adder5 = createAdder(5)
    adder5(10)
    adder5(20)
    
    var adder8 = createAdder(8)
    adder8(10)
    adder8(20)
  ```
- ==在内存中形成的图如下==
  [![pENIt7F.jpg](https://s21.ax1x.com/2025/03/11/pENIt7F.jpg)](https://imgse.com/i/pENIt7F)
- ==但是当执行完adder8()之后,我们永远不会在使用它了,但是看内存图,**adder8开辟的内存空间依旧被Global Object调用,这个内存需要手动删除**==
- 造成adder8存在全局global的代码段
  ```js
    var adder5 = createAdder(5)
    var adder8 = createAdder(8)
  ```
  adder5和adder8作为普通变量存放全局,后面执行代码的时候把adder函数创建的内存保存在全局中了
- 加一行代码即可,==取消掉adder8的所有引用==
  ```js
    adder8 = null
  ```
- 至此重新全局中的adder8进行定向,之前创建的adder8内存空间失去引用,之后会被GC销毁,如图
  [![pENIUk4.jpg](https://s21.ax1x.com/2025/03/11/pENIUk4.jpg)](https://imgse.com/i/pENIUk4)
- ==**一个巨大内存泄漏的例子**==
- ==可以通过工具--内存--查看内存泄漏的大小==
  ```js
    function createArray(){
      // 单个arr内存大小: 一个数字(100)4字节, 4*1024*1024->4M
      var arr = new Array(1024*1024).fill(100)

      function test(){
        console.log(arr)
      }

      return test
    }

    var totalArr = [] // 全局定义的数组
    var createBtn = document.querySelector('.create')
    var destroyBtn = document.querySelector('.destroy')
    createBtn.onclick = ()=>{
      for(var i=0;i<50;i++){
        // 全局的数组每一项item存储着createArray,global中也就记录了数组每一项对应的createArray函数地址(引用),也就是test函数,而test函数中又引用arr,导致arr创建的内存也被引用了,最后即global object通过作用域链引用了arr
        // 这将导致即使本次函数在栈中结束调用后,GC无法删除arr
        totalArr.push(createArray())
      }
    }
    // 上述操作相当于执行100次createArray(),每次执行都会重新执行函数内的代码,即会重新创建新的数组对象(new Array),但是每次创建的arr内存都没销毁(totalArr引用着这些内存),造成了内存泄漏 

    // 释放内存--> 结束global object对这些arr的引用,即结束全局对象totalArr内部对createArray()的引用
    destroyBtn.onclick = ()=>{
      totalArr = [] // 清空内部所有的item(item就是createArray函数)
    }
  ```

## 函数增强
### 函数对象的属性补充
- 函数也属于对象的一种,介绍2个函数的属性(==通用==)
- 1.`name`: 显示函数的名字
- 2.`length`: 显示函数的==形参个数==,==**剩余参数和默认形参不在范围内**==
### 函数中arugments使用
- arugments参数是伪数组,本质是对象,内部存放所有传入函数的参数,==即使超出形参烦恼为==
  ```js
    function foo(num1,num2){
      console.log(arugments) // 1 2 3 4 5
    }

    foo(1,2,3,4,5)
  ```
  > ==由于arguments是伪数组==,只有length和索引功能,没有常规数组的map和filter方法
- ==转为数组的方法==
  - 1.for循环一点点加入数组
  - 2.Array.from(arguments)
  - 3.展开运算符,`[...arguments]`
- ==单独的箭头函数没有arguments==
  ```js
    function foo(){
        var bar = ()=>{
          // 箭头函数自己没有,但是上层作用域有arguments参数,所以这里也能打印出值
          console.log(arguments);
        }
        bar()
      }

      foo(1,2,3,4)
  ```
### 函数的剩余参数使用
- ==对没有对应实参的形参进行接受的数组==
  ```js
    function foo(num1,num2,...otherItem){
      console.log(otherItem) 
    }
    foo(1,2,3,4) // [3,4]
  ```
- ==剩余参数与arguments的区别:==
  - 1.arguments是接受所有的参数,剩余参数只接受没有对应实参的形参
  - 2.arguments是伪数组,剩余参数是数组
- ==总结: 剩余参数rest是ES6中优化arguments新增的语法,更加优秀==
### 函数的默认参数
- ==给形参设置默认参数==
  ```js
    // 1.默认参数的使用
    // 注意: 有默认参数的形参不会被记录到函数的length属性内,并且后面的所有参数都不会计算再length范围之内
    function foo(arg1=0,arg2=0){
      console.log(arg1,arg2)
    }

    foo(10,20)
    foo()

    // 2.有默认值的参数最好放在后面,这样调用函数时方便
    function bar (name,age=18){
      console.log(name,age);
    }

    bar('cdy')
    bar('ki',24)
  ```
  > ==拓展: 当函数形参既有默认参数又有剩余参数时,顺序为 **普通形参 默认值形参 剩余形参**==
### 默认参数解构
- ==学过解构赋值,函数的默认参数可以与解构相结合==
- 解构赋值中的默认参数
  ```js
    var obj = {
      age: 12
    }
    const { name = 'codewhy' , age } = obj  
    // 当解构对象中不存在name属性时,可以通过默认参数给与赋值
    console.log(name , age ) // codewhy 12
  ```
- 利用这一特性,简化函数对对象设置默认参数的代码
  ```js
    function foo (obj = {name: 'kiki', age: 10}){
      console.log(obj.name, obj.age)
    }
    foo()
  ```
- ==优化后==
  ```js
    function foo ({name = 'kiki' , age = 12} = {}){
      console.log(name,age)
    }
    foo()
  ```
### 纯函数理解
- 函数式编程中有一个概念叫纯函数,==在框架react开发中常常使用,许多第三方库的方法也是纯函数==
- ==纯函数的条件==
  - 1.输入相同的值,返回相同的值
  - 2.函数不能产生副作用,即对函数外产生了附加的影响,比如修改了全局变量,修改参数或改变外部存储

- 函数内的值不能与函数外部有关联 (==违反1==)
  ```js
    let foo = 5
    function sum (num1){
      return num + foo
    }
    sum(10) // 15
    foo = 10
    sum(10) // 20
  ```
- 纯函数不能影响到外部 (==违反2==)
  ```js
    let info = { name: 'info' }
    function foo (){
      console.log(info.name)
      info.age = 10
    }
    foo()
  ```
  > ==在React中,无论是函数还是组件,都必须保护传入的参数props不被修改,只用使用==
- ==纯函数的优点:==
  - 纯函数方法只需关心输入的东西,不必关心外层作用域的值或依赖外部变量 
  - 调用函数时,可以知道确定的输入产生确定的输出,输入的内容不会被随意篡改
### 科里化理解
- ==柯里化函数:== 把接受多个参数的函数转为接受一个单一参数的函数,并返回新的函数接受剩余的参数,即==只传递一部分参数,让它返回一个函数去处理剩余的参数==
  ```js
   // 调用了3次foo函数,每次传入一个参数
    foo(1,2,3)--->foo(1)(2)(3) 
  ```
- ==柯里化函数==
  ```js
    function foo(x){
      return function(y){
        return function(z){
          console.log(x+y+z) // 闭包:可以根据作用域链找到x和y
        }
      }
    }

    foo(10)(20)(30)
  ```
- ==柯里化函数的箭头函数写法==
  ```js
    function foo(x){
      return y=>{
        return z=>{
          console.log(x+y+z)
        }
      }
    }

    // 简化为
    var foo = x => y => z => {
      console.log(x+y+z)
    }
  ```
### 柯里化函数案例和优势
- ==案例: 打印日志==
  ```js
    // 打印日志
    // 1.日志时间
    // 2.日志类型 info/debug/feature
    // 3.具体信息 额外补充

    var logInfo = date => type => message =>{
      console.log(`时间:${date} 类型:${type} 内容:${message}`)
    }

    var logToday = logInfo('2025/3/11')
    var logTodayDebug = logToday("Debug")
    var logTodayFeature = logToday("Feature")

    // 打印debug日志
    logTodayDebug('修复了XXX')
    logTodayDebug('修复了XXX')
    logTodayDebug('修复了XXX')
    // 打印feature日志
    logTodayFeature('更新XXX')
    logTodayFeature('更新XXX')
    logTodayFeature('更新XXX')
  ```
  > ==保存了之前的信息,省略了一些步骤==
- ==柯里化的优势:== 
  - 函数的职责单一,尽可能将一大堆功能拆开处理
  - 对每一次传入的参数在单一函数中进行集中处理,在下一个函数中使用处理后的结果,每个参数的处理代码划分明确
### 组合函数 
- 组合函数是使用函数的一个技巧,将多个函数进行组合,下面是工具封装实例
  ```js
    // 将多个函数组合,按顺序执行
    function double(num){
      return num*2
    }

    function pow(num){
      return num ** 2 
    }

    // 封装工具函数
    function composeFn(...fns) {
      // 1.边界判断
      if(fns.length <= 0) return 
      for (let fn of fns) {
        if (typeof fn !== "function") {
          throw new Error("必须传入函数类型数据");
        }
      }

      // 2.返回的新函数,接受剩余参数...args
      return function (...args){
        // 先执行第一个函数
        let res = fns[0].apply(this,args)
        // 剩余的函数执行,把上一个函数执行的结果作为参数传入进去
        for(let i=1; i<fns.length; i++){
          let fn = fns[i]
          res = fn.apply(this,[res])
        }
        return res
      }
    }

    const newFn = composeFn(double,pow)
    const newNum = newFn(100) 
    console.log(newNum); // 40000
  ```

## 本地存储storage
### 本地存储的分类
- ==本地存储分为localStorage和sessionStorage==
- 1.两者区别
  - localStorage: 永久存储,除非删除
  - sessionStorage: 临时存储,关闭浏览器删除
  - 页面跳转: 
    - 在本页面打开新页面, target=self, 两者都会保存
    - 在新的标签页打开页面, target=blank, ss会删除,ls会保存 
- 2.常见api
  - .length()
  - .clear()
  - getItem(key)
  - setItem(key,value)
  - remove(key)
- ==3.开发技巧==
  - 一个字符串在两个相同的地方使用
  ```js
    const ACESS_TOKEN = 'token'
    localStorage.setItem(ACESS_TOKEN,"whyToken") 
    localStorage.getItem(ACESS_TOKEN) 
  ```
### 本地存储的封装
- ==封装Storage==
  ```js
    // 封装存储的类
    class Cache {
      constructor(isLocal = true){
        this.storage = isLocal ? localStorage : sessionStorage
      }

      setCache(key,value){
        if(!value){
          throw new Error('value必须有值')
        }

        if(value){
          // 非字符串数据需要转化为JSON数据
          this.storage.setItem(key,JSON.stringify(value))
        }
        
      }

      getCache(key){
        // 获取数据,统一解析
        const res = this.storage.getItem(key)
        if(res){
          return JSON.parse(res)
        }
      }

      removeCache(key){
        this.storage.removeItem(key)
      }

      clear(){
        this.storage.clear()
      }
    }

    const localCache = new Cache()
    const sessionCache = new Cache(false)


    localCache.setCache('token',"123123123")
    localCache.getCache('token')
  ```
## Js的运行原理
### 事件队列
- ==js是单线程语言,浏览器在运行时,每一个页面是一个进程,每个进程内部有多个线程,其中一个线程就是js线程,当一个页面崩溃时,只是本个线程崩溃,浏览器并不会崩溃==
- js线程中分为3个部分,==栈(执行上下文栈),浏览器代理,队列Queue==
- ==异步操作的运行逻辑==
  ==1.定时器==
  ```js
    console.log(1)

    setTimeout(()=>{
      console.log(2)
    },1000)

    console.log(3)
  ```
  - 打印属于同步操作,定时器属于异步操作,代码按顺序执行,异步的操作会被安排给浏览器其他线程,然后继续执行栈内代码,浏览器代理,当1s结束后,计时器触发,然后会把定时器的回调函数放入队列中等待执行,当栈中没有代码再执行时,再执行队列中的代码,队列执行的规律是先来先走,所以打印132
  - ==即使定时器0s也会按照刚刚流程走一圈,放入队列中等待,也就是说,只要是异步了,都会被放入队列等待栈,即异步等待同步执行完在执行==
- ==2.绑定监听事件==
  ```js
    console.log(1)

    const btn = document.querySelector('button')
    btn.onclick = function(){
      console.log('button')
    }

    console.log(3)
  ```
  - 同样浏览器会监听你的鼠标点击操作,当你点击后,对应的监听函数被放入队列,等待栈空时继续执行
- ==3.Promise==
  ```js
    new Promise((resolve,reject) =>{
      // 同步的代码
      console.log('Promise-111')
      console.log('Promise-222')
      resolve() // 异步行为,then的回调函数被放入任务队列
      console.log('Promise-444')
    }).then(res =>{
      // then回调函数内的代码即为异步代码
      console.log('Promise-333')
    })
  ```
- 效果图
  [![pEUx3QS.jpg](https://s21.ax1x.com/2025/03/14/pEUx3QS.jpg)](https://imgse.com/i/pEUx3QS)
### 宏任务和微任务
- 队列并非只有一种,任务分为宏任务和微任务,所以也有宏任务队列和微任务队列
- 宏任务: ==定时器,ajax网络请求,事件监听(比如onclick)== ,UI Rendering
- 微任务: ==Promise的then回调==  Mutation Observer API, queueMicrotask
- ==两个队列执行顺序==
  - 执行**每一个宏任务之前**,检查有没有微任务,如果有,优先执行微任务
### 执行代码顺序面试题
- 考察宏任务和微任务以及js异步同步运行机制的面试题,==属于字节级别==
- 当执行到异步时把代码挂载到其他进程,然后继续执行同步代码,当同步代码执行完后,异步代码在执行 ==画图做更好,分好宏微任务,解析不好写==
- ==面1==
  ```js
  setTimeout(function () {
    console.log("setTimeout1");
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      new Promise(function (resolve) {
        resolve();
      }).then(function () {
        console.log("then4");
      });
      console.log("then2");
    });
  });

  new Promise(function (resolve) {
    console.log("promise1");
    resolve();
  }).then(function () {
    console.log("then1");
  });

  setTimeout(function () {
    console.log("setTimeout2");
  });

  console.log(2);

  queueMicrotask(() => {
    console.log("queueMicrotask1")
  });

  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    console.log("then3");
  });

  // promise1
  // 2
  // then1
  // queueMicrotask1
  // then3
  // setTimeout1
  // then2
  // then4
  // setTimeout2
  ```
- ==面2==
  ```js
  async function async1 () {
    console.log('async1 start')
    await async2();
    console.log('async1 end')
  }

  async function async2 () {
    console.log('async2')
  }

  console.log('script start')

  setTimeout(function () {
    console.log('setTimeout')
  }, 0)
  
  async1();
  
  new Promise (function (resolve) {
    console.log('promise1')
    resolve();
  }).then (function () {
    console.log('promise2')
  })

  console.log('script end')

  // script start
  // async1 start
  // async2
  // promise1
  // script end
  // async1 end
  // promise2
  // setTimeout

  ```
## 异常处理
### 抛出异常throw
- js代码报错是很严重的事故,因为js是单线程,所以一旦爆红,后面的代码都无法执行
- ==封装工具时,我们可以对可能出现的问题,抛出自定义异常,这些问题可能符合语法规则,但是不符合工具的使用规则==
- ==throw关键字:==
  - 1.当遇到throw语句时,函数执行自动停止,抛出异常,和正常的爆红一样,信息是自定义的
  - 2.==自定义抛出信息==
     - 可以是基础数据类型Number String Object;  
     - ==**new Error()**==, js封装的错误类, ==有调用栈,把每一个出错的位置都表示出来==
    ```js
      throw(123123123)
      throw('codewhy')
      throw {errorMessage: '错误', errorCode: '-1001'}
      throw new Error('出错了')
    ```
- ==调用栈==: 比如下面,会先编辑bar内出错的行数,由于是调用bar函数出错,所以也会标识bar函数调用的行数,以此类推,多少嵌套都可以找出来
  ```js
    function bar(){
      console.log('111')
      console.log('222')
      // throw {errorMessage: '错误', errorCode: '-1001'}
      throw new Error('出错了')
      console.log('333')
    }

    bar()
  ```
- ==额外知识(不重要)==
  - new Error()是js的内置类,他有三个属性
  - message:错误信息 name:错误名字 stack:整个错误信息,包含错误信息,名字和调用栈 (Error默认就是抛出stack) ,==一般就是直接把错误写入错误类中==
### 异常捕获try-catch
- 异常会层层上抛,上抛的同时记录下来组成调用栈,最后抛到浏览器仍没有解决,就会爆红
- ==异常的捕获tyr-catch==
  ```js
    // 只抛出不解决,最后抛到浏览器,代码照样停止
    function foo(){
      console.log('111')
      console.log('222')
      throw new Error('出错了')
      console.log('333')
    }

    function test(){
      try {
        // 可能出现异常的代码,如果没有异常,跳出try-catch继续执行下面的代码
        foo() 
      } catch (error) {
        // 如果foo出现异常,执行这里的代码,执行完后继续执行try-catch下面的代码
        console.log(error) // 打印抛出的错误
      } finally {
        // 无论如何,都执行的代码
        // 注意: try和finally都有返回,只返回finallly
        console.log('finally')
      }
      console.log('test end')
    }

    test()
  ```
  > 1.异常抛出在foo函数,捕获异常在test函数内
  > ==2.try-catch捕获的异常不会阻塞代码继续,会继续打印出错误error==
  > ==**3.捕获的异常可以是自定义throw抛出的异常,也可以是常规报错(语法问题等)**==
`throw new Error()` 和 `new Error()` 有本质区别，核心在于是否触发“错误抛出”行为：

### **知识补充(豆包)**
#### new Error()与 throw new Error()
1. `new Error()`：仅创建错误对象，不触发错误
- 这只是**创建一个 Error 实例**（包含错误信息、堆栈等属性），但不会中断程序执行，也不会触发任何错误处理机制。
- 相当于创建了一个普通的 JavaScript 对象，只是它的类型是 `Error`。

**示例**：
```javascript
// 仅创建错误对象，不抛出
const err = new Error('这是一个错误');
console.log(err.message); // 打印 "这是一个错误"（程序继续执行）
console.log('后续代码正常运行'); // 会执行
```


1. `throw new Error()`：创建并抛出错误，中断执行
- 不仅创建 Error 实例，还会**主动抛出这个错误**，导致当前代码执行流程中断，并触发错误捕获机制（如 `try/catch` 或 Promise 的 `.catch()`）。
- 如果没有任何捕获机制，会导致全局错误（如浏览器控制台的 `Uncaught Error`）。

**示例**：
```javascript
try {
  // 创建并抛出错误
  throw new Error('这是一个被抛出的错误');
  console.log('这句话不会执行'); // 因为错误抛出后流程被中断
} catch (e) {
  console.log('捕获到错误：', e.message); // 会执行
}
```


关键区别总结
| 操作               | 行为                                  | 对程序执行的影响                  |
|--------------------|---------------------------------------|-----------------------------------|
| `new Error(...)`   | 创建错误对象，不抛出                  | 程序继续执行，无任何异常提示      |
| `throw new Error(...)` | 创建错误对象并立即抛出           | 中断当前执行流程，需被捕获否则报错 |


在 Promise 中的特殊场景
在 Promise 的 `reject` 中，我们通常直接传递 `new Error()` 而不用 `throw`，因为 `reject` 本身的作用就是“标记 Promise 为失败状态”：
```javascript
new Promise((resolve, reject) => {
  // 正确：用 reject 传递错误对象（无需 throw）
  reject(new Error('请求失败')); 
  
  // 等效但不推荐：在 Promise  executor 中 throw 会被自动捕获并转为 reject
  // throw new Error('请求失败'); 
});
```
- Promise 的执行器函数（executor）内部如果 `throw` 错误，会被 Promise 自动捕获并调用 `reject`，所以两种方式效果相同，但 `reject(new Error())` 更符合语义。


简单说：`new Error()` 是“造了个错误对象”，`throw new Error()` 是“造了个错误对象并把它扔出去”。


#### throw new Error()与reject(new Error())
在 Promise 执行器（executor）函数内部，`reject(new Error())` 和 `throw new Error()` 在**最终效果上是等效的**，但二者的底层机制不同。


1. 相同点：都会导致 Promise 变为 rejected 状态
无论使用 `reject` 还是 `throw`，最终都会让当前 Promise 进入“拒绝”状态，并且错误信息会被传递给后续的 `.catch()` 处理器（如果有的话）。

**示例 1：使用 reject**
```javascript
const p1 = new Promise((resolve, reject) => {
  reject(new Error('出错了')); // 主动调用 reject
});
p1.catch(err => console.log(err.message)); // 输出：出错了
```

**示例 2：使用 throw**
```javascript
const p2 = new Promise((resolve, reject) => {
  throw new Error('出错了'); // 抛出错误
});
p2.catch(err => console.log(err.message)); // 输出：出错了
```
两者最终都会触发 `.catch()`，效果一致。


 1. 不同点：触发 rejected 状态的机制不同
- **`reject(new Error())`**：主动调用 Promise 提供的 `reject` 函数，显式地将 Promise 标记为 rejected 状态。这是**推荐的做法**，语义更清晰（明确表示“此 Promise 因该错误而失败”）。

- **`throw new Error()`**：通过抛出同步错误的方式，被 Promise 内部机制捕获，进而自动调用 `reject`。这是一种“间接触发”，本质上是 Promise 对执行器内部同步错误的“兜底处理”。


 1. 注意：仅在 Promise 执行器内部等效
`throw` 的效果仅限于 Promise 执行器（即 `new Promise((resolve, reject) => { ... })` 中的回调函数）内部。在其他场景（如 `.then()` 回调中），`throw` 和 `reject` 的行为不同：

- 在 `.then()` 回调中 `throw` 错误，会导致当前 Promise 链变为 rejected 状态（等效于返回一个被 reject 的 Promise）。
- 而 `.then()` 回调中无法直接调用 `reject` 函数（除非手动返回 `Promise.reject(...)`）。

**示例：在 .then() 中 throw**
```javascript
Promise.resolve()
  .then(() => {
    throw new Error('then 中出错'); // 会导致后续 .catch() 触发
  })
  .catch(err => console.log(err.message)); // 输出：then 中出错
```


总结
- 在 Promise 执行器内部：`reject(new Error())` 和 `throw new Error()` 最终效果相同，都会使 Promise 变为 rejected 状态。
- 推荐使用 `reject(new Error())`，因为它更明确地表达了“主动拒绝 Promise”的意图，代码可读性更高。
- 在执行器外部（如 `.then()` 回调），`throw` 错误会被自动转为 rejected 状态，等效于 `return Promise.reject(new Error())`。

## 迭代器与生成器
### 理解迭代器
- ==迭代器(iterator)==: 在容器(container)对象上遍历其每一项的对象,称为迭代器(它是对象),容器可以是数组,链表,哈希表,树结构等
- 在各种语言中都有迭代器,实现的方式有所不同,如java,python
- ==js中迭代器需要符合迭代器规则:==
  - 迭代器定义产生了==有限个或无限个==的值的标准方法
  - 有一个特定的next方法
- ==next方法:==
  - ==一个有参数或无参数的函数==,返回一个有以下两个属性的对象
  - ==1.done(Boolean)==
  - 如果迭代器可以产生序列的下一个值,则为false
  - 如果已经将序列迭代完毕,则为true
  - ==2.value==
  - 返回序列的值,done为true是可以省略,此时为undefined
- 简单数组迭代器: 
    ```js
      const names = ['kiki','kerwin','codewhy']
      const nums = [100,90,120]

      // 写一个生成数组的迭代器的函数
      function createArrayIterator(arr){
        let index = 0
        return { // 返回对象,有done和value两个属性
          next: function(){ // next函数
            if(index < arr.length){
              // index用完再+1 
              return { done: false , value: arr[index++]}
            }else{
              return {done: true}
            }
          }
        }
      }

      const nameIterator = createArrayIterator(names)
      const numIterator = createArrayIterator(nums)

      console.log(nameIterator.next())
      console.log(nameIterator.next())
      console.log(nameIterator.next())
      console.log(nameIterator.next())

      console.log(numIterator.next())
      console.log(numIterator.next())
      console.log(numIterator.next())
      console.log(numIterator.next())
    ```
### 创建可迭代对象
- 将迭代器嵌入一个不可迭代对象,则这个对象就变为了可迭代对象; 迭代器和可迭代对象不是一个东西
- ==迭代器的要求:==
  - 1.必须实现一个特定函数: `[Symbol.iterator]: function(){}` ==这个函数写法是计算属性值的定义方式(ES6)==
  - 2.这个函数必须返回一个迭代器(这个迭代器用于迭代当前对象),也就是说迭代器必须在这个特殊函数内部
  ```js
    const infos = {
      friends: ['kerwin','kiki','codewhy'],
      [Symbol.iterator]: function(){ // 特定函数
        let index = 0
        const infosIterator = { // 迭代器
          next: ()=> {
            // 箭头函数this指向外层函数作用域,即[Symbol.iterator]
            // this指向infos,这样infos换名字也不用重构了
            if(index < this.friends.length){
              // index用完再+1 
              return { done: false , value: this.friends[index++]}
            }else{
              return {done: true}
            }
          }
        }
        return infosIterator // 返回迭代当前对象的迭代器
      }
    }

    // 拿到对象内部的迭代器,并使用迭代器next函数迭代对象的friends数组
    const infosIterator = infos[Symbol.iterator]()
    console.log(infosIterator.next())
    console.log(infosIterator.next())
    console.log(infosIterator.next())
    console.log(infosIterator.next())

    // 好处: 可迭代对象可以使用"for of"语法 
    for (value of infos){
      console.log(value) // value就是迭代器中的value值
    }
  ```
- js的数组就有内置的迭代器,平时用只是没发觉而已
  ```js
    const names = ['aaa','bbb','ccc'] // 普通数组
    console.log(names[Symbol.iterator]()) // 查看js内置的数组迭代器
    // 获取数组的迭代器并使用
    const arrayIterator = names[Symbol.iterator]()
    console.log(arrayIterator.next())
    console.log(arrayIterator.next())
    console.log(arrayIterator.next())
    console.log(arrayIterator.next())
  ```
### 迭代器优化
- 有时候我们不知想要迭代对象中的数组,这取决于你返回的value值,做出对应的操作后就可以获取你想要的值
  ```js
    const infos = {
      name: 'why',
      age: 30,
      height: 180,
      [Symbol.iterator]: function(){
        // 拿key
        // const keys = Object.keys(this)
        // 拿value
        // const values = Object.values(this)
        // 拿key-value
        const entries = Object.entries(this)
        
        let index = 0
        const iterator = {
          next: function(){
            if(index < entries.length){
              return {done: false, value: entries[index++]}
            }else{
              return {done: true}
            }
          }
        }
        return iterator
      }
    }

    for(const item of infos){
      const [key,value] = item
      console.log(key,value)
    }
  ```
### 可迭代对象应用
- 可迭代对象有很多应用场景,==原生可迭代对象== String Array Map Set arguments NodeList
- 创建可迭代对象,把不可迭代的对象通过定义[Symbol.iterator]函数,变为可迭代对象
- ==**可迭代对象可以for of遍历,展开运算,解构赋值,yield**==
  ```js
    // 常用的方法: 
    new Set() / new Map()  // 必须传入可迭代对象
    Promise.all() / .race()  // 放入可迭代对象,一般放入promise数组
    Array.from() // 放入可迭代对象,转为数组
  ```
### 迭代自定义类(了解)
- 自己定义的类,可以通过在原型上添加[Symbol.iterator]函数,对想要迭代的属性进行迭代
- 额外了解迭代器的中断,在next下额外添加return
  ```js
    class Person{
      constructor(name,friends){
        this.name = name
        this.friends = friends
      }

      // 实例方法
      [Symbol.iterator](){
        let index = 0
        const iterator = {
          next: ()=> {
            if(index < this.friends.length){
              return { done: false , value: this.friends[index++]}
            }else{
              return {done: true}
            }
          },
          return: ()=>{ // 中断
            console.log('监听到迭代器中断')
            return {done:true}
          }
        }
        return iterator // 返回迭代当前对象的迭代器
      }
    }

    const p1 = new Person('kiki',['kerwin','codewhy'])

    for(const item of p1){ // 遍历friends数组
      if(item === 'codewhy'){
        // 遍历终端可以通过break,return,throw中断
        break
      }
      console.log(item);      
    }
  ```
### 理解生成器(ES6)
- ==在react的redux里面用到了生成器,还可以优化前面的迭代器代码==
- 生成器: 函数控制,使用的方案,更加灵活地控制函数什么时候继续执行,暂停执行
- ==生成器本身也是函数,下面是它的一些特点==
  - 格式在function后加*
  - 可以通过yield控制函数的执行流程
  - 返回值是一个生成器(Generator)
  - 生成器本身是一种特殊的迭代器
  ```js
   function* foo(){
      console.log('111')
      console.log('222')
      yield
      console.log('333')
    }

    // 生成器函数执行时返回生成器对象
    // 执行生成器函数代码,需要调用next操作
    // 当遇到yield时,中断执行,再次执行需要重新next
    const generator = foo()
    generator.next() 
    generator.next()
  ```
- ==生成器函数的返回值和yield参数==
  ```js
    function* foo(){
      console.log('111')
      yield '我是yield参数'
      console.log('222')
      return 'aaaa' // 自己写的return
      console.log('333')
    }

    const generator = foo()
    console.log(generator.next()) // {value: '我是yield参数', done: false}
    console.log(generator.next()) // {value: aaa, done: true}

    // 函数默认最后返回会有return,自己不用写
    // 如果从中间写return 'aaaa', 结果就为{value: aaaa, done: true}
    // return代表迭代完成,再次next后面有数据也不迭代了
    console.log(generator.next()) // {value: undefined, done: true}
    console.log(generator.next()) // {value: undefined, done: true}
  ```
- ==生成器函数传入参数 **yield的前面**==
  ```js
    function* foo(info1){
      console.log('111',info1) // 111 第一次传参
      // 接受参数语法在yield前面,info将会在第二次next调用时被使用,所以它接受的是第二次next传入的参数
      // yield后面的参数是截停函数时,给yield的参数,属于第一次next调用的范畴
      const info2 = yield '我是yield参数'
      console.log('222',info2) // 222 第二次调用next
      // return 'aaaa'
      console.log('333')
    }

    // 第一次传参比较特殊
    const generator = foo('第一次传参') 
    console.log(generator.next())
    console.log(generator.next("第二次调用next")) 
  ```
  > ==这个语法很怪,分清field前面和后面2个部分代表的什么,属于哪个next的范畴==
### 生成器应用与yield语法糖
- ==yield语法糖==
  ```js
    // 写一个生成器函数
    function* createArrayGenerator(arr){
      // 语法糖: 将后面的参数自动迭代,这也要求后面的参数必须是一个可迭代对象
      yield* arr 
    }
  ```
- ==简化之前的迭代器代码==
  ```js
    const names = ['kiki','kerwin','codewhy']

    // 写一个生成器函数
    function* createArrayGenerator(arr){
      for(let i=0; i<arr.length; i++){
        yield arr[i]
      }
    }

    // 返回一个生成器,生成器是一个特殊迭代器
    const nameGenerator = createArrayGenerator(names)

    // 调用生成器next,遇到yield暂停
    // 每次打印 {done:false,value:arr[i](yield后面的参数)}
    console.log(nameGenerator.next())
    console.log(nameGenerator.next())
    console.log(nameGenerator.next())
    console.log(nameGenerator.next())
  ```
- ==简化自定义类迭代器==
  ```js
    class Person{
      constructor(name,friends){
        this.name = name
        this.friends = friends
      }

      // 生成器函数的*
      *[Symbol.iterator](){
        // 返回的值自己随意,Object.keys() / values() / entries()
        yield* this.friends 
      }
    }

    const p1 = new Person('kiki',['kerwin','codewhy'])

    for(const item of p1){ // 遍历friends数组
      console.log(item);
    }

    const generator = p1[Symbol.iterator]()
    console.log(generator.next())
    console.log(generator.next())
    console.log(generator.next())
    console.log(generator.next())
  ```

## 防抖和节流
### 初始防抖和节流
- ==防抖和节流函数是前端开发中2个非常重要的函数==,也是面试常客,但是一般的面试倾向于概念问题
- ==学习目标:==
  - 分清防抖和节流
  - 如何应用
  - 内部原理和编写
- ==防抖==: 当事件被触发时,会设定一个延迟时间。若在这个延迟时间内事件再次被触发，就会重新计时，直至延迟时间结束后才执行相应的操作。防抖常用于搜索框输入提示、窗口大小改变等场景
- ==节流==:在一定时间内，无论事件触发多少次，只执行一次相应的操作。节流常用于滚动加载、按钮点击等场景。
  > ==防抖和节流函数是页面性能优化的好方法,自己做的项目中使用并放在简历上是不错的方法==
### 防抖函数(underscore)
- 使用underscore库中的防抖函数
  ```html
  <input type="text">
  <!-- 引入underscore库 -->
  <script src="./underscore_min.js"></script>
  <script>
    const ipt = document.querySelector('input')

    let counter = 1
    // 使用underscore库中的防抖函数
    ipt.oninput = _.debounce(function(){
      console.log(`发送网络请求${counter++}`,this.value)
    },1000)
  <script>
  ```
  > 延迟1s,用户超过1s没有操作,再执行内部的回调函数
### 手写防抖基本功能(核心)
- ==防抖思路: 减少事件触发的频率==
  在延迟时间内,快速地执行多次操作,最后只会触发一次事件
  所以需要记录每一次触发事件的计时器,当在延迟时间内再次触发事件时,删除上一次事件触发器,保证在延迟时间内只执行一次函数
  ==**如图,横线上面的是普通事件执行,下面的是经过防抖函数限制后事件的执行次数**==
  [![pEdbxat.jpg](https://s21.ax1x.com/2025/03/18/pEdbxat.jpg)](https://imgse.com/i/pEdbxat)
- 代码:
  ```js
    /*
      封装函数思路:
      参数:
        参数1: 回调函数 fn
        参数2: 延迟时间 delay
      返回值: 
        新的函数 _bebounce,给原来的函数加工成含有防抖功能的函数
    */ 
    const ipt = document.querySelector('input')
    
    function hydebounce(fn,delay){
      // 1.用于记录上一次触发事件的timer(计时器)
      let timer = null
      // 2.触发事件的函数
      const _debounce = function(){
        // 2.1如果再次触发事件,则取消上一次的事件
        if(timer) clearTimeout(timer)
        // 2.2延迟执行传入的回调函数fn
        timer = setTimeout(()=>{
          fn()
          timer = null // 执行过函数后,将timer重置null (这是封装工具的思路,完成一次功能后,全部重置,不写也行) 
        },delay)

      } 
      // 返回一个新函数
      return _debounce
    }

    let count = 1
    function ajax(){
      console.log(`发送网络请求${count++}`)
    }

    ipt.oninput = hydebounce(ajax,2000)
  ```
### 防抖函数this绑定和event参数(核心)
- 解决封装函数的==this指向和event参数等更多参数==
  ```js
    const ipt = document.querySelector('input')

    function hydebounce(fn,delay){
      let timer = null
      // 事件触发函数未必只有event,还可以自己传入更多的参数,剩余参数接受
      const _debounce = function(...args){
        if(timer) clearTimeout(timer)
        // console.log(this) // 这里的this就指向ipt dom对象了
        timer = setTimeout(()=>{ // 箭头函数,使得定时器内部的this指向外部函数作用域
          fn.apply(this,args) // 1.改变传入函数fn的this指向 2.接受事件触发函数的参数
          timer = null 
        },delay)

      } 
      // 返回一个新函数
      return _debounce
    }

    === 从这里开始看注释,看不懂再听一次课 ===
    // 我们想让ajax函数内部的this指向ipt
    // ipt.oninput绑定的事件函数是_debounce,所以这个函数的this指向ipt
    // ipt的事件触发函数是_debounce,所以同理地,会把事件的默认参数event传给他
    ipt.oninput = hydebounce(ajax,2000)
    let count = 1
    // fn通过apply改变了this指向,并获取到了参数,这里没有传入新的参数,只接受event即可
    function ajax(event){
      console.log(`发送网络请求${count++}`,this.value,event)
    }
  ```
  > **fn**: 传入的函数ajax
  > **_bebounce**: ipt.oninput的事件触发函数,==改造后的fn函数(this指向改变 + 传入了新的参数)==
### 节流函数(underscore)
- ==节流==: 在一定时间内，无论事件触发多少次，只执行一次相应的操作。节流常用于滚动加载、按钮点击等场景,按照固定的频率触发事件
  > ==防抖如果事件触发频繁,小于延迟时间,可以无限延迟事件执行的; 但是节流是固定时间就触发一次事件,不会无限延迟==
- ==节流应用举例==: 飞机大战游戏,1s只能发射一次子弹,用户1s内即使按10次发射,也只执行一次发射子弹事件
  ```html
    <input type="text">
    <!-- 引入underscore库 -->
    <script src="./underscore_min.js"></script>
    <script>
      const ipt = document.querySelector('input')

      let counter = 1
      // 使用underscore库中的节流函数,按照1s的频率执行
      ipt.oninput = _.throttle(function(){
        console.log(`发送网络请求${counter++}`,this.value)
      },1000)
    </script>
  ```
  [![pEwSgx0.jpg](https://s21.ax1x.com/2025/03/19/pEwSgx0.jpg)](https://imgse.com/i/pEwSgx0)
### 手写节流函数(核心)
- ==**间隔时间思路(核心重点):**==
    ==startTime==: 本次间隔区间的开始时间点 
    ==nowTime==: 触发事件时的时间戳
    ==waitTime==: 还要等待时间,即至少过了这个时间才能进行一次触发
    ==interval==: 间隔时间
    ==计算等待时间==: waitTime = interval - (nowTime - startTime)    
    ==可以执行判定==: waitTime <= 0
    ==为下一次循环重置时间==: startTime = nowTime
  ```js
      const ipt = document.querySelector("input");
      let startTime = 0
      // 参数1: 函数 参数2: 间隔时间
      function hythrottle(fn, interval) {
        const _throttle = function (...args) {
          // new Date().getTime() 结果是ms,是一个很大的数
          // 节流函数第一次会立即触发,依据代码逻辑, waitTime = 0-很大的数 = 负数 
          // 执行fn,并给startTime赋值这次nowTime,下一次再触发事件,计算waitTime时, 上次nowTime - 本次nowTime (单位都是ms),时间差值正常化
          const nowTime = new Date().getTime()
          const waitTime = interval - (nowTime - startTime)
          if(waitTime <= 0){
            fn.apply(this,args);
            startTime = nowTime
          }
        };
        return _throttle;
      }

      let counter = 1;
      ipt.oninput = hythrottle(function (event) {
        console.log(`发送网络请求${counter++}`, this.value,event);
      }, 1000);
  ```
  > ==注意==: 间隔时间段未必连续不断的,这取决于你执行事件的时机,waitTime=0正好是衔接情况,小于0代表2个间隔时间段不连续
  [![pEwSRMV.jpg](https://s21.ax1x.com/2025/03/19/pEwSRMV.jpg)](https://imgse.com/i/pEwSRMV)
## 事件总线EventBus
- 事件总线是一种在 JavaScript 里运用广泛的设计模式，其核心思想是借助一个全局的事件中心来管理和协调各个组件、模块之间的通信。它就像一个消息传递的中转站，允许不同的组件发布事件（emit），同时也能让其他组件监听这些事件（on），从而实现组件间的解耦，让代码更易于维护和扩展。
- ==本次手写的事件总线没有传参==
  ```js
    // EventBus类->事件总线对象
    class HYEventBus {
      constructor() {
        this.eventMap = {};
        /*
          数据结构: { 'navClick': [eventFn1,eventFn2,eventFn3] }
          同一个事件navClick可以被多个on监听,每个监听都有回调函数eventFnX
        */
      }

      on(eventName, eventFn) {
        // 获取此监听事件的函数数组
        let eventFns = this.eventMap[eventName];
        if (!eventFns) { // 第一次监听操作时,对象内部还没有这个属性和对应的数组值
          eventFns = []; 
          // 这里的eventFns数组给this.eventMap[eventName]是地址,所以后面操作eventFns时,this.eventMap[eventName]也会被影响
          this.eventMap[eventName] = eventFns;
        }
        eventFns.push(eventFn);
      }

      emit(eventName) {
        // 获取这个监听事件函数数组
        let eventFns = this.eventMap[eventName];
        if (!eventFns) return; 
        eventFns.forEach((fn) => {
          fn(); // 依次执行所有的回调函数
        });
      }
    }

    const eventBus = new HYEventBus()
    const navBtn = document.querySelector('button')

    navBtn.onclick = function (){
      console.log('navBtn的监听')
      eventBus.emit('navClick')
    }

    // 多个监听
    eventBus.on("navClick", ()=>{
      console.log('我是监听1号')
    })

    eventBus.on("navClick", ()=>{
      console.log('我是监听2号')
    })
    // 监听对象不同
    eventBus.on("asideClick", ()=>{
      console.log('我是监听3号')
    })
  ```
  > 热门的库: EventEmitter3,mitt
