### 区分开发和生产环境
- 开发环境 development/生产环境 production 下同一个值很可能不同
- 比如 baseURL 服务器地址可能不同,开发中需要对服务器各种测试,需要有专门的测试服务器; 而线上产品的服务器是稳定的,提供给用户更好的体验;
- ==开发时,需要对开发环境和生产环境进行区分==
- ==vite提供的import.meta.env对象上的特殊环境变量==
  - vite提供的默认环境变量之一: import.meta.env.MODE
  - MODE: 返回当前的模式development/production, 测试prod可以打包后运行 `npm run preview` 进行预览,产看环境
  - 或者 布尔类型 import.meta.env.DEV/PROD 也可以判断
    ```js
      if(import.meta.env.MODE === 'production'){
        BASE_URL = 'AAA'
      }else {
        BASE_URL = 'BBB'
      }
    ```
- ==2.vite支持自定义全局变量==
  - 在.env文件中,以VITE开头设置变量,例如`VITE_NAME = 'coderwhy'`,这样变量就可以通过`import.meta.env`获取了
  - 另外,可以在对应环境设置对应变量,这样在对应环境下才能获取对应变量,格式为`.env.[mode]`: ==.env.development / .env.production== 
  - 额外的, ==.env.local / .env.[mode].local==: 不加local可以提交git仓库,加local后此文件不可提交git仓库,可以保存隐私变量(管理员密码等)