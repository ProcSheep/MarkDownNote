## Vuex
### Vuex的引入
- 什么时候使用vuex?(针对需要共享的组件 provide inject)
  - 1.页面多个共享状态(provide+inject) -- 非父子通信
  - 2.缓存异步数据(把从后端请求的数据缓存下来,有需求直接用,不用再次请求),减少后端服务访问
  - ==vuex需要通过npm下载,其中解决了一个vuex不能识别的问题,就是创建一个ts文件,已在"其他"收藏栏中收藏==
- 结构文件: 在src下面创建了个3-vuex的文件夹,专门用来测试vuex,其中再在里面新建文件夹store,创建index.js文件
- ==创建vuex路由**并导出**==(在store-index.js文件)
  ```js
    import { createStore } from 'vuex'

    const store = createStore({
        state(){
            return{
                isTabbarShow:true
            }
        }
    })
    // 导出供main.js文件注册
    export default store

  ```
  > ==这个store就是脱离App之外的全局状态共享文件,App及内部的组件都可以访问到全局store并修改,并且是响应式的,所有其他组件都可以收到修改后的结果,这个return内部的状态是可公开可修改可访问的==
- ==在main.js中,对vuex进行引入,注册==
  ```js
    import { createApp } from 'vue'
    import router from './3-vuex/router'
    import App from './3-vuex/App.vue'
    import store from './3-vuex/store' // 自动去找index.js的文件(如果你这么命名就这样即可)

    var app = createApp(App)

    app.use(router) // 固定的,注册路由插件
    app.use(store) // 注册vuex插件 089
    app.mount('#app')

  ```
- store里面的状态isTabbarShow的挂载(App.vue):
  ```html
    tem:
    <!-- 底层导航栏组件,在components文件夹内部 -->
    <!-- 089 + 一个来自store(vuex)的状态 -->
    <Tabbar v-show="$store.state.isTabbarShow"></Tabbar>
  ```
  > ==使用\$store指向的是const store = createStore({...})的实例对象,然后选择内部的state以及isTabbarShow状态==
- 控制isTabbarShow状态的变化,通过点击事件函数直接修改(==不安全的,下一节开始上保险措施==)
  ```
    //也可以在mounted写,但是我们更早点,在页面加载前就执行
    beforeMount() {
        // 控制store的isTabbarShow
        // 即进入detail页面就隐藏底部的导航
        // 写法1: 方法不安全,这样会乱改
        this.$store.state.isTabbarShow = false 
    },
    // 离开detail页面时再显示
    beforeUnmount() {
        this.$store.state.isTabbarShow = true
    },

  ```
### Vuex-Mutation
- 上一节的代码,不安全,所有的组件都可以乱改,所以添加安全机制,==监控器,Mutation,唯一修改状态的位置,可以监控是谁修改的修改的,何时修改的,存在页面内存中,刷新页面就没了,vue的调试工具可以看vuex情况(但是插件不太好用)==
- ==Mutation的使用方法如下:(在store/index.js)==
  ```js
    const store = createStore({
        state(){
            return{
                isTabbarShow:true
            }
        },
        mutations:{
            showTabbar(state){
                state.isTabbarShow = true
            },
            hideTabbar(state){
                state.isTabbarShow = false
            }
        }
    })
  ```
- 使用mutation里面的函数,改进版,Detail.vue
    ```js
    beforeMount() {
        // 固定的写法: commit(意为'提交')("mutations内的方法")
        this.$store.commit("hideTabbar")
    },
    // 离开detail页面时再显示
    beforeUnmount() {
        this.$store.commit("showTabbar")
    }
    ```
    > 看注释: ==固定的写法: commit(意为'提交')("mutations内的方法")==
- 如果需要操作的函数太多了也不好,所以还可以携带参数,写法3的改进
- store-index.js
    ```js
        mutations里面:
        // 删除showTabbar和hideTabbar函数
        // 写法3: paylood接受一个传参,多个参数就封装对象,数组等
        // 只创建一个函数,接受传参来确定isTabbarShow的值,这样子2个函数精简为了一个,由此类推,可以应用在别的方面上减少函数创建
        changeTabbar(state,paylood){
            state.isTabbarShow = paylood
        }
    ```
- ==最后的最后,有些公司为了更好的对监控器命名,在store下面创建一个type.js文件,专门存名字==,如下
  ```js
    // 多人开发,有时会整理一个文件,总结所有的监视器名字
    // 防止重名等问题,也便于后期维护,接受工作
    // 在index.js中导入

    // detail页面
    // 这样修改也方便,只要改后面的值,前面所有使用CHANGE_TABBAR的名的mutations就都同步改了
    const CHANGE_TABBAR = "changeTabbar" // 书写格式

    // cinema页面
    // .....

    // ....页面

    export {CHANGE_TABBAR}
  ```
- ==在index.js引入type.js==
    ```js
    import {CHANGE_TABBAR} from './type.js'

    // mutations里面:
    // ES6写法 [key] = value ,即[CHANGE_TABBAR] = changeTabbar
    [CHANGE_TABBAR](state,paylood){
        state.isTabbarShow = paylood
    }
    ```
