# React中的动画与css
## react动画
- 中文文档: https://juejin.cn/post/7030727850357424165
### 过渡动画
- react强大的动画库react-transition-group,实现组件入场和离场的动画
- ==下载==: `npm i react-transition-group`
- ==这个包有4个组件,可以选择一种用来实现动画效果==
  - ==Transition==: 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition；
  - ==CSSTransition==: 在前端开发中，通常使用CSSTransition来完成过渡动画效果
  - ==SwitchTransition==: 两个组件显示和隐藏切换时，使用该组件
  - ==TransitionGroup==: 将多个动画组件包裹在其中，一般用于列表中元素的动画；
### CSSTransition
- ==功能: 元素的显示与隐藏动画==
- ==App.jsx==
  ```jsx
    import React, { PureComponent } from 'react'
    import { CSSTransition } from 'react-transition-group'
    import './style.css'

    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {
          isShow: false
        }
      }
      render() {
        const { isShow } = this.state
        return (
          <div>App
            <button onClick={e => this.setState({ isShow: !isShow })}>切换</button>
            {/* in,布尔值,true显示false隐藏 */}
            {/* className,动画类型,写对应的css属性 */}
            {/* 必写属性timeout,执行动画事件,单位毫秒 */}
            {/* 必写属性unmountOnExit,退出时卸载组件 */}
            <CSSTransition in={isShow} unmountOnExit={true} classNames='why' timeout={2000}>
              <h2>哈哈哈</h2>
            </CSSTransition>
          </div>
        )
      }
    }

    export default App
  ```
- style.css
  ```css
    /* CSSTransition基于Transition构建,有3种状态(出现/进入/退出)appear/enter/exit,都需要定义对应的css样式 */
    /* 
      (前缀为classNames的属性值)
      开始状态 -appear -enter -exit
      执行状态 -appear-active -enter-active -exit-active
      结束状态 -appear-done -enter-done -exit-done
    */

    /* 会在对应时刻把下面的class类加到标签上 */
    /* 优先看enter和exit */

    /* 进入动画,开始状态 */
    .why-enter{
      opacity: 0;
    }
    /* 进入动画,执行状态 */
    .why-enter-active{
      opacity: 1;
      transition: opacity 2s ease;
    }

    /* 离开动画,开始状态 */
    .why-exit{
      opacity: 1;
    }
    /* 离开动画,执行状态 */
    .why-exit-active{
      opacity: 0;
      transition: opacity 2s ease;
    }
  ```
  > ==**class类的添加与移除流程(也与timeout属性有关)**==
  > 1.==当in为true时==,执行-enter和-enter-active执行进入动画,当进入动画执行结束后,移除2个class再执行-enter-done
  > 2.==同理in为false时==,执行-exit和-exit-active执行退出动画,当退出动画执行结束后,移除2个class执行-exit-done
### 属性补充
- CSSTransition属性补充
  - in: 隐藏和出现
  - ==必写属性timeout: 动画时间,一定与css中active的时间设置一致==,timeout属性控制类的添加与移除时机,而css中时间代码则只控制动画效果时机
  - 必写属性unmountOnExit: 退出时卸载组件
  - ==appear==: 为true时,显示第一次出现的动画效果(即网页刷新后初始化页面时,第一次显示的动画) , 需要配置对应css如下
    ```css
      /* 第一次出现,开始状态 */
      .why-appear{
        transform: translateX(-150px);
      }
      /* 第一次出现,执行状态 */
      .why-appear-active{
        transform: translateX(0);
        transition: transform 2s ease;
      }
    ```
    > ==记得在CSSTransition上添加appear属性==
  - 同理,第一次就想要淡出淡入的动画只需要在enter中额外加appear即可
    ```css
      .why-appear, .why-enter{
        opacity: 0;
      }
      .why-appear-active, .why-enter-active{
        opacity: 1;
        transition: opacity 2s ease;
      }
    ```
  - ==钩子函数: 在动画执行过程中,执行一些js代码==
    - onEnter: 开始执行进入动画
    - onEntering: 正在执行进入动画
    - onEntered: 执行进入动画结束
    > ==同理exit套用上面的钩子函数,略==
    ```js
        {/* appear,第一次显示的动画 */}
        {/* 只演示了Enter相关的钩子函数 */}
        <CSSTransition
          in={isShow}
          unmountOnExit={true}
          classNames='why'
          timeout={2000}
          appear
          onEnter={e => console.log('开始进入动画')}
          onEntering={e => console.log('执行进入动画')}
          onEntered={e => console.log('结束进入动画')}
        >
          <h2>哈哈哈</h2>
        </CSSTransition>
    ```
