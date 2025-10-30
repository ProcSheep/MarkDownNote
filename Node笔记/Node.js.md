# Node.js
## 基础Node
### 初识Node.js
- ==Node.js是一个基于V8 JavaScript引擎的js运行环境,本身是由C++,C,JS编写==
- ==Node.js并不只有v8==,无论chrome还是node,都是c++程序,而v8可以嵌入任何c++程序中,所以事实上它们是嵌入了v8来执行js代码;比如在chrome还要解析渲染HTML,CSS,浏览器操作api,浏览器事件循环等;node也有额外操作,比如文件系统读写,网络IO,加密,压缩解密文件
- ==Node的应用场景==
  - 1.目前前端开发的许多第三方库都是由node包的形式进行管理
  - 2.npm yarn pnpm工具成为前端开发使用最多的工具
  - 3.Node.js作为web服务器开发的中间件,代理服务器
  - 4.大项目借助Node.js完成前后端渲染的同构应用
  - 5.前端工程师编写脚本工具,通常用js语言,所以node可以直接运行js代码 
### 常用指令与运行环境
****
**==提醒==: 本章节所有的代码均在js内部,执行要在cmd中,打开文件所在资源管理器中的位置后,对搜索框输入 cmd回车打开进行执行**

- ==简单的指令:== 
- node + 空格 + 文件名字 --> 执行js文件
- cls 清屏
- ==按向上键 ^ 返回上一次的指令,可以多次按,上下键灵活选择==
- ctrl + c + c 强制结束程序,用于服务器关闭
- exit : 关闭cmd
- ==nodemon(安装了nodejs热启动插件)== : 后期可以实时运行nodejs代码,不必重复开启关闭, 语法为 nodemon + 空格 + 文件名
  .......
****
- ==运行环境==
  - ==vscode中的终端和电脑黑框cmd同理,推荐在vs中的终端运行node==
  - 在对应的文件夹根目录右键==在集成终端中打开==,即可使用vs的终端,==终端运行环境推荐command prompt(cmd),不要用powershell环境==
### node传递参数(了解)
  ```js
    // 给程序输入内容
    console.log(process.argv)

    /* 
      传参方法: node 文件名 参数1 参数2 ....
      应用: 在webpack的一些指令中会使用到输入知识
      结果为数组: 
        0 node环境地址
        1 当前运行文件地址
        2 参数1
        3 参数2
        ......
    */ 
  ```
### node常见的全局对象
- node的全局对象非常多,大部分都不常用,==比较重点学习的比如有== module exports require(==模块化==),Buffer;后面慢慢学
  ```js
    // 1.常见的全局对象 (了解)
    console.log(global);  // 类似于window
    console.log(process); // 读取进程,很多信息
    // 浏览器和node全局对象名字有一个统一的名字,方便记忆
    console.log(globalThis)

    // 2.特殊的全局对象
    // 当前文件所在的目录结构(比较重要,拼接相对目录结构)
    console.log(__dirname) 
    // D:\前端vscode源码\源码\codewhy_前端工程化\Node
    // 获取当前目录+当前文件名称
    console.log(__filename);
    // D:\前端vscode源码\源码\codewhy_前端工程化\Node\03node全局对象.js

    // 3.定时器 不再是浏览器的内置方法,是node的
    setTimeout(()=>{
      console.log('setTimeout')
    },1000)
    setInterval(()=>{
      console.log('setInterval')
    },1000)

    // 立即的执行 和事件循环有关
    setImmediate(()=>{
      console.log('immediate');
    })

    // 4.额外执行函数 也和node执行的事件循环有关
    process.nextTick(()=>{
      console.log('nextTick');
    })
  ```

### 第三方库
> 下载器工具npm就是负责把第三方包下载到本地的工具, 只不过这个工具需要使用指令进行驱动 , cmd
> ==之前我们下载swiper和axios都是这样,打开相应的文件路径后,输入cmd回车,打开控制台,输入下载指令==

- 基本指令:
  - ==通过nodejs下载卸载即npm (node的npm就和python内的pip一样,就是下载工具)==
  - 有个网站==npmjs.com,有许多的第三方插件,缺点全英文看不懂==
  - 下载 : `npm install 第三方包的名称` : ==install 可以简写为 i==
  - 卸载 : `npm uninstall 第三方包的名称` 
- 安装样例:
  - ==安装指令非常简单 : `npm i axios`==
  - 安装下来的插件放在 node_modules 文件夹之中 
- 安装的部分文件解释
  - package.json 
    - 项目依赖说明书 , 当前的项目用到了哪些第三方模块, 在package.json之中注明; 
    - package.json可以描述的信息非常多 , 测试指令, 核心文件 , 项目描述...(自己添加)
  - package-lock.json 
    - 这是一个详细的版本记录 , 为了防止版本使用出现差异,所以nodejs默认创建了这么一个文件, 这个文件我们不需要进行任何操作; 
- nodejs 软件和常规的软件有啥区别 : 
  - 需要cmd进行指令下载,而非常规的应用商店或exe等
- nodejs的使用
  - 创建同目录的js文件,使用下载插件(例如axios)的内部工具,==记得先引入==
### 全局模块和局部模块
- 局部模块: 把插件下载到一个特定的文件内部,之前的axios和swiper我们都是这么下载的
- 如何下载全局模块:
  - 下载之后，会在cmd命令行上多出一个指令 
  - ==下载的时候我们需要在下载指令后面添加 `-g`参数才可以实现全局的包的下载==; 
- 全局模块下载插件nodemon
  - ==安装指令可以在任意路径下执行==
  - 注意 : 我们安装全局模块，不会在当前文件夹之中出现 `node_modules` 文件夹及 `package.json` , `package.lock.json` ,安装进入了nodejs的文件根目录了
  - 测试nodemon安装成功的方式是在命令行上输入指令 `nodemon --version` 正常返回版本号,那么则表示 nodemon 指令可以使用了, 也就是说我们的全局的包安装成功; 
- nodemon 作用
  -  就是改完代码就会实时启动nodejs,不用和之前一样重启服务器, 打开方式 `nodemon + 空格 + 文件名`
   
## fs与Buffer
### fs读写文件
- 主要功能: ==读取==文件内容和==修改==内容,分为==异步与同步,同步完不成会阻塞后面js代码的执行,异步不会阻塞,读取完成执行回调函数==,需要**提前获取**
- 1.**获取**: `let fs = require("fs")`
- 2.**读取**: 
        ==异步== fs.readFile(路径,编码格式,回调函数) ||  ==防止回到地狱,还有promise风格==
        ==同步== fs.readFileSync(路径,编码格式)
  - **路径**:目标文件相对本文件的路径,也可以是目标文件的绝对路径
  - **编码格式**: "uft8" , ==**注意带有图片的html文件读取不能使用utf8格式读取,会报错,不要写格式空着就行**,不写utf8默认读取二进制,会转化为16进制==
  - ==回调函数(只要读取文件就会被调用,内部是读取后处理的代码)==: 回调函数的2个参数 (err,data) err: 报错信息 ; data: 成功后获取的文件内容
    ```js
      const fs = require("fs")

      // 同步
      const res = fs.readFileSync('./01hello.txt', {
        encoding: "utf-8"
      })

      // 异步
      const res1 = fs.readFile('./01hello.txt', {
        encoding: "utf-8"
      },(err,data) => {
        if(err){
          console.log('读取文件错误',err)
        }else{
          console.log('文件结果',data)
        }
      })

      // 同步打印
      console.log(res)
      // 异步不阻塞,所以先打印undefined,等异步回调成功后再打印具体值
      console.log(res1)

      // 3.异步- 防止回调地狱 - promise
      const res3 = fs.promises.readFile('./01hello.txt', {
        encoding: "utf-8"
      }).then(data => {
        console.log('文件结果',data)
      })
      .catch(err => {
        console.log('读取文件错误',err)
      })
    ```
- 3.**修改**: ==异步== fs.writeFile(路径,写入内容,回调函数)
             ==同步== fs.writeFileSync(路径,写入内容)
  > 注意 : 
  > 第一 : 有文件就修改,没有就创建一个并且写入
  > 第二 : 回调函数的参数只有一个了,err,如果修改失败,err就是报错信息
  > 第三 : 没有编码格式了 ; 变为"写入内容" , 其余与读取一样
  > 第四: ==额外的,flag参数有需要自己再查==
  ```js
    // ------------- wirteFile ---------------
    const fs = require("fs")
    const content = "hi 你好"

    fs.writeFile("./02hi.txt",content,{
      flag: "w+",
      encoding: "utf-8"
    }, err => {
      if(err){
        console.log("写入错误:",err)
      }else{
        console.log("写入成功")
      }
    })
  ```
