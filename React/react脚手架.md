# react脚手架
## 事前注意
- ==**注意现在react已经淘汰自己的脚手架,不再维护,转用vite等其他脚手架,所以先学习这个框架,后续再转**== 
- 文档说明: https://zh-hans.react.dev/blog/2025/02/14/sunsetting-create-react-app
- ==**本次搭建学习的react版本也是18.2.0回退版本,学完后学习新的19.x版本**==
## 认识脚手架
- ==react的脚手架: create-react-app(CRA)==,底层基于webpack,需要Node环境
- 脚手架可以随意选择使用,比如react项目也可以用vite脚手架,没有限制
- 下载: `npm i create-react-app -g`
- 创建项目(名称不能有大写): `create-react-app 项目名称`
- 之后会下载对应的react react-dom react-scripts等
- 进入项目文件,启动:`npm start/npm run start`
## 搭建src
- 额外的脚手架结构(不重要)
- 1.pubilc/manifest.json: 关于PWA(Progressive Web App),配置文件,手机安卓端,==了解,基本用不到==
- 2.public/robots.txt,配置哪些文件可以被爬虫爬
- ==3.src重构,删除之前所有的源文件==
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
  - 页面在public/index.html中
## Vite+React
- 简单说就是 `npm create vite@latest`, 下载vite并创建vite项目
- 选择react+js (学习过ts后选择ts,至于多余的选项暂时不用管) 
- vite + react配置less,下载normaliza.css也没有区别
- vite + react自带css modules,只需要以`.modules.css`后缀名为结尾即可
- vite + react在配置router和redux(react-redux/redux/toolkit)方面没有啥变化
- vite + react配置别名的方式和宏源旅途也没有变化,升级版
  ```js
    // alias原理: 别名 + 绝对路径
    // 绝对路径由path负责,__dirname会获取当前文件夹下的绝对路径,即/airbnb,再使用resolve进行路径拼接
    const resolve = pathName => path.resolve(__dirname, pathName)

    // https://vite.dev/config/
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          '@': resolve("src"),
          'components': resolve('src/components'),
          'utils': resolve('src/utils')
        }
      }
    })
  ```
  > 暂时就这些,几乎没啥大的变化,而且更好用,响应速度更快