### SwitchTransition
- ==功能: 完成2个组件之间的切换==
- 需要CSSTransition负责动画效果,==新增属性key==
  ```js
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
          {/* mode: out-in(推荐): 先离开再进入; in-out: 先进入后离开,比较错乱 */}
          <SwitchTransition mode='out-in'>
            {/* 执行动画组件还是它,新属性key,规定什么情况下执行什么样的动画 */}
            {/* 初始key为exit(登录状态),此时显示'登出'按钮; key为login(未登录状态),此时显示'登录'按钮
                当exit转为login时(登出操作),会被捕捉,此时执行'登出'按钮的动画
                当login转为exit时(登入操作),执行'登入'按钮动画
                按钮动画: 进入(enter)和离开(exit)在style.css文件中,记得引入
            */}
            <CSSTransition
              key={isLogin ? 'exit' : 'login'}
              classNames='login'
              timeout={1000}
            >
              <button onClick={e => this.setState({ isLogin: !isLogin })}>
                {isLogin ? "登出" : "登入"}
              </button>
            </CSSTransition>
          </SwitchTransition>
        </div>
      )
    }
  ```
  ```css
    /* 进入动画 */
    .login-enter{
      transform: translateX(100px);
      opacity: 0;
    }

    .login-enter-active{
      transform: translateX(0);
      opacity: 1;
      transition: all 1s ease;
    }

    /* 离开动画 */
    .login-exit{
      transform: translateX(0);
      opacity: 1;
    }

    .login-exit-active{
      transform: translateX(-100px);
      opacity: 0;
      transition: all 1s ease;
    }
  ```
### TransitionGroup
- ==功能: 给一组元素实现动画==
- 需要CSSTransition负责动画效果,==key值必须唯一不变,不能为列表的index==
  ```js
    import React, { PureComponent } from 'react'
    import { TransitionGroup, CSSTransition } from 'react-transition-group'
    import './style.css'

    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {
          books: [
            { name: '你不知道的JS', price: 200, count: 10 },
            { name: 'JS高级程序设计', price: 120, count: 5 },
            { name: 'react基础设计', price: 180, count: 2 },
          ]
        }
      }
      addNewBook() {
        const books = [...this.state.books]
        books.push({ name: 'vue大全', price: 299, count: new Date().getTime() })
        this.setState({ books })
      }
      delBook(index) {
        const books = [...this.state.books]
        books.splice(index, 1)
        this.setState({ books })
      }
      render() {
        const { books } = this.state
        return (
          <div>
            <h2>书籍列表:</h2>
            {/* ul替换TransitionGroup包裹li列表 */}
            {/* component规定元素类型,默认div */}
            {/* TransitionGroupn内必须有CSSTransition属性,用来规划动画效果 */}
            {/* CSSTransition的key值必须唯一,不能为index,否则在删除列表时,index会错乱 */}
            <TransitionGroup component='ul'>
              {
                books.map((item, index) => {
                  return (
                    <CSSTransition
                      key={item.count}
                      classNames='book'
                      timeout={1000}
                    >
                      <li>
                        {item.name}-{item.price}-{item.count}
                        <button onClick={e => this.delBook(index)}>删除</button>
                      </li>
                    </CSSTransition>
                  )
                })
              }
            </TransitionGroup>
            <button onClick={e => this.addNewBook()}>添加新书</button>
          </div>
        )
      }
    }

    export default App
  ```
- 添加书籍进入动画,删除书籍离开动画
  ```css
    .book-enter{
      transform: translateX(100px);
      opacity: 0;
    }

    .book-enter-active{
      transform: translateX(0);
      opacity: 1;
      transition: all 1s ease;
    }

    .book-exit{
      transform: translateX(0);
      opacity: 1;
    }
    .book-exit-active{
      transform: translateX(100px);
      opacity: 0;
      transition: all 1s ease;
    }
  ```