### fs-文件
- ==mkdir: 创建文件夹==
  ```js
    const fs = require('fs')

    fs.mkdir("./newFileTest",(err)=>{
      if(err){
        console.log("文件创建失败",err)
      }else{
        console.log("文件创建成功")
      }
    })
  ```
- ==readdir: 读取文件夹或文件的信息,深层嵌套文件可以递归读取==
  ```js
    const fs = require("fs");

    // 读取文件夹或文件信息
    fs.readdir("../../codewhy_node", { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log("读取失败", err);
      } else {
        files.forEach((item) => {
          if (item.isDirectory()) {
            console.log("是一个文件夹", item);
          } else {
            console.log("是一个文件", item);
          }
        });
      }
    });

    // 递归
    function readDirectory(path){
      fs.readdir(path,{withFileTypes: true}, (err,files) => {
        if(err) return
        files.forEach(item => {
          // isDirectory(): 判断item是不是文件夹
          if(item.isDirectory()){
            // item.name是此文件夹名字
            readDirectory(`${path}/${item.name}`)
          }else{
            // 递归出口
            console.log('文件信息为',item.name)
          }
        })
      })
    }

    readDirectory("../../codewhy_node")
  ```

### 创建与读写 (补)
- 中游文件夹的自动创建
  ```js
    /** 问题1&2
     * 文件夹的创建(默认中间路径不自动创建), 但是文件可以
     * 文件夹路径的获取
    */
    const fPath = path.resolve(__dirname, './config/testData/student.txt')

    // 可以获取文件夹的路径部分,实际就是删除最后一部分(/student.txt)
    const pathDir = path.dirname(fPath)

    // recursive: 异步创建文件夹,如果路径中包含不存在的父级目录，会自动创建所有缺失的目录
    // 不会重复创建文件夹
    fs.mkdirSync(pathDir, { recursive: true })
  ```
  > 1.拓展方法：`path.join(a,b,c)`,单纯的字符串拼接`a/b/c`，可以没有绝对路径（__dirname），但是`path.resolve`,总会以当前文件的绝对路径为基准进行拼接，实际使用区别不大
  > 2.拓展方法：`fs.dirname(fpath)`删除`/`最后一部分,一般用于删除文件部分，例如：`a/b/c.js -> a/b`
- 存入数据进入文件夹
  ```js
    /** 
     * 存入数据格式
     * info: 字符串 Buffer Uint8Array
    */

    const stu1 = '字符串: 小明'

    const stu2 = {
      name: "小明"
    }
    const stu2Str = JSON.stringify(stu2, null, 2) // 参数： 要被转化内容, 筛选条件(可选,没有就写null占位), 缩进格式

    const stu3 = ["小明"]
    const stu3Str = JSON.stringify(stu3, null, 2)

    fs.writeFileSync(fPath, stu1, { flag: 'a' }) // 追加
    fs.writeFileSync(fPath, stu2Str, { flag: 'a' })
    fs.writeFileSync(fPath, stu3Str, { flag: 'a' })
  ```
- 写入数据进入文件的总结:
  ```js
    /**
      * 1.指定文件路径
      * 2.获取文件夹路径
      * 3.检测文件夹路径是否都被创建
      * 4.传入数据(针对对象和数组要JSON转化)
      * 
      * 注意: 文件操作是异步操作,所以最好try-catch
    */
  ```
- 读取文本
  ```js
    /**
     * 设置格式utf-8,会作为纯字符串输出, 否则格式为Buffer
     * 对单一的数据(对象/字符串) 读取后正常使用需要JSON解析 JSON.parse()
    */
    const res = fs.readFileSync(fPath, 'utf-8')
    console.log(JSON.parse(res))
  ```
- ==pipe==:pipe() 是流（Stream）对象的核心方法，用于将一个可读流（Readable）的数据 “管道” 到一个可写流（Writable）中，实现数据的自动传递和处理。它简化了流之间的数据传输逻辑，无需手动监听 data 和 end 事件。
- 核心用法: `readableStream.pipe(writableStream);`
- 简单用法: 
  ```js
    const fs = require('fs');

    // 创建可读流（源文件）和可写流（目标文件）
    const readStream = fs.createReadStream('source.txt');
    const writeStream = fs.createWriteStream('target.txt');

    // 通过 pipe 传递数据
    readStream.pipe(writeStream);

    // 监听完成事件
    writeStream.on('finish', () => {
      console.log('文件复制完成');
    });
  ```
- 支持连缀写法
  ```js
    const fs = require('fs');
    const zlib = require('zlib'); // 提供压缩/解压转换流

    // 流程：读取文件 → 压缩 → 写入压缩文件
    fs.createReadStream('largeFile.txt')
      .pipe(zlib.createGzip()) // 压缩转换流
      .pipe(fs.createWriteStream('largeFile.txt.gz'))
      .on('finish', () => {
        console.log('文件压缩完成');
      });
  ```
- ==pipe() 不会自动处理错误，需为流单独监听 error 事件，否则错误可能导致程序崩溃==
  ```js
    readStream.on('error', (err) => console.error('读取错误:', err));
    writeStream.on('error', (err) => console.error('写入错误:', err));
  ```
- pipe第二个参数：
  ```js
    readable.pipe(writable, {
      end: true, // 默认为 true，可读流结束时自动结束可写流；设为 false 可保持可写流打开
    });
  ```
- pipe连缀写入文件
  ```js
    const fs = require('fs');
    const writeStream = fs.createWriteStream('combined.txt');

    // 第一个文件写入后不关闭可写流
    fs.createReadStream('file1.txt').pipe(writeStream, { end: false });

    // 第一个文件写完后再写第二个文件
    writeStream.on('unpipe', () => {
      fs.createReadStream('file2.txt').pipe(writeStream);
    });
  ```
  > ==监听 unpipe 事件的核心目的，是确保第一个可读流完全写完并断开管道后，再向同一个可写流写入第二个文件==

- 当第一个流（file1.txt）通过 pipe(writeStream, { end: false }) 写入时，end: false 会让可写流在第一个流结束后保持打开（不触发 finish 事件）。
- 但第一个流写完后，会自动与可写流断开管道连接（触发 unpipe 事件），此时可写流处于 “空闲可写入” 状态。
- 若不监听 unpipe，直接连续调用 pipe（如 file1.pipe(ws).pipe(file2.pipe(ws))），两个可读流会同时向可写流写数据，导致文件内容错乱（比如 file1 的末尾和 file2 的开头混在一起）。

### 删除文件（补）
- 删除文件需要权限，设置好权限后，如下重置文件的操作
  ```js
    const fPath = Path.resolve(__dirname, `../../testData/addphotosByChunk`)
    if(fs.existsSync(fPath)){
      fs.rmSync(fPath, { 
        recursive: true,  // 递归删除子文件/目录
        force: true       // 强制删除（忽略权限限制，需要用户实际有权限）
      });
      console.log('上一次执行文件清除成功')
    }
  ```

### fs-重命名(了解)
- ==rename: 重命名文件夹或文件的名字==
  ```js
    fs.rename("./newFileTest","./newFile2", err=>{
      if(err){
        console.log("修改失败",err)
      }
      console.log("修改成功")
    })
    
    fs.rename("./01fs-文件.js","./01fs_文件.js", err=>{
      if(err){
        console.log("修改失败",err)
      }
      console.log("修改成功")
    })
  ``` 
  
### 文件描述符fd(了解)
- nodejs中给每一个文件配置一个文件描述符(数字),文件描述符fd可以代替fs文件读写内容的相对路径,不过主要用于读取文件信息,记得打开文件后,最后要关闭它
  ```js
    const fs = require("fs");

    // 打开一个文件,获取fd
    fs.open("./01hello.txt", (err, fd) => {
      if (err) {
        console.log("文件打开出错", err);
      } else {
        // 获取到文件描述符
        console.log(fd);

        // 1.读写
        console.log(fs.readFileSync(fd, { encoding: "utf8" }));
        // 2.获取文件信息 异步
        fs.fstat(fd, (err, stats) => {
          if (err) {
            console.log("错误信息:", err);
          } else {
            console.log("文件信息", stats);
          }
          // 3.关闭文件
          fs.close(fd);
        });
      }
    });
  ```
### events模块
- ==同等与eventBus,对事件监听,传参和调用回调函数==
  ```js
    // EventEmitter是一个class类
    const EventEmitter = require('events')

    // 创建实例
    const emitter = new EventEmitter()

    function handleEvent(name,age){
      console.log("监听why事件,信息为",name,age)
    }

    // 监听事件
    emitter.on('why', handleEvent)

    // 发射事件
    setTimeout(()=>{
      // 传参一一对应
      emitter.emit('why',"codewhy",18)
    },1500)

    // 取消事件监听
    setTimeout(()=>{
      emitter.off('why', handleEvent)
    },3000)
  ```
  > emitter实例还有一些api,很少用,就不记录了
