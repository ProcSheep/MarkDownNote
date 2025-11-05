## 初始vue
- **官方文档很有帮助**
- vue3官方文档:https://cn.vuejs.org/guide/quick-start
- 在初学vue阶段,==我们使用的是CDN的形式结合html浅尝vue,为了更快的使用,我们选择把vue的源代码下载在本地,直接使用script--src引入==,这种方式是最基础的vue引入,相对比vite,vue/cli更方便,但是也有许多局限,新手入手为主
- 在官方文档的快速上手里有vue的源代码文档,地址为https://unpkg.com/vue@3/dist/vue.global.js
- CDN引入: 把源代码复制到本地文件夹,然后使用script--src引入即可
## 添加vscode代码片段
- 通过快捷键和自定义的代码片段,给vscode配置自己想要的自定义代码,达到快速练习目的
- 借助网站: ==snippet generator==,配置代码片段,简洁和快捷命令,
- 在文件-首选项-配置代码片段-选择html类型文件,进入html.json中,把网站对应的代码复制进去
- ==已配置,命令为`vueapp`==
## vue2与vue3底层逻辑
- 响应式数据:==顾名思义,就是vue内部的代码改变,随之网页的代码内容随之改变==
- ==具体介绍了 "js vue2 vue3 "的响应式底层逻辑==,vue2是基于js的definedPropert实现的,有很多缺点,而vue3是基于proxy实现的,更快更方便
- 代码:
    ```html
    <div id="box">box</div>
    <div id="box1">box1</div>
    <script>
      // 探究vue如何实时修改数据的

      // 看看js如何做?
      // 原生js拦截方法
      // Object.definePropert
      var id = document.getElementById("box")
      var id = document.getElementById("box1")
      var obj = {}
      // 往obj添加一个属性myname
      Object.defineProperty(obj,"myname",{
          // 单纯获取myname的值是执行get函数
          get(value){
              console.log("get",value);
              return box.innerHTML
          },
          // 如果修改myname的值时,执行set函数,并真的对myname进行修改
          set(value){
              console.log("set",value)
              // 更新页面如下
              box.innerHTML = value
          }
      })

      // 以上是Vue2的底层逻辑,有很多缺点
      // Vue3进行改进为ES6 proxy 方法

      // ES6 proxy代理
      var obj1 = {}
      // 更加优秀的拦截效率: 不必一个个拦截,代理单个属性"myname" , 而是直接代理整个对象 , 无论那个属性都可以
      var vm = new Proxy(obj1,{
          get(obj1,key){
              console.log("get");
              return obj1[key]
          },
          set(obj1,key,value){
              console.log("set");
              obj1[key] = value
              box1.innerHTML = value
          }
      })

  </script>
    ```
## createApp().mount() API
- 首先引入vue的CDN源代码(相对路径): `<script src="../线上vue.js代码复制/vue.js"></script>`
- ==双花括号 `{{}}`== :  vue会把里面的东西当作js来运行,也是在html中响应vue的一个方法
  > 注意: ==支持js的基础计算 + - * / , 三目运算 , 拼接字符串行为 , 甚至于函数应用 , 比如,array.slice(0,2) 调用了数组的slice方法==
  > **但是不支持js的语句 , 比如 赋值变量(var a = 1) , 条件语句( if(...){...} ) , 循环语句 , while语句等**
- ==Vue.createApp(obj).count("XXX")== : 前面的就是放入配置对象,是vue代码的配置区 ; 后面是挂载对象,一般挂在根节点(div)上,**记得提前给根节点设置id或class值 , ==id+#(默认)== ; class+.**
  > 注意: ==vue挂在需要根节点,body不可以作为根节点,一般是div,vue支持多个单独挂载,但通常是一个div最为根节点包裹了整一个vue项目,这样我们不用重复进行单一挂载了,此配置对象obj中的vue代码对此根节点内的html代码生效==
- 代码html:
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <!-- 最基础的使用vue方法,把代码下载本地是为了更快速 -->
        <script src="../线上vue.js代码复制/vue.js"></script>
    </head>

    <body>
        <!-- 双花括号 , vue会把里面的东西当作js来运行 -->

        <div id="box">我是kerwin {{10 + 20}}</div>
        <div id="box2">我的vue {{100 + 200}}</div>

        <script>
        // 启动vue,挂载在box节点和box2节点,这2个节点内vue语法生效
        // 使用了两个方法 createApp count
        Vue.createApp().mount("#box"); 
        Vue.createApp().mount("#box2");
        </script>
    </body>
    </html>
  ```
## 命令式和声明式编程区别
- ==原生的js属于命令式编程,vue使用的是声明式导航==
- 命令式编程: 原生js的演示
  ```html
    <h2>
      当前计数: <span class="counter"></span>
    </h2>
    <button class="add">+1</button>
    <button class="sub">-1</button>

    <script>
      // 1.获取dom
      const addBtnEl = document.querySelector(".add")
      const subBtnEl = document.querySelector(".sub")
      const counterEl = document.querySelector(".counter")

      // 设置页面的值
      let count = 100
      counterEl.textContent = count

      // 2.监听行为,做出对应的操作
      addBtnEl.onclick = function (){
        count++
        counterEl.textContent = count
      }
      subBtnEl.onclick = function (){
        count--
        counterEl.textContent = count
      }
    </script>
  ```
- ==vue和原生的区别==
  ```
    命令式编程:(原生js) how to do 模式
      1. 拿到dom元素,操作dom元素
      2. 给dom元素设置监听行为,执行对应操作

    声明式编程:(vue/react)  what to do 模式(获取dom的操作,即how,根本没有)
      1.声明一个模板{{counter}}
      2.声明数据data(){} counter->0
      vue自动关联,不需要关心dom的获取
      3.绑定事件@click
      4.声明函数methods
      vue自动关联,监听函数===dom对象
      5.vue有响应式,检测到数据变化,自动把新数据渲染到页面
  ```
## MVC和MVVM的架构(了解)
- ==MVC(Model-View-Controller)==:早期受欢迎的架构模型,特别是移动端(ios,Android),前端也是,html作为view页面,js作为controller进行网络请求和获取数据等,获取的数据即为模型model,返回给前端的页面html显示
- MVVM模型(Model-View-ViewModel):新兴模型,==vue的设计收到这个新模型的启发==,vue作为ViewModel沟通view和model之间的联系,==**vue最核心的功能Data Building和Dom Listener**,Data Building**负责js数据与页面数据的绑定**,Dom Listener**负责监听页面事件,自动绑定dom和事件监听函数**==
  [![pEDSZlR.jpg](https://s21.ax1x.com/2025/03/25/pEDSZlR.jpg)](https://imgse.com/i/pEDSZlR)
## 选项式写法(CDN)
### data(){}配置
  - ==下面是选项式写法,是vue2的主流写法,vue3更新了组合式写法(后面讲),在vue3中,两种写法都支持==
  - **data(){...}是固定写法**,内部返回一个对象,内部是变量,这些vue变量返回出去,可以在其对应的根节点领域内使用,最简单就使用`{{}}`体现,==记得是变量,不是字符串,别乱加""==
  - 代码:
    ```html
    <body>
      <!-- 双花括号 , vue会把里面的东西当作js来运行 -->
      <!-- 既然是js领域,那么变量也可以放入执行 -->
      <div id="box">
          <!-- 注意: 不要加"" , 那是字符串,不是变量 -->
          <!-- 而myname需要提前定义,下面的createApp中data(){} -->
          myname : {{myname}} 
      </div>

      <script>
        Vue.createApp({
          data(){
            return {
              myname  : "kerwin" // 状态,html会随着这里改变而改变,这就是响应式数据的体现
            }
          }
        }).mount("#box")
      </script>
    </body>
    ```
### 标签属性v-bind:
- ==控制标签属性的vue语法:==  `v-bind:`==**简写:   `v-bind:` 为 `:`**==
- 具体语法 `v-bind:属性名 = "js代码"` ==作用: 开辟一块在html代码中的js代码区域==
- 属性名是任意的都可以,比如`id class src style` 
- 简要介绍代码区块:
  - vue代码区:  `v-bind:class=color` ==color作为变量在data(){}定义好值了==
  - js代码区 : `v-bind:class=" isLogin?'red':'yellow' "` ==运用三目运算选择red或yellow字符串,而isLogin在vue区进行定义true或false==
  - vue代码区 : `v-bind = "imgObj"` ==imgObj在vue区定义好了此标签的一些属性,注意这里不能乱改名字了==
  - ==布尔型注意事项: 布尔值不要加双引号,否则会当作字符串处理==
- 代码:
  ```html
    <style>
        .red{
            background-color: red;
        }
        .yellow{
            background-color: yellow;
        }
    </style>


    <!-- 控制标签属性的vue语法 v-bind: -->
    <!-- 简写: v-bind: 为 : -->
    <div id="root">
        <!-- v-bind:js地盘
        color被当作变量,而变量color在vue中定义为"red" -->
        <div v-bind:class=color>111111</div>
        <!-- isLogin三目运算 , 单引号是因为外面有双引号了, red和yellow在这里代表字符串 -->
        <div v-bind:class="isLogin?'red':'yellow'">22222</div>

        <!-- 简写: v-bind: 为 : -->
        <!-- 支持绑定所有属性 src href id style ...-->
        <img :src="url" alt="" :width="width">
        <!-- 响应式: 在控制台 通过app.url = 新url 可以实时修改图片 -->

        <!-- vue支持动态绑定多个值 -->
        <img v-bind = "imgObj">

        <!-- 注意: 动态绑定下布尔值的问题 -->
        <!-- 动态绑定下, 你带个双引号无所谓,isDisabled在js区域会被当作变量-->
        <!-- 如果在js代码区,布尔值加双引号变成字符串,字符串在布尔值中为true -->
        <button :disabled="isDisabled">click</button>

    </div>
    <script>
      var obj = {
        data(){
          return {
            isLogin : false,
            color : "red",
            url : "https://static.maizuo.com/pc/v5/usr/movie/878f3f2dc9ad07a08d37f2fe5affbc32.jpg?x-oss-process=image/quality,Q_70",
            width : 300,
            isDisabled : false,
            // 绑定多个值
            imgObj:{
                // 内部的属性名不能乱写了,img标签内部有什么属性,就写什么属性
                src : "https://static.maizuo.com/pc/v5/usr/movie/91212ec9eb28b3f163984d77f77a4da9.jpg?x-oss-process=image/quality,Q_70",
                width : 300
            }
          }
        }
      }
        // 把obj作为组件放入createApp并挂载到root(div)上
        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### 绑定事件v-on和methods:{}配置
