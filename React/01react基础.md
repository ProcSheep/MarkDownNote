# react基础
## 如何学习
- 学习任何一个技术
  - 官方文档
  - 看书学习
  - 开源项目
  - 视频学习
- react(课程)体系(已经19.x,先学习18.x再升级学习19的新东西)
  - 基础react
  - 核心react
  - ==难点: 状态管理rudex==
  - react-router
  - react-hooks
  - 爱彼迎demo
  - react自动化部署
  - 额外的: tailwind css,面经,源码,架构设计,封装等
- react基础
  - 对js有高要求,例如ES6+,this等
- react是一个构建用户界面的js库
## 邂逅react
### react初体验
- react开发特点:
  - 声明式
    [![pETlefg.png](https://s21.ax1x.com/2025/04/27/pETlefg.png)](https://imgse.com/i/pETlefg)
  - 组件化
    [![pEDCtXR.jpg](https://s21.ax1x.com/2025/03/25/pEDCtXR.jpg)](https://imgse.com/i/pEDCtXR)
  - 多平台
    [![pETlnpQ.png](https://s21.ax1x.com/2025/04/27/pETlnpQ.png)](https://imgse.com/i/pETlnpQ)
- react依赖
  - react
  - react-dom: 渲染页面
  - babel: 将jsx转为react代码,jsx代码->普通js代码->浏览器
- 依赖引入
  - ==CDN(初学),默认现在html中学习==
  - 本地下载
  - npm(脚手架)
- 案例演示:
  ```html
    <body>
      <div id="root"></div>

      <!-- CDN -->
      <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
      <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
      <!-- 必须写类型,这样才会被babel识别转化,浏览器不建议使用babel,会报错,不用理会 -->
      <script type="text/babel">
        // 点击按钮把hello world -> hello react
        const root = ReactDOM.createRoot(document.querySelector('#root'))
        // 1.文本变为变量
        let message = 'hello world'
        // 2.监听按钮点击
        function btnClick() {
          // 2.1 修改界面
          message = 'hello react'
          // 2.2 react不会自动渲染界面(vue可以)
          // 内层小括号代表一个整体
          root.render((
            <div>
              <h2>{message}</h2>
              <button onClick={btnClick}>改变文本</button>
            </div>
          ))
        }
        // react的变量,统一使用{}
        // 在root内渲染内容
        root.render((
          <div>
            <h2>{message}</h2>
            <button onClick={btnClick}>改变文本</button>
          </div>
        ))
      </script>
    </body>
  ```
- 本地文件引入
  ```html
    <body>
      <div id="root"></div>
      <!-- 本地文件 -->
      <script src="../lib/react.js"></script>
      <script src="../lib/react-dom.js"></script>
      <script src="../lib/babel.min.js"></script>
      <script type="text/babel">

      </script>
    </body>
  ```
### 组件化
- ==react.render()不仅可以渲染HTML元素,还可以渲染组件==
  ```js
    <script type="text/babel">
      // 类组件,继承react
      class App extends React.Component {
        constructor() {
          // 记住首先super(),继承父类
          super()
          // react中和修改页面有关的数据统一定义在这里
          this.state = { 
            message: 'hello world'
          }
        }
        // 事件处理函数
        btnClick() {
          this.setState({
            message: 'hello react'
          })
        }

        // 继承后,获取的render函数
        // 内部绑定事件需要额外的确定this指向为这个实例对象,默认情况是undefined
        render() {
          return (
            <div>
              <h2>{this.state.message}</h2>
              <button onClick={this.btnClick.bind(this)}>修改文本</button>
            </div>
          )
        }
      }

      const root = ReactDOM.createRoot(document.querySelector('#root'))
      // 渲染组件
      root.render(<App />)
    </script>
  ```
  > 继承react的类,定义整体state和定义方法,最后统一由render方法渲染
  > ==setState()方法在修改state后会自动重新执行一次渲染操作,所以不必再重新写一次render了==
- ==难点: 绑定的事件btnClick的this指向为undefined==
  因为在正常的DOM操作中，监听点击，监听函数中的this其实是节点对象（比如说是button对象）
  这次因为React并不是直接渲染成真实的DOM，我们所编写的button只是一个语法糖，它的本质React的Element对象
  那么在这里发生监听的时候，react在执行函数时并没有绑定this，默认情况下就是一个undefined(babel转化为严格模式)

### 案例-电影列表
- react很灵活,提供3种写法
  ```js
    ...
  ```
- ==简单的列表数据转换推荐使用js高级语法(ES6+)map==
  
### 案例-计数器
- 事件绑定与bind
  ```js

  ```
## JSX
### 什么是jsx
- jsx是js的扩展系列,形如下面的代码,原生js是不认识的,js中出现元素标签`<>`
  ```js
    render() {
        return (
          <div>
            <h2>{this.state.message}</h2>
            <button onClick={this.btnClick.bind(this)}>修改文本</button>
          </div>
        )
    }
  ```
  > 不报错是因为我们使用babel,已经将代码转化为js认识的代码`React.createElement
  > 开发react都需要babel转化! react都需要转化为js才能运行
  - JSX很多地方称之为javascript XML,看起来像XML语法(把html写进js里,css写进js,可以是all in js)
  - 它用于描述我们的UI界面(js中的html),并且和js融合在一起
  - 它不同于vue中的模板,不需要专门学习指令 v-if v-else v-for v-bind
- react为什么选择JSX? 文档里的react设计哲学,react认为js和html内在耦合太高(联系很紧密),所以没有分开html和js,直接合并在一起了
### jsx书写规范
- 1.jsx顶层只能有一个根元素
- 2.jsx的return通常包裹一个`()`,将()内的jsx当作一个整体,实现换行
  ```js
    render() {
        return (
          <div>
            <h1>根元素只能有一个,就是只有一个最外层div</h1>
          </div>
        )
    }
  ```
- 3.jsx可以单标签,格式必须为`<XX/>`
### jsx的注释编写
- 注释:`{\* *\}` 
```js
   render() {
      return (
        <div>
          { /* jsx中麻烦的注释,脚手架中(.jsx)可以直接生成,但这是html的script标签,所以不可以 */}
          <h1>你好</h1>
        </div>
      )
    }
```
### jsx的插入内容规范
1.Number/String/Array类型可以直接显示,数组会遍历拼接显示
2.null/undefined/boolean类型,显示为空,什么都没有;
  如果非要显示,转化为字符串类型  
3.==Object对象类型不能直接作为子元素显示!!!!!
  可以具体取到对象的某个值 `object.XXX`==
### 嵌入不同的表达式
- 1.jsx的`{}`还可以插入表达式
  ```js
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: '123',
          str1: 'zywoo ',
          str2: 'ropz',
          age: 20,
          movies: ['ZyWoo', 'Esl', 'Mvp', 'Top1']
        }
      }

      getMoviesList() {
        const liEls = this.state.movies.map(item => <li>{item}</li>)
        return liEls
      }

      render() {
        const { str1, str2, age } = this.state
        return (
          <div>
            <div>{this.state.message}</div>
            <h2>计算: {10 + 20}</h2>
            <h2>字符串拼接: {str1 + str2}</h2>
            <h2>三元运算: {age > 18 ? '成年人' : '未成年人'}</h2>
            <h2>
              map函数:
                <ul>
                  {this.state.movies.map(item => <li>{item}</li>)}
                </ul>
            </h2>
            <h2>
              函数方法: {this.getMoviesList()}
            </h2>
          </div>
        )
      }
    }

  ```
### jsx属性绑定
- 元素的js原生绑定,例如有class,style,src,title,href等属性
- ==jsx绑定属性统一用`{}`==
  ```js
     class App extends React.Component {
      constructor() {
        super()
        this.state = {
          title: '呵呵呵',
          imgUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.Nj6o69waOC3JTbebyCu-hgHaEc?rs=1&pid=ImgDetMain',
          href: 'https://www.baidu.com',
          isActive: true
        }
      }

      render() {
        const { title, imgUrl, href, isActive } = this.state
        // 方法1: 字符串拼接
        const className = `cba abc ${isActive ? 'active' : ''}`
        // 方法2: 数组
        const classList = ['abc', 'cba']
        if (isActive) classList.push('active')
        // 方法3: 第三方库 classnames,脚手架再学习

        return (
          <div>
            {/* 属性的基本绑定 */}
            <h1 title={title}>title属性</h1>
            <img src={imgUrl} alt="" />
            <a href={href}>百度</a>
            {/* 特殊地,绑定class属性,在js中class属于关键字,推荐className */}
            <h2 className={className}>123</h2>
            <h2 className={classList.join(" ")}>123</h2>
            {/* style样式属性绑定,绑定对象类型
                这里绑定对象作为属性,不属于子元素内的对象
                另外这不是vue的{{}}语法,react没有这个语法,里面的{}代表对象
              */}
            <h2 style={{ color: 'red', fontSize: '12px' }}>zywoo</h2>
          </div>
        )
      }
    }
  ```
## 事件绑定(类组件)
 - react事件绑定采用`小驼峰`,通过`{}`传入事件处理函数
 - 例如`onClick={this.handlerClick}.bind(this)`
### this三种绑定方式
- 事件绑定的事件处理函数中的this默认是undefined 
  ```
    this的四种绑定方式
    1.默认绑定,独立执行
    2.隐式绑定,被一个对象执行,obj.foo()
    3.显式绑定,call/apply/bind,改变this执行,前两者自动执行,后者手动执行
    4.new绑定,const foo = new Foo(),this指向新创建的实例对象foo
  ```
  `onClick={this.handleClick}`: 不是隐式绑定,这不是调用`this.handleClick()`,而是把函数的地址赋值给onClick
- ==类比如下==
  ```js
    const obj = {
      foo: function handleClick(){
        console.log('foo')
      }
    }
    obj.foo() // 隐式绑定,this->obj

    const config = {
      onClick: obj.foo
    } 
    // = onClick={this.handleCilck}
    const click = config.onClick
    // 点击执行事件的时候是这样的
    click() // 默认绑定,严格模式下this->undefined
  ```
- ==绑定bind,形如下面==
  ```js
     const config = {
      onClick: obj.foo.bind(obj)
    } 
  ```
- ==**但是最常用方法,直接传入一个箭头函数**==
  ```js
    btnClick() {
        console.log('click')
    }

    render() {
        return (
          <div>
            {/* 要求传入函数,传入箭头函数 */}
            <button onClick={() => this.btnClick()}>按钮</button>
          </div>
      )
    }
  ```
  > 点击button,执行箭头函数,箭头函数返回后面的内容,==后面的内容执行事件处理函数,对的! 这次是执行函数,带`()`,此时属于隐式绑定,this指向调用对象,而btnClick函数前面的this就是指向这个类方法的,效果和bind(this)一样==
  > ==**如果事件处理函数不需要用this,就不用写**==
### 事件传参方式
- 传递默认参数event / 额外的自定义参数
- ==总之还是推荐箭头函数的写法==
  ```js
    click(event, name, age) {
        // react封装的默认参数event
        console.log('event参数:', event)
        console.log('this:', this)
        console.log('额外的参数', name, age)
    }

    render() {
      return (
        <div>
          {/* 1. 传递event参数 */}
          <button onClick={this.click.bind(this)}>111</button>
          <button onClick={(event) => this.click(event)}>222</button>
          {/* 2. 额外的参数传递,不推荐bind */}
          <button onClick={(event) => this.click(event, 'kiki', 18)}>333</button>
        </div>
      )
    }
  ```
  > onClick点击事件默认有个event参数,所以箭头函数需要传参; 而自己传递参数,直接在函数内传递即可
### 案例-电影选中列表
```js
    class App extends React.Component {
      constructor() {
        super()
        this.state = {  
          movies: ['zywoo', 'esl', '大满贯', 'goat'],
          currentIdnex: 0
        }
      }

      itemClick(index) {
        this.setState({
          currentIdnex: index
        })
      }

      render() {
        const { movies, currentIdnex } = this.state
        return (
          <div>
            <ul>
              {
                movies.map((item, index) => {
                  return (
                    <li
                      className={currentIdnex === index ? 'active' : ''}
                      key={item}
                      onClick={() => this.itemClick(index)}
                    >
                      {item}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    }
```
## 条件渲染
### 条件渲染的3种方式
- 3种常见的方法
  ```js
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          isReady: true,
          friend: undefined // 来自服务器的值,初始可能为undefined
        }
      }

      render() {
        const { isReady, friend } = this.state
        // 1.条件判断
        let showElement = null
        if (isReady) {
          showElement = <h2>我准备好了</h2>
        } else {
          showElement = <h3>蟹老板,我准备好了!</h3>
        }
        return (
          <div>
            {/* 方式1: 直接js运算好放进来 */}
            <div>{showElement}</div>
            {/* 方式2: 短的可以用三元运算符 */}
            <div>{isReady ? <button>开始战斗</button> : <h3>准备好了</h3>}</div>
            {/* 方式3: &&运算符,前面是undefined后面就不执行了 */}
            <div>{friend && <div>{friend.name + " " + friend.age}</div>}</div>
          </div>
        )
      }
    }
  ```
  > ==功能类似v-if,不显示就不渲染这个dom对象==
### 案例-条件渲染+v-show
- ==巩固条件渲染知识和实现v-show的效果,注意react没有v-show,只是类似实现==
  ```js
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: 'hello',
          isShow: true
        }
      }

      changeShow() {
        // 点击取反,自动执行一次render函数
        this.setState({
          isShow: !this.state.isShow
        })
      }

      render() {
        const { message, isShow } = this.state

        return (
          <div>
            <button onClick={() => this.changeShow()}>切换</button>
            <div>{isShow && <h2>{message}</h2>}</div>
            {/* v-show效果 */}
            <h2 style={{ display: isShow ? 'block' : 'none' }}>v-show效果</h2>
          </div>
        )
      }
    }
  ```
### 列表渲染高阶函数
- ==在react的列表渲染高阶函数中,使用最多的就是map函数;其次还有过滤函数filter和截取函数slice==
- 就用js的思维去写代码,去处理数组数据!
- ==1.map函数==
  ```js
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        students: [
          { id: '1', name: 'kiki', score: '1095' },
          { id: '2', name: 'miko', score: '1220' },
          { id: '3', name: 'fego', score: '980' },
          { id: '4', name: 'iupa', score: '1480' },
        ]
      }
    }


    render() {
      const { students } = this.state
      return (
        <div>
          <h2>学生列表数据</h2>
          <div className="studentList">
            <div className="listItem">
              {
                students.map(item => {
                  return (
                    <div>
                      <h2>id: {item.id}</h2>
                      <h3>姓名: {item.name}</h3>
                      <h3>分数: {item.score}</h3>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    }
  }
  ```
- ==2.filter/slice==
  ```js
  render() {
      const { students } = this.state
      // 分数 > 1010, filter
      const filterStudents = students.filter(item => {
        return item.score > 1010
      })
      // 只展示前2个人,前闭后开[start,end) slice
      const sliceStudents = filterStudents.slice(0, 2)

      return (
        <div>
          <h2>学生列表数据</h2>
          <div className="studentList">
            <div className="listItem">
              {
                sliceStudents.map(item => {
                  return (
                    <div>
                      <h2>id: {item.id}</h2>
                      <h3>姓名: {item.name}</h3>
                      <h3>分数: {item.score}</h3>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    }
  ```
- ==高阶函数filter map slice都是返回新数组,所以可以链式调用==
  ```js
    return (
        <div>
          <h2>学生列表数据</h2>
          <div className="studentList">
            <div className="listItem">
              {
                sliceStudents.filter(item => item.score > 1010).slice(0,2).map(item => {
                  return (
                    <div>
                      <h2>id: {item.id}</h2>
                      <h3>姓名: {item.name}</h3>
                      <h3>分数: {item.score}</h3>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
  ```
## JSX本质
### jsx转换过程
- jsx浏览器根本不认识,默认是报错的,不过通过转化,React.createElement(component,props,...children)函数转化为虚拟dom,然后通过React再转化为真实dom,然后浏览器再渲染,每一行的jsx代码都需要createElement函数转化,jsx仅仅是createElement函数的语法糖
- createElement函数需要3个参数: 
- jsx: `<div title='哈哈哈'>呵呵呵</div>`
- 参数1: 类型type, 元素就标签名'div'; 组件就组件名
- 参数2: 属性config, jsx中所有的属性都会以对象的属性和值的形式存储,title='哈哈哈'
- 参数3: 子元素children, 标签中的子元素,以数组方式存储
- ==babel官网转换,左边转换模式,两个都看看 OPTIONS/React Runtime==
  [![pE713Os.png](https://s21.ax1x.com/2025/04/28/pE713Os.png)](https://imgse.com/i/pE713Os)
  [![pE71Gmn.png](https://s21.ax1x.com/2025/04/28/pE71Gmn.png)](https://imgse.com/i/pE71Gmn)
### 原生react
- ==不使用babel转化,把Babel的代码复制过来即可==
- 删除`<script type="text/babel"> + <script src="../lib/babel.min.js"></script>`
  ```js
    // class App 内 ...
    render() {
        const element = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          className: "header"
        }, "header"), /*#__PURE__*/React.createElement("div", {
          className: "content"
        }, 
        /*#__PURE__*/React.createElement("ul", null, 
            /*#__PURE__*/React.createElement("li", null, "\u5217\u8868\u6570\u636E1"), 
            /*#__PURE__*/React.createElement("li", null, "\u5217\u8868\u6570\u636E2"), 
            /*#__PURE__*/React.createElement("li", null, "\u5217\u8868\u6570\u636E3"), 
            /*#__PURE__*/React.createElement("li", null, "\u5217\u8868\u6570\u636E4"), 
            /*#__PURE__*/React.createElement("li", null, "\u5217\u8868\u6570\u636E5"))), 
            /*#__PURE__*/React.createElement("div", {
              className: "footer"
        }, "footer"));

        return element
    }

    // 稍微修改 
    root.render(React.createElement(App, null))
  ```
### 虚拟dom到真实dom
- 通过react.createElement最终创建出一个ReactElement对象,这是一个js的对象,也是一个虚拟dom对象
- 多个虚拟dom对象之间会有相互关联,构成虚拟dom树
- ==打印上面的babel转化代码element,直观地看虚拟dom树(js对象)==
  > 1
  [![pE71llQ.png](https://s21.ax1x.com/2025/04/28/pE71llQ.png)](https://imgse.com/i/pE71llQ)
  > 2
  [![pE711yj.png](https://s21.ax1x.com/2025/04/28/pE711yj.png)](https://imgse.com/i/pE711yj)
  > 3
  [![pE71NkV.png](https://s21.ax1x.com/2025/04/28/pE71NkV.png)](https://imgse.com/i/pE71NkV)
- ==虚拟dom主要的作用==
  - 1.更新数据更快,当数据发生改变重新渲染页面结构时,会创建新的虚拟dom,对新旧虚拟dom进行diff算法对比,然后修改更新,js对比数据很快
  - ==2.虚拟dom本质是js对象,并不是真实的dom对象,后期会由react渲染,对相同的虚拟dom可以转化为不同端的页面,实现跨平台,比如PC端,手机ios/android端==
- 虚拟dom是我们从命令时编程转向声明式编程
  - ==命令式编程==就是js原生获取dom,进行一点点的事件监听等操作,一步步地发送命令进行页面逻辑编写
  - ==声明式编程==关注 “做什么” ，开发者只需声明想要的结果或状态，无需关心具体实现过程,将 UI 拆分成一个个小的、可复用的组件，每个组件管理自身状态和行为。比如一个按钮组件，开发者只需定义它接收哪些属性（props），有怎样的初始状态（state），以及状态变化时如何渲染，而不用关心按钮内部具体的 DOM 操作,从手动修改dom,属性操作,事件处理中解放出来
  > 虚拟dom,UI以一种理想化的形式保存在内存中,并且它是一个相对简单的js对象(ReactElement)
  > 通过ReactDOM.render让虚拟dom和真实dom同步起来,这叫做协调

## 阶段案例
### 基础页面搭建
- 引入数据,构建页面html结构,构建css结构
  ```html
    <!-- 引入书籍数据,相当于全局定义了books数据 -->
    <script src="./data.js"></script>
    <script type="text/babel">
      const root = ReactDOM.createRoot(document.querySelector('#root'))
      class App extends React.Component {
        constructor() {
          super()
          this.state = {
            books: books
          }
        }


        render() {
          const { books } = this.state
          return (
            <div>
              <table>
                {/* 每一列的数据 */}
                <thead>
                  <tr>
                    <td>序号</td>
                    <td>名称</td>
                    <td>出版</td>
                    <td>价格</td>
                    <td>数量</td>
                    <td>操作</td>
                  </tr>
                </thead>
                {/* 每一行的数据 */}
                <tbody>
                  {
                    books.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.date}</td>
                          <td>￥{item.price}</td>
                          <td>
                            <button>-1</button>
                            {item.count}
                            <button>+1</button>
                          </td>
                          <td>
                            <button>删除</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          )
        }
      }

      root.render(<App />)
    </script>
  ```
  ```css
    <style>
      table {
        border-collapse: collapse;
        text-align: center;
      }

      thead {
        background-color: #f2f2f2;
      }

      td,
      th {
        padding: 10px 16px;
        border: 1px solid black;
      }
    </style>
  ```
### 价格与格式化
- ==2个方法==
  ```js
    const { books } = this.state
    // 计算价格
    let totalPrice = 0
    // 方法1: for循环
    for (let i = 0; i < books.length; i++) {
      const book = books[i]
      totalPrice += book.price * book.count
    }
  ```
  ```js
    // 方法2: 高阶函数reduce
    // 参数 上一次的结果,这次的值,初始值(0)
    const totalPrice = books.reduce((preValue, item) => {
      return preValue + item.count * item.price
    }, 0)
  ```
  ```html
    <h2>总价格: ￥{totalPrice}</h2>
  ```
- ==也可以封装函数==
  ```js
     getTotalPrice() {
        const totalPrice = this.state.books.reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0)

        return totalPrice
      }
  ```
  ```html
    <h2>总价格: ￥{this.getTotalPrice()}</h2>
  ```
- ==开发中抽取工具,针对￥等符号==
- format.js
  ```js
    function formatPrice(price,icon='￥'){
      // 保留2位小数
      return icon + Number(price).toFixed(2)
    }
  ```
  ```html
     <!-- 引入格式工具 -->
    <script src="./format.js"></script>
    <td>{formatPrice(item.price)}</td>
    <h2>总价格: {formatPrice(this.getTotalPrice())}</h2>
  ```
### 商品加减操作
- 加减的逻辑
  ```js
    increment(index) {
      // react一般不要直接修改原来的数据,后面讲
      // this.state.books[index].count += 1 

      // 代码规范-推荐做法-修改对象深层数据
      // 浅拷贝-对新的数据进行修改
      const newBooks = [...this.state.books]
      newBooks[index].count += 1
      this.setState({ books: newBooks })
    }
    decrement(index) {
      const newBooks = [...this.state.books]
      newBooks[index].count -= 1
      this.setState({ books: newBooks })
    }
  ```
  > ==注意: react不建议对原始数据的深层进行直接修改==
- 合并两个函数
  ```js
    changeCount(index, count) {
      const newBooks = [...this.state.books]
      newBooks[index].count += count
      this.setState({ books: newBooks })
    }
  ```
  ```html
    <td>
      <button
        disabled={item.count <= 1}
        onClick={() => this.changeCount(index, -1)}
      >
        -
      </button>
      {item.count}
      <button onClick={() => this.changeCount(index, 1)}>+</button>
    </td>
  ```
  > ==-1的情况,只要数量小于等于1就不能再减了==
### 删除商品与零数据展示
- 1.删除商品数据---数组的删除
  ```js
    removeItem(index) {
        // 同理不要直接修改
        const newBooks = [...this.state.books]
        newBooks.splice(index, 1) // 删除数据(开始索引,删除数量)
        this.setState({ books: newBooks })
      }
  ```
  ```html
    <td>
      <button onClick={() => this.removeItem(index)}>删除</button>
    </td>
  ```
- 2.零数据显示---条件渲染
- ==对于复杂的页面渲染可以这样分2个函数,然后render中用三木统一渲染==
  ```js
    renderBooks() {
        const { books } = this.state
        return (
          <div>
            <table>
              {/* 每一列的数据 */}
              <thead>
                <tr>
                  <td>序号</td>
                  <td>名称</td>
                  <td>出版</td>
                  <td>价格</td>
                  <td>数量</td>
                  <td>操作</td>
                </tr>
              </thead>
              {/* 每一行的数据 */}
              <tbody>
                {
                  books.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{formatPrice(item.price)}</td>
                        <td>
                          <button
                            disabled={item.count <= 1}
                            onClick={() => this.changeCount(index, -1)}
                          >
                            -
                          </button>
                          {item.count}
                          <button onClick={() => this.changeCount(index, 1)}>+</button>
                        </td>
                        <td>
                          <button onClick={() => this.removeItem(index)}>删除</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <h2>总价格: {formatPrice(this.getTotalPrice())}</h2>
          </div>
        )
      }

      renderEmpty() {
        return <div><h2>购物车为空,请添加数据</h2></div>
      }

      // 最终渲染
      render() {
        const { books } = this.state
        return books.length ? this.renderBooks() : this.renderEmpty()
      }
  ```