## React的CSS
- 在react中编写css的方式有很多,没有统一的规范
- 前端现在是组件化的天下,但是css本身不是为组件化设计的,而是针对全局的,所以需要找到一个css适配方案
- 组件化下合适的css解决方案:
  - 可以写局部css,具备自己作用域,不污染别的组件内的元素
  - 可以写动态css,获取当前组件状态,根据状态生成不同的css样式
  - 支持所有css特性,伪类,动画,媒体查询等
  - 缩写起来简写方便,最好符合css风格
  - 等等...
  > vue在css方面好于react,风格统一(style内),简洁方便(scoped,lang)
### 内联样式
- 内联样式: 
  - 允许写一个js对象作为style的样式指导,采用驼峰写法;
  - 可以引入state的变量,实现动态的样式
  ```js
    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {
          fontSize: 30
        }
      }
      bigTitle() {
        this.setState({
          fontSize: 40
        })
      }

      render() {
        const { fontSize } = this.state
        return (
          <div>
            {/* 依靠state实现动态变化的css,来自服务器的值也可以存入state实现效果 */}
            <h2 style={{ color: 'red', fontSize: `${fontSize}px` }}>我是标题</h2>
            <p style={{ color: 'blue', fontSize: '20px' }}>我是内容</p>
            <button onClick={e => this.bigTitle()}>标题变大</button>
          </div>
        )
      }
    }
  ```
- 优点:
  - 样式之间不会冲突
  - 动态获取state中状态
- 缺点: 
  - 写法是驼峰(font-size->fontSize)
  - 编写样式没有提示
  - 大量的样式,代码混乱
  - 某些样式无法编写,伪类/伪元素
  > 官方希望内联样式结合普通的css一起编写
### 普通css
- 通常编写一个单独的css文件,然后引入 `import './style.css`
- 优点: 完全的css编程
- ==缺点: 没有作用域,全局的样式,无论是不是父子关系,只要引入后,对当前文件夹内的其他文件的样式都是全局影响的!==
  > 容易产生冲突,一个人修改css文件的样式可能把其他人的某些文件内的样式更改!
### css模块化
- react官方为了解决css全局问题,提供了css modules方案,这个方案在webpack配置环境下都可以使用
- webpack.config.js: `modules: true` ==**react的打包脚手架已经内置,后期换vite脚手架留意有没有内置**==
- 使用: 文件名后缀更改
  ```
    .css/.less/.scss -> .module.css/.module.less/.module.scss
  ```
- ==使用模块css和普通css有所不同==
  ```js
    import React, { PureComponent } from 'react'
    // 引入模块化的css,和普通引入css不同
    import appStyle from './style.module.css'
    import Home from './Home'

    export class App extends PureComponent {
      render() {
        return (
          <div>
            {/* 使用模块下的css属性 */}
            <h2 className={appStyle.title}>我是标题</h2>
            <p className={appStyle.content}>我是内容</p>
            <Home />
          </div>
        )
      }
    }

    export default App
  ```
  > 内核: 给class名字修改, 文件名_className名_Hash值, 保证className名的唯一性, 类似于vue的style+scoped, 也是改class名字;
- 优点: 解决了普通css的非模块化的全局问题
- 缺点: 
  - 写法麻烦,每一个样式都需要写在jsx对应元素上
  - 引用的类名不支持`-`,还是要驼峰写法
  - 不方便动态修改样式,需要搭配内联样式