- vue绑定事件: 之前js绑定事件,获取dom对象,然后进行dom.onclick = Func(){} / Func名字 进行绑定(或者addEventListener()) , ==在vue中绑定语法为`v-on:绑定事件类型 = "Func()"`== , ==**简写: v-on ---> @**==
  > 注意: 
  > 1.==绑定事件名不是onclik,而是click,之前学的所有事件名都是如此,**删除on前缀**==
  > 2.函数加不加双引号都行,**==加不加()也都行,加()是为了传参,如果不需要传参是可以不加的==**
- **==methods:{}配置,和data(){}同级==**
  - **==事件绑定的处理函数放在method里面==**,如下
    ```js
      // vue 配置
      var obj = {
        // 这里写变量
        data(){
          return {
            myname : "kerwin",
            变量 : 值,
            .....
          }
        },
        // 这里面写函数
        methods:{ 
          handlerClick(){
              ....
          },
          函数名(){
              函数内容
          },
          .....
        }           
      }
      
      var app = Vue.createApp(obj).mount("#root")
    ```
- ==methods内的this指向为data(){}==:**即通过this我们可以获取到data(){...}内的数据值,只要`this.变量名`即可获取,这样我们就可以在函数内操控变量了**==**所以methods内部不可以写箭头函数,否则this的指向就丢失了!!!**==
- ==下面代码的操作==:
    - 响应式改变myname的值 {{myname}}
    - 改变变量的值使得标签指向不同的class,从而改变其css属性, :style
    - 改变isShow的布尔值,从而改变三目运算结果,影响其class值,进而改变其css `:class="isShow?'':'hidden'`
- 代码:
  ```html
    <style>
      .hidden{
        display: none;
      }
    </style>

    <!-- vue绑定事件 -->
    <!-- v-on:click = Func (意为监听click事件,click不能改,监听什么事件就写什么,Func作为函数名字随意) -->
    <!-- 简写 @  即 @click = Func -->
    <div id="root">
        {{myname}}
        <!-- Func加不加括号都行,加括号是为了传参 -->
        <button @click=handlerClick()> click vue </button>
        <!-- color是变量 -->
        <div :style="color">颜色板</div>
        <!-- 如果isShow是true 那么就没有class样式,默认显示; 如果为false,就会是hidden (单引号意为这个hidden是字符串而非变量) -->
        <div :class="isShow?'':'hidden'">我是显示或者隐藏</div>
    </div>

    <script>
      var obj = {
        // 这里写数据
        data(){
          return {
            myname : "kerwin",
            color : "background-color: red",
            isShow : true
          }
        },
        // 这里面写函数
        methods:{ 
          handlerClick(){
            console.log("click");
            console.log(this); // this: 指向为实例化对象proxy的值,就是外面app的值
            this.myname = "你好 世界!" // this.myname = app.myname
            this.color = "background-color : yellow"
            this.isShow = false // 或 this.isShow = !this.isShow
          }
        }           
      }
      var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### 初识v-show/if/for
- 3个新指令 ==**v-show , v-if , v-for**==
- ==1.v-show 显不显示== 
  - 语法 : `v-show = "isShow"` isShow就是个自定义的名字
  - ==isShow为true 就显示 , 为false就隐藏==
  - ==isShow就作为vue的data(){}内部的一个变量==
  - 代码: `<div v-show="isShow">我是显示或者隐藏</div>`
  > 注意: 隐藏等同于display: none; 所以标签不占位 
- ==2.v-if 存不存在==
  -  语法: `v-if="isShow"` ,同理如果isShow条件为true就渲染它,如果条件为false,直接删除这个节点
  -  ==相比于隐藏,它是在代码层面上直接没了,在控制台的源代码中,这行代码注释为v-if了==
  - 代码: `<div v-if="isShow">我是创建或删除</div>`
> 注意: 1.v-if和v-show后面是表达式,函数,三目等都可以,最后要的是结果true或false,
> 2.v-if相对于v-show更懒,v-if如果不成立,对于那个标签是直接不创建的,而v-show无论如何都是先创建出来,再根据条件,选择是否对其隐藏(display:none),所以v-if有更高的创建开销,v-show有更高的初始渲染开销
- ==3.v-for==
  - 语法 : `v-for = "(item,index) in Array" `,==**不只是针对数组数据,这里以数组为例子**==
  - ==两个参数,第一个是值,第二个是索引下标(从0开始)==
  - 解释: 每次遍历Array,把每一项的内容和索引下标存入临时变量item和index,再次遍历到下一项时,item和index也会随之更新
    > ==item,index作为临时变量,只能在此标签中访问到它们==
  - 代码:
    ```html
      <ul>
        <li v-for="(item,index) in list">
          {{index + "---" + item}}
        </li>
      </ul>
    ```
### v-model双向绑定
- v-model:  ==意为在input中每次输入东西就会把内容传递给mytext, 而mytext是vue区data(){}区块的一个变量,它可以快速获取input内的value值,**同时methods代码中也使用evt.target这个原生js方法获取相同的值(看看即可)**==
- 语法: `v-model= "mytext"`
- 这是一个双向绑定指令, 意为==双向意味不仅是input输入框内的信息会更改mytext的值,而且反向也能改,如果通过app.mytext赋值等方式给mytext的值更改,那么会同样映射到输入框中==
- 核心代码: `<input type="text" v-model="mytext">`
- ==除此之外可以绑定textarea checkbox radio select等多种表单标签,所以要学习好表单知识==
### 表单输入绑定v-model
- ==记录选项状况:(单选,多选都一样,下面以多选为例)==
  `<input type="checkbox" v-model="isChecked">记住用户名`
    > ==1.isChecked是状态,**与input-checkbox绑定的**==
    > ==**2.复选框的选择影响状态的isChecked布尔值**==,
    > ==3.v-model会记录isChecked布尔值,判断复选框是否被勾选==
    > ==4.此过程节省了js获取dom再判断的繁琐过程==
- **==input系列==**
  - **==复选框系列input-checkbox==**
  - 代码:
    ```
    <div>
        <input type="checkbox" v-model="favList" value="篮球" @change="inputChange">篮球
        <input type="checkbox" v-model="favList" value="足球" @change="inputChange">足球
        <input type="checkbox" v-model="favList" value="排球" @change="inputChange">排球
    </div>

    // 在vue-data里面 : favList是一个空数组如下
    data(){
        favList: []
    }

    ```
    > 1.==每次点击一个复选框,v-model就会把对应此复选框的value值放入数组,取消点击就会删除==
    > 2.==**数组内的value顺序与点击顺序有关**==
    > ==**3.input的触发事件是@change,不是@click**==
  - ==**单选框系列input-radio**==
  - 代码:
    ```
    <div>
        <!-- 数组+value+picked picked即所选的value 记录选择情况 -->
        <input type="radio" v-model="picked" value="篮球">篮球
        <input type="radio" v-model="picked" value="足球">足球
        <input type="radio" v-model="picked" value="排球">排球
        <button>提交</button>

        // 在vue-data里面 : picked是一个空字符串如下
    data(){
        picked : ""
    }
    </div>
    ```
    > 1.==由于单选框只选择一个,所以用不上数组,一个空字符串变量即可==
    > 2.==同理复选框,v-model会把单选的value赋值给picked==
- ==**select系列 select + option**==
  - ==相对于input,select系列更加聪明,即使不写value,selected也会读取option的innerHTML去获取,**当然还是建议写value**==
  - 代码:
    ```
    <select v-model="selected"> 
        <option value="篮球v">篮球</option>
        <option value="足球v">足球</option>
        <option value="排球v">排球</option>
    </select>
    ```
    > 1.select+option是下拉列表选项,只能选一个,所以同radio-input,使用空字符串变量即可
    > 2.其余同理,value会被赋值给selected
### 案例06 增加,删减表单
- 具体代码:
  ```html
    <!-- 增加,删减表单案例 -->
    <div id="root">
      <!-- 提示: input事件是输入框内容发生改变时触发 -->
      <!-- <input type="text" @input="handleInput">  -->

      <!-- 表单控件绑定 -->
      <!-- vue 语法糖 v-model= "mytext" -->
      <!-- 双向绑定指令: 在input中每次输入东西就会把内容传递给mytext -->
      <input type="text" v-model="mytext"> 
      <button @click="handleAdd">add</button> 

      <!-- 最初始的页面渲染,通过for遍历数据数组渲染页面,缺点是每次都要重复把所有数据渲染一次 -->
      <ul>
          <li v-for="item,index in datalist">
            {{item}} <button @click="handleDel(index)">del</button>
          </li>
      </ul>

      <!-- v-show -if -on 等 后面可以放表达式的 -->
      <!-- 后面的那个表达式成立就为true(数组为空就显示),不成立就为false(数组不为空就隐藏),使用表达式表示true与false -->
      <div v-show="datalist.length===0">暂无数据</div>
    </div>

    <script>
      var obj = { 
        data(){
            return {
              mytext: "",
              datalist: ["111","222","333"],
            }
        },
        methods:{
          handleAdd(){
            if(this.mytext === ""){ // 不写东西就不添加
              return 
            }else{
              this.datalist.push(this.mytext)
              this.mytext = "" // add后清空输入框,双向绑定的优势体现出来了
            }  
          },
          handleDel(index){
            // 提示: array.splice(a,b) 删除数组项的工具,返回删除后的数组
            // a是索引(从0开始) b是从a这个索引开始删除几个
            this.datalist.splice(index,1)
            // 删除完成后datalist数据改变,根据响应式数据特点,页面又会重新渲染1次,同时更新绑定的del按钮和其index值,不影响
          } 
        }
      }
        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### 阶段总结
