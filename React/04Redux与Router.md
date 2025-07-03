# Redux
## 理解纯函数
- 函数式编程中有一个概念纯函数 ==(笔记: js高级2)==
- ==纯函数特点==
  - 确定的输入产生确定的输出 -> 要求函数不能依赖外部变量
  - 函数执行过程中不能产生副作用 -> 比如纯函数修改了函数之外的内容
  > 副作用容易产生bug,比如slice截取数组不会对原数组产生影响,而是生成新数组,而splice窃取数组会返回一个新数组,同时也会对原数组修改; 所以slice是一个纯函数而splice不是纯函数,splice可能在无意间产生副作用导致bug
- ==纯函数优势==
  - 安心编写安心使用,写纯函数保证内部逻辑即可,不必关心传入的内容和外部依赖
  - 使用的时候,确保输入内容不会被篡改,确定了输入,就一定有确定的输出
  > ==react要求我们声明函数组件还是类组件,都要遵循'纯函数'原则,每个组件都必须**像纯函数**一样,所以不允许直接对props修改,这样就修改了外部props参数,产生了副作用!==
## 初识redux
- ==**本次演示在react脚手架中,支持ES6语法,同时仅在js文件中演示,没有涉及jsx等react方面,运行在终端`node 文件名`**==
> 
- react的公共状态管理: redux,很像vue-vuex,所以比pinia要复杂!
- 下载: `npm i redux`
  > redux就是公共状态管理的js代码,可以脱离浏览器,react脚手架等,单独在js文件中使用
- redux的组成:
  - store: 存储数据
  - action: 更新数据,通过`dispatch`,action是一个普通js对象,描述这次更新的type和content
  - ==reducer==: 把state和action联系到一起,==reducer是一个新函数,作用是把传入的state和action结合生成一个**新的state**==
### store创建与使用
- 目前的基础演示都是普通js文件,没有react的jsx
- ==store的创建与打印store内的值==
  ```js
    // createStore已弃用,react封装@redux/toolkit工具,后面学习
    import { createStore } from 'redux' 

    // 初始化数据
    const initStore = {
      name: 'coderwhy',
      age: 18
    }

    // 创建store,参数为纯函数
    const store = createStore(reducer)

    export default store
  ```
- 新js文件引入store,并打印里面的值
  ```js
    import store from './store/index.js'

    // 打印store的所有信息(initStore)
    console.log(store.getState())
  ```
### store修改
- 承接上面,修改store中的值,借助dispatch修改
- 可以多次修改,依据修改类型type来分类,修改store值并打印测试
  ```js
    import store from './store/index.js'

    // 修改store --- dispatch 
    // 对象action有2个属性,type类型和content修改内容
    const nameAction = { type: 'change_name', name: 'kiki' }
    store.dispatch(nameAction)
    // 修改后再次打印
    console.log(store.getState())

    // 第二次修改,修改类型不变
    const nameAction2 = { type: 'change_name', name: 'lilei' }
    store.dispatch(nameAction2)
    console.log(store.getState())

    // 第三次修改,新的修改类型add_age
    const nameAction3 = { type: 'add_age', age: 10 }
    store.dispatch(nameAction3)
    console.log(store.getState())
  ```
- ==reducer纯函数的完善==
  ```js
    function reducer(state = initStore, action) {
      // 打印了2次,第一次是创建store,state默认为undefined,可以在传参的地方设置默认参数; action忽略
      // 第二次是dispatch,此时state为初始化的值,action是修改对象
      console.log('reducer', state, action)

      // 修改state,返回值是新的对象,不可以在原state上修改 (纯函数原则)
      // 修改类型为change_name
      if (action.type === 'change_name') {
        return { ...state, name: action.name } // 后面覆盖前面
      }
      // 修改类型为change_age
      if (action.type === 'add_age') {
        return { ...state, age: state.age + action.age }
      }

      // 如果没有修改要求,返回初始化state
      return initStore
    }
  ```
  > reducer根据修改的类型,返回不同的新对象,这些新对象就是修改后的store值,也会作为下一次的state值(reducer的参数1)
### 订阅store数据

```js
    import store from './store/index.js'

    // 订阅store数据,自动监听数据变化
    // 返回值为取消订阅的操作,当退订时,不再监听数据变化
    const unSubscribe = store.subscribe(() => {
      console.log('监测数据变化', store.getState())
    })

    // 修改name 
    store.dispatch({ type: 'change_name', name: 'kiki' })
    store.dispatch({ type: 'change_name', name: 'lilei' })

    // 退订,后面不会再监听数据变化了
    unSubscribe()

    // 修改age
    store.dispatch({ type: 'add_age', age: 10 })

```

### 优化操作
- ==**对前面的所有操作进行优化,目录分类,代码分离**==
- ==1.封装用于生成action的函数==
  ```js
    // action每次自己写很麻烦,封装一个函数
    // 箭头函数简写,仅返回一个对象
    const changeNameAction = (name) => ({
      type: 'change_name',
      name
    })

    // store.dispatch({ type: 'change_name', name: 'kiki' })
    store.dispatch(changeNameAction('kiki'))
  ```
- ==2.type类型统一定义(常量定义,constants.js)==
  ```js
    const CHANGE_NAME = 'change_name'
    const ADD_AGE = 'add_age'

    export {
      CHANGE_NAME,
      ADD_AGE
    }
  ```
- ==3.封装所有action函数进入单独的js文件(actionCreators.js)==
  ```js
    import { CHANGE_NAME, ADD_AGE } from './constants.js'

    export const changeNameAction = (name) => ({
      type: CHANGE_NAME,
      name
    })

    export const changeAgeAction = (age) => ({
      type: ADD_AGE,
      age
    })
  ```
- ==4.reducer函数和初始化数据单独放入此文件(reducer.js)==
  ```js
    import { CHANGE_NAME, ADD_AGE } from './constants.js'

    // 初始化数据
    const initStore = {
      name: 'coderwhy',
      age: 18
    }

    function reducer(state = initStore, action) {
      // 一般不用if,用switch
      switch (action.type) {
        case CHANGE_NAME:
          return { ...state, name: action.name }
        case ADD_AGE:
          return { ...state, age: state.age + action.age }
        default:
          return state
      }
    }

    export default reducer
  ```
- ==5.最后index.js专门用于放store==
  ```js
    import { createStore } from 'redux'
    import reducer from './reducer.js'

    // 创建store,参数为纯函数
    const store = createStore(reducer)

    export default store
  ```
- ==6.修改store==
  ```js
    // 04优化操作.js
    import store from './store/index.js'
    import { changeNameAction, changeAgeAction } from './store/actionCreators.js'

    const unSubscribe = store.subscribe(() => {
      console.log('监测数据变化', store.getState())
    })

    // 修改name 
    store.dispatch(changeNameAction('kiki'))
    // 修改age
    store.dispatch(changeAgeAction(10))
  ```
