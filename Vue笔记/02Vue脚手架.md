# 组件化
## Vue的组件化思想
- ==组件化:== 
  - 把大问题拆分为小问题,==**把前端的一个页面拆分成一个个小的组件,这些组件组合形成一个页面,并且组件可以在多个页面上复用**==,vue/react/angular都是组件化的思想,
- ==vue中的组件:==
  - ==**前面学习的Vue.createApp(obj)中,这个obj就是个组件,是根组件**,如果只有一个根组件,随着页面功能变多,根组件代码会越来越多,所以我们可以抽取出一些功能,写入小组件分担根组件的代码量,这样就形成了一个组件树,各个组件相互联系==
  [![pEDCtXR.jpg](https://s21.ax1x.com/2025/03/25/pEDCtXR.jpg)](https://imgse.com/i/pEDCtXR)


# Vue Cli 项目构建
## 使用Vue CLI创建Vue3项目的步骤
1. **全局安装Vue CLI：**
   
   - 打开命令行工具（如Terminal或Command Prompt）。
   - ==npm的淘宝镜像是有效的,已设置,如果失效自行更新新的地址==
   - 运行以下命令安装Vue CLI：`npm install -g @vue/cli`
   
2. **创建新项目：**
   
   - 在命令行中运行`vue create project-name`，将`project-name`替换为你想要的项目名称。
   - 选择在创建过程中使用Vue3。
   
3. **选择配置选项：**
  
   - 在创建过程中，Vue CLI将提示选择预设配置或手动选择特性。选择Vue3作为Vue版本。
   - 可根据需求选择其他配置，如Babel、TypeScript等。
   - ==第一次配置好后,保存了,以后就默认这个配置了==
   
4. **切换路径：**
   
   - 项目创建完成后，进入项目目录：`cd project-name`。

5. **运行项目：**
   
   - 运行`npm run serve`启动开发服务器。
   - 访问`http://localhost:8080/`查看项目运行情况。

**==注意事项：==**

- 确保已安装Node.js和npm。
- 在创建项目时选择Vue3版本。
- 根据项目需求选择合适的配置选项，如TypeScript、CSS预处理器等。
- **定期更新Vue CLI版本，以使用最新功能和修复bug。==Vue Cli已经不更新了,我们推荐vite==**
## Vue CLI 构建的项目构成

- 我们说重要的组成部分:(==初学所认识的==)
  - node_modules: 里面是项目的依赖(==这是vue cli文件体积巨大的原因==)
  - pubilc : 内部有个index.html ,这个就是我们显示的网页,启动项目时,vue会自动往里面引文文件
  - package.json : 命令的配置(当时改node->nodemon的地方),内部我们也会找到`npm run serve`中`serve`的扩展
  - vue.config.js: 控制vue规则,后面课程中我们在里面设置了代理服务器
  - **==src核心==**
    - components: 内部写局部组件,后期引入App.vue
    - main.js: 创建vue,挂载vue的地方
    - App.vue: 使用组件,引入组件(从components引入)的地方
## 初步解释项目文件关系

- main.js:(==vue项目的入口,从这里创建的,引入的,延伸的==)
    ```
    import { createApp } from 'vue' // 从vue中引入API
    import App from './App.vue' // 支持单文件组件(相对路径) ES6模块化语法


    createApp(App).mount('#app')

    ```
    > 1.==App/App.vue: APP变量名,就这个vue的obj,而被引入文件APP.vue内部详细写了如何配置==
    > 2.挂载#app,在public-index.html中,已经自动把根节点div-id="app"定义好了,不用管理
    > 3.createApp,自动引进vue的API,别管
    > 4.==main.js文件名别乱改,系统默认寻找main.js==

- App.vue:(==创建vue的关键,createApp(obj)的obj==)
  - ==学过了组件初学习都知道那个很麻烦,而单文件组件很好的解决了这个问题==
  - ==**分为三大块,每个板块的内容注释有,一定记得导出,供main.js用**==
  ```
    <template>
        HTML
    </template>

    <script>
        JS区(后面也会写TypeScript在这里面)
        import ... from '相对路径' // 可以引入组件的

        export default { // 必写,导出,这样main.js才能引用你
            vue区 data(){} methods ..... 
        }
    </script>

    <style>
        CSS
    </style>
  ```
  

  > ==**这个文件是子组件的集合处,不建议在这里面写大量的实际代码,会导致代码冗余混乱,用局部组件写完引入即可**==

- components文件夹内部的vue(==写法和App.vue一样,作为局部组件,导出后供APP.vue用==)

## 自定义标签(组件)
- 自定义标签就是原生中没有的,我们自己写的,例如`<kerwin></keriwn>`
- ==**系统把自定义标签认定为组件,我们可以通过对组件的详细编写,引入后,直接用**==
- **案例**:
  - ==需求==: 我们想要一个按钮,点击后在终端输出内容
  - ==操作==: 在MyApp.vue中(主组件),内部我们写了一个自定义标签Navbar,然后从components详细写了这个需求的功能文件Navbar.vue,之后引入直接使用
  - ==components-局部组件-Navbar.vue==
    ```html
        <template>
            <div>
                 I'm Navbar !!!
                <button @click="handleClick">click</button>
            </div>
        </template>

        <script>
            export default {
                methods: {
                    handleClick(){
                        console.log("navbar-click")
                    }
                }
            }
        </script>

        <style> </style>  
    ```
    > 1.在template中我们写好了简单的html代码,并绑定事件
    > 2.在script中,我们写了click事件的响应处理函数,随后导出
  - ==MyApp.vue==
    ```html
    <template>
        // 我们的组件
        <Navbar></Navbar>
    </template>

    <script>
        // 1.局部引入 import 变量名字 from `目标组件的相对路径` 
        import Navbar from "./components/Navbar.vue";
        export default {
            // 2.引入后在这里注册
            components:{
                // 写法1: "Navbar" : Navbar 
                // 写法2: 同名简写如下
                Navbar
            }
        }
    </script>

    <style> </style>
    ```
    - ==组件的引入分为局部和全局==
        ==只有当大量组件都需要某个相同功能时,才会从全局中注册组件,供大家使用==,**但是一般不推荐全局,因为全局组件注册需要在main.js文件中进行,还是老问题,会冗余,混乱,重名,冲突**
        > 
    - **局部引入的写法(谁用给谁引入)**: ==先import引入,再在components里注册,上面代码中有注释==
    - **全局引入的写法(在main.js文件中)**
    ```js
        import { createApp } from 'vue' 
        import App from './MyApp.vue' 

        // 1.引入局部组件
        // import Navbar from './components/Navbar.vue'

        createApp(App)
        // 2.在全局注册局部组件
        // 有两个参数,局部组件名和引入的组件变量名
        // 可以在任意组件中使用这个Navbar组件
        .component("Navbar",Navbar)
        .mount('#app')
    ```

    > 1.==我们使用的自定义标签名字要与我们定义的组件变量名一致==
    > 2.在template我们使用自定义标签Navbar(相当于使用了组件Navbar),在script中我们引入并注册了Navbar组件
    > 3.==**局部组件的特点,谁用给谁引入,局部组件之间的状态互相不影响,无论父子,爷孙,兄弟关系,后面会学习局部组件的数据共享**==
    > 
  - ==关于局部组件状态和样式的解释:==
    - 状态: 就是data(){}中的变量
    - 样式: 就是style内部的css样式
  - ==状态的互不影响==: 局部组件中的变量互相无法调用,乱调用也是未定义状态
  - ==样式的解释==: 
    - ==如果子组件在样式style不添加`scpoed`属性,就会被父组件的样式覆盖,写法为`<style scoped></style>`==
    - **原理解释:** 
      - 在index.html中vue会自动引入css样式,子组件不写scpoed,引入顺序中,父组件会在最后,可能就会覆盖前面子组件的css样式
      - 如果你写了scpoed参数,vue会给每个标签的class配以个id名,保证唯一不重复,这样就不会被覆盖样式了
## Vue CLI的代理功能
- 在vue中我们利用devSever去实现一个代理服务器功能
- 代理服务器的作用: ==使用我们电脑的端口服务器作为中介,向猫眼发送请求获取响应数据,绕过服务器的跨域阻止协议== 
- 如何操作?
  - 在官网vue cli 搜索 devSever,将配置内容复制进vue.config.js文件
  - ==配置devSever的信息,**然后重启服务器才能生效**==
- 配置devSever参数(**==注释很详细==**)
    ```
    devServer: {
        proxy: {
            // 正常的url : 请求协议 + 域名 + 端口
            // 其中我们自己电脑的端口都是数字 3000 8080等
            // 但是猫眼后端定义的端口就不是单纯的数字了,可以自定义的任意名字,取决于人家后端怎么写的
            // 端口是什么就写什么,猫眼正好是/api,所以不用改了
            // 如果是/kerwinapi,就改成那样
            '/api': {
                // target写的是请求协议+域名
                target: 'https://i.maoyan.com',
                changeOrigin: true
            }
        }
    }
    ```
- 请求如何写? (==在局部组件MaoYan.vue中写==)
    ```
    <template>
        <div>
            <button @click="handleClick">猫眼</button>
        </div>
    </template>

    <script>
        export default {
            methods: {
                handleClick(){
                    // 我们要请求数据的猫眼url如下:
                    // https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%A5%BF%E5%AE%89&ci=42&channelId=4
                    // fetch(里面就写端口就可以了,http赋值给vue.config.js里target了)
                    fetch("/api/mmdb/movie/v3/list/hot.json?ct=%E8%A5%BF%E5%AE%89&ci=42&channelId=4")
                    .then(res=>res.json())
                    .then(res=>{
                        // 打印响应数据
                        console.log(res)
                    }) 
                }
            }
        }
    </script>

    <style> </style>
    ```
    > ==1.使用的fetch,fetch内部的url不在是完全体了,只有url的端口部分,http协议和域名部分写在devServe里面==
    > ==2.fetch+devServe是一体的,单独写fetch会跨域,单独devServe会报位置错误==
    > 3.**配置完好后记得重启服务器**
## Vue ClI 转化
- 浏览器只识别 html + css + js 老三样的格式,不认识vue,所以文档中让我们在终端中输入指令`npm run bulid`(==注意先结束服务器 ctrl + c==)
- ==生成的dist文件夹==就自动把vue转化为老三样了,这样你发给后端即可
 
# vite 项目构建出的文件组成及作用
## vite项目构建
**使用Vite创建Vue3项目的步骤：**
1. **全局安装Vite：**
   - 打开命令行工具。
   - 运行以下命令安装Vite：`cnpm install -g vite`。(cnpm淘宝路径下载)

2. **创建新项目：**
   - 在命令行中运行`npm init vite `。(mac的同学尽量使用npm 安装。否则可能电脑会因为权限不足报错)
   - 官网上为 `npm create vite@latest` 

3. **进入项目目录：**
   - 进入新创建的项目目录：`cd project-name`。

4. **安装依赖：**
   - 运行`npm install`安装项目依赖。

5. **运行项目：**
   - 运行`npm run dev`启动开发服务器。
   - 打开浏览器访问`http://localhost:3000/`查看项目。

**注意事项：**
- ==确保已安装Node.js和npm。==
- Vite是一个新型的构建工具，具有快速的冷启动和热更新功能。
- Vite不需要预先将代码编译成文件，因此启动更快，适用于现代化的前端开发。
## vite 项目中从 vue 到浏览器的流程

1. **`index.html` - 项目入口页面**
   - **作用**：
     - `index.html`是整个项目的入口文件，是浏览器加载的第一个 HTML 页面。它就像是一个舞台，为后续的 Vue 组件展示提供了一个容器。在 Vite 项目中，它通常位于`public`文件夹（也有其他配置方式）。
     - 这个文件中包含了对 JavaScript 脚本（包括`main.js`）和 CSS 样式等资源的引用，用于加载和初始化整个应用。例如，它会有一个`<div id="app"></div>`的标签，这个`app`容器是 Vue 应用挂载的地方。
   - **加载流程**：
     - 当用户在浏览器中访问项目的 URL 时，浏览器首先请求`index.html`文件。服务器会将这个文件发送给浏览器，浏览器开始解析这个 HTML 文件。它会按照 HTML 的语法规则加载其中引用的外部资源，如 CSS 样式表用于页面布局和样式设置，以及 JavaScript 文件用于实现页面的交互功能。
2. **`main.js` - 应用的核心脚本**
   - **作用**：
     - 在`main.js`文件中，主要进行 Vue 应用的创建和挂载操作。它是连接 Vue 组件和 HTML 页面的桥梁。例如，对于一个 Vue 3 项目，可能会有以下代码：
     ```javascript
     import { createApp } from "vue";
     import App from "./App.vue";
     const app = createApp(App);
     app.mount("#app");
     ```
     - 首先，通过`createApp`函数从`vue`模块中创建一个 Vue 应用，这个函数接收一个根组件作为参数。在这里，根组件就是`App.vue`，通过`import App from './App.vue';`语句导入。
     - 然后，`app.mount('#app');`语句将创建的 Vue 应用挂载到`index.html`文件中`id`为`app`的 DOM 元素上。这意味着 Vue 会查找`index.html`中的`#app`元素，并将`App.vue`组件渲染到这个元素内部。
   - **挂载流程**：
     - 在浏览器加载`index.html`并解析到引用的`main.js`脚本后，`main.js`中的代码开始执行。它会创建一个 Vue 应用，这个应用包含了一系列的组件（以`App.vue`为根组件）、插件、指令等。
     - 当执行`app.mount('#app');`时，Vue 会在 DOM 树中找到`id`为`app`的元素，然后将`App.vue`组件的内容渲染到这个元素中。这个过程涉及到 Vue 的响应式系统和虚拟 DOM 的更新机制。
     - 具体来说，Vue 会首先将`App.vue`组件编译成虚拟 DOM 树，然后将虚拟 DOM 与实际的`#app`元素进行对比，根据差异更新实际的 DOM 元素，从而将`App.vue`组件的内容展示在浏览器中。
3. **`App.vue` - 根组件**
   - **作用**：
     - `App.vue`是 Vue 应用的根组件，它是整个应用组件树的起点。这个组件包含了`<template>`、`<script>`和`<style>`三个部分（在单文件组件的格式下）。
     - 其中，`<template>`部分定义了组件的 HTML 模板结构，用于展示页面内容。它可以包含其他子组件、HTML 标签和数据绑定等。例如，可能会有一个简单的模板结构如下：
     ```html
     <template>
       <div>
         <h1>Welcome to My Vue App</h1>
         <router - view></router - view>
       </div>
     </template>
     ```
     - 这里的`h1`标签展示了一个标题，`router - view`（如果使用了 Vue Router）用于展示路由对应的子组件内容。
     - `<script>`部分用于定义组件的逻辑，如数据、方法、生命周期钩子等。例如，可以定义一个`data`函数来返回组件的数据：
     ```javascript
     export default {
       data() {
         return {
           message: "Hello from App.vue",
         };
       },
     };
     ```
     - `<style>`部分用于定义组件的样式，可以是普通的 CSS 样式，也可以是预处理器（如 SCSS、LESS 等）样式。
   - **展示流程**：
     - 当`main.js`将`App.vue`挂载到`index.html`的`#app`元素后，Vue 会解析`App.vue`的`<template>`部分，将其中的 HTML 模板编译成虚拟 DOM。然后根据组件的逻辑（如数据绑定）更新虚拟 DOM，最后将更新后的虚拟 DOM 渲染到实际的`#app`元素中。
     - 如果`App.vue`组件内部包含其他子组件（如通过`<component - is>`或者`router - view`等方式引入），Vue 会递归地处理这些子组件，将它们的内容也渲染到相应的位置，从而逐步构建出完整的页面内容展示在浏览器中。

## 组件(components)

- 视图 views 内的小组件---components 文件夹----一个页面内的某个部分

## 路由

- 路由路径配置---router 文件夹
- 路由显示视图---views 文件夹---单页面应用的页面切换中的一个独立页面

## vuex 和 pinia 状态管理

- pinia---store 文件夹

## 其他文件夹

- 工具文件夹---utils
- 静态资源文件夹---public
- vite 资源文件夹---assets

- 在 Vite 直接创建的项目工程中，`src`文件夹下的`assets`文件夹主要用于存放项目中的静态资源。

1. **存放资源的类型**

   - **图片资源**：例如项目中使用的`jpg`、`png`、`svg`等格式的图片。比如网页的图标（`favicon.ico`）或者页面中展示的产品图片、用户头像等都可以放在这里。
   - **字体文件**：像`woff`、`woff2`、`ttf`等字体格式。如果你的网页使用了自定义字体，这些字体文件就可以存放在`assets`文件夹中，然后在 CSS 文件中通过相对路径引用它们，使网页能够正确加载并显示自定义字体。
   - **其他静态文件**：如一些小型的`json`数据文件（如果用于前端配置或者简单的数据存储）、音频文件（`mp3`、`wav`等格式）、视频文件（`mp4`、`webm`等格式）等。

2. **在项目中的引用方式**

   - 在 Vite 项目的组件（如`.vue`文件）或样式文件（`.css`、`.scss`等）中，可以很方便地引用`assets`文件夹中的资源。
   - 以 Vue 组件为例，在`.vue`文件的`<template>`标签中引用图片资源时，可以使用相对路径。假设`assets`文件夹下有一个名为`logo.png`的图片，在组件中可以这样引用：

   ```html
   <template>
     <img src="@/assets/logo.png" alt="项目logo" />
   </template>
   ```

   - 这里的`@`是 Vite 配置的路径别名，它指向`src`目录，这样就可以方便地访问`src/assets`中的文件。
   - 在样式文件中引用字体文件，例如在`.css`文件中：

   ```css
   @font - face {
     font - family: 'CustomFont';
     src: url('../assets/fonts/CustomFont.woff2') format('woff2');
   }
   ```

   - 这种引用方式可以确保在构建过程中，Vite 能够正确处理这些静态资源，将它们打包到最终的输出文件中，并在浏览器中正确加载。

3. **与项目构建的关系**
   - 在 Vite 构建项目时，它会根据配置对`assets`文件夹中的资源进行处理。例如，对于图片资源，Vite 会优化它们的加载路径，并且可能会对图片进行压缩（如果配置了相关的插件），以提高项目的性能。
   - 对于字体文件和其他静态文件，Vite 会确保它们在正确的位置被引用，并且在最终的部署文件结构中，这些资源能够被浏览器正确访问。

在 Vite 项目中，`public`文件夹和`assets`文件夹功能并不完全重合，它们各有其侧重点和用途。

1. **`public`文件夹的主要特点和用途**

   - **存放全局静态资源**：`public`文件夹用于存放那些在构建过程中不需要被 Vite 处理，且需要直接按照原始路径访问的资源。例如，项目的`index.html`文件通常存放在`public`文件夹中。这是因为`index.html`是整个应用的入口文件，它需要能够直接被浏览器访问，并且其中引用的一些资源路径可能是绝对路径。
   - **保留原始文件路径**：`public`文件夹中的资源在构建后会被直接复制到输出目录，其文件路径和在`public`文件夹中的路径结构基本保持一致。例如，如果在`public`文件夹中有一个`robots.txt`文件，用于搜索引擎爬虫的配置，构建后它依然可以通过相对应的路径（如`/robots.txt`）被访问到。
   - **引用方式**：在`index.html`文件中引用`public`文件夹中的资源可以使用绝对路径。比如，假设`public`文件夹中有一个名为`favicon.ico`的图标文件，在`index.html`中可以这样引用：

   ```html
   <link rel="icon" href="/favicon.ico" />
   ```

   - 这种引用方式使得浏览器能够直接从根目录开始查找资源，而不需要经过 Vite 的模块处理机制。

2. **`assets`文件夹与`public`文件夹的区别**
   - **构建处理方面**：
     - `assets`文件夹中的资源会被 Vite 的构建工具进行处理，如前面提到的对图片进行优化、对字体文件路径进行调整等。Vite 会将这些资源视为项目模块的一部分，根据模块之间的依赖关系和构建规则来处理它们。
     - `public`文件夹中的资源则基本不经过这样的处理，只是简单地复制到输出目录。
   - **资源类型和使用场景**：
     - `assets`文件夹更侧重于存放与项目组件和样式紧密相关的静态资源，这些资源通常是在组件代码或者样式代码中通过相对路径引用的，是项目内部模块所使用的资源。
     - `public`文件夹适合存放一些全局性质的、与项目入口或者外部环境（如搜索引擎、服务器配置等）相关的资源，例如`404.html`页面、网站地图（`sitemap.xml`）等文件也可以放在`public`文件夹中，方便服务器直接按照原始路径提供这些文件的访问服务。

