# React Hooks
- ==**新时代,开创新的概念,好用稳定,越来越多的项目使用Hooks**==
## State/Effect(***)
### 类组件和函数组件的缺陷
- ==函数式组件缺陷:==
  - 1.修改变量后, 不会自动重新渲染新的jsx; 类组件可以依靠setState重新调用一次render函数实现重新渲染
  - 2.如果页面重新渲染,函数会被重新执行,但是函数内部的变量也会重新被初始化,保存不了上次函数执行的结果
  - 3.没有生命周期函数
- ==类组件的优势==
  - 可以定义自己state,保存自己的内部状态
  - 有生命周期,在对应生命周期执行对应的逻辑
  - 状态改变时会自动执行一次render(渲染函数)
- ==类组件的缺点==: 总结下来就是复杂
  - 业务变多后,类组件的逻辑会越来越多,难以拆分; 类组件内的相同逻辑不好抽取(高阶组件)
  - class语法,this指向等概念不好学习(js高级)
  - 组件复用很难,比如高阶组件; 共享状态(Provider Consumer)比较复杂,容易嵌套过多
- ==**Hooks的出现**==
  - ==Hooks可以保证不编写class情况下使用state以及其他react特性(比如生命周期)==
  - 向下兼容,不需要把旧项目重构为Hooks格式,渐进式使用,不是破坏式更新
    > ==注意: Hook只能在函数组件内使用==