- 代码:
  ```html
    <script src="../线上vue.js代码复制/vue.js"></script>

    <body>
      <div id="root">
        ..... html
      </div>

      <script>
        var obj = {
          data(){
              return {
                  变量
                  ....
              }
          },
          methods:{
              函数
              .....
          }
        }

        var app = Vue.createApp(obj).mount("#root")
      </script>
    </body>
  ```
- 1.最上方引入vue源码文件
- 2.html设置根节点,内部正常写html代码,根节点root(mount挂载)
- 3.创建vue3, app是一个proxy对象
- 4.配置obj和挂载count , obj的数据在挂载区域内使用
- 5.obj配置 分为data区 和 methods区 , data区定义变量 , methods区定义函数 , 主要是事件处理函数
- 6.跟节点内部使用 `v-...` 或 `{{}}` 等vue语法 , 再结合着obj配置一起, 简单实现vue的功能

## Vue基础(CDN)
### v-html/v-text
- v-html: ==可以识别html语法,并加载在页面中==
- 语法: `<div v-html="myhtml"></div>` ,在data(){}中去定义myhtml的值
- ==**具有风险性:**==
  - ==如果用户在代码片段内部写一些**攻击脚本(js)**,引入后很危险==,要确保这个给你数据的网站是安全的,所以官方也就限制了{{}}的使用,同时提供了v-html给你自己选择使用
  - ==自己人写的后端给的数据可以这么用,但面对外来用户的数据就不能使用了==