- ==**总结**==: 
  - index.js: 提供store
  - reducer.js: 抽取reducer函数和state初始化; 
  - actionCreator.js: 生成action的函数
  - constants.js: 常量定义,比如 action对象的type属性
  - 04优化操作.js: 引入store,使用或修改store等操作
  > ==每一个store都有index reducer actionCreator constants四个文件组成,别的网页js文件可以引入store使用修改等==

### Redux原则
- Redux三大原则
  - ==单一数据源==
    - ==整个应用程序的state被存储一颗object tree中,这个object tree只存储在一个store中==
      > 不要奇怪,在学习pinia时我们一般划分多个store分门别类的管理数据,在react中也会类似的分类,但是拆分的是reducer,最后reducer会合并创建一个store(==详见react-redux/redux模块拆分==)
    - Redux并没有强制不让我们创建多个store,但是不利数据维护,==所以一般只有一个store==
    - 单一数据源让state方便维护,跟踪,修改
  - ==state是只读的==
    - ==修改state的唯一方式是Action,别的方式都不行==
    - 保证所有的修改都集中化处理,按照按个顺序执行,不必担心 race condition(竞态问题)
  - ==使用纯函数修改==
    - reducer将旧的state和action联系在一起,==返回新state(不可以原state直接修改)==
    - 随着应用复杂,==reducer可以拆分==,分别操作不同的state tree的一部分
    - 所有的reducer必须是纯函数! 不能产生副作用!