### less配置与编写
- less配置
  - 方法1: react的webpack配置是内置隐藏的,可以通过`npm run eject`暴露react的webpack配置,但是涉及源码修改,需要扎实的webpack配置基础知识,改错了会导致项目无法运行
  - ==方法2(推荐)==: 工具craco(create-react-app-config),下载: `npm i @craco/craco`和`npm i craco-less`
  - 启动命令修改 使用craco启动,这样webpack可以获取到craco.config.js配置文件信息
    ```json
      /* package.json */
      "scripts": {
        -   "start": "react-scripts start",
        -   "build": "react-scripts build",
        -   "test": "react-scripts test",
        +   "start": "craco start",
        +   "build": "craco build",
        +   "test": "craco test",
      }
    ```
  - 创建craco.config.js文件并进行配置(4.x文档中关于craco-less的配置写在这里面即可)
    ```js
      const CracoLessPlugin = require('craco-less');

      module.exports = {
        plugins: [
          {
            plugin: CracoLessPlugin,
            options: {
              lessLoaderOptions: {
                lessOptions: {
                  modifyVars: { '@primary-color': '#1DA57A' },
                  javascriptEnabled: true,
                },
              },
            },
          },
        ],
      };
    ```
    > ==**注意: 由于create-react-app框架已经弃用,以后还是推荐vite+craco来实现(5.x版本文档首推)**==
### CSS in JS(推荐)
- 前面学习的html in js,即jsx语法; ==接下来学习css in js,这是最终方案,也是最推荐的方案==
- 在传统前端中,结构html,样式css和逻辑js是分离的; react认为这是不可分离,所以才有了jsx语法,所以才有了css in js,这样也方便使用js中的状态,所以也成为all in js(react)
- ==这个方法有缺点有优点,总体来说coderwhy老师非常推荐这个写法,国外的UI库materials使用的就是这个方案==
- 目前比较受欢迎的css in js的库
  - ==styled-components(最流行)==
  - emotion
  - glamorous
- 下载: `npm i styled-components`
- ==补充知识(ES6+ 标签模板字符串)==
  ```js
    // ES6+的知识,标签模板字符串
    // 1.常规模板字符串
    const myname = 'codewhy'
    const age = 18
    const str = `my name is ${myname}`
    console.log(str)

    // 2.标签模板字符串
    function foo(...args) {
      console.log(args)
    }

    // 调用函数的方式
    // foo('why',100,1.88) // 方法1
    foo`my name is ${myname}, age is ${age}` // 方法2
    // 依据动态插入的${}作为分隔符
    // 参数构成: 'my name is' | ', age is' | '' ,共3个,最后是空字符串,封装进数组的第一项
    // 后面的2个动态${},作为数组的第二项和第三项
    // 打印结果: [ [ 'my name is ', ', age is ', '' ], 'codewhy', 18 ]
  ```
- 样式文件style.js
  ```js
    import styled from 'styled-components';

    export const AppWrapper = styled.div`
      .section{
        border: 1px solid red;

        .title{
          font-size: 30px;
          color: red;
        }
        &:hover{
          background-color: blue;
        }

        .content{
          font-size: 20px;
          color: green;
        }
      }

      .footer{
        border: 1px solid blue;
      }
    `
  ```
  > styled.div是一个函数,使用标签模板字符串调用(等同于styled.div())
  > .div是因为这个组件要代替一个div标签,可以写别的标签
  > ==需要下载插件vscode-styled-components==
  > 里面的css代码具有模块化
- 使用css in js, App,jsx页面
  ```js
    import React, { PureComponent } from 'react'
    import { AppWrapper } from './style'

    export class App extends PureComponent {
      render() {
        return (
          <AppWrapper>
            <div className='section'>
              <div className='title'>标题</div>
              <div className='content'>内容</div>
            </div>
            <div className='footer'>
              <p>免责声明</p>
              <p>法律顾问</p>
            </div>
          </AppWrapper>
        )
      }
    }

    export default App
  ```
  > ==引入组件,组件的css对包裹内部的所有元素生效==
  > 为了更好的区分可以写多个组件,看个人,比如单独为section及其内部的元素提供小范围css支持