### 数据二进制与Buffer
- ==1.数据的二进制==
  - 计算机所有的内容: 文字,图片,字体,音频,视频都最终用二进制表示
  - 前端开发中,网页端我们的图片和音视频等数据都是浏览器处理的,但是在服务器端,我们需要自己处理二进制问题与实际内容的转化问题
- ==2.Buffer与二进制==
  - Node为了方便开发者完成更多功能,提供了一个全局的Buffer类
  - ==Buffer可以看作一个存储二进制的数组==,8个为一组 0000 0000,==最后,Buffer的每一组(8)是以十六进制的方式显示的==
  - ==8位合并为一个单元,这个单元为**一个字节(byte)**==,计算机最小表示的内容的单位就是字节,既是单独一个数字1也要由`0000 0001`表示,==所以一个Buffer就是一个字节==
  - ==1byte=8bit 1kb=1024byte 1mb=1024kb ...==
  - 很多编程语言int是4个字节,即32个比特(bit) `0000 0000 0000 0000 0000 0000 0000 0000`(二进制)
  - 比如颜色rgb(255,255,255),每一个red green blue由一个字节存储信息,一个字节最大为255, 二进制下的`1111 1111`
  - buffer常用表示方法: `[ff,aa,ab,12,8a]` ,==十六进制表示,4个二进制为一组,表示一个十六进制`0-9+abcdef`==
### 字符串与Buffer
- 字符串: 一个英文代表一个字节,但是普通的中文,一个字代表三个字节,特殊复杂的汉字甚至4个字节
  ```js
    // 创建Buffer类型数据 
    const buf1 = Buffer.from("Hello")
    const buf2 = Buffer.from("你好")
    // 转中文,现在通用的是utf-8,默认就行,toString内的utf-8可以不写
    const str = buf2.toString("utf-8")
    console.log(buf1) // <Buffer 48 65 6c 6c 6f>
    console.log(buf2) // <Buffer e4 bd a0 e5 a5 bd>
    console.log(str) // 你好

    // 转码和解码用的方法不一样会导致乱码
    // 编码
    const buf3 = Buffer.from('呵呵呵','utf16le')
    // 解码
    console.log(buf3.toString("utf-8"))
  ```
  > ==之前fs读文档内容时,使用utf-8编码格式才会读取正常的内容,否则就是Buffer数据==
- 其他创建Buffer类的操作
  ```js
    // 创建一个8个字节的Buffer类
    const buf = Buffer.alloc(8)
    console.log(buf)

    // 可以对每个字节进行操作
    buf[0] = 100 // 100 十进制->十六进制
    console.log(buf) // <Buffer 64 00 00 00 00 00 00 00> 
    console.log(buf.toString()) // 十六进制64->ascll码->字符d

    buf[1] = 'm'.charCodeAt() // 把m的ascll转为十六进制
  ```
  > buffer请求内存时,默认会向系统申请8*1024个字节的内存空间,这样后续再申请新的字节,可以直接用这8kb的内存,减少了向系统申请内存的次数
