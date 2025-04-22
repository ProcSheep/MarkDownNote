## 父子关系与通信
### 父传子
- 父传子: ==从父组件向子组件传递信息,可以是状态或是自己写的值,**别忘了父组件引入子组件**==
- ==**父组件几种传递的写法**==:
  - 写法1: (==直接写值==)
    `<Navbar title="首页" left="返回" right="返回"></Navbar>`
  - 写法2: (==封装入对象==) 
    `<Navbar v-bind="propObj"></Navbar>`
    ```js
        // 对象propObj配置就在data(){}内部即可,如下
        data() {
        return {
            propObj: {
                title: "首页", // 在对象中,带-的属性要加引号
                left: "返回",
                right: "返回"
            }
        }
    },
    ```
    > ==在注释中,带-的属性要添加引号,而在子组件中使用这个属性要用驼峰写法==
  - 写法3: (==动态绑定状态==)
     `<Navbar :title="mytitle"></Navbar>`
    ```js
      data(){
        return {
            mytitle: "首页状态" 
        }
      },
    ```
    > ==**看到动态绑定,我们一定要意识到,后面已经是js领域了**,所以那个mytitle不是字符串了,而是一个变量(也就是下面的状态),**我们还常用:把一些字符串转化为我们想要的数据类型,比如字符串下的数字和布尔值转化为真正的数字类型和布尔类型**==
- ==**子组件接受与应用**==
  - ==使用新的属性props接受父传递的属性,在data(){}内部==
    ```js
    data(){
        // 接受父组件属性,下面是父组件的属性名字,会自动接受其值,应用到子组件内部
        props: ["title", "left", "right"]
    }
    ```
    > **注意**:==子组件props内部的名字与父组件传入的属性名要一致==
    > **基本的用法**:
    > 1.在script内部应用的话,要记得加this,比如this.title,这样就可以用父组件传递的title值了
    > 2.也可以在template里直接用,用{{}}方法,不用加this
- ==**单向绑定特性**==: 父组件修改属性的值可以影响子组件,但是子组件不能修改属性反过来影响父组件,因为这样子会很混乱
> 
- ==另类的改变父组件的值==: ==**虽然我们子组件无法改变父组件的值,但是父组件的值传递到子组件里面后,我们可以加工后再使用**,实现了另类的改变,当然这个操作对父组件没有任何影响==
- 改变的方法由两个,**计算属性和函数方法**
  - ==统一修改父组件的title值(**记得在script内部使用要加this**)==
  - 计算属性修改(==自动的==):
    ```
        template : 
            计算属性修改(自动的):{{computedTitle}}
        script-computed :
            computed:{
                computedTitle(){
                    return this.title + "计算属性修改完了"
                }
            }
    ```
  - 函数方法修改(==需要触发==): 
    ```
        template:
            <!-- 1.状态修改就是,创建一个子组件状态,然后通过赋值,获取父组件的属性值,之后就可以任意修改了 -->
            <button @click="handleClick2">状态修改</button>
            状态修改(手动点击按钮执行): {{ mytitle }} 

        script-data:
            data(){
                return {
                    mytitle : ""
                }
            }

        script-methods:
            methods:{
                handleClick2() {
                    this.mytitle = this.title + "状态修改完了"
                }
            }
    ```
    > ==**总结**==: 
    > 1.计算属性是自动的,而函数方法需要看你绑定的触发条件,非自动的
    > 2.计算属性只能进行简单的计算返回出去,而函数方法可以在内部进行更加复杂的加工,最后赋值给子组件新创建的状态即可

### 属性验证与默认属性
- ==子组件接受父组件时可以对接受的参数规范其类型,还可以在不输入的情况下给默认值==,如下
  ```js
      props:{
          title : String, // 1.直接写
          left : [String,Number], // 2.允许两种(多写几个也行)类型数据
          right : {
              // 3.不传值也会报错,必填
              required: true,
              // 4.属性验证:
              // 固定的校验器,别改名字,校验失败会报警告
              validator(value){
                  // 如果right属性值不是下面三个其一就返回false
                  return ["success","warning","danger"].includes(value) // 检查数组内是否有和value相等的,有为true,没有则为false
              }
          },
          leftShow : {
              required : true,
              type:Boolean 
          },
          rightShow : {
              type:Boolean,
              default: true // 5.默认属性: 即使你不传值,也有个默认值true
              // default不要和required写一起,默认值就是偷懒不传值用默认值的,和必填属性功能冲突了!
          },
      }

  ```
    > 1.props由数组写法变对象写法,内部格式为'属性:{....}'
    > 2.==看注释共有5个要点,不按要求传数据会在终端报警告==
    > 注意: default不要和required写一起,默认值就是偷懒不传值用默认值的,和必填属性功能冲突了!

### 属性透传
- 父组件使用子组件时,直接在自定义标签上加形如class,style,id等,会透传到Navbar组件的根节点上(div),==注意是根节点,就是最外层的那个标签==
- ==如果div有自己的class等,会合并==
- ==vue可以区分这种标准的属性和我们自定义的属性==,所以class会当作正常标签透传,而kerwinClass就会被当做新组件
- ==**事件**同理也能透传给子组件的根节点==

>特殊情况: 比较少,就比如Navbar又有个子组件叫NavbarChild,==但是在Navbar.vue文件中压根没有根节点==(vue3支持,vue2不支持),只有个NavbarChild组件,==那么这个属性会透传给孙子NavbarChild的根组件上== 

- ==组件可以禁止透传(禁止向根节点),也可以通过属性指定透传目标==,如下(==子组件==)
  ```
    tempalte:
    <div class="aaa">
        <!-- 下面属性意思是: 向这个标签透传(不影响原生的向根节点透传,如果没有禁止透传,根节点和这个节点都有相同样式) -->
        <button v-bind="$attrs">test</button>
    </div>



    script:
        export default {
            // 禁止透传,来自父组件的透传被阻止了
            inheritAttrs: false,
        }
  ```
### 子传父
- 子传父也需要子和父配合,一个明显区别是: ==父传子是自动的,子传父是被动的,需要触发==
- ==**父组件方面**==: (==在子组件自定义一个事件==)
  - 写法1: ` <Child @event="handleEvent"></Child>`
  - 写法2: `<Child @event2="handleEvent2($event)"></Child>`
    > 写法1和2的区别就是(),==不带括号的写法可以正常接受子组件传递的参数,而带(),则需要写$event才可以接受==
  - 事件处理函数: (==接受参数的地方==)
    ```js
    methods: {
        // 接受子的传递参数(状态),与子组件一一对应
        handleEvent(data) {
            console.log("app-event", data)
        },
        handleEvent2(data) {
            console.log("app-event2", data)
        }
    }
    ```
    > 接受子的传递参数(状态),==与子组件一一对应==,类似于函数的形参接受
  - ==子组件的自定义事件可以是多个==,比如@event1=... @event2=...
      `<Child @event1="handleEvent1" @event2="handleEvent"></Child>`
  - ==这些自定义事件可以加事件修饰符==,例如 .once .self
      `<Child @event.once="handleEvent"></Child>`
- 子组件方面(==触发传递和传参==)
  - **我们知道子传父不是自动的,如何触发子传递父的决定权在子组件那边**
  - ==比如想要通过点击按钮触发传递==
  - 写法1:(==函数法==)
   ```js
    template:
        <button @click="handleClick">click</button>

    script:
        methods: {
            handleClick() {
                // console.log(this.childtitle)
                // 通过下面的方法,子就可以触发父的自定义事件了
                // 自定义事件名字,后面写想要传递的状态,如果状态太多,包装进对象传递也行
                this.$emit("event2", this.childtitle)
            }
        }
   ```
  - 写法2:(==直接传递==)
   ```
      <button @click="$emit('event', childtitle)">click</button>
   ``` 
   > 重点总结: 
   > 1.==**传递的关键是$emit()**,第一个参数是想要给那个自定义事件传递,后面的就写要传递的参数,太多了包装进对象即可==
   > 2.写法1函数法相对于直接传递可以对数据进行更多的加工
- ==**子传父的总结**==
  - 父的自定义事件如同接受的钥匙,对应的自定义事件处理函数则为接受子组件参数和加工处理的地方
  - 子组件$emit()第一参数写好要用哪个钥匙,每个钥匙对应着一个父组件自定义事件,后面的参数用来传递子组件的参数
  - ==流程就是: 子组件事件触发-->$emit()指定方向和传参-->相关的父组件接受子组件的信息==

### 父组件$refs
- **ref - \$refs**: ==通过ref对子组件名字,然后在父组件的js区直接使用"this.\$refs + 名字"调用对应的子组件==
> 注意: 这个方法作为辅助与父传子打配合,但是不能作为主流,因为它的耦合度太高了,后期不好维护
- ==下面是一个简单注册与重置案例:==
- 父组件的ref命名:
  ```
    <!-- 给组件+ref --> 
    <!-- 父传子label和type的信息 -->
    <Field label="用户名" type="text" ref="username"></Field>
    <Field label="密码" type="password" ref="password"></Field>
    <Field label="年龄" type="number" ref="age"></Field>

    <!-- 使用ref获取子组件的数据和修改子组件的值,更简单方便 -->
    <div>
        <button @click="handleRegister">注册</button>
        <button @click="handleReset">重置</button>
    </div>
  ```
  > ==给每个组件设置了ref,并分配了名字,用于区分,在函数功能方法区,我们会使用到这些名字==
- 子组件Field代码:
  ```
    <template>
        <div>
            <label>{{label}}</label>:
            <!-- 动态绑定type类型,后面的type是父传子的信息 -->
            <input :type="type" v-model="myvalue">
        </div>
    </template>

    <script>
        export default{
            data(){
                return{
                    myvalue: ""
                }
            },
            // 接受父的label和type信息并限制类型
            props:{
                label:{
                    type:String,
                    default:""
                },
                type:{
                    type:String,
                    default:"text"
                }
            }
        }
    </script>
  ```
  > ==主要代码是接受父传子的信息,并配给input框,**外加双向绑定v-model(后期注册与重置功能的关键**)==
- 父组件使用$refs控制子组件
  ```   
  js区:
    methods:{
        handleRegister(){
            // 拿到子组件的状态myvalue,同理password和age
            // 然后提交给后端
            // myvalue是子组件的状态,与input进行v-model双向绑定
            console.log(this.$refs.username.myvalue)
            console.log(this.$refs.password.myvalue)
            console.log(this.$refs.age.myvalue)
        },
        handleReset(){
            // 赋空值,重置
            this.$refs.username.myvalue = ""
            this.$refs.password.myvalue = ""
            this.$refs.age.myvalue = ""
        }
    }

  ```
  > ==**通过`this.$refs` + 名字(ref命名的那个)获取子组件的myvalue值**,实时获取输入框的值,在用户点击注册时,即直接发给后端;点重置则给赋空值.**父组件可以直接对子组件的myvalue状态进行控制**==
  > ==**`this.$refs`获取的是子组件的proxy对象**==

### 子组件\$parent \$root
- 重点区分: \$parent 与 \$root  
   ==一个是父组件,一个是根组件==
   - 父组件很好理解,就是当前这个组件的父组件,可以嵌套为爷爷辈等
   - 而根组件,有3个组件A B C,关系是A为B父,B为C父,A只引入了B并使用了B,B引入了C并使用了C,那么相当于A组件使用的B组件内含C组件,C组件在A组件内部,那么他的根组件就是A组件,不论中间有多少层,它的根组件一定是外层的那个组件,解释了为何是A而非B 
  > ==和$ref一样耦合度高,搭配使用,不建议主流==
  - 代码:(A B C 组件)
  - A (==引入B,使用B组件==)
  ```
    A:
    <template>
        <div>
            app 
            <Aparent></Aparent>
        </div>
    </template>

    <script>
        import Aparent from './Aparent.vue';

        export default {
            data(){
                return {
                    title : "app-111",
                }
            },
            components: {
                Aparent
            },
        };
    </script>
  ```
  - B(==引入C,使用C==)
   ```
    <template>
        <div>
            Aparent
            <BChild></BChild>
        </div>
    </template>

    <script>
        import BChild from './BChild.vue';

        export default {
            data(){
                return{
                    title : "parent-111",
                }
            },
            components: {
                BChild
            },
        };
    </script>
   ```
   - C(使用$parent $root)
    ```
    <template>
        <div>
            BChild <button @click="handleClick">click</button>
        </div>
    </template>

    <script>
    export default{
        methods:{
            handleClick(){
                // 拿到父的proxy
                console.log(this.$parent)
                console.log(this.$parent.title)
                // 拿到根组件的proxy,不是爷组件,可以两个$parent叠加,但是那样会很乱
                // App是根组件,Aparent是父组件,最里面的是BChild子组件
                console.log(this.$root)
                console.log(this.$root.title)
            }
        }
    }
    </script>
    ```
    > ==用法和$refs几乎一样,this.(\$parent/\$root) + 要获取的数据,**前半段已经获取到了父组件或根组件了(proxy对象),后面直接'点'想要的状态即可**==

### 跨域通信provide inject
- ==跨域通信主要解决传统的"父子互传"的局限性,也就是当组件嵌套太多时,通过传统的"中间人模式"解决,会造成代码冗余,可维护性低==
  - ==中间人模式==: 中间人模式: 一个父有两个孩子,两个孩子并列,且内部没有嵌套的组件了,可以通过(孩子->父->另一孩子)的方式,让父作为两个孩子联络的中间人(我们的案例做过,子父互传案例中有) 
  - ==中间人模式的局限性==: 当孩子内部由嵌套了许多层组件,就会很麻烦,由此引申出跨域通信
  - ==跨域通信==: 可以跨多层组件的传递,例如爷爷辈向孙子辈直接传递数据,跨过了父辈,不用一级级的中间人模式
  > 注意:**==跨域通信是通过公开信息让其"后代"收到信息(牢记是此组件的"后代"),也就是"辈分"大的组件向"辈分"小的组件公开,不存在反向共享,兄弟间共享,以及没有"血缘"组件的共享(意思是两个组件八竿子打不着,互相中间根本没有任何引入连接关系)==**
- 代码(==**APP是父 Navbar是子**==) 
  - App代码(provide 公开状态)
    ``` js
        methods:{
            provide(){
                return {
                    // 名字 : 属性值
                    navTitle:this.navTitle,
                }
            }
        }
    ```
    > ==**新的公开属性, provide栏**,内部返回的结构为 "名字 : 属性值",上面的操作是App组件公开了自己的navTitle状态,并命名navTitle,**其后代都可以获取这个公开数据**==
    - Navbar代码:
    ```js
        <script>
            export default{
                // 注入,承接App的provide
                inject:["navTitle"]
            }
        </script>
    ```
    > ==获取公开信息很简单了,设置新的属性inject,使用数组获取公开的信息,就可以在子组件使用了==
- ==**单项数据流**==: ==后代可以用,也可以在后代里面更改值,但是这里的总公开处的值不会变==,还是老问题,如果任意一个后代都能修改这里的值,那就乱套了,别的后代使用这个值时被更改了会出乱子的
  - ==当然有一个不安全的曲线方式可以解决单项数据流==
  - **即在App把自己公开出去具体为:**
      ```
          provide(){
                return {
                    app: this
                }
          }
      ```
  - 子组件接受后,可以对整个app所有状态修改了 `inject : ["app"]`
  > ==这个方式依旧有风险,等学习到**组合式**就有更好的解决方案了==
### 组件通信简单案例

### 全局事件总线库
- ==常规业务中一般使用第三方库完成业务,**原始的provide无法提供兄弟间的关系**==
- vue2提供`$on,$off,$once`实现事件总线,vue3则需要使用==第三方库mitt或tiny-emmiter==
- mitt的主要功能就是提供==监听事件和发送参数功能==
  1.`npm install mitt`
  2.封装工具
    ```js
      // event-bus.js
      import mitt from 'mitt';
      const emitter = mitt();
      export default emitter;
    ```
  - 3.引入使用 + 监听
    ```html
      <template>
        <button @click="sendMessage">发送消息</button>
      </template>

      <script setup>
      import emitter from './event-bus.js';
      const sendMessage = () => {
        // 触发监听message-sent,传递参数
        emitter.emit('message-sent', '这是一条消息');
      };
      </script>
    ```
    ```html
      <template>
        <div>接收消息</div>
      </template>

      <script setup>
      import { onMounted, onUnmounted } from 'vue';
      import emitter from './event-bus.js';
      // 监听的回调函数,接受参数
      const handleMessage = (message) => {
        console.log('接收到的消息:', message);
      };
      onMounted(() => {
        // 监听
        emitter.on('message-sent', handleMessage);
      });
      onUnmounted(() => {
        // 取消监听
        emitter.off('message-sent', handleMessage);
      });
      </script>
    ```