### 共享主题方案(*)
- 在做爱彼迎项目时,学习到的,styled-components可以提供主题,类似于store一样,也有一套生产者模式,如下
- ==定制主题theme,另外Ant Design上面也有一些预制主题==
  - styled-components有一个ThemeProvider方法,和共享store一样,可以共享主题
    ```js
      // 最外层index.js
      // styled-components 主题共享
      import { ThemeProvider } from 'styled-components'
      // 引入css主题
      import theme from '@/assets/theme' 

      {/* 公开store */}
      <Provider store={store}>
        {/* 公开css主题 theme */}
        <ThemeProvider theme={theme}>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    ```
  - 配置主题theme `assets/theme/index.js`
    ```js
      const theme = {
        color: {
          primaryColor: "#ff385c",
          secondaryColor: "#00848A"
        }
      }

      export default theme
    ```
    > 可以写多个,比如有的网站有白天和黑夜2个模式,这里也可以设置多个不同的主题
  - ==使用主题,给Airbnb的logo和字体添加主题颜色==
  - 同时给logo优化: 加点击cursor: pointer属性和间距等css样式
    ```js
      import styled from 'styled-components'

      export const LeftWrapper = styled.div`
          flex: 1;
          color: ${props => props.theme.color.primaryColor};
          .left{
            display: flex;
            align-items: center;
            .logo{
              padding-left: 15px;
              cursor: pointer;
            }
          .text{
            cursor: pointer;
            padding-left: 8px;
            color: ${props => props.theme.color.primaryColor};
          }
        } 
    ```
    > ==模板字符串中使用变量`${}`,传入的theme在props参数内,这是函数调用的一种特殊方式,所以可以直接在`${}`内直接获取到props,进而找到公开的主题==
### 动态CSS in JS(*)
- ==额外的,服务器还传递额外的字体颜色数据,如何向css in js中传递变量,前面也学习了,如下==
    ```html
    <!-- room-item: 传递服务器变量数据, 这里记得加$(文档要求的)  -->
    <ItemWrapper $verifyColor={itemData?.verify_info?.text_color || '#39576a'}>
      <!-- ..... -->
    </ItemWrapper>
    ```
    > 传递参数前面记得加`$`
- 内部css in js通过props获取使用即可
  ```css
     .desc {
        margin: 10px 0 5px;
        font-size: 12px;
        font-weight: 700;
        /* 接受服务器传递的动态文字颜色 */
        color: ${props => props.verifyColor};
      }
  ```
  > 这样css中的字体颜色可以动态更具服务器设置变化,同理别的属性都是这样

### css中的js变量
- 在css in js中,css可以使用一些js的变量,其中包括一些state变量,这样可以通过js控制css的样式
- ==1.共享主题方案==
- 选择在根组件共享,根组件及其组件树这样所有组件都会获取共享的值
  ```js
  // 外层index.js
  import { ThemeProvider } from 'styled-components' // css样式有关

  // 使用共享主题,共享内容是对象
  root.render(
    <ThemeProvider theme={{ color: 'purple', size: '50px' }}>
      <App />
    </ThemeProvider>
  )
  ```
  > 部分代码展示,引入ThemeProvider,共享值必须为对象格式
- 创建新的页面Home,和vue一样,创建Home文件夹,index.jsx写页面,style.js写css,这样App.jsx引入页面Home时可以简写(省略/index.js)
  ```js
    // Home/index.js
    import { HomeWrapper } from './style'

    export class index extends PureComponent {
      render() {
        return (
          <HomeWrapper>
            <div className='top'>
              <div className='banner'>Banner</div>
              <div className='bottom'>
                <ul className='product-list'>
                  <li className='item'>商品1</li>
                  <li className='item'>商品2</li>
                  <li className='item'>商品3</li>
                </ul>
              </div>
            </div>
          </HomeWrapper>
        )
      }
    }
  ```
  > 记得引入样式组件HomeWrapper,这里省略App.jsx引入Home页面,但是必须引入,这样Home才能和App在一个组件树下,共享到主题的值
- style.js 书写Home页面的css样式
  ```js
    import styled from "styled-components";

    export const HomeWrapper = styled.div`
      .banner{
        color: red;
        font-size: 25px;
      }

      .product-list{
        .item{
          /* 可以从主题中直接拿属性 */
          color: ${props => props.theme.color};
          font-size: ${props => props.theme.size};
        }
      }
  ```
  > 直接从props.theme.XX中获取到主题共享的属性
- ==2.单独的js文件提供变量==
  ```js
    // /style/variables.js
    export const primaryColor = '#ff8800'
    export const secondColor = '#ff7788'

    export const smallSize = '12px'
    export const middleSize = '22px'
    export const largeSize = '32px'
  ```