### 图片与Buffer
- node中直接读取图片也是二进制,往往几万个字节的buffer类,其中node中有==sharp库==可以帮助我们转化图片数据,然后可以把转化后的数据写入文件,一般来说是不用的,毕竟我们网页请求node服务器,拿到图片数据后直接扔给浏览器操作显示,浏览器代替了图片的渲染.
## 原始的web服务器开发
- ==本章节大多使用原生nodejs开发,没有使用框架,从底层原理了解nodejs服务器==
- ==本章节了解简单的后端开发接口知识,主要的后端知识还是要系统学习java和go,蜻蜓点水,自己做东西玩可以,业务上几乎都是java和go==
[![pE6C09f.jpg](https://s21.ax1x.com/2025/04/03/pE6C09f.jpg)](https://imgse.com/i/pE6C09f)
### stream的读写操作
- 底层概念: 开发服务器的语言java,go和nodejs大差不差
- stream: 意为流水,溪水,代表着,==当我们从一个文件中读取数据时,文件的二进制(字节)数据会源源不断被读取到我们的程序中,对于小文件可以一次性读取,对于大文件,比如电影文件等,需要像流水一样慢慢读取,**这一连串的字节就是我们程序中的流**==
- ==数据流是可读可写的==
- ==流的作用==
  - ==**读写文件可以控制一些细节**==,比如读取多少,读取位置,暂停和继续以及大文件的慢慢读取,==**之前学习的fs.readFile/writeFile都是一次性读取和写入的**==
- ==Node.js中四种基本的流==
  - ==Writable==: 写入数据的流
  - ==Readable==: 读取数据的流
  - Duplex: 同时读写,双向双工通信,socket
  - Transform: 写入和读取数据时修改或转换数据的流
> ==所有的流都继承EventEmitter,所以都有监听等功能==
### Readable(了解)
- 进行一个==可读流==的基本使用,包含读取文件的开始,结束,暂停,重启,监听,每次读取的多少
  ```js
    const fs = require("fs")
    // 1.通过流读取文件,创建一个可读流
    const readStream = fs.createReadStream('./aaa.txt',{
      start:0, // 开始字节
      end:8,  // 结束字节
      highWaterMark: 2 // 每次读取字节个数,最大64kb
    })

    // 每次读取,执行回调函数
    // 监听的data是固定的,是readStream发出的
    readStream.on("data",(data)=>{
      console.log(data.toString())
      readStream.pause() // 暂停
      setTimeout(()=>{
        readStream.resume() // 重启
      },1000)
    })

    // 其他的监听
    // 监听文件流的打开---可以获取fd
    readStream.on('open', (fd)=>{
      console.log('文件流被打开,文件描述符',fd)
    })
    // 监听文件流已经读取结束----自动关闭
    readStream.on('end', ()=>{
      console.log('文件流已经读取结束,抵达end')
    })
    // 监听文件流关闭
    readStream.on('close', ()=>{
      console.log("文件流关闭")
    })
  ```
### Writable(了解)
- 和读取流一样,细致地控制写入流
  ```js
    const fs = require('fs')

    const writeStream = fs.createWriteStream('./bbb.txt',{
      flags: "r+" // windows兼容性问题, a+只能用于MacOs系统
      start: 5 // 从第五个字节开始写入
    })

    // 打开文件
    writeStream.on('open', (fd)=>{
      console.log('文件代开',fd)
    })

    // 写入内容
    writeStream.write('hello world codewhy NB')
    writeStream.write('123123 aaa bbb ccc' , (err) => {
      if(!err){
        console.log("写入完成")
      }
    })

    // 写入完成,文件流未关闭
    writeStream.on('finish',()=>{
      console.log('文件写入完成')
    })

    // close 写入流需要手动关闭
    writeStream.close()
    writeStream.on('close',()=>{
      console.log('文件关闭')
    })

    // 常用: end 追加内容后,自动关闭
    writeStream.end('hahahah') 
  ```
### pipe拷贝(了解)
- 拷贝操作--在可读流和可写流之间建立管道pipe
  ```js
  // 拷贝操作--在可读流和可写流之间建立管道pipe
  const fs = require('fs')

  const readStream = fs.createReadStream('./aaa.txt')
  const writeStream = fs.createWriteStream('./aaa_copy.txt')

  readStream.pipe(writeStream)
  ```
  > 把可读流的信息全部传入可写流
### web服务器
- [![pE6CB38.jpg](https://s21.ax1x.com/2025/04/03/pE6CB38.jpg)](https://imgse.com/i/pE6CB38)
### http构建服务器
- http : ==可以开启一个自己的服务器,服务器的内部逻辑由自己编写,http是基于底层的语法,在公司用的是框架express,koa等==
- 开启一个服务器需要以下几个步骤
  - 引入http: `let http = require("http")`
  - 开启服务器(==创建一个服务器对象,同时定义好一个请求处理函数==): `let server = createServer((req,res) => {...})`
  - 监听端口: `server.listen(3000,() => {console.log(server.address().port)})`
  - 向服务器发请求: ==直接在浏览器发送或者使用**apifox(推荐)**==

- 1.开启服务器
    > 1.语法: http.createServer(请求处理函数)
    > 请求处理函数: 服务器接收到请求,这个函数就会被调用
    > 返回值: ==服务器对象==,这个对象用来决定监听的端口号
    > 2.回调函数的参数:
    > req: 请求携带数据(请求报文解析的内容)
    > res: 响应处理工具,我们可以使用这个对象之中的工具,进行响应报文配置
    > 3.res的一些方法:
    > res.write() 向响应体中写入内容
    > res.end() 终止http请求,==**不写它,http请求就不会终止,也就不会有响应数据**==
- 2.==监听端口(了解)==
  ```
    什么是端口? 计算机有65535个端口号,我们规定一个端口号作为访问我们当前服务器的路径(就比如之前的8888服务器)
    4位数的端口比较安全,其他的可能会导致开启服务器失败,比如两个服务器共用一个端口这种情况,碰到了换一个号
    潜规则: 默认监听1024以上的端口,1024以下的操作系统会占用,最大不超过65535(计算机端口2个字节大小)

    默认端口号: 如果你的协议如下...,并且使用如下端口号,那么可以省略这个端口号
    http: 80 , https : 443 比如: 百度等网站
    但是自己的服务器在自己的电脑上,不能这么随意部署端口号,在大公司中,端口号是纯后端的工作
  ```
    > 1.服务器监听的3个参数 server.listen(端口号,ip地址,回调函数) 
    > 2.获取端口的值 server.address().port
    > 3.监听时调用回调函数,回调函数内可以打印端口号来确定是否开启成功 
    [![pE6CDgS.jpg](https://s21.ax1x.com/2025/04/03/pE6CDgS.jpg)](https://imgse.com/i/pE6CDgS)
- 代码示例: 
  ```js
    const http = require('http')

    // 创建一个服务器
    // 一个主机可以有多个服务器,每个服务器端口号不同
    const server = http.createServer((req,res)=>{
      // req: 请求的所有信息 url method headers
      console.log(req) 
      // res: 给客户端返回结果,并终止向服务器的http请求
      res.end('hello world')
    })

    // 开启服务器并监听端口
    // 潜规则: 默认监听1024以上的端口,1024以下的操作系统会占用,最大不超过65535(计算机端口2个字节大小)
    server.listen(8000,()=>{
      console.log('服务器开启成功,端口8000')  
    })
  ```
### http-req
- ==req参数可以获取的信息==
  ```js
    const http = require('http')

    // 开启一个服务器
    // 一个主机可以有多个服务器,每个服务器端口号不同
    const server = http.createServer((req,res)=>{
      // req.url: 域名端口后面的url地址
      // req.method: 请求方式
      // req.headers: 客户端发给服务器的请求http中的请求头信息
      console.log(req.url) 
      console.log(req.method) 
      console.log(req.headers) 
      
      res.end('hello world')
    })

    // 监听端口
    server.listen(8000,()=>{
      console.log('服务器开启成功,端口8000')  
    })
  ```
- ==根据不同的url请求不同的数据==
  ```js
    if(req.url = "/home"){
      res.end("主页信息")
    }else if (res.url = "/profile"){
      res.end("个人信息")
    }
  ```
- ==url请求参数query **(原生的很麻烦)**==
  ```js
    const url  = require('url')
    const qs =require('querystring')

    // 参数query: 客户端在url后拼接的query参数
    // 请求url: http://localhost:8000/home?name=codewhy&age=20
    const urlString = req.url // /home?name=codewhy&age=20
    const urlInfo = url.parse(urlString) // Url对象,内含许多信息
    const queryString = urlInfo.query // 'name=codewhy&age=20'
    const queryInfo = qs.parse(queryString)
    console.log(queryInfo) // { name: 'codewhy', age: '20' }
  ```
- ==body参数,在apifox中直接配置的body参数(Json格式配置),然后发送POST请求==
  ```js
    // 参数body,通过req无法直接获取body,这是额外的参数
    // req是可读流(readStream),可以在这里获取body信息
    req.on('data',(data)=>{
      // body在这里,body的对象
      console.log(data.toString()) 
    })
    req.on('end',()=>{
      console.log("读取结束") 
    })
  ```
- ==对请求方式进行限制==
  ```js
    if(req.url === "/login" && req.method === "GET" ){
      res.end("登录请求")
    }else{
      res.end("不支持GET之外的请求方式")
    } 
  ```
### req-headers
- 浏览器客户端向服务器发送http请求时,请求头携带许多信息,==其中比较重要的有content-type,authorization等==
- ==响应头文件==: 
  - **res.setHeader**: ==一次写入一个头部信息==
  - **res.writeHead**: ==同时写入header和status==
   > ==注意设置请求头的2个api都是`res.XXX`==
  [![pE65gIA.jpg](https://s21.ax1x.com/2025/04/05/pE65gIA.jpg)](https://imgse.com/i/pE65gIA)
  [![pE65WGt.jpg](https://s21.ax1x.com/2025/04/05/pE65WGt.jpg)](https://imgse.com/i/pE65WGt)

### http-res
- ==res演示,向服务器写入数据==
  ```js
    const http = require('http')

    // 开启一个服务器
    // 一个主机可以有多个服务器,每个服务器端口号不同
    const server = http.createServer((req,res)=>{
      // res是可写流writeStream
      res.write("hello world")
      // 不允许使用res.close()
      res.end('写入并关闭流')
    })

    // 监听端口
    // 潜规则: 默认监听1024以上的端口,1024以下的操作系统会占用,最大不超过65535(计算机端口2个字节大小)
    server.listen(8000,()=>{
      console.log('服务器开启成功,端口8000')  
    })
  ```
- ==对写入的数据进行类型识别和解码(比如中文)==
  ```js
    // 配置res写入的编码格式 文本类型 utf8
    res.setHeader('Content-Type','text/plain;charset=utf8;')
    res.end('你好 世界')
  ```
  ```js
    // 复杂数据 转为json字符串
    const data = {
      name: "codewhy",
      age: 20
    }

    res.setHeader('Content-Type','application/json;charset=utf8;')
    res.end(JSON.stringify(data))
  ```
### 返回状态码
- 客户端请求http,服务器会根据请求的情况返回不同的状态码
- ==服务器配置响应状态码==
  ```js
  if(req.url === "/home"){
    res.statusCode(201)
    res.end('成功获取到home数据')
  }
  ```
  [![pE65RPI.jpg](https://s21.ax1x.com/2025/04/05/pE65RPI.jpg)](https://imgse.com/i/pE65RPI)
### http网络请求
- ==原生http的网络请求(**不用**)==
  ```js
    const http = require('http')

    // 发送get请求
    http.get('http://localhost:8000', res => {
      // 监听数据流 获取服务器res
      res.on('data', (data) => {
        const dataString = data.toString()
        console.log(dataString)
      })
    })

    // post请求,需要主动结束请求
    const req = http.request({
      method: 'POST',
      hostname: 'localhost',
      port: 8000
    },res=>{
      res.on('data', data => {
        const dataString = data.toString()
        console.log(dataString)
      })
    })

    req.end()
  ```
### http-axios
- ==axios在node中是基于http封装的,在浏览器是基于xhr封装的==.所以axios可以在浏览器和node中使用,浏览器的xhr和fetch请求在node中是不支持的,http是node专属的请求api
- ==例如get请求==
  ```js
    const axios = require('axios')

    axios.get("http://localhost:8000").then(res => {
      console.log(res)
    })
  ```
### 原始文件上传流程
- ==这里讲解原始的文件上传的数据流,具体的字符截取不演示,后面直接使用框架(express+multer)完成,这里讲原理==
- 上传请求由apifox发起,post请求并携带body中的参数和图片数据
  ```js
    const http = require('http')

    const server = http.createServer((req,res) => {
      // 设置编码格式,buffer数据看不懂
      // 显示为ascll码
      req.setEncoding('binary')

      let allData = ''
      // 获取body中所有的数据,因为图片数据太大,一次可能传不完
      req.on('data',data=>{
        allData += data
      })

      req.on('end',()=>{
        // 显示编码后的所有body信息
        console.log(allData)
        res.end('请求结束')
      })
    })

    server.listen(8000,()=>{
      console.log('服务器启动成功,端口号8000')
    })
  ```
  > 通过调试可以看到body中所有的信息,其中掺杂图片信息,后续我们使用的文件上传插件会从这堆数据中单独找出图片的信息片段保存在服务器,这里了解文件上传流程即可
  [![pE6HinK.png](https://s21.ax1x.com/2025/04/05/pE6HinK.png)](https://imgse.com/i/pE6HinK)
### 文件上传-表单
- 从html网页中传递图片,==服务器配置跨域许可==
  ```html
    <input type="file">
    <button>上传</button>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      const btnEl = document.querySelector('button')
      btnEl.onclick = function (){
        // 1.创建表单对象
        const formData = new FormData()

        // 2.将选中的图片放入表单
        const inputEl = document.querySelector('input')
        formData.set('photo',inputEl.files[0]) // 单张图片上传操作
        
        // 3.发送post请求,将表单数据发送给服务器
        axios({
          method: "POST",
          url: 'http://localhost:8000',
          data:formData, // 图片的数据
          headers: {
            // 必填,代表这是个表单提交数据
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    </script>
  ```


## express
- ==一个nodejs的框架,更加方便地搭建web服务器==
- express的优势: 
  - ==路由的优势== ,  express 给我们提供了路由机制 , 让我们方便的搭建接口 
  - ==中间件优势== , 我们在进行某些操作之前, 完成某些操作之前中间放入一部分部分功能
- ==需要下载express插件== `npm i express`
### express基础
- ==express基础==
  - 1.引入express: 
    `let express = require("express")` 
  - 2.创建一个 express 的实例对象; 
    `let app = express()`  ==app就是一个express对象,可以用app来进行服务器的各种操作了==
  - 3.监听端口
    `app.listen(3000,(req,res)=>{console.log("已经监听到端口3000")})`
  - 4.配置请求处理函数(==**语法与http均有所不同**==)
    `app.use("/",(req,res)=>{res.rend("hello!")})`
     默认地址'/',响应数据直接一个send即可,自动关闭req请求(等于res.end())
     > ==use代表可以使用任意的请求方式,GET POST PUT DELETE,同时对路径没有要求==
- 简单示例:
  ```js
    const express = require('express')

    // 1.创建express服务器
    const app = express()

    // 2.客户端访问.../index 请求方式为get
    app.get('/index',(req,res) =>{
      res.send('这里是主页')
    })

    app.listen(8000,()=>{
      console.log('express服务器启动成功')
    })
  ```
### express中间件
- ==中间件就是app后的回调函数,可以使用`app.use()/app.methods()`请求,methods包括get post put delete四种方式==
- 中间件之间按顺序执行,==可以在某个中间件里截停执行==(比如`res.end()/res.json({...})/res.sent()`),也可以传递给下一个中间件next(),每个中间件(回调函数)的参数为req,res,next
  ```js
    const express = require('express')

    // 1.创建express服务器
    const app = express()

    app.get((req,res,next) =>{ 
      // res.send('这里是主页') // 截停,中间件2不会执行
      console.log('中间件1')
      next() // 执行下一个中间件
    })

    app.get((req,res,next)=>{
      console.log('中间件2')
      res.send('所有中间件执行结束')
    })

    app.listen(8000,()=>{
      console.log('express服务器启动成功')
    })
  ```
- ==中间件类型(可匹配methods和path)==
  - 普通的中间件: `app.use(中间件)`
  - path中间件: `app.use('/home',中间件)` ==路径为/home==
  - ==**path和methods中间件**==: `app.post('/index',中间件)` ==请求方法post,路径为/index==
  - 多个中间件: `app.get('/index',中间件1,中间件2,中间件3)`
   > ==1.同类型的中间件next()才可以传递==
   > 2.apifox请求后,会从头至尾查看,符合要求的中间件会被调用,==**use代表着对path和methods都没有要求!**==
### express内置中间件
- ==express提供的中间件方法json()==
  - apifox发送post请求,携带body-Json数据,==此中间件可以解析客户端传递过来的body-json数据==
    ```js
      const express = require('express')
      const app = express()

      // 1. 内置插件,整理请求req中的body信息,并next()
      app.use(express.json())

      app.post('/login',(req,res,next)=>{
        console.log('登录',req.body)
        res.end('登录成功')
      })
      app.post('/register',(req,res,next)=>{
        console.log('注册',req.body)
        res.end('注册成功')
      })

      app.listen(8000,()=>{
        console.log('express服务器启动成功')
      })
    ```
    > 1.普通的中间件use代表所有符合的路径和methods,所以只要请求这个服务器,就会进入这个中间件
    > 2.使用express内置方法json(),获取req的所有body信息并next()
    > 3.==这个操作就是对8000服务器的一个前置操作,这样之后,所有的中间件都可以直接拿到req.body==
- ==express的中间件urlencoded()==
  ```js
    // 解析req传递的body中"x-www-form-urlencoded"的数据
    app.use(express.urlencoded())
  ```
  > 同理解析body的其他参数类型,有的请求会把参数放入x-www-form-urlencoded中
- ==第三方中间件==
  - 需要额外安装的第三方express中间件插件,比如morgan,记录请求日志的插件
  - ==在社区和github上搜索中间件,大量的业务流程都会有中间件去封装的==


 	
### req与res（补）
- ==Express 路由中所有中间件（包括全局中间件、路由中间件、控制器）接收的 req 和 res 都是同一个实例==—— 整个请求生命周期内，req 和 res 不会被重新创建，只会被持续传递和修改。**中间件之间的信息传递就依靠req和res进行传递**
>
- ==一个请求从发送到服务器，到最终返回响应，会经历以下流程==
  - 浏览器发送请求 → 服务器创建 1 个 req 对象（存储请求信息）和 1 个 res 对象（用于构建响应）；
  - 这两个对象会按「中间件顺序」依次传递给每一个中间件（全局 → 路由 → 控制器）；
  - 所有中间件都可以读写 req 和 res 的属性（比如给 req 加自定义数据，给 res 加响应头）；
  - 最终，res 对象携带所有中间件设置的信息（响应头、业务数据等）返回给前端。
    > 简单说：req 和 res 是请求的「专属容器」，从请求开始到结束，全程复用同一个实例。

- ==req与res的作用==
	- ==req 负责「接收和解析前端的请求数据」（比如参数、文件、请求头）==
      - 基础的req.query/params/body的数据获取,常规req.method,req.url, 特殊的multer比如req.files(根据键名确定，非固定)
      - token的获取, req.headers.authorization
      - 信息传递，自定义req.username = username,在下一个中间件使用
  - ==res 负责「构建和返回给前端的响应结果」（比如数据、状态码、响应头）==
    - 设置跨域: res.setHeaders
    - 设置状态码/返回值：res.status(200) , res.json() / res.send()
    - 直接结束请求： res.end() 没有返回
    - 额外的： 重定向res.redirect(url)
    > 注意： 如果一个http请求没有设置任何的res来返回信息或者结束，那么这个http将会一直占用服务器，不会结束
- 总结：
  - req 是「输入工具」：负责接收前端请求数据，传递中间件加工后的信息（如解析后的用户数据、文件信息）；
  - res 是「输出工具」：负责设置响应规则（头信息、状态码），返回最终处理结果给前端；

### 跨域补充（补）
- ==在node后端中设置res跨域时的问题: 为什么是res而不是req呢？==
- 跨域拦截： 浏览器会先发送请求到后端（后端能正常收到并处理），但在将响应返回给前端之前，会主动校验后端返回的响应头；如果响应头中没有包含「允许当前前端域名访问」的标识，浏览器会拦截响应，不让前端读取数据（前端会看到 CORS 错误）， ==总结为请求会正常请求，但是返回信息给浏览器时，浏览器会检查此次请求是否跨域，这个取决于服务器返回的res，所以设置跨域操作是在res上而不是req上, **跨域限制的核心是浏览器的 “响应拦截”，而非 “请求拦截”（请求本身能正常发到后端）, 浏览器校验的是后端返回的响应头，而不是前端发送的请求头（即使前端在 req 中添加跨域标识，浏览器也不认,**== 比如：前端强行在请求头中添加 Access-Control-Allow-Origin，浏览器会直接忽略这个头，因为跨域校验的是后端返回的响应头，而非前端发送的请求头
### multer文件上传
- ==express第三方中间件multer==
  - 下载`npm i multer`
  - multer用于处理==multipart/form-data类型==的表单数据，它主要用于上传文件
- ==测试均为: apifox/post+"form-data"==
- ==上传**单文件**==
  ```js
    const express = require('express')
    const multer = require('multer')

    const app = express()
    const upload = multer({
      // dest(destination): 文件目的地,上传的文件都会在这里
      dest: './uploads'
    })

    // 上传单文件: single方法,自定义key值avatar
    // body数据类型: form-data
    app.post('/avatar',upload.single('avatar'), (req,res,next)=>{
      // 可以获取到上传文件的全部信息
      console.log(req.file) // 单文件
      res.send('文件上传成功!')
    })

    app.listen(8000,()=>{
      console.log('express服务器启动成功')
    })
  ```
- ==解决: 生成的文件名字是乱码 + 没有后缀名字==
  ```js
  const upload = multer({
    storage: multer.diskStorage({
      // destination函数: 定义存储文件位置
      // req: 请求信息; file: 文件信息; cb: 回调函数
      destination(req,file,cb){
        // 参数1: 传入错误Error或null,几乎为null
        // 参数2: 保存文件的相对地址
        cb(null,'./uploads')
      },
      // filename: 定义文件名字
      filename(req,file,cb){
        // 时间戳 + 文件名字
        cb(null,Date.now() + '_' + file.originalname)
      }
    })
  })
  ```
- ==多文件上传 upload.array==
  ```js
    // 多文件上传,最多9张
    app.post('/photos',upload.array('photos',9), (req,res,next)=>{
      // 可以获取到文件上传的全部信息
      console.log(req.files) // 多文件
      res.send('文件上传成功!')
    })
  ```
- ==解析form-data类型数据的中间件any()==
  ```js
      const formData = multer()
      app.post('/photos',formData.any(),(req,res,next) => {
        console.log(req.body)
        res.send('结束')
      })
  ```

### multer命名（补）
- multer是上传文件的第三方包，比如`multer.array(xxx)`和`multer.single(xxx)`; 这个命名取决于表单上传时的命名，如下
  | 位置 | 代码示例 | 说明 |
  | --- | --- | --- |
  | 前端 | FormData	formData.append('files', file) | 给每个文件绑定键名 'files' |
  | 后端 | multer 中间件	upload.array('files') | 告诉 multer：「提取键名为 'files' 的所有文件」 |
  | 后端控制器 | req.files	multer | 会自动将提取到的文件数组，挂载到 req.files（固定属性名，由 multer 约定） |
  > ==1.这三处的键名必须一致，否则无法找到对应存储的文件==
  > ==2.formData类型的数据无法直接打印==，需要entries转化 `for(const {key,value} of formData.entries)`， 对象也可以这样迭代成键值对 `Object.entries(obj)`
- 2.不同的文件数量上传
  - 2.1 `multer.single(xxx, maxCount)` 多文件,可选最大数量
  - 2.2 `multer.array(xxx)` 单文件
  - 2.3 `multer.field([ name: key, maxCount: x ], [....])` 多文件，不同键名


### 客户端-服务器交互总结
 [![pE6X1YD.png](https://s21.ax1x.com/2025/04/05/pE6X1YD.png)](https://imgse.com/i/pE6X1YD)
 [![pE6XlFO.png](https://s21.ax1x.com/2025/04/05/pE6XlFO.png)](https://imgse.com/i/pE6XlFO)
- ==额外的补充==
  - ==query获取==
    ```js
      app.get('/home/list',(req,res,next) => {
        // 解析query
        const queryString = req.query
        console.log(queryString)
        res.send('结束')
      })
    ```
    > 解析出来的结果是对象格式,而且==默认参数值都为string类型==
  - ==params获取==
    ```js
      // 动态路由
      app.get('/home/:id',(req,res,next) => {
        // 解析params
        const id = req.params.id
        res.send(`获取到${id},结束`)
      })
    ```
### 静态资源服务器
- 静态资源,比如图片,==只用express中间件可以把对应的文件夹设置为静态资源,静态资源访问非常简单,基础路径+图片名称,之后服务器会去静态资源文件夹中去寻找这个图片文件,找到就显示图片==
  ```js
    const express = require('express')

    // 1.创建express服务器
    const app = express()

    // 2.相对路径,部署uploads文件夹内的资源为静态资源
    app.use(express.static('./uploads'))

    app.listen(8000,()=>{
      console.log('express服务器启动成功')
    })
  ```
  > ==比如要访问某一张图片==(1743844820781_OIP-C.jpg): 基础路径+文件名字=`http://localhost:8000/1743844820781_OIP-C.jpg`
- ==静态资源也可以部署给我们打包好的项目文件,比如vue打包的项目==,然后访问index.html文件,express会到静态文件夹内去找,找到vue打包文件后,会根据html文件内部的依赖(js,css),下载对应的文件并解析,然后就可以使用你打包好的网站了
### 服务器的错误处理
- ==错误处理有2种方式==
  - 方案1:
    ```js
      // 返回对应的状态码和信息
      res.status(401)
      res.json('未授权的访问信息')
    ```
  - ==方案2(**推荐**)==:
    ```js
      // 返回状态码还是200(默认),但是会返回对应的错误信息
      res.json({
        code: -1001, // 公司内部定义的错误码
        error_message: '未授权信息,没有token' // 错误信息
      })
    ```
- ==简单的案例,用户登录==
  ```js
    const express = require('express')

    // 1.创建express服务器
    const app = express()

    app.post('/login',(req,res,next) => {
      const {username,password} = req.body
      // 对用户登录逻辑的错误处理
      if(!username || !password){
        res.json({
          code: -1001,
          errMsg: '没有输入用户名或密码'
        })
        // 假设查询数据库后,用户名codewhy,密码123456 
      }else if (username !== 'codewhy' && password !== '123456'){
        res.json({
          code: -1002,
          errMsg: '用户名或密码不匹配'
        })
      }else{
        res.json({
          code: 0,
          message: '登录成功!',
          token: 'sich29883'
        })
      }
    })

    app.listen(8000,()=>{
      console.log('express服务器启动成功')
    })
  ```
  > ==缺点:正确处理和错误处理混在一起,这样不易区分,所以错误的处理一般单独放置在一个地方==
- ==集中错误处理==
  ```js
      app.post("/login", (req, res, next) => {
      const { username, password } = req.body;
        // 对用户登录逻辑的错误处理
      if (!username || !password) {
          // next可以传参,传递错误的信息
          next(-1001);
        } else if (username !== "codewhy" && password !== "123456") {
          next(-1002);
        } else {
          res.json({
            code: 0,
            message: "登录成功!",
            token: "sich29883",
          });
        }
      });

      // 错误处理中间件
      app.use((err, req, res, next) => {
        // err是传参进入的错误状态码
        const code = err;
        switch (code) {
          case -1001:
            errMsg = "没有输入用户名和密码";
            break;
          case -1002:
            errMsg = "错误的用户名和密码";
            break;
          default:
            errMsg = "未知错误";
        }

        res.json({ code,errMsg });
      });
  ```
  > ==集中错误处理的中间件一般放在路由主文件app.js内部,这样所有在子路由挂载的子路由文件就都可以使用错误处理中间件了==
  ```
    // 挂载子路由
    app.use('url',子路由)
    app.use('url',子路由)
    app.use('url',子路由)
    // 集中的错误处理
    app.use((err,req,res,next) => { .... })
  ```
### express路由
- ==学过vue的路由思想后,这里应当非常简单==
****
- ==全局路由 : 它的响应处理函数一般不涉及具体业务!==
  - 全局路由负责使用中间件 app.use()
  - 全局路由负责引入并挂载子路由 `app.use('url',子路由)`
- ==子路由 : 我们一般会把业务写在子路由之中==
  - 子路由都是一个独立的js文件, 放在独立的文件夹之中进行存放,最后导出给主路由文件; 
  - 子路由分散代码,减少主路由app的代码冗余
****

- 1.照常例引入express工具和创建express对象app
- 2.创建存放子路由的文件夹,routers,在内部创建多个js文件,每个js文件视为一份子路由,其内部含有许多请求处理函数
  - ==子路由内部处理:==
    - 创建一个路由对象(事先引入express)
      `let router = express.Router()`
    - 向路由对象上添加请求方法
      `router.get("\",(req.res) => {处理方法...})`
      > ==**注意:**== 
      > 1.我们的路由不能使用use api了 , 因为use是不限制请求方式的路由, 在编写服务端程序的时候不够严谨; ==即全局路由使用use,而子路由要具体到get post等,所以需要把use替换成服务端需要的请求方式,例如get post等==
      > (get post put delete) 
      > 3.浏览器地址栏发送的请求只能是get请求, 如果需要发送其他类型的请求 , 需要apifox等
    - 暴露子路由对象给主文件 (==nodejs模块化==)
      `module.exports = router`
- 3.==在主文件中(主路由文件)==
  - 引入子路由文件(例: 文件名为index)
  `let index = require("子路由文件相对于主路由文件的路径")`
  - 把子路由挂到主路由上
  `app.use("/",index)`
- 4.服务器的端口监听--略--
- 5.==**浏览器的请求,就是在地址栏上输入地址发送请求来测试服务器的运行**==(==注意事先cmd打开服务器再发送请求==)
  - **实现子路由某个功能的请求路径是 : 全局路由的路径(在全局中配置这个子路由时给的路径) + 子路由中这个功能函数配置的路由;**   
    ==最终的目标是访问具体功能 : 路径应该是  **基准路径(就是localhost:3000/)** + 主路由路径 + 子路由路径==
    ==**全局和子路由的路径如果为'/',那就是默认没有路径,基准路径后啥也不写就能访问到**==
    > 接口定义规范:
    > ==主路由规定业务类型,根据业务类型命名路径名称==
    > ==具体功能实现放在子路由之中,需要根据具体功能命名;==
    > 例如: 我们要定义一个用户接口,在主路由中我们定义的路径就笼统为"/user",而在相应的子路由文件(user.js)中,我们定义子路由对象的路径就可以多元化命名,比如这个处理函数负责用户登录,那么路径为"/userLogin",那个处理函数负责查询信息,路径就为"/userInfo".
    > ==不同功能访问路径不同,这样当我们想要用户登录功能时访问localhost:3000/user/userLogin; 当我们想要用户信息时访问localhost:3000/user/userInfo==


### express的默认（补）
- ==一个express后端路由的常见默认,按照顺序==
  ```js
    const app = express()
    const PORT = 4000

    // 全局中间件：跨域处理
    app.use(corsMiddleware);

    // 重要的中间件
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // 注册路由
    app.use(imageRouter)
    app.use(uploadRouter)
    app.use('/test',testRouter)

    // 未匹配路由处理（404错误）
    app.use((req, res, next) => {
      // 当请求的路由未被任何已注册的路由匹配时，会进入这里
      const error = new Error(`未找到请求的路由: ${req.method} ${req.originalUrl}`);
      error.statusCode = 404; // 标记为404错误
      next(error); // 传递给全局错误处理中间件
    });

    // 全局错误处理中间件
    app.use((err, req, res, next) => {
      console.error('服务器错误：', err);
      res.status(500).json({
        code: 500,
        message: '服务器内部错误',
        error: err.message
      });
    });

    app.listen(PORT, () => {
      console.log(`后端运行: http://localhost:${PORT}`)
    })
  ```
- 1.`express.json()`和`express.urlencoded()`
  - ==app.use(express.json())==
    - 功能：==解析JSON 格式的请求体==。
    - 适用场景：当客户端发送的请求头中包含 Content-Type: application/json 时（通常是前端通过 fetch、axios 等工具发送 JSON 数据），该中间件会自动将请求体中的 JSON 字符串解析为 JavaScript 对象，并挂载到 req.body 上。
    > ==主要是别忘记，前后端交互处理数据都是JSON字符串格式，前端传给node后端都是JSON字符串，没有express.json()处理JSON字符串变为对象格式，后端无法操作任何数据==
  - ==app.use(express.urlencoded({ extended: false }))==
    - 功能：==解析表单格式的请求体（application/x-www-form-urlencoded）==。
    - 适用场景：当客户端通过 HTML 表单提交数据（默认 method="POST" 时），或请求头为 Content-Type: application/x-www-form-urlencoded 时（如表单提交、某些 API 工具模拟表单数据），该中间件会解析请求体中的键值对（如 name=张三&age=20），并转换为 JavaScript 对象挂载到 req.body 上。
    - 关于 extended: false：不支持表单嵌套
      - false：使用 Node 内置的 querystring 模块解析，只能处理简单的键值对（不支持嵌套对象）。
      - true：使用第三方 qs 模块解析，支持嵌套对象（如 user[name]=张三&user[age]=20 可解析为 { user: { name: '张三', age: 20 } }）。通常设置为 false 即可满足大多数简单表单场景，若需要处理复杂嵌套数据，可设为 true。
- ==2.路由处理和错误处理== 
  - 路由出错： 当上面的路由都没有匹配时，进入这个中间件，然后报错, `next()`是进入下一个中间夹，`next(err)`是进入全局处理错误中间件，同时把错误信息err传递过去
  - 全局错误处理中间件： 固定写法，收集全局的错误处理，传递方式就是`next(err)`

## koa
- express同作者TJ,开发新框架koa,nodejs新一代的web框架,koa相对比express更小,更丰富和更强大的能力,==更强的异步处理==
### koa基本使用
- 1.下载: `npm i koa`
- 2.基本使用
  ```js
    // 类习惯用开头大写
    const Koa = require('koa')

    // 1.创建app对象 
    const app = new Koa()

    // 2.注册中间件,2个参数
    app.use((ctx,next) => {
      console.log('匹配到koa的中间件')
      ctx.body = '呵呵呵'
    })

    app.listen(8000,()=>{
      console.log('koa服务器启动成功!')
    })
  ```
- ==3.Koa中的ctx属性(request/response)==
  ```js
    app.use((ctx,next) => {
      // koa把req和res包装进ctx,除此之外ctx还有很多其他属性
      // Koa的ctx有自己封装的request和response
      // ctx代表一次请求的上下文

      console.log(ctx.request) // Koa封装的请求对象,一般用这个
      console.log(ctx.req) // node封装的请求对象 

      // 同理响应对象
      console.log(ctx.response) // Koa
      console.log(ctx.res) // node
      // 之前用的res.end(),res.json()等方式都是node下的res
    })
  ```
  > Koa的next()和express几乎一样,除了在处理异步的时候
- ==4.Koa的中间件没有methods和path==
  ```
    app.get() X // methods都不可以,只能use
    app.use('/login') X // 不能写path,只能写个回调函数
    app.use(callback()) // yes V
  ```
  ==没有methods和path下,区分不同的中间件==
  ```js
    // 2.注册中间件
    app.use((ctx,next) => {
      // 特性: 大部分requset和response内部属性都可以直接通过ctx获取到
      // 例如: ctx.request.path === ctx.path
      if(ctx.path === '/login' && ctx.method === 'POST'){
        console.log('登录路由')
        ctx.body = '登录成功,欢迎回来'
      }else if(ctx.path === '/users' && ctx.method === 'GET'){
        console.log('用户路由')
        ctx.body = '用户列表'
      }
    })
  ```
  > 这样写很繁琐,并且app.js主文件中不应当写这么多逻辑代码,==使用Koa路由解决这个问题==
### Koa路由
- Koa官方没有提供路由的库,选择第三方库`Koa-router`或`Koa/router` ==我用后面的,因为经常维护==
- 1.下载: `npm install @koa/router`
- 2.基础使用(==均使用apifox测试==)
  ```js
    const Koa = require('koa')
    const KoaRouter = require('@koa/router')
    const app = new Koa()

    // 1.创建路由对象,可以写前置路由名(主路由)
    const userRouter = new KoaRouter({prefix: '/users'})
    // 2.创建子路由和中间件,可以使用methods和path
    userRouter.get('/',(ctx,next)=>{
      ctx.body = '用户主页'
    })
    userRouter.get('/:id',(ctx,next)=>{
      const id = ctx.params.id
      ctx.body = '获取用户id: ' + id
    })
    userRouter.post('/',(ctx,next)=>{
      ctx.body = '创建一个用户'
    })
    userRouter.delete('/:id',(ctx,next)=>{
      const id = ctx.params.id
      ctx.body = '删除用户id: ' + id
    })
    // 3.路由的挂载
    app.use(userRouter.routes())
    // 此方法对于未封装的方法会返回特定的信息'Method Not Allowed'
    // 比如PUT方法 (apifox)
    app.use(userRouter.allowedMethods())

    app.listen(8000,()=>{
      console.log('koa服务器启动成功!')
    })
  ```
- ==3.项目使用(规范化)==
  - router/userRouter.js
    ```js
      const KoaRouter = require('@koa/router')

      // 1.创建路由对象,可以写前置路由名(主路由)
      const userRouter = new KoaRouter({prefix: '/users'})
      // 2.创建子路由和中间件,可以使用methos和path
      userRouter.get('/',(ctx,next)=>{
        ctx.body = '用户主页'
      })
      userRouter.get('/:id',(ctx,next)=>{
        const id = ctx.params.id
        ctx.body = '获取用户id: ' + id
      })
      userRouter.post('/',(ctx,next)=>{
        ctx.body = '创建一个用户'
      })
      userRouter.delete('/:id',(ctx,next)=>{
        const id = ctx.params.id
        ctx.body = '删除用户id: ' + id
      })

      module.exports = userRouter
    ```
  - main.js
    ```js
      const Koa = require('koa')
      // 1.创建Koa服务器
      const app = new Koa()
      // 2.引入路由
      const userRouter = require('./router/userRouter')
      // 3.路由挂载
      app.use(userRouter.routes())
      app.use(userRouter.allowedMethods())

      app.listen(8000,()=>{
        console.log('koa服务器启动成功!')
      })
    ```
### Koa的参数解析方式
- ==客户端给服务器传递参数的方式==
  ```
  /**
   * 客户端向后端传递参数的方法
   * 1.get: params方法, 例子: /:id
   * 2.get: query方法, 例子: ?name=codewhy&age=30
   * 3.post: json方法, 例子: {"name": "codewhy", "age": 30}
   * 4.post: x-www-form-urlencoded 用的很少了
   * 5.post form-data, 表单的提交
   */
  ```
- ==均由apifox测试==
- 1.基础的query和params
  ```js
    // 1.get/params users/123
    userRouter.get('/:id',(ctx,next)=>{
      const id = ctx.params.id
      ctx.body = '用户id: ' + id
    })

    // 2.get/query ?name=codewhy&age=30
    userRouter.get('/',(ctx,next)=>{
      const {name,age} = ctx.query
      ctx.body = `用户信息: ${name}--${age}`
    })
  ```
- 2.需要新插件 解析body中的json和urlencoded
- 下载: `npm i koa-bodyparser`
  ```js
    const Koa = require('koa')
    const bodyParser = require('koa-bodyparser')  // 引入插件

    const app = new Koa()
    app.use(bodyParser()) // 🎈使用插件

    // 3.post/body-json {"name": "codewhy", "age": 30}
    userRouter.post('/json',(ctx,next)=>{
      // 获取客户端发送的body信息,之前在node下,使用req.on('data',(data)=>{...})监听
      // 使用第三方的库koa-bodyparser,使用后只能从ctx.request.body获取传递的body信息
      // 这个库并没有对ctx.req.body中做处理,所以从这里面无法获取body
      const bodyInfo = ctx.request.body
      console.log(bodyInfo)
      // ctx.body用于向客户端返回数据的(类似于node下的res.body)
      ctx.body = `客户端的body信息(json): ${JSON.stringify(bodyInfo)}`
    })

    // 4.post/urlencoded
    userRouter.post('/urlencoded',(ctx,next)=>{
      // koa-bodyparser插件也会解析好urlencoded的信息
      console.log(ctx.request.body)
      ctx.body = '用户的urlencoded信息' 
    })
  ```
- 3.表单类型数据 form-data
- 下载(2个): `npm install --save @koa/multer multer` 
  ```js
    const bodyParser = require('koa-bodyparser')
    const formParser = multer()

    // 5.form-data
    userRouter.post('/formdata',formParser.any(),(ctx,next)=>{
      // 解析form-data数据需要新的第三方库 koajs/multer 
      console.log(ctx.request.body)
      ctx.body = '用户的form-data信息' 
    })
  ```
### Koa中的文件上传
- 作者是同一个人,==**和之前的express中的multer使用方法一样**==
- 下载: `npm install --save @koa/multer multer` (==在测试form-data中已经下载过了==)
  ```js
    const multer = require('@koa/multer')
    // 上传文件的配置
    const upload = multer({
      storage: multer.diskStorage({
        destination(req,file,cb){
          cb(null,'./uploads')
        },
        filename(req,file,cb){
          cb(null,Date.now() + "_" + file.originalname)
        }
      })
    })

    // 单文件上传
    userRouter.post('/avatar',upload.single('avatar'),(ctx,next)=>{
      console.log(ctx.request.file)
      ctx.body = '文件上传成功'
    })
    // 多文件上传
    userRouter.post('/photos',upload.array('photos',9),(ctx,next)=>{
      console.log(ctx.request.files)
      ctx.body = '文件上传成功'
    })
  ```
### 静态服务器
- koa没有内置的设置静态服务器的api方法,需要第三方库
- 下载: `npm i koa-static`
  ```js
    const static = require('koa-static')
    // 设置静态服务器,和express一样
    app.use(static('./uploads'))
    // 打包好的项目文件
    app.use(static('./build'))
  ```
### 数据响应
- ==Koa的数据响应一般是body==,`ctx.body`;即服务器向客户端返回的响应信息
- body的类型: string buffer stream array ==object(常用)== null(此时status=204,意为no content,无内容)
- ctx.type可以设置文件返回的类型,默认file且会uft8解析,如果要读取图片数据流,可是设置为`ctx.body = 'image/jpeg'`
### 错误处理
- 和express一样的处理思路,把错误信息统一集中处理
  ```js
  // 主文件
    userRouter.get('/',(ctx,next)=>{
      const isAuth = true
      if(isAuth){
        ctx.body = '用户主页'
      }else{
        // Koa的next不能传参,解决方法如下
        ctx.app.emit('error',-1003,ctx)
      }
    })

    // app是一个EventEmitter
    app.on('error',(code,ctx) => {
      let errorCode = code 
      let message = ''
      switch (errorCode){
        case -1001:
          message = '账号密码错误'
          break;
        case -1002:
          message = '请求参数错误'
          break;
        case -1003:
          message = '未授权'
          break;
      }

      const body = {
        code: errorCode,
        message
      }

      ctx.body = body
    })
  ```
  > ==1.正常情况下,不会写在主文件内,所以app是需要导出和引入的==
  > ==2.传参时记得传递ctx,因为错误处理中间件没有ctx参数==
  > 3.因为app是EventEmitter数据,所以这里的错误处理是监听行为on
### Koa与express对比
- 架构设计:
  - express: 完整的,强大的,内置了许多功能(比如路由,文件上传等)
  - koa: 简洁自由,app中的get,post都没有,其他功能,路由,文件上传等功能都要第三方包 
- ==同步与异步:==
  - ==1.koa的同步与异步执行顺序==
    ```js
      // 同步代码
      app.use((ctx,next)=>{
        console.log('中间件1')
        next()
        // 断点测试后
        // 执行顺序: 执行完3个中间件next后再执行ctx.body
        // 每次进入next()--->下个中间件--->下个中间件的next()--->下下个中间件--->....; 直到没有next(),并且中间件代码执行完毕,再一一返回到上一个中间件继续执行到代码结束
        ctx.body = '中间件1的返回'
      })

      app.use((ctx,next)=>{
        console.log('中间件2')
        next()
      })

      app.use((ctx,next)=>{
        console.log('中间件3')
      })
    ```
    > ==每次进入next()--->下个中间件--->下个中间件的next()--->下下个中间件--->....; 直到没有next(),并且中间件代码执行完毕,再一一返回到上一个中间件继续执行到代码结束==
    ```js
      // 异步代码
      app.use(async (ctx,next)=>{
        console.log('中间件1')
        await next()
        ctx.msg = 'aaa'
        // 打印测试,查看没有异步信息
        ctx.body = ctx.msg
      })

      app.use(async (ctx,next)=>{
        console.log('中间件2')
        ctx.msg += 'bbb'
        // 默认下,koa不会等待异步结果,而是直接跳过继续执行下一步代码
        // 如果要等待异步结果,需要在中间件前的next()添加异步async/await
        await next()

        console.log('默认情况下,不执行异步,执行我')
      })

      app.use(async (ctx,next)=>{
        console.log('中间件3')

        // 假设网络请求axios,异步
        const res = await axios.get('http://123123123.com')
        const info = res.data.info
        ctx.msg += info
      })
    ```
  - 2.==express的同步与异步==
  - ==和koa一样==
    ```js
      // 同步代码
      app.use((req,res,next)=>{
        console.log('中间件1')
        req.msg = 'aaa'
        next()
        // 断点测试后,和koa一样
        res.json('中间件1的同步代码')
        res.json(req.msg)
      })

      app.use((req,res,next)=>{
        console.log('中间件2')
        req.msg += 'bbb'
        next()
      })

      app.use((req,res,next)=>{
        console.log('中间件3')
        req.msg += 'ccc'
      }) 
    ```
  - ==异步方法==
  - express异步next()本身返回是一个void,而koa的next()返回是一个promise,所以koa的异步方法对于express无效,这是koa重构的一个大的点,express想要使用异步数据只能在异步请求后使用,express不会等待异步的结果
    ```js
      // 异步代码
      app.use((req,res,next) => {
        console.log("中间件1");
        req.msg = 'aaa'
        next();
        // 测试异步代码 X
        res.json(req.msg);
      });

      app.use((req,res,next) => {
        console.log("中间件2");
        req.msg = 'bbb'
        next();
      });

      app.use(async (req,res,next) => {
        console.log("中间件3");
        // 假设网络请求axios,异步
        const res = await axios.get("http://123123123.com");
        const info = res.data.info;
        req.msg += info;

        // express只能这样用异步的信息
        res.json(req.msg)
      });
    ```
### koa的洋葱模型(了解)
- ==洋葱模型: 类似剥洋葱,从外向内,到达最中心时,再从内向外返回,如同koa的中间件,中间件按照next(),一个个按顺序执行,到达中心(即最后一个中间件,它没有next()),执行完它的代码后再从倒数第二个中间件一个个倒序向前返回,并执行中间件next()后面的剩余代码==
- express在执行同步代码时符合洋葱模型,但是执行异步代码时不符合,是一直到底部的,并不会返回到上一个中间件









## express和koa的源码(待)
- ==如何看源码更加方便?==
  - 可以直接把源码下载下来
  - 也可以debug看源码,vscode的调试打断点
    [![pEc4yJ1.png](https://s21.ax1x.com/2025/04/07/pEc4yJ1.png)](https://imgse.com/i/pEc4yJ1)
### express
- 1111
### koa
- 2222