### 类组件与Hooks对比
- ==对比图示意==
  [![pEj8jPJ.png](https://s21.ax1x.com/2025/05/14/pEj8jPJ.png)](https://imgse.com/i/pEj8jPJ)
- ==计数器案例对比(体验Hooks)==
- ==类组件==
  ```js
    import React, { PureComponent } from 'react'

    export class CounterClass extends PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          count: 0 // 初始化计数器状态
        }
      }

      increment() {
        this.setState({ count: this.state.count + 1 }) // 增加计数
      }

      decrement() {
        this.setState({ count: this.state.count - 1 }) // 减少计数
      }

      render() {
        return (
          <div>
            <h3>计数器: {this.state.count}</h3>
            <button onClick={e => this.increment()}>+1</button>
            <button onClick={e => this.decrement()}>-1</button>
          </div>
        )
      }
    }

    export default CounterClass
  ```
- ==Hooks 快捷键`rmc`==
  ```js
    import { memo, useState } from "react";

    function CounterHook(props) {
      // 初始化一个state值
      // 返回一个数组arr,第一项是初始化的state; 第二项是一个函数; 一般要解构
      const [counter, setCounter] = useState(0)
      return (
        <div>
          <h3>当前计数: {counter}</h3>
          <button onClick={e => setCounter(counter + 1)}>+1</button>
          <button onClick={e => setCounter(counter - 1)}>-1</button>
        </div>
      )
    }

    export default memo(CounterHook)
  ```
### useState详解
- ==useState来自react，需要从react中导入，它是一个hook==
  - 参数：初始化值，如果不设置为undefined；
  - 返回值：数组，包含两个元素；
    - 元素一：当前状态的值（第一调用为初始化值）；
    - 元素二：设置状态值的函数；
- Tip：
  - Hook指的类似于useState、useEffect这样的函数
  - Hooks是对这类函数的统称
  > ==注意: hooks只能在**函数组件的顶层**使用,不可以放入for循环,if语句中使用以及其他的js普通函数内使用==
  > 但是如果普通函数命名为useXXX,也允许使用hooks,这是自定义hooks函数的语法,后面讲
- useState会帮助我们定义一个state变量，useState 是一种新方法，**它与 class 里面的this.state 提供的功能完全相同**
  - ==一般来说，在函数退出后变量就会”消失”，而state 中的变量会被React 保留==
- ==useState接受唯一一个参数==，在第一次组件被调用时使用来作为初始化值。（如果没有传递参数，那么初始化值为undefined）。
- ==useState的返回值是一个数组，我们可以通过数组的解构==，来完成赋值会非常方便。
  
### 初识useEffect 
- ==useEffect: 完成类组件中生命周期的功能==
- 完成类似 网络请求,手动更新DOM,一些事件的监听; 都是React更新DOM的一些副作用
- ==模拟标题改变==
- ==1.类组件==
  ```js
    import React, { PureComponent } from 'react'

    export class changeTitleClass extends PureComponent {
      constructor() {
        super()
        this.state = {
          counter: 0
        }
      }

      componentDidMount() {
        document.title = this.state.counter
      }

      componentDidUpdate() {
        document.title = this.state.counter
      }

      changeTitle() {
        this.setState({ counter: this.state.counter + 1 })
      }

      render() {
        const { counter } = this.state
        return (
          <div>changeTitleClass: {counter}
            <button onClick={e => this.changeTitle()}>+1</button>
          </div>
        )
      }
    }

    export default changeTitleClass
  ```
- ==2.Hooks==
  ```js
    import React, { memo, useEffect, useState } from 'react'

    const changeTitleHooks = memo(() => {
      const [count, setCount] = useState(0)
      // 使用生命周期函数,使用useEffect
      useEffect(() => {
        // 这个回调函数会在组件渲染完后自动执行
        // 网络请求/DOM操作/事件监听等副作用操作都在这里面执行
        document.title = count // DOM操作
      })

      return (
        <div>changeTitleHooks: {count}
          <button onClick={e => setCount(count + 1)}>+1</button>
        </div>
      )
    })

    export default changeTitleHooks
  ```
  > 每次点击完按钮,执行setCount都会改变count的值,同时重新渲染组件; 渲染完组件后执行useEffect的回调函数,再进行里面的DOM操作
### Effect清除机制
- 需要清除某些监听,在类组件componentWillUnmount生命周期中执行,在effect中可以在返回的回调函数中执行
  ```js
    import React, { memo, useEffect, useState } from 'react'

    const App = memo(() => {
      const [count, setCount] = useState(0)
      useEffect(() => {
        // 在事件卸载时,取消某些监听,比如订阅事件
        console.log('执行监听')
        // 返回一个回调函数,在组件重新渲染或组件卸载时执行
        return () => {
          console.log('取消监听')
        }
      })

      return (
        <div>App
          <button onClick={e => setCount(count + 1)}>+1({count})</button>
        </div>
      )
    })

    export default App
  ```
- ==案例目的:==
  - 每次点击按钮,count数值改变,会重新渲染组件,然后执行回调函数中的取消监听,以此来测试是否执行
  - ==缺点: **我们一般不用这种方式,因为会频繁的执行监听和取消监听操作,最好是仅执行一次监听,就像mount生命周期那样,在卸载时再取消监听**; 同理这个方法如果遇到网络请求就没办法了,毕竟网络请求不能像监听那样取消,可能会导致多次网络请求; 后面一会学习单次执行effect==

### 多个effect
- 简单示例,在后面项目中会应用
 ```js
     // 一个函数组件中可以有多个useEffect,每个负责一部分功能
    // react会按照顺序依次执行,分离好处是逻辑清晰,每个部分代码简洁
    useEffect(() => {
      console.log('修改title')
      return () => {}
    })
    useEffect(() => {
      console.log('监听eventBus')
      return () => {}
    })

    useEffect(() => {
      console.log('执行监听')
      return () => {
        console.log('取消监听')
      }
    })
 ```

### effect的回执
- ==控制effect的执行,useEffect的第二个参数---数组,来决定重新执行的依赖项==
  ```js
    import React, { memo, useEffect, useState } from 'react'

    const App = memo(() => {
      const [count, setCount] = useState(0)

      // 参数2: 数组,受谁影响会执行effect
      useEffect(() => {
        console.log('修改title(受count影响)', count)
        return () => { }
      }, [count])

      // 空数组代表不受任何因素影响,仅执行一次
      useEffect(() => {
        console.log('发送网络请求,从服务器获取数据')
        return () => {
          console.log('只有在组件卸载时才会执行,也仅会执行一次')
        }
      }, [])

      return (
        <div>App
          <button onClick={e => setCount(count + 1)}>+1({count})</button>
        </div>
      )
    })

    export default App
  ```
  > ==调整执行次数后,已经和生命周期的mount和unMount功能类似了==

## 函数组件的事件绑定
- 之前的类组件事件绑定涉及this,但是函数组件没有this,之前的类组件事件绑定的习惯也要转化
  ```js
    function addNum() {}
    // 类组件通用
    <button onClick={e => this.addNum()}></button>
  ```
- 在函数组件中,事件分为2中
  ```js 
    function addNum(num){}
    function increment(){}
    // 调用传参
    <button onClick={e => addNum(num)}></button>
    // 不传参
    <button onClick={increment}>+1({count})</button>
  ```
## 其他的Hooks
- 接下来的笔记:
  - ==**掌握state/effect后,已经完成Hooks中的80-90%的应用,已经可以独立开发react应用了,这是重点!!!**==
  - ==掌握好函数式组件+Hooks(state/effect)足够日常开发==
  - 接下来的许多Hooks,可以应用于特殊场景和性能优化
  - 然后讲解自定义Hooks,抽取通用逻辑,类似于vue3中的Hooks
  - 最后的,额外的react18新增的Hooks,了解
## Context/Reducer
### useContext
- 在类组件中的context比较鸡肋
  - 单个context,使用contextType匹配
  - 多个context,使用Consumer-Provider匹配,嵌套可能过多
- 1.创建context
  ```js
    // context/index.js
    import { createContext } from "react";

    const UserContext = createContext()
    const ThemeContext = createContext()

    export {
      UserContext,
      ThemeContext
    }
  ```
- 2.公开数据
  ```js
    // 最外层index.jsx
    import ReactDOM from 'react-dom/client';
    import App from './03useContext/App'
    import { UserContext, ThemeContext } from './03useContext/context'

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      // 给App组件及其子组件公开的数据
      <UserContext.Provider value={{ name: 'codewhy', age: 18 }}>
        <ThemeContext.Provider value={{ size: 35, color: 'red' }}>
          <App />
        </ThemeContext.Provider>
      </UserContext.Provider>
    );
  ```
- 3.使用公开的数据,Hooks避免了原生Consumer麻烦的回调(可以看之前的笔记)
  ```js
    // App.jsx
    import React, { memo, useContext } from 'react'
    import { ThemeContext, UserContext } from './context'

    const App = memo(() => {
      // 使用useContext,可以直接获取Provider共享的数据
      // 当依赖的context数据发生改变时,会重新渲染新的数据
      const user = useContext(UserContext)
      const theme = useContext(ThemeContext)
      return (
        <div>App
          <div>User: {user.name}-{user.age}</div>
          <div style={{ color: theme.color, fontSize: theme.size }}>Theme</div>
        </div>
      )
    })

    export default App
  ```
### useReducer(了解)
- ==**用的非常少**==,在redux学习过reducer函数,但是useReducer不是替代品,它是useState的替代品
- 某些情况,useState处理的逻辑很复杂或当前修改的state需要依赖之前的state,就需要使用useReducer
- 如果有多个状态,多个数据的修改,useState只能一个个定义,而useReducer可以统一初始化和统一处理数据switch
- ==**不推荐的原因: 这样的状态管理太过复杂,不如直接使用redux + useState**==
  ```js
    import React, { useReducer } from 'react'

    // redux中reducer函数的写法,参数和功能都一样
    function counterReducer(state, action) {
      switch(action.type) {
        case "add_number":
          return {...state, counter: state.counter + action.num}
        case "sub_number":
          return {...state, counter: state.counter - action.num}
        default:
          return state
      }
    }

    function App() {
      // 参数1: 自己写的reducer函数 参数2: 初始化的值(类似于initalState)
      // 返回值: state就是return出的对象 dispatch用于下面事件的执行
      const [state, dispatch] = useReducer(counterReducer, { counter: 1 })

      return (
        <div>
          <h2>state:{state.counter}</h2>
          {/* dispatch({}) 选择执行的事件类型type和参数 */}
          <button onClick={e => dispatch({type: "add_number", num: 10})}>+10</button>
          <button onClick={e => dispatch({type: "sub_number", num: 10})}>-10</button>
        </div>
      )
    }

    export default App
  ```
## Callback/Memo
### useCallback
- ==主要功能: 性能优化==
- 下面的2段代码,效果一样
  ```js
    const App = memo(() => {
      const [count, setCount] = useState(0)

      return (
        <div>App
          <div>计数: {count}</div>
          <button onClick={e => setCount(count + 1)}>+1</button>
        </div>
      )
    })
  ```
  ```js
    const App = memo(() => {
      const [count, setCount] = useState(0)

      function increment() {
        setCount(count + 1)
      }

      return (
        <div>App
          <div>计数: {count}</div>
          {/* <button onClick={e => setCount(count + 1)}>+1</button> */}
          <button onClick={increment}>+1</button>
        </div>
      )
    })
  ```
  > 小问题: 每次重新渲染,都会重新定义一次increment函数,第一种写法也会把箭头函数重新定义一次,每一次都是新的函数,但是上一次的函数会被销毁,因为没有引用指向,所以内存不会被浪费,只有重复定义函数这个操作
- 使用useCallback
  ```js
    const App = memo(() => {
      const [count, setCount] = useState(0)

      // 保证了每次使用的increment函数都是同一个,不会重复定义
      const increment = useCallback(function () {
        setCount(count + 1)
      })

      return (
        <div>App
          <div>计数: {count}</div>
          <button onClick={increment}>+1</button>
        </div>
      )
    })
  ```
  > ==**但是上面的操作没有任何优化,因为useCallback的参数也是一个函数,这个函数还是要重新定义的; 网上有些错误的教程就是这么误导的,这个函数的优化重点其实不在于函数定义方面**==
- 参数2: 数组,依赖项 ==下面看一个闭包陷阱,捕获外部变量的值是定义时的值==
  ```js
    const [count, setCount] = useState(0)
    // useCallback返回的值具有记忆,在外部依赖没有变化时,就不会改变返回值
    // 外部依赖可以由参数2的数组来决定(类比effect的依赖)
    // 如下,那么如果依赖没有发生变化,即使后面再次重新定义了新的function(例如foo2)传入useCallback,但是increment记录的传入的函数还是第一次的函数(例如foo1),它根本不会用foo2函数
    // 并且因为闭包,第一次传入的foo1函数中的count会记录初始化的count值(0),也就造成了无论怎么点击按钮,总是执行第一次的foo函数的操作,也就是0+1操作
    // 最后显示在页面就是点击按钮后,数字一直都是1
    const increment = useCallback(function () {
      setCount(count + 1)
    }, [])
  ```
- 修改,把依赖项变为count即可
  ```js
    const increment = useCallback(function () {
      setCount(count + 1)
    }, [count])
  ```
  > 到目前为止,仍然没有任何的优化
- 在组件中使用increment函数
  ```js
    import React, { memo, useCallback, useState } from 'react'

    const HYIncrement = memo(function (props) {
      const { increment } = props
      console.log('HYIncrement组件被重新渲染')
      return (
        <div>
          <button onClick={increment}>(子组件)+1</button>
        </div>
      )
    })

    const App = memo(() => {
      const [count, setCount] = useState(0)

      // 被注释的普通函数
      // function increment() {
      //   setCount(count + 1)
      // }

      const increment = useCallback(function () {
        setCount(count + 1)
      }, [count])

      return (
        <div>App
          <div>计数: {count}</div>
          <button onClick={increment}>+1</button>
          <hr />
           {/* 往函数组件传入函数 */}
          <HYIncrement increment={increment} />
        </div>
      )
    })

    export default App
  ```
  > 上面的函数,无论是注释的普通函数还是useCallback的函数,在点击App组件内的按钮或是HYIncrement内的按钮,都会导致HYIncrement重新渲染; 
  因为无论点击哪个按钮,都会执行increment函数(同一个),造成count依赖改变,进而传入HYIncrement的increment函数发生,HYIncrement的props依赖发生改变会导致重新渲染
  > ==目前还是没有什么实质性优化==
- ==**但是当状态不仅仅只有count的时候,比如还有message状态,情况发生了变化**==
  ```js
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState('hello')

    // 方法1: 普通函数
    function increment() {
      setCount(count + 1)
    }

    // 方法2: 优化函数
    const increment = useCallback(function () {
      setCount(count + 1)
    }, [count])

    return (
      <div>App
        <div>计数: {count}</div>
        {/* <button onClick={e => setCount(count + 1)}>+1</button> */}
        <button onClick={increment}>+1</button>
        <div>message:{message}</div>
        <button onClick={e => setMessage(Math.random())}>改变message</button>
        <hr />
        <HYIncrement increment={increment} />
      </div>
    )
  ```
  > 如果是普通函数写法,改变message后,会使当前App组件重新渲染,increment函数重新定义,那么传入HYIncrement的参数也会变化,导致其props依赖发生变化,再次重新渲染,HYIncrement与message毫不相关,但是被影响到了
  > 如果是优化的函数,由于依赖的count没有变化,所以increment没有改变,所以HYIncrement就不会重新渲染,这就是优化
  > 如果HYIncrement是一个页面,内部也有许多子组件,这样的优化效果是比较大的!
- ==**总结(不理解就记住结论,结论不理解就不用!)**:==  
  - ==往子组件中传入函数时的性能优化,最好使用useCallback对函数进行优化,这样子组件不会进行无意义的渲染==
  - ==useCallback的目的不是缓存函数,而是不希望子组件多次渲染==
- ==**可以useCallback进一步优化(了解)**==
- 我们希望点击2个按钮改变count时,都不要重新渲染子组件; ==只有increment不依赖任何因素时,才可以达到这一目的==
  ```js
    // 进一步优化,当count改变时,还是使用原来的increment函数
    // 提前讲知识点: useRef,在组件多次渲染时,返回同一个值
    const countRef = useRef()
    countRef.current = count // 每次都可以拿到最新的count值
    const increment = useCallback(function () {
      // 解决了闭包陷阱,使用不会更改的countRef.current值,更新count的数值
      // 执行setCount又会重新渲染组件,然后上面的countRef.current又可以拿到最新的count值
      setCount(countRef.current + 1) 
    }, [])
  ```
  > ==useRef可以解决闭包陷阱==
### useMemo
- ==记忆保存: memo保存函数的返回值,callback保存函数==
  ```js
    function fn (){}
    // 下面2段代码意思相同,都对fn做优化
    const increment = useCallback(fn,[])  // 对函数做优化,fn
    const increment2 = useMemo(()=>fn,[]) // 对返回结果做优化,返回值为fn
  ```
- ==useMemo优化,计算优化==
  ```js
    import React, { memo, useCallback, useMemo, useState } from 'react'

    // 计算1-50的和
    function calcNumTotal(num) {
      console.log('calcNumTotal被重新调用')
      let total = 0
      for (let i = 0; i <= num; i++) {
        total += i
      }
      return total
    }

    const App = memo(() => {
      const [count, setCount] = useState(0)

      // 对返回值的保存: memo保存函数的返回值(即result),callback保存函数
      // 不依赖任何因素,不会随组件重新渲染
      let result = useMemo(() => {
        return calcNumTotal(50)
      }, [])

      return (
        <div>App
          <h2>计算结果(50): {result}</h2>
          <h2>计算器: {count}</h2>
          <button onClick={e => setCount(count + 1)}>+1</button>
        </div>
      )
    })

    export default App
  ```
  > 如果count改变,会重新渲染组件,使用useMemo使得calcNumTotal不依赖任何项,从而规避无效的,多余的渲染,实现优化
- ==优化2: 向子组件传入相同的对象优化==
  ```js
    const Hello = memo(function (props) {
      console.log('Hello函数组件被渲染')
      return <h2>你好</h2>
    })

    const App = memo(() => {
      const [count, setCount] = useState(0)

      // 对返回值的保存: memo保存函数的返回值(即result),callback保存函数
      // 不依赖任何因素,不会随组件重新渲染
      let result = useMemo(() => {
        return calcNumTotal(50)
      }, [])

      // info对象不受影响,返回的对象
      const info = useMemo(() => ({ name: 'codewhy', age: 28 }), [])

      return (
        <div>App
          <h2>计算结果(50): {result}</h2>
          <h2>计算器: {count}</h2>
          <button onClick={e => setCount(count + 1)}>+1</button>
          {/* 给子组件传递数字类型,子组件是分辨不出数字的区别的 */}
          <Hello result={result} />
          {/* 给子组件传入相同内容的对象,可以优化 */}
          <Hello info={info} />
        </div>
      )
    })
  ```
  > ==返回的对象info如果每次都重新定义,Hello组件会认为传入的info发生了变化,即使内容没变,然后Hello重新渲染一次,Memo可以优化==
## Ref/LayoutEffect
### useRef
- useRef: 返回一个ref对象,返回的ref对象在组件的整个生命周期都不变,通俗点说就是不受组件重新渲染的影响; (在useCallback优化中用过,解决了闭包陷阱)
- ==最常见的Ref用法==
  - 获取DOM(或组件,但需要是类组件)元素
  - 保存一个数据,这个对象在组件的整个生命周期中都不变
- ==1.获取DOM (记得`XXX.current`)==
  ```js
    import React, { memo, useRef } from 'react'

    const App = memo(() => {
      const titleRef = useRef()
      const inputRef = useRef()

      function showTitleDom() {
        console.log(titleRef.current)
        inputRef.current.focus()
      }

      return (
        <div>App
          <h2 ref={titleRef}>hello world</h2>
          <input type="text" ref={inputRef} />
          <button onClick={showTitleDom}>获取DOM</button>
        </div>
      )
    })

    export default App
  ```
- 2.保存一个数据,这个对象在组件的整个生命周期中都不变 -> 解决闭包陷阱
  ```js
    import React, { memo, useCallback, useRef, useState } from 'react'

    const App = memo(() => {
      const [count, setCount] = useState(0)

      const countRef = useRef()
      countRef.current = count
      const increment = useCallback(() => {
        // setCount(count + 1) // 闭包陷阱
        setCount(countRef.current + 1)
      }, [])

      return (
        <div>App
          <button onClick={increment}>+1({count})</button>
        </div>
      )
    })

    export default App
  ```
### useLayoutEffect(了解)
- 很少用,官方也不推荐使用
- useEffect: 在DOM更新后(网页已经展示内容了),再执行; 不会阻塞DOM更新
- useLayoutEffect: 在DOM更新前执行,会阻塞DOM更新
 > 代码略
## useImperativeHand(了解)
- 用的非常少,在一些库里可能会用
- 功能: 父组件给子组件传入ref,子组件对ref进行限制
- 没有限制下的ref
  ```js
    import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'

    const Hello = memo(forwardRef((props, ref) => {
      return <input type="text" ref={ref} />
    }))

    const App = memo(() => {
      const titleRef = useRef()
      const inputRef = useRef()

      function handleInput() {
        inputRef.current.focus()
        inputRef.current.value = '123'
      }

      return (
        <div>App
          <h2 ref={titleRef}>哈哈哈</h2>
          <Hello ref={inputRef} />
          <button onClick={handleInput}>input</button>
        </div>
      )
    })

    export default App
  ```
  > 我们只想要点击按钮获取焦点, 但是父组件可以借助ref随意对子组件的input元素做操作,这样不安全,最好是只有获取焦点的操作
- ==使用useImperativeHand, 限制父组件使用ref的权限==
  ```js
    import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'

    const Hello = memo(forwardRef((props, ref) => {
      // 组件内部再写一个ref,用于实现效果
      const inputRef = useRef()
      // 子组件对父组件传入的ref进行处理
      // 参数1: 父组件的ref 参数2:回调函数,返回一个对象,这个对象就是提供给父组件ref的值
      useImperativeHandle(ref, () => {
        return {
          // 暴漏给父组件的行为
          // 父组件inputRef只会获取到这里面的函数,限制它只能执行focus操作
          focus() {
            console.log('执行focus')
            inputRef.current.focus() // 子组件内部的ref
          }
        }
      })
      // 绑定的子组件内部的ref
      return <input type="text" ref={inputRef} />
    }))
  
    const App = memo(() => {
      const titleRef = useRef()
      const inputRef = useRef()

      function handleInput() {
        inputRef.current.focus() 
        inputRef.current.value = '123' // 无效,只提供了focus函数
      }

      return (
        <div>App
          <h2 ref={titleRef}>哈哈哈</h2>
          <Hello ref={inputRef} />
          <button onClick={handleInput}>input</button>
        </div>
      )
    })

    export default App
  ```
## 自定义Hooks
- 自定义Hooks本质上是函数代码逻辑的抽取,不含react的特性
- 命名格式要求: `useXXX`
### 打印生命周期
- 实现效果: 在生命周期创建和销毁阶段时打印,很简单如下
  ```js
    import React, { memo, useEffect, useState } from 'react'

    // 自定义Hooks 命名useXXX
    function useLogLife(cName) {
      useEffect(() => {
        console.log('组件被创建', cName)
        return () => {
          console.log('组件被销毁', cName)
        }
      }, [])
    }

    const Home = memo(() => {
      useLogLife('home')
      return (
        <div>Home</div>
      )
    })
    const Profile = memo(() => {
      useLogLife('profile')
      return (
        <div>Profile</div>
      )
    })

    const App = memo(() => {
      const [isShow, setIsShow] = useState(true)
      useLogLife('App')

      return (
        <div>App
          {isShow && <Home />}
          {isShow && <Profile />}
          <button onClick={e => setIsShow(!isShow)}>切换</button>
        </div>
      )
    })

    export default App
  ```
  > App最后渲染是因为要优先渲染App内的子组件Home/Profile,渲染完了再渲染App组件
### 获取context
- 实现context共享的Hooks
- 定义context/index.js
  ```js
    import { createContext } from "react";

    const UserContext = createContext()
    const TokenContext = createContext()

    export {
      UserContext,
      TokenContext
    }
  ```
- 最外层index.js公开数据
  ```js
    import { UserContext, TokenContext } from './09自定义hooks/02获取context/context';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <UserContext.Provider value={{ name: 'codewhy', age: 18 }}>
        <TokenContext.Provider value={'coderwhy123456789'}>
          <App />
        </TokenContext.Provider>
      </UserContext.Provider>
    );
  ```
- 自定义hooks hooks/useUserToken
  ```js
    import { useContext } from 'react'
    import { UserContext, TokenContext } from '../context'

    // 获取context的自定义Hooks
    function useUserToken() {
      const user = useContext(UserContext)
      const token = useContext(TokenContext)
      return [user, token]
    }

    export default useUserToken
  ```
- 导出hooks/index.js
  ```js
    import useUserToken from "./useUserToken";

    export {
      useUserToken
    }
  ```
- 页面直接使用 App.jsx
  ```js
    import React, { memo } from 'react'
    import { useUserToken } from './hooks'

    const Home = memo(() => {
      // 使用自定义hooks,直接从里面获取context数据
      const [user, token] = useUserToken()

      return <h1>Home Page {user.name}-{user.age}-{token}</h1>
    })

    const Profile = memo(() => {
      const [user, token] = useUserToken()
      return <h1>Profile Page {user.name}-{user.age}-{token}</h1>
    })

    const App = memo(() => {
      return (
        <div>App
          <Home />
          <Profile />
        </div>
      )
    })

    export default App
  ```
### 监听窗口滚动
- ==文件结构和上面的一样,略==
- 监听窗口滚动的hooks代码
  ```js
    import { useEffect, useState } from "react"

    function useScrollPosition() {
      const [scrollX, setScrollX] = useState(0)
      const [scrollY, setScrollY] = useState(0)

      useEffect(() => {
        function handleScroll() {
          // 设置新的X Y滚动值
          setScrollX(window.scrollX)
          setScrollY(window.scrollY)
        }
        // 挂载后仅有一次监听,卸载组件时取消监听
        window.addEventListener('scroll', handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [])

      return [scrollX, scrollY]
    }

    export default useScrollPosition
  ```
- App.jsx引入后使用hooks
  ```js
    import React, { memo } from 'react'
    import './style.css'
    import useScrollPosition from './hooks/useScrollPosition'

    const Home = memo(() => {
      const [scrollX, scrollY] = useScrollPosition()
      return <h1>Home Page: X:{scrollX} Y:{scrollY} </h1>
    })

    const App = memo(() => {
      return (
        <div className='app-window'>
          <div className='home'>
            <Home />
          </div>
          App
        </div>
      )
    })

    export default App
  ```
- style.css
  ```css
    .app-window{
      height: 2000px;
    }

    .home{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  ```
### 本地存储
- 没有抽取的原生写法
  ```js
    import React, { memo, useEffect, useState } from 'react'

    const App = memo(() => {
      // token的值随着本地存储变化而变化,所以直接把本地获取的token值作为state
      const [token, setToken] = useState(localStorage.getItem('token'))
      useEffect(() => {
        // 在token发生变化时重新在本地设置新的token
        localStorage.setItem('token', token)
      }, [token])

      function setTokenHandle() {
        setToken('codewhy')
      }

      return (
        <div>App
          Token: {token}
          <button onClick={setTokenHandle}>设置Token</button>
        </div>
      )
    })

    export default App
  ```
- 封装的hooks ==可以封装高级类型,比如对象类型==
  ```js
    const { useState, useEffect } = require("react");

    function useLocalStorage(key) {
      // 如果本地存储的token是对象类型,需要解析
      // useState内部逻辑比较多可以写个函数
      const [data, setData] = useState(() => {
        const localdata = localStorage.getItem(key)
        if (!localdata) return ''
        return JSON.parse(localdata)
      })


      useEffect(() => {
        // 如果data是对象类型,直接存储为[object]
        localStorage.setItem(key, JSON.stringify(data))
      }, [data])

      return [data, setData]
    }

    export default useLocalStorage
  ```
- App.jsx ==简单类型和高级类型都测试==
  ```js
    import React, { memo } from 'react'
    import { useLocalStorage } from './hooks'

    const App = memo(() => {
      const [token, setToken] = useLocalStorage('token')
      function setTokenHandle() {
        // 普通类型测试
        // setToken('12312341') 
        // 高级类型测试
        setToken({ username: 'codewhy', token: '123123123' })
      }
      return (
        <div>
          {/* 普通类型直接渲染 */}
          {/* Token: {token} */}
          {/* 高级类型渲染: react不可以直接渲染对象类型 */}
          usename: {token.username} token: {token.token}
          <button onClick={setTokenHandle}>设置Token</button>
        </div>
      )
    })

    export default App
  ```
## redux-hooks
- 之前学习redux要结合redux-react连接react与redux,并且需要connect高阶组件去增强react的类组件
- ==从redux-react 7.x开始,提供了Hooks方法,不再需要connect方法了==
- ==**重点学习useSelector和useDispatch**==
- 下载: `npm i @reduxjs/toolkit react-redux redux` (视情况下载,需要这些包)
  > 工具包react-redux还是需要的,它作用是连接react和redux,只不过不需要connect,改为hooks写法而已
  > @reduxjs/toolkit则是提供了更简洁的语法糖来去操作redux
### Selector/Dispatch
- ==1.准备工作,创建store==
  ```js
    // store/index.js
    import { configureStore } from '@reduxjs/toolkit'
    import counterReducer from './modules/counter'

    const store = configureStore({
      reducer: {
        counter: counterReducer
      }
    })

    export default store
  ```
  > 用redux-toolkit工具,更加简便
- 1.2创建reducer,提供给store
  ```js
    // store/modules/counter.js
    import { createSlice } from '@reduxjs/toolkit'

    const counterSlice = createSlice({
      name: 'counter',
      initialState: {
        counter: 99
      },
      reducers: {
        // state action(type,payload)
        addNum(state, { payload }) {
          state.counter = state.counter + payload
        },
        subNum(state, { payload }) {
          state.counter = state.counter - payload
        }
      }
    })

    export const { addNum, subNum } = counterSlice.actions
    export default counterSlice.reducer
  ```
- 1.3公开store信息
  ```js
    // 最外层index.js
    import App from './10redux-hooks/App'
    import { Provider } from 'react-redux'
    import store from './10redux-hooks/store';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  ```
- ==2.**使用store 在组件App.jsx**==
  - ==形似mapStateToProps --- useSelector==
  - ==形似mapDispatchToProps --- useDispatch==
  ```js
    import React, { memo } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import { addNum, subNum } from './store/modules/counter'

    const App = memo(() => {
        // useSelector获取store, 参数: 回调函数
       useSelector((state) => {
        // 返回的对象是你想要拿取的store数据
        return {
          // state是公开的store的值
          // 第一个counter是store定义reducer时的key; 第二个counter就是initalState的counter值
          count: state.counter.counter
        }
      })

   *  // useSelector简写, 返回值就是内部回调函数返回的对象
   *  // const { count } = useSelector((state) => ({ count: state.counter.counter }))

      // 直接可以拿到派发函数
      const dispatch = useDispatch()
      function addNumHandler(num, isAdd = true) {
        if (isAdd) {
          dispatch(addNum(num))
        } else {
          dispatch(subNum(num))
        }
      }

      return (
        <div>App
          <div>count(store): {count}</div>
          <button onClick={e => addNumHandler(1)}>+1</button>
          <button onClick={e => addNumHandler(1, false)}>-1</button>
        </div>
      )
    })

    export default App
  ```
  > 没有connect,内部逻辑和之前的2个映射函数差不多,但是不必写再写两个映射函数和connect函数了,整体上简洁了不少
### useSelector性能优化
- 准备工作:
  - 给store添加新的数据message(初始化为'hello world')和修改message的函数changeMessage,这些新增还是在同一个reducer中
  - 新增组件Home,里面使用store中message数据,并提供修改message的函数
  > 现在,App和Home都在使用同一个store,App使用里面的counter数据,而Home使用里面的message数据
- 代码: 
  ```js
    import React, { memo } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import { addNum, changeMessage, subNum } from './store/modules/counter'

    // 知识回忆: memo高阶组件包裹起来的组件的特点,只有props发生改变时才会重新渲染
    const Home = memo((props) => {
      // useSelector默认监听整个state,state内含counter和message, 只要state变化,组件就会重新渲染; 
      const { message } = useSelector((state) => ({
        message: state.counter.message
      }))

      console.log('Home render')

      const dispatch = useDispatch()
      function changeMessageHandler() {
        dispatch(changeMessage('你好 世界!'))
      }

      return (
        <div>
          <h3> Home:{message}</h3>
          <button onClick={changeMessageHandler}>修改message</button>
        </div>
      )
    })

    const App = memo(() => {
      // 简写, 返回值就是内部回调函数返回的对象
      const { count } = useSelector((state) => ({ count: state.counter.counter }), shallowEqual)

      // 直接可以拿到派发函数
      const dispatch = useDispatch()
      function addNumHandler(num, isAdd = true) {
        if (isAdd) {
          dispatch(addNum(num))
        } else {
          dispatch(subNum(num))
        }
      }

      console.log('App render')

      return (
        <div>App
          <div>count(store): {count}</div>
          <button onClick={e => addNumHandler(1)}>+1</button>
          <button onClick={e => addNumHandler(1, false)}>-1</button>
          <hr />
          <Home />
        </div>
      )
    })

    export default App
  ```
- ==问题所在==: App和Home所依赖的store是互不干扰的,但是无论是App修改counter还是Home修改message,都会引起另一个组件渲染,也就是App和Home组件都会渲染一次,这是不对的,Home组件的memo是个高阶组件,前面学习过,memo高阶组件包裹的组件,只有props发生改变时才会重新渲染,但是Home的props显然没有变化,甚至App在引入Home根本没有传入props
- ==原因所在:== useSelector默认监听整个state,state内含counter和message,App组件修改counter,Home组件修改message,都会影响到整个state,只要state变化,组件就会重新渲染; 
- ==解决办法== useSelector还提供了第二个参数
  - 参数1: 将state数据映射到组件中
  - ==参数2(优化): 进行比较来决定组件是否需要重新渲染==
  > react-redux提供shallowEqual函数用于比较,它会浅层比较,当前组件使用的message到底和上一次获取的message相对比有没有变化,如果没有变化就不会重新渲染组件
  > ==**结论: 以后使用useSelector标配一个shallowEqual用于优化**==
- 优化后的代码(添加一个shallowEqual即可,react-redux内置提供了这个函数,直接用)
  ```js
    const { message } = useSelector((state) => ({
        message: state.counter.message
    }), shallowEqual)

    const { count } = useSelector((state) => ({ count: state.counter.counter }), shallowEqual)
  ```
## 补充服务器端知识
- ==服务端进阶路线: node服务器->Vue/React服务器端渲染API->nuxt/next==
### SSR优势与SPA缺点
- ==什么是SPA?==
  - 现在学习的vue和react都是单页面应用,单页面应用就是,只有一个html页面,切换页面不是跳转到新的html,而是替换html页面内部的组件
- ==SPA: 单页面富应用的两个缺点==
  - 首屏渲染速度慢
  - SEO优化不好
- ==浏览器渲染页面大致流程==
  - 渲染页面,向服务器请求一个文件index.html,然后解析渲染
  - 实际上在SPA页面应用中,index.html里面基本没东西,大概是`div id=app`和一点meta配置
- ==解释SPA缺点的原因==
  - ==SEO搜索引擎优化==
    - 搜索引擎,比如百度,在爬虫爬取数据时,主要是爬取index.html文件,但是这个文件内很空,只能爬取一点标题或是meta配置,而接下来渲染的数据(包括未下载的js文件),是不在爬取范围的,爬取结果收录到百度数据库,当用户搜索关键字时,百度在数据库关键字中寻找数据,但是你的网站爬取过程中提供的数据很少,所以优先级很低,可能在10页以后,导致网页流量很少,用户根本搜不到你的网站,所以SPA页面的SEO优化很差
  - ==首屏渲染页面==
    - ==早期SSR网页(例如JSP)== ,在服务器中早就把首页渲染好了,直接可以向服务器请求一个完整的网页index.html,爬虫在爬取网站时,可以爬取更多数据,有利于SEO优化;同时请求的是一整个网站的代码,可以直接解析所有的页面内容; 但是SPA的首页index.html本身没有多少内容,需要通过引入的大量js文件,向服务器请求后续的网页加载所需的js文件,才能显示完整的网页,在这个过程中经过'下载文件->浏览器执行文件代码'才会显示网页,这个过程耗费很多时间
  > 但是大部分项目不需要考虑上面的缺点,比如公司内部使用的后台管理系统,只是公司内使用而已,不需要SEO优化,而且速度慢一点也无所谓,而且现代浏览器执行js代码的速度很快,另外,有些浏览器爬取数据是很良心的,比如谷歌会在SPA页面爬取你的后续js代码,收录更多信息进入SEO数据库(当然百度没有这么做) 
- ==补充概念: SSR和CSR==
  - ==SSR（Server Side Rendering，服务端渲染）==，指的是页
  面在服务器端已经生成了完成的HTML页面结构，不需要浏
  览器通过执行js代码创建页面结构,只需要浏览器解析即可,这也是早期的前端
  - ==对应的是CSR（Client Side Rendering，客户端渲染）==
  我们开发的==SPA页面==通常依赖的就是客户端渲染,这就是现代的前端
- ==现阶段的前端服务器渲染==
  - 早期的服务端渲染(SSR)包括PHP、JSP、ASP等方式，但是在目前前
  后端分离的开发模式下，前端开发人员不太可能再去学习PHP、JSP等技术来开发网页
  - 不过我们可以借助于==Node==来帮助我们执行JavaScript代码，提前完成页面的渲染,==这样补全了SPA页面的劣势==,当然单纯的Node无法完成ssr渲染,需要ssr api或是框架
  - 之后进一步学习服务端方面的知识: Node学习 => Vue/React 关于SSR的API =>  nuxt/next框架(封装) ,==只学习api没有用,不能做api工程师,要刨析原理,现代的SPA页面借助上面ssr api或框架可以补全SPA页面的缺陷==
- 知识点补充图
  [![pEjbqgS.png](https://s21.ax1x.com/2025/05/15/pEjbqgS.png)](https://imgse.com/i/pEjbqgS)

### SSR同构与Hydration
- ==什么是同构?== 一套代码既可以在服务端运行也可以在客户端运行,这就是同构应用; 
  - 服务器端运行指的是Node服务器运行代码(依靠vue或react提供的ssr api),生成HTML页面结构
  - 浏览器运行,生成HTML页面结构
- ==为什么生成同一套HTML页面结构需要Node和浏览器两次去执行?==
   - Node生成的HTML页面结构只是单纯的字符串,但是它无法处理js代码,此阶段单单只是为了展示,但是交互的逻辑无法实现; 而浏览器再次生成HTML页面结构时会把对应的js逻辑代码注入到页面中,使得页面具有逻辑交互的功能,==此阶段称为hydrate==
  > 总结下来,用户发出请求后,Node服务端先通过SSR渲染出首页的内容,然后客户端在注入页面的所有js逻辑等
- ==什么是Hydration？这里我引入vite-plugin-ssr插件的官方解释==
  - 在进行SSR 时，我们的页面会呈现为HTML,但仅HTML 不足以使页面具有交互性。例如，浏览器端JavaScript 为零的页面不能是交互式的（没有JavaScript 事件处理程序来响应用户操作，例如单击按钮）。
  - 为了使我们的页面具有交互性，除了在Node.js 中将页面呈现为HTML 之外，我们的UI 框架（Vue/React/...）还在浏览器中加载和呈现页面,为页面添加js相关的交互逻辑,==这个过程称hydration(注入)==
- 补充理解知识的图片
  [![pEjbLjg.png](https://s21.ax1x.com/2025/05/15/pEjbLjg.png)](https://imgse.com/i/pEjbLjg)
  [![pEjbb38.png](https://s21.ax1x.com/2025/05/15/pEjbb38.png)](https://imgse.com/i/pEjbb38)
## react18新增
### useId
- 问题: 同一个代码在服务器和客户端生成的HTML结构中,有些页面动态生成的id可能不一样
- 解决: useId是一个用于生成==横跨服务端和客户端的稳定的唯一ID== , 同时避免hydration出现不匹配的hook
- useId用于react同构开发,前端SPA不需要它,后面学习服务端ssr时再学习
  ```js
    const id = useId()
    console.log(id)
  ```
### useTransition
- 作用: 告诉react的某部分任务更新优先级很低,可以稍后更新,别的任务更新好后,再更新这里的内容
- 使用faker伪造数据,下载: `npm install --save-dev @faker-js/faker`
- 生成500条假数据,模拟模糊搜索案例
- 实现需求: 模糊搜索中,加载顺序是优先过滤搜索列表再加载input内的框,如果过滤的数据太多,会导致输入框卡顿,所以要降低过滤操作的优先级,先渲染input框的内容,让用户输入查询速度很快,而过滤结果可以在之后慢慢渲染
- 生成假数据
  ```js
    import { faker } from '@faker-js/faker';

    const namesArray = Array(500)
    for (let i = 0; i < namesArray.length; i++) {
      namesArray[i] = faker.internet.username()
    }

    export default namesArray
  ```
- 渲染案例:
  ```js
    import React, { memo, useState, useTransition } from 'react'
    import namesArray from './nameArray'

    const App = memo(() => {
      const [showNames, setShowNames] = useState(namesArray)
      // 返回2个结果,第一个布尔值,当为true时,代表startTransition内的函数尚未执行,可以显示loading
      // 第二个是函数startTransition, 降低一些函数操作的优先级
      const [pending, startTransition] = useTransition()

      function valueChangeHandle(evt) {
        // 优先级低的操作
        startTransition(() => {
          const keyword = evt.target.value
          // 过滤数据不要在原数据showNames上过滤,会导致数据越来越少无法回退
          const filterNames = namesArray.filter(item => item.includes(keyword))
          setShowNames(filterNames)
        })
      }

      return (
        <div>App
          <input type="text" onInput={valueChangeHandle} />
          <h2>用户名列表: {pending && <span>数据正在加载...</span>}</h2>
          <ul>
            {
              showNames.map((item, index) => {
                return <li key={index}>{item}</li>
              })
            }
          </ul>
        </div>
      )
    })

    export default App
  ```
### useDeferredValue
- useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后
- 在明白了useTransition之后，我们就会发现useDeferredValue的作用是一样的效果，可以让我们的更新延迟
- ==useTransition的案例==
  ```js
    const App = memo(() => {
      const [showNames, setShowNames] = useState(namesArray)
      const [pending, startTransition] = useTransition()
      // 生成一个副本,延迟显示
      const deferedShowNames = useDeferredValue(showNames)

      function valueChangeHandle(evt) {
        startTransition(() => {
          const keyword = evt.target.value
          const filterNames = namesArray.filter(item => item.includes(keyword))
          setShowNames(filterNames)
        })
      }

      return (
        <div>App
          <input type="text" onInput={valueChangeHandle} />
          <h2>用户名列表: {pending && <span>数据正在加载...</span>}</h2>
          {/* 延迟显示,本身是一个副本数据 */}
          <ul>
            {
              deferedShowNames.map((item, index) => {
                return <li key={index}>{item}</li>
              })
            }
          </ul>
        </div>
      )
    })
  ```