> 这样子处理,在多人开发时,可以具有更好的可维护性,并且不会与其他开发者命名重名
### Vuex-Action
- ==vuex的mutation只能监控同步函数,对于异步函数需要使用action解决,action即可以同步也可以异步,不过主要是异步==
- ==action的优点==: 可以对异步数据缓存,减少服务器压力,只有在刷新页面时才会删除缓存数据
- **案例须知**: 我们修改了在index.js内部请求数据的内容(变为/lib/092test.json),请求了一些电影院的数据,==而我们要做的是在进入cinema页面时判断是否需要请求数据,如果之前请求了且没刷新页面,数据会被缓存下来,则不需要请求,如果没有数据,则需要在store的action内部进行异步请求(axios)==
>
- ==cinema.vue==
    ```js
    tem: 
        <li v-for="data in $store.state.cinemaList" :key="data.filmId">
            {{data.name}}
        </li>

    js:
    mounted() {
        // if 判断store中的影院数据.length === 0 -> 请求数据(index.js的action请求)
        if (this.$store.state.cinemaList.length === 0) {
            // 不过不要在这里axios,会使数据请求和vuex业务分离,要让vuex控制axios请求
            // 找到store/index.js/actions{...}内的函数getCinemaList,也可以传参,如下固定方法
            this.$store.dispatch("getCinemaList", "参数演示")
        } else {
            // 不刷新就不会清空缓存,可以减少请求ajax的次数
            // vuex自动处理了,不需要else,这里只是演示一下
            console.log("缓存")
        }
    }
    ```
- ==index.js(**action负责异步请求电影数据**)==
    ```js
    const store = createStore({
        state() {
            return {
                isTabbarShow: true,
                // 缓存影院数据
                cinemaList: []
            }
        },
        mutations: {
            // state是默认参数,代表state(){}
            // paylood就是正常传参,这里传递的是来自action的axios响应数据
            changeCinemaList(state, paylood) {
                // 给store的状态cinemaList赋值,供Cinemas.vue页面使用
                state.cinemaList = paylood
            }
        },

        actions: {
            // store就是createStore创建的vuex对象
            // paylood是传参(这里是测试来自Cinema.vue的参数)
            // 请求数据 async+await+axios组合
            async getCinemaList(store, paylood) { 
                // 异步工作,还可以缓存请求的数据
                // console.log("actions-ajax参数: ",paylood)
                let res = await axios("/lib/092test.json")
                // 提交给mutations的changeCinemaList,传的参数是请求的响应数据
                store.commit("changeCinemaList", res.data.data.cinemas)
            }
        },
        .......
    })
    ```