- 引入上面js文件,然后使用里面的js变量
  ```js
    // App页面的style.js 核心代码
    import styled from 'styled-components';
    // 引入文件内的所有导出变量,作为(as)vars的一部分
    import * as vars from './style/variables'

    export const AppWrapper = styled.div`
      .section{
        border: 1px solid red;

        .content{
          /* 直接引入style.js文件内的js变量 */
          font-size: ${vars.largeSize};
          color: ${vars.primaryColor};
        }
      }
    `
  ```
- ==3.直接传入,与state联动==
- 可以通过js控制state变化,进而影响css样式
  ```js
    // App.jsx 部分核心代码
    import { AppWrapper } from './style'

    constructor() {
      super()
      this.state = {
        fontSize: 20,
        color: 'yellow'
      }
    }
    render() {
      const { fontSize, color } = this.state
      return (
        <div>
          {/* 把对应的state作为参数传给css样式 */}
          <AppWrapper fontSize={fontSize} color={color}>
            <div className='section'>
              <div className='title'>标题</div>
              <div className='content'>内容</div>
            </div>
            <button onClick={e => this.setState({ color: 'orange' })}>修改颜色</button>
          </AppWrapper>
        </div>
      )
    }
  ```
  > 可以通过点击按钮,改变color值,重新渲染
- style.js 通过props获取默认传参的值,如果没有传参,通过attrs设置默认值
  ```js
    // 接受外部组件存入props中,在模板字符串中使用${} + 箭头函数调用state中的值
    // 没有传递参数可以设置默认值,链式调用,先调用attrs方法,然后再通过标签模板字符串调用函数
    // attrs只返回一个对象,可以简写 props => ({...}) 这里略
    export const AppWrapper = styled.div.attrs(props => {
      return {
        // 返回一个函数,如果外部没有传参,那么props.XX就为空值,这时取后面的默认值即可
        color: props.color || 'blue',
        fontSize: props.fontSize || '18px'
      }
    })`
      .section{
        border: 1px solid red;

        .title{
          // 接受传入的state参数值
          font-size: ${props => props.fontSize};
          color: ${props => props.color};
        }
        
        &:hover{
          background-color: blue;
        }
      }
    `
  ```
### styled继承
- 支持样式继承
  ```js
    // styled 继承
    const HyButton = styled.button`
      border: 1px solid red;
    `
    // 继承上面的button样式
    export const HyButtonWrapper = styled(HyButton)`
      color: yellow;
      background-color: green;
    `
  ```
### 动态添加class
- react中添加动态class很灵活,但也很麻烦,比如下面的代码,一旦动态添加的class变多就会很难维护
- ==提供2个传统方式实现动态添加class==
  ```js
    import React, { PureComponent } from 'react'

    export class App extends PureComponent {
      constructor() {
        super()
        this.state = {
          isbbb: true,
          isccc: true
        }
      }

      render() {
        const { isbbb, isccc } = this.state
        const classList = ['aaa']
        if (isbbb) classList.push('bbb')
        if (isccc) classList.push('ccc')
        const NewClassList = classList.join(" ")

        return (
          <div>
            <div className={`aaa ${isbbb ? 'bbb' : ''} ${isccc ? 'ccc' : ''}`}>呵呵呵</div>
            <div className={NewClassList}>哈哈哈</div>
          </div>
        )
      }
    }

    export default App
  ```
- react中动态添加class使用的第三方库classnames
- 下载: `npm i classnames`
- 方法:
  ```js
    classNames('foo', 'bar'); // => 'foo bar'
    classNames('foo', { bar: true }); // => 'foo bar'
    classNames({ 'foo-bar': true }); // => 'foo-bar'
    classNames({ 'foo-bar': false }); // => ''
    classNames({ foo: true }, { bar: true }); // => 'foo bar'
    classNames({ foo: true, bar: true }); // => 'foo bar'

    // lots of arguments of various types
    classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

    // other falsy values are just ignored
    classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
  ```
- 改进版,导入的名字可以随意,比如`_`
  ```js
    import classNames from 'classnames'
    <div className={classNames('aaa', { bbb: isbbb, ccc: isccc })}>嘿嘿嘿</div>
  ```