## 组件进阶
### 动态组件+keep-alive
- ==**提示:组件的基本用法忘了去看Vue CLi项目构建章节的自定义标签和局部组件的相关知识**==
- ==动态组件,内置的,固定写法,锦上添花的功能,**vue3独有**==
- **语法**: `<component :is="which"></component>`
- **意思**:  ==is后面写的谁,就是哪个组件,例如引入了组件Navbar,如果which是Navbar,那么这个动态组件自动转化为Navbar组件,**我们可以动态绑定这个is属性,这样which就更加灵活了**==
- **动态组件的应用**: ==在后台管理系统中,应用到这个功能的vant组件库的图标组件,使用这个功能,动态显示一组图标(附带数组key-value)==
- **功能描述**:==**在"订阅-发布"案例下新增功能**,App引入了Home List Center三个组件,新增功能就是点击TabatItem后,显示对应的页面,而这3个组件就是对应的页面结构==
- 如图:[![pAwGkd0.png](https://s21.ax1x.com/2024/10/25/pAwGkd0.png)](https://imgse.com/i/pAwGkd0)
- 代码:
  ```
    App:
    template: 
    <component :is="which"></component>

    methods:
    mounted() {
        var obj = {
            "首页": "Home",
            "列表": "List",
            "我的": "Center"
        }
        store.subscribe((value) => {
            // console.log(value)
            // 使用箭头函数,是顾及this的指向问题
            // 将汉字->对应的组件名,方便动态组件绑定
            this.which = obj[value]
        })
    }
  ```
  > 在mounted(生命周期函数)中,一旦App.vue启动,就自动执行,内部是对信息的处理,我们获取到点击栏目的值后,把对应的汉字转化为了对应的组件英文名字
- ==**动态组件的原理和v-if一样,是创建-销毁机制,这个机制有个瑕疵,有些数据无法缓存**,当下次切换回来时,比如输入框等输入的文本数据会消失,为此vue提供了数据缓存方法==
    - 缓存相关代码如下:
        ```html
            1.我们希望有数据缓存,存储用户输入的数据或网络请求的数据和页面,如下
            即对所有的数据缓存
            <keep-alive> // 有时keep-alive也写作KeepAlive
                <component :is="which"></component>
            </keep-alive>
            
            2.有时我们想要有的缓存,有的不缓存,如下
            include后面写的名字,需要在组件中使用name返回出去,
            3个组件只缓存其中2个
            <KeepAlive include="home,list">
                <component :is="which"></component>
            </KeepAlive>

            3.也支持动态表达+正则表达式写法 :include= "/home|list/"
            4.数组写法也支持, :include= "['home','list']"
            5.排除法也行 exclude 意为不包含
        ```
    - 缓存组件内部配合(Home为例子)
        ```
            <script>
                // include使用的名字
                export default{
                    name : "home"
                }
            </script>

        ```
    > ==**重点总结**==
    > 1.缓存写法楼两个,XX-XX写法和双驼峰写法
    > 2.有时我们需要对部分数据缓存,+include即可,==但是记得需要子组件打配合==
    > 3.include可以写死具体那些组件的数据需要缓存,也可以动态绑定+正则/数组
    > 4.还有排除法,即哪个组件不缓存,其余一样,exclude

### 组件中的v-modelX
- ==要想真正从**内核学会使用v-model**解决问题,需要细致拆开v-model在这个语法糖的内核代码==
- ==v-model的庐山真面目==:
  - 语法糖: `<input type="text" v-model="myvalue"> {{myvalue}}`
  - 真面目: `<input type="text" :value="myvalue" @input="handleIpt">  {{myvalue}}`
    > 1.value属性本身就是input的原生属性,代表输入框内的值,如果不动态绑定,那么就是个字符串,所以动态绑定,里面是状态myvalue
    > 2.v-model的双向绑定属性,"状态->输入框"已经由动态绑定value实现此功能了,再通过函数handleIpt完成双向绑定中的"输入框->状态"
  - 配置handleIpt函数和状态myvalue如下:
    ```js
        data() {
            return {
                myvalue: ""
            }
        },
        ----------------------------------------------
        // 不带()函数的写法会得到一个事件对象evt
        methods:{
            handleIpt(evt) {
                this.myvalue = evt.target.value
            }
        }
    ```
  - ==对于函数方法的写法,还有个简写==
    - 代码: `<input type="text" :value="myvalue" @input="myvalue = $event.target.value"> `
    - 区别: ==不写函数了,后面写个表达式==(记得num++那个购物车案例数量加减也是这么写的),==这里的evt获取必须写固定的$event==,这个事件处理函数可以通过target获取input的don对象,进而获取其value值 
- ==**利用v-model的底层代码(纯子父互传)去完成当时Field功能(来自父组件$refs) 重述功能: 输入框 + 注册 + 重置**==

  - 父组件App.vue的代码:
    ```
      template:
      1.父传子,传递的名字value,传递的值是状态myvalue的值,动态绑定为了传的myvalue不作为字符串传递进去
      2.子传父,自定义事件@myEvent接受输入框实时的值
      <Field label="用户名" :value="myvalue" @myEvent="handldEvent"></Field>

      js: 子传父(value是子传递过来的数据)
      handldEvent(value) {
          console.log("孩子给我的结果", value)
          this.myvalue = value
      }
    ```
  - 子组件Field.vue的代码:
    ```
      template:
          1.这个value动态绑定,前面的是input原生属性 后面的就是父组件传过来的状态 
          2.函数的作用: 监听输入情况,然后使用函数+evt获取值,最后子传父
          <input :type="type" :value="value" @input="handleInput"> 

      js: 
          props:{
              // 直接接受来自父的值
              value: {
                  type: String,
                  default: ""
              }
          },
          methods: {
          handleInput(evt) {
              // 打印测试,看看是否获取到了子组件input的值
              //console.log(evt.target.value)
              // 传打电话传给父,自定义事件名为myEvent
              this.$emit("myEvent",evt.target.value)
          }
      }
    ```
- ==**直接利用v-model语法糖,这时命名的规则就要听从vue3内部的内置代码了**==
  - ==vue3自己提供的内部代码,**对应动态绑定的value和自定义事件myEvent是有自己的写法的**==
  - 模板为:`:modelValue="searchText" @update:modelValue="newValue => searchText = newValue"`
    > ==即动态绑定名字变为**modelValue**,自定义事件名字变为 **@update:modelValue**==
  - ==这时只需要更改子组件对应的名字即可复现其功能==,**任何组件都可以挂v-model,不过要顺应v-model语法糖内部语法的命名规则**
   >
- ==**使用v-model语法糖来重构代码**==
  - ==默认状态下的代码(App)==: `<Field label="用户名" v-model="myvalue"></Field> // 直接语法糖`
  - ==Field组件==(==**注释详细写明改名处**==):
    ```js
        tempalte:
        // 动态绑定的状态 value -> modelValue
        <input :type="type" :value="modelValue" @input="handleInput">

        js:
        props:{ // 接受父组件的信息
            // 名字value->modelValue
            modelValue: {
                  type: String,
                  default: ""
              }
        },
        methods:{
            handleInput(evt) {
                // 更改为vue3内部的自定义事件
                // 自定义事件名字(钥匙) 
                // 钥匙名字 myEvent->update:modelValue
                this.$emit("update:modelValue", evt.target.value)
            }
        }
        
    ```
- ==**vue3支持自定义改名字,即不用vue3默认的名字**==
  - ==改名字==: 如果在绑定时写v-model:kerwin 源代码会被修改为 `:kerwin="myvalue" @update:kerwin=""`,==即你的父传子属性和自定义事件都改名字了,这样子是方便一个标签写多个v-model去实现多个功能==
      - ==App代码==: `<Field label="用户名" v-model:kerwin="myvalue"></Field>`
      - ==Field代码:==
          ```
          tempalte:
          // 动态绑定的状态 modelValue -> kerwin
          <input :type="type" :value="kerwin" @input="handleInput">

          js:
          props:{
              // 接受父组件的属性:
              // 名字modelValue -> kerwin
              kerwin: {
                    type: String,
                    default: ""
                }
          },
          methods:{
              handleInput(evt) {
                  // 改名写法(钥匙名变了) update:modelValue -> update:kerwin
                  // this.$emit("update:kerwin",evt.target.value)
              }
          }  
          ```
### 异步组件
- ==异步引入组件==: 在组件过多时,按需加载组件,不需要刚开始就把所有组件加载,这样会很卡,所以则有了异步组件
- ==**引入异步方法**:(vue原生的方法,在js区引入)==:`import { defineAsyncComponent } from 'vue';`
- 本次使用异步组件基于动态组件案例,再看看图:[![pAwGkd0.png](https://s21.ax1x.com/2024/10/25/pAwGkd0.png)](https://imgse.com/i/pAwGkd0)
- ==我们使用异步组件的方式,**使得Home List Center三个组件成为异步组件**,当我们点击对应底部栏时,才会加载组件内容,而非一开始加载,**具体可以在终端-网络-js请求区,去看看是不是点击后才对对应的组件进行网络请求**==
- 代码(==直接看如何使用==)
  ```js
    components: {
      Home: defineAsyncComponent(()=>import('./views/Home.vue')),
      List: defineAsyncComponent(()=>import('./views/List.vue')),
      Center: defineAsyncComponent(()=>import('./views/Center.vue'))
    }
  ```
    > 代码提示:
    > 1.异步组件方法在==components里面挂载==
    > 2.语法为: ==组件名: define...(箭头函数()=>import('相对地址'))==
- **异步组件还可以配置加载中和加载失败的页面**,==配置的不再是箭头函数,是一个对象,内部的属性都是固定写法==
- 代码(==以center组件配置为例子,**注释很详细了**==):
  ```js
    componets:
     Center: defineAsyncComponent({
        // 1.引入地址
        loader: ()=> import('./views/Center.vue'),
        // 2.记得加载和加载失败的组件照常引入
        // 2.1加载组件使用的组件
        loadingComponent: loadingComponent,
        delay: 200, // 200ms没有加载出来就显示加载组件的内容
        // 2.2加载失败后展示的组件
        errorComponent: errorComponent,
        timeout:3000 // 同理3s加载不出来就显示加载失败
        // 注意: 如果是网络慢,显示加载失败了,但是最终网络还是加载出来了,那么还是还会正常显示的
        // 如果网络断了,直接就会显示加载失败页面
        // 所有的网络速度调试都在终端-网络-网速,有正常网,3G网,断网等选项
    }),
  ```
## 插槽
### 插槽的基本应用
- 插槽的作用: ==为了更好实现组件的复用性,看完插槽用法再详细介绍插槽的必要性和优势==
- ==**具体插槽是什么?**== 
  - 比如我们引入了个组件Child,一般我们只是使用这个标签放置在template区域,但是内部是不写东西的,如果里面写东西了,我们可以认定写的东西是"磁带卡",如果没有"卡槽",也无法显示,那么插槽需要子组件打配合,**子组件提供"卡槽",父组件提供"磁带卡",两个结合起来就是插槽的功能了**
- ==具体代码: (App父)==
  - `<Child> <div>我在app组件的html代码</div> </Child>`
- ==Child(子):==
    ```
        <template>
            <div>
                <!-- 插槽 -->
                <slot></slot>
                child
                <slot></slot>
            </div>
        </template>
    ```
    > ==**这个slot标签就是"卡槽"**,我们在父App写的"磁带卡"代码就会在对应的位置显示(**插槽成功**)==
- ==**插槽的具体作用就在这里**==:
  ==例如: 我们做轮播图组件时,用户想要轮播自己的图片和文字,并且想要不同的布局格式,比如文字在图片左边等,如果通过传统的父传子,给子组件Child传递信息,需要传递太多的img和文字模板了,还要传递样式要求,然后在子组件中判断样式之后再显示对应的dom布局格式,仔细想就知道要传递多少的信息,十分复杂冗余==
  **而插槽完美解决这一痛点,我们只需要把轮播的样式做出来,在对应的位置放好插槽,用户想要什么布局格式按照对应位置插入即可,并且图片文字啥的跟随着插入,也就不需要传递信息了,组件只需要完成轮播的样式显示,即轮播的效果就可以了,至于内容和布局,用户自己使用插槽放入即可**
  ==**相当于用户自己在组件里面写代码,添加信息,而组件只是把这些用户写的代码放入对应的子组件卡槽位置,实现高级的复用,这样组件的内容就不再是组件开发者开始时写死的了,用户可以通过卡槽向组件输入自己需要的信息**==

### 具名插槽
- ==具名插槽==: 想要实现多个插槽,需要给每个"卡槽"命名,这样使用者就可以根据"卡槽"名,把自己的代码("磁带卡")分门别类地插入自己想要的对应位置("卡槽")
- 代码(==子,卡槽命名==)
  ```html
    <!-- 插槽 -->
    <slot name="one"></slot>
        child
    <slot name="two"></slot>
  ```
- 代码(==父,按名字找卡槽位置,**有简写方法**==):
  ```html
    // template自己不会显示
    <template v-slot:one>
            <div>app111111</div>
    </template>
    <!-- 简写 -->
    <template #two>
            <div>app222222</div>
    </template>
  ```
  > 1.父中使用template,是因为它自己不会显示
  > 2.如果子的插槽没有命名(万能卡槽),那么父中没有slot指向的代码都会进去
  > 3.子与父的slot需要配对,如果出现"磁带卡"与"卡槽"不匹配,直接不显示
  > 4.==**在vant4网站中有许多别人写好的组件,而在这些组件中插槽几乎是必须品,可以看看网站提供的组件说明,利用插槽,用用别人写的组件**==
### 作用域插槽
- ==正常状态下的插槽是有作用域限制的,你写在组件里的代码("磁带卡"),只能使用此文件的状态信息等==,**而不能使用组件内部的状态,这和子父互传单向传输一样,为了防止组件间乱改信息造成混乱**
- ==这个功能还是很好的,继续拿出老案例,在父子互传时就有的老将军案例了==
- 具体如图:
  [![pA0SqGF.png](https://s21.ax1x.com/2024/10/26/pA0SqGF.png)](https://imgse.com/i/pA0SqGF)
- ==解释: App是总组件,内部有2个儿子Navbar和Layout,而Layout的有2个儿子,content和sidebar,我们要实现的功能是,点击Navbar的按钮实现sidebar的显示与隐藏==
- 代码: App (==截取重点部分==)
  ```
    <template>
        <div class="root">
            <!-- 插槽 -->
            <Navbar>
                <!-- 可以访问到父组件,直接改变isShow的值即可 -->
                <button @click="isShow = !isShow">展开/折叠侧边栏</button>
            </Navbar>
            <!-- 父传子,动态传值 -->
            <Layout class="layout" :myshow="isShow"></Layout>
        </div>
    </template>
  ```
    > ==isShow是App的一个状态==,在Navbar插槽中通过点击去切换状态,然后子传父给layout组件
- 代码(Navbar)
    ```
    <template>
        <div>
            <!-- 插槽接待处 -->
            <slot></slot>
            <div>vue3的单文件navbar</div>
        </div>
    </template>
    ```
    > ==父组件的button代码通过插槽进入Navbar,Navbar组件得以显示这个button,通过点击触发事件,改变isShow的值,**注意,这时isShow由于作用域问题,只能改变App内的isShow的值,正好省的再子传父了,这样父的isShow可以实时收到Navbar点击按钮的影响进行改变,之后再传入layout,再由layout去显示隐藏自己的孩子,layout代码略**==
- ==作用域的硬性规则也可以打破,使得父组件的"磁带卡"即可以访问自己父组件的内容也可以访问到子组件的内容==
- 语法:(==App引入子组件Nowplaying,需要子组件的datalist数据==)
- 子组件:(==暴露父组件想要使用的数据==)
  **==语法结构==** : `:自定义属性名字="想要暴露的状态名"`
  ```
        <slot :mylist="datalist" name="movie">
            <ul>
                <li v-for="item in datalist" :key = "item.id">
                    {{item.nm}}
                </li>
            </ul>
        </slot>
  ```
  > ==子组件的卡槽,自定义一个属性名,未来取用这个属性值时按这个名字找,暴露子组件的状态datalist,动态绑定为了暴露变量而非字符串==
  
- 父组件:(==获取子组件暴露数据==)
- **==语法结构(标准)==** : `v-slot:组件卡槽name名字="随意起名(本次例子起名为myprops)"`
  ```
    <Nowplaying v-slot:movie="myprops">
        <li v-for="data in myprops.mylist" :key="data.id">
            {{data}}
        </li>
    </Nowplaying>
  ```

  > 1.接受子组件所有的暴露属性,存入myprops这个对象,==通过myprops.XXX按需取用==
  > 2.如果子组件卡槽没写名字name,直接v-slot="XXX"
  > 3.==v-slot:movie 可以简写为 #movie==
  > 4.==可以通过结构赋值获取对象中自己想要的值,#movie={mylist}即可,之后myprop.mylist就全变为mylist即可==
### 插槽作用域之猫眼
- 需求: ==用户想要再猫眼的电影列表上添加一个模糊搜素功能,实现被搜索的电影词条实现标红放大效果,但是猫眼的数据在组件的datalist中,按道理用户使用组件但是无法访问到组件内部的数据==,**这时开发者可以提前将组件中的猫眼数据暴露出去,如果有用户想用,直接获取即可**
- 猫眼组件代码:
    ```
    <template>
        <div>
            <!-- 暴露datalist数据,如果父组件没有使用插槽,那么就默认继续显示下面的源代码即可 -->
            <slot :mylist="datalist" name="movie">
                <ul>
                    <li v-for="item in datalist" :key = "item.id">
                        {{item.nm}}
                    </li>
                </ul>
            </slot>
        </div>
    </template>

    <script>
        // 使用axios
        import axios from 'axios'

        export default{
            data(){
                return {
                    datalist:[]
                }
            },
            mounted(){
                // console.log("123");
                // 在自己服务器请求可以省略协议和域名 还是猫眼的数据
                // fetch("054test.json").then(res=>res.json()).then(res=>{console.log(res)})
                // console.log(axios)
                axios.get("054test.json").then(res=>{
                    // console.log(res.data.data.hot)
                    // 箭头函数确保了this指向同步于外面
                    this.datalist = res.data.data.hot
                })
                
            }
        }
    </script>
    ```
    > ==信息提取: 引入axios,和之前案例一样,提前把猫眼后端的数据存入本地json文件中,通过axios模仿网络请求获取,然后把获取的响应数据赋值给状态datalist,最后把datalist暴露出去,名为mylist==
- 用户的代码(==获取猫眼暴露的datalist数据==)
   ```
    <template>
        <div>
            <!-- 模糊搜索添加样式 -->
            <input type="text" v-model="mytext">
            <Nowplaying v-slot:movie="myprops">
                <ul>
                    <!-- 使用暴露的属性mylist,从对象中提取,其余的相同 -->
                    <!-- 突破了作用域显示,能用自己的,也能用儿子的 -->
                    <li v-for="data in myprops.mylist" :key="data.id">
                        <!-- 模糊搜索添加样式 -->
                        <div v-if="data.nm.includes(mytext) && mytext != ''" style="color:red; font-size: 20px;">
                            <img :src="data.img" style="width:100px">
                            {{ data.nm }}
                        </div>
                        <!-- 没有匹配就没样式 -->
                        <div v-else>
                            <img :src="data.img" style="width:100px">
                            {{ data.nm }}
                        </div>
                    </li>
                </ul>
            </Nowplaying>
        </div>
    </template>
   ```
   > 提示: ==重点看如何引入组件的暴露数据datalist,以及使用它重新构建了猫眼的电影列表==,**至于模糊搜索includes和样式添加,不是本案例的重点**
## 生命周期
### 创建阶段
- ==每个组件的创建都有一套生命周期,开发者可以使用生命周期钩子函数,在特定阶段运行自己的代码==
- ==生命周期钩子执行顺序(**选项式**)==: beforeCreate -> init Options API(开发者自己创建data methods等) -> created -> beforeMount -> 模板编译过程(tempalte编译)  -> mounted
- ==各个生命周期阶段的详细介绍:==
  - beforeCreate: ==几乎不用==,什么都没有,定义的东西啥都还没创建呢,啥也访问不到
  - create: 可以访问到自己定义的所有东西,这也是在网页显示之前最后一次修改它们的机会了,==可以在这里修改数据和初始化数据(记得+this)==
  - beforeMount: ==几乎不用==,tem编译之前,还没挂载dom节点,访问不到dom节点
  - ==**mounted(最常用**==): 挂载dom节点完成,可以访问到dom节点,只有这里可以访问dom,==vue使用dom一般是调用第三方库去实现一些功能==
  - ==常用于 订阅,ajax fetch axios等网络请求,间隔定时器setInterval==
    > 注意: ajax放在非mounted发送请求,你发现也会请求到数据,原因是发ajax是异步的,等你网络请求回来,钩子函数早执行完了(到mounted阶段),所以就可以正常显示,但是我们习惯把它放在mounted函数中去使用
- ==**总结**==:
  - beforeCreate: 什么都访问不到,这时候连最基本的状态都没有
  - create: 已经可以访问到data mehods computed等数据了
  - beforeMount: 访问不到dom节点
  - mounted: 可以访问到dom节点
- 来一个具体实例(==使用echarts: 基于js的图形绘制第三方库==)
- 在这个实例中,我们体会下vue使用dom来引用第三方库的操作,其中echarts是个不错的js绘图工具,按照官方文档学习基本用法
- 代码:
  ```
    <template>
        <div>
            app---{{title}}
            <!-- <div id="main"></div> -->
            <div id="main" style="width: 600px;height:400px;"></div>
        </div>
    </template>

    <script>
    // echarts: 基于js的图形绘制第三方库
    // 导入echarts库,查看官方文档写法, 意思是把所有的方法(*)存入(as)这个对象中(echarts)
    // 在之后使用方法是,就echarts.XXX即可
    import * as echarts from 'echarts';
    export default{
        data(){
            return {
                title : "12345",
                obj : {}
            }
        },
        beforeCreate(){
            console.log("beforeCreate: ",this.title)
        },
        created(){
            console.log("created: ",this.title)
            // 显示前最后一次修改机会
            this.title = "000000"
            // 初始化工作: 记得加this
            this.obj.a = "aaa"
            this.option = {
                title: {
                text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                data: ['销量']
                },
                xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
                ]
            };
        },
        beforeMount(){
            console.log("beforeMount: ",document.getElementById('main'))
        },
        mounted(){
            // 访问dom的用处: (echarts模块已经npm下载好了,记得引入)
            // 来自官方文档的例子
            var myChart = echarts.init(document.getElementById('main'));
            // option在create里赋值,不让代码在这里冗余,create做做初始化工作挺好的
            myChart.setOption(this.option); // 记得加this才能访问到
        }
    }
    </script>
  ```
  > 总结: 
  > 1.可以看看官方文档的引入操作,注释中解释了这种引入方式,不同第三方工具的引入操作不一定相同,当发现引入失败时,及时查看文档是如何引入的
  > 2.我们把option的配置写在了create中,分散了代码,防止都堆在mounted中,==注意这时无论是定义还是使用都需要加this,create使用this.option初始化了新的状态,而counted也要通过this去获取==
  > 3.dom操作主要是第三方工具需要dom节点区承载它们的方法,来实现具体功能,比如mounted代码中,echarts的init方法需要一个参数,这个参数就是图标显示标签的dom节点
### 更新阶段
- 在mounted阶段,如果我们要更新数据,==就有beforeUpdate和updated两个阶段,前者是还没更新且几乎不用,后者是更新完成常常使用==
- 只要涉及到数据的更新就会有beforeUpdate和updated,==**更新阶段最主要的作用还是操作dom**==
>
- 案例: ==承接echarts的案例,echarts有一个方法resieze(),一旦图标的大小改变调用它就会重构图标大小==
- 正常思路写,如下
  ```
    <template>
        <div>
            app---{{ title }}
            <button @click="handleClick">改变echarts宽度为800px</button>
            <!-- 把style变为动态绑定,对象格式,并把宽度改为变量mywidth,初始化为600px -->
            <div id="main" :style="{ width: mywidth, height: '400px' }"></div>
        </div>
    </template>

    js:
    handleClick() {
        this.mywidth = '800px'
        ------------------------
        console.log(document.getElementById('main').style.width);
        // 发现还是600px,因为生命周期中,更改dom是异步的,是需要时间的,操之过急改完后没有等待生命周期的更新,就会发现还没改呢就调用resize()
        // 这时updated作用就体现出来了
        ------------------------
        this.myChart.resize()  
    }
  ```
  > 主体: myChart的构建没变,核心逻辑就是再设置完宽度后,立即执行myChart.resize(),发现图标没变
  > 原因: 因为任何数据的改变都会涉及更新阶段(updated),这是异步执行的,但是代码中在更改完成后,直接resize,操之过急了,还没等updated把dom的width给改了,你就resize,数据还是原样的,正如代码中,你可以在中间打印一下width看看变没变
- 一轮修改(==把图标的修改操作放入updated中==)
  ```
   js:
   updated(){
        // 这里的don已经更新完成了,width已经800px了
        console.log("updated",document.getElementById('main').style.width)
        // 这时再更改就可以了
        this.myChart.resize()
    },
  ```
  > 还有个小瑕疵,就是所有的数据更新都会自动执行一次update,比如此vue还有一些状态,你改变了它的值,也会执行updated,那么myChart.resize()会无意义执行一次,这样不好,所以还有更好的方案
- 最终修改:(==使用了新语法nextTick==)
  ```
     handleClick() {
        this.mywidth = '800px'
        // 下面的方法是一个一次性调用的函数它只关联当前状态mywidth,只有当它改变时才会执行,并且立即更新dom
        this.$nextTick(()=>{
            console.log("nextTick",document.getElementById('main').style.width)
            this.myChart.resize()
        })
    }
  ```
  > ==当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的==，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。
  > nextTick() 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。
### 销毁阶段
- 销毁组件操作,组件内部的一切都会被销毁
- 组件销毁: ==beforeUnmount unmounted,老样子,前者是销毁前,几乎没用,后者是销毁后,组件的一切都没了== 
- ==什么时候会销毁?==
  - 比如v-if挂组件上,当结果为false时,就会被销毁
- ==销毁组件的用处==: 在销毁阶段我们也有事情要做,==比如我们在组件内部绑的定时器,这是绑定在windows上的,组件的销毁并不能带走它==,所以需要他特事特办,对定时器解绑,==**即销毁阶段唯一要做的事情就是,销毁那些不会跟随组件一起被销毁的属性,方法等(定时器,mitt监听的方法)**==
- 案例: (==APP父,Child子,子内部挂载一个定时器==)
- App父(==销毁子组件Child==)
  ```
    <template>
        <div>
            app
        </div>
        <!-- 销毁组件操作,组件内部的一切都会被销毁 -->
        <!-- <button @click="isCreate = !isCreate">delete Child</button> -->
        <Child v-if="isCreate"></Child>
    </template>

    js:
    mounted() {
        console.log("App-mounted")
    }
  ```
- 子Child(==销毁自己的定时器==)
  ```
  js:
    mounted(){
        console.log("Child-mounted")
        // 挂载在windows上的监听窗口大小变化的监听器,即使组件没了,也依然存在,需要特事特办去销毁它
        window.onresize = ()=>{
            console.log("resize")
        }
    },  
    unmounted(){
        console.log("unmounted")
        // 销毁windows挂载的方法
        window.onresize = null
    }
  ```

  > ==重点1==: 父组件通过v-if销毁了子组件,子组件在mounted中定义了定时器,在unmounted中销毁了定时器,如果不销毁,那么定时器不会消失
  > ==重点2==: 多个组件使用同一个window挂载方法,只要其中一个销毁,其他的组件也会跟着销毁掉,例如引入Child和Child2两个组件都有window的onresize,如果销毁Child时把onresize也销毁了,那么Child2中的onresize也会失效
  > ==思考==: 看代码,子和父的mounted都有一段打印,谁会先打印
  > ==答==:孩子的mounted先于父的mounted执行,因为父在执行到mounted阶段时,所有的dom都已经完成配置了,可以访问了,这时Child组件作为在template里面的一份子,早就执行完了dom配置

## VCA组合式写法
### 初识VCA
- ==组合式写法代码如下:==
  ```html
    <template>
        <div>
            componsition Api  
            <!-- 返回出的是一个obj的proxy对象,使用里面的属性需要".XXX" -->
            <div>obj.name : {{obj.name}}</div>
            <div>obj.age : {{obj.age}}</div>
            <button @click=handleClick>click</button>
        </div>
    </template>

    <script>
        // reactive是vue内置模块,需要引入,自动的
        import { reactive } from 'vue';

        // 组合式写法具有更好的可读性,都集中在一起
        export default{
            // 代码都写setup函数内部
            setup(){
                // 状态定义,需要reactive(),他会把参数对象封装为proxy对象,内部只能放复杂类型(对象,数组),而简单数据类型(数字,字符串,布尔)都不行
                // const ES6写法,const是不可变写法,obj不可被赋值,由于obj拿到的只是proxy对象的一个指针,所以内部的属性随便改(不影响指针指向),不违反const要求
                const obj = reactive({
                    name : "kerwin",
                    age : "100"
                })
                // 函数方法
                const handleClick = ()=>{
                    console.log("123")
                    // 方法使用状态,不再是this.XX而是obj.XX,常规思路
                    obj.name="xiaoming"
                    obj.age="200"
                }

                // 需要返回,外面(tempalte)才能使用
                return {
                    obj, // obj : obj 的简写
                    handleClick
                }
            }
        }
    </script>

  ```
  - ==**总结:(规整注释)**== 
  - 1.==代码都写setup函数内部==
  - 2.==所有信息需要返回return{..}==,外面(tempalte)才能使用
  - 3.==状态定义改变了,const obj = reactive({..})==,**reactive()是vue内置模块,需要引入**,
    > 解释reactive的原理:==他会把参数对象封装为proxy对象==,**内部只能放复杂类型(对象,数组),而简单数据类型(数字,字符串,布尔)都不行**
  - 4.==内函数方法使用状态写法改变,**不再是this.XX而是obj.XX,因为你把状态封装为proxy对象赋值给obj了,所以这是很正常的思路,同理的template想要使用状态也要这么写**,不再是选项式直接写的写法了==
  - 5.==在组合式中常用const(ES6写法)==,替换掉在选项式的var(ES5)
    > const ES6写法: ==const是不可变写法,obj不可被赋值==,**由于obj拿到的只是proxy对象的一个指针,所以内部的属性随便改**==(不影响指针指向),不违反const要求==
  

### reactive()案例
- 代码:
  ```html
    <template>
        <div>
            <!-- 记得所有的内部状态(mytext,datalist)需要state.XXX -->
            <input type="text" v-model="state.mytext">{{ state.mytext }}
            <button @click="handleAdd">add</button>
            <ul>
                <li v-for="(data, index) in state.datalist" :key="data">
                    {{ data }}
                    <button @click="handleDel(index)">Del</button>
                </li>
            </ul>
        </div>
    </template>
    <!-- 写老案例06增删li列表的案例 -->
    <script>
        import { reactive } from 'vue';
        export default {
            setup() {
                // reactive()作为vue的内置方法,可以写多个
                const state = reactive({
                    datalist: ["111", "222", "333"],
                    mytext: ""
                })

                // 都记得要state.XXX
                const handleAdd = () => {
                    state.datalist.push(state.mytext)
                    state.mytext = ""
                }

                const handleDel = (index) => {
                    state.datalist.splice(index, 1)
                }

                // 记得方法状态都要return出去
                return {
                    state,
                    handleAdd,
                    handleDel
                }

                // 总结: template和js内部使用状态都需要"state.XXX"
            }
        }
    </script>
  ```
    > 总结: ==写老案例06增删li列表的案例,思路十分的简单,注意几点,习惯组合式的写法,记得返回值,记得reactive定义状态的方式,**记得想要调用状态时需要state.XX**==
### ref()的应用
- reactive只能封装复杂数据类型(对象,数组),对简单数据类型的单独封装不支持,由此引出ref
- ref: 创建一个包装对象(proxy),同样需要引入,==复杂数据和简单数据都可以包装,不过他会自动封装一层value的对象==
   `const myname = ref("kerwin") // 会包装为{ value : "kerwin"}`
- 代码:(==把reactive的案例改为ref式==)
  ```html
    <template>
        <div>
            <!-- 在tem中,vue会自动帮你补全,所以不用写myname.value,直接写即可,和选项式写法一样 -->
            myname : {{myname}}
            <button @click="handleClick">click</button>
        </div>
    </template>

    <script>
        // ref在父子关系就见过
        // VCA中在之前的基础上,又增加新能力,创建一个包装对象(proxy),复杂数据和简单数据都可以包装
        // 它会自动封装一层value的对象,如下 

        import { ref } from 'vue'; // ref需要导入,自动化

        export default{
            setup(){
                // 字符串,数字,布尔....都自动value二次包装
                const myname = ref("kerwin") // 会包装为{ value : "kerwin"},所以访问需要 .value访问

                const handleClick = ()=>{
                    // 打印发现是一个大对象RefImpl
                    console.log(myname)
                    // 在js中,必须.value才能生效
                    myname.value = "xiaoming"
                }
                return {
                    myname,
                    handleClick
                }

            }
        }
    </script>
  ```
    - ==总结:==
    - 1.由于vue自动封装的value,==在js内部使用状态需要加".value",**但是tempalte内部使用状态,vue会自动帮你加上,所以和选项式一样了,直接写即可**==
      > 注意: 在js内部直接打印状态,是一个对象RefImpl,这就是ref封装好返回给你的对象,查看属性value的值就是我们想要的状态值
    - 2.ref把reactive的**对象封装转化为2个ref单个封装(记得同步返回return的内容)**,==对mytext封装空字符串(简单数据类型),对datalist封装数组(复杂数据类型)==
### ref的老用法
- ==ref早在我们学习父与子的时候作为父强权ref-$ref中用过,**这个能力并没有丢失,只是组合式和选项式的使用方式变化了**==
- 为何组合式和选项式使用ref方法不同?
  - ==因为在组合式中的this已经没有指向了,你无法通过this获取dom节点==
- 代码:(新用法)
  ```html
    <template>
        <div>
            <!-- 使用下ref传统用法 -->
            myname : {{ myname }}
            <!-- ref="myinput"相当于把组合式创建的myinput状态放进去了,之后myinput会自动获取这个标签的dom节点 -->
            <input type="text" ref="myinput">
            <button @click="handleClick">click</button>
        </div>
    </template>

    <script>
        import { ref } from 'vue';
        export default {
            setup() {

                const myname = ref("kerwin")
                // 这样写,开始不绑定东西,用于未来获取节点
                const myinput = ref(null)

                const handleClick = () => {
                    myname.value = "xiaoming"
                    // setup中this已经失效所以原来选项式的用法不可用
                    // console.log("this:",this)

                    // 遵循.value规则,获得dom节点
                    console.log(myinput.value)
                    // 第一个value是ref本身东西数据获取,第二个value是获取input节点的value值
                    console.log(myinput.value.value)
                }

                return {
                    myname,
                    myinput,
                    handleClick
                }

            }
        }
    </script>
  ```
  - 定义好一个**ref + null**的状态myinput : `const myinput = ref(null)`,==开始不绑定东西,**用于未来获取dom节点或组件**==
  - 在标签上挂ref: `<input type="text" ref="myinput">`,==ref="myinput"相当于把组合式创建的myinput状态放进去了,这个myinput是一个状态不是字符串,之后myinput会自动把这个标签封装进去==
  - 打印ref获取的dom节点(不再使用this):`console.log(myinput.value)`, ==**遵循.value规则**,直接获得dom节点,然后随意操作即可==
  > ==根据生命周期来说,ref定义获取节点后并不能马上得到节点,可以在点击函数中测试(等待dom挂载完成),也可以在onMounted中使用==

### ref()与reactive()的区别
- ==封装能力==
  - reactive: 复杂数据类型
  - ref: 复杂简单数据类型都可以
- ==状态在js和template的使用方法==
  - reactive: template和js内部使用状态都需要"state.XX"
  - ref: template写法和选项式一样,直接写即可; 但是在js内部使用需要+.value

### toRef和toRefs
- ==toRef()==: 把state中的某一个状态单独转化为ref形式
- ==toRefs()==: 把所有state的转化为ref封装在一起
- ==**关于reactive响应式数据的问题**==
  - ==在reactive格式下的状态,**如果想要响应式地接应tempalte,return的数据必须是state**==,如上面的增删列表案例`return { state }`
  - ==如果想要贪图省事,比如不想要通过state.mytext去获取数据,如下
    `return { mytext : state.mytext }`,会发现响应式失效,**这是因为此时的mytext已经是固定写死的数据了**==,你往外返回的是死数据
  - 原因: ==单独的state,返回出去的是一个指向state内存的地址,当我们改变mytext的值,**它作为内存state的内部数据改变不影响state的地址,所以能响应式布局**==,**而`mytext:state.mytext`相当于你已经从内存中取了当时的mytext的值,这是值而非地址,所以是死数据**,==即使后来mytext变了,也无法响应式地传递新的mytext的值==
  - ==所以reactive传递返回数据时要认真思考,按照之前的模板传递准没错,**涉及地址传递和值传递搞不清楚,会造成无法响应式布局页面**==
- 由此引申出,既然reactive返回值无法动手脚,我直接把reactive转化为ref形式的数据不就可以了吗
  - ==toRef函数(需要导入)==
  - `mytext : toRef(state,"mytext")`,意为把state中的mytext状态单独转化为ref形式
  - ==toRefs函数(需要导入)==
  - `let obj = toRefs(state)`,把所有state的转化为ref封装在一起,使用它有个简便方法,就是使用展开运算符,直接拆分对象返回出去,如下
    `return { ...toRefs(state) }`
  - 结构赋值(...obj): 就是把对象的key/value对拆开,常用于数组的合并
  `var obj1 = {a:1,b:2}  var obj2 = {c:3}  ==> var obj3 = {...obj1,...obj2} = {a:1,b:2,c:3}`
  > ==reactive转化为ref后,直接在tem中使用即可,使用原则遵顼ref语法==

- ==另外,ref风格可以转为reactive风格,如下==
  ```
    const location = ref("dalian")
    const state = reactive({
        name : "kerwin",
        age : "100",
        // ref可以作为属性直接被封装进reactive
        location // 简写 location(名) : location(状态值)
    })

  ```
- 在template使用方面,入乡随俗
   ```
    <!-- 对于ref状态的使用,只要进入reactive也就入乡随俗了 -->
    <div>location(state): {{state.location}}</div>
   ```
- 在事件处理函数内部的使用(例如点击事件),十分包容
   ```
    const handleClick = ()=>{
        state.name = "xiaoming"
        // 那么对于事件函数,如何去改ref型数据的值呢? 测试
        // state.location = "beijing" // 遵循reactive
        location.value = "beijing" // 遵循ref
        // 结果是都行,随意使用
    }
   ```
### 组合式写法规范与升级(hooks)
- 组合式写法规范性如下(大的项目文件都是如此写法,使得代码更加规整,如果和图片左边一样的写法,那和选项式比没啥区别,照样乱)
  [![pABQDBt.jpg](https://s21.ax1x.com/2024/10/30/pABQDBt.jpg)](https://imgse.com/i/pABQDBt)
- ==复用逻辑-自定义hooks==: **把代码逻辑封装进模块module,这个文件内部有许多的逻辑代码(即模块module)组合而成,==而逻辑代码module模块本身在文件内部也具有复用性,并且别人可以引用你的模块使用==**
- **本节主要是写逻辑代码module**,而不是把每个module又做成组件,那样组件太多了冗余,==我们的组件最好是集大成者的大合集==
- ==**模块命名潜规则,加'use'前缀**==
>
- ==模糊搜索案例组合式写法重构==
- 初始写法,帮助理解,即不写模块,写func
  ```html
    <template>
        <input type="text" v-model="mytext">
        <ul>
            <li v-for="data in computedList" :key="data">
                {{ data }}
            </li>
        </ul>
    </template>

    <script>

        import { reactive,computed,ref } from 'vue';

        // 先在一个文件里写帮助理解,然后再写到模块里
        // 不成文的规定,自定义的hooks一般加use前缀
        function useSearch(state){
            const mytext = ref("")
            const computedList = computed(()=>{
                return state.datalist.filter(item=>item.includes(mytext.value))
            })

            return {
                mytext,
                computedList
            }
        }


        export default {
            setup() {
                const state = reactive({
                    datalist: []
                })

                // 模拟ajax请求数据,这是用户写的,无法封装进逻辑
                setTimeout(()=>{
                    state.datalist = ["aaa", "aab", "abc", "bbc", "bac", "cab", "ccc", "caa"]
                },2000)

                // 搜索逻辑全部交给函数处理了
                // Search方法也是响应式的,上面的setTimeout是异步,所以直接会执行Search函数,一开始没有数据,当时数据请求到之后,会实时更新!
                // const {mytext,computedList} = UseSearch(state)

                return {
                    // mytext,
                    // computedList

                    // 甚至不用你解构赋值,我把你返回的对象直接展开运算了
                    ...useSearch(state)
                }
            }
        }

    </script>
  ```
  - ==**我们的核心功能函数(也是今后要进入组件的部分),就是useSearch函数,这个逻辑代码帮我们解决了模糊搜索的所有问题**,用户要做的就是根据自己的情况请求不同的数据datalist,放入这个函数中,剩下的什么都不用管==
  - **写模糊搜索函数记得return必要的值**
  - ==vue支持异步情况下的模块响应==,这使得我们不必考虑异步的时,具体在注释中: setTimeout是异步,所以直接会执行Search函数,虽然一开始没有数据,但是当数据请求到之后,会实时更新!
- 写法2,封装一下
- useSearch.js (==按照ES6的模块化语法即可==)
    ```js
        // 引入vue方法
        import { computed,ref } from 'vue';

        // 处理
        function UseSearch(state){
            const mytext = ref("")
            const computedList = computed(()=>{
                return state.datalist.filter(item=>item.includes(mytext.value))
            })

            return {
                mytext,
                computedList
            }
        }

        // 导出
        export default UseSearch
    ```
- 主文件App(==引入模块,直接使用即可==)
    ```js
    // 导入模块
    import useSearch from './search';

    export default {
        setup() {
            const state = reactive({
                datalist: []
            })

            // 模拟ajax请求数据,这是用户写的,无法封装进逻辑
            // 如果别的用户想用你这个模糊搜索逻辑,只需要引入你的模块,请求数据即可,剩下的已经写好了
            setTimeout(() => {
                state.datalist = ["aaa", "aab", "abc", "bbc", "bac", "cab", "ccc", "caa"]
            }, 2000)

            return {
                ...useSearch(state)
            }
        }
    }
    ```
- 主文件: ==我们要做的就和图片右边的写法一样了,**引入模块,使用模块传递数据,返回模块**三步走==
- ==模块内部需要引入vue方法,返回计算过的值,**最后导出函数(ES6)**==
>==**注意:你会发现我们在模块内部定义的const mytext = ref(""),这说明了模块和主文件是一体的,mytext的应用是在App.vue里面,而定义在模块js文件里面,所以这些状态的定义都放在模块里面即可,主文件可以更加简洁,同时记住,模块可以响应式地,不受异步影响地接受数据改变页面**== 
>
- ==**针对放入函数的参数为何是state而非state.datalist的讨论**,还是涉及到地址和值对于响应式布局的影响(第一次讨论此问题在toRef和toRefs的章节)==
  - 这时因为,==初始化state.datalist = []和后来异步请求数据后,赋值的数组,不是一个地址了(**复杂数据给状态的是一个地址**)==,而在数据来之前,==已经把空数组地址写入search函数了,这也相当于写死了==,把空数组的地址永远作为参数放入模块,而无法接受datalist改变后的值,从而无法响应式布局
  - ==**state作为最外层**,内部数据datalist数据改变,其地址也不受影响,**指向的内存内部数据变化了而已,但是开门的钥匙没变,保证模块能顺着钥匙找到state,进而找到变化的datalist**,所以能响应式==
- ==也可以转化为ref写法,这样模块传值就无需多虑了==
- App(主文件)
  ```html
    <!-- 制作模块 -->
    <template>
        <input type="text" v-model="mytext">
        <ul>
            <li v-for="data in computedList" :key="data">
                {{ data }}
            </li>
        </ul>
    </template>

    <script>

        import { ref } from 'vue';
        // 导入模块
        import useSearch from './search2';

        export default {
            setup() {
                // ref写法
                const datalist = ref([])

                // 模拟ajax请求数据,这是用户写的,无法封装进逻辑
                // 如果别的用户想用你这个模糊搜索逻辑,只需要引入你的模块,请求数据即可,剩下的已经写好了
                setTimeout(() => {
                    datalist.value = ["aaa", "aab", "abc", "bbc", "bac", "cab", "ccc", "caa"]
                }, 2000)

                return {
                    ...useSearch(datalist)
                }
            }
        }

    </script>
  ```
- 模块Sreach2.js :
  ```js
    // 引入vue方法
    import { computed,ref } from 'vue';

    // 处理
    function UseSearch(datalist){
        const mytext = ref("")
        const computedList = computed(()=>{
            return datalist.value.filter(item=>item.includes(mytext.value))
        })

        return {
            mytext,
            computedList
        }
    }

    // 导出
    export default UseSearch

  ```
### computed函数
- **==组合式万物皆函数,通过引入各式各样的函数,复现选项式的种种功能==**
- 老案例,计算属性把字符串转化为首位字母大写
  ```html
    <template>
        <div>
            <div>obj.myname: {{obj.myname}}</div>
            <div>compuName: {{compuName}}</div>
        </div>
    </template>

    <script>
        // 万物皆函数了,引进computed函数
        import { reactive,computed } from 'vue';
        // 由于状态不在data中定义,所以computed的this访问不到状态了,也要重写方法
        export default{
            setup(){
                const obj = reactive({
                    myname:"kerwin"
                })

                // 计算属性(自动化) 首字母大写
                const compuName = computed(()=>{
                    return obj.myname.substring(0,1).toUpperCase() + obj.myname.substring(1)   
                })
                // 写法2: 单个语句 简写
                // const compuName = computed(()=> obj.myname.substring(0,1).toUpperCase() + obj.myname.substring(1))

                return {
                    obj,
                    compuName
                }
            }
        }
    </script>
  ```
  > 1.计算函数是自动化的,和计算属性一样
  > 2.需要有变量承接计算函数的返回值,再return出去
  > 3.原计算属性需要借助this去实现数据获取于返回,但是我们从学习方法时就知道,this在组合式中不好使了,所以涉及this操作的全部重构
- 模糊搜索案例+计算函数重构
  ```
    <!-- 模糊搜索案例组合式写法重构 -->
    <template>
        <input type="text" v-model="mytext">
        <ul>
            <li v-for="data in computedList" :key="data">
                {{ data }}
            </li>
        </ul>
    </template>

    <script>

    import { reactive,toRefs,computed } from 'vue';

    export default {
        setup() {
            const state = reactive({
                mytext: "",
                datalist: ["aaa", "aab", "abc", "bbc", "bac", "cab", "ccc", "caa"]
            })

            const computedList = computed(()=>{
                // 记住filter是返回新数组,对原数组没影响,所以不会出现"越改越少"的现象(这个是模糊搜索案例的难点)
                // includes空字符代表全部符合
                return state.datalist.filter(item=>item.includes(state.mytext))
            })

            return {
                // 都转化为ref型状态,在tem中可以直接写原名
                ...toRefs(state),
                computedList
            }
        }
    }

    </script>
  ```
  > 1.==和模块化规范语法几乎没区别,只是把原模块search.js内的功能函数赋值进计算函数==,**同时让页面按照筛选好的计算函数返回值去构造页面,即`v-for="data in computedList"`**
  > 2.这里数组的filter方法返回值是筛选后的新数组,对原数组没影响,所以不会出现"越改越少"的现象(这个是模糊搜索案例的难点)
### watch函数
- watch: ==解决计算属性无法使用异步的问题,需引入==
- 改造下模糊搜索的案例,改为watch监听input,发现输入框变化后,进行ajax请求数据,然后显示
- ==ref + watch(会更简单,watch的3中3中写法)==
  ```html
    <template>
        <div>
            <input type="text" v-model="state.mytext">

            <select v-model="state.select">
                <option value="111">111</option>
                <option value="222">222</option>
                <option value="333">333</option>
            </select>
        </div>
    </template>
  ```
  ```js
    // ---监听watch配合ref会更加方便
    const mytext = ref("")
    const select = ref("222") // 初始select选择222

    // 写法1: 自带2个参数,新值和旧值
    watch(mytext,(newValue,oldValue)=>{  
        console.log("ajax请求",newValue,oldValue)
    })

    // 写法2: 监视每次触发后,返回mytext.value
    watch(()=>mytext.value,(newValue,oldValue)=>{ 
        console.log("ajax请求",newValue,oldValue)
    })

    // 写法3: 同时监听多个值,任意一个改变就触发,会封装成对象打印出来
    watch([mytext,select],(newValue,oldValue)=>{ 
        console.log("ajax请求",newValue,oldValue)
    })

    // 补充: 立即触发immediate ; 深度监听deep,监听对象,无论对象多深的层级都会监听到,不建议使用,影响性能
    watch([mytext,select],(newValue,oldValue)=>{ 
        console.log("ajax请求",newValue,oldValue)
    },{immediate:true})

  ```
    > watch监听可以分为监听1个,多个值,单独监听一个值有两个写法,监听属性还有immediate和deep等属性值
- reactive与watch函数匹配
  ```js
    // 2.reactive配合监听写法
    const state = reactive({
        mytext : "",
        select : "333"
    })
    
    // 注意: 监听无效,这是一个写死的常量""
    // watch(state.mytext) 

    // 1.这种写法有个弊端,state任何一个数据改变动员会发起ajax,我们就指定只监听state的mytext
    // watch(state,()=>{
    //     console.log("ajax")
    // })

    // 2.箭头函数的监听写法
    watch(()=>state.mytext,(newValue,oldValue)=>{
        console.log("ajax",newValue,oldValue)
    })

  ```
  > ==监听reactive时注意,不要直接写内部的状态,形如`watch(state.mytext)`,这监听的是一个死对象==,**所以借助箭头函数可以对指定的状态进行监听**,从而不必对整个state监听了
- 关于watch函数箭头函数监听的知识
  - 这种箭头函数的形式在这里可以理解为一个 “取值函数” 或者说 “get 函数”。它的主要作用是当 watch 机制去检查是否有值发生变化时，会调用这个函数来获取当前时刻要监听的那个具体的值
  - 以 watch(() => state.mytext, () => { console.log("ajax") }) 为例，() => state.mytext 就是这个 “get 函数”。每次 watch 进行依赖收集或者检查值是否变化时，都会执行这个函数来拿到 state.mytext 的最新值，以便和之前的值进行对比，从而确定是否触发后续的回调函数(也就是监听到了变化)
  如果 state 是一个通过 reactive 函数创建的响应式对象，当 state 内部的属性（这里是 mytext）发生变化时，Vue 的响应式系统会重新执行相关的 “get 函数”来获取新的值，并与之前的值进行对比，若不同则触发 watch 对应的回调操作。

### VCA案例
- json-server: ==**是一个需要npm的第三方工具,可以结合json文件模拟地址,在前后端分离开发中,后端暂时没有,前端需要测试数据时,利用json文件模拟后端数据**,同时可以通过浏览器,ajax网络请求,在本机请求到这些json内的数据,并且可以正常地对json文件内的对象属性进行访问==
- ==大部分介绍用法在csdn收藏文章里(其他栏),基本用法==,在json文件夹下,使用`json-server --watch <file>`,file是你的json文件名,--watch是监听指令,文件内部由东西变化可以监听到

- ==**案例(初始,简单的模糊搜索+ajax模拟)**==
- ==ajax模拟,即通过启动json--server来模拟后端,前端发送axios请求数据,进而完成模糊搜索的功能==
    ```
    tem:
    <!-- 选项框 -->
    <div>
        <select name="" id="" v-model="select">
            <option value="kerwin">kerwin</option>
            <option value="tiechui">tiechui</option>
            <option value="gangdan">gangdan</option>
        </select>
    </div>
    <!-- 显示模糊搜索结果内容 -->
    <div>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{item.content}}
            </li>
        </ul>
    </div>

    js:
    import { ref, watch } from 'vue'
    import axios from 'axios'
    export default {
        setup() {
            const select = ref("kerwin")
            const list = ref([])
            // 使用async+await
            watch(select, async(value) => {
                let {data} = await axios.get(`http://localhost:3000/users?name=${value}`)
                console.log(data)
                list.value = data
            }, { immediate: true })

            return {
                select,
                list
            }
        }
    }

    ```
    > 重点: ==看axios的get请求==,前面的域名啥的是json--server服务器启动时给你的基本地址,后面的`users?name=${value}`,users是找你的json文件(一般是这个文件最外层的对象名),再后面是按照get语法"?key=value",根据name去请求值,value就是select+optinons选出的值,axios内部是ES6写法`` + ${}
- 组合式写法的集大成者(再引入新功能,**先select出内容,再在input框内对select内容进行模糊搜搜**,==引入2个js逻辑模块==)
- App(==主文件,内部很简洁==)
    ```
    <div>
        <!-- 筛选 -->
        <select name="" id="" v-model="select">
            <option value="kerwin">kerwin</option>
            <option value="tiechui">tiechui</option>
            <option value="gangdan">gangdan</option>
        </select>
        <!-- 模糊搜索 -->
        <input type="text" v-model="mytext">
        <ul>
            <li v-for="item in computedList" :key="item.id">
                {{ item.content }}
            </li>
        </ul>
    </div>

    js:
    import useList from './select';
    import useSearch from './search';
    export default {
        setup() {
            // 十分简洁的组合式代码
            const { select, list } = useList()
            const { mytext, computedList } = useSearch(list)

            return {
                select,
                list,
                mytext,
                computedList
            }
        }
    }
    ```
    > 1.两个模块的作用,第一个useList(),内部会自动获取select选出的值,进行ajax请求数据,进行第一次筛选,返回出筛选的数组list
    > 2.第二个useSearch(list),内部需要数组数据,把一筛的list传进去,结合input + .include(...)进行二筛得到computedList
    > 3.==两个模块内部定义的select和mytext通过解构拿出来,然后return出去,是可以响应式地呼应App的tempalte的==
    > 4.==二筛后的数组computedList最终v-for打印出来==
- select.js(不写了,代码和上面的案例中的js区一摸一样)
- search.js(==之前的模块,但是由于参数的内部解构复杂了,是一个对象数组,所以内部稍微改了一点==)
    ```
        // 引入vue方法
        import { computed,ref } from 'vue';

        // 处理
        function useSearch(datalist){
            const mytext = ref("")
            const computedList = computed(()=>{
                // 修改一点 item.content.XXX
                return datalist.value.filter(item=>item.content.includes(mytext.value))
            })

            return {
                mytext,
                computedList
            }
        }

        // 导出
        export default useSearch
    ```


### watchEffect函数
- watchEffect 
  ```
    // watchEffect
    // 立即执行,不懒惰
    // 只接受一个参数,回调函数,自动检测内部代码,内部代码有依赖并被更改,就会执行一次监听
    // 不需要传递多个参数,只需要一个回调函数,会自动感知代码依赖
    // 不能获取之前的数据,只能获取当前值
    // 对于一些异步操作特别适合
  ```

- watch:
  ```
    // watch
    // 懒惰,需要immediate才会立即执行
    // 接收多个参数,但是不会自动检测内部代码依赖,参数是谁监听谁
    // 可以获取之前的数据和现在的数据

  ```
- 把watch的代码改为watchEffect
  ```js
    // watch(select, async (value) => {
    //     let { data } = await axios.get(`http://localhost:3000/users?name=${value}`)
    //     console.log(data)
    //     list.value = data
    // }, { immediate: true })

    watchEffect(async () => {
        // 直接监听select.value
        let { data } = await axios.get(`http://localhost:3000/users?name=${select.value}`)
        console.log(data)
        list.value = data
    })
  ```
  > 参数变为1个,自动检测内部变量,所以不用写形参,直接内部写要监听的状态

### props和emit
- props没有变,emit变为函数了
- props在选项式需要this辅助,组合式没有this,所以改为在setup传递参数
- ==props的使用==
  ```
    js:
    props: {
        title: String,
        left: {
            type: Boolean,
            default: true
        }
    }

    // 把所有父信息封装进对象
    setup(props){ // 第一个参数
        props.title = ...
    }

    // 也可以解构去写(推荐)
    setup({title,left}){
        title = ....
    }
  ```
- ==emit函数用法==
  ```
    // 第二个参数是一个工具包,名字随便写,内部封装了emit的方法,还有attrs,slot等方法
    setup(props,kerwin){
        kerwin.emit("...",....)
    }

    // 推荐解构方法
    setup({title,left},{emit}){
        emit("...",....)
    }

  ```
  > 除此之外,其余的没变,父子互传的:和@照旧写
- ==补充==:**父子强权系列的方法"ref parent root"在组合式中没有啥用,由于中间人问题,所以provide和inject才是主流**
- ref(==父强权,父组件==)
  ```
    tem:
    // @leftClickd: 子传父的钥匙
    // myNav: 父获取子的实例对象
    <Navbar title="首页" :left="true" @leftClick="handleLeft" ref="myNav"></Navbar>

    js:
    setup(){
        // 定义时为null
        const myNav = ref(null)

         // 接受子传父的信息
         // handleLeft由子的emit触发
        const handleLeft = (value)=>{
            console.log("子传父",value)
            // 通过myNav可以操控子内部状态
            console.log("ref获取子组件实例对象",myNav)
        }
    }
  ```
- parent root(==子组件的父组件和根组件==)
  ```

  js:
    setup(){
        // this.parent/root ,子组件获取父组件和根组件,没有this无法使用,但是组合式有个新函数getCurrentInstance,可以获取子组件的实例对象,相当于this
        const _this = getCurrentInstance()

        const handleClick = () => {
            // console.log(kerwin)
            //把计算函数的计算值返回给父
            kerwin.emit("leftClick",computedTitle.value)
            // 只有一个父,所以是相同的
            console.log("拿到父组件和根组件的对象",_this.parent,_this.root)
        }
    }
  ```
  > ref: 定义一个null状态,在标签ref="状态"
  > parent root: 还是需要this,==唯一的小重点,新函数getCurrentInstance(),获取当前的实例对象,和this一样==
### provide和inject
- 组合式相对比选项式的升级:
  - 选项式当时学习provide和inject时,父组件公开了信息,所有的后代组件可以使用,但是单个的后代组件无法影响到其他后代组件和父组件,特指无法影响到父组件,这样子组件在处理父组件公开的数据后,也无法响应式地更改父组件的页面,**所以当时很危险地把父组件的实例对象封装在app公开出去了,这很不安全,所有后代组件都能改父组件的信息,就会很混乱**
  - ==但是组合式中的provide和inject完全解决了所有问题,可以响应式,所有的父子通信,父子强权,中间人问题,统统解决==
- ==provide公开: App==
    ```js
        setup(){
            const which = ref("List")
            const show = ref(true)
            // provide 公开which,名为which,具备响应式
            provide("which",which)
            provide("show",show)

            return {
                which,
                show
            }
        }
    ```
    > provide("名字",公开状态),==具备响应式==
- ==inject注入公开信息使用== (后代组件)
    ```js
    const which = inject("which")
    const handleClick = ()=>{
        // 让父组件的which改为Detail
        which.value = "Detail"
    }
    ```
    > inject: ==直接按着名字注入公开信息,直接改就行,会响应式到组件App==
- ==案例(模拟导航栏隐藏 + 跨级通信),简单使用这2个新方法,可以看看075的案例解释==

### 生命周期
- 所有的生命周期都转化为函数形式了,如下图
  [![pABO9j1.jpg](https://s21.ax1x.com/2024/10/31/pABO9j1.jpg)](https://imgse.com/i/pABO9j1)
- 如下(==基本顺序没变,**nextTick也变为函数了,需要引入**==)
    ```
        onBeforeMount(() => {
            // ref reactive
            console.log("dom创建之前")
        })

        onMounted(() => {
            console.log("dom创建之后,订阅,ajax,new swiper,echarts初始化")
        })

        onBeforeUpdate(() => {
            console.log("更新之前")
        })

        onUpdated(() => {
            console.log("更新之后,任意状态更新都会调用,这是swiper和echarts都不能写在这的直接原因")
        })

        const handleClick = () => {
            num.value++
            // 一次性的,响应上面的值,周期在updated之后,且也是函数,需要引进
            // nextTick现阶段了解他是个函数,之后我们在深入了解它
            nextTick(() => {
                console.log("nextTick")
            })
        }
    ```
- 销毁函数(==销毁孩子的定时器==)
    ```
    setup() {
        // const不行,他不能被赋值,let var可以
        let clearId

        onMounted(()=>{
            clearId = setInterval(() => {
                console.log("1111")
            }, 1000)
        })

        onBeforeUnmount(() => {
            console.log("销毁之前")
        })

        onUnmounted(() => {
            console.log("销毁之后")
            clearInterval(clearId)
        })
    }
    ```
    > 也转化函数,但是销毁的思路差不多,使用clearInterval函数清除
## setup语法糖(独成一体)
- 在单文件组件SFC和组合式api同时使用时,推荐使用script-setup
- ==总结几个重点: 1.定义变量更简单 2.不用return所有的变量 3.引入组件不需要components挂载 4.props和emit有单独的函数==
- 不再写setup函数了,语法糖即`<script setup> ... </script>`
- 1.==所有暴漏在顶层的代码都可以在tem中直接使用,顶层就是在script-setup语法糖内的全局环境==
- 1.1==响应式变量的定义和普通常量的定义==,不需要return,外部tem直接用
  ```js
    // 1.普通变量定义(写死的)
    let msg = "msg-123" // const不能被重新赋值,这种定义的是常量,无法响应时更改
    // 2.ref reactive定义的响应式变量
    let msgRef = ref("ref-123")
    let msgRea = reactive({
        name: "kerwin",
        age: "100"
    })

    ---------------------
    测试: tempalte
    msg: {{msg}} 
    msgRef: {{msgRef}}
    msgRea.name: {{msgRea.name}}
    msgRea.age: {{msgRea.age}}

  ```
- 2.曾经的toRefs()的转化,不用return,拿出来解构就行了
    `const { name, age } = { ...toRefs(msgRea) } // reactive -> ref`
    测试: `name: {{name.value}} age: {{age.value}}`
- 3.计算函数没有变化,也是不用return,拿出去直接用
    `const comKerwin = computed(() => name.value + "-12345")`
    测试: `comKerwin: {{comKerwin}}`
- 4.引入组件,只需要import,无需挂载components:{},直接在tempalte里面用
    `import Child from './Child.vue'` 
    测试: `<Child></Child>`
- 5.父子通信,这是改动最大的地方,因为setup()无法传递参数了,props和emit无从获取,==解决的方式是引入两个新的函数defineProps()和defineEmits()==,**注意:子组件照常引入即可**
  - ==父传子: title || 子传父:(自定义事件) fromChild==
    ```
        tem:
        <Child :title="父kerwin" @left="fromChild"></Child>
        js:
        const fromChild = (value)=>{
            console.log("来自子组件的问候",value)
        }
    ```
  - ==子组件(**重点,那2个新函数都在那里面**)==
    ```
    <template>
        <div>
            <!-- 5 父子通信 -->
            我是Child组件-来自父的爱(加工版): {{compuTitle}}
            我是Child组件-来自父的爱(未加工版): {{ title }} 
            给父组件发消息: <button @click="handleClick">发送</button>
        </div>
    </template>

    <script setup>

    // 5.1 父传子之props
    import { computed } from 'vue';
    // 5.1.1 这样接受父组件的值,是为了子组件二次加工数据,记得props.XX
    const props = defineProps({
        title:{
            type: String,
            default : "父组件没有给你数据"
        }
    })
    const compuTitle = computed(()=> props.title + "(加工后的)")

    // 5.1.2 不想加工直接写,如下去写,并且在tem中也直接用即可
    defineProps({
        title: {
            type: String,
            default: "父组件没有给你数据"
        }
    })

    // 5.2 子传父之emit
    const emit = defineEmits(["left"]) // 存入父给子的"钥匙",父的自定义事件可能有多个,所以用数组封装,想给哪个自定义事件发消息就使用哪个"钥匙"
    const handleClick = () => {
        emit("left","我是子组件给父组件的信息")
    }

    </script>
    ```
    > 总结: props有两个写法(==加工是借助计算函数==),emit稍微变化,其余看代码即可,注释与逻辑很清晰
- 6.指令,全局指令不变,在main.js正常挂载,但是局部组件变量,无需directive挂载,如下
  ```
    tem:
    <div v-kerwin>指令应用处</div>

    js:
    const vKerwin = (el)=>{
        console.log(el)
        el.style.backgroundColor = "yellow"
    } 
  ```
  > 命名有规则,使用驼峰写法,驼峰处对应着'-',如果直接原样写,不考虑v-XX系列,那么就是个普通函数vKerwin vKerwinDetail
  > 例如: vKerwin -> v-kerwin ; vKerinDetail -> v-kerwin-detail 
- 7.动态组件 :is="which" which可以直接放Child(引入的子组件),内部写三目或者函数都可以(一会用个老案例075改造),动态组件在template里面
  - App:
    ```
    <template>
        <div>
            <Navbar v-show="show"></Navbar>

            <!-- 动态组件, List/Detail 改为三目,true为List,false为Detail -->
            <component :is="which ? List : Detail"></component>
        </div>
    </template>

    <script setup>
        import Navbar from './Navbar.vue';
        import List from './List.vue';
        import Detail from './Detail.vue';
        import { provide, ref } from 'vue';

        // which = true 选择List
        const which = ref(true)
        const show = ref(true)
        // provide 公开which,名为which,具备响应式
        provide("which", which)
        provide("show", show)
    </script>
    ```
  - List:
    ```
    <template>
        <div>
            <ul>
                <li v-for="data in datalist" :key="data" @click="handleClick">
                    {{ data }}
                </li>
            </ul>
        </div>
    </template>

    <script setup>
        import { ref, inject } from 'vue';

        const datalist = ref(["aaa", "bbb", "ccc", "ddd", "eee"])
        // 根据公开的名字,注入公开的信息which的值
        const which = inject("which")
        const handleClick = () => {
            // 让父组件的which改为false,三目运算结果为Detail
            which.value = false
        }
    </script>
    ```
    - Detail:
    ```
    <template>
        <div>
            detail <button @click="handleClick">返回</button>
        </div>
    </template>

    <script setup>
        // Detail刚加载完,执行show代码,涉及组合式的生命周期
        import { inject, onMounted } from 'vue';
        // mounted也变成函数,页面加载完成,自动执行回调函数
        const show = inject("show")
        const which = inject("which")

        onMounted(() => {
            show.value = false
        })

        const handleClick = () => {
            show.value = true
            // 动态组件的三目true为List
            which.value = true
        }
    </script>
    ```
    > 其实核心逻辑也没啥,就是App父组件动态组件绑定的:which公开出去,使用三目控制which是true或false,从而使其变为List组件或Detail组件
    > 而List和Detail组件则获取公开的which信息,然后通过点击事件给其赋true或false的布尔值,控制动态组件的变化
- 8.provide 和 inject没有变化 ,在动态组件改造文件夹内部改造的案例就是这个075,内部有它们,可以看看
- 9.内部有想要暴漏出去的函数或属性(比如子组件给父组件暴漏一些属性),使用defineExpose,然后父组件通过ref获取子组件实例后就可以获取到这个暴漏的属性了

  
## 路由
### 路由对象结构
- 一个路由对象的基本解构如下:
    ```js
        const newRoute = {
            path: string, // 路由路径，例如 '/about'
            name: string, // 路由名称，例如 'about'，可选
            component: Component, // 对应的组件，可以是一个Vue组件
            children: [RouteRecordRaw], // 子路由数组，可选
            redirect: string | Location | Function, // 重定向路径或函数，可选
            alias: string | string[], // 路由别名，可选
            meta: object // 自定义的元数据，例如权限信息,登录许可等，可选
        };
    ```
> ==内部的所有属性都会在笔记中体现,这是个预告==
### 前后端路由关系
- 后端路由阶段: 进入网站,请求一个url,然后url向服务器请求,然后在服务器把页面全部渲染完成,最后返回给前端页面,一个页面是一个url,每个url对应一个html页面,构成后端路由
- 前后端分离阶段: 进入网站,大的网站html还是由服务器渲染返回给前端的,但是页面中部分小区域,比如一些列表等可以通过后端返回data数据,然后由前端渲染;此时还是后端路由渲染模式
- ==目前网站-前端路由阶段**SPA(单页面 single page application)**==: 进入网站,渲染index.html页面后,再次进入新的url不会再像服务器请求网页,而是对应一个个组件,url对应组件,新的地址即路由,映射着组件,这个映射关系由前端维护,称之为前端路由   
- ==核心:== 前端网页切换页面不要刷新(刷新会重新请求网页数据,spa就没有意义了),==解决方式hash模式或html5的history模式,**下面先用hash模式,HTML5模式需要后端服务器配置,比如nodejs写的服务器**==
### 路由的基本使用
- ==**vue Router是vue.js的官方路由,直接npm下载**==
- 路由的用处: ==特别是在移动端(手机),使用于单页面应用==
  - ==单页面应用==:只有一个页面,切换页面是隐藏和显示不同的组件,还可以做切换动画,同时切换页面时,地址会改变,实现路径和组件的映射效果,实际上一直都只有一个页面,只是里面的组件不停切换,使得页面发生改变
  - ==多页面应用==: 多个页面跳转,直接跳转,就拿html文件来说,一个页面就是一个新的html页面,切换时如果网速慢,是没有切换动画的,会卡住
- ==**使用路由**==
  - ==路由的文件架构==: 在路由文件夹中有views和router两个文件夹,router里有index.js,最外面是根组件App.vue(和这些文件夹并列)
  同理还有并列的main.js
  - ==router文件夹的index.js==:这是配置路由的中心,index这个名字是默认的,系统会在router自动去找index.js,相当于可以少写一层地址
  - ==1.index.js配置(**router文件夹的第一个文件**)==:
    - 1.引入2个函数: `import { createWebHashHistory, createRouter } from 'vue-router'` , ==第一个是web的hash地址函数,第二个是创建路由的函数==
    - 2.创建路由:(==固定写2个参数==)
        ```js
        const router = createRouter({
            history: createWebHashHistory(), // hash模式web路由地址格式如:  #/film #/center
            routes, // routes时配置的中心,简写模式,routes:routes
        })
        ```
    - 3.在创建路由代码的上面配置路由信息route(**==关键:给之后的组件配置地址,地址自定义去写,一般是文件名==**)
        ```js
        const routes = [
            {
                path:"/films", // 路径自动映射 #/films
                name:"Films", // 路由名
                component:Films, // 对应Film组件
            },    
            {
                path:"/cinemas",
                name:"Cinemas",
                component:Cinemas
            },
            {
                path:"/center",
                name:"Center",
                component:Center
            },
        ]
        ```
    - 4.创建组件(==routes内的每一个对象,配以一个组件,**组件写在views文件夹内部**==)
    - 在文件夹router创建Films.vue, Cinemas.vue, Center.vue三个文件,==然后引入index.js文件,**注意,这个引入的变量名要和routes内部配置的component一致**==
        ```js
            import Films from '../views/Films.vue'
            import Cinemas from '../views/Cinemas.vue'
            import Center from '../views/Center.vue'
        ```
    - 5.==所有工作配置完成,把创建的路由router公开出去(**别公开错了,公开成routes这个配置项**)==
    ES6: `export default router`
- ==2.在main.js文件中挂载==:
    - 1.**引入路由:** 
    `import router from './2-VueRouter/router'`
    ==index.js的命名优势==: 不写/index.js也行,系统会自动在这个文件夹内部寻找index文件,当然如果你创建时名字不是index,那么就必须写
    - 2.**注册路由插件(固定的,用use)**
        ```js
            var app = createApp(App)
            app.use(router) // 固定的,注册路由
            app.mount('#app')
        ```
- ==3.根组件App的配置==
  - ==固定的router-view: 作用是让你的路由生效,即在全局都可以通过路由地址正常访问你的组件了,同时根组件加载路由组件,使用插槽,路由中插槽改变为下面的标签了,这也是后续组件动态显示的位置,写几个就显示几个,和原始的slot一样==
    ```html
    <template>
        <div>
            <!-- 全局注册了路由,固定的 -->
            <router-view></router-view>
        </div>
    </template>
    ```
- 4.==测试==
- ==默认5173的地址后会加/#/==
- 访问组件直接按照当时path地址即可,例如访问Films组件,地址 .../#/films , 同理其他的 .../#/cinemas .../#/center,然后对应的组件内容会显示在页面
### history路由模式
- 在index.js文件中的路由函数配置进行变化,即==createWebHashHistory --> createWebHistory,**这个模式和普通的地址一样了,无#,只有 /.../.../** */==
- 但是有个问题,浏览器会把你的路由地址当作真正的服务器地址,然后向后端写的服务器里面去请求这个地址,肯定是找不到的,所以会404 Not Found
- ==解决:== 要解决这个问题，你需要做的就是在你的服务器(告诉后端,服务器是后端写的)上添加一个简单的回退路由。如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面.
- ==解释==: 当我们前端编译好代码后,会打包bulid给后端,告诉后端,如果没有匹配到任何资源,后端就把我提供的index.html渲染在页面上,而这个文件内部的vue路由会接管这些路由地址,服务器的地址搜索权限下放全权交给index.html内部的vue路由处理,提醒下后端即可,这是他们要处理的问题
- ==注意:== vite服务器已经把这个问题消化了,和上面的方法一样,所以在vite中开启的服务器中不会出现这个错误 
- ==总结: 这是后端的事情,但是作为前端你需要知道,只有这样功能才能正常执行==
### 路由懒加载
- 和组件的懒加载一样,对于有些路由的加载不需要第一次进入页面就全部加载出来,等到点击到时,再加载
- 在路由注册的index.js文件中(==看代码即可==)
  ```
    const routes = [
        ......
        {
            path: "/cinemas",
            name: "Cinemas",
            // 087懒加载语法
            component: ()=> import("../views/Cinemas.vue")
        },
        {
            path: "/center",
            alias: "/wode", // 别名: 多一个地址选择
            name: "Center",
            component: ()=> import("../views/Center.vue"),
        }
        ......
    ]
  ```
### 路由的重定向和别名
- 别名: (==给一个组件起第二个名字,两个名字都可以用==)
  ```js
    {
        path:"/center",
        alias: "/wode", // 别名: 多一个地址选择
        name:"Center",
        component:Center
    }
  ```
- 重定向:(==根据一个固定的地址定向一个固定的组件==)
- ==下面代码是解决一个警告的,就是针对'/'地址(初始无地址的5173/#/)没有指向的组件问题,可以直接给地址'/'定向一个组件==
    ```js
    {
        path:"/", 
        redirect:"/films" // 写法1:根据路径找
        // 写法2:根据路由名找,就是routes里面定义的name
        // redirect :{
        //     name:"Films"  
        // }
    },
    ```
    > 这代表,默认地址是Films组件,默认初始页面就是电影页面
- 同时可以配置404(Not Found)页面:
    ```
    {
        path:"/:pathMatch(.*)*", // 404页面,路径都不匹配
        name:"NotFound",
        component:NotFound
    }
    ```
    > 对于所有乱输地址的都显示NotFound组件的页面
### 嵌套路由
- 我们想要在Films页面再写一个嵌套路由,分为"正在热映/即将上映"两个孩子路由,点击相关的标签可以显示相关内容,不过这两个路由组件是在Films内部的
- 效果图:[![pAD3AZn.png](https://s21.ax1x.com/2024/10/31/pAD3AZn.png)](https://imgse.com/i/pAD3AZn)
- index.js(==路由配置文件,只关注Films路由组件的配置==)
    ```js
    // films的孩子
    import Nowplaying from '../views/films/Nowplaying.vue'
    import comingSoon from '../views/films/comingSoon.vue'

    const routes = [
        ....
        {
            path:"/films", // 路径自动映射 #/films
            name:"Films", // 路由名
            component:Films, // 对应Film组件
            // 嵌套路由
            children:[
                {
                    path:"/films/Nowplaying",
                    component:Nowplaying
                },
                {
                    // path:"/films/comingSoon",
                    // 写法2: 他会自动找到父地址,然后组合在一起,不要加/
                    path:"comingSoon",
                    component:comingSoon
                },
                {
                    // 如果想要显示孩子内容,有个方法,就是写重定向(这里我们做了个默认显示,即跳转到films页面默认显示"正在热映"孩子页面)
                    // 在path:"/"的寻找路由时,使用的路径寻找法,而不是名字寻找法
                    // 名字寻找法会卡死在外层父/films,不会进入孩子,路径寻找法,进入/films后会自动在进入孩子,发现进入/films的重定向,又进去了Nowplaying
                    path:"/films",
                    redirect:"/films/Nowplaying"
                }
            ]
        },
        ....
    ]
    ```
    - 1.==创建孩子组件文件==:
    创建Films组件路由的孩子组件,一般我们会在views文件夹内部在创建一个名为films的文件夹,内部装它的两个孩子Nowplaying和comingSoon,这样不容易搞混父子关系
    - 2.==引入孩子组件,并对Films组件进行配置:==
    语法就是children:[...],内部写孩子的地址path和component,和外面的写法一样,==并且配置component有2个写法==
    - 3.==做默认显示,即跳转到films页面默认显示"正在热映"孩子页面:==
    ==写重定向: 重定向寻找vue组件有2个方法,一个是path路径寻找法,一个是名字寻找法,选择第一种==,名字寻找法会卡死在外层父/films,不会进入孩子,路径寻找法,进入/films后会自动在进入孩子,发现进入/films的重定向,又进去了Nowplaying页面

- Films.vue组件内部写对应的html标签,实现点击+跳转到对应的孩子组件(==核心还是上节课的自定义标签==)
    ```
         <ul class="header">
            <!-- 定制化的好处,我们不想让li标签加红色下划线,而是想让字体宽度单独加,那么就再封装一个span标签,然后把css样式加到span标签上即可 -->
            <router-link custom to="/films/Nowplaying" v-slot="{ isActive, navigate }">
                <li @click="navigate"><span :class="isActive ? 'kerwin-active' : ''">正在热映</span></li>
            </router-link>
            <router-link custom to="/films/comingSoon" v-slot="{ isActive, navigate }">
                <li @click="navigate"><span :class="isActive ? 'kerwin-active' : ''">即将上映</span></li>
            </router-link>
         </ul>

        <!-- 留好孩子将来显示的位置 -->
        <router-view></router-view>
    ```
    > ==定制化的好处: 可以把css样式加到任意想加的标签上,就比如上面代码加到了内层span上面==
### 声明式导航+router-link
- 开始逐步实现一个单页面应用的构造,首先完成底部栏,我们在App.vue内部写一个Tabbar组件,用来响应式地控制上面三个vue组件(Films,Cinemas,Center)的显示,==注意Tabbar是App的组件,他在components文件夹内部,而那三个路由组件是在views视图文件夹内部的==
- 原理: Tabbar控制三个组件的显示,组件显示的区域被限制在`<router-view></router-view>`标签内部,
- 效果图: 
    [![pAwGkd0.png](https://s21.ax1x.com/2024/10/25/pAwGkd0.png)](https://imgse.com/i/pAwGkd0)
- App.vue(基本页面结构)
  ```html
    <template>
        <div>
            <!-- 根组件加载路由组件,使用插槽,路由插槽改变了 -->
            <!-- 全局注册了路由,固定的 -->
            <router-view></router-view>
            <!-- 底层导航栏组件 -->
            <Tabbar></Tabbar>
        </div>
    </template>

    <script>
        import Tabbar from './components/Tabbar.vue';
        export default{
            components: {
                Tabbar
            }
        }
    </script>


    <!-- 对所有组件生效 -->
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        ul{
            list-style: none;
        }
    </style>
  ```
  > 额外给全局配置了一些基本的css
  - Tabbar组件代码:(==**关键,点击对应的导航,显示对应的组件**==)
    ```html
        <!-- 下面的标签router-link在main.js全局组件中的app.use(route)已经注册了,根据地址path显示对应组件 to="path" -->
        <ul>
            <li>
                <router-link to="/films" repalce active-class="kerwin-active">电影</router-link>
            </li>
            <li>
                <router-link to="/cinemas" append ="true" active-class="kerwin-active">影院</router-link>
            </li>
            <li>
                <router-link to="/center" active-class="kerwin-active">我的</router-link>
            </li>
        </ul>

        <style>
            .kerwin-active { // 点击导航栏变为红色
                color: red;
            }
        </style>
    ```
    - 代码解释: 
    - **router-link(==vue内置的方法==)**: ==通常渲染为带有正确链接的a标签,参数to="path"==,之后标签会自动给a标签添加path地址,使之点击即可跳转到对应的组件页面
    - replace：该属性的作用是让导航操作使用router.replace()而非router.push()，这意味着不会在浏览器的历史记录里留下记录。
    - append：若设置为true，则会在当前路径后面追加目标路径。
    - ==缺点:a标签的样式不好看,虽然我们可以去掉其样式,但是我们有个更好的自定义标签的方式,即可以让其具有跳转功能,又能自定义自己想要的标签,比如li div标签等,后面讲,属性custom==
    - **active-class**: ==功能为点击对应的标签显示相关css==,vue已经配置了自动增删的class名router-link-active,你也可以改名,active-class="..." ,本代码就把点击显示的css样式的class名改为kerwin-active
  - 改进版(自定义 + 新的scss的style样式)
    ```html
        <ul>
            <router-link custom to="/films" v-slot="{ isActive, navigate }">
            <!-- 使用custom,自定义渲染为li标签 -->
                <li :class="isActive ? 'kerwin-active' : ''" @click="navigate">电影</li>
            </router-link>
            <router-link custom to="/cinemas" v-slot="{ isActive, navigate }">
                <li :class="isActive ? 'kerwin-active' : ''" @click="navigate">影院</li>
            </router-link>
            <router-link custom to="/center" v-slot="{ isActive, navigate }">
                <li :class="isActive ? 'kerwin-active' : ''" @click="navigate">我的</li>
            </router-link>
        </ul>
    ```
    - ==custom 属性的用途是告知 `<router-link>` 组件采用自定义的渲染方式==。一般情况下，`<router-link>` 会渲染成 `<a>` 标签，但使用 custom 属性后，它不会自动渲染成 `<a>` 标签，而是让开发者能够自定义渲染内容,嵌套在router-link内部即可,==这里自定义为li标签==。
    - ==isActive和navigate是router-link内置的==
      - ==isActive==: isActive 是一个布尔值，其作用是指示当前 `<router-link>` 对应的路由是否处于激活状态。Vue Router 会在内部对当前路由的路径和 `<router-link>` 的 to 属性进行比较，若匹配则 isActive 为 true，反之则为 false
      - ==navgate==: navigate 是一个函数，它封装了路由导航的逻辑。当你调用 navigate 函数时，实际上就是在调用 Vue Router 的路由跳转方法（例如 router.push 或者 router.replace）,==用于自定义组件,当不使用router-link,而是搭配custom使用自定义组件(例如li标签),这时候添加上这个回调函数,做跳转操作,原生的router-link不需要==
      > push和repalce区别是前者跳转有回退路径,页面栈+1; 后者是替换,所以不能回退,页面栈+0; 同时push是默认的,replace模式直接在router-link上加repalce即可
    ```css
        // lang即language = scss/less,代表使用相关的css语法 
        // scss需要模块 sass  npm i sass
        // css嵌套语法模块,使得css之间的关系更加显而易见
        <style scoped lang="scss">
            .tabbar {
                position: fixed;
                bottom: 0px;
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;

                ul {
                    display: flex;

                    li {
                        flex: 1;
                    }
                }
            }

            .kerwin-active {
                color: red;
            }
        </style>
    ```
    > ==总结就是css嵌套语法模块,使得css之间的关系更加显而易见==
- ==**总结**==: 实现的效果就是,打开App页面,点击Tabbar底层导航栏,实现上面内容的切换(组件的轮流显示)
- ==效果图:==[![pAD1LqA.png](https://s21.ax1x.com/2024/10/31/pAD1LqA.png)](https://imgse.com/i/pAD1LqA)
- ==额外的,声明式导航也支持传参==
    ```js
      // /user?id=123&name=John
      <router-link :to="{ path: '/user', query: { id: 123, name: 'John' } }"> </router-link>

      <router-link :to="{ path: '/user', query: { id: userId, name: userName } }"></router-link>
    ```
    > 动态传参也行,把id和name的参数换成动态参数即可
- ==支持动态路由url配置==
  ```js
    // 直接写
    <router-link :to="`/user/${userId}`"></router-link>

    // user路由内部 /user/:id
    // 会自动拼接整个url: /user/123
    <router-link :to="{ name: 'user', params: { id: 123 } }"></router-link>
    <router-link :to="{ name: 'user', params: { id: userId } }"></router-link>
  ```

### 编程式导航-选项式$router
- 我们继续制作"正在热映"页面,在正在热映页面中,列出一个列表,显示正在热映的电影,如图[![pADsHtU.png](https://s21.ax1x.com/2024/11/01/pADsHtU.png)](https://imgse.com/i/pADsHtU)
- ==显示"正在热映"电影列表,电影列表为Detail路由组件==
- 先使用**声明式导航**完成这个功能(==相对比编程式导航麻烦一些==)
- 声明式导航: ==跳转到detail路由组件,**需要携带id信息,让详情页面知道你点击的列表哪个内容,从而显示对应的详情页面,也就是说这个Detail路由组件将来要是再精进开发,就要根据不同的id,显示不同电影的详细信息**==
- 先看NowPlaying(正在热映组件)的代码
  ```html
    tem:
    <!-- 在卖座网站,会把filmId作为id传给details路由组件,使用动态状态绑定和字符串标签拼接,例如: /#/detail/6666(filmId) -->
    <router-link custom :to="'/detail/'+item.filmId" v-slot="{ navigate }" v-for="item in datalist" :key="item.filmId">
        <li @click="navigate">{{item.name}}</li>
    </router-link>

    // js:
    // 老样子,使用json文件模拟后端数据
    let res = await axios('/lib/082test.json')
    this.datalist = res.data.data.films
  ```
  > 利用声明式导航的自定义标签写法,自定义了li标签,再利用v-for把所有的电影列出来,==其中给每个li赋值id(后端正好有,为filmId),:to属性动态绑定,需要加id直接使用'+'拼接字符串即可,看看注释,**这个filmId就是我们要传递给Detail路由组件的id信息**==,实现点击电影直接跳转到电影详情页面,最后还去掉了css样式的方法isActive
- ==Detail路由如何接受这个带有参数数据的地址请求,在index.js的注册中需要做更改==
    ```js
    { 
        // :myid是一个占位符(随意起名),后面写任意数据都可以匹配到detail页面
        path:'/detail/:myid',
        name: "Detail",
        component:Detail
    }
    ```
    > ==:myid是一个占位符(随意起名),后面写任意数据都可以匹配到detail页面,这样我们请求的path就不会进入404 NotFound路由组件了,**/detail/地址后面可以加一组任意的数据,这个区域正好放置id**,由此我们实现里携带id数据正常访问Detail路由组件==
    > 1.==没有:myid占位符== : 浏览器请求path /#/detail/5325 --> NotFound.vue (专门负责输入路径错误的路由)
    > 2.==有:myid占位符== : 请求path /#/detail/5325 --> detail路由
    > **注意: 一个占位符只负责一次乱写,如果再 '/XX' ,就需要再加一个占位符在:myid后面** 
    ==**注意此时还没提如何获取这些id,并利用这些id对Detail组件进行后端请求数据,下面会有**==
- ==接下来介绍一个新的写法,**编程式导航,对比声明式导航具有更好的封装,更少的参数**,如下==
    ```html
    <ul>
        <li v-for="item in datalist" :key="item.filmId" @click="handleClick(item.filmId)">
            {{item.name}}
        </li>
    </ul>

    <script>
      // js:
      methods:{
          handleClick(id){
              // 写法1: 路径(/detail/) + 参数(id)写法
              this.$router.push('/detail/' + id) // 或ES6模板字符串 `/detail/${id}`

              // 写法2: 路径(/detail/) + 参数(id)的对象写法
              this.$router.push({
                  name: "Detail", // detail路由在index.js起的名字name
                  params:{
                      myid : id // 携带参数 myid是index设置的占位符,后面的id是形参
                  }
              })

              // 写法3: query传参 '路径+query' (.detail?id=1234) 
              this.$router.push({
                  path:"/detail",
                  query:{
                      myid:id // detail?myid=1234 需要在index.js改改路由配置,因为?...写法不属于myid的占位符位置
                  }
              })
          }
      }
    </script>
    ```
    > tem部分只需要正常的使用v-for把电影名列出来(li标签),然后把具体的携带数据请求放入点击事件中去写,记得提前把filmId传进去
    - ==函数部分有3个写法==
    - 新方法:`this.$router.push()`,==这是一个封装好的函数,**也是携带数据配置路由路径的关键**==
      - ==写法1==: **字符串拼接或ES6模板字符串**
      - ==写法2==: 对象写法,2个参数,一个是detail路由组件设置时定义的name,一个时params内部配置占位符myid的值
        > ==写法1和写法2的最终路由体现均为 /#/detail/1234(filmId)的正常格式,所以其index.js注册的detail路由组件配置无需变化==
      - ==写法3==: 2个参数,第一个参数,不再以name为导向,而是以路径path为导向配置,第二个参数改名为query,内部同理配置myid的值
        > ==**注意:此时配置的携带参数路径已经和写法1,2有所不同了,最终显示在网页上的路径由/#/detail/1234--->/#/detail?myid=1234,所以相应的index.js注册detail的写法也应改变**==
    - ==方法3的index.js新的注册方式:==
        ```
        // query 写法3
        { 
            path:'/detail', // 正常path
            name: "Detail",
            component:Detail
        }
        ```
    - 知识点图片总结:[![pADgd4f.jpg](https://s21.ax1x.com/2024/11/01/pADgd4f.jpg)](https://imgse.com/i/pADgd4f)
    > path和params不能同时出现!!! 
    > 动态路由组合:name+params 或者 传参组合:path+query
- ==阶段总结:以上我们解决了声明式导航和编程式导航如何携带参数进行路由请求,声明式导航直接`to=字符串拼接`,而编程式导航由三个方法,各有千秋,第三个尤为特殊,不同于前面所有的方法,由此引申出的index.js内部的detail路由组件的配置也要响应携带数据的写法,也对应着由2个注册的方法,**接下来介绍detail路由组件如何获取路径中的id(filmId)信息,进而通过ajax请求不同的数据**== 
  - ==接下来只讨论编程式导航的写法,毕竟声明式导航不适合构建这个功能==
  - 针对导航式的方法1和2,写法如下:
    ```
        console.log(this.$route)
        console.log(this.$route.params)
        console.log("接受上一个页面传来的路由路径id,带着id请求后端数据,再渲染页面,id为", this.$route.params.myid)
    ```
    > this.\$route可以只显示当前页面的路由,只打印this.\$route可以发现内部由params和query2个属性,由此我们可以在这两个属性内部获取id,你使用哪一个方法,就在对应的属性里面获取id
  - 方法3 query法的id获取
    ```
        console.log(this.$route) // 看这个对象内部就有params和query两个属性
        console.log(this.$route.query)
        console.log("带着id请求后端数据,再渲染页面,传递的参数id为",this.$route.query.myid)
    ```
- **==大总结: 至此,所有的内容完毕,从携带数据配置路径path(Nowplaying.vue的配置),到detail路由能够正确接受这些路径(index.js的detail路由注册),到最后的detail路由能够接受到传递过来的id(detail.vue的配置)三步走战略完成==**
### query与params区别
- ==params==：==**params 是动态路由参数**==，它会成为 URL 路径的一部分。例如，定义路由 /user/:id，当你通过 `<router-link :to="{ name: 'user', params: { id: 123 } }">` 跳转时，URL 会显示为 /user/123。
- ==query==：==**query 是查询参数**==，它会以键值对的形式附加在 URL 的 ? 后面。例如，通过 `<router-link :to="{ path: '/user', query: { id: 123 } }">` 跳转时，URL 会显示为 /user?id=123。
- ==两者的区别:==
  - 1.**区别1**
  - params：使用 params 时，需要在路由配置里定义对应的动态路由参数
    ```js
    {
      path: '/user/:id',
      name: 'user',
      component: UserComponent
    }
    ```
  - query：使用 query 时，不需要在路由配置里提前定义。无论路由配置是什么，都可以随意传递 query 参数。
  - 2.**区别2**
  - params：如果在路由跳转时没有提供所有必需的 params 参数，或者使用了命名路由但路由配置中缺少对应的参数定义，可能会导致路由跳转失败。
  - query：query 参数的传递相对灵活，即使没有传递某些 query 参数，也不会影响路由跳转
  - 3.**区别3**
  - params：在目标组件中，通过 $route.params 来获取 params 参数。
  - query：在目标组件中，通过 $route.query 来获取 query 参数。
- ==应用场景==
  - 适合使用 params 的场景
    - 标识资源：==当需要通过 URL 来唯一标识某个资源时，适合使用 params==。例如，==在一个博客应用中，每篇文章都有一个唯一的 ID，通过 /article/123 这样的 URL 可以清晰地标识文章的具体内容==。
    - ==路由匹配和 SEO：由于 params 是 URL 路径的一部分，搜索引擎更容易理解和索引这些 URL，有利于搜索引擎优化（SEO）==。同时，路由配置中明确的参数定义有助于框架更准确地匹配路由。
  - 适合使用 query 的场景
    - ==过滤和搜索==：当需要对列表数据进行过滤或搜索时，使用 query 参数比较合适。例如，==在一个商品列表页面，通过 /products?category=electronics&priceRange=100-200== 这样的 URL 可以方便地传递过滤条件。
    - ==可选参数：如果某些参数是可选的，不需要在 URL 中强制显示==，或者参数的数量和组合可能会动态变化，使用 query 更为灵活。例如，在一个新闻列表页面，用户可以选择按照日期、分类等条件进行筛选，这些条件可以作为 query 参数传递。

### VCA与路由+useRoute(r)
- 我们把所有的代码均改为VAC格式了,放入了bak(VAC)文件中
- 具体修改介绍: 
  - router/index.js: 属于js文件,和vue的组合式写法没有关系
  - components/Tabbar.vue: 内部没有script标签,无需修改
  - views/ NotFound + Films + Cinemas,都没有script标签
  - views/films/comingSoon,内部也没有script标签
- ==重点修改地views/Detail.vue:==
  - ==**1.区分好useRoute和useRouter函数**==
  - ==事先引入==: `import { useRoute, useRouter } from 'vue-router';`
  - 1.`const route = useRoute()`
    - **useRoute()**: 返回路由器实例。**相当于在模板中使用 this.$route** (==返回的当前的路由对象,在那个路由内部用,就可以获取哪个路由的实例对象,进而获取这个路由的信息==)
    - ==**$route**: 是用来获取路由信息的==,route是路由信息对象,里面主要包含路由的一些基本信息,==包含当前的路径等。(包括name、meta、path、hash、query、params、fullPath、matched、redirectedFrom)==
  - 获取当前路由的params信息: 
    - (选项式) `this.$route.params`
    - (VCA组合式) `route.params`
    > ==总结: this.$route -> route (记住route是useRoute()函数返回的变量,代表当前路由对象,通过它可以获取当前路由的诸多信息,通过.即可)==
  - 2.`const router = useRouter()`
  - **useRouter()**: 返回路由器实例。**相当于在模板中使用 this.$router**
  - ==\$router==: 是用来操作路由的,\$router对象是全局路由的实例，是router构造方法的实例,包含了一些路由的跳转方法，钩子函数等,例如 .push() .go() .forward() .back() .replace()替换页面等
  - 例子: 回退(返回上一页):
    - (选项式) `this.$router.go(-1)`
    - (组合式) `router.go(-1)`
- 2.==局部定义的生命周期函数变化 views/Center.vue==
  - ==生命周期一样,路由的生命周期钩子函数也被**封装成函数了,需要引入**==
  - 具体变化: ==beforeRouteUpdate -> onBeforeRouteUpdate== 
    ```
    import { onBeforeRouteUpdate} from 'vue-router';

    onBeforeRouteUpdate((to,from) => {
        console.log("更新之前的this,id没变哦,id为", route.params.myid)
        console.log("beforeRouteUpdate,id为", to.params.myid)
    })
    ```
  - 2.beforeRouteLeave -> onBeforeRouteLeave
    ```
    onBeforeRouteLeave(() => {
        const answer = window.confirm("你确定要离开吗?")
        if (!answer) return false
    })
    ```
- 3.==注意特殊地,**beforeRouteEnter()没有组合式写法**==
    - 解决方法: 
      - 方法1: ==全局守卫代替局部守卫去拦截(index.js),没变==
      - 方法2(不推荐): 选项式+组合式写法(不推荐),一个文件只能由一个script标签和一个带setup的script标签
        ```
        <!-- 组合式 -->
        <script setup>
            import { onBeforeRouteLeave } from 'vue-router';

            // VCA的路由组件进入钩子函数(特殊,在组合式中没了)
            // 方法1: 全局守卫代替局部守卫去拦截(index.js),没变
            // 方法2: 选项式+组合式写法(不推荐),一个文件只能由一个script标签和一个带setup的script标签

            // VCA的路由组件离开钩子函数
            onBeforeRouteLeave(() => {
                const answer = window.confirm("你确定要离开吗?")
                if (!answer) return false
            })
        </>

        <!-- 选项式 -->
        <script>
            export default {
                // 进入组件前钩子函数(组件的生命周期),也可以使用async await
                async beforeRouteEnter(to, from, next) {
                    let isAuthenticated = await localStorage.getItem("token")
                    // 有密码,被授权,正常跳转
                    if (isAuthenticated) {
                        next()
                    } else {
                        next({ name: "Login" })
                    }
                }
            }
        </script>
        ```
    - ==也可以和并,只写一个script标签,而setup封装起来,如下==
        ```
        <script>
            import { onBeforeRouteLeave } from 'vue-router';
            export default {
                setup() { // setup组合式区域,仅限此处
                    onBeforeRouteLeave(() => {
                        const answer = window.confirm("你确定要离开吗?")
                        if (!answer) return false
                    })
                },
                async beforeRouteEnter(to, from, next) {
                    let isAuthenticated = await localStorage.getItem("token")
                    // 有密码,被授权,正常跳转
                    if (isAuthenticated) {
                        next()
                    } else {
                        next({ name: "Login" })
                    }
                }
            }
        </script>
        ```
- 4.剩下的修改,除了上面讲到的,还有函数方法,状态定义等VCA写法更更新,具体在views/Nowplaying.vue内部

### 同组件跳转问题
- 承接上一节的内容继续,首先先学习下面相关知识点,如下
- ==我们在detail组件中设置一个回退按钮,实现一个功能,我们看完电影详情页面后,点击返回,又跳转回"正在热映"的电影列表页面==
  ```
    tem:
     <button @click="handleBack">返回</button>
    js:
    handleBack() {
        // 你可以push回去,但是这样重复压栈重复的数据
        // 可以直接用back()方法
        // this.$router.back()

        // 回退1
        this.$router.go(-1)

        // 前进1
        // this.$router.go(1)
        // this.$router.forward()
    }

  ```
  - ==back() go() forward()可以使用的原理:==
    - 之前跳转页面时,this.$router.push()方法会向history栈添加一个新的记录,所以,当用户点击浏览器后退按钮时,会回到之前的URL,
    > vue提供了的这三个方法,和js的原生的用法一样,看注释如上
- **引出案例和问题**: ==我们想要在电影详情页面(detail)页面设置一个区块,为"猜你喜欢",里面又是一个电影列表,如果点击其中一个电影,又会向detail重新发起新的请求,使得页面由现在的电影介绍变为你刚点击的那个电影介绍,相当于在detail页面内部切换了一部新的电影详情==
- 大致效果图:[![pADgZu9.png](https://s21.ax1x.com/2024/11/01/pADgZu9.png)](https://imgse.com/i/pADgZu9)
- ==问题==: 我们发现点击后并没有新的页面出现
- ==原因==: 难点: 点击猜你喜欢,跳转到/detail/1234,问题是执行跳转后,地址栏确实更新了,由于还是在detail组件内,所以detail组件只会在updated()函数中更新下path,而当执行methods时,mounted()已经执行完了,组件也没销毁和重建,这意味着mounted()函数不会再重复执行了,那么mounted()内部ajax请求数据也不会按照新的myid重复请求新的后端数据,最后的结果是点击了猜你喜欢的电影后,页面根本没变,
- ==解决==: 我们需要监听下$route.params的变化,一旦发现变化,再一次执行ajax请求后端的数据,并且携带更新后的myid请求新的数据渲染新电影页面
- 代码:
    ```
        tem:
        <h4>猜你喜欢-详情页面再跳另一个详情页面</h4>
        <ul>
            <li @click="handleClick">电影1</li>
        </ul>

        js:
        methods:{
            handleClick() {
            // 给猜你喜欢的电影push新的地址
            // 直接往固定地址处跳转
            this.$router.push('/detail/1234')
            }
        },
        watch:{
            // 监听"$route.params"的信息,解决问题重新执行新一次的ajax请求
            "$route.params" : function() {
                console.log("接受猜你喜欢传来的参数id,带着id请求后端数据,再渲染页面,id为", this.$route.params.myid)
            }
        }
    ```
### VAC--动态添加路由addRouter()和删除路由removeRouter()
- ==用于动态添加路由。在某些情况下，应用可能需要根据用户权限、业务逻辑或者运行时的配置来添加新的路由规则。==
- **kerwin开发的后台管理系统EleDemo**
  - 假设正在开发一个后台管理系统，不同的用户角色（如管理员、普通用户）有不同的权限。管理员可以访问系统设置页面，而普通用户没有这个权限。当用户登录成功并且被识别为管理员时，可以动态添加系统设置相关的路由。
- 具体语法:
- addRouter():
  - ==可以直接添加写好的路由,无论是变量代替还是直接写addRoute()里面==
  ```js
    const router = createRouter({
        history: createWebHistory(),
        routes: []
    });

    // 普通的路由
    const aboutRoute = {
        path: '/about',
        component: AboutComponent
    };

    router.addRoute(aboutRoute);
  ``` 
  > 这是常规的,创建了一个路由(createRouter),其中routes是空的; 然后配置了一个路由对象aboutRoute; 最后直接给路由对象添加进入这个路由的routes内部,这是最朴素的添加方式
  - ==**给一个已经存在的路由添加子路由(这是kerwin项目的)**==
  - ==语法==: addRoute(ParentRoute,ChildRoute); 第一个参数是父路由,第二个参数是子路由,把子路由添加到父路由下面; 注意这个父路由必须存在
  - 应用: (==截取部分项目代码==)
    ```js

        import { useRouter } from 'vue-router'

        // useRouter也是vue-Router的一个重要方法;别忘了它和useRoute()之间的辨析
        const router = useRouter()

        routes = [
            {
                path:"/index",
                name:"Home",
                component:Home
            },
            {
                path:"/user-manage/list",
                name:"UserList",
                component:UserList
            },
            {
                path:"/right-manage/rolelist",
                name:"RoleList",
                component:RoleList
            },
                ......
        ]

        // checkPermission是检查item是否可以被动态添加到Mainbox路由下
        routes.forEach(item => {
            checkPermission(item) && router.addRoute('Mainbox', item)
        })
    ```
    > 简单的权限登录之动态路由添加,routes是全部的路由信息,不同的用户角色登录可以访问的路由不同,所以使用checkPermission函数先校验这个item路由是否合格,如果合格才会走后面的代码,把这个路由添加到Mainbox路由下(变为Mainbox路由的孩子路由)
    > ==不要忽略useRouter()==,这里和前面的第一个例子不同,第一个例子实打实创建了一个路由(createRouter),所以才可以使用的路由router的addRoute()方法; 但是这里使用了useRouter(),用另一种方式使用了相同效果
- ==removeRoute()方法==
  - ==同步kerwin的EleDemo,他在那个项目中用于删除Mainbox和他的子路由==
  - ==语法==: removeRoute方法用于从当前的路由配置中删除一个路由。它接受一个路由对象或者路由名称（如果路由有名称的话）作为参数。==简单说就是可以直接把路由对象放进去,或者把路由对象的名字属性name放进去==
  - 案例: 删除Mainbox路由(其孩子路由会被一并删除);
    ```js

        import { useRouter } from 'vue-router'
        const router = useRouter()

        // 先删除Mainbox路由和其孩子路由
        router.removeRoute("Mainbox")
        .....
        // 重新添加Mainbox路由
        router.addRouter({
            path:'/mainbox',
            name: "Mainbox",
            component: Mainbox
        })
        // 重新根据用户权限为Mainbox路由添加新的孩子路由
        ....
        routes.forEach(item => {
            checkPermission(item) && router.addRoute('Mainbox', item)
        })
        ....
    ```
    > 这里清除Mainbox和其孩子路由就是为了彻底删除用户的路由登录权限

### 全局路由拦截(选项式)
- 路由拦截的应用场景: 在网页点开一个网站,在没有登录的情况下,点击"我的",页面自动跳出一个登陆界面要你登录,这个场景就需要路由的拦截,试想,如果每个区块都需要登录才能查看,你在这些个路由的每一个都添加一个跳转到登录路由的$router.push(),很臃肿重复,所以设置路由拦截,并限定条件,不符合的路由跳转统一跳到XX处
- ==**全局拦截的文件和位置: router路由文件夹index.js的内部,在const router = createRouter({})和export default router之间**==
- ==**路由守卫核心**(vue2和3一样): `router.beforeEach((to,from,next)=>{...})`,所有的路由跳转之前都会被执行内部的回调函数==
- Vue Router官网的代码介绍(关于登录):
  ```js
    router.beforeEach((to, from, next) => {
        if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
        else next()
    })
  ```
  - ==**注意: 在所有拦截操作之前,记得把Login路由创建,并在index.js文件中引入和注册**==
  - beforeEach函数: 意为着"在每一次路由跳转前执行一次回调函数"
  - 3个参数: 
    - 1. to,跳转目标组件(目的地)
    - 2. from,从哪里跳(出发地)
    - 3. next() 通过,该跳到哪里就哪里
  - if 解释: 当前组件跳转目的地不是登录页面且未被授权,则跳转到登录页面,否则(else),你就正常跳即可
    - to.name就是定义路由的name属性,也可以是to.path,后面就接路由定义的路径path即可
    - isAuthenticated根据自己的功能定义,授权代表着什么全看功能,比如登录中,授权可以意味着"登录状态",未被授权意味着"未登录状态"
    - next({name: ""}): 也是name指向型,和to.name一样,同理可以path
- isAuthenticated赋予意义: ==判断是否登录,查看本地是否存储密码token==
    ```js
    router.beforeEach(async (to, from, next) => {
        let isAuthenticated = await localStorage.getItem("token")
        if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
        else next()
    })
    ```
    ==beforeEach内部可以异步ajax,经典的async + await配合axios请求数据==
    > 注意: 上面的页面是针对所有的页面都进行if判断是否跳转到登录页面
- ==部分页面跳转==
  - 写法1: 涉及一个属性,to.fullPath,通过打印to,我们发现这个对象中的fullPath是目标组件的path地址,==下面的就是只针对路由地址为center的页面进行拦截==
    ```js
    router.beforeEach(async (to, from, next) => {
        let isAuthenticated = await localStorage.getItem("token")
        if (to.name !== 'Login' && !isAuthenticated && to.fullPath === '/center') next({ name: 'Login' })
        else next()
    })
    ```
  - 写法2: ==上面的写法太臃肿了,部分页面如果是好几个,全部堆在if里不好看,推荐下面的写法==
    ```js
    const routes = [
        ....
        {
            path: "/center",
            name: "Center",
            // 定义meta属性
            meta: {
                // 这个名字可以随便起,潜规则是requiredAuth
                requiredAuth: true
            }
        },
        ......
    ]

    const router = createRouter({...})

    router.beforeEach(async (to, from, next) => {
        let isAuthenticated = await localStorage.getItem("token")
        // 每次路由跳转都对路由注册的meta进行检测
        if (to.name !== 'Login' && !isAuthenticated && to.meta.requiredAuth) next({ name: 'Login' })
        else next()
    })

    export default router
    ```
    > 实现逻辑:针对某些页面的优雅写法,还是center组件,看看center组件的注册,==添加新的对象meta,只有center组件的meta.requiredAuth是true,可以进入跳转登录页面的逻辑,其他的组件都是undefined(false),就会跳转到else的逻辑中==,**给需要授权的路径添加==meta属性(固定的)==,requiredAuth的命名是潜规则,可随意起,==添加的路由将会被路由拦截检测==**
- ==afterEach: 了解,意为"路由跳转之后"==,它对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
    ```js
    // 来自Vue Router官网
    router.afterEach((to, from) => {
        // sendToAnalytics(to.fullPath)
        // 比如收集用户的点击量,分析电影的受喜爱程度,然后分析排片量
        console.log("提交后端用户行为信息,在每一次跳转页面之后")
    })
    ```
### 组件内的守卫(局部拦截)
- ==选项式写法==
- 组件内的局部拦截,想在那个路由组件内拦截就写哪里,==有beforeRouteEnter(进入组件之前),beforeRouteUpdate(组件更新之前)和beforeRouteLeave(离开组件之前)三个函数==
- ==**组合式api中没有onBeforeRouteEnter(进入组件前),剩余的2个都有(on+...),所以组合式api想要跳转路由前拦截,推荐使用全局路由守卫router.beforeEach**==
- 本节以下所有代码都是选项式写法,书写位置都在script-export default内部(js区)
> 
- ==**beforeRouteUpdate(组件更新之前)**== : **可以替换"猜你喜欢"功能的watch函数**,在Detail.vue中,把watch部分注释,替换如下
  ```
    beforeRouteUpdate(to,from){
        console.log("更新之前的this,id没变哦,id为",this.$route.params.myid)
        // to 为目标组件,在里面可以访问到我们想要跳转到的页面id
        console.log("beforeRouteUpdate,id为",to.params.myid)
        // ajax携带id请求数据....
    }
  ```
  > 注意点: 这时更新前的函数内部,所以直接this.\$route访问的还是没修改的,所以要借助to参数,看注释,通过to(目的地)访问要跳转页面的id,之后进行ajax操作即可
- ==**有beforeRouteEnter(进入组件之前)**==: 在center.vue路由组件内部,设置一个局部的登录拦截逻辑如下:
    ```
    async beforeRouteEnter(to,from,next){
        let isAuthenticated = await localStorage.getItem("token")
        // 有密码,被授权,正常跳转
        if(isAuthenticated){
            next()
        }else{
            next({name:"Login"})
        }
    }
    ```
    > 进入center组件前,检查本地存储中有没有"token"的密码存储,有就正常进,没有就跳到登录页面
- ==**beforeRouteLeave(组件离开之前)**== : 比如有时候你离开登录面时,弹出一个提示框,问你确定离开吗?或提醒你记住密码等,如下:
    ```
    beforeRouteLeave(){
        const answer = window.confirm("你确定要离开吗?")
        // window.confirm("") 确认框通常用于验证是否接受用户操作,当你点击"确认",确认框返回 true,如果点击"取消",确认框返回false。
        // window.confirm() 方法可以不带上window对象，直接使用confirm()方法。
        // 如果answer为true,那么就离开,如果为false,就留在本页面
        if(!answer) return false
    }
    ```
    > 此代码应用了window的原生方法confirm,推荐自己做个好看的组件

## 自定义指令
### 指令写法
- 指令: 除了v-show,v-for,v-model等,可以自定义的v-XXX,可以获取所附标签的dom节点,并且能获取对节点输入的数据
- ==通常用于对DOM进行底层操作,相当于js获取到dom对象后进行各种底层操作==
- 案例: 给input元素添加自动焦点
- ==1.老方法,ref做法==
  ```html
    <template>
      <div class="app">
        <input type="text" ref="inputRef">
      </div>
    </template>

    <script setup>
    import { onMounted, ref } from 'vue'

    const inputRef = ref()
    // 等待dom节点挂载完后,再获取dom并注入焦点focus()
    onMounted(() => {
      inputRef.value.focus()
    })
    </script>
  ```
  > 通过ref获取到dom节点后,在onMounted中完成自动聚焦
- ==2.指令用法,vue2的选项式写法,局部挂载,**el参数**==
  ```html
    <template>
      <div class="app">
        <input type="text" v-focus>
      </div>
    </template>

    <script>
    // options API (vue2)
    export default {
      directives: {
        focus: {
          // v-focus的标签被挂载后,获取el,el为这个元素的dom节点
          mounted(el) {
            el?.focus()
          }
        }
      }
    }
    </script>
  ```
  > 通过directives挂载,把指令的名字(v-XXX)写在里面,可以多个
- ==3.setup语法糖挂载==
  ```js
    <script setup>
      // setup语法糖内的写法
      const vFocus = {
        mounted(el) {
          el?.focus()
        }
      }
    </script>
  ```
### 指令全局注册
- 指令需要挂载,分为全局和局部,局部已经演示
- ==1.main.js直接挂载==
  ```js
    // 指令全局挂载,指令可能很多,所以抽取一下
    app.directive('focus',{
      mounted(el) {
        el?.focus()
      }
    })
  ```
  > 指令多了会使main.js冗余
- ==2.抽取方法==
- 创建directives文件夹,内部index.js(总领文件)和功能文件(例如focus.js)
- focus.js
  ```js
    export default function directiveFocus (app) {
      // 全局挂载
      app.directive('focus',{
        mounted(el) {
          el?.focus()
        }
      })
    }
  ```
- index.js
  ```js
    import directiveFocus from './focus'

    export default function useDirectives(app){
      // 依次执行全局挂载的指令
      directiveFocus(app)
    }
  ```
  > 可以引入多个指令,依次挂载,只需要在main.js中传入app示例
- main.js
  ```js 
    import useDirectives from './8-cdy/directives'

    // 简化抽取后的挂载
    useDirectives(app)
  ```
  > 只有一行代码,简化抽取
### 指令生命周期函数
- ==指令内部的代码只能写在生命周期函数内部==
- 指令生命周期
  - 1.create: 元素被创建,但是元素的属性和事件应用之前调用
      ```html
        <!-- 比如div已经被创建,但是内部class,@click事件还没有创建监听 -->
        <div class="name" @click="itemClick"></div>
      ```
  - 2.beforeMount/mounted(*): 组件元素被挂载前/挂载后(dom对象所有的东西均被创建)
  - 3.beforeUpdate/updated(*): 组件元素被改变之前/组件元素被改变之后
  - 4.beforeUnmount(*)/unmounted:在卸载父组件之前调用/卸载后调用 (==可以对组件/元素设置v-if测试==)
### 指令参数和修饰符
- vue内置的指令v-model
  ```html
    <Counter v-model:title="message"></Counter>
  ```
  > ==这个title是参数,message是参数值,意为绑定到元素的title属性上==
  > ==如果不写参数,v-model='message',默认绑定到value上,两者都可以通过bindings.value获取这个值==
- 自定义指令示例
  ```html
    <div v-why:name="message">123</div>
  ```
  ```js
    <script setup>
      const message = 'hello world!'
      const vWhy = {
        mounted(el,bindings){
          // bindings.value就是传入的参数值
          console.log(el,bindings)
          el.textContent = bindings.value
        }
      }
    </script>
  ```
- ==2.还可以添加指令的修饰符,例如内置vue指令就有自己的修饰符`.stop .once .lazy`==
- 自定义指令修饰符自己随意加,==用处不大==
  ```html
    <div v-why:name.abc.cba.nba="message">123</div>
  ```
  > 在 mounted 钩子函数中，通过 binding.modifiers 对象来检查是否存在特定的修饰符。若存在相应的修饰符，就为元素设置对应的样式。
### 时间格式化案例
- ==服务器返回时间一般返回时间戳==
- 可以使用自定义指令格式化时间,一种新的格式化时间的方式,之前用的utils内的函数
- ==全局注册自定义组件v-ftime,代码略==
  ```html
    <div class="app">
      <h2 v-ftime="'YYYY/MM/DD'">{{ new Date() }}</h2>
      <h2 v-ftime>{{ new Date() }}</h2>
    </div>
  ```
  ```js
    import dayjs from 'dayjs'
    export default function directiveFtime(app){
      app.directive('ftime',{
        mounted(el,bindings){
          // 获取时间戳
          let timeStamp = el.textContent
          // 获取传入的参数
          let value = bindings.value
          if(!value){
            value = 'YYYY-MM-DD HH:mm:ss'
          }
          // 时间格式化
          const formatTime = dayjs(timeStamp).format(value)
          el.textContent = formatTime
        }
      })
    }
  ```
### 自定义指令的优势
- 比如格式化时间,比之前的utils函数和计算属性等方法简单(vue小项目的宏源旅途),代码简洁
- 在TS+vue3的后台管理系统中,指令还可用于鉴定权限,权限不足的用户看不到一些按钮等
### 过渡效果+案例 X
- ==vue + css3实现动画效果==,有Transition和TransitionGroup两个,本节先讲Transition,这时个组件,内部写的元素会添加css3的动画效果,需要style的配置
- - ==**进入或离开可以由以下的条件之一触发**==
    1.由 v-if 所触发的切换
    2.由 v-show 所触发的切换
    3.由特殊元素 <component> 切换的动态组件
    4.改变特殊的 key 属性 
- ==本节课案例代码只涉及1和2的过渡==
- 代码:(==方法1 transition==)
  ```
    <template>
        <div>
            <button @click="isShow = !isShow">click</button>
            <Transition>
                <!-- 内置组件transition + 插槽 -->
                <!-- 作用是给内部标签在合适时机添加class和删除class -->
                <div v-show="isShow">123456</div>
            </Transition>
        </div>
    </template>

    <style>
        .v-enter-active,
        .v-leave-active {
            /* 还是css3的语法,这里写过渡样式 */
            transition: all 5s ease;
        }

        .v-enter-from,
        .v-leave-to {
            /* 这里写过渡目标 */
            opacity: 0;
            transform: translateX(100px)
        }

        html,
        body {
            overflow-x: hidden;
        }
    </style>
  ```
  - ==代码解释==: 点击按钮使得Transition组件内部的div消失出现子代css3动画效果,==其中style是固定的,如上代码注释,一部分负责写过渡样式,一部分写过渡目标==
- 代码:(animation)
  ```
    <template>
        <div>
            <button @click="isShow = !isShow">click</button>
            <!-- 命名,防止组件混用css样式 -->
            <!-- 添加appear可以实现第一次的自启动 -->
            <Transition name="kerwin" appear mode="out-in">
                <!-- 内置组件transition + 插槽 -->
                <!-- 作用是给内部标签在合适时机添加class和删除class -->
                <!-- Transition组件只允许内部有一个组件或孩子 -->
                <!-- 但是可以这么写,同一时间段只有一个孩子,v-if elif ... else -->
                <!-- mode = out-in/in-out 意为 先出后进/先进后出 -->
                <div v-if="isShow">123456</div>
                <div v-else>00000</div>
            </Transition>
        </div>
    </template>

    <style>
        /* animation写法 */
        /* 改名了所以把 v 全部改为 kerwin */

        /* 进入 */
        .kerwin-enter-active {
            animation: kerwinanimate 1s;
        }

        /* 离开 */
        .kerwin-leave-active {
            animation: kerwinanimate 1s reverse;
        }

        @keyframes kerwinanimate {

            /* 0%->100%是进场动画 */
            0% {
                transform: translateX(100px);
                opacity: 0;
            }

            100% {
                transform: translateX(0px);
                opacity: 1;
            }
        }

        html,
        body {
            overflow-x: hidden;
        }
    </style>
  ```
  - ==代码介绍==
    - 1.Transition的==新属性name="kerwin" |appear |mode="out-in"==
      - name:==命名的,多个Transition的不同样式不会混淆,**具体体现在style的class命名上**==,看代码,原有的2对class样式变为2个,少了一半,==同时v-XX-XX的'v'是改名处,改为kerwin-XX-XX,**这样对应的class样式服务对应的Transition组件的插槽**==
      - appear: 初始化时,即页面第一次加载时,执行一次动画
      - mode: out-in是先出后进,in-out是先进后出,应对的是组件内多个孩子的进出场问题,不写的话,会同进同处的一小段时间内拥挤堆在一起
    - 2.==Transition是不允许同一时间存在多个孩子的,**但是由v-if/elif/else组成的多个孩子就可以和谐地在Transition组件中,因为它们在同一时间只能有一个孩子显示,这是允许的,同时上面的mode属性就是解决这个v-if/else多个孩子进出场拥挤问题的**==
    - 3.annimation正常写语法没变,==只需注意对应的class是进场还是出场即可==
- 代码3(==最简单的一个,引入animate.css组件,看官网教程即可==)
  ```
    <template>
        <div>
            <button @click="isShow = !isShow">click</button>
            <!-- 固定的属性 进入enter-active-class/离开leave-active-class + 网站复制过来的的样式(注意animate__animated是必需品) -->
            <Transition enter-active-class="animate__animated animate__bounceIn" leave-active-class="animate__animated animate__bounceOut"> 
                <div v-if="isShow">123456</div>
            </Transition>
        </div>
    </template>

    <script>
        // 导入animate.css模块
        import 'animate.css';
    </script>
  ```
  > 当年学css3的时候就见过这个animate.css,只需要把它npm下载到本地,==分为进enter-active-class和出leave-active-class两个class==,看着官网配置对应的class名即可获取对应的样式即可,**官网有详细教程**
### 列表过渡 X
- ==TransitionGroup组件内同时容纳多个孩子,最典型的就是v-for==
- 代码:(对06增删列表的案例加动画效果)
  ```
    <template>
    <!-- 增加,删减表单案例 -->
    <div>
        <input type="text" v-model="mytext">
        <button @click="handleAdd">add</button>

        <!-- ... group可容纳多个孩子 -->
        <!-- 还可以实例化成ul标签 -->
        <TransitionGroup tag="ul" name="kerwin">
            <!-- 不加key就没有效果,为了给唯一身份,方便样式操作 -->
            <!-- -->
            <!-- 这样子则不允许我们写相同的item添加进列表 -->
            <!-- 当然我们也可以"item + 时间戳"的组合去杜绝重复id -->
            <li v-for="(item, index) in datalist" :key="item">
                {{ item }} <button @click="handleDel(index)">del</button>
            </li>
        </TransitionGroup>


        <div v-show="datalist.length === 0">暂无数据</div>
    </div>
    </template>

    <script>
    export default {
        data() {
            return {
                mytext: "",
                datalist: ["111", "222", "333"],
            }
        },
        methods: {
            handleAdd() {
                // console.log(this.mytext)
                if (this.mytext === "") { // 不写东西就不添加
                    return
                } else {
                    this.datalist.push(this.mytext)
                    this.mytext = "" // add后清空输入框,双向绑定的优势体现出来了
                }
            },

            handleDel(index) {
                // 删除数组的方法 splice Api
                this.datalist.splice(index, 1)
            }
        }
    }


    </script>

    <style>
    /* animation写法 */
    /* 改名了所以把 v 全部改为 kerwin */

    /* 进入 */
    .kerwin-enter-active {
        animation: kerwinanimate 1s;
    }

    /* 离开 */
    .kerwin-leave-active {
        animation: kerwinanimate 1s reverse;
    }

    @keyframes kerwinanimate {

        /* 0%->100%是进场动画 */
        0% {
            transform: translateX(100px);
            opacity: 0;
        }

        100% {
            transform: translateX(0px);
            opacity: 1;
        }
    }

    html,
    body {
        overflow-x: hidden;
    }

    /* 更加平滑,list不是固定的,改名了就为kerwin-move 和 kerwin-leave-active了 */
    /* 时间长短比动画animation设置的长一点会好看,即删除移走后,选项缓慢填补 */
    .kerwin-move{
        transition: all 1.5s ease;
    }
    .kerwin-leave-active {
    position: absolute;
    }
    </style>
  ```
  - ==代码重点解析==
    - 1.==TransitionGroup可以实例化成ul标签,tag属性后面跟着标签名,可以减少一层嵌套==
    - 2.==**不加key就没有效果**,给唯一身份进行样式操作==
    - 3.==key不能是index索引,涉及diff问题,也不能重复,可以用key+时间戳拼接去设置不重复的key值==
    - 4.为何不能是index,解释如下
        ==**看不懂去看kerwin的课064列表过渡,12min左右**==
      - 如果key值为index, 重温习diff算法,按照索引index对比,相同的复用,不同的重写,没有的删除,最后如果你删除了index=2的项,会有index=1复用,index=2没了,原index=3顶上,和未删减的index=2对比,发现变了,222转为333,然后最后index=3顶上了,删减版对比原数据没有index=3了,遵循没有的删除,index=3会被删除,删除的永远是最后一项,而非你点击的第二项,最后结果是index=1不变,index=2的数值由222变333,index=3被删除(而你del的是index=2哦,发现在diff下,index为key真乱啊,所以确保key的唯一性)
    - 5.==更加平滑的动画改进,也是固定写法,也可以被改名,即v-move和v-leave-active的'v',时间长短比动画animation设置的长一点会好看==
### 可复用过渡 X
- 和我们自己造基于swiper的myswiper组件一样,这次我们基于Transition组件造我们自己的KerwinTransition组件
- 代码(App,父,==导入组件过程略==)
  - ==把动画再次二次封装成动画效果组件 + 插槽==
  - ==组件内核是Transition,所以不要放多个孩子,特指同一时间点==
  ```
    <template>
        <div>
            <button @click="isShow = !isShow">click</button> 
            <!-- 再添加些可以父传子的属性指导 -->
            <!-- ltor = left to right 从左到右的动画 -->
            <!-- rtol = right to left 从右到左的动画 -->
            <KerwinTransition myname="rtol">
                <div v-if="isShow">1234567</div>
            </KerwinTransition>
        </div>
    </template>
  ```

  - 组件KerwinTransition
    - ==给父提供了一个父传子的自定义选择,myname接受父组件信息动态绑定到插槽内的Transition组件name上,从而确定动画位移效果,不同的name对应不同的class名字,在class内部定义不同的css动画==
  ```
    <template>
        <div>
            <Transition :name="myname" appear mode="out-in">
                <slot></slot>
            </Transition>
        </div>
    </template>

    <script>
        export default{
            props:["myname"]
        }
    </script>

    <style>
        /* 进入 */
        /* ltor = left to right 从左到右的动画 */
        /* 同理 rtol = right to left 从右到左的动画 */
        .ltor-enter-active {
            animation: kerwinanimate 1s;
        }

        /* 离开 */
        .ltor-leave-active {
            animation: kerwinanimate 1s reverse;
        }

        @keyframes kerwinanimate {

            /* 0%->100%是进场动画 */
            0% {
                transform: translateX(-100px);
                opacity: 0;
            }

            100% {
                transform: translateX(0px);
                opacity: 1;
            }
        }

        // ----------------------------------

        .rtol-enter-active {
            animation: kerwinanimate2 1s;
        }

        /* 离开 */
        .rtol-leave-active {
            animation: kerwinanimate2 1s reverse;
        }

        @keyframes kerwinanimate2 {

            /* 0%->100%是进场动画 */
            0% {
                transform: translateX(100px);
                opacity: 0;
            }

            100% {
                transform: translateX(0px);
                opacity: 1;
            }
        }

        html,
        body {
            overflow-x: hidden;
        }
    </style>
  ```

## Vue安装插件本质(了解)
- app.use的本质: ==可传入的参数为对象或函数==
  ```js
    // 自动传入app实例
    // 传入对象必须要install属性,属性值必须为函数
    app.use({
      install: function(app){
        console.log('对象的install函数被自动执行',app)
      }
    })
    // 直接传入函数
    app.use(function(app){
      console.log('传入的函数被自动执行',app)
    })
  ```
- 之前的自定义组件函数可以改进一下
  ```js
    // 原来的: useDirectives(app)
    app.use(useDirectives)
  ```
## 响应式原理(面试)






## 内置组件(了解)
### teleport
- 类似于react的Portals,把组件从当前组件树移动到别的组件树下
- ==有2个属性==
  - to: 移动到的指定目标元素,可以使用选择器
  - disabled: 是否禁用teleport功能
  ```html
    <div class="content">
      <div class="item">
        <teleport to="body">
          <Hello></Hello>
        </teleport>
      </div>
    </div>
  ```
  > 把组件挂载到body上面,而不是item里面; 除此之外还可以挂载到其他元素上面,to='#XX/.XX'(id/class)
  > 多个teleport指向同一个,不会覆盖,会合并
### suspense (略)
- 不重要
## 渲染函数(了解)
### 认识h函数(略)
- ==vue推荐绝大多数情况下使用模板templete创建HTML==
- Vue在生成真实的DOM之前，会将我们的节点转换成VNode，而VNode组合在一起形成一颗树结构，就是虚拟DOM（VDOM）
  - 事实上，==我们之前编写的template 中的HTML 最终也是使用渲染函数生成对应的VNode==
  - 那么，如果你想充分的利用JavaScript的编程能力，我们可以自己来编写createVNode 函数，生成对应的VNode,不使用vue的template
- ==h() 函数是一个用于创建vnode的一个函数==
- 其实更准确的命名是createVNode() 函数，简化为 h() 函数,它们本质都一样
- ==使用h函数接受参数(3个)== 
  - 标签名字(div)
  - 属性和值(class: 'name',title: '内容'),
  - 是否有子元素,再写新的createVNode