- 代码:
  ```html
    <div id="root">
      {{myhtml}}
    </div>

    <script>
      var obj = {
        data(){
          return {
              // ``模板字符串发送
              myhtml : `<b>123</b>`
          }
        }
      }

      var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
- v-text: ==用于更新元素的textContent==
  ```html
    <div id="app">
      {{message}}
      <!-- 把data中的message的信息直接赋值给这个标签 -->
      <h1 v-text="message"></h1>
    </div>

    <script>
      const app = Vue.createApp({
        data(){
          return {
            message: "Hello Vue"
          }
        },
      }).mount("#app")
    </script>
  ```
  > 和v-html区别就是,v-text不会执行html代码片段,会直接打印,`{{}}`同理
### v-pre和v-cloak(了解)
- v-pre: ==不再解析代码,vue语法失效,对标签的子组件们也生效==
- 打印双大括号`{{}}`
  ```html
    <div id="app">
      <div v-pre>
        {{message}}
      </div>
    </div>
  ```
- v-cloak: ==针对CDN引入练习vue还有点用,当js文件加载时间过长,会导致html页面显示出现问题,它可以在js解析完成前,先隐藏掉一些vue语法的html片段代码,记得配置css样式==
  ```html
    <style>
      [v-cloak]{
        display: none;
      }
    </style>

    <div id="app">
      <div v-cloak>
        {{message}}
      </div>
    </div>
  ```
### class绑定(v-bind)
- ==对象写法(前面用过)==: `<div :class="classObj">123456</div>`
> 1.在classObj内部配置关于class的信息,之前我们在img上用过,配置了img的src,width,height多个属性
> 2.可以通过`app.classObj.XXX = ""` 实时添加属性和值,同时页面会随之改变,这就是vue3响应式数据底层逻辑的优势,proxy针对的是对象,vue2很麻烦的
- ==数组写法== : `<div :class="classArr">asdsas</div>`
> 1.配置classArr = [{...},{...},{...},....],每一个对象都是对属性的配置,==内部不一定是对象,主要看外面承接的是谁,就比如这里的数组是字符串数组,配置给class用==
> 2.通过app给数组push新内容,就会实时更新页面中相关数据,同理的pop unshift等更改数组内容的都有效,==但是map,filter,slice不改变数组内容,返回新数组的这种方法无效,后面在数组变动检测中会讲==
> 3.==这里的写法都是简洁写法,你可以直接把对象,或者对象数组堆在div 标签里面,但是显得代码冗余,所以使用了中间变量classArr代替了==
- 代码:
  ```html
    <style>
        .aaa{
            background-color: red;
        }

        .bbb{
            color: yellow;
        }

        .ccc{
            font-size: 25px;
        }
    </style>
    
    <div id="root">
        <!-- 对象写法 -->
        <div :class="classObj">123456</div>

        <!-- 数组写法 -->
        <!-- <div :class="['aaa','ccc']">asdsas</div> -->

        <div :class="classArr">asdsas</div>
    </div>

    <script>
        var obj = {
          data(){
            return {
              classObj: { // 代表aaa ccc会挂在class上,而bbb不会
                aaa:true,
                bbb:false,
                ccc:true
              },
              classArr: ["aaa","bbb"],
            }
          }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### style绑定(v-bind)
- 对象写法: `<div :style="styleObj">asdfasdf</div>`
> 注意: 
> 1.配置styleObj属性时,推荐使用**驼峰写法**,==在js中没有 background-color这种变量书写方式,所以你要给background-color再加个引号,麻烦,直接使用驼峰backgroundColor==
> 1.1在styleObj对象内部配置时的具体体现 : 
> 'background-color' : "red" ---> backgroundColor : "red"
> 2.依旧可以动态改变内部值, `app.styleObj.backgroundColor = 'yellow'`

- 代码:
  ```html
    <div id="root">
      <div :style="styleObj">asdfasdf</div>
      <div :style="imgObj"></div>
      <button @click="handleAjax">click</button>
    </div>

    <script>  
      var obj = {
        data(){
          return {
            // 每个对象同时配置多项数据
            styleObj : {
              backgroundColor : "pink",
              fontSize : "20px"
            },
            imgObj : {
              width : "200px",
              height : "200px",
              backgroundSize : "cover",
            }
          }
        },
        methods:{
          handleAjax(){ // 没有ajax,模拟一种点击后,出现图片的效果
            this.imgObj.backgroundImage = "url(https://static.maizuo.com/pc/v5/usr/movie/878f3f2dc9ad07a08d37f2fe5affbc32.jpg?x-oss-process=image/quality,Q_70)"
          },
        }
      }

      var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
- 数组写法1: `<div :style=[styleObj1,styleObj2]>aaaaaa</div>`
  - styleObj1/2在data里是对象, `{} {}`
- 数组写法2: `<div :style=imgArr></div>`
  - imgArr在data里是对象数组,`[{},{},{}]`
> 1.依旧可以使用数组方法push,pop等改变style进而改变页面(==同理不包括map filter这种不改变原数组数据的方法==)
> 2.push新内容后,如果有重复,后面会覆盖前面

### v-if拓展+template
- ==v-if v-else-if v-else:==
- 类似于js `if - elseif(可多个) - else`,我们也在v-if基础上添加相同的if逻辑链条,功能是一样的,不多赘述
  
- 代码:(根据state状态码判断添加哪一个div数据)
  ```html
    <div id="root">
        <!-- 没有通过if判断的另外两个div压根不会创建,再代码中根本没有,节省了机器的性能消耗 -->
        <ul>
            <li v-for="(item) in datalist">
                {{item.title}}
                <div v-if="item.state === 0">
                    <b>未付款</b>
                </div>
                <div v-else-if="item.state === 1">
                    <b>已完成</b>
                </div>
                <div v-else>
                    <b>等待付款</b>
                </div>
            </li>
        </ul>
    </div>

    <script>
        
        var obj = {
            data(){
                return {
                    // 后端传递的数据里,state是状态码,需要我们再具象化一点,比如 0 代表未付款 1代表已完成 2代表等待支付
                    datalist : [
                        {
                            title : "aaa",
                            state : 0
                        },
                        {
                            title : "bbb",
                            state : 1
                        },
                        {
                            title : "ccc",
                            state : 2
                        }
                    ],

                }
            },
            methods:{

            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
- ==template==: 包装元素(==无论如何自己是不会显示在代码层面的==)
  - 当isShow为true时,template会把包裹的内容显示,自己消失
  - 若为false,就都不显示
    > 1.==template的内部包装元素显示与否,**与v-if的结果相关**==
    > 2.==可以与v-if v-for 搭配使用,后面解决**v-for + v-if搭配问题**时很有用==
    > 3.将多个元素包装在一起同生共死,省的一个个单独包装了,并且template自己不影响别人
- 代码:
  ```html
      <template v-if="isShow">
          <div>111</div>
          <div>222</div>
          <div>333</div>
      </template>
  ```
### v-for拓展
- v-for拓展:
  - 1.解构功能: `item -> {title,state}` 
  `v-for="({title,state},index) in datalist"`
  ==把datalist这个对象数组的每一项对象的内部解构出来了==
  - 2.in等于of 
  `v-for="item in Obj"`等于`v-for="item of Obj`,都是获取item值
  ==不过在js中,`in`获取key,`of`获取value(针对对象)==
  - 3.支持==对象遍历==,==直接提取每一项对象的key与value==
   `v-for="(value,key,index) of Obj" // 代表 值,key,索引`
  - 4.自动遍历数字,特殊地从1开始,没啥用
    `v-for="item in 10" // 会打印li+(1~10)`

### v-if与v-for组合+template
- ==**首先v-if v-for 同时作用于同一个标签是不可以的**== 
- **解决**: ==使用template分开v-if和v-for==
- 代码:
  ```html
    <div id="root">
    -------------------------------------------------
        <!-- 使用template分开v-if和v-for,这样v-if可以识别到v-for内的数据了
        还有一个缺点,li会被先创建出来,tem + v-if只能影响li内部内容的创建,这样还是浪费资源-->
        <ul>
            <li v-for="({title,state},index) in datalist">
                <template v-if="state===current">
                    {{title}}----{{index}}
                </template>
            </li>
        </ul>
    -------------------------------------------------
        <!-- tem + v-for 组合 -->
        <!--如下,tem包装元素是不显示在代码层的,所以li通过v-if的审查,能创建就创建,不能创建,tem也不会影响代码层,减少创建损耗 -->
         <ul>
            <template v-for="({title,state},index) of datalist">
                <li v-if="state===current">
                    {{title}}---{{index}}
                </li>
            </template>
         </ul>
    </div>

    <script>
        var obj = {
            data() {
              return {
                // 后端传递的数据里,state是状态码,需要我们再具象化一点,比如 0 代表未付款 1代表已完成 2代表等待支付
                datalist: [
                    {
                        title: "aaa",
                        state: 0
                    },
                    {
                        title: "bbb",
                        state: 1
                    },
                    {
                        title: "ccc",
                        state: 2
                    }
                ],
                current: 0,
              }
          }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### v-for-key/虚拟dom(重点)
- vue如何更新数组数据? 
  - vue采用"==就地更新=="策略,==按照索引更新数据,修改数组后,按照索引进行打补丁==,相同项复用,不同项就修改,新增项就添加,删减项就删除
  - **但是这个基础逻辑对于在数组中插入数据的操作没有人为使用数组插入语法简单**,比较死板,如果在数组插入数据,使用数组插入工具更新一次即可,而按照vue逻辑,就要多次修改后面的内容

- vue如何解决"就地更新"的短板?
  - 为此,==vue使用了key值作为识别每一项的标识,通过唯一的id进行对比,并使用了diff算法,极大优化了过程==,达到了"**顺序不同就排序,插入就根据两侧id直接插入,多了少了就添加删除**"效果,尽最大努力复用数据,从而减少性能损耗
  - **而id作为识别数据的关键,一般来自后端的SQL库的id数据,==达到不重复效果==**
  - ==这种操作往往使用在数据量极大的列表操作==,大量的li删减修改添加,需要vue辅助,提升性能

- vue检查dom改变的底层逻辑: 
  - ==**虚拟dom(VNode,Virtual Node)** : vue中在代码与真实dom对象之间有一层"虚拟dom"区域,vue并不会直接把html代码或组件转化为实质的dom对象,虚拟dom实质是js对象,存储着dom的基本信息==,**由于js原生代码比dom创建要快的多,所以vue首先在虚拟dom层对比两者的变化,然后给被修改者打补丁,最后重新根据打过补丁的虚拟dom重新渲染dom对象**
  - ==虚拟dom优点== : 
    - 1.数据发生变化时,减少dom的创建,节省了计算机渲染dom的时间; 使用原生js对比数据,加快了对比速率,性能更好了
    - 2.==方便跨平台(主要的作用)==,在浏览器,移动端(ios,Android),VR设备,桌面端空间之间显示
[![pEDSVp9.jpg](https://s21.ax1x.com/2025/03/25/pEDSVp9.jpg)](https://imgse.com/i/pEDSVp9)
- 给v-for添加key值的语法: `v-for="({title,state,id},index) in datalist" :key="id"` ==**语法为 :key="xxx"**==
- 代码:
  ```html
    <div id="root">
        <ul>
            <!-- 给每个li添加id , :key="..." -->
            <li v-for="({title,state,id},index) in datalist" :key="id">
                title:{{title}}----index:{{index}}---id:{{id}}
                <div v-if="state === 0">
                    <b>未付款</b>
                </div>
                <div v-else-if="state === 1">
                    <b>已完成</b>
                </div>
                <div v-else>
                    <b>等待付款</b>
                </div>
            </li>
        </ul>
    </div>

    <script>
        var obj = {
            data() {
                return {
                    // id : 来自后端SQL唯一标识信息
                    datalist: [
                        {
                            title: "aaa",
                            state: 0,
                            id : 1
                        },
                        {
                            title: "bbb",
                            state: 1,
                            id : 2
                        },
                        {
                            title: "ccc",
                            state: 2,
                            id : 3
                        }
                    ],
                }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### diff算法
- ==往一组数组中间插入一个数据==
  - ==没有key标识下==,在虚拟dom中,vue会一个个对比每一项的区别,如果一样那么正常渲染,如果不一样,则替换里面的数据,然后以此类推,vue不会发现后面的c d e是可以复用的,这种算法效率很低
  - ==在数组中间插入f==
    [![pEDSAfJ.jpg](https://s21.ax1x.com/2025/03/25/pEDSAfJ.jpg)](https://imgse.com/i/pEDSAfJ)
  - ==有key的情况==,会根据key值,尽可能的复用原有数据,性能更高
    [![pEDSkY4.jpg](https://s21.ax1x.com/2025/03/25/pEDSkY4.jpg)](https://imgse.com/i/pEDSkY4)
### 数组变动侦测
- 根据vue的底层逻辑(proxy),只有原数组发生改变才会实时改变页面相关数据
- ==对于数组改变的操作形如 push pop unshift shift splice(删除) sort reverse(颠倒) 等是可以被检测到的,但是对于 map concat filter slice concat 等,**对原数组不产生影响的,而是返回一个新数组的方法,是无法响应式处理的**==
- **所以vue只能采取下面的方法,重新赋值以达到原数组改变,从而渲染页面** `this.datalist = this.datalist.map(item=>"kerwin + " + item)`
- 代码:
    ```HTML
    <div id="root">
        <ul>
            <li v-for="item in datalist" :key="item">
                {{item}}
            </li>
        </ul>
        <button @click="handleClick">click</button>
    </div>

    <script>
        var obj = {
            data(){
                return {
                    datalist : ["aaa","bbb","ccc"]
                }
            },
            methods:{
                handleClick(){
                    // this.datalist = this.datalist.map(item=>"kerwin + " + item)
                    // 连接2个数组,返回连接好的新数组
                    this.datalist = this.datalist.concat(["123","456"])
                }
            }   
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
    ```
### 模糊搜索案例015
- ==提示:==
  - `str.includes("xxx")` 如果字符串xxx在str字符串内有匹配,则为true,否则为false
  - `array.filter(item=>表达式)` 表达式结果为true,此item保留; 表达式为false,此item删除,item为遍历array数组的每一项数据,==返回值为筛选好的数组(原数组不变)==
  - `v-model="mytext"`: 双向响应mytext数据
- ==方法1(v-for + v-if + template + includes + v-model)==
- 代码:
  ```html
        <div id="root">
        <!-- v-model -->
        <input type="text" v-model="mytext">
        <ul>
            <!-- 纯模板方案 -->
            <!-- item.includes("xxx")  -->
            <template v-for="item in datalist" :key="item">
                <li v-if="item.includes(mytext)">{{item}}</li>
            </template>
        </ul>
    </div>

    <script>
        
        var obj = {
            data(){
                return {
                    mytext : "",
                    datalist : ["aaa","bbb","aca","bca","abc","bbc","cab"]
                }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
- 方法2: (==@input事件绑定 + 数组变动侦测解决方案 浪费点内存==)
- 代码:
  ```html
    <div id="root">
        <!-- @input: 输入触发事件handleIpt -->
        <input type="text" v-model="mytext" @input="handleIpt">
        <ul>
            <li v-for="item in datalist" :key="item">
                {{item}}
            </li>
        </ul>
    </div>

    <script>

        var obj = {
            data() {
                return {
                  mytext: "",
                  datalist: ["aaa", "bbb", "aca", "bca", "abc", "bbc", "cab"],
                  baklist : ["aaa", "bbb", "aca", "bca", "abc", "bbc", "cab"]
                }
            },
            methods: {
                handleIpt(){
                    // 有许多种方法解决,这里学最简单的复制方案.后面会学新的 (浪费点内存)
                    // 复制一份baklist,由于筛选方法不影响原数组,所以baklist永远不会有所变化,有筛选条件就更新,没有条件就原样还给datalist
                    this.datalist = this.baklist.filter(item=>item.includes(this.mytext))
                }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
- 方法3:(==针对方法2的改进,函数表达式方法==)
- ==之前讲过 {{}} 以及 v-XXX系列后面的领域是js地盘,那么我们在v-XXX内部可以插入methods定义的函数来实现默写功能==
- 代码:(==**仔细看注释**==)
  ```html
    <div id="root">
        <input type="text" v-model="mytext">
        <ul>
            <!-- test()是执行函数 -->
            <!-- 实现原理: 提前在test()函数内把数组筛选完成并返回筛选后的数组,然后直接就按照筛好的数组创建li就可以了 -->
            <li v-for="item in test()" :key="item">
                {{item}}
            </li>
        </ul>
    </div>

    <script>

        var obj = {
            data() {
                return {
                    mytext: "",
                    datalist: ["aaa", "bbb", "aca", "bca", "abc", "bbc", "cab"],
                }
            },
            methods: {
                test() {
                    // 同理,每次返回出去的数组都是筛选好的数组,但是filter对原数组是没有影响的,所以datalist是不会变的
                    // 相对于方法2节省了一部分内存
                    return this.datalist.filter(item => item.includes(this.mytext))
                }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### 事件默认参数$event
- **给标签绑定事件处理函数的几种写法**
- ==内联写法==(适用于简单的计算,比如简单的表达式,三目,+-*/等,单行)
  `<button @click="count++">add+1</button> {{count}}`
- ==函数写法==
  - **不带()的写法** (==vue会偷偷自动给你的函数传递一个事件对象evt==)
    ```
    html内部:
    <button @click="handleClick2">click1</button>

    vue - methods内部 :
    handleClick2(evt){
        console.log(evt);
    }
    ```
   - **带()的写法** (==可以传递参数,同时也可以传递事件对象evt,不过严格规定了写法,为 **$event**==)
        ```
            html内部:
            <button @click="handleClick3(1,2,$event)">click2</button>

            vue - methods内部 :
            handleClick3(a,b,evt){
                console.log(a,b)
                console.log(evt)
            }
        ```
      > 注意: ==evt在函数中的主要作用是阻止事件默认行为==,比如"冒泡行为",使用evt.stopPropagation(),或者提交表单等默认行为
### 事件处理修饰符
- 偷懒的修饰符语法可以用较少的代码实现复杂的功能,相对于js获取dom后,在进行的多种繁琐操作,vue只需在事件触发后加点语法后缀即可实现相同功能
- .self : ==只有事件源是自己触发才执行函数,别人冒泡上来的不算(事件源是孩子节点),**间接地阻止了"冒泡"(加在父节点身上)**==
- .stop : ==在事件前添加事件修饰符,阻止默认行为,**能直接阻止冒泡行为(加在子节点身上)**==
  - **冒泡事件解释与代码实例**
    > 冒泡: 子节点的行为会冒泡到父节点上,触发同样的事件处理函数,例如点击子节点,"点击"这个行为会冒泡到父节点上,如果父节点有click事件处理函数,那么就会被执行,下面是例子
    ```html
    <!-- 测试.self 只接受父节点行为,间接阻止"冒泡"-->
    <div @click.self="handleClick1()">
        <!-- 测试.stop 阻止"子节点冒泡"默认行为  -->
        <button @click.stop="handleClick2()">111</button>
        <button @click="handleClick3()">222</button>
    </div>
    ```
- @submit.prevent : ==阻止表单提交行为,**可以借此检查表单提交的数据**==
  ```html
    <form action="" @submit.prevent="handleSubmit()">
        <button type="submit">登录</button>
    </form>

    handleSubmit(){
        // 不阻止默认提交事件,会跳转网页,下面的打印会一闪而过
        // 写了后,就会停在这里,如此就可以在这里进行表单数据提取与测试了
        console.log("submit")
    }
  ```
- .once : ==一次性使用==
  - ==只能不带()的函数使用==: `<button @click.once="handleClick4">抽奖</button>`
  - 如果带()函数使用,就曲线实现功能如下
    ```

        html :
        <button @click="isOnce && handleClick5()">抽奖2</button>

        vue - data :
        isOnce: true

        vue - methods : 
        handleClick5() {
            console.log("抽奖2");
            this.isOnce = false
        }

    ```
- .passive(在js也没见过的一个属性): ==一般用于触摸事件的监听器(就是移动端,手机平板这类),改善移动端设备的滚屏性能,**阻止系统自动监听"滚动时是否有阻止事件"这种无谓操作**==,因为一般我们都不会去写阻止事件,但是系统就会默认去检查有没有,所以很浪费性能,写了这个后,就不会检查了,**但是用了.passive就不要在浏览器里写.prevent了,会报错的**
- ==简而言之,告诉浏览器,你可以不用去查询程序有没有阻止默认事件,反正我也没写==

### 模态框案例018
- 模态框: 点击后出现一个框,此网页其他的部分变为半透明暗色,同时点击这些部分或者在框内点击关闭按钮,会直接退回到原网页
- ==案例主要应用知识点: **应用.self或.stop阻止冒泡,去实现功能**==
- 代码:
  ```html
    <div id="root">
        <button @click="isShow=true">模态框</button>
        <!-- 阻止冒泡行为, 可以在overlay的click.self,也可以在center上写个@click.stop vue命令,不用写具体内容了 -->
        <div id="overlay" v-show="isShow" @click="isShow=false">
            <div id="center" @click.stop>
                用户名 : <input type="text">
                <button @click="isShow=false">登录</button>
            </div>
        </div>
    </div>

    <script>
        var obj = {
            data(){
                return {
                    isShow: false
                }
            },
            methods:{

            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
  ```
### 订单筛选器案例019_2
- 案例解释: 使用下拉列表选项框选择对应条件的数据,==此案例是对商品进行4种分类,选择对应种类后,页面会更新为此条件商品的列表集合==
- 案例使用知识: 
  - ==select+option+v-model的表单输入绑定==
  - ==对select,动态绑定value值,**:value,温故"动态绑定的领域为js领域"这一概念,巧妙完成了字符串->数字的转化**==
  - ==template + v-for + v-if的使用(减少无谓dom创建,提高性能,**这里的减少无谓dom创建指的是不符合条件的商品不会被创建出来**)==
  - ==使用了ES6解构了对象数组==
  
- 代码:
  ```html
    <div id="root">

        <h2>订单筛选</h2>
        value: {{selected}}
        <div>
            <!-- 对全部订单单独if判断下 -->
            <select v-model="selected">
                <!-- state是数字num 所以value这里加:(动态绑定) 意味着后面双引号内部是js领域,"0"不在是字符串0,而是js中的数字0 -->
                <!-- === "值与类型"都匹配,所以这里要让value的值为num,使得渲染时v-if能够正常运行 -->
                <option value="all">全部订单</option>
                <option :value="0">未付款</option>
                <option :value="1">已取消</option>
                <option :value="2">待发货</option>
                <option :value="3">已完成</option>
            </select>
        </div>

        <!-- 判断商品是否要被创建 v-if -->
        <ul>
             <!-- ES6解构赋值  -->
            <template v-for="({title,state},index) of datalist">
                <!-- 只渲染state符合selected条件的商品 -->
                <li v-if="state===selected">
                    {{title}}
                </li>
                <!-- 'all' 就是字符串all,全部商品都渲染  -->
                <li v-if="selected==='all'">
                    {{title}}
                </li>
            </template>
        </ul>
    </div>

    <script>

        var obj = {
            data() {
                return {
                    // selected默认值
                    selected: "all",
                    // 后端发来的数据
                    datalist: [
                        {
                            title: "手机1-未付款",
                            state: 0
                        },
                        {
                            title: "手机2-未付款",
                            state: 0
                        },
                        {
                            title: "电视1-已取消",
                            state: 1
                        },
                        {
                            title: "电视2-已取消",
                            state: 1
                        },
                        {
                            title: "冰箱1-待发货",
                            state: 2
                        },
                        {
                            title: "冰箱2-待发货",
                            state: 2
                        },
                        {
                            title: "洗衣机1-已完成",
                            state: 3
                        },
                        {
                            title: "洗衣机2-已完成",
                            state: 3
                        },
                    ]
                }
            },
            methods: {

            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>

  ```
### 购物车案例020(大复习+1)
- 购物车案例实现的功能有:
  - 复选框点击商品后,自动计算器金额,同时改变数量后,同步金额变化
  - 全选/全不选 与 单个选项框的"联动",==这是个双向功能,要分别写两个函数==
  - 删除商品按钮(06学过),==同时与全选系列联动==
- 案例知识点:
  - ==input-checkbox复选框知识点==
  - ==计算金额sum 使用reduce原生js知识==
  - ==**深入讲解checkList与dataList绑定item具体是什么,答案是地址,这个在解释页面响应式数据时是重点理解,dataList的item是复杂数据类型,所以绑定给checkList的item是地址**==
  - ==del删除功能filter知识==
  - ==数组的splice知识==
- ==**案例重点**==:
  - 1.把html与style调试好
  - 2.我们有datalist和checklist两个数组
    - datalist作为后端传递的数组,内部是商品的全部数据;
    - checklist是一个空数组("input-checkbox复选框 + 数组"),配置复选框内的value数据
  - ==3.解释响应式数据变化==: 删除增加商品项和改变商品数量对金额的影响
    - 1.sum金额的变化依赖checklist函数变化,所以选择商品项会直接影响到checklist数组的长度,影响到sum,从而重新计算金额
    - 2.改变商品数量,在代码中是datalist的事情,但是由于data与check共用"item"钥匙(地址),所以当真正的item对象内部属性number被改变时,check根据"钥匙"发现item内部值变化时,也会受影响,进而影响sum,总而言之,data与check由于共同绑定的item,变为一根绳上的蚂蚱,任何item的变化都会影响到他俩
   - ==4.全选/全不选的双向功能要求的两个函数:==
     - 全选/全不选 ---> 单个选项选不选
     - ==因为check遵循:value=item,所以全选就相当于把data的所有item数据复制了一份给check==,所以如果isAllChecked是true,就是全选,直接把datalist数据全部赋给checklist即可,否则直接赋空值即可(全不选)
     - 单个选项选不选 ---> 全选/全不选 ==主要应付del功能==
     - 我们使用删除功能del后,依然能识别到全选与全不选,就要看check与data的数量了(注意排除全删完的情况,那时候check=data=0,但是不属于全选情况)
     - 即当check(点击选项框)的个数与原本数据个数一致且不为0时,为全选
     - 否则为全不选

    > **此项目几乎把所有前面学过的知识杂烩到一起,整了个案例,虽然一些实现功能略显复杂,但是是对前面所学知识的一次很好的复习**
- 代码:
  ```html
    <div id="root">
        <ul>
            <!-- 选择区 -->
            <li>
                <!-- 绑定change事件handleAllChange 实现 全选框->单个框的逻辑判断 -->
                <div><input type="checkbox" v-model="isAllChecked" @change="handleAllChange"><span>全选/全不选</span></div>
            </li>
            <!-- for 商品区 -->
            <!-- v-if 与 v-for不能在一个标签里, 当datalist还有内容也就是不为0时,执行下面的商品区代码,否则执行v-else的空空如也提示代码 -->
            <template v-if="datalist.length">
                <li v-for="(item,index) in datalist" :key=item.id>
                    <div>
                        <!-- 动态绑定value 即:value -->
                        <!-- 绑定change事件handleItemChange 实现 单个框->全选框的逻辑判断 -->
                        <input type="checkbox" v-model="checkList" :value="item" @change="handleItemChange">
                    </div>
                    <div>
                        <img :src="item.poster" alt="" width="100px">
                    </div>
                    <div>
                        <div>名称:{{item.title}}</div>
                        <div style="color:red">价格:{{item.price}}</div>
                    </div>
                    <div>
                        <!-- 改变item是属于改变了datalist,为何计算金额依赖的checkedList也会改变数据呢 -->
                        <!-- 无论datalist还是checkedList,它们绑定的item都是这些对象值的一把"钥匙",就是地址,所以只要是item变化了,data和check跟随"钥匙"找到item发现变化了,也就响应式变化了 -->
                        <!-- 简而言之 , item中的数据只要变化,data和check跟着响应 -->
                        <!-- 影响datalist,进而影响checkList  -->
    
                        <!-- :disabled="item.number===1" : 当item.number===1表达式成立时,按钮失效,这是一个边界检测,同理也有最大值limit边界检测 -->
                        <button @click="item.number--" :disabled="item.number===1">-</button>
                        {{item.number}}
                        <button @click="item.number++" :disabled="item.number===item.limit">+</button>
                    </div>
                    <div>
                        <button @click="handleDel(index,item.id)">删除</button>
                    </div>
                </li>
            </template>
            <!-- 当商品删除完后再显示 -->
            <li v-else>商品空空如也</li>
            <!-- 金额区 -->
            <li>
                <!-- 计算金额函数,sum()数据依赖checkList,checkedList变化牵一发动全身,影响到sum(),这里的页面布局也就会响应式变化 -->
                <!-- 只有选中进入checkList数组才会被纳入计算 -->
                <div>总金额:{{sum()}}</div>
            </li>
        </ul>
    </div>

    <script>

        var obj = {
            data() {
                return {
                    // 勾选的商品数据数组
                    checkList: [],
                    // 全选按钮设置
                    isAllChecked: false,
                    // 模仿后端传递数据
                    datalist: [
                        {
                            id: 1,
                            title: "商品1",
                            price: 10,
                            number: 1,
                            poster: "https://static.maizuo.com/pc/v5/usr/movie/878f3f2dc9ad07a08d37f2fe5affbc32.jpg?x-oss-process=image/quality,Q_70",
                            limit: 5
                        },
                        {
                            id: 2,
                            title: "商品2",
                            price: 20,
                            number: 1,
                            poster: "https://static.maizuo.com/pc/v5/usr/movie/02e5b8507b28a6417eb2712643f3b246.jpg?x-oss-process=image/quality,Q_70",
                            limit: 5
                        },
                        {
                            id: 3,
                            title: "商品3",
                            price: 30,
                            number: 1,
                            poster: "https://static.maizuo.com/pc/v5/usr/movie/7f52c31fd9aae778bed7a64d1cbd60c2.jpg?x-oss-process=image/quality,Q_70",
                            limit: 5
                        },
                    ]
                }
            },
            methods: {
                // 计算金额功能
                sum() {
                    // 方法1:
                    // var total = 0
                    // for(var i = 0; i < this.checkList.length; i++){
                    //     total += this.checkList[i].price * this.checkList[i].number
                    // }
                    // return total

                    // 方法2: js原生方法 reduce
                    // 两个参数 第一个是函数,第二个是prev初始化值
                    // 语法:  arr.reduce((prev,item)=>prev+item,0) prev代表上次计算结果,item就是遍历的每一项value
                    return this.checkList.reduce((total, item) => total + item.price * item.number, 0)
                },
                // 删除功能
                handleDel(index,id){
                    // 列表更新 --> datalist
                    this.datalist.splice(index,1)
                    // 金额更新 --> checkedList
                    // 更新checkList数组,记住filter是不改变数组内容的,会返回一个新数组,所以要覆盖之前的数组
                    // filer语法 : arr.filter(item=>表达式) 表达式为true,此item留下,否则删除
                    this.checkList = this.checkList.filter(item=>item.id !== id)

                    // 删除时,同步下全选问题,它不会自动执行
                    this.handleItemChange()
                },
                // 全选/全不选 ---> 单个选项选不选
                handleAllChange(){
                    // console.log(this.isAllChecked);
                    // 三目,首先checklist绑定的value是item,也就是datalist的整一个单项数据{....}
                    // 如果isAllChecked是true,就是全选,直接把datalist数据全部赋给checklist即可,否则直接赋空值即可
                    this.checkList = this.isAllChecked?this.datalist:[]
                },
                // 单个选项选不选 ---> 全选/全不选
                handleItemChange(){
                    // console.log(this.checkList.length,this.datalist.length)
                    // 当check(点击选项框)的个数与原本数据个数一致且不为0时,全选框选中
                    if(this.checkList.length === this.datalist.length && this.checkList.length !== 0){
                        this.isAllChecked = true 
                    }else{ // 否则就全选框不被选中,两个情况,一个是有的data没check,另一个是删完了, data清空了
                        this.isAllChecked = false
                    }
                }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>

  ```
### 表单修饰符
- 配合v-model的使用
- ==**.lazy**== ==懒惰的(由@change底层渲染==), **失去焦点且内容改变时才会重新渲染** ==原v-model是由@input底层渲染,一旦有变化就触发,浪费性能==
    `<input type="text" v-model.lazy="mytext">`
- ==**.number** 输入内容的数字部分自动转化为数字类型==
  - 如果有非数字的部分内容,会被截取,如果没有一个是数字,那么就无能无力了,全原样转化为字符串
  - ==不添加的话,即使输入数字也会默认把数字类型转化为字符串类型(type="text")==
    `<input type="text" v-model.number="mynumber">`
    >
  - ==如果type=number这么写,**在vue里会自动转化,如果在原生js上这么写就会无效**,同时这个输入框只能输入数字==
    `<input type="number" v-model="mynumber2">`
- ==**.trim**(js中也有,为 str.trim()) **字符串的首尾空格删除**,,主要防止用户注册用户名时无意识打出的无谓空格,进而把空格也当作有效数据保存,出现下次用户登录时不输入相应空格无法登录的情况==
    `<input type="text" v-model.trim="username">`
### 计算属性(不能传参)
- 计算属性是==为了简化计算代码,从而把复杂操作写入计算属性中,而html只需引用即可,计算属性会把计算结果return出去==

- ==**计算属性有新的区域,computed区域**==,结构如下:
  ```
    var obj = {
            data(){
                return {

                }
            },
            computed:{
                // 书写格式形同函数,但是使用时不可以带括号
                Func(){
                    ........
                    return ...
                }
            },
            methods:{

            }
        }

        var app = Vue.createApp(obj).mount("#root")
  ```
    > 注意: 
    > 1.==因为computed在data之下,**所以computed的计算属性名不允许与data变量重名**,否则会系统会先解析data内的数据,从而重名的这个计算属性就被废弃了==
    > 2.==书写格式形同函数,**因为不用传参,所以在html使用时不可以带括号**==

- ==计算属性computed优点:== 
   相比于函数,结果会缓存,后期如果重复使用此次结果,会直接调取缓存内容,性能优化,在需要重复大量复杂计算时,计算属性相对于函数方法更有优势
  > ==注意: 在vue3中计算属性不可以传递参数==
- ==计算属性的使用规则:==
  - 1.凡是为了计算一个结果return出去而写的函数方法都可以转化为计算属性,==顾名思义,计算属性为了计算数据而生==
  - 2.函数一般是==传参的==事件处理函数
  > 
- 计算属性computed与函数方法methods的区别的代码:
  ```html
    <div id="root">
        <!-- 对比计算属性和函数方法的区别: -->
        <!-- 作为计算属性,不要加括号,自动获取返回值 -->
        <div>计算属性: {{myComName}}</div>
        <div>计算属性: {{myComName}}</div>
        <!-- 调用函数方法要加括号才会执行,不加就相当于简单打印了下函数内容,执行函数获取返回值 -->
        <div>函数方法: {{myMetName()}}</div>
        <div>函数方法: {{myMetName()}}</div>
    </div>

    <script>
        var obj = {
            data(){
                return {
                    myname:'kerwin',
                }
            },
            computed:{ 
                myComName(){
                    console.log("计算属性")
                    // 首字母大写
                    return this.myname.substring(0,1).toUpperCase() + this.myname.substring(1)
                }
            },
            methods:{
                myMetName(){
                    console.log("函数方法")
                    return this.myname.substring(0,1).toUpperCase() + this.myname.substring(1)
                }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>

  ```
### 计算属性的可写可读
- ==首先计算属性一般可读用的多,我们一般用于计算,而非赋值,所以可写用的少,并且可写有固定格式==
- 格式如下代码: (==get()与set()==)
  ```
    var obj = {
            data(){
                return {

                }
            },
            computed:{
                // 仅可读写法
                Func(){
                    ........
                    return ...
                },
                // 可读可写写法,形如对象
                Func : {
                    // 可读功能区
                    get(){
                        .......
                        return ...
                    },
                    // 可写功能区,value接受写入的数据
                    set(value){
                        console.log(value)
                    }
                }

            },
            methods:{

            }
        }

        var app = Vue.createApp(obj).mount("#root")
  ```
    > ==可写的计算属性写法如对象,并且有get()和set()两个函数区,其中get还是可读区,负责把计算的值return出去,而set主要接受写入数据,**并且set内部可以根据获取的数据,对data,get等数值进行更新(使用赋值覆盖即可,记得加this,就如下面的实例代码**==)
- 实例代码(下面的写入是从浏览器终端中赋值写入的):
    ```html
    <div id="root">
        <!-- 作为计算属性,不要加括号,内容为return的值 -->
        <div>计算属性: {{myComName}}</div>
        <div>日期:{{computedDate}}</div>
    </div>

    <script>
        var obj = {
            data(){
                return {
                    myname:'kerwin',
                    year : 24,
                    month : 12,
                    day : 31
                }
            },
            computed:{ 
                // 尝试给计算属性赋值
                // 写成对象形式 可读可写
                computedDate:{
                    // get内部只对计算结果进行二次加工然后return出去,不要写dom操作及异步请求等
                    get(){
                        return `${this.year}-${this.month}-${this.day}`
                    },
                    // 接受写入的值
                    // 这里通过终端直接赋值,默认为"XXX-XXX-XXX"格式
                    set(value){
                        console.log("写入的内容" + value.split("-")); // 按-分割内容
                        // this.year = value.split("-")[0]
                        // this.month = value.split("-")[1]
                        // this.day = value.split("-")[2]

                        // ES6 [a,b,c] = arr (即有 a=arr[0] b=arr[1] c=arr[2] 的效果)
                        [this.year,this.month,this.day] = value.split("-")
                    }
                },
                // 函数()形式,只可读
                myComName(){
                    return this.myname.substring(0,1).toUpperCase() + this.myname.substring(1)
                }
            },
            methods:{
                
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>
    ```
### 计算属性之购物车案例
- ==主旨:利用了新学的计算属性可读可写的属性,改造了购物车案例==
- ==改造==: 
  - 1.sum从methods转入computed,实现从函数->计算属性的转变
  - 2.删除全选与单个选项框的双边函数,实现2个函数->2行代码的简化,这里面的计算属性为isAllChecked
  - 3.并简化了del功能内部的"单个选项->全选的函数调用",直接删除即可
- ==**解释**==:
  - 1.sum就略了,简单应用了计算属性写法
  - ==**2.删除全选与单个选项框的双边函数**==
    ```
    html :
    <div><input type="checkbox" v-model="isAllChecked"><span>全选/全不选</span></div>

    vue-computed :
    isAllChecked: {
        get() {
            // 单个选项 --> 全选/全不选
            return this.checkList.length === this.datalist.length
        },
        // checked可以接受到选项框勾选的情况,布尔表示
        set(checked) {
            // console.log(value);
            // 全选/全不选 --> 单个选项
            checked = this.checkList ? this.datalist : []
        }
    }
    ```

    - 单个选项 --> 全选/全不选
      - return出去的是一个表达式,条件和原案例都一样,只要满足条件,返回出去的表达式就为true,给isAllChecked赋true即全选,不满足就赋值false
    - 全选/全不选 --> 单个选项
      - checked是可写接受的数据值,而这个值正是v-model观察选项框是否被勾选的而接受的布尔判断值,如果全选框被勾选,响应给v-model的数据就是true,而checked接受的也为true,根据三目运算,令this.checkList等于dataList即可满足所有的单个选项框都被选中,同理false略.
  - 3.并简化了del功能:
    - 删除时,观察内部代码,影响到了checklist和datalist表,所以数据发生改变,会其一发动全身地重新计算get与set,然后影响到isAllChecked,进而影响到全选框的勾选,相当于一个自动化了
  - 代码:
    ```html
      <!-- 选择区 -->
      <li>
          <!-- isAllChecked纳入计算属性,并把全选系列功能函数全部删除代替为计算属性 -->
          <!-- 可写: v-model + 计算属性 , 可以把选项框勾选的情况"写入"计算属性isAllChecked内部set()中 -->
          <div>
            <input type="checkbox" v-model="isAllChecked">
            <span>全选/全不选</span>
          </div>
      </li>
    ```
    ```js
      computed: {
          // 计算金额功能 + 计算属性
          sum() {
              return this.checkList.reduce((total, item) => total + item.price * item.number, 0)
          },
          // 全选/全不选
          // 利用计算属性的可读可写特性,优化两个函数为两行代码,并解绑了两个事件,使得代码整洁多了
          isAllChecked: {
              get() {
                  // 单个选项 --> 全选/全不选
                  return this.checkList.length === this.datalist.length
              },
              // checked可以接受到选项框勾选的情况,布尔表示
              set(checked) {
                  // console.log(value);
                  // 全选/全不选 --> 单个选项
                  this.checkList = checked ? this.datalist : []
              }
          }
      },
      methods: {
          // 删除功能
          handleDel(index, id) {
              this.datalist.splice(index, 1)
              this.checkList = this.checkList.filter(item => item.id !== id)
              // 删除功能也不必另写"单个选项 --> 全选/全不选"功能函数了
              // 计算属性在del商品时,数据发生改变,会其一发动全身地重新计算get与set,然后影响到isAllChecked,进而影响到全选框的勾选
          },
      }
    ```
### 监听器watch
- ==**监听的代码在新区域watch:{}**==
- ==**监听字符串**==
  - **监听字符串作用**: ==一旦监听的字符串发生改变,自动触发此监听器的内部函数,相对比绑定函数@input=Func要方便==
  - 代码:
    ```html
    <div id="root">
      <input type="text" v-model="mytext">
      <ul>
        <li v-for="item in datalist" :key="item">
          {{item}}
        </li>
      </ul>
    </div>

    <script>
        var obj = {
            data() {
                return {
                    mytext: "",
                    datalist: ["aaa", "bbb", "aca", "bca", "abc", "bbc", "cab"],
                    baklist : ["aaa", "bbb", "aca", "bca", "abc", "bbc", "cab"]
                }
            },
            watch:{

                // 监听谁写谁的名字,本次为监听字符串类型
                // 监听变量mytext的值,2个参数,代表当前值和上次的值
                // 当mytext发生改变时触发,执行内部代码
                // 相对于计算属性,能够使用dom操作,ajax等
                
                mytext(value,oldvalue){
                    console.log(value,oldvalue)
                    setTimeout(()=>{
                        this.datalist = this.baklist.filter(item=>item.includes(this.mytext))
                    },1500)
                },

                // 对于监听字符串,还有两个写法
                // 第一个: 
                // mytext : function(){

                // },

                // 第二个: anyFunc函数就在methods里面写即可
                // mytext : "anyFunc"
            },
            computed:{

            },
            methods: {
                // anyFunc(){
                //     //.....
                // }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>

    ```
    > 1.本次为监听字符串类型,变量为mytext
    > 2.==监听谁写谁的名字,在watch内写一个**同名函数mytext**==,当mytext发生改变时触发,执行内部代码
    > 3.这个函数==有2个参数,代表当前值value和上次的值oldvalue==
    > 4.==**相对于计算属性,watch能够使用dom操作,ajax,异步程序等**==
    > 5.函数有3个写法,最推荐==mytext(value,oldvalue){...}==

- ==**监听含有多属性的对象**==
- 代码:
  ```html
    <div id="root">

       <select v-model="obj.year">
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
       </select>

       <select v-model="obj.month">
            <option value="12">12</option>
            <option value="1">1</option>
            <option value="2">2</option>
       </select>

    </div>

    

    <script>
        var obj = {
            data(){
                return {
                    obj : {
                        year : "2024",
                        month : "12"
                    }
                }
            },
            watch:{
                // 监听对象的写法
                // 1.按照对象的属性进行监听,一旦改变,触发执行内部函数
                // "obj.year" : function(value){
                        // console.log(value) // 打印监听year改变后的值
                // },
                // "obj.month" : function(){
                        // .....
                // }

                // 2.如果嫌函数一个个写麻烦,可以这样,anyFunc写在methods里
                // "obj.year" : "anyFunc",
                // "obj.month" : "anyFunc"

                // 如果觉得对象的属性太多了,可以这样写
                // 监听写法3
                obj:{
                    // handler deep immediate都是固定写法
                    // 监听触发的回调函数 参数一是新值
                    handler(value){
                        // 每次obj改变,监听触发,会把整个改变后的对象打印出来,为proxy对象
                        console.log(value)
                    },
                    deep:true, //复杂对象进行深度监听,意为对象内部无论嵌套多深,任何一个属性被改变,都会被监听到
                    // 监听只有在数值改变时才执行,那么第一次初始化的值如何被监听呢?
                    immediate:true //立即触发一次监听,即对初始化的值监听一次
                }
            },
            computed:{

            },
            methods:{
                // anyFunc(value,oldvalue){
                //     console.log(value,oldvalue)
                // }
            }
        }

        var app = Vue.createApp(obj).mount("#root")
    </script>

  ```
   > 1.==**监听对象是状态data(){}内的对象**,本此监听对象为obj==
   > 2.==监听对象有许多写法,**推荐最后一个写法,注释很详细(重点看下handler,deep,immediate的作用和handler的参数)**==
   > ==**注意:监听对象写法3不是函数写法了,是类似计算属性的写法,还有就是依旧监听谁写谁的名字**==