- redux的流程图:
  [![pEOBvge.png](https://s21.ax1x.com/2025/05/10/pEOBvge.png)](https://imgse.com/i/pEOBvge)
  [![pEOBj3D.png](https://s21.ax1x.com/2025/05/10/pEOBj3D.png)](https://imgse.com/i/pEOBj3D)
## react-redux
- ==**正式在react中使用redux,先不使用第三方包,从底层原理了解具体过程,后面使用`react-redux`包**==
- ==把之前写的redux融入到react中==
- 记得安装redux `npm i redux`
### 底层原理
- 案例示范: 两个组件同时共用一个store中的数字num,两个组件均有加减按钮,可以对数字进行更新,无论哪个组件修改num,两个组件都会同步更新num
  [![pEODpDA.png](https://s21.ax1x.com/2025/05/10/pEODpDA.png)](https://imgse.com/i/pEODpDA)
- ==**底层示范,理解原理,重复代码过多,后面会改进**==
- 文件结构: App.jsx引入Home.jsx和Profile.jsx两个组件,这两个组件共享store中的counter数据
- ==1.App引入两个组件==
  ```js
    // App.js
    import Home from './Pages/Home'
    import Profile from './Pages/Profile'
    export class App extends PureComponent {
      render() {
        return (
          <div>
            <Home />
            <Profile />
          </div>
        )
      }
    }
  ```
- ==2.创建store及其系列文件==
  ```js
    // index
    import { createStore } from 'redux'
    import reducer from './reducer.js'

    const store = createStore(reducer)

    export default store
  ```
- 接着创建reducer
  ```js
    import * as actionTypes from './constants'

    // 初始化数据
    const initState = {
      counter: 100
    }

    function reducer(state = initState, action) {
      // 接受dispatch-actions,对state做出对应的修改
      switch (action.type) {
        case actionTypes.ADD_NUM:
          return { ...state, counter: state.counter + action.num }
        case actionTypes.SUB_NUM:
          return { ...state, counter: state.counter - action.num }
        default:
          return state
      }
    }

    export default reducer
  ```
  > 初始化数据counter,然后对不同的dispatch-actions的情况,做出相应的store修改代码
- 补充常量文件的代码
  ```js
    // constants
    export const ADD_NUM = 'add_num'
    export const SUB_NUM = 'sub_num'
  ```
- 创建action函数
  ```js
    // actionCreators
    import * as actionTypes from './constants'

    export const addNumAction = (num) => ({
      type: actionTypes.ADD_NUM,
      num
    })
    export const subNumAction = (num) => ({
      type: actionTypes.SUB_NUM,
      num
    })
  ```
- ==3.组件引入store,并修改store,以Home组件为例子,Profile和它一样==
  ```js
    import React, { PureComponent } from 'react'
    import store from '../store'
    import { addNumAction } from '../store/actionCreators'

    export class Home extends PureComponent {
      constructor() {
        super()
        this.state = {
          // 获取store内的初始化数据---counter
          counter: store.getState().counter
        }
      }

      componentDidMount() {
        // 监听store内的数据变化(暂时没写取消监听)
        store.subscribe(() => {
          const state = store.getState()
          // 发生数据变化时,更新state
          this.setState({ counter: state.counter })
        })
      }
      addNum(num) {
        // 修改store中的值
        store.dispatch(addNumAction(num))
      }

      render() {
        const { counter } = this.state
        return (
          <div>
            <div>Home</div>
            <div>counter: {counter}</div>
            <button onClick={e => this.addNum(10)}> + 10</button>
            <button onClick={e => this.addNum(15)}> + 15</button>
          </div>
        )
      }
    }

    export default Home
  ```
  > 1.组件内的state初始化时可以同步获取store内的counter值,使store与页面state初始化保持一致
  > 2.在Mount生命周期中监听store中的数据变化,一旦数据发生变化,更新页面的state
  > 3.页面的加操作,通过dispatch-actions来修改store中的值

### 获取store数据
- ==把重复代码重构,封装进高阶组件,在业务中有专门的库`react-redux`==
- 下载: `npm i react-redux`
- 在原有基础上,创建新的组件About,同样引入App.jsx,新组件使用react-redux库的方法,快速地实现store内的数据获取
  ```js
    // About
    import React, { PureComponent } from 'react'
    import { connect } from 'react-redux'

    export class About extends PureComponent {
      render() {
        // connect函数在映射时,会把store对应的映射参数存入props,所以直接可以获取
        // 之后store更新的数据也会同步获取
        const { counter } = this.props
        return (
          <div>
            <div>About</div>
            <div>counter: {counter}</div>
          </div>
        )
      }
    }

    // 选择要映射store中的哪些参数,自带state参数
    const mapStateToProps = (state) => ({
      counter: state.counter
    })

    // connect是一个函数,它的返回值是一个高阶组件
    // 高阶组件可以接受组件,它会自动加工传入的组件,这样就可以省略许多之前的重复繁琐步骤
    // 第一个(),首先调用connect函数,传入参数目的是选择映射哪些store参数,store的参数有很多,About组件需要哪些store参数
    // 内部做法 <About {...this.props} {...mapStateToProps} /> 会把默认的props和映射的对象全部以props形式传递给About组件
    // 第二个(),经过映射后,返回一个高阶组件,把About组件放入,高阶组件会根据映射把之前写的底层逻辑代码复现,省事了
    export default connect(mapStateToProps)(About)
  ```
  > 1.使用库中的connect函数,它可以生成一个高阶组件,高阶组件可以帮助我们自动完成之前的繁琐操作
  > 2.理解connect两个()的作用,看注释即可
### 修改store数据
- 修改store数据只能通过`dispatch`,但是可以通过方法集成代码,使得代码更加清晰,冗余减少
- 在学习新的映射,==同理mapStateToProps作为参数传入connect的第一次调用,用于修改store内的值==
  ```js
    import React, { PureComponent } from 'react'
    import { connect } from 'react-redux'
    import { addNumAction, subNumAction } from '../store/actionCreators'

    export class About extends PureComponent {
      render() {
        const { counter } = this.props
        return (
          <div>
            <div>About</div>
            <div>counter: {counter}</div>
            {/* 从props中获取dispatch-actions函数进行调用 */}
            <button onClick={e => this.props.addNum(10)}>10</button>
            <button onClick={e => this.props.subNum(10)}>-10</button>
          </div>
        )
      }
    }

    // 选择要映射store中的哪些参数,自带state参数
    const mapStateToProps = (state) => ({
      counter: state.counter
    })

    // 对dispatch-actions进行映射,自带dispatch参数
    // 内部集成了修改store的dispatch函数
    const mapDispatchToProps = (dispatch) => ({
      addNum(num) {
        dispatch(addNumAction(num))
      },
      subNum(num) {
        dispatch(subNumAction(num))
      }
    })

    // 添加新参数mapDispatchToProps,内部集合了dispatch函数,用于修改store的值,也都映射到props里了
    export default connect(mapStateToProps, mapDispatchToProps)(About)
  ```
 > ==总结connect,第一次调用映射对应state和dispatch,这样配置好后返回对应的定制高阶组件,再进行第二次调用,把About组件放入,由定制的高阶组件生成对应的符合要求的新组件,这个新组件就是底层原理层面上的,之前我们写过的繁琐代码==
### 异步请求数据
- 一个页面请求到异步数据,如何把异步数据更好地共享
  - 1.原生context
  - 2.事件总线eventBus
  - ==**3.store(node高级课讲过)**==
- 请求到数据后,再使用connect传递store的值,比当时的存入pinia-store麻烦一些
- ==相当于练习一次store的存储流程,下面简要示意代码==
- ==1.store区域==
  ```js
    // reducer
    const initState = {
      counter: 100,
      // 新数据
      banners: [],
      recommends: []
    }

    function reducer(state = initState, action) {
      // 接受dispatch-actions,对state做出对应的修改
      switch (action.type) {
        case actionTypes.ADD_NUM:
          return { ...state, counter: state.counter + action.num }
        case actionTypes.SUB_NUM:
          return { ...state, counter: state.counter - action.num }
        // 新的派发数据处理
        case actionTypes.CHANGE_BANNERS:
          return { ...state, banners: action.banners }
        case actionTypes.CHANGE_RECOMMENDS:
          return { ...state, recommends: action.recommends }
        default:
          return state
      }
    }
  ```
  > 初始化新的数据,对新dispatch派发数据进行处理
  ```js
    // actionCreators
    export const changeBannersAction = (banners) => ({
      type: actionTypes.CHANGE_BANNERS,
      banners
    })

    export const changeRecommendsAction = (recommends) => ({
      type: actionTypes.CHANGE_RECOMMENDS,
      recommends
    })
  ```
  ```js
    // constants
    export const CHANGE_BANNERS = 'change_banners'
    export const CHANGE_RECOMMENDS = 'change_recommends'
  ```
  > 定义常量和创建对应的Action的函数
- ==2.组件页面区域==
- Data组件,负责请求异步数据,然后更新到store中
  ```js
    import React, { PureComponent } from 'react'
    import axios from 'axios'
    import { connect } from 'react-redux'
    import { changeBannersAction, changeRecommendsAction } from '../store/actionCreators'

    export class Data extends PureComponent {
      // 在Mount阶段进行网络请求
      componentDidMount() {
        axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
          const banners = res.data.data.banner.list
          const recommends = res.data.data.recommend.list
          // 调用对应映射函数,传入数据
          this.props.changeBanners(banners)
          this.props.changeRecommends(recommends)
        })
      }

      render() {
        return (
          <div>Data-请求数据的页面</div>
        )
      }
    }

    // 派发数据
    const mapDispatchToProps = (dispatch) => ({
      // 派发数据的函数会映射进props,请求数据后调用这些函数传入数据
      changeBanners(banners) {
        // 利用action的函数往store传入数据
        dispatch(changeBannersAction(banners))
      },
      changeRecommends(recommends) {
        dispatch(changeRecommendsAction(recommends))
      }
    })

    // 只需要派发数据,映射dispatch,不需要映射state,所以写null
    export default connect(null, mapDispatchToProps)(Data)
  ```
- 使用异步的数据,About,部分核心代码
  ```js
    const { counter, banners, recommends } = this.props

    // render ...
    <div>Data页面异步请求的数据</div>
        <div>
          <div>轮播图数据</div>
          <ul>
            {
              banners.map((item, index) => {
                return <li key={index}>{item.title}</li>
              })
            }
          </ul>
          <div>推荐列表</div>
          <ul>
            {
              recommends.map((item, index) => {
                return <li key={index}>{item.title}</li>
              })
            }
          </ul>
    </div>
 
    const mapStateToProps = (state) => ({
      counter: state.counter,
      // 监听新的store数据
      banners: state.banners,
      recommends: state.recommends
    })
  ```
### redux-thunk
- 中间件: 目的是在dispatch到达reducer之间,扩展自己的代码,比如记录日志,调试异步接口,添加代码调试功能等
- 官网推荐中间件,比如`redux-thunk`
- ==异步请求数据的位置应当从某个组件内转移进入redux内==
  [![pEOfeY9.png](https://s21.ax1x.com/2025/05/10/pEOfeY9.png)](https://imgse.com/i/pEOfeY9)
  [![pEOfZFJ.png](https://s21.ax1x.com/2025/05/10/pEOfZFJ.png)](https://imgse.com/i/pEOfZFJ)
- ==**解决重点问题:**==
  ```js
    // 普通的action只能返回对象,但是对象拿不到异步请求的数据
    export const fetchHomeMultidataAction = () => {
      axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
        const banners = res.data.data.banner.list
        const recommends = res.data.data.recommend.list
      })

      return {
        banners,
        recommends
      }
    }
  ```
  > 如上,action只能返回对象,然后通过`dispatch({...})`派发数据,但是显然axios请求异步数据返回与return的对象是割裂的,它们没有任何联动,异步请求下,我们也不知道何时获取到数据,本身action就是只能支持同步数据
- ==改进,使用`redux-thunk`第三方库== 下载: `npm i redux-thunk`
- ==这个库支持我们action返回一个函数,并且会自动调用它==
  ```js
    import { applyMiddleware, createStore } from 'redux'
    import reducer from './reducer.js'
    import { thunk } from 'redux-thunk'
    // 增强store,添加中间件thunk,如果还想添加别的中间价继续写即可,applyMiddleware(thunk,xxx,xxx)
    const store = createStore(reducer, applyMiddleware(thunk))

    export default store
  ```
  > 增强后,此store支持action返回函数
- ==记得同步引入新的store==
  ```js
    // 最外层的index.js
    import ReactDOM from 'react-dom/client';
    import { Provider } from 'react-redux';

    import store from './03react-redux库/store'
    import App from './03react-redux库/App';
   
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      // App组件及其子组件可以共享store内的数据
      <Provider store={store}>
        <App />
      </Provider>
    );
  ```
  > ==这里更新store很重要,它决定了Data.jsx映射时参考的store(即默认参数state)==
- 改进action的返回值---函数
  ```js
    // 返回函数,自动调用
    export const fetchHomeMultidataAction = () => {
      // 默认2个参数
      return function (dispatch, getState) {
        // 数据请求: 在redux内进行网络请求操作,不影响组件 
        axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
          const banners = res.data.data.banner.list
          const recommends = res.data.data.recommend.list
          // 数据派发: 同步store数据
          dispatch(changeBannersAction(banners))
          dispatch(changeRecommendsAction(recommends))
        })
      }
    }
  ```
  > 这个函数完成了数据请求和数据派发的操作,所以组件只需要调用一下这个函数即可自动完成所有操作
- Data.jsx
  ```js
    import React, { PureComponent } from 'react'
    import { connect } from 'react-redux'
    // 调用新的action函数
    import { fetchHomeMultidataAction } from '../store/actionCreators'

    export class Data extends PureComponent {
      componentDidMount() {
        this.props.fetchHomeMultidata()
      }

      render() {
        return (
          <div>Data-请求数据的页面</div>
        )
      }
    }

    const mapDispatchToProps = (dispatch) => ({
      fetchHomeMultidata() {
        // 直接调用,返回的函数会自动执行
        dispatch(fetchHomeMultidataAction())
      }
    })

    export default connect(null, mapDispatchToProps)(Data)
  ```
  > 原来的changeBannersAction和changeRecommendsAction + axios删除,直接调用新的action即可
### 开发调试插件
- ==下载扩展==: react-developer-devtools和redux-devtools
- redux-devtools一般看不到,因为redux在开发阶段是开启的,在发布阶段一般是关闭的,防止泄漏数据
- ==redux如何开启与关闭?==
  - 在github上搜索redux-devtools-extension(已迁移redux-devtools),按照文档配置
  - https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
- 配置index.js 增强store
  ```js
    import { applyMiddleware, createStore, compose } from 'redux'
    import reducer from './reducer.js'
    import { thunk } from 'redux-thunk'

    // 安装redux-devtools才可以获取前者,如果没有安装则获取后者compose,额外从redux引入
    // 官方的代码是TS,改为JS 
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        
    // 再次增强applyMiddleware(thunk),与插件融合
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

    export default store
  ```
### redux模块拆分
- ==redux的状态都放在一起(initState),这样修改代码只能统一集中修改,这样容易造成冲突,最好拆分一下,**react拆分的是reducer,不是store**==
  [![pEX62vT.png](https://s21.ax1x.com/2025/05/12/pEX62vT.png)](https://imgse.com/i/pEX62vT)
- ==1.拆分模块==
  - 1.命名模块化文件, modules或features (==可有可无==)
  - 2.分文件夹拆分, /counter 和 /home , 每个部门创建老4样, ==这里的拆分根据功能拆分,自行拆分,/counter负责加减数字,/home负责异步请求数据==
    - 拆分constants和actionCreators,省略,拆分Action生成函数和常量定义代码
    - 拆分reducer.js,拆分对应功能的初始化和switch(对标功能的actions),省略
    - 对模块化文件导出所有信息,index.js(此名方便主文件引入)
      ```js
        import reducer from './reducer.js'

        // 把reducer和action都公开出去
        export default reducer
        export * from './actionCreators.js'
       ```
- ==2.引入拆分的模块合并combineReducers==
  ```js
    import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
    import homeReducer from './home'
    import counterReducer from './counter'
    import { thunk } from 'redux-thunk'

    // 合并2个reducer,combineReducers需要引入
    const reducer = combineReducers({
      counter: counterReducer,
      home: homeReducer
    })

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

    export default store
  ```
- ==3.省略: 文件结构改变,那么页面引入store的路径也对应改变即可,直接引入文件名,对应模块的index.js文件内部已经准备好导出内容了==
- ==**4.重要的,新的store是合并后的,最外层的index.js需要重新引入**==
  ```js
    import ReactDOM from 'react-dom/client';
    import { Provider } from 'react-redux';

    // import store from './03react-redux库/store'
    import store from './04react-redux库 模块化/store'
    import App from './04react-redux库 模块化/App';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      // App组件及其子组件可以共享store内的数据
      <Provider store={store}>
        <App />
      </Provider>
    );
  ```
  > ==这里很重要,About组件和Data组件在映射store的时候,依据的store体系就是这里公开的,不要用用之前的store(03react-redux库/store)==
- ==**5.由于reducer是合并后的,原来的`store.getState()`只能获取到合并对象,获取具体的值还需要再深入一级**==
  [![pEX6g2V.png](https://s21.ax1x.com/2025/05/12/pEX6g2V.png)](https://imgse.com/i/pEX6g2V)
  ```js
    // 深入获取后,代码修改 (Home.jsx/Profile.jsx)
    constructor() {
      super()
      this.state = {
        /* 
          单纯的store.getState()获取的是新的reducer结构,如下
          {counter: {...}, home: {...}}
        */
        counter: store.getState().counter.counter
      }
    }

    componentDidMount() {
      // 监听store内的数据变化(暂时没写取消监听)
      store.subscribe(() => {
        const state = store.getState().counter
        console.log('Home store.getState()', state)
        // 发生数据变化时,更新state
        this.setState({ counter: state.counter })
      })
    }
  ```
- ==5.2 About和Data内部映射也需要改,参数state的结构也同理改变了==
  ```js
    // 选择要映射store中的哪些参数,自带state参数
    const mapStateToProps = (state) => {
      console.log('About Redux state:', state); // 打印 Redux 的完整状态
      return {
        counter: state.counter.counter,
        banners: state.home.banners,
        recommends: state.home.recommends
      }
    }

    const mapStateToProps = (state) => {
      console.log('Data Redux state:', state); // 打印 Redux 的完整状态
      return {
        counter: state.counter.counter
      };
    };
  ```
## ReduxToolkit(RTK)
- 之前使用createStore已经不推荐了,所以使用这个ReduxToolkit体系中的api
- ==ReduxToolkit的目的是简化redux繁琐的步骤==
### 使用RTK
- ==**内容: 了解RTK的作用后,实现counter的数据共享和加减操作**==
- ==下载redux和toolkit工具==: `npm install @reduxjs/toolkit react-redux`
-  ==Redux Toolkit的核心API主要是如下几个==：
   - ==configureStore==：包装createStore以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供的任何Redux 中间件， redux-thunk默认包含，并启用 Redux DevTools Extension。
   - ==createSlice==：接受reducer函数的对象、切片名称和初始状态值，并自动生成切片reducer，并带有相应的actions。
   - ==createAsyncThunk==: 接受一个动作类型字符串和一个返回承诺的函数，并生成一个pending/fulfilled/rejected基于该承诺分派动作类型的thunk
- ==架构: 创建store文件夹,内含features文件夹,这个文件夹内写reducer; 新建index.js文件,这个文件接受reducer并创建store返回出去==
- ==**1.核心用法configureStore**==
- ==configureStore用于创建store对象，常见参数如下==：
  - ==reducer==，将slice中的reducer可以组成一个对象传入此处；
  - middleware：可以使用参数，传入其他的中间件（自行了解,最常用的thunk和redux-devtool已内置）；
  - devTools：是否配置devTools工具，默认为true；
    ```js
      // store内的index.js
      // configureStore替换createStore,这个api优化了好多操作,比如thunk和redux toolkits的增强都封装好了
      import { configureStore } from '@reduxjs/toolkit'
      import counterReducer from './features/counter'

      const store = configureStore({
        reducer: {
          counter: counterReducer
        }
      })

      export default store
    ```
    > 这个store记得在最外层index.js的Provider公开
- ==**2.createSlice,创建一个reducer**==
- ==createSlice主要包含如下几个参数==
  - name：用户标记slice的名词
    - 在之后的redux-devtool中会显示对应的名词；
  - initialState：初始化值
    - 第一次初始化时的值；
  - reducers：相当于之前的reducer函数
    - 对象类型，并且可以添加很多的函数；
    - 函数类似于redux原来reducer中的一个case语句；
    - 函数的参数：
      - 参数一：state
      - 参数二：调用这个action时，传递的action参数；
  - createSlice返回值是一个对象，包含所有的actions；
    ```js
      import { createSlice } from "@reduxjs/toolkit";

      const counterSlice = createSlice({
        name: 'counter',
        initialState: {
          counter: 666
        },
        reducers: {
          // 相当于action函数
          addNum(state, action) {
            // action参数有2个参数,type和payload,type为类型(自动生成),payload可以接受传递的参数
            console.log(action) // {type: 'counter/addNum', payload: 10}
            const { payload } = action
            // 值为上面的state
            state.counter = state.counter + payload
          },
          subNum(state, { payload }) {
            state.counter = state.counter - payload
          }
        }
      })

      // 同时导出内部actions函数
      export const { addNum, subNum } = counterSlice.actions

      // store需要reducer,获取createSlice返回值中的reducer
      export default counterSlice.reducer
    ```
- react与redux的连接还是依靠react-redux,这部分代码不变,redux-toolkit只是简化redux书写流程
  ```js
    import React, { PureComponent } from 'react'
    // react-redux: 连接react与redux
    import { connect } from 'react-redux'
    // 调用Action函数
    import { addNum, subNum } from '../store/features/counter'

    export class Profile extends PureComponent {
      // 调用映射的函数(从props中)
      addNum(num) {
        this.props.addNum(num)
      }
      subNum(num) {
        this.props.subNum(num)
      }

      render() {
        const { counter } = this.props
        return (
          <div>Profile
            {/* 调用映射的state */}
            <div>counter: {counter}</div>
            <button onClick={e => this.addNum(10)}>10</button>
            <button onClick={e => this.subNum(-10)}>-10</button>
          </div>
        )
      }
    }

    // 映射的方法不变
    const mapStateToProps = (state) => ({
      counter: state.counter.counter
    })

    const mapDispatchToProps = (dispatch) => ({
      addNum(num) {
        // 获取从store/counter.js导出的actions函数,dispatch调用
        dispatch(addNum(num))
      },
      subNum(num) {
        dispatch(subNum(num))
      }
    })

    export default connect(mapStateToProps, mapDispatchToProps)(Profile)
  ```
  > 这是Profile页面的代码,Home页面同理,代码略
- ==Redux-Tookit简化了什么?==
  - ==**4个文件变1个**==
  - ==api简化,集成到一起了,比如counterSlice==
  - 一些增强默认开启,thunk/redux-devtool

### RTK异步方式
- ==这里只针对**单个**异步数据(函数)的请求==
- 之前使用增强的thunk请求的轮播图数据,默认RTK已经配置了thunk,接下来学习如何去用
- 还是在RTK内部做异步操作,在Home请求数据,在Profile内部使用
  > ==pages的Home和Profile的流程和之前一摸一样,所以代码略==
- ==RTK的集成api: createAsyncThunk,用于对请求异步数据的action做处理==
  ```js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
    import axios from 'axios'

    // 异步数据请求 
    // createAsyncThunk参数: type类型(自定义,显示在redux-devtool),回调函数(可异步)
    export const fetchHomeMultidataAction = createAsyncThunk('fetch/homemultidata', async () => {
      const res = await axios.get('http://123.207.32.32:8000/home/multidata')

      // 必须返回res.data,axios返回值的res中某些东西做不了序列化,会报错
      // return res X  (当然如果你的axios做过封装,自动.data了,就不必这样了)
      return res.data
    })
  ```
- ==当createAsyncThunk请求数据时,会存在三种状态==
  - pending：action被发出，但是还没有最终的结果
  - fulfilled：获取到最终的结果(有返回值的结果)
  - rejected：执行过程中有错误或者抛出了异常
  > ==我们可以在**createSlice的entraReducer**中监听这些结果==
- ==**新版本下的builder方法(官方推荐)**==
  ```js
    const homeSlice = createSlice({
      name: 'home',
      initialState: {
        banners: [],
        recommends: []
      },
      // 异步派发数据,新版本已统一更新为builder方法,codewhy老师课中的方法已经被弃用
      extraReducers: (builder) => {
        // 参数为state和action,由于redux不可变数据结构,所以state打印不出什么东西,仅需知道state可以获取到这个Slice内的initialState即可
        // action还是type,payload,重要数据存储在payload内部,payload的数据就是createAsyncThunk返回的(return)的数据

        // 3个状态 pending fulfilled rejected, 可以连缀写法 .addCase().addCase()

        // 1.action已发出,还没有结果,action.payload = undefined
        builder.addCase(fetchHomeMultidataAction.pending, (state, action) => {
          console.log('fetchHomeMultidataAction pending', state, action)
        })

        // 2.接受成功
        builder.addCase(fetchHomeMultidataAction.fulfilled, (state, { payload }) => {
          console.log('fetchHomeMultidataAction fulfilled', state, payload)
          // 可以直接对上面的state数据进行修改,不需要非要通过reducers.changeBanenrs/changeRecommends
          state.banners = payload.data.banner.list
          state.recommends = payload.data.recommend.list
        })

        // 3.发生报错,发送失败
        builder.addCase(fetchHomeMultidataAction.rejected, (state, action) => {
          console.log('fetchHomeMultidataAction rejected')
          // 处理错误信息
          if (action.error.message) {
            console.log(action.error)
          }
        })
      }
    })
  ```
  > ==可以直接对state进行修改(builder-fulfilled),不必像之前那样dispatch一些action内的函数,当然也可以这么做,看下面==
- 额外的方法(和之前做法类似)
  ```js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
    import axios from 'axios'

    // 回调函数有2个参数,第一个是调用这个函数的时候传入的参数,第二个参数直接把store传进来了,解构出常用dispatch和getState
    export const fetchHomeMultidataAction = createAsyncThunk('fetch/homemultidata', async (extraInfo, store) => {
      const { dispatch, getState } = store
      const res = await axios.get('http://123.207.32.32:8000/home/multidata')

      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      // 调用reducer函数,更新state内的数据
      dispatch(changeBanners(banners))
      dispatch(changeRecommends(recommends))

      console.log('传递的参数', extraInfo)
    })

    const homeSlice = createSlice({
      name: 'home',
      initialState: {
        banners: [],
        recommends: []
      },
      // 同步派发数据
      reducers: {
        // 给初始化的空数组赋值获取到的异步数据(payload)
        changeBanners(state, { payload }) {
          state.banners = payload
        },
        changeRecommends(state, { payload }) {
          state.recommends = payload
        }
      }
    })
  ```
- 发送参数
  ```js
    // Home.jsx
    const mapDispatchToProps = (dispatch) => ({
      fetchHomeMultidata() {
        dispatch(fetchHomeMultidataAction({ info: '我是传入的参数' }))
      }
    })
  ```
### RTK多个异步请求(*)
- coderwhy老师提供 网络请求函数getHomeGoodPriceData和getHomeHighscoreData已经封装封装,只需知道它会返回请求好的promise对象 (同时`res.data`已经在axios封装处拦截处理了,所以不用`res.data`)
  ```js
      /** 多个异步请求,不建议堆叠await,阻塞进程; 同时不建议写多个createAsyncThunk,维护困难
      *   第一个payload接受参数,当调用fetchHomeDataAction函数时,传递形参就会由parload参数记录
      *   还有第二个参数,action -> {getState,dispatch}
      *   getState可以获取initialState所有的状态,可以获取state使用,但是如果要修改state,必须通过action函数,不可以直接赋值修改!
      */
      export const fetchHomeDataAction = createAsyncThunk('fetchHomeData',(payload, {dispatch}) => {
        getHomeGoodPriceData().then(res => {
          dispatch(changeGoodPriceInfoAction(res)) // 通过action修改state的值
        })
        getHomeHighscoreData().then(res => {
          dispatch(changeHighScoreInfoAction(res)) 
        })
      })

      const homeSlice = createSlice({
        name: 'home',
        initialState: {
          goodPriceInfo: {},
          highScoreInfo: {}
        },
        reducers: {
          changeGoodPriceInfoAction(state,{payload}){
            state.goodPriceInfo = payload
          },
          changeHighScoreInfoAction(state,{payload}){
            state.highScoreInfo = payload
          }
        }
      })
      // 记得导出action函数
      export const {
        changeGoodPriceInfoAction,
        changeHighScoreInfoAction
      } = homeSlice.actions
      export default homeSlice.reducer
    ```
    > 不再通过extraReducers处理异步数据赋值state,而是转用reducers处理
    > ==注意: 如果网络请求都需要传递参数,不建议合并createAsyncThunk,这样传递的参数都集中到payload一个参数内部更加混乱==
### RTK多个异步请求(了解)
- 豆包提供,有需自取
  ```js
    import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
    import axios from 'axios';

    // 创建多个异步 thunk
    export const fetchUsers = createAsyncThunk('users/fetch', async () => { /* ... */ });
    export const addUser = createAsyncThunk('users/add', async (user) => { /* ... */ });
    export const updateUser = createAsyncThunk('users/update', async (user) => { /* ... */ });

    const userSlice = createSlice({
      initialState: {
        entities: [],
        loading: 'idle',
        error: null
      },
      extraReducers: (builder) => {
        // 多个 pending 状态的统一处理
        builder.addMatcher(
          isAnyOf(fetchUsers.pending, addUser.pending, updateUser.pending),
          (state) => {
            state.loading = 'pending';
            state.error = null;
          }
        );
        
        // 多个 fulfilled 状态的统一处理
        builder.addMatcher(
          isAnyOf(fetchUsers.fulfilled, addUser.fulfilled, updateUser.fulfilled),
          (state, action) => {
            state.loading = 'succeeded';
            // 根据不同的 action 类型更新状态
            switch (action.type) {
              case 'users/fetch/fulfilled':
                state.entities = action.payload;
                break;
              case 'users/add/fulfilled':
                state.entities.push(action.payload);
                break;
              case 'users/update/fulfilled':
                const index = state.entities.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                  state.entities[index] = action.payload;
                }
                break;
            }
          }
        );
        
        // 多个 rejected 状态的统一处理
        builder.addMatcher(
          isAnyOf(fetchUsers.rejected, addUser.rejected, updateUser.rejected),
          (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
          }
        );
      }
    });
  ```

### RTK不可变数据
- ==RTK对数据赋值没有拷贝数据,直接进行赋值,为什么?==
- 在react开发中,无论类组件的state还是redux的state都强调数据的不可变性
- ==浅拷贝的也有缺点==
  - 过大对象会造成浪费
  - 深层数据变更依据会对之前的数据产生影响
  > js本身没有直接解决好的api,社区中开发许多库来实现数据不可变
- ==**好用的库,React Toolkit使用immerjs库保证了数据不可变,除此之外还有immutable-js库也挺好用,效果一样**==
- 为了节约内存，又出现了一个新的算法：Persistent Data Structure, 持久化数据结构或一致性
数据结构, 当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会
对内存造成浪费；

### 状态如何管理(总结课)
- ==**react中的state如何管理?,下面是管理方法**==
  - 组件中自己的state管理(this.setState)
  - context状态共享(react的api)
  - redux管理
- ==如何选择?==
  - ==没有标准答案,但是在某些场景下,选择正确的状态管理可以更好地开发应用程序==
- ==**状态选择建议:**==
  - ==组件内的UI组件主题==,在组件内部维护,比如按钮,局部主题颜色等小的,局部的状态
  - ==大部分需要共享的数据(多组件,多页面)==,由redux管理
  - ==从服务器请求的数据由redux管理维护(老师推荐)== 
  > 后期根据项目实际情况会适时调整
### 原理课(暂时略)
- react全家同07/013-014, 有时间再学习!
**connect实现原理(了解/略)**
- connect实际是高阶组件,可以简单实现它来巩固自己的高阶组件的知识,但是涉及源码难度高,非必须
> 
- 全家桶react 08/开头几节课
**打印日志中间件(了解/略)**
**Thunk库核心(了解/略)**
**实现applyMiddleware(了解/略)**


# Router
- ==react-router从5.x的版本到6.x版本有比较大的区别,codewhy老师讲的6.x版本,现在已经7.x版本; 先使用6.x版本==
- 7版本也要求react18.x
- ==**学习过vue-router后,这些路由知识大差不差,很简单**==
## Router基本使用
- 下载版本6: `npm install react-router-dom@6`
- ==主要的组件BrowserRouter或HashRouter==
- ==配置路由模式==
  - BrowserRouter使用history模式；
  - HashRouter使用hash模式 (本次选择这个)
    ```js
      // index.js
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import App from './App';
      // History或Hash模式随意 BrowserRouter HashRouter(*)
      import { HashRouter } from 'react-router-dom'

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <React.StrictMode>
          <HashRouter>
            <App />
          </HashRouter>
        </React.StrictMode>
      );
    ```
    > 组件直接包裹即可实现Hash路由模式
- ==1.路由映射配置==
  - 引入2个组件,Routes包裹所有Route
  - 模拟导航栏-内容-底部栏页面,只有内容会切换
- ==2.路由配置与跳转,Link组件(只渲染a标签)==
  - 在导航栏进行导航设置,点击对应的按钮进行路由跳转
  - 创建2个组件并引入
  ```js
    // App.jsx
    import React, { PureComponent } from 'react'
    import { Routes, Route, Link } from 'react-router-dom'
    import Home from './pages/Home'
    import About from './pages/About'

    export class App extends PureComponent {
      render() {
        return (
          <div className='app'>
            <div className='header'>
              header-顶部
              {/* 路由跳转 */}
              <div className='nav'>
                <Link to="/home">首页</Link>
                <Link to="/about">关于</Link>
              </div>
              <hr />
            </div>
            <div className='content'>
              {/* 组件的映射关系: path <=> Component */}
              <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
              </Routes>
            </div>
            <div className='footer'>
              <hr />
              footer-底部
            </div>
          </div>
        )
      }
    }

    export default App
  ```
  > ==测试路径可以在url栏输入对应的路由,记得加`#`==
- Link的额外属性(了解)
  - repalce: boolean; 替换网页
  - state: any 很少用
  - reloadDocument: boolean; 是否重新加载网页
- NavLink(了解) 
  - 和Link一样需要引入
  - ==对选中的Link添加新的样式==
    ```js
        {/* 自动添加active的className */}
        <NavLink to="/home">首页</NavLink>
        <NavLink to="/about">关于</NavLink>
    ```
    ```css
      .nav .active{
        color: red;
        background-color: yellow;
      }
    ```
    > 一般也很少用,可以根据选中的索引自动添加样式
  - 还可以通过style属性定义css属性,传入函数,会在组件内部的props获取,==很繁琐,不推荐==
    ```js
      {/* style属性,传入函数 */}
      {/* 默认参数是一个对象,解构出isActive,可以获取是否选中当前标签 */}
      <NavLink to="/home" style={({ isActive }) => ({ color: isActive ? "red" : "", backgroundColor: "yellow" })}>首页</NavLink>
      <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? "red" : "", backgroundColor: "yellow" })}>关于</NavLink>
    ```
  - 还可以动态修改className名字,不再自动添加active
    ```js
      {/* 动态加className */}
      <NavLink to="/home" className={({ isActive }) => isActive ? 'link-active' : ''}>首页</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'link-active' : ''}>关于</NavLink>
    ```
## Navigate导航重定向
- ==登录网页的重定向==
- Navigate用于重定向,自动跳转到to后的路径中,==这个组件不用于显示,只要应用立即执行==,记得引入
  ```js
    // login.jsx
    import React, { PureComponent } from 'react'
    // 记得引入
    import { Navigate } from 'react-router-dom'

    export class Login extends PureComponent {
      constructor() {
        super()
        this.state = {
          isLogin: false
        }
      }

      login() {
        this.setState({
          isLogin: true
        })
      }

      render() {
        const { isLogin } = this.state
        return (
          <div>Login
            {!isLogin ? <button onClick={e => this.login()}>登录</button> : <Navigate to="/home" />}
          </div>
        )
      }
    }

    export default Login
  ```
- ==首页的重定向和Not Found重定向==
  - 1.初始进入网页是`/`,给重定向到`/home`中去
  - 2.不存在的页面,访问到`/Not Found`
  ```js
    <div className='content'>
      {/* 组件的映射关系: path <=> Component */}
      <Routes>
        {/* 初始页面重定向 */}
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        {/* 放在最后面,*代表统配,前面的都没匹配,最后由NotFound页面匹配这个不存在的页面 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  ```
## 路由嵌套
- 1.在Home路由内嵌套2个导航路由,HomeRecommend和HomeRanking
- 2.完善home页面重定向,即进入home页面,自动定向导航页的第一个部分(HomeRecommend)
    ```js
      <Route path='/home' element={<Home />}>
        {/* 一旦匹配到home,重定向到home/recommend,自动选择一个子路由显示 */}
        <Route path='/home' element={<Navigate to='/home/recommend' />} />
        {/* 嵌套路由,配置home子路由 */}
        <Route path='/home/recommend' element={<HomeRecommend />} />
        <Route path='/home/ranking' element={<HomeRanking />} />
      </Route>
    ```
- 3.为这两个嵌套路由提供Link跳转
- 4.设置占位组件(类似vue中的router-view)
    ```js
       render() {
        return (
          <div>Home
            <div className='home-nav'>
              <Link to='/home/recommend'>推荐</Link>
              <Link to='/home/ranking'>排行榜</Link>
              {/* 占位组件,类似vue中的router-view,给子组件显示的位置 */}
              <Outlet></Outlet>
            </div>
          </div>
        )
      }
    ```
## useNavigate与类组件
- ==这是Hooks函数,只能在函数组件内使用; 代替之前的Link组件(它是a标签),实现更多标签的跳转,比如div,button==
- ==**虽然不支持类组件使用,但是可以利用高阶组件(函数)实现在类组件中使用useNavigate**==
- **1.正常在==函数组件==内使用流程**
  ```js
    navigateTo(path) {
      console.log(path)
      const navigate = useNavigate()
      navigate(path) // 获取的返回值是一个函数,调用函数传入路径(string),实现跳转
    }

    // render ...
    <button onClick={e => this.navigateTo('/home/songmenu')}>歌单</button>

  ```
- navigate额外的参数
  ```js
    // 看源码中的返回值TS,2种写法如下
    // 跳转+替换网页
    navigate('/home',{replace: true})
    navigate(-1) // 跳回上一级
  ```
- ==高阶组件封装withRouter,具有复用性,只要想要使用useNavigate函数的类组件,增强一下即可使用,然后类组件Home就可以正常使用==
  ```js
    // Home.jsx  render...
    navigateTo(path) {
      console.log(path)
      // 高阶组件传入了navigate函数
      const { navigate } = this.props.router
      navigate(path)
    }

    render() {
      return (
        <div>Home
          <div className='home-nav'>
            <Link to='/home/recommend'>推荐</Link>
            <Link to='/home/ranking'>排行榜</Link>
            {/* 非Link跳转,使用高阶函数搭配useNavigate实现跳转 */}
            <button onClick={e => this.navigateTo('/home/songmenu')}>歌单</button>
            {/* 占位组件,类似vue中的router-view,给子组件显示的位置 */}
            <Outlet></Outlet>
          </div>
        </div>
      )
    }

    // 高阶组件,接受函数,返回新组件
    function withRouter(WrapperComponent) {
      // 函数组件
      return function (props) {
        // 函数组件可以使用Hooks,然后把获取的返回值传入类组件
        const navigate = useNavigate()
        // 往prop.router传入对象
        const router = { navigate }
        return <WrapperComponent {...props} router={router} />
      }
    }

    // 对组件进行增强
    export default withRouter(Home)
  ```
- 最后,可以把此高阶组件统一封装进/hoc/with_router.js,别的类组件使用这个高阶组件直接引入使用即可
  ```js
    // /hoc/with_router.js
    import { useNavigate } from 'react-router-dom'
    // 高阶组件,接受函数,返回新组件
    export default function withRouter(WrapperComponent) {
      // 函数组件
      return function (props) {
        // 函数组件可以使用Hooks,然后把获取的返回值传入类组件
        const navigate = useNavigate()
        // 往prop.router传入对象
        const router = { navigate }
        return <WrapperComponent {...props} router={router} />
      }
    }
  ```
  ```js
    // /hoc/index.js
    import withRouter from "./with_router";
    export {
      withRouter
    }
  ```
- 直接引入即可
  ```js
    // Home.jsx
    import { withRouter } from '../hoc'
  ```
- ==router转向Hooks的趋势:==
  - 在5版本还是有官方api增强高阶组件的,但是6版本删除了,这说明了大趋势靠向函数式编程+Hooks,而不是传统的类组件+高阶组件了
## query传参和动态路由
- 两个经典传参方式,一起讲解; 配置路由和跳转Link均在App.jsx
- ==1.传递id信息,动态路由==
- 1.2 注册路由,设置占位符
  ```js
    {/* 动态路由 */}
    <Route path='/detail/:id' element={<Detail />} />
  ```
- 1.3 跳转时,信息放在路径后面即可,跳转到Detail页面
  ```js
    {/* 动态路由 params */}
    <Link to='/detail/123'>传递动态路由params</Link>
  ```
- 1.4页面获取参数,需要增强withRouter中再使用几个Hooks函数
  ```js
    // withRouter.jsx
    // 动态路由获取:
    const params = useParams()
    const router = { navigate, params }
    return <WrapperComponent {...props} router={router} />
  ```
- 1.5 Detail页面获取参数,直接获取
  ```js
    import React, { PureComponent } from 'react'
    import { withRouter } from '../hoc'

    export class Detail extends PureComponent {

      render() {
        const { params } = this.props.router
        console.log('params', params)
        return (
          <div>Detail
            <div>id: {params.id}</div>
          </div>
        )
      }
    }

    export default withRouter(Detail)
  ```
- ==2.query参数传递信息==
- 2.1 注册路由,普通
  ```js
    {/* query参数路由 */}
    <Route path='/user' element={<User />} />
  ```
- 2.2 发送消息
  ```js
    {/* 传递参数 query*/}
    <Link to='/user?name=why&age=18'>传递query</Link>
  ```
- 2.3 有两个Hooks方法,location相对比麻烦点
  ```js
    // withRouter.jsx
    // querystring参数获取:
    // 方法1: 数据包装过,需要额外解析
    const location = useLocation()
    // 方法2: 标准Hooks函数结构,后面会详细学习
    const [searchParams] = useSearchParams()
    // 转化为普通对象 fromEntries
    const query = Object.fromEntries(searchParams)
    // 往prop.router传入对象
    const router = { navigate, params, location, query }
    return <WrapperComponent {...props} router={router} />
  ```
- 2.4 页面获取 User.jsx
  ```js
    import React, { PureComponent } from 'react'
    import { withRouter } from '../hoc'

    export class User extends PureComponent {
      render() {
        // 获取query参数的方法(有2个)
        const { location, query } = this.props.router
        console.log('location', location)
        console.log('query', query)
        return (
          <div>
            <div>User(location): {location.search} (需要额外解析)</div>
            <div>User(query): {query.name}-{query.age} (简单,直接用)</div>
          </div>
        )
      }
    }

    // 类组件增强
    export default withRouter(User)
  ```
## 路由配置方式
- 单独配置路由,把路由从App.jsx中移到单独的文件(/router/index.js)
- useRoutes是Hooks,把App改为函数组件即可
- ==配置路由(参考vue)== /router/index.js
  ```js
    import Home from '../pages/Home'
    import About from '../pages/About'
    import Login from '../pages/Login'
    import NotFound from '../pages/NotFound'
    import HomeRecommend from '../pages/HomeRecommend'
    import HomeRanking from '../pages/HomeRanking'
    import HomeSongMenu from '../pages/HomeSongMenu'
    import Detail from '../pages/Detail'
    import User from '../pages/User'
    import { Navigate } from 'react-router-dom'

    // 和vue很像
    const routes = [
      {
        path: '/',
        element: <Navigate to='/home/recommend' />
      },
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            path: '/home',
            element: <Navigate to='/home/recommend' />
          },
          {
            path: '/home/recommend',
            element: <HomeRecommend />
          },
          {
            path: '/home/ranking',
            element: <HomeRanking />
          },
          {
            path: '/home/songmenu',
            element: <HomeSongMenu />
          }
        ]
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/detail/:id',
        element: <Detail />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]

    export default routes
  ```
- 注册组件 App.jsx
  ```js
    import { Link, useRoutes } from 'react-router-dom'
    import routes from './router'

    export function App() {
      let element = (<div className='app'>
        <div className='header'>
          header-顶部
          {/* 路由跳转 */}
          <div className='nav'>
            <Link to="/home">首页</Link>
            <Link to="/about">关于</Link>

            {/* 传递参数 query*/}
            <Link to='/user?name=why&age=18'>传递query</Link>
            {/* 动态路由 params */}
            <Link to='/detail/123'>传递动态路由params</Link>
          </div>
          <hr />
        </div>
        <div className='content'>
          {/* useRoutes是Hooks,传入路由自动生成 */}
          {useRoutes(routes)}
        </div>
        <div className='footer'>
          <hr />
          footer-底部
        </div>
      </div>)
      return element
    }

    export default App
  ```

## 懒加载
- 懒加载如下
  ```js
    // 懒加载: 打包时会单独打包一个js文件,需要使用时再引入
    const About = React.lazy(() => import('../pages/About'))
    const Login = React.lazy(() => import('../pages/Login'))
  ```
- 需要额外配置(最外层index.js)
  ```js 
    // render ...
    <HashRouter>
      {/* 懒加载一些组件时,需要下载,在下载时先显示这个fallback内部的元素或组件,否则报错 */}
      <Suspense fallback={<h2>加载中loading...</h2>}>
        <App />
      </Suspense>
    </HashRouter>
  ```


