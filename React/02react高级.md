# react高级
## react组件化开发
### 组件划分
- ==react的组件划分==
  - 根据定义分类: ==函数组件和类组件==
  - 根据组件内部有无状态维护: 无状态组件和有状态组件,指`this.state={状态}`
  - 根据组件的职责: 展示性组件和容器型组件,展示性组件目的是呈现页面东西,容器行组件包罗万象,维护状态,网络请求,监听行为等复杂逻辑
- ==组件概念有重叠,但是主要关注点就还是数据逻辑和UI展示==
  - 函数组件,无状态组件,展示型组件--->UI展示
  - 类组件,有状态组件,容器型组件--->数据逻辑
  - 初次之外还有异步组件,高级组件等以后学习
### 类组件封装细节
- 1.类组件定义的要求
  - 类组件大写开头
  - 必须继承 React.Component
  - 类组件必须实现render函数
- ==1.2搭建类组件的具体过程和react脚手架中搭建src笔记一摸一样==
   - index.js: 入口文件,编写react代码
    ```js
      import ReactDOM from 'react-dom/client' // react18.x引入方式

      import App from './App' // 导入类组件

      // 渲染react代码,从root元素内(index.html)
      const root = ReactDOM.createRoot(document.querySelector('#root'))
      root.render(<App/>)
    ```
  - 写一个组件App.jsx(.js),或是新文件`components/`下的组件文件
    ```js
      import React from 'react'
      // 编写类组件
      class App extends React.Component{
        constructor(){
          super()
          this.state = {
            message: 'hello react'
          }
        }

        render(){
          const {message} = this.state
          return (
            <div>
              <h2>{message}</h2>
            </div>
          )
        }
      }

      export default App
    ```
- 2.render函数的返回值
  - ==render被调用时机==: 页面第一次渲染和this.props/this.state发生变化时
  - ==返回类型==: 
    - react元素,比如JSX语法(本质都是React.createElement),可以是`div`这种的标签元素也可以是`<App/>`的组件
    - 数组或fragments(待),数组被遍历并呈现,数组内的item也可以是jsx语法
    - protals: 渲染子节点到不同dom树中
    - 普通文本/数字: 'hello' / 123123
    - 布尔/null/undefined: 界面不显示任何东西
### 函数组件封装
- ==在没有Hooks之前,函数式组件有以下特点==
  - 没有生命周期
  - 没有this指向组件实例,不需要this
  - 没有内部状态(state),函数重新执行时,所有的状态都会初始化,所以无法维护保存状态
- 函数式组件 App_func.jsx
  ```js
    // 函数式组件,不需要继承任何react
    function App(){
      // 返回值: 和类组件render返回类型一致
      return <h1>hello function</h1>
    }

    export default App
  ```
  > ==后面学习Hooks时会对函数式组件扩展,前期先讲解类组件==
## 生命周期
### 挂载周期
- react组件也有生命周期,在合适的时机完成自己的功能
- 生命周期大致分为
  - 装载阶段(Mount),组件第一次在DOM树中渲染的过程
  - 更新阶段(Update),组件发生变化,重新更新渲染过程
  - 卸载阶段(Unmount),组件从DOM树种被移除的过程
- react提供一些生命周期函数,在组件实现过程中,会对这些函数进行回调
  - componentDidMount: 组件已经挂载到DOM,==操作DOM,网络请求,添加订阅(监听)==
  - componentDidUpdate: 组件发生更新
  - componentWillUnmount: 组件将被移除,==移除订阅(监听)==
  > 在HOOKS之前,生命周期只在类组件中体现