- - vuex的流程图: [![pAsEZG9.jpg](https://s21.ax1x.com/2024/11/05/pAsEZG9.jpg)](https://imgse.com/i/pAsEZG9)
> ==复述思维逻辑:==
> 1.在cinema.vue,tem完成基础的'v-for + li'的html界面,其中v-for的参考数据来自store的cinemaList
> 2.在cinema.vue中,一旦进入页面,mounted就会执行一个if逻辑去查看store里状态cinemaList是否为空,如果为空,那么就就请求数据axios,不过请求数据不再此vue文件中,而是在index.js文件中的action内部,使用dispatch调用action内的getCinemaList函数,去它专门负责异步数据的请求,在action的异步数据请求结束后,在提交数据传参给mutation进行store状态cinemaList的赋值工作
> 3.最后cinema.vue的v-for,按着来自store的cinemaList把数据渲染到页面上
- ==精简上面的逻辑(结合图片)==:
    **vue组件cinema** ==--dispatch-->== **action的getCinemaList函数** ==--commit-->== **mutation的changeCinemaList函数** ==--赋值-->== **state的cinemaList** ==--render(渲染)-->== **cinema.vue**
### Vuex-Getter
- ==getters相当于store里面的计算属性,它可以让store接管本属于组件的计算属性功能==
- **案例须知**: 我们做了个select筛选功能,对请求数据的eTicketFlag(0/1)属性进行筛选分类显示不同类别的电影院数据,进而在下面的li渲染相关的数据
- ==传统的计算属性方法==
  - ==cinema.vue==
      ```html
        tem:
          <select v-model="type">
              <!-- 注意: 我们要的最终数据要求是Number型,而非String型 -->
              <option :value="1">App购票</option>
              <option :value="0">前台兑换</option>
          </select>

          <ul>
              <!-- 1.传统的,直接使用计算属性,与store无关 -->
              <!-- 使用store的cinemaList数据,并用计算属性进行select筛选 -->
              <li v-for="data in filterCinemaList" :key="data.filmId">
                  {{data.name}}
              </li>
          </ul>


        js:
            // 传统方式计算属性
            computed:{
                filterCinemaList(){
                    // 按照eTicketFlag筛选,每个数据都有eTicketFlag属性,只有0和1两个值
                    return this.$store.state.cinemaList.filter(item=>item.eTicketFlag === this.type)
                }
            }
    ```
- ==非传统方式,即使用getters接管vue组件的计算属性==
  - ==cinema.vue==
    ```html
    tem:
          <select v-model="type">
              <!-- 注意: 我们要的最终数据要求是Number型,而非String型 -->
              <option :value="1">App购票</option>
              <option :value="0">前台兑换</option>
          </select>

        <!-- 2.让store接管,使用getter下的计算属性函数filterCinemaList,并把type参数传递进去 -->
        <!-- 细看v-for: $store.getters.filterCinemaList为getters第一个返回的箭头函数,此时再加括号调用函数传参type -->
        <!-- 正好给那个箭头函数传参调用了,箭头函数执行完毕后,返回筛选后的数组给v-for做循环 -->
        <!-- 对比直接在cinemas.vue文件中使用计算属性的区别是: 在本地用计算属性,可以直接得到筛选好的数组,而getters方法,会先得到一个箭头函数(第一次return),再给箭头函数传递参数,然后才能的到筛选好的数组(第二次return),这也是为了弥补计算属性不能传递参数的曲线实现方法 -->
        <li v-for="data in $store.getters.filterCinemaList(type)" :key="data.filmId">
            {{ data.name }}
        </li>
    ```
  - ==index.js(getters处理,与action,mutation,state并列的)== 
    ```js
        // getters: store里面的计算属性
        // getter支持传参,在数据查询非常有用,写法有点绕
        getters: {
            // 形参state可以获取store内部的state属性
            filterCinemaList(state) { 
                // 计算属性不支持传递参数,所以我们嵌套个函数在外面,把type参数传递给函数
                // 具体行为: 首先计算属性会返回这个箭头函数,这个箭头函数内部再返回真正的值,其中多套一层函数就是为了传参
                // 具体运作: 看cinemas.vue的li处的注释
                return (type) => {
                    return state.cinemaList.filter(item => item.eTicketFlag === type )
                }
            }
        }
    ```
    > ==计算属性不允许传参,但是这里面多用了一层嵌套函数去给计算属性传参,认真看注释==

### Vuex-辅助函数
- ==**mutation和action进入方法函数栏, state和getters进入计算属性栏**,这是语法糖,目的是简化(this).\$store.XX写法,直接在本组件中使用store的state和方法等,具体有4个,为**mapState,mapGetters,mapActions和mapMutations**==
- 所有语法糖的作用是映射原本在index.js的内容到此组件,使得组件使用它们不必在特意指向store($store)
- ==App.vue **以mapState为例子**==
    ```html
    <div>
        <router-view></router-view>
        <!-- 093 下面的v-show,跟着一长串不够优雅,所以要利用计算属性/mapState去解决它 -->
         <!-- 原本: $store.state.isTabbarShow -->
        <Tabbar v-show="isTabbarShow"></Tabbar>
    </div>

    <script>
    computed:{
        // 下面的这个方法就是上面传统写法的封装,里面数组支持写多个
        // 把store中想要状态写里面进行改装,最后ES6结构赋值进计算属性内部
         ...mapState(['isTabbarShow']),
        // 后面就写一些组件内部的自定义的计算属性即可
         aaa(){
             return 1
         }
    }
    </script>
    ```
    > 内部相当于把index.js的state(){...}部分映射过来,mapState的内部是数组,可以写多个,此组件想要映射哪个组件就写哪个,这个语法糖会把代码封装进对象,我们展开对象(ES6)融入computed,之后再后面写本组件的其他自定义计算属性即可
- ==cinema.vue(**mapActions,mapGetters**)==
  ```js
    computed:{
        ...mapState(['cinemaList']),
        // gettters映射
        ...mapGetters(['filterCinemaList']),
    },
    methods:{
        // 同理会把actions内部的getCinemaList函数映射到本文件中
        ...mapActions(['getCinemaList']),
    }
  ```
  - 对于action的发送: `this.$store.dispatch("getCinemaList", "参数演示` 变为 ` this.getCinemaList('参数演示')`,==不需要dispatch了,已经映射进来了==
  - 对于store内部计算属性的使用: `v-for="$store.getters.filterCinemaList(type)"`变为`v-for="data in filterCinemaList(type)`,也是减少$store.getters这个长长的前缀
- ==Detail.vue(**mapMutation**)==
  ```
    methods: {
        // 针对 this.$store.commit("changeTabbar", true) 向mutation内部提交写法也有语法糖
        // 同理需引入,同理ES6展开使用,内部写CHANGE_TABBAR变量也行(需引入),写"changeTabbar"也行

        ...mapMutations(["changeTabbar"]),

        // mapMutations相当于把index.js的mutations内部的函数func映射过来
        // 语法糖展开就如下面
        // changeTabbar(payLoad) {
        //     this.$store.commit('addAge', payLoad)
        // }
    }
  ```
  > ==**这个更详细地表现了mutation如何映射过来的,看注释**==
    - 对于mutation内部函数的使用由原来的`this.$store.commit("changeTabbar", false)`变为`this.changeTabbar(false)`,==和action使用一样,删除了commit,不再需要提交,已经映射到本组件了,所以"this.XX"直接用即可==


### Vuex-Module
- ==模块化是为了管理和分工较多的store内容,每个子模块都有自己的state,mutation,action,getters==
- 具体模块化的代码如下
- 主index.js
  ```js
        import { createStore } from 'vuex'
        // 引入模块
        import TabbarModule from './module/TabbarModule.js'
        import CinemaModule from './module/CinemaModule.js'

        const store = createStore({
            // 使用模块
            modules:{
                // 简写方式
                TabbarModule,
                CinemaModule
            }
        })

        export default store
  ```
    > 我们在store文件夹内创建新的文件夹module,在内部放入2个子模块TabbarModule.js和CinemaModule.js,内部分别管理Tabbar和Cinema各自的store内容,之后引入,放在一起,看注释代码即可
- ==这么单独截取模块化后会出现问题,代码在this的过程中会多嵌套一层模块的名字==,比如
  - **如果我们不用mapXX语法糖**,==正常访问isTabbarShow状态(state)由`this.$store.state.isTabbarShow`变为`this.$store.state.TabbarModule.isTabbarShow`==,这个是无法改变的,只能这么写
  - 但是我们使用的提交方案: 例如 向mutation提交的`this.$store.commit("changeTabbar", false)`和 向action提交的`this.$store.dispatch("getCinemaList", "参数演示)`==**不会受影响,正常运行,因为派发方法commit dispatch就是挂在到vuex实例上的，和新创建的module没有关系**==
  - ==**如果我们用了mapXX语法糖**==,所有语法糖失灵,因为语法糖是去index.js文件中去寻找相关内容,现在已经打包给子组件了,它找不到,就需要新的知识,==命名空间namespaced,在子模块打开这个属性,true==
- ==**注意:下面的2个子模块内是对象的配置,并不需要createStore({...})**==
- TabbarModule.js
  ```js
    import { CHANGE_TABBAR } from '../type.js' // type.js的路径改改
    // 作为一个对象,之后导出去
    const TabbarModule = {
        // 开启命名空间: 正常使用辅助函数的必要
        namespaced: true,
        state() {
            return {
                isTabbarShow: true,
            }
        },
        mutations: {
            [CHANGE_TABBAR](state, paylood) {
                state.isTabbarShow = paylood
            },
        }
    }

    export default TabbarModule
  ```
- CinemaModule.js
    ```js
      import axios from 'axios'
      // 作为一个对象,之后导出去
      const CinemaModule = {
          // 开启命名空间: 正常使用辅助函数的必要
          namespaced: true,
          state() {
              return {
                  cinemaList: []
              }
          },
          mutations: {
              changeCinemaList(state, paylood) {
                  state.cinemaList = paylood
              }
          },
          actions: {
              async getCinemaList(store, paylood) {
                  let res = await axios("/lib/092test.json")
                  store.commit("changeCinemaList", res.data.data.cinemas)
              }
          },
          getters: {
              filterCinemaList(state) {
                  return (type) => {
                      return state.cinemaList.filter(item => item.eTicketFlag === type)
                  }
              }
          }
      }

      export default CinemaModule
    ```
- 第二部: ==给所有的mapXX指定好是来自哪个子模块的==,参考名字就是index.js的module:{...}内部,具体如下
- ==App.vue==
  ```js
    computed:{
        // 为了正常使用辅助函数,我们在子模块加了命名空间后,在vue中使用辅助函数,需要在前面另加一个命名,这个名字和模块在index.js挂载的名字一样 
        // 它会去TabbarModule模块中去找isTabbarShow
        ...mapState('TabbarModule',['isTabbarShow']),
    }
  ```
- 同理其他的 ==cinema.vue==
  ```js
    computed:{
        // 下面辅助函数全部添加命名空间
        ...mapState('CinemaModule',['cinemaList']),
        ...mapGetters('CinemaModule',['filterCinemaList'])
    },
    methods:{
        ...mapActions('CinemaModule',['getCinemaList']),
    }
  ```
- Detail.vue
  ```js
    methods: {
        // 模块下正常使用辅助函数:
        ...mapMutations('TabbarModule',["changeTabbar"]),
    }
  ```
    > ==如上操作后,所有的语法糖正常使用,**使用语法糖可以规避(this.)$store.XXModule.XX必须嵌套一层模块名的问题**==
    - 额外的(**多此一举,不要这么做**): ==如果定义的了语法糖mapXX还要使用commit和dispatch就需要特别指出模块名字了==,如`this.$store.commit("TabbarModule/changeTabbar", false)`和`this.$store.dispatch("CinemaModule/getCinemaList", "参数演示)`
### Vuex + VCA
- ==事先声明: 作者在发现Vuex在VCA的局限性后,索性重写了个pinia的状态管理库,主要适配方向就是vue3的VCA写法,之后会学,而且是作者推荐的,有点像vite和vue-cli的感觉,vuex迟早变为弃子== 
- ==**已经放入bak(VCA)文件夹内部,以下所有的代码作为VCA的写法,均在script+setup语法糖内**==
- ==useStore()方法的引入: (**替代选项式中的this**==)
  - App.vue
    ```
      tem:
      <div>
          VCA + Vuex
          <router-view></router-view>
          <!-- 获取状态: 模块化写法无法避免的多套一层模块名 -->
          <!-- 不再使用this -->
          <Tabbar v-show="store.state.TabbarModule.isTabbarShow"></Tabbar>
      </div>

      js:
      // 引入useStore方法
      import { useStore} from 'vuex/dist/vuex.cjs.js';
      // 创建对象store
      const store = useStore() // =this.$store
    ```
     > ==useStore()方法的主要作用就是帮助此vue文件获取store对象,从而不必使用this.$store去单独指向store对象,直接就可以store.XX了,**不过如果你的store进行了模块化处理,别忘了多套一层模块的名字,否则vue它找不到模块内部的状态等信息**==
- **拓展**: ==在语法糖setup中,我们不能使用mapXX系列语法糖了,这取决于其内核源代码隐含this,在组合式中,this是无意义的,但是我们可以通过bind的指向来改变其this指向去使用它,**注意:笔记这里的重点不在于如何在语法糖setup中使用mapXX系列,而是在于补全一个关于bind的知识漏洞,更加深刻地认识bind,以及对象这个复杂类型数据,相关的代码数据均会同步到js笔记的bind知识点区**==
  - 首先我们看下mapState的源码:
    ```
      const state = mapState("TabbarModule", ["isTabbarShow"])
      console.log(state.isTabbarShow) 

      --------------源码如下(控制台输出)----------------
      ƒ mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
      var module2 = getModuleByNamespace(this.$store, "mapState"…

    ```
  - (==js/bind知识点的查漏补缺==)插入一个知识点,bing(Obj),将this指向一个新的对象,对象是复杂类型,拥有地址,这样this指向这个地址后,就可以通过this.属性访问对象里面的值了,下面是一个简单的例子
    ```
      let obj = {
          name: 'Example Object',
          showName: function() {
              console.log(this.name);
          }
      };

      let newFunction = obj.showName.bind({ name: 'New Object' });
      newFunction(); // 输出：New Object
    ```
    > ==在这个例子中，obj.showName是一个方法，原本它内部的this指向obj。但是通过bind方法将其绑定到一个新的对象上，新对象中有一个name属性。当调用新的函数newFunction时，它会以新绑定的对象作为this，输出新对象的name属性值==
  - 我们的当务之急是把源码中的this.$store(undefined)给转化为真正的store实例对象,对代码进行如下操作
    ```
      // 但是我们利用js的bind修改指向一个新的对象,这个对象只有一个属性名为$store,他的值为store,this已经指向这个新对象了,所以这个this.$store实际就是obj.$store(假设这个对象我们起名为obj),那么它就等于这个store,所以综上来看,最终源码中的this.$store等同于store(这个store就是通过useStore获取的真正store对象)
      state.isTabbarShow = state.isTabbarShow.bind({ $store: store })
      // 经过指向更改后,计算属性函数内部传入一个回调函数state.isTabbarShow(store的state本身就需要返回),返回isTabbarShow的值
      const isTabbarShow = computed(state.isTabbarShow)
    ```
  - 最后我们在tem内部可以直接使用isTabbarShow
    ```
      <!-- 计算属性+更改bind指向 使用map语法糖 -->
      <Tabbar v-show="isTabbarShow"></Tabbar>
    ```
- 其他VCA的改变,例如在Detail.vue中,我们进出电影详情页面需要隐藏和显示底边栏,所以需要在给mutation的changeTabbar提交布尔参数去控制isTabbarShow,==**但是由于store已经模块化了,所以需要点改动,下面的state和getters的获取,commit和dispatch的提交,这四个重点关注,其中commit和dispatch的方法是统一的,state的获取也比较符合常识,唯独getters内部函数的获取(store的计算属性)有点新颖**==
- Detail.vue(==只显示关键信息,生命周期的VCA写法不再赘述,store上面刚讲了也略==)
  ```
    // 实现功能: 进入Detail组件页面不渲染Tabbar栏,出去后再渲染回来
    // 在页面加载之前,不显示Tabbar栏
    onBeforeMount(()=>{
        // 由于我们定义了在子模块命名空间namespaced,这时候使用commit就需要另外指出模块的名字
        store.commit("TabbarModule/changeTabbar",false) 
    })
    // 当组件销毁前,显示Tabbar栏
    onBeforeUnmount(()=>{
        store.commit("TabbarModule/changeTabbar",true)
    })
  ```
- cinema.vue(==处理筛选数据和请求异步数据的地方==)
- Action请求异步数据,==dispatch和上面的commit的命名一样==,需要另加模块名,如下:
  ```
    // 指挥store请求数据
    onMounted(() => {
        // 同理和App.vue获取isTabbarShow一样,需要多套一层模块名
        if (store.state.CinemaModule.cinemaList.length === 0) {
            store.dispatch("CinemaModule/getCinemaList",'参数演示')
        } else {
            console.log("缓存")
        }
    })
  ```
- 筛选数据我们需要获取store内部的getters函数数据,==**经过打印测试,我们发现getters的获取方式和状态的获取方式略有不同**==
  ```
    // 测试store.getters到底是什么 
    console.log(store.getters)
    // 经测试,要getters内部的filterCinemaList函数,需要如下格式访问
    console.log(store.getters['CinemaModule/filterCinemaList'])
  ```
- 最终,tem中调用getters中filterCinemaList函数,并进行传参
  ```
    <ul>
        <!-- 经过mounted打印测试,发现命名空间下的state和getters访问有所不同 -->
        <!-- 切记不要写成state状态获取格式: store.getters.CinemaModule.filterCinemaList(type) -->
        <li v-for="data in store.getters['CinemaModule/filterCinemaList'](type)" :key="data.filmId">
            {{ data.name }}
        </li>
    </ul>
  ```
  > (==此内容以补充进vuex-Module中==): **如果我们store模块化的同时,还要使用commit和dispatch的话,就必须在==第一个参数最前面另写好模块名==(js文件内部的定义的对象名)**,然后再写模块内具体的内容
### vuex与持久性化插件
- vuex-持久化插件(==pinia也有类似插件==),下载 `npm i vuex-persistedstate`,==来自github,vue支持你自己写组件,这是人家写的一个组件==
- 作用: 有时候为了刷新页面时保留一些数据,比如侧边栏,我们打开了,刷新后,侧边栏又关闭了,这就需要插件帮助,记录你上次的操作,在刷新页面后仍然不变,插件会把对应的信息记录在localStorage中,这样即使你关闭网页再回来也依旧保留一些你上次留下的个性化操作
- 具体用法(也可参照文档)
  ```js
    const store = createStore({
        plugins: [createPersistedState({
            // 限定存储那些信息
            // reducer: (state)=>state.TabbarModule.isTabbarShow

            // 写法2:
            reducer : (state) => {
                return {
                    isTabbarShow: state.TabbarModule.isTabbarShow
                }
            }
        })],
        // 使用模块
        modules:{
            // 简写方式
            TabbarModule,
            CinemaModule
        }
    })
  ```
  > 记录了Tabbar组件isTabbarShow的布尔值,同步进入localstorage,key值为vuex,对应的value就有isTabbarShow的布尔值记录
## pinia
### optionStore的创建
- ==vuex更贴合选项式,而pinia更贴合vue3的组合式写法,pinia是作者的新工具库,要比vuex更加强大,是未来的趋势,是作者向'vue3+组合式写法'的引导,**注意:pinia与vuex实际上没有任何联系**==
- pinia同样支持选项式(option)和组合式(VCA)两个写法,==优先学习选项式写法(由于后期学组合式写法,所以选项式写法封装进bak(optionStore)文件夹里了)==,首先pinia支持多个store开发的,不再像之前的vuex,只有一个js文件统一规划,所以首先在store文件夹中,创建2个js文件CinemaStore.js和TabbarStore.js,==相对比vuex需要模块化,pinia直接可以创建单js文件,不需要引入模块等繁杂动作,**同时记住,所有的访问都不需要多余嵌套模块名了,比如状态state的访问,action函数的调用**==
  >
- ==CinemaStore.js==
  ```js
    import {defineStore} from 'pinia'
    import axios from 'axios'

    const useCinemaStore = defineStore("cinema",()=>{
        state:()=>{
            return{
                cinemaList: []
            }
        },
        actions: {
            // 由箭头函数造成的意外写法
            // getCinemaList: async () => {
            //     let res = await axios("/lib/092test.json")
            //     // 可以直接获取到状态,无需像vuex一样,先提交给mutation,再由mutation提交给state修改,直接一步到位this.XX(state)
            //     console.log(this) // this由于箭头函数的原因,指向父级作用域window上了,直接undefined了
            //     this.cinemaList = res.data.data.cinemas
            //     // console.log(cinemaList) // undefined
            // }

            // 不再支持传递store了
            async getCinemaList(){
                let res = await axios("/lib/092test.json")
                // 可以直接获取到状态,无需像vuex一样,先提交给mutation,再由mutation提交给state修改,直接一步到位this.XX(state)
                console.log(this) // this ES5谁调用这个函数指向谁
                // 学习setupStore后(组合式),就不必为this担忧了
                this.cinemaList = res.data.data.cinemas
            },
        },
        // "筛选0/1 + select"功能
        // store中的计算属性
        getters:{
            // 支持传递状态state,还是嵌套一层函数用于传参
            filterCinemaList(state){
                return (type)=>{
                    return state.cinemaList.filter(item=>item.eTicketFlag === type)
                }
            }
        }

    })

    // 导出
    export default useCinemaStore

  ```
  - ==代码解析:==
    - ==defineStore==: 这是创建pinia下store的关键函数,对于变量的命名潜规则是加'use'前缀,具体参数第一个为这个store的名字,几乎不怎么用,但是不要重复.第二个参数是对象,内部配置状态state,action,getters等
    - 格式: `const useXXX = defineStore("name",{...})`
    - {..}对象配置: 内部就是选项式写法,几乎没变
    - ==需要注意的点==:
      - action内部的函数别写成箭头函数,this的指向很重要
      - getters仍是多嵌套一层return用于传参
  > 
- ==同理TabbarStore.js==
  ```js
        import {defineStore} from 'pinia'

        const useTabbarStore = defineStore("tabbar",{
            // option Store
            // state:()=>{
            //     return {
            //         isTabbarShow: true
            //     }
            // }

            // ES6简写,只有一句话的情况下省略return,不过只返回对象的写法有所不同,因为编译器无法区分函数和对象的{},所以要包在()内部,如下
            state:()=>({
                isTabbarShow: true
            }),
            // getters,actions
            actions:{ // pinia没有mutation
                change(value){
                    this.isTabbarShow = value
                }
            }
        })

        // 记得导出
        export default useTabbarStore
  ```
  > ==讲了一个state的简写,涉及js的ES6的语法常识==
- main.js(==**挂载pinia的地方**==)
  ```js
    import { createApp } from 'vue'
    import { createPinia } from 'pinia'

    const pinia = createPinia()
    var app = createApp(App)

    app.use(router) // 固定的,注册路由插件
    app.use(pinia) // 注册pinia
    app.mount('#app')
  ```
  > 三步走: 引入pinia工具,创建pinia对象,注册pinia对象
### State
- ==初步使用(**App.vue**),我们创建pinia使用的是选项式,但是我们所有的vue中使用的是组合式setup语法糖==
  ```html
    <template>
        pinia
        <div>
            <router-view></router-view>

            <!-- 不同于vuex的模块化,pinia不需要套一层模块名,状态isTabbarShow直接在store里面了 -->
            <Tabbar v-show="store.isTabbarShow"></Tabbar>
        </div>
    </template>


    <script setup>
        import { storeToRefs } from 'pinia';
        import Tabbar from './components/Tabbar.vue'; // 引入Tabbar路由组件不需要注册
        import useTabbarStore from './store/TabbarStore';

        // 调用TabbarStore.js的导出函数useTabbarStore,获取其创建的store对象(pinia)
        const store = useTabbarStore()
        console.log(store)
        // 注意: 生成的store的对象是一个reactive包装的对象,解构出来可以访问到其值,但是没有响应式了(基础知识)
        // 非要解构必须转为ref形式,pinia提供了storeToRefs(需引入)
        const {isTabbarShow} = storeToRefs(store)
    <script/>
  ```
    > 1.==需要isTabbarShow的值,去store文件夹中找含有此状态值的js文件,然后引入并调用方法,**即可获取了那个js文件创建的pinia下的store对象,然后在此vue文件内部可以通过`.`去调用那个js文件内部配置**==,如状态,函数方法,计算属性等信息了
    > ==**注意:** 访问状态直接通过store.isTabbarShow即可访问,不再需要vuex多嵌套一层模块,十分方便,即Tabbar组件可以直接获取TabbarStore.js==
    > 2.==**延伸,看注释**==,有些人想用解构的方法去直接获取状态值,但是由于生成的store的对象是一个reactive包装的对象,不支持响应式,所以pinia提供了storeToRefs方法,帮你转为ref型对象再解构就可以了
- 在Detail.vue(电影详情页面),进出是控制底边栏的隐藏与显示,我们就是用pinia的方式去直接控制isTabbarShow的值,如下
  ```js
    // 引入pinia的store
    import useTabbarStore from '../store/TabbarStore';
    
    // 创建前,进入详情页隐藏底边栏Tabbar
    onBeforeMount(() => {
        store.isTabbarShow = false
    })
    // 销毁前,离开详情页显示底边栏Tabbar
    onBeforeUnmount(() => {
        store.isTabbarShow = true
    })
  ```
  > 在获取TabbarStore.js内部的store对象后,直接通过`.`去更改对象内部state的isTabbarShow的值,简单粗暴,符合常理
- 拓展延伸2个小知识: ==\$patch({})和\$reset()==
  ```js
    onBeforeMount(() => {
        store.$patch({
            isTabbarShow:false
        })
    })
    onBeforeUnmount(() => {
        store.$patch({
            isTabbarShow:true
        })
    })
  ```
  > state补丁api,会把下面的对象作为补丁和TabbarStore.js中state合并,同名的,后来的覆盖先来的,所以也能实现相同的效果
  > 此方法适合一次修改多个状态,对象内写多个对象就行了
- $reset(): 重置: 使状态state变为原来的值
  ```js
    onBeforeMount(() => {
        store.isTabbarShow = false
    })
    onBeforeUnmount(() => {
        store.$reset() // 原来isTabbarShow初始化为true,现在变回去
    })
  ```
### Action
- ==引子==:在vuex中我们异步调取数据必须先去action再去mutation,最后才能改变state,其中mutation是冗余的一个步骤,==所以在pinia中删除了mutation,直接由action接管所有的同步异步处理==,并且可以直接对state进行更改,这也就意味着commit和dispatch都会被删除,前者是因为mutation没了,action向mutation提交数据的方法commit也就跟着没了,后者是,==以后想要调取aciton的方法,也可以向获取状态一样,直接`.`就行,只需要引入对应js文件(store),去获取其内部的action方法即可==
- 接下来学习如何使用action内部的方法(==Cinemas.vue==)
  ```js
    // js: script+setup
    import useCinemaStore from '../store/CinemaStore';

    onMounted(() => {
        if (store.cinemaList.length === 0) {
            // 请求数据
            // 直接调用CinemaStore.js的action方法getCinemaList
            store.getCinemaList() 
        } else {
            console.log("缓存")
        }
    })
  ```
> 获取到CinemaStore.js创建的store后,==其内部的状态cinemaList和action函数方法getCinemaList,直接通过`.`调用即可==

- 同理Detail.vue内部的isTabbarShow状态的改变,也可以由TabbarStore.js内部的action的change函数代理,所以如下
  ```js
    import useTabbarStore from '../store/TabbarStore';

    // 创建前,进入详情页隐藏底边栏Tabbar
    onBeforeMount(() => {
        // action解决,直接store.XX即可,无需嵌套模块名
        store.change(false)
    })
    // 销毁前,离开详情页显示底边栏Tabbar
    onBeforeUnmount(() => {
        store.change(true)
    })
  ```
### Getter
- ==getter就是store里面的计算属性,拿取也是十分方便==
- Cinemas.vue
  ```html
    tem:
        <ul>
            <!-- 直接调用CinemaStore.js的状态cinemaList即可 -->
            <!-- 拿取计算属性也是十分简便,直接.即可 -->
            <li v-for="data in store.filterCinemaList(type)" :key="data.filmId">
                {{ data.name }}
            </li>
        </ul>

    // js:
    import useCinemaStore from '../store/CinemaStore';
  ```
- CinemaStore.js
  ```js
    // defineStore内部
    // computed() 就是 getters
    // 依旧是箭头函数返回一个箭头函数(type)=>{...},而返回的箭头函数需要调用并传递阐述才能在内部返回真正筛选好的值
    // 这个地方的写法稍微注意一下,箭头函数ES6单语句直接返回,省略了一个return
    const filterCinemaList = computed(()=>
        (type)=>{
            // 记得+value
            return cinemaList.value.filter(item=>item.eTicketFlag === type)
        }
    )
  ```
    > 调用方法变简单了,其余没变,双return
### setup-Store(VAC)
- 组合式写store文件,==**在 Setup Store 中：**==
    ==ref() 就是 state 属性==
    ==computed() 就是 getters==
    ==function() 就是 actions==
- CinemaStore.js
  ```js
        import {defineStore} from 'pinia'
        import axios from 'axios'
        import { ref,computed } from 'vue'

        const useCinemaStore = defineStore("cinema",()=>{
            // 内部就是Vue组合式的写法

            // = state
            const cinemaList = ref([])

            // = Action
            const getCinemaList = async()=>{
                let res = await axios("/lib/092test.json")
                cinemaList.value = res.data.data.cinemas
            }

            // computed() 就是 getters
            // 依旧是箭头函数返回一个箭头函数(type)=>{...},而返回的箭头函数需要调用并传递阐述才能在内部返回真正筛选好的值
            // 这个地方的写法稍微注意一下,箭头函数ES6单语句直接返回,省略了一个return
            const filterCinemaList = computed(()=>
                (type)=>{
                    // 记得+value
                    return cinemaList.value.filter(item=>item.eTicketFlag === type)
                }
            )

            return { // cinema.vue无需更改
                cinemaList,
                getCinemaList,
                filterCinemaList
            }

        })

        // 导出
        export default useCinemaStore
  ```
- TabbarStore.js
  ```js
        import { defineStore } from 'pinia'
        import {ref} from 'vue'

        const useTabbarStore = defineStore("tabbar", () => {
            // ref包装 = state
            const isTabbarShow = ref(true)
            // 函数 = Action
            const change = (value)=>{
                isTabbarShow.value = value
            }

            return{ // 你必须在 setup store 中返回 state 的所有属性
                isTabbarShow, // 相关App.vue对于isTabbarShow的使用全都不用改
                change
            }
        })

        // 记得导出
        export default useTabbarStore
  ```
  > 记得除了导出,还要return组合式中定义的状态,函数,计算属性
### 使用Store
- ==使用pinia定义的store==
  ```js
    <script setup>
        import { useCounterStore } from '@/stores/counter'
        // 可以在组件中的任意位置访问 `store` 变量 ✨
        const store = useCounterStore()
    </script>
  ```
  > 注意: ==引入后使用需要**加()**,不要忘记!!!!==
- 一旦 store 被实例化，你可以直接访问在 store 的 state、getters 和 actions 中定义的任何属性。
- store 是一个用 reactive 包装的对象，这意味着不需要在 getters 后面写 .value。就像 setup 中的 props 一样，==我们不能对它进行解构==
- ==useCounterStore.js==
    ```js
    export const useCounterStore = defineStore('counter', () => {
        const count = ref(0)
        const doubleCount = computed(() => count.value * 2)
        function increment() {
            count.value++
        }

        return { count, doubleCount, increment }
    })
    ```
- ==Vue引用useCounterStore.js==
- ==**因为一旦对其结构其属性值就会固定写死,不具备响应性**==
  ```vue
       <script setup>
            import { useCounterStore } from '/stores/useCounterStore.js'
            import { computed } from 'vue'

            const store = useCounterStore()
            // ❌ 这将不起作用，因为它破坏了响应性
            // 这就和直接解构 `props` 一样
            const { name, doubleCount } = store
            // name  将始终是 "Eduardo"
            // doubleCount  将始终是 0
            setTimeout(() => {
            store.increment()
            }, 1000)
            // ✅ 这样写是响应式的
            // 💡 当然你也可以直接使用 `store.doubleCount`
            const doubleValue = computed(() => store.doubleCount)
        </script> 
  ```
  > 具体不能结构,==需要先store(随意起名)获取整个useCounterStore返回的值,然后通过store.xxx去使用里面定义的状态==,注意我们需要响应式的数据是状态,即useCounterStore.js内部使用reactive和ref定义的响应式数据,对于action(函数类型),我们不需要响应式,正常解构使用即可
  > ==在kerwin的elementDeom中center升级战略--个人页面的响应式显示头像和个人资料的时候,就用到了这个知识点==
### 组件外使用pinia
- 单页面应用(==kerwin项目的是第二个路由守卫的示例==)
- ==解释均来自官网==
- 如果你不做任何 SSR(服务器端渲染)，在用 app.use(pinia) 安装 pinia 插件后，对 useStore() 的任何调用都会正常执行：
  ```js
    import { useUserStore } from '@/stores/user'
    import { createPinia } from 'pinia'
    import { createApp } from 'vue'
    import App from './App.vue'

    // ❌  失败，因为它是在创建 pinia 之前被调用的
    const userStore = useUserStore()

    const pinia = createPinia()
    const app = createApp(App)
    app.use(pinia)

    // ✅ 成功，因为 pinia 实例现在激活了
    const userStore = useUserStore()
  ```
  > 为确保 pinia 实例被激活，最简单的方法就是将 useStore() 的调用放在 pinia 安装后才会执行的函数中。
- 让我们来看看这个在 Vue Router 的导航守卫中使用 store 的例子。
  ```js
    import { createRouter } from 'vue-router'
    const router = createRouter({
    // ...
    })

    // ❌ 由于引入顺序的问题，这将失败
    // XXX const store = useStore()
    
    // router.beforeEach((to, from, next) => {
    // 我们想要在这里使用 store
    // if (store.isLoggedIn) next()
    // else next('/login')
    // })

    router.beforeEach((to) => {
    // ✅ 这样做是可行的，因为路由器是在pinia被安装之后开始导航的，
    // 而此时 Pinia 也已经被安装。
    const store = useStore()

    if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
    })
  ```
    > 把pinia的使用写在路由导航内即可
    > ==**总结: 先挂载pinia后使用pinia创建的store**==
### pinia持久化组件
- 和vuex的持久化插件一样,保存一些store信息,防止页面刷新就重置,保存在本地中localStorage
- 如何使用pinia组件(==kerwin的eleDemo路由权限配置==)
- 1.下载(可以从npmjs网站搜文档): `npm i pinia-plugin-persistedstate`
    在main.js配置一下(npmjs官方搜索这个插件的文档用法)
    ```js
      // 只显示插件配置的部分代码 
      import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

      const pinia = createPinia()
      pinia.use(piniaPluginPersistedstate)

      createApp(App)
      .use(pinia)
      .mount('#app')
    ```
- 2.使用,创建一个store的js文件
  存储用户登录信息,pinia持久化管理,创建新store文件useUserStore.js
  ```js
        // pinia动态路由状态管理
        import { defineStore } from 'pinia'
        import { ref } from 'vue'

        export const useUserStore = defineStore("user",()=>{
            const user = ref({}) 
            function changeUser(value){
                user.value = value
            }
            return {
                user,
                changeUser
            }
        },{
            // 使用持久化插件,对此store进行持久化处理,刷新不重置(存在localStore中)
            persist:true
        })
    ```
- 3.在Login.vue中进行测试,首先设置2个按钮,分别为登录管理员和登录教师功能
    之后changeUser会把信息赋值给useUserStore.js的状态user,然后我们就能从本地存储的useUserStore(key),看到user存储的内容了
   ```js
        tem:  Login
        <button @click="handleLogin1">登录管理员</button>
        <button @click="handleLogin2">登录教师</button>

        js:

        import { useUserStore } from '../store/useUserStore';
        // 获取changeUser函数
        const { changeUser } = useUserStore()   

        // 往pinia的useUserStore中传入数据,并把useUserStore使用pinia持久化管理
        const handleLogin1 = () => {
            changeUser({
                "id": 1,
                "username": "admin",
                "password": "123",
                "role": {
                    "roleName": "管理员",
                    "roleType": 1,
                    "rights": [
                        "/index",
                        "/user-manage",
                        "/user-manage/list",
                        "/right-manage",
                        "/right-manage/rolelist",
                        "/right-manage/rightlist",
                        "/tag-manage",
                        "/tag-manage/list",
                        "/interview-manage",
                        "/interview-manage/companylist",
                        "/interview-manage/companydata",
                        "/student-manage",
                        "/student-manage/studentlist",
                        "/student-manage/gradelist"
                    ]
                }
            })
            router.push('/') // 自动跳根路径,之后转到/index
        }

        const handleLogin2 = () => {
            changeUser({
                "id": 2,
                "username": "kerwin",
                "password": "123",
                "role": {
                    "roleName": "讲师",
                    "roleType": 2,
                    "rights": [
                        "/index",
                        "/interview-manage",
                        "/interview-manage/companylist",
                        "/interview-manage/companydata",
                        "/student-manage",
                        "/student-manage/studentlist",
                        "/student-manage/gradelist"
                    ]
                }
            })
            router.push('/')
        }
  ```
  - 效果图:
    [![pAI5Ou8.png](https://s21.ax1x.com/2024/12/02/pAI5Ou8.png)](https://imgse.com/i/pAI5Ou8)