- 生命周期示意图
  [![pE7ytW4.png](https://s21.ax1x.com/2025/04/29/pE7ytW4.png)](https://imgse.com/i/pE7ytW4)
- 创建新的类组件HelloWorld.jsx,放入App_class作为它的子组件
  ```js
    import React from "react"
    class HelloWorld extends React.Component{
      constructor(){
        super()
        this.state = {
          message: 'hello world'
        }
      }

      render(){
        console.log('HelloWorld render')
        return (
          <div>
            <h2>Hello World</h2>
          </div>
        )
      }

      componentDidMount(){
        console.log('HelloWorld Mount')
      }
    }

    export default HelloWorld
  ```
- 执行类的实例: App_class.js
  ```js
    render(){
      const {message} = this.state
      return (
        <div>
          <h2>{message}</h2>
          {/*记得引入类组件*/}
          <HelloWorld/>
          <HelloWorld/>
          <HelloWorld/>
        </div>
      )
    }
  ```
  > ==`<HelloWorld/>`意为创建一个类组件的实例,这里创建了3个实例,每次创建实例,都会执行一次类组件内部的代码,执行顺序如图中的Mounting周期constructor->render->componentDidMount==
- 打印结果示意
  [![pE7yJFU.png](https://s21.ax1x.com/2025/04/29/pE7yJFU.png)](https://imgse.com/i/pE7yJFU)
### 更新与卸载周期
- 生命周期示意图
  [![pE7ytW4.png](https://s21.ax1x.com/2025/04/29/pE7ytW4.png)](https://imgse.com/i/pE7ytW4)
- 如上图,New props/setState()/forceUpdate()更新数据时会再次执行一次render函数,然后再执行一次componentDidUpdate函数
  ```js
    changeText(){
      this.setState({ message: '你好 世界'})
    }

    render(){
      const {message} = this.state
      console.log('HelloWorld render')
      return (
        <div>
          <h1>{message}</h1>
          <h2>Hello World</h2>
          {/* e是点击事件默认参数,以防万一使用提前写一下 */}
          <button onClick={e => this.changeText()}>更新</button>
        </div>
      )
    }

    componentDidUpdate(){
      console.log('你好世界,Update')
    }
  ```
- 打印结果
  [![pEHmXB6.png](https://s21.ax1x.com/2025/04/29/pEHmXB6.png)](https://imgse.com/i/pEHmXB6)
- ==卸载流程 App_class.js==
  ```js
    class App extends React.Component{
      constructor(){
        super()
        this.state = {
          message: 'hello react',
          isShow: true
        }
      }

      switchHW() {
        this.setState({isShow: !this.state.isShow})  
      }

      render(){
        const {message,isShow} = this.state
        return (
          <div>
            <h2>{message}</h2>
            <button onClick={e => this.switchHW()}>切换</button>
            {isShow && <HelloWorld/>}
          </div>
        )
      }
    }
  ```
- HelloWorld.jsx
  ```js
    componentWillUnmount(){
      console.log('组件卸载,Unmount')
    }
  ``` 
### 额外生命周期(了解)
- 不常用的生命周期的补充,==最常用的是componentDidMount,其次是componentDidUpdate和componentWillUnmount==
  [![pEHmxAO.png](https://s21.ax1x.com/2025/04/29/pEHmxAO.png)](https://imgse.com/i/pEHmxAO)
  ```js
    shouldComponentUpdate(){
      {/* 返回true代表更新,返回false就不更新,也就不会render和componentDidUpdate */}
      return true
    }
  ```
## 父子通信
### 组件拆分与嵌套
- 组件间架构如下
  [![pEHmjHK.png](https://s21.ax1x.com/2025/04/29/pEHmjHK.png)](https://imgse.com/i/pEHmjHK)
  > 具体过程就是简单的创建对应的文件和引入对应的子组件,省略
### 父传子
- 和vue差不多,父组件通过`属性 = 值`传递给子组件数值; 子组件通过`props`接受父组件的值;
- 父Main
  ```js
    export class Main extends Component {
      constructor(){
        super()
        this.state = {
          banners: ['新歌','新MV','新曲'],
          productList: ['电视','手机','洗衣机']
        }
      }

      render() {
        const {banners,productList} = this.state
        return (
          <div>
            Main
            <MainBanner banners={banners} title='轮播图'/>
            <MainProductList productList={productList}/>
          </div>
        )
      }
    }
  ```
- 父传子Banner
  ```js
    export class MainBanner extends Component {
      // 如果没有维护state的必要,不写constructor也可以自动获取到props
      constructor(props){
        super(props) // 等于this.props = props
      }

      render() {
        const {banners,title} = this.props
        return (
          <div>
            <h1>标题: {title}</h1>
            <h1>
              {
                banners.map(item => {
                  return <li key={item}>{item}</li>
                })
              }
            </h1>
          </div>
        )
      }
    }
  ```
- 父传子ProductList
  ```js
  export class MainProductLIst extends Component {
    render() {
      const {productList} = this.props
      return (
        <div>
          <h2>商品列表</h2>
          <ul>
          {
            productList.map(item => {
                return <li key={item}>{item}</li>
              })
          }
          </ul>
        </div>
      )
    }
  }
  ```
### props类型验证
- 父传子的参数进行限制,配置props类型
- 对props类型进行验证,除了TS还可以有prop-types库
- 下载: `npm i prop-types`
> ==此语法暂时在19.x没找到==
- Banner.jsx
  ```js
    MainBanner.propTypes = {
      // PropTypes有许多常规的类型 string number 等
      banners: PropTypes.array.isRequired, // array类型 + 必传参数
      title: PropTypes.string
    }

    // 默认值
    MainBanner.defaultProps = {
      // banners: [], // 必传属性不需要默认值
      title: '标题'
    }
  ```
### 展开运算props
- 额外补充,使用展开运算来传递props可以使得代码更加简洁
  ```js
  function Profile({ person, size, isSepia, thickBorder }) {
    return (
      <div className="card">
        <Avatar
          person={person}
          size={size}
          isSepia={isSepia}
          thickBorder={thickBorder}
        />
      </div>
    );
  }
  ```
  ```js
    function Profile(props) {
      return (
        <div className="card">
          <Avatar {...props} />
        </div>
      );
    }
  ```
  > 上面2个代码的效果是相同的,下面的更加简洁!
### 子传父
- 在vue通过自定义事件完成,==而在react是通过父传子一个函数,子组件调用函数并传参,以此实现子传父==
- react就js升级版,没有emit等语法糖,包括后面的插槽slot也是没有的
- App.jsx 父
  ```js
    import AddCount from './AddCount'

    export class App extends Component {
      constructor(){
        super()
        this.state = {
          counter: 100
        }
      }

      changeCounter(count){
        this.setState({counter: this.state.counter + count})
      }

      render() {
        const {counter} = this.state
        return (
          <div>App
            当前计数: {counter}
            {/*向子组件中传递函数,子组件调用这个函数并传参,实现子传父*/}
            <AddCount addClick={(count) => this.changeCounter(count)}/>
          </div>
        )
      }
    }
  ```
- AddCount.jsx 子
  ```js
    export class AddCount extends Component {

      addCount(count){
        // 获取父传子的addClick数据,是一个箭头函数,调用并传参count
        this.props.addClick(count)
      }

      render() {
        return (
          <div>
              <button onClick={e => this.addCount(1)}>+1</button>
              <button onClick={e => this.addCount(5)}>+5</button>
              <button onClick={e => this.addCount(10)}>+10</button>
          </div>
        )
      }
    }
  ```
### 父子通信案例
- ==基础练习==
   [![pEHXlNT.png](https://s21.ax1x.com/2025/05/01/pEHXlNT.png)](https://imgse.com/i/pEHXlNT)
- App.jsx 父
  ```js
    import React, { Component } from 'react'
    import Tabbar from './cpns/Tabbar'

    export class App extends Component {
      constructor(){
        super()
        this.state = {
          tabbar: ['流行','新款','精选'],
          tabIndex: 0
        }
      }

      tabClick(index){
        this.setState({
          tabIndex: index
        })
      }

      render() {
        const {tabbar,tabIndex} = this.state
        return (
          <div>
            {/* 子传父,子组件把点击到的index所以传递给父组件 */}
            <Tabbar tabbar={tabbar} tabClick={index => this.tabClick(index)}/>
            <h1>{tabbar[tabIndex]}</h1>
          </div>
        )
      }
    }

    export default App
  ```
- tabbar.jsx 子
  ```js
    import React, { Component } from 'react'
    import './tabbar.css'

    export class Tabbar extends Component {
      constructor(props){
        super(props)
        this.state = {
          currentIndex: 0
        }
      }

      itemClick(index){
        this.setState({
          currentIndex: index
        })
        // 调用父组件函数,并传入索引index
        this.props.tabClick(index)
      }

      render() {
        const {tabbar} = this.props
        const {currentIndex} = this.state

        return (
          <div className='tabbar'>
            {
              tabbar.map((item,index) => {
                return (
                  <div 
                    // 利用模板字符串+三目添加active
                    className={`item ${currentIndex === index ? 'active': ''}`} 
                    key={item}
                    onClick={e=> this.itemClick(index)}
                  >
                    {item}
                  </div>
                )
              })
            }
          </div>
        )
      }
    }

    export default Tabbar 
  ```
## 非父子通信(了解)
- ==为什么是了解? 因为redux可以代替它==
### Context
- 一些场景,不仅仅是父子之间传递,而是跨组件传递,多个组件之间共享数据,类似vue中的`provide inject`
- Context: 意为'上下文',提供在组件之间共享数值的方式,对于一个组件树而言是一个'全局'数据
- 组件间关系: App->Home->HomeInfo 依次变小
- 1.创建一个context->ThemeContext
  ```js
    // 在单独的文件中
    import React from "react";
    // 第一步: 创建一个context,可以多个
    const ThemeContext = React.createContext()

    export {
      ThemeContext
    }
  ```
- 2.通过ThemeContext中的Provider中value属性为后代提供数据
  ```js
    // App.jsx
    import React, { Component } from 'react'
    import Home from './Home'
    import {ThemeContext} from './contexts/homeContexts'

    export class App extends Component {
      render() {
        return (
          <div>
            {/* 第二步: 对Home组件及子组件的这一个dom树共享数据 */}
            <ThemeContext.Provider value={{info:'我是ThemeContext共享的数据',score: 100}}>
              <Home/>
            </ThemeContext.Provider>
          </div>
        )
      }
    }

    export default App
  ```
- 3.在后代组件中,因为context可能有多个,所以需要设置contextType为某一个context,以此来确定需要使用哪一个context里面的数据
- 4.最后,获取到context里面的数据并使用
  ```js
    // HomeInfo.jsx
    import React, { Component } from 'react'
    import { ThemeContext } from './contexts/homeContexts'

    export class HomeInfo extends Component {
      render() {
        // 第四步: 获取到context数据并使用
        const {info,score} = this.context
        return (
          <div>
            HomeInfo: {info},{score}
          </div>
        )
      }
    }

    // 第三步: 设置contextType
    HomeInfo.contextType = ThemeContext

    export default HomeInfo
  ```
### 额外补充
- ==1.如果HomeInfo不是类组件,而是一个函数组件,如何去做?==
  - 1.函数组件不是类,所以获取不到contextType属性
  - 2.函数内部的this指向不再是类组件实例,所以this.context为undefined
- 解决方法如下,==理解里面的生产者Provider和消费者Consumer==
  ```js
    // HomeInfo_func.jsx
    import { ThemeContext } from './contexts/homeContexts'

    function HomeInfo_func(){
      return (
        <div>
          {/* 消费者模型,获取生产者ThemeContext.Provider的公共属性value */}
          <ThemeContext.Consumer>
          {
            value => {
              return <h2>{value.info},{value.score}</h2>
            }
          }
          </ThemeContext.Consumer>
        </div>
      )
    }

    export default HomeInfo_func
  ```
  > 使用消费者模型,指明了使用哪个生产者
  > Home组件引入这个函数组件的使用方式和引入类组件一样
- ==2.(了解)如果有多个上下文,如何做?==
  ```js
    import React from "react";
    // 创建一个context,可以多个
    const ThemeContext = React.createContext()
    const TempContext = React.createContext()

    export {
      ThemeContext,
      TempContext
    }
  ```
  ```js
    // App.jsx
    import React, { Component } from 'react'
    import Home from './Home'
    import { ThemeContext, TempContext } from './contexts/homeContexts'

    export class App extends Component {
      render() {
        return (
          <div>
            {/* 多个context,嵌套使用 */}
            <TempContext.Provider value={{ info: '我是TempContext共享的数据', score: 200 }}>
              <ThemeContext.Provider value={{ info: '我是ThemeContext共享的数据', score: 100 }}>
                <Home />
              </ThemeContext.Provider>
            </TempContext.Provider>
          </div>
        )
      }
    }

    export default App
  ```
  ```js
    // HomeInfo.jsx
    import React, { Component } from 'react'
    import { TempContext, ThemeContext } from './contexts/homeContexts'

    export class HomeInfo extends Component {
      render() {
        // 多个context可以使用消费者模型,获取到其他的context
        const { info, score } = this.context
        return (
          <div>
            HomeInfo: {info},{score}
            <TempContext.Consumer>
              {
                value => {
                  return <h2>{value.info} {value.score}</h2>
                }
              }
            </TempContext.Consumer>
          </div>
        )
      }
    }

    // contextType只能获取到最近的context,看App.jsx内的嵌套关系,ThemeContent是最近的context
    // 当然也可以写2个context.consumer
    HomeInfo.contextType = ThemeContext

    export default HomeInfo
  ```
  > 可以用多个消费者模型,消费者模型可以在类组件使用也可以在函数组件中使用,也很灵活
  > ==使用Context.Consumer消费者模型的场景: 函数式组件/多个Context==
- ==**Context相关API**==
  [![pEHX8CF.png](https://s21.ax1x.com/2025/05/01/pEHX8CF.png)](https://imgse.com/i/pEHX8CF)
  [![pEHXG34.png](https://s21.ax1x.com/2025/05/01/pEHXG34.png)](https://imgse.com/i/pEHXG34)
### 事件总线
- 下载: `npm i hy-event-store`,coderwhy老师写的第三方库
- ==同一个组件树下的组件通信,组件关系App->Home->HomeBanner==
- 创建utils/event-bus.js
  ```js
    import { HYEventBus } from 'hy-event-store'
    const eventBus = new HYEventBus()
    export default eventBus
  ```
- ==事件总线基础使用,发出(emit)与监听(on),记得引入eventBus==
- HomeBanner发出
  ```js
    handleClick() {
      console.log('HomeBanner')
      // 点击按钮后,发出信息->HomeBanner; 同时后面传参
      eventBus.emit('HomeBanner', '来自组件HomeBanner的信息', 'kiki', 18)
    }

    render() {
      return (
        <div>
          HomeBanner
          <button onClick={this.handleClick}>HomeBanner</button>
        </div>
      )
    }
  ```
- App监听与取消监听
  ```js
    // 监听与取消监听(可选)
    componentDidMount() {
      eventBus.on('HomeBanner', this.handleBanner, this)
    }
    componentWillUnmount() {
      eventBus.off('HomeBanner', this.handleBanner)
    }
    // 获取有效this的方法: bind,箭头函数和库中自带方法,可传入第三个参数this
    // 接受emit发出的三个参数
    handleBanner(info, name, age) {
      console.log(info, name, age, this)
    }
  ```
## 插槽
### react中的插槽
- ==react没有插槽,没有vue的slot语法糖,react很灵活,可以多种方式实现类似插槽的功能==
- react实现插槽的效果方法
  - ==组件的children子元素==
  - ==**(推荐)props属性传递React元素**==
- 1.方法1,children子元素
- 组件内部可以传递子元素,然后在子组件的`this.props.children`属性中可以获取
- ==当传递多个元素时,会被放入数组;而只传递单个元素时,就只有一个对象==
  ```js
    // App.jsx
    import React, { Component } from 'react'
    import NavBar from './NavBar'
    
    export class App extends Component {
      render() {
        const btn = <button>按钮Btn</button>
        return (
          <div>
            <NavBar>
              {/* 只示例多个元素,单个元素注释2条数据即可 */}
              <button>按钮</button>
              <div>标题</div>
              <i>斜体文本</i>
            </NavBar>
          </div>
        )
      }
    }

    export default App
  ```
  ```js
    // Navbar.jsx
    import React, { Component } from 'react'

    export class NavBar extends Component {
      render() {
        // react获取子元素
        const {children} = this.props
        console.log(children)
        return (
          <div className='nav-bar'>
            <div className='left'>{children[0]}</div>
            <div className='center'>{children[1]}</div>
            <div className='right'>{children[2]}</div>
          </div>
        )
      }
    }

    export default NavBar
  ```
  [![pEHX14U.png](https://s21.ax1x.com/2025/05/01/pEHX14U.png)](https://imgse.com/i/pEHX14U)
  > ==弊端==
  > 1.children根据传递的个数,可能是一个数组,也可能是一个对象,使用时慎重
  > 2.如果是数组形式,数组对顺序的要求很高
- ==**2.方法2,props实现插槽**==
- ==很灵活,可以直接传递react元素,把jsx作为props传递的内容==
  ```js
    // App.jsx 
    import React, { Component } from 'react'
    import NavBar2 from './NavBar2'

    export class App extends Component {
      render() {
        const btn = <button>按钮Btn</button>
        return (
          <div>
            <NavBar2
              // leftSlot={<button>按钮</button>}
              leftSlot={btn}
              centerSlot={<div>标题</div>}
              rightSlot={<i>斜体文字</i>}
            />
          </div>
        )
      }
    }

    export default App
  ```
  ```js
    // Navbar2.jsx
    import React, { Component } from 'react'

    export class NavBar2 extends Component {
      render() {
        const {leftSlot,centerSlot,rightSlot} = this.props
        return (
          <div className='nav-bar'>
            <div className='left'>{leftSlot}</div>
            <div className='center'>{centerSlot}</div>
            <div className='right'>{rightSlot}</div>
          </div>
        )
      }
    }

    export default NavBar2
  ```
### 作用域插槽
- 作用域插槽: 它允许父组件在使用子组件时，访问子组件的数据。通过作用域插槽，子组件可以将数据传递给父组件，父组件再根据这些数据来渲染内容
- ==复用父子通信案例==
- 作用域插槽基本使用
  ```js
    // App.jsx 
    import React, { Component } from 'react'
    import Tabbar from './cpns/Tabbar'

    export class App extends Component {
      constructor(){
        super()
        this.state = {
          tabbar: ['流行','新款','精选'],
          tabIndex: 0
        }
      }

      tabClick(index){
        this.setState({
          tabIndex: index
        })
      }

      render() {
        const {tabbar,tabIndex} = this.state
        return (
          <div>
            <Tabbar 
              tabbar={tabbar} 
              tabClick={index => this.tabClick(index)}
              {/* 通过函数传参,获取到子组件的信息,根据信息渲染jsx,然后返回给子组件 */}
              tabItem={item => <button>{item}</button>}
            />
            <h1>{tabbar[tabIndex]}</h1>
          </div>
        )
      }
    }

    export default App
  ```
  ```js
    // Tabbar.jsx
    import React, { Component } from 'react'
    import './tabbar.css'

    export class Tabbar extends Component {
      constructor(props){
        super(props)
        this.state = {
          currentIndex: 0
        }
      }

      itemClick(index){
        this.setState({
          currentIndex: index
        })
        this.props.tabClick(index)
      }

      render() {
        const {tabbar,tabItem} = this.props
        const {currentIndex} = this.state

        return (
          <div className='tabbar'>
            {
              tabbar.map((item,index) => {
                return (
                  <div 
                    className={`item ${currentIndex === index ? 'active': ''}`} 
                    key={item}
                    onClick={e=> this.itemClick(index)}
                  >
                    // 作用域插槽,向父组件提供子组件的一些信息,获取返回的jsx并显示
                    {tabItem(item)}
                  </div>
                )
              })
            }
          </div>
        )
      }
    }

    export default Tabbar 
  ```
  > 认真看注释部分,就是前面学习的绑定事件,只不过这次返回的是jsx语法,用于渲染页面,而传递数据还是依靠函数传参
- ==react十分灵活,甚至如下操作==
  ```js
    // App.jsx
    // 根据item返回多种jsx样式
    getTabItem(item){
      if(item === '流行'){
        return <button>{item}</button>
      }else if (item === '新款'){
        return <span>{item}</span>
      }else {
        return <i>{item}</i>
      }
    }

    render() {
        const {tabbar,tabIndex} = this.state
        return (
          <div>
            <Tabbar 
              tabbar={tabbar} 
              tabClick={index => this.tabClick(index)}
              // 函数根据item的不同,可以返回不同jsx
              tabItem={item => this.getTabItem(item)}
            />
            <h1>{tabbar[tabIndex]}</h1>
          </div>
        )
      }
  ```
## setState
### vue,react与setState
- vue与react的渲染流程区别: vue数据变化都是自动劫持,然后热更新的,比如数据的初始化和数据更新等,vue中的template语法糖就是render函数;在react中需要自己操作数据更新,比如setState,shouldComponentUpdate,PureComponet等操作
- react没有vue2的Object.defineProperty或vue3的Proxy方式监听数据变化,而是使用setState告诉react数据发生变化,setState是从React.Componet中继承过来的
- 可以看源码中的state,了解即可
### setState的3个用法
- 1.传入对象更新数据(最常用)
  ```js
    this.setState({
      message: '你好世界'
    })
  ```
  > 思考this.setState对象更新细节: 不是覆盖而是合并,源码核心Object.assign(Obj,newObj),更新对象与老对象合并
- 2.传入回调函数,参数state和props
- 好处: 1.编写新state的处理逻辑,在同一个函数内部,内聚性更强; 2.可以获取state和props
  ```js
    this.setState((state, props) => {
      console.log('回调参数:', state, props)
      return {
        message: '你好,世界'
      }
    })
  ```
  > 后面会用到,==这里的state是更新过的数据==,多次更新时可以获取到上次的更新结果
- 3.==setState是异步操作,回调函数==
- 如果想拿到更新后的数据去做一些操作,另写一个回调函数来处理
  ```js
     this.setState({
        message: '你好世界'
      }, () => {
        console.log(this.state.message)
      })
  ```
  > ==不同于vue中nextTick,它是立即执行更新操作,然后可以立即使用;而回调函数不是立即执行,而是等待数据更新后再回调执行,所以在回调函数内可以获取更新后的值,但是在回调函数外面获取的还是旧值==
- ==4.额外的: 异步下立即执行==
- 真正和nextTick一样的操作,react-dom包的flushSync
  ```js
  import { flushSync } from 'react-dom'
  flushSync(() => {
    this.setState({ message: '你好世界' })
  })
  console.log(this.state.message) // 同步
  ```
### setState异步设计用意
- ==为何setState设计为异步?==(github上有iusse,redux作者回复过)
- 总结: 
  - 1.显著提升性能,如果每一次setState都会调用render,会浪费性能;所以react会获取多个更新,然后批量渲染处理,本质是queue队列处理; vue的update也是这样,除非你用nextTick
  - ==3次更新,一次渲染==
    ```js
      changeText(){
        this.setState({
          counter: this.state.counter + 1
        })
        this.setState({
          counter: this.state.counter + 1
        })
        this.setState({
          counter: this.state.counter + 1
        })
      }

      render() {
        console.log('render', this.state.counter)
        return (
          <div>App
            <button onClick={() => this.changeText()}>click</button>
          </div>
        )
      }
    ```
    > this.state.counter获取的都是初始化定义的值0,setState是异步的,所以3次更新会统一进入队列,只执行一次render并统一更新,而3次更新都是'0+1'的操作
    > ==最终结果还是1,执行1次render==
  - ==如何获取每次更新的state,回调函数方法==
    ```js
      changeText(){
        // 获取更新后state
        this.setState((state) => {
          console.log('state.counter', state.counter)
          console.log('this.state.counter', this.state.counter)
          return {
            counter: state.counter + 1
          }
        })
        this.setState((state) => {
          console.log('state.counter', state.counter)
          console.log('this.state.counter', this.state.counter)
          return {
            counter: state.counter + 1
          }
        })
        this.setState((state) => {
          console.log('state.counter', state.counter)
          console.log('this.state.counter', this.state.counter)
          return {
            counter: state.counter + 1
          }
        })
      }
      render() {
        console.log('render', this.state.counter)
        return (
          <div>App
            <button onClick={() => this.changeText()}>click</button>
          </div>
        )
      }
    ```
    > 前面学习过,setState会在数据更新后调用回调函数,此时传入的state是更新过的,再次强调,回调函数不是立即被调用,而是在数据更新后的某个时间被调用!
    > ==结果为3,执行一次render,每一次this.state.counter都是0,而state.counter是依次递增的0,1,2,3==
  - 2.同步更新state会导致props与state不同步
  - 例如: 假如同步更新了state,此时还没有执行render,而render中有个子组件正好使用这个state,此时子组件的props并没有同步state更新,导致state和props发生不同步,没有代码示例
### setState同步(了解)
- ==**在react18(18.x)之前**,setState是有同步情况的,react18都是异步==
- 1.放进定时器的宏任务,将react代码放进setTimeout的回调函数中处理
  ```js
    setTimeout(() => {
      // 同步操作
      this.setState({
        message: '你好世界'
      })
      console.log(this.state.message)
    }, 0)
  ```
- 2.原生DOM操作的事件处理
- 比如js获取dom对象,监听点击事件,把setState放入点击事件处理函数中,也是同步代码
- 3.promise内的事件回调

## 性能优化
### key优化
- react渲染流程: jsx->虚拟DOM->真实DOM
- react更新流程: props/state改变->render重新执行->产生新DOM树->新旧DOM进行diff运算->计算差异更新->更新到真实DOM
- 对比2棵树对比,最简单的时间复杂度为O(n^2),复杂度很高; react优化后复杂度减少到了O(n),==同层比较,不会跨层比较,不同类型节点会产生不同树结构,如果某一层的内容没变但是dom类型由button变为div,照样重新构建新的dom树,它的子节点都会重构,这是一种取舍,为了提高diff算法效率==
- 开发中,可以通过key指定哪些节点在不同渲染下保持稳定,同层比较时会根据key值尽量的复用节点,比如列表插入的操作
- ==key的要求==: 
  - 1.key是唯一的id
  - 2.key不要随机数 
  - 3.key不能为index(索引),对性能没有优化,插入新值后,后面节点的key都要+1改变
### SCU优化原理
- SCU(shouldComponentUpdate)优化: ==下面的优化思路是原理,react封装了语法糖==
- 了解组件渲染的逻辑,假设App组件有两个子组件Home/recomd,如下
  ```js
  render() {
    const { message, counter } = this.state
    console.log('app render')
    return (
      <div>
        <div>App--{message}--{counter}</div>
        <div>Home--<Home /></div>
        <div>Recom--<Recom /></div>
      </div>
    )
  }
  ```
- ==渲染的问题有2个==: 
  - 1.App内部某个state修改,即使修改后值与原来的值相同,但是仍然会重新渲染1次
  - 2.渲染父组件App时必会渲染2个子组件,无论子组件修没修改
- ==解决1==
  ```js
    shouldComponentUpdate(newProps, newState) { // bewState,修改的新state值
      // 当state值发生改变时,允许修改
      if (this.state.message !== newState.message || this.state.counter !== newState.counter) {
        return true // 修改
      }
      return false
    }
  ```
  > 前面在'不常用的生命周期函数中'学习过这个生命周期函数,当所有的state值修改前后发生变化时才允许更新,如果修改前后值不发生变化,不执行render函数
- ==解决2==
- 以Home.jsx为例,Recom一样
  ```js
    shouldComponentUpdate(newProps) { // newProps,传递的新props参数
      // 忽略本身state变化的情况,组件在props没有变化时不会重新渲染
      if (this.props.message !== newProps.message) {
        return true
      }
      return false
    }
  ```
  > 组件本身state变化也要重新渲染,这里忽略,重点讲props引起的渲染
  > App有时会向子组件传递参数,当传递的props参数发生变化时,重新渲染一次子组件
  ```js
    render() {
      const { message, counter } = this.state
      console.log('app render')
      return (
        <div>
          <div>Home--<Home message={message} /></div>
          <div>Recom--<Recom counter={counter} /></div>
        </div>
      )
    }
  ```
  > Home链接message; Recom链接counter; 对应的值发生变化才会带动对应的组件重新渲染; 比如counter一直在变化,App组件和Recom组件会重新渲染,但是Home组件不会重新渲染.
### PureComponent与memo
- ==**SCU优化的语法糖,分为类组件和函数组件**==
- ==1.针对类组件==,PureComponent来代替频繁的shouldComponentUpdate函数判断,==类组件继承由Component变为PureComponent==
- ==**把所有的shouldComponentUpdate逻辑删除,引入PureComponent即可**==
- ==快捷键`rpce`==
  ```js
    import React, { PureComponent } from 'react'
    export class App extends PureComponent {
      // ...
    }
  ```
  > ==**注意: PureComponent只比较浅层state,不比较深层**==
- ==2.针对函数组件,引入memo方法,然后把函数组件放进去即可,返回值作为函数组件引入App组件==
  ```js
    import { memo } from 'react'
    const Func = memo(function func(props) {
      console.log('func render')
      return <h2>{props.message}</h2>
    })
    export default Func
  ```
### state不可变性
- 之前修改state的值的时候,没有直接修改state原本的值,而是浅复制后再进行修改,然后重新赋值给state,==那么为何这么做,直接修改不更加简单吗?==
- ==原因==:写类组件时,为了优化render渲染,==99%使用的`rpce`构建的PureComponents==,如果直接对原state进行修改,那么新的state和旧的state就会相等,react会误认为state数据没有发生改变,所以不会渲染页面,结果就是state改变了,但是页面没有更新
- ==浅复制==: `...`展开运算符,无论数组还是对象都可以用
- 数据样板
  ```js
    constructor() {
      super()
      this.state = {
        bookList: [
          { name: 'js高级设计', price: 100, id: 1 },
          { name: 'vue基础入门', price: 70, id: 2 }
        ]
      }
    }
  ```
- 直接修改
  ```js
    const newBook = { name: 'react入门', price: 80, id: 3 }
    this.state.bookList.push(newBook)
    this.setState({
      bookList: this.state.bookList
    })
  ```
- 浅复制
  ```js
    const newBook = { name: 'react入门', price: 80, id: 3 }
    const newBookList = [...this.state.bookList]
    newBookList.push(newBook)
    this.setState({
      bookList: newBookList
    })
  ```
- 深层数据修改也要浅拷贝,比如针对对象内部某个属性修改
  ```js
    addBookPirce(index) {
    const newBookList = [...this.state.bookList]
    newBookList[index].price += 10
    this.setState({
      bookList: newBookList
    })
  }
  ```
- ==总结==:
  - 1.浅复制的两个对象指向还是同一个地址,但是Pure在对比时也是只比较浅层,所以只要保证浅层不同即可
  - 2.上面的操纵不是为了改变state,而是为了在Pure下重新渲染页面,即执行render函数
- 浅复制如图:
  [![pEqffl6.png](https://s21.ax1x.com/2025/05/06/pEqffl6.png)](https://imgse.com/i/pEqffl6)
## ref
- ==在react当中一般不需要获取dom对象,并且尽量不要使用js原生的获取dom方法和操作dom==
- 只有特殊情况需要操作dom,比如音频控制,检点控制等
### ref获取原生DOM
- 在react中,ref获取原生DOM的方式
- ==推荐方法1==
  ```js
    import React, { PureComponent, createRef } from 'react'

    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {}
        // 推荐,获取DOM方法1:
        this.titleRef = createRef()
        // 方法2:
        this.titleEl = null
      }

      getNativeDOM() {
        // 保存在current属性中
        console.log('获取dom对象方法1', this.titleRef.current)
        // 直接通过ref回调的默认参数获取到DOM对象
        console.log('获取dom对象方法2', this.titleEl)
      }

      render() {
        return (
          <div>
            <h2 ref={this.titleRef}>你好 世界</h2>
            <h2 ref={el => { this.titleEl = el }}>Hello World</h2>
            <button onClick={e => this.getNativeDOM()}>获取DOM</button>
          </div>
        )
      }
    }

    export default App
  ```
  > 记得引入createRef方法
### ref获取组件实例
- ==分为获取类组件和函数组件2个方式==
- ==1.类组件==
  ```js 
    import React, { PureComponent, createRef } from 'react'
    // 类组件
    class Hello extends PureComponent {
      test() {
        console.log('我是类组件Hello')
      }
      render() {
        return <h1>hello world</h1>
      }
    }

    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {}
        // 类组件ref实例
        this.cpnRef = createRef()
      }

      getComponent() {
        console.log('获取类组件的实例', this.cpnRef.current)
        // 获取到类组件实例就可以自由执行它里面的所有方法
        this.cpnRef.current.test()
      }
   
      render() {
        return (
          <div>
            {/* 类组件 */}
            <Hello ref={this.cpnRef} />
            <button onClick={e => this.getComponent()}>获取DOM--类组件</button>
          </div>
        )
      }
    }

    export default App
  ```
- ==2.函数组件==
  ```js
    import React, { PureComponent, forwardRef } from 'react'

    // 函数组件
    // 通过HelloFunc中间人中转
    const HelloFunc = forwardRef(function hello(props, ref) {
      return (
        <div>
          {/* ref绑定到函数组件里的这个dom对象 */}
          <h1 ref={ref}>你好 世界,我是Func中的一个dom对象</h1>
          <h2>你好 kiki</h2>
        </div>
      )
    })

    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {}
        // 函数组件各自的ref实例
        this.funcRef = createRef()
      }

      getComponentFunc() {
        console.log('获取函数组件的实例', this.funcRef.current)
      }

      render() {
        return (
          <div>
            {/* 函数组件 */}
            <HelloFunc ref={this.funcRef} />
            <button onClick={e => this.getComponentFunc()}>获取DOM--函数组件</button>
          </div>
        )
      }
    }

    export default App
  ```

## 表单(理解)
- ==这一章节理解什么是受控组件什么是非受控组件,很多代码不需要记忆,使用时翻翻笔记就行==
### 受控/非受控组件
- react没有双向数据绑定,实现输入框的内容和state的双向数据绑定
- 普通的表单元素就是非受控组件,==一旦绑定value属性就会变为受控组件,此时无法输入新的值,需要绑定onChange事件才可以继续输入==
  ```js
    import React, { PureComponent } from 'react'

    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {
          message: '你好世界'
        }
      }

      inputChange(evt) {
        console.log('inputChange:', evt.target.value)
        this.setState({
          message: evt.target.value
        })
      }

      render() {
        const { message } = this.state
        return (
          <div>
            {/* 非受控组件 */}
            <input type='text' />
            {/* 受控组件,无法输入东西 */}
            <input type='text' value={message} />
            {/* 受控组件,可以输入东西 */}
            <input type='text' value={message} onChange={e => this.inputChange(e)} />
          </div>
        )
      }
    }

    export default App
  ```
  > 非受控组件输入自由,受控组件输入收到限制 
  > ==受控组件被react的state代理管理后,只能通过setState改变值,无法再次输入内容==
- ==什么是受控组件?==
  - 在HTML中,如input textarea select标签会自己维护自己的state; 在react中,state是它唯一的数据源,当react同时控制着表单输入过程中发生的操作,代替了输入元素本身自己维护的state,那么被react控制的表单输入元素就是受控组件
  > ==react中99%只用受控组件,不要用非受控组件,表单的输入等操作就应当交给react来管理,安全可靠==
### 多表单提交
- 演示提交form表单的简单流程
  - 1.表单元素变受控组件,受react的state管理,==value属性+onChange事件==
  - 2.==提交表单的默认行为被阻止,提取state中的表单输入内容==,向服务器发送登录/注册的用户信息
  - 3.==多个表单信息由一个函数统一处理(onChange事件处理函数)==
  - 4.额外的,label语法
  ```js
    constructor() {
      super()
      this.state = {
        username: '',
        password: ''
      }
    }

    handleSubmit(evt) {
      // 1.阻止表单提交默认行为
      evt.preventDefault()
      // 2.获取表单所有内容
      console.log('表单内容', this.state.username, this.state.password)
      // 3.把表单内容发送给服务器 ajax/fetch/axios
      // ....
    }

    onInputChange(e) {
      // 根据表单名动态保存多个输入表单的信息
      // e.target获取的是当前点击的受控组件元素,里面的name属性正是表单的名字
      const keyName = e.target.name // 'username' or 'password'
      this.setState({
        [keyName]: e.target.value
      })
    }

    render() {
      const { username, password } = this.state
      return (
        <div>App
          {/* 表单提交事件绑定onSubmit */}
          <form onSubmit={e => this.handleSubmit(e)}>
            {/* label的属性for->htmlFor,原因是关键字防止重名,它要关联输入组件的id属性值 */}
            <label htmlFor='username'>
              用户: <input type='text' id="username" name='username' value={username} onChange={e => this.onInputChange(e)} />
            </label>
            <label htmlFor='password'>
              密码: <input type='password' id="password" name='password' value={password} onChange={e => this.onInputChange(e)} />
            </label>
            <button type='submit'>注册</button>
          </form>
        </div>
      )
    }
  ```
### checkbox
- ==分为单选和多选框,两者的处理函数不同==
  ```js
    constructor() {
      super()
      this.state = {
        username: '',
        password: '',
        isAgree: false,
        hobbies: [
          { value: 'sing', text: '唱', isChecked: false },
          { value: 'dance', text: '跳', isChecked: false },
          { value: 'rap', text: 'rap', isChecked: false }
        ]
      }
    }

    handleSubmit(evt) {
      // 1.阻止表单提交默认行为
      evt.preventDefault()
      // 2.获取选中的爱好
      const hobbies = this.state.hobbies.filter(item => item.isChecked).map(item => item.value)
      console.log('获取爱好', hobbies)
      // 3.把表单内容发送给服务器 ajax/fetch/axios
      // ....
    }

    onAgreeChange(e) {
      // 单选框的属性是checked,不是value
      this.setState({ isAgree: e.target.checked })
      console.log('单选框', e.target.checked)
    }
    handleHobbiesChange(e, index) {
      // state的不可变性
      const newHobbies = [...this.state.hobbies]
      newHobbies[index].isChecked = e.target.checked
      console.log('更新的多选框', newHobbies)
      this.setState({ hobbies: newHobbies })
    }

    render() {
      const { isAgree, hobbies } = this.state
      return (
        <div>
          {/* 表单提交事件绑定onSubmit */}
          <form onSubmit={e => this.handleSubmit(e)}>
            {/* 单选 */}
            <label htmlFor='agree'>
              XX协议: <input type='checkbox' id="agree" name='agree' value={isAgree} onChange={e => this.onAgreeChange(e)} />
            </label>
            {/* 多选 */}
            <div>您的爱好:</div>
            {
              hobbies.map((item, index) => {
                return (
                  <label htmlFor={item.value} key={item.value}>
                    {/* 受控组件,输入组件的checked属性由react管理 */}
                    <input
                      type='checkbox'
                      id={item.value}
                      checked={item.isChecked}
                      onChange={e => this.handleHobbiesChange(e, index)}
                    />
                    {item.text}
                  </label>
                )
              })
            }
            <button type='submit'>注册</button>
          </form>
        </div >
      )
    }
  ```
### select
- ==select的单选和多选==
  ```js
    constructor() {
      super()
      this.state = {
        fruit: 'orange',
        fruits: []
      }
    }
    // 单选
    handleFruitChange(e) {
      this.setState({ fruit: e.target.value })
    }
    // 多选
    handleFruitChange2(e) {
      console.log('获取多选选中的项', e.target.selectedOptions)
      // HTMLCollection类型(可迭代对象)->数组类型
      const options = Array.from(e.target.selectedOptions)
      const values = options.map(item => item.value)
      console.log('选中的值', values)
      this.setState({ fruits: values })
    }

    render() {
      const { fruit, fruits } = this.state
      return (
        <div>
          {/* select,添加属性value变受控组件,单选 */}
          <select value={fruit} onChange={e => this.handleFruitChange(e)}>
            <option value='apple'>苹果</option>
            <option value='orange'>橘子</option>
            <option value='banana'>香蕉</option>
          </select>
          {/* 多选 */}
          <select value={fruits} onChange={e => this.handleFruitChange2(e)} multiple>
            <option value='apple'>苹果2</option>
            <option value='orange'>橘子2</option>
            <option value='banana'>香蕉2</option>
          </select>
        </div>
      )
    }
  ```
### 受控组件总结
- 绑定的总结:
  [![pELVvFS.png](https://s21.ax1x.com/2025/05/07/pELVvFS.png)](https://imgse.com/i/pELVvFS)
  > 没有演示的同上图,几乎一摸一样
## 高阶组件(理解)
- ==随着Hooks函数式编程的普及,高阶组件搭配类组件的使用会越来越少==
### 高阶组件定义使用
- ==高阶函数==
  - 接受的参数为一个函数,比如map filter reduce forEach 
  - 输出一个函数,比如map filter, reduce等,不对原数组做处理,返回一个新的数组
- ==高阶组件 HOC==
  - ==接受参数为组件==
  - ==返回值为新组件==
  - ==高阶组件不是组件,是函数==
  > 高阶组件不是react api的一部分,而是基于react组合特性的一种设计模式
  > 高阶组件在react的第三方库中很常见,比如redux的connect,react-router的withRouter等
- ==简单演示==
  ```js
    // 定义一个高阶组件(函数),接受一个组件做参数
    function hoc(Cpn) {
      // 定义一个类组件
      class NewCpn extends PureComponent {
        render() {
          // 拦截组件,处理组件
          return <Cpn name='coderwhy' />
        }
      }
      // 返回新的组件
      return NewCpn
    }

    // 要被处理的组件
    class Hello extends PureComponent {
      render() {
        return <h1>你好</h1>
      }
    }

    // 通过高阶组件(函数)获取一个新的的组件
    const NewCpn = hoc(Hello)

    export class App extends PureComponent {
      render() {
        return (
          <div>
            <NewCpn />
          </div>
        )
      }
    }
  ```
### 增强的props
- 实例: 此高阶组件的作用: 给函数组件加入额外的props
- ==辨析: 如果新的组件本身就要添加props,需要在原高阶组件中添加什么==
  ```js
    // 高级组件(函数) 增强的props
    function enhencedUserInfo(Cpn) {
      class NewCpn extends PureComponent {
        constructor(props) {
          super(props)
          this.state = {
            userInfo: {
              name: 'codewhy',
              age: 18
            }
          }
        }
        render() {
          // 简写方式,props传参等同于name={this.state.userInfo.name} age={...}
          // 返回的新组件如果本来就要传递props,那么除了增强的props需要渲染,还需要额外渲染传入的这些props
          // 这个props传递的对象是返回出去的新组件NewCpn,所以NewCpn渲染时需要额外传props({...this.props})
          return <Cpn {...this.props} {...this.state.userInfo} />
        }
      }

      return NewCpn // 返回新的组件
    }

    // 增强一个函数组件,打印获取的props,前2个是增强的,最后1个是本身传递的
    const Home = enhencedUserInfo(function (props) {
      return <h1>Home--{props.name}--{props.age}---{props.info}</h1>
    })


    export class App extends PureComponent {
      render() {
        return (
          <div>
            {/* 本来就要传递props,传递给Home组件,也就是高阶组件的返回值 */}
            App: <Home info={'本来就要传递的props'} />
          </div>
        )
      }
    }
  ```
### 应用1-Context
- 结合前面学习的非父子通信的小案例
- 1.创建context
  ```js
    // ThemeContext.js
    // 在单独的文件中
    import React from "react";
    // 第一步: 创建一个context,可以多个
    const ThemeContext = React.createContext()

    export default ThemeContext
  ```
- 2.App.jsx公开信息
  ```js
    export class App extends PureComponent {
      render() {
        return (
          <div>App
            <ThemeContext.Provider value={{ info: '我是共享的数据', score: 100 }}>
              <Product />
            </ThemeContext.Provider>
          </div>
        )
      }
    }
  ```
- 3.组件Product使用公开的信息
  ```js
    export class Product extends PureComponent{
      render(){
        return (
          <ThemeContext.Consumer>
            {
              value => {
                return <h2>theme: {value.info}--{value.score}</h2>
              }
            }
          </ThemeContext.Consumer>
        )
      }
    }
  ```
  > 生产者-消费者模型: Product打印了公开信息(value)的值
  > ==这样写比较麻烦,每一个类似Product的组件都要写这么多重复代码,所以接下来写一个高阶组件(函数),来自动添加完成==
- ==高阶组件(函数)==
  ```js
    // with_theme.jsx
    import ThemeContext from '../context/ThemeContext'

    function withTheme(OriginComponent) {
      // 返回函数组件,简写方式
      return (props) => {
        return (
          <ThemeContext.Consumer>
            {
              value => {
                {/* value是共享信息的值,props是函数组件接受父传子的值(如果有的话) */ }
                return <OriginComponent {...props} {...value} />
              }
            }
          </ThemeContext.Consumer>
        )
      }
    }

    export default withTheme
  ```
  > 1.这次返回的组件不是类组件,是函数组件,==函数组件更简单,因为返回的新组件没有维护state的需求,所以优先选择函数组件==
  > 2.把传入的组件放进ThemeContext.Consumer中,传入value参数和默认props参数
- ==改进后的Product组件==
  ```js
    import withTheme from '../hoc/with_theme'

    export class Product extends PureComponent {
      render() {
        return (
          <div>Product: {this.props.info} {this.props.score}</div>
        )
      }
    }

    export default withTheme(Product)
  ```
  > 在App.jsx中引入这个withTheme(Product)即可
  > 利用高阶组件自动实现,去除部分的重复代码

### 应用2-登录鉴权
- 高阶组件的应用2---登录鉴权
- 没有高阶组件下,鉴权流程如下
  ```js
    // App.js
    constructor() {
      super()
      this.state = {
        isLogin: true
      }
    }


    render() {
      const { isLogin } = this.state
      return (
        <div>
          {isLogin ? <Shop /> : '请先登录'}
        </div>
      )
    }
  ```
  > 只针对Shop页面,但是业务中许多页面都需要鉴权,写一个高阶组件自动完成鉴权,把要鉴权的组件放进去鉴权即可
- 设计鉴权的高阶组件
  ```js
    // loginAuth.js
    function loginAuth(OriginComponent) {
      // 函数组件
      return props => {
        // 假设场景: 从localStorage中获取token
        const token = localStorage.getItem('token')
        if (token) {
          return <OriginComponent {...props} />
        } else {
          return <h2>请先登录</h2>
        }
      }
    }

    export default loginAuth
  ```
- Shop页面使用鉴权组件
  ```js
    import React, { PureComponent } from 'react'
    import loginAuth from '../hoc/login_auth'

    export class Shop extends PureComponent {
      render() {
        return (
          <div>Shop页面</div>
        )
      }
    }

    export default loginAuth(Shop)
  ```
  > 把Shop组件放入鉴权的高级组件loginAuth中
- App.jsx页面
  ```js
    constructor() {
      super()
      this.state = {
        isLogin: false
      }
    }

    login() {
      localStorage.setItem('token', 'codewhy')
      // 更改state的同时,重新渲染页面
      this.setState({
        isLogin: true
      })
    }

    render() {
      const { isLogin } = this.state
      return (
        <div>
          <button onClick={e => this.login(e)}>登录按钮</button>
          {isLogin ? <Shop /> : '请先登录'}
        </div>
      )
    }
  ```
  > 这里单个引入的Shop就是`export default loginAuth(Shop)`导出的新组件

### 高阶组件与Hooks展望
- 1.对部分react代码可以更加优雅的处理,减少代码的重复
- 2.之前的组件复用mixin方法容易造成相互耦合,难以维护的问题
- 3.HOC需要在原组件上嵌套,嵌套过多的组件会使得调试很困难
- 4.HOC可以劫持props,可能造成props冲突
- 5.之前学习的memo方法,forwardRef方法都是react内置的高阶组件
  >
- ==HOOKS的出现是开创性的,解决了this指向问题,hoc嵌套问题等等==
- ==类组件推荐用HOC,而函数式编程,新的项目,都转向Hooks==

## 额外补充(了解)
### Portals
- 类似于vue中的teleport心灵传输
- 某些情况,我们希望有些元素独立出父组件之外,甚至独立于当前挂载的dom元素中(默认挂载到root的根组件div上),一个dom元素正常情况下是依据html结构挂载的,我们要改变某些dom元素的挂载位置
  ```js
    import { createPortal } from 'react-dom'

    export class App extends PureComponent {
      render() {
        return (
          <div className='app'>App
            <div>App H1</div>
            {/* 把App H2的dom元素挂载到index.html里的test-div元素内 */}
            {
              createPortal(<div>App H2</div>, document.querySelector('#test'))
            }
          </div>
        )
      }
    }
  ```
- index.js ==默认渲染#root==
  ```js
    // 渲染react代码,从root元素内(index.html)
    const root = ReactDOM.createRoot(document.querySelector('#root'))
    root.render(<App />)
  ```
- index.html
  ```html
    <div id="root"></div>
    <div id="test"></div>
  ```
- 最终示意图
  [![pEL1Np6.png](https://s21.ax1x.com/2025/05/07/pEL1Np6.png)](https://imgse.com/i/pEL1Np6)
### Fragment语法
- Fragment意为片段,react的render组件返回值中最外层必须有一个根元素,一般为div元素,可以用Fragment代替根元素,最终页面渲染的时候不会被渲染出来,类似vue中的template和小程序中的block
- vue3中tempalte允许多个根,其实是源码中使用fragment把多个根包裹起来了
  ```js
    import React, { PureComponent, Fragment } from 'react'

    export default class App extends PureComponent {
      render() {
        return (
          <Fragment>App</Fragment>
        )
      }
    }
  ```
  > ==不过还是推荐包裹一个div,对于调整css样式有很大帮助==
### 严格模式StrictMode
- 严格模式是用来显示应用程序代码中潜在问题的工具,用以规范代码编写习惯,更加严谨
- 严格模式检查只在开发模式下运行,不影响生产构建
- ==StrictMode也是一个组件,它可以为内部的组件提供额外的检查==
- ==可以在App.jsx局部开启严格模式检验严格模式与非严格模式的区别==
  ```js
    import React, { PureComponent, StrictMode } from 'react'

    render() {
      return (
        <div>
          <StrictMode>
            <Home />
          </StrictMode>
          <Profile />
        </div>
      )
    }
  ```
- ==严格模式下,检查什么?==
  - 1.不安全的生命周期,即react不推荐,已废弃的生命周期(被划掉)
  - 2.过时的ref API, 例如`this.refs`
  - 3.检测意外的副作用,非严格模式下,初次渲染只会执行一次render; 严格模式下,会渲染两次render,2次渲染的目的是为了检测意外的副作用,比如添加了监听事件但是忘记移除,当2次渲染后,会额外添加多余的监听事件,这就是意外的副作用,但是常规情况下不会执行两次render,所以一般不会发现,但是严格模式会特意执行2次,所以可以及时发现问题,==在安装react devtool后,第二次渲染是浅色的==,有一些第三方库还是使用的旧api,所以严格模式下可能会报错
  - 4.废弃的api,比如`findDOMNode`
  - 5.检测过时的api
  > ==一般我们不会可以去开启严格模式